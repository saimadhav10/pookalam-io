const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const GameRoom = require('./GameRoom');
const {
  PHASES,
  ROOM_CODE_LENGTH,
  MIN_PLAYERS,
} = require('./constants');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 5e6, // 5MB for canvas data
});

// Store all active rooms
const rooms = {};

// Generate a random room code
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let code = '';
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Clean up empty rooms
function cleanupRoom(roomCode) {
  const room = rooms[roomCode];
  if (room && room.getConnectedPlayers().length === 0) {
    if (room._timer) clearTimeout(room._timer);
    delete rooms[roomCode];
    console.log(`Room ${roomCode} cleaned up (empty)`);
  }
}

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  let currentRoom = null;
  let playerName = null;

  // --- CREATE ROOM ---
  socket.on('create-room', (data, callback) => {
    const { name } = data;
    playerName = name;

    let roomCode;
    do {
      roomCode = generateRoomCode();
    } while (rooms[roomCode]);

    const room = new GameRoom(roomCode, socket.id, name);
    rooms[roomCode] = room;
    currentRoom = roomCode;

    socket.join(roomCode);

    callback({
      success: true,
      roomCode,
      playerId: socket.id,
      state: room.getState(),
    });

    console.log(`Room ${roomCode} created by ${name} (${socket.id})`);
  });

  // --- JOIN ROOM ---
  socket.on('join-room', (data, callback) => {
    const { name, roomCode } = data;
    playerName = name;

    const room = rooms[roomCode];
    if (!room) {
      return callback({ success: false, error: 'Room not found' });
    }

    const result = room.addPlayer(socket.id, name);
    if (!result.success) {
      return callback({ success: false, error: result.error });
    }

    currentRoom = roomCode;
    socket.join(roomCode);

    callback({
      success: true,
      roomCode,
      playerId: socket.id,
      state: room.getState(),
    });

    // Notify others
    socket.to(roomCode).emit('player-joined', {
      player: { id: socket.id, name, connected: true },
      players: room.players,
    });

    console.log(`${name} joined room ${roomCode}`);
  });

  // --- CONFIGURE SETTINGS (host only) ---
  socket.on('configure-settings', (data) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    if (socket.id !== room.hostId) return;

    room.updateSettings(data);

    io.to(currentRoom).emit('settings-updated', room.settings);
  });

  // --- START GAME (host only) ---
  socket.on('start-game', () => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    if (socket.id !== room.hostId) return;

    if (room.getConnectedPlayers().length < MIN_PLAYERS) {
      socket.emit('error-msg', { message: 'Need at least 2 players to start' });
      return;
    }

    const roundData = room.startGame();

    io.to(currentRoom).emit('phase-start', roundData);

    // Set creation timer
    room._timer = setTimeout(() => {
      endCreationPhase(currentRoom);
    }, room.settings.creationTime * 1000);

    console.log(`Game started in room ${currentRoom}, Round 1`);
  });

  // --- SUBMIT CANVAS ---
  socket.on('submit-canvas', (data) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    const { dataUrl } = data;

    const allSubmitted = room.submitCanvas(socket.id, dataUrl);

    // Acknowledge submission
    socket.emit('canvas-submitted');

    // If all submitted early, end creation phase early
    if (allSubmitted) {
      clearTimeout(room._timer);
      endCreationPhase(currentRoom);
    }
  });

  // --- SUBMIT VOTE ---
  socket.on('submit-vote', (data) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    const { targetPlayerId, score } = data;

    const allVoted = room.submitVote(socket.id, targetPlayerId, score);

    socket.emit('vote-submitted');

    // If all eligible voters have voted, move to next immediately
    if (allVoted) {
      clearTimeout(room._timer);
      advanceJudging(currentRoom);
    }
  });

  // --- PLAY AGAIN ---
  socket.on('play-again', () => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];
    if (socket.id !== room.hostId) return;

    room.resetForNewGame();

    io.to(currentRoom).emit('game-reset', room.getState());
  });

  // --- DISCONNECT ---
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id} (${playerName})`);

    if (currentRoom && rooms[currentRoom]) {
      const room = rooms[currentRoom];
      const { newHostId } = room.removePlayer(socket.id);

      socket.to(currentRoom).emit('player-left', {
        playerId: socket.id,
        players: room.players,
        newHostId,
      });

      // If game in progress and all remaining have submitted, advance
      if (room.phase === PHASES.CREATION) {
        const connectedPlayers = room.getConnectedPlayers();
        const allSubmitted = connectedPlayers.every(
          (p) => room.submissions[room.currentRound]?.[p.id]
        );
        if (allSubmitted && connectedPlayers.length > 0) {
          clearTimeout(room._timer);
          endCreationPhase(currentRoom);
        }
      }

      cleanupRoom(currentRoom);
    }
  });
});

// --- Phase Transition Helpers ---

function endCreationPhase(roomCode) {
  const room = rooms[roomCode];
  if (!room || room.phase !== PHASES.CREATION) return;

  const judgingData = room.startJudging();

  if (!judgingData) {
    // No submissions — skip judging
    handleEndOfJudging(roomCode);
    return;
  }

  io.to(roomCode).emit('phase-start', judgingData);

  // Set judging timer for current player
  room._timer = setTimeout(() => {
    advanceJudging(roomCode);
  }, room.settings.judgingTime * 1000);

  console.log(`Judging started in room ${roomCode}`);
}

function advanceJudging(roomCode) {
  const room = rooms[roomCode];
  if (!room || room.phase !== PHASES.JUDGING) return;

  const result = room.nextPookalam();

  if (result.done) {
    handleEndOfJudging(roomCode, result);
  } else {
    // Show next pookalam
    io.to(roomCode).emit('phase-start', result.data);

    room._timer = setTimeout(() => {
      advanceJudging(roomCode);
    }, room.settings.judgingTime * 1000);
  }
}

function handleEndOfJudging(roomCode, result) {
  const room = rooms[roomCode];
  if (!room) return;

  // If no result provided, calculate it
  if (!result) {
    result = room.endJudging();
  }

  if (result.isFinal) {
    // Final results
    io.to(roomCode).emit('phase-start', result.data);
    console.log(`Game over in room ${roomCode}! Winner: ${result.data.winnerName}`);
  } else {
    // Round results — show for a bit, then start next round
    io.to(roomCode).emit('phase-start', result.data);

    room._timer = setTimeout(() => {
      const nextRoundData = room.startNextRound();
      io.to(roomCode).emit('phase-start', nextRoundData);

      room._timer = setTimeout(() => {
        endCreationPhase(roomCode);
      }, room.settings.creationTime * 1000);

      console.log(`Round ${room.currentRound} started in room ${roomCode}`);
    }, result.data.displayTime * 1000);
  }
}

// Serve static assets from the client build directory
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Fallback to index.html for single-page application routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Pookalam Game Server running on port ${PORT}`);
});

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useSocket } from './SocketContext';
import { PHASES } from '../utils/constants';

const GameContext = createContext(null);

const initialState = {
  // Player info
  playerId: null,
  playerName: '',
  isHost: false,

  // Room
  roomCode: null,
  players: [],
  phase: PHASES.LOBBY,

  // Settings
  settings: {
    creationTime: 60,
    judgingTime: 30,
  },

  // Game state
  currentRound: 0,
  totalRounds: 4,
  referenceImage: null,
  duration: 0,

  // Judging
  judgingData: null,
  hasVoted: false,

  // Results
  roundResults: null,
  finalResults: null,

  // Canvas
  canvasSubmitted: false,

  // Error
  error: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_INFO':
      return {
        ...state,
        playerId: action.payload.playerId,
        playerName: action.payload.playerName,
        isHost: action.payload.isHost,
        roomCode: action.payload.roomCode,
        players: action.payload.players || state.players,
        phase: PHASES.WAITING,
      };

    case 'UPDATE_PLAYERS':
      return {
        ...state,
        players: action.payload.players,
      };

    case 'SET_HOST':
      return {
        ...state,
        isHost: action.payload.isHost,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };

    case 'PHASE_CREATION':
      return {
        ...state,
        phase: PHASES.CREATION,
        currentRound: action.payload.round,
        totalRounds: action.payload.totalRounds,
        referenceImage: action.payload.referenceImage,
        duration: action.payload.duration,
        canvasSubmitted: false,
        hasVoted: false,
        judgingData: null,
      };

    case 'PHASE_JUDGING':
      return {
        ...state,
        phase: PHASES.JUDGING,
        judgingData: action.payload,
        hasVoted: false,
        duration: action.payload.duration,
      };

    case 'PHASE_ROUND_RESULTS':
      return {
        ...state,
        phase: PHASES.ROUND_RESULTS,
        roundResults: action.payload,
      };

    case 'PHASE_FINAL_RESULTS':
      return {
        ...state,
        phase: PHASES.FINAL_RESULTS,
        finalResults: action.payload,
      };

    case 'CANVAS_SUBMITTED':
      return {
        ...state,
        canvasSubmitted: true,
      };

    case 'VOTE_SUBMITTED':
      return {
        ...state,
        hasVoted: true,
      };

    case 'GAME_RESET':
      return {
        ...state,
        phase: PHASES.WAITING,
        currentRound: 0,
        referenceImage: null,
        judgingData: null,
        roundResults: null,
        finalResults: null,
        canvasSubmitted: false,
        hasVoted: false,
        players: action.payload.players,
        settings: action.payload.settings,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'BACK_TO_LOBBY':
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Player events
    socket.on('player-joined', (data) => {
      dispatch({ type: 'UPDATE_PLAYERS', payload: { players: data.players } });
    });

    socket.on('player-left', (data) => {
      dispatch({ type: 'UPDATE_PLAYERS', payload: { players: data.players } });
      if (data.newHostId === socket.id) {
        dispatch({ type: 'SET_HOST', payload: { isHost: true } });
      }
    });

    // Settings
    socket.on('settings-updated', (settings) => {
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    });

    // Phase transitions
    socket.on('phase-start', (data) => {
      switch (data.phase) {
        case 'CREATION':
          dispatch({ type: 'PHASE_CREATION', payload: data });
          break;
        case 'JUDGING':
          dispatch({ type: 'PHASE_JUDGING', payload: data });
          break;
        case 'ROUND_RESULTS':
          dispatch({ type: 'PHASE_ROUND_RESULTS', payload: data });
          break;
        case 'FINAL_RESULTS':
          dispatch({ type: 'PHASE_FINAL_RESULTS', payload: data });
          break;
      }
    });

    // Canvas & vote acknowledgments
    socket.on('canvas-submitted', () => {
      dispatch({ type: 'CANVAS_SUBMITTED' });
    });

    socket.on('vote-submitted', () => {
      dispatch({ type: 'VOTE_SUBMITTED' });
    });

    // Game reset
    socket.on('game-reset', (roomState) => {
      dispatch({ type: 'GAME_RESET', payload: roomState });
    });

    // Errors
    socket.on('error-msg', (data) => {
      dispatch({ type: 'SET_ERROR', payload: data.message });
      setTimeout(() => dispatch({ type: 'CLEAR_ERROR' }), 4000);
    });

    return () => {
      socket.off('player-joined');
      socket.off('player-left');
      socket.off('settings-updated');
      socket.off('phase-start');
      socket.off('canvas-submitted');
      socket.off('vote-submitted');
      socket.off('game-reset');
      socket.off('error-msg');
    };
  }, [socket]);

  // --- Actions ---

  const createRoom = useCallback(
    (name) => {
      return new Promise((resolve) => {
        socket.emit('create-room', { name }, (response) => {
          if (response.success) {
            dispatch({
              type: 'SET_PLAYER_INFO',
              payload: {
                playerId: response.playerId,
                playerName: name,
                isHost: true,
                roomCode: response.roomCode,
                players: response.state.players,
              },
            });
          }
          resolve(response);
        });
      });
    },
    [socket]
  );

  const joinRoom = useCallback(
    (name, roomCode) => {
      return new Promise((resolve) => {
        socket.emit('join-room', { name, roomCode: roomCode.toUpperCase() }, (response) => {
          if (response.success) {
            dispatch({
              type: 'SET_PLAYER_INFO',
              payload: {
                playerId: response.playerId,
                playerName: name,
                isHost: false,
                roomCode: response.roomCode,
                players: response.state.players,
              },
            });
          }
          resolve(response);
        });
      });
    },
    [socket]
  );

  const updateSettings = useCallback(
    (settings) => {
      socket.emit('configure-settings', settings);
    },
    [socket]
  );

  const startGame = useCallback(() => {
    socket.emit('start-game');
  }, [socket]);

  const submitCanvas = useCallback(
    (dataUrl) => {
      socket.emit('submit-canvas', { dataUrl });
    },
    [socket]
  );

  const submitVote = useCallback(
    (targetPlayerId, score) => {
      socket.emit('submit-vote', { targetPlayerId, score });
    },
    [socket]
  );

  const playAgain = useCallback(() => {
    socket.emit('play-again');
  }, [socket]);

  const backToLobby = useCallback(() => {
    dispatch({ type: 'BACK_TO_LOBBY' });
  }, []);

  const value = {
    ...state,
    createRoom,
    joinRoom,
    updateSettings,
    startGame,
    submitCanvas,
    submitVote,
    playAgain,
    backToLobby,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

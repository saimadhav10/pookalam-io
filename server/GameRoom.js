const {
  PHASES,
  DEFAULT_CREATION_TIME,
  DEFAULT_JUDGING_TIME,
  TOTAL_ROUNDS,
  MAX_PLAYERS,
  TOTAL_POOKALAM_IMAGES,
  ROUND_RESULTS_DISPLAY_TIME,
} = require('./constants');

class GameRoom {
  constructor(roomCode, hostId, hostName) {
    this.roomCode = roomCode;
    this.hostId = hostId;
    this.players = [{ id: hostId, name: hostName, connected: true }];
    this.phase = PHASES.WAITING;
    this.currentRound = 0;
    this.totalRounds = TOTAL_ROUNDS;

    // Settings (configurable by host)
    this.settings = {
      creationTime: DEFAULT_CREATION_TIME,
      judgingTime: DEFAULT_JUDGING_TIME,
    };

    // Round data
    this.referenceImages = []; // selected images for all 4 rounds
    this.submissions = {}; // { roundNum: { playerId: dataUrl } }
    this.votes = {}; // { roundNum: { targetPlayerId: { voterId: score } } }
    this.roundScores = []; // [ { playerId: totalScore }, ... ] per round
    this.cumulativeScores = {}; // { playerId: totalAcrossAllRounds }

    // Judging state
    this.judgingPlayerIndex = 0;
    this.judgingOrder = [];

    // Timers
    this._timer = null;
  }

  // --- Player Management ---

  addPlayer(id, name) {
    if (this.players.length >= MAX_PLAYERS) {
      return { success: false, error: 'Room is full' };
    }
    if (this.phase !== PHASES.WAITING) {
      return { success: false, error: 'Game already in progress' };
    }
    if (this.players.find((p) => p.id === id)) {
      return { success: false, error: 'Already in the room' };
    }

    this.players.push({ id, name, connected: true });
    return { success: true };
  }

  removePlayer(id) {
    this.players = this.players.filter((p) => p.id !== id);

    // If host leaves, assign new host
    if (id === this.hostId && this.players.length > 0) {
      this.hostId = this.players[0].id;
      return { newHostId: this.hostId };
    }

    return { newHostId: null };
  }

  disconnectPlayer(id) {
    const player = this.players.find((p) => p.id === id);
    if (player) {
      player.connected = false;
    }
  }

  getConnectedPlayers() {
    return this.players.filter((p) => p.connected);
  }

  // --- Settings ---

  updateSettings(settings) {
    if (settings.creationTime) {
      this.settings.creationTime = settings.creationTime;
    }
    if (settings.judgingTime) {
      this.settings.judgingTime = settings.judgingTime;
    }
  }

  // --- Game Flow ---

  selectReferenceImages() {
    // Randomly select `totalRounds` unique images from available pool
    const available = [];
    for (let i = 1; i <= TOTAL_POOKALAM_IMAGES; i++) {
      available.push(`pookalam_${String(i).padStart(2, '0')}.png`);
    }

    // Shuffle and pick
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    this.referenceImages = available.slice(0, this.totalRounds);
  }

  startGame() {
    this.currentRound = 0;
    this.roundScores = [];
    this.cumulativeScores = {};
    this.submissions = {};
    this.votes = {};

    // Initialize cumulative scores
    this.players.forEach((p) => {
      this.cumulativeScores[p.id] = 0;
    });

    this.selectReferenceImages();
    return this.startNextRound();
  }

  startNextRound() {
    this.currentRound++;
    this.phase = PHASES.CREATION;
    this.submissions[this.currentRound] = {};
    this.votes[this.currentRound] = {};

    const referenceImage = this.referenceImages[this.currentRound - 1];

    return {
      phase: PHASES.CREATION,
      round: this.currentRound,
      totalRounds: this.totalRounds,
      referenceImage,
      duration: this.settings.creationTime,
    };
  }

  // --- Creation Phase ---

  submitCanvas(playerId, dataUrl) {
    if (this.phase !== PHASES.CREATION) return false;
    this.submissions[this.currentRound][playerId] = dataUrl;

    // Check if all connected players have submitted
    const connectedPlayers = this.getConnectedPlayers();
    const allSubmitted = connectedPlayers.every(
      (p) => this.submissions[this.currentRound][p.id]
    );
    return allSubmitted;
  }

  // --- Judging Phase ---

  startJudging() {
    this.phase = PHASES.JUDGING;
    this.judgingPlayerIndex = 0;

    // Create judging order (all players who submitted)
    this.judgingOrder = this.players
      .filter((p) => this.submissions[this.currentRound][p.id])
      .map((p) => p.id);

    // Initialize vote storage for each player being judged
    this.judgingOrder.forEach((playerId) => {
      this.votes[this.currentRound][playerId] = {};
    });

    return this.getCurrentJudgingData();
  }

  getCurrentJudgingData() {
    if (this.judgingPlayerIndex >= this.judgingOrder.length) {
      return null;
    }

    const targetPlayerId = this.judgingOrder[this.judgingPlayerIndex];
    const targetPlayer = this.players.find((p) => p.id === targetPlayerId);

    return {
      phase: PHASES.JUDGING,
      targetPlayerId,
      targetPlayerName: targetPlayer ? targetPlayer.name : 'Unknown',
      canvasDataUrl: this.submissions[this.currentRound][targetPlayerId],
      referenceImage: this.referenceImages[this.currentRound - 1],
      judgingIndex: this.judgingPlayerIndex,
      totalToJudge: this.judgingOrder.length,
      duration: this.settings.judgingTime,
    };
  }

  submitVote(voterId, targetPlayerId, score) {
    // Can't vote for yourself
    if (voterId === targetPlayerId) return false;
    if (score < 1 || score > 5) return false;
    if (this.phase !== PHASES.JUDGING) return false;

    if (!this.votes[this.currentRound][targetPlayerId]) {
      this.votes[this.currentRound][targetPlayerId] = {};
    }

    this.votes[this.currentRound][targetPlayerId][voterId] = score;

    // Check if all eligible voters have voted for this player
    const eligibleVoters = this.getConnectedPlayers().filter(
      (p) => p.id !== targetPlayerId
    );
    const allVoted = eligibleVoters.every(
      (p) => this.votes[this.currentRound][targetPlayerId][p.id] !== undefined
    );

    return allVoted;
  }

  nextPookalam() {
    this.judgingPlayerIndex++;

    if (this.judgingPlayerIndex >= this.judgingOrder.length) {
      // All pookalams judged — calculate scores
      return this.endJudging();
    }

    return { done: false, data: this.getCurrentJudgingData() };
  }

  // --- Scoring ---

  endJudging() {
    const roundScore = {};

    // Calculate round scores
    this.players.forEach((player) => {
      const playerVotes = this.votes[this.currentRound][player.id] || {};
      const totalScore = Object.values(playerVotes).reduce(
        (sum, s) => sum + s,
        0
      );
      roundScore[player.id] = totalScore;

      // Accumulate
      if (!this.cumulativeScores[player.id]) {
        this.cumulativeScores[player.id] = 0;
      }
      this.cumulativeScores[player.id] += totalScore;
    });

    this.roundScores.push(roundScore);

    if (this.currentRound >= this.totalRounds) {
      this.phase = PHASES.FINAL_RESULTS;
      return {
        done: true,
        isFinal: true,
        data: this.getFinalResults(),
      };
    }

    this.phase = PHASES.ROUND_RESULTS;
    return {
      done: true,
      isFinal: false,
      data: this.getRoundResults(),
    };
  }

  getRoundResults() {
    const currentRoundScores = this.roundScores[this.roundScores.length - 1];

    const results = this.players.map((player) => ({
      id: player.id,
      name: player.name,
      roundScore: currentRoundScores[player.id] || 0,
      cumulativeScore: this.cumulativeScores[player.id] || 0,
    }));

    results.sort((a, b) => b.roundScore - a.roundScore);

    return {
      phase: PHASES.ROUND_RESULTS,
      round: this.currentRound,
      totalRounds: this.totalRounds,
      results,
      displayTime: ROUND_RESULTS_DISPLAY_TIME,
    };
  }

  getFinalResults() {
    const results = this.players.map((player) => ({
      id: player.id,
      name: player.name,
      cumulativeScore: this.cumulativeScores[player.id] || 0,
      roundScores: this.roundScores.map(
        (rs) => rs[player.id] || 0
      ),
    }));

    // Sort by cumulative score, then by best single round (tiebreaker)
    results.sort((a, b) => {
      if (b.cumulativeScore !== a.cumulativeScore) {
        return b.cumulativeScore - a.cumulativeScore;
      }
      return Math.max(...b.roundScores) - Math.max(...a.roundScores);
    });

    return {
      phase: PHASES.FINAL_RESULTS,
      results,
      winnerId: results.length > 0 ? results[0].id : null,
      winnerName: results.length > 0 ? results[0].name : null,
    };
  }

  // --- Reset ---

  resetForNewGame() {
    this.phase = PHASES.WAITING;
    this.currentRound = 0;
    this.referenceImages = [];
    this.submissions = {};
    this.votes = {};
    this.roundScores = [];
    this.cumulativeScores = {};
    this.judgingPlayerIndex = 0;
    this.judgingOrder = [];

    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  // --- Serialization ---

  getState() {
    return {
      roomCode: this.roomCode,
      hostId: this.hostId,
      players: this.players,
      phase: this.phase,
      currentRound: this.currentRound,
      totalRounds: this.totalRounds,
      settings: this.settings,
    };
  }
}

module.exports = GameRoom;

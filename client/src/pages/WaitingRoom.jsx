import { useState } from 'react';
import { useGame } from '../context/GameContext';
import PlayerList from '../components/PlayerList';
import PetalAnimation from '../components/PetalAnimation';
import { CREATION_TIME_OPTIONS, JUDGING_TIME_OPTIONS } from '../utils/constants';

export default function WaitingRoom() {
  const {
    roomCode,
    players,
    playerId,
    isHost,
    settings,
    updateSettings,
    startGame,
    backToLobby,
    error,
  } = useGame();

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canStart = players.length >= 2;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 relative">
      <PetalAnimation count={12} />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center animate-slide-down">
          <p className="text-sm text-onam-cream/50 font-body mb-2">Waiting Room</p>
          <h1 className="font-display text-3xl font-bold text-onam-cream mb-4">
            🌸 Room Code
          </h1>
          <div className="flex items-center gap-3 justify-center">
            <span className="room-code-display animate-glow px-6 py-3 glass-card">
              {roomCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="tool-button px-3 py-3"
              title="Copy room code"
            >
              {copied ? (
                <span className="text-onam-green text-sm">✓</span>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-sm text-onam-cream/40 mt-2 font-body">
            Share this code with friends to join!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Players */}
          <div className="glass-card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title text-lg">Players</h2>
              <span className="badge-green">{players.length} joined</span>
            </div>
            <PlayerList players={players} hostId={players[0]?.id} currentPlayerId={playerId} />
          </div>

          {/* Settings (Host only) */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="section-title text-lg mb-4">
              ⚙️ Game Settings
              {!isHost && (
                <span className="text-xs text-onam-cream/40 font-body font-normal ml-2">
                  (Host only)
                </span>
              )}
            </h2>

            <div className="space-y-5">
              {/* Creation Time */}
              <div>
                <label className="block text-sm text-onam-cream/60 font-body mb-2">
                  ⏱️ Drawing Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CREATION_TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => isHost && updateSettings({ creationTime: opt.value })}
                      disabled={!isHost}
                      className={`py-2 px-3 rounded-lg text-sm font-body transition-all duration-200 ${
                        settings.creationTime === opt.value
                          ? 'bg-onam-gold/20 border border-onam-gold/50 text-onam-gold'
                          : 'bg-white/5 border border-white/10 text-onam-cream/60'
                      } ${isHost ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Judging Time */}
              <div>
                <label className="block text-sm text-onam-cream/60 font-body mb-2">
                  ⭐ Voting Time (per player)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {JUDGING_TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => isHost && updateSettings({ judgingTime: opt.value })}
                      disabled={!isHost}
                      className={`py-2 px-3 rounded-lg text-sm font-body transition-all duration-200 ${
                        settings.judgingTime === opt.value
                          ? 'bg-onam-gold/20 border border-onam-gold/50 text-onam-gold'
                          : 'bg-white/5 border border-white/10 text-onam-cream/60'
                      } ${isHost ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game info */}
              <div className="glass-card px-4 py-3 bg-onam-purple/10 border-onam-purple/20">
                <p className="text-xs text-onam-cream/50 font-body">
                  📋 4 rounds • {players.length} players • ~
                  {Math.ceil(
                    (4 * (settings.creationTime + settings.judgingTime * players.length + 10)) / 60
                  )}{' '}
                  min total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-2 rounded-lg bg-onam-red/20 border border-onam-red/30 text-onam-red text-sm font-body animate-scale-in">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button onClick={backToLobby} className="btn-secondary">
            Leave Room
          </button>
          {isHost && (
            <button
              onClick={startGame}
              disabled={!canStart}
              className="btn-primary text-lg px-8"
            >
              {canStart ? '🎮 Start Game' : `Need ${2 - players.length} more player(s)`}
            </button>
          )}
          {!isHost && (
            <div className="flex items-center gap-2 px-6 py-3 glass-card">
              <span className="animate-pulse-soft">⏳</span>
              <span className="text-onam-cream/60 font-body">Waiting for host to start...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

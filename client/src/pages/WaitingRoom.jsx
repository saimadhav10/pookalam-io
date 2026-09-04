import { useState } from 'react';
import { useGame } from '../context/GameContext';
import PlayerList from '../components/PlayerList';
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
    <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center px-4 py-8 relative">
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center animate-slide-down">
          <span className="badge-terra-primary bg-[#4a7c59] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Pre-Game Lobby
          </span>
          <h1 className="font-headline text-3xl font-bold text-[#2e3230] mb-4 flex justify-center items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4a7c59]">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Room Code
          </h1>
          <div className="flex items-center gap-3 justify-center">
            <span className="font-numeric text-3xl tracking-widest font-bold bg-white border border-[#4a4e4a]/10 shadow-sm px-6 py-3 rounded-xl text-[#2e3230]">
              {roomCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="btn-terra-secondary bg-[#e2e8f0] text-[#2e3230] p-3 rounded-xl border border-[#cbd5e1] shadow-[0_4px_0_#94a3b8] active:shadow-[0_0px_0_#94a3b8] active:translate-y-1 transition-all"
              title="Copy room code"
            >
              {copied ? (
                <svg className="w-6 h-6 text-[#4a7c59]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-sm text-[#4a4e4a] mt-3 font-body">
            Share this code with friends to join!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Players */}
          <div className="bg-white rounded-2xl p-6 border border-[#4a4e4a]/10 shadow-terra-card animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-lg font-bold text-[#2e3230]">Players</h2>
              <span className="badge-terra-green bg-[#4a7c59]/10 text-[#4a7c59] px-2 py-1 rounded-md text-xs font-bold">
                {players.length} joined
              </span>
            </div>
            <PlayerList players={players} hostId={players[0]?.id} currentPlayerId={playerId} />
          </div>

          {/* Settings (Host only) */}
          <div className="bg-white rounded-2xl p-6 border border-[#4a4e4a]/10 shadow-terra-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-headline text-lg font-bold text-[#2e3230] mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Game Settings
              {!isHost && (
                <span className="text-xs text-[#4a4e4a] font-body font-normal ml-1">
                  (Host only)
                </span>
              )}
            </h2>

            <div className="space-y-5">
              {/* Creation Time */}
              <div>
                <label className="flex items-center gap-2 text-sm text-[#4a4e4a] font-body mb-2 font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Drawing Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CREATION_TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => isHost && updateSettings({ creationTime: opt.value })}
                      disabled={!isHost}
                      className={`py-2 px-3 rounded-xl text-sm font-body font-bold transition-all duration-200 ${
                        settings.creationTime === opt.value
                          ? 'bg-[#4a7c59] text-white shadow-[0_2px_0_#2e4d37]'
                          : 'bg-[#faf6f0] border border-[#e2e8f0] text-[#4a4e4a] hover:bg-[#e2e8f0]'
                      } ${isHost ? 'cursor-pointer' : 'cursor-default opacity-80'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Judging Time */}
              <div>
                <label className="flex items-center gap-2 text-sm text-[#4a4e4a] font-body mb-2 font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  Voting Time (per player)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {JUDGING_TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => isHost && updateSettings({ judgingTime: opt.value })}
                      disabled={!isHost}
                      className={`py-2 px-3 rounded-xl text-sm font-body font-bold transition-all duration-200 ${
                        settings.judgingTime === opt.value
                          ? 'bg-[#4a7c59] text-white shadow-[0_2px_0_#2e4d37]'
                          : 'bg-[#faf6f0] border border-[#e2e8f0] text-[#4a4e4a] hover:bg-[#e2e8f0]'
                      } ${isHost ? 'cursor-pointer' : 'cursor-default opacity-80'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game info */}
              <div className="bg-[#4a7c59]/5 border border-[#4a7c59]/20 rounded-xl px-4 py-3 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4a7c59] mt-0.5 shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <p className="text-xs text-[#4a4e4a] font-body">
                  4 rounds • {players.length} players • ~
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
          <div className="px-4 py-3 rounded-lg bg-[#b83230]/10 border border-[#b83230]/30 text-[#b83230] text-sm font-body animate-scale-in flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <button 
            onClick={backToLobby} 
            className="btn-terra-secondary bg-[#e2e8f0] text-[#2e3230] font-bold px-6 py-3 rounded-xl border border-[#cbd5e1] shadow-[0_4px_0_#94a3b8] active:shadow-[0_0px_0_#94a3b8] active:translate-y-1 transition-all flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Leave Room
          </button>
          
          {isHost && (
            <button
              onClick={startGame}
              disabled={!canStart}
              className="btn-terra-primary bg-[#4a7c59] text-white font-bold text-lg px-8 py-3 rounded-xl shadow-[0_4px_0_#2e4d37] active:shadow-[0_0px_0_#2e4d37] active:translate-y-1 transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 flex items-center gap-2"
            >
              {canStart ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Start Game
                </>
              ) : (
                `Need ${2 - players.length} more player(s)`
              )}
            </button>
          )}
          
          {!isHost && (
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-[#4a4e4a]/10 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4a7c59] animate-spin">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
              <span className="text-[#4a4e4a] font-body font-medium">Waiting for host to start...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

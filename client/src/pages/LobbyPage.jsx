import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';

export default function LobbyPage() {
  const { createRoom, joinRoom, error } = useGame();
  const { isConnected } = useSocket();
  const [mode, setMode] = useState(null); // 'create' | 'join'
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return setLocalError('Please enter your name');
    setIsLoading(true);
    setLocalError('');
    const result = await createRoom(name.trim());
    if (!result.success) {
      setLocalError(result.error);
    }
    setIsLoading(false);
  };

  const handleJoin = async () => {
    if (!name.trim()) return setLocalError('Please enter your name');
    if (!roomCode.trim()) return setLocalError('Please enter a room code');
    setIsLoading(true);
    setLocalError('');
    const result = await joinRoom(name.trim(), roomCode.trim());
    if (!result.success) {
      setLocalError(result.error);
    }
    setIsLoading(false);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle mandala background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vw] max-w-none" fill="currentColor">
          <path d="M50 0 C55 20, 70 30, 100 50 C70 70, 55 80, 50 100 C45 80, 30 70, 0 50 C30 30, 45 20, 50 0 Z" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full">
        {/* Logo / Title */}
        <div className="text-center animate-slide-down">
          <div className="flex justify-center mb-4 text-[#4a7c59]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 15 7 15 12C15 17 12 22 12 22C12 22 9 17 9 12C9 7 12 2 12 2Z"/>
              <path d="M22 12C22 12 17 15 12 15C7 15 2 12 2 12C2 12 7 9 12 9C17 9 22 12 22 12Z"/>
            </svg>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-black text-[#2e3230]">
            Pookalam
          </h1>
          <p className="text-lg text-[#4a4e4a] font-body mt-2">
            Recreate • Compete • Celebrate Onam
          </p>
        </div>

        {/* Connection status */}
        {!isConnected && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a7c59]/10 border border-[#4a7c59]/30">
            <div className="w-2 h-2 rounded-full bg-[#4a7c59] animate-pulse" />
            <span className="text-sm text-[#4a7c59] font-body">Connecting to server...</span>
          </div>
        )}

        {/* Mode selection */}
        {!mode && (
          <div className="flex flex-col sm:flex-row gap-4 w-full animate-slide-up">
            <button
              onClick={() => setMode('create')}
              disabled={!isConnected}
              className="flex-1 bg-white rounded-2xl p-8 text-center group border border-[#4a4e4a]/10 shadow-terra-card hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-[#4a7c59] flex justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h2 className="font-headline text-xl font-bold text-[#2e3230] mb-1">Create Room</h2>
              <p className="text-sm text-[#4a4e4a]">Start a new game</p>
            </button>

            <button
              onClick={() => setMode('join')}
              disabled={!isConnected}
              className="flex-1 bg-white rounded-2xl p-8 text-center group border border-[#4a4e4a]/10 shadow-terra-card hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-[#4a7c59] flex justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </div>
              <h2 className="font-headline text-xl font-bold text-[#2e3230] mb-1">Join Room</h2>
              <p className="text-sm text-[#4a4e4a]">Enter a room code</p>
            </button>
          </div>
        )}

        {/* Create / Join Form */}
        {mode && (
          <div className="bg-white rounded-2xl p-8 w-full border border-[#4a4e4a]/10 shadow-terra-card animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-2xl font-bold text-[#2e3230] flex items-center gap-2">
                {mode === 'create' ? (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    Create Room
                  </>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Join Room
                  </>
                )}
              </h2>
              <button
                onClick={() => {
                  setMode(null);
                  setLocalError('');
                }}
                className="text-[#4a4e4a] hover:text-[#2e3230] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#4a4e4a] font-body mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={20}
                  className="input-terra w-full px-4 py-3 rounded-xl border-2 border-[#e2e8f0] focus:border-[#4a7c59] outline-none font-body text-[#2e3230]"
                  onKeyDown={(e) => e.key === 'Enter' && (mode === 'create' ? handleCreate() : handleJoin())}
                  autoFocus
                />
              </div>

              {mode === 'join' && (
                <div>
                  <label className="block text-sm text-[#4a4e4a] font-body mb-1.5 font-medium">
                    Room Code
                  </label>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ABC123"
                    maxLength={6}
                    className="input-terra w-full px-4 py-3 rounded-xl border-2 border-[#e2e8f0] focus:border-[#4a7c59] outline-none font-numeric uppercase tracking-widest text-center text-xl font-bold text-[#2e3230]"
                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  />
                </div>
              )}

              {displayError && (
                <div className="px-4 py-3 rounded-lg bg-[#b83230]/10 border border-[#b83230]/30 text-[#b83230] text-sm font-body animate-scale-in flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {displayError}
                </div>
              )}

              <button
                onClick={mode === 'create' ? handleCreate : handleJoin}
                disabled={isLoading || !isConnected}
                className="btn-terra-primary w-full text-lg mt-2 py-3 rounded-xl bg-[#4a7c59] text-white font-bold shadow-[0_4px_0_#2e4d37] active:shadow-[0_0px_0_#2e4d37] active:translate-y-1 transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : mode === 'create' ? (
                  'Create Room'
                ) : (
                  'Join Room'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-[#4a4e4a] font-body">
          Happy Onam! Thiruvonam 2026
        </p>
      </div>
    </div>
  );
}

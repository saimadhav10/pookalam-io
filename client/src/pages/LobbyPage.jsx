import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import PetalAnimation from '../components/PetalAnimation';

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <PetalAnimation count={20} />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full">
        {/* Logo / Title */}
        <div className="text-center animate-slide-down">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="font-display text-5xl md:text-6xl font-black bg-gradient-to-r from-onam-gold via-onam-orange to-onam-red bg-clip-text text-transparent">
            Pookalam
          </h1>
          <p className="text-lg text-onam-cream/60 font-body mt-2">
            Recreate • Compete • Celebrate Onam 🎉
          </p>
        </div>

        {/* Connection status */}
        {!isConnected && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-onam-red/20 border border-onam-red/30">
            <div className="w-2 h-2 rounded-full bg-onam-red animate-pulse" />
            <span className="text-sm text-onam-red font-body">Connecting to server...</span>
          </div>
        )}

        {/* Mode selection */}
        {!mode && (
          <div className="flex flex-col sm:flex-row gap-4 w-full animate-slide-up">
            <button
              onClick={() => setMode('create')}
              disabled={!isConnected}
              className="flex-1 glass-card-hover p-8 text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏠</div>
              <h2 className="font-display text-xl font-bold text-onam-cream mb-1">Create Room</h2>
              <p className="text-sm text-onam-cream/50">Start a new game</p>
            </button>

            <button
              onClick={() => setMode('join')}
              disabled={!isConnected}
              className="flex-1 glass-card-hover p-8 text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🚀</div>
              <h2 className="font-display text-xl font-bold text-onam-cream mb-1">Join Room</h2>
              <p className="text-sm text-onam-cream/50">Enter a room code</p>
            </button>
          </div>
        )}

        {/* Create / Join Form */}
        {mode && (
          <div className="glass-card p-8 w-full animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">
                {mode === 'create' ? '🏠 Create Room' : '🚀 Join Room'}
              </h2>
              <button
                onClick={() => {
                  setMode(null);
                  setLocalError('');
                }}
                className="text-onam-cream/40 hover:text-onam-cream transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-onam-cream/60 font-body mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={20}
                  className="input-field"
                  onKeyDown={(e) => e.key === 'Enter' && (mode === 'create' ? handleCreate() : handleJoin())}
                  autoFocus
                />
              </div>

              {mode === 'join' && (
                <div>
                  <label className="block text-sm text-onam-cream/60 font-body mb-1.5">
                    Room Code
                  </label>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ABC123"
                    maxLength={6}
                    className="input-field uppercase tracking-widest text-center text-xl font-display font-bold"
                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  />
                </div>
              )}

              {displayError && (
                <div className="px-4 py-2 rounded-lg bg-onam-red/20 border border-onam-red/30 text-onam-red text-sm font-body animate-scale-in">
                  {displayError}
                </div>
              )}

              <button
                onClick={mode === 'create' ? handleCreate : handleJoin}
                disabled={isLoading || !isConnected}
                className="btn-primary w-full text-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Connecting...
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
        <p className="text-xs text-onam-cream/20 font-body">
          Happy Onam! 🌺 Thiruvonam 2026
        </p>
      </div>
    </div>
  );
}

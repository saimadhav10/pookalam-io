export default function PlayerList({ players, hostId, currentPlayerId }) {
  return (
    <div className="space-y-2">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 animate-slide-up ${
            player.id === currentPlayerId
              ? 'bg-onam-gold/10 border border-onam-gold/30'
              : 'bg-white/5 border border-white/5'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${
              player.id === currentPlayerId
                ? 'bg-gradient-to-br from-onam-gold to-onam-orange text-white'
                : 'bg-white/10 text-onam-cream'
            }`}
          >
            {player.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="font-body font-medium text-onam-cream truncate">
              {player.name}
              {player.id === currentPlayerId && (
                <span className="ml-2 text-xs text-onam-gold/70">(You)</span>
              )}
            </p>
          </div>

          {/* Host badge */}
          {player.id === hostId && (
            <span className="badge-gold">Host</span>
          )}

          {/* Connected status */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              player.connected !== false ? 'bg-onam-green' : 'bg-white/20'
            }`}
          />
        </div>
      ))}
    </div>
  );
}

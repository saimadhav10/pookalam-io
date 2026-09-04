export default function PlayerList({ players, hostId, currentPlayerId }) {
  return (
    <div className="space-y-2">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 animate-slide-up border ${
            player.id === currentPlayerId
              ? 'bg-primary-fixed/30 border-primary/30'
              : 'bg-surface-container-low border-outline-variant/20'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-sm ${
              player.id === currentPlayerId
                ? 'bg-primary text-white'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {player.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="font-body font-medium text-on-surface truncate flex items-center gap-2">
              {player.name}
              {player.id === currentPlayerId && (
                <span className="text-xs text-primary font-bold">(You)</span>
              )}
            </p>
          </div>

          {/* Host badge */}
          {player.id === hostId && (
            <span className="badge-terra-green text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Host
            </span>
          )}

          {/* Connected status */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              player.connected !== false ? 'bg-primary' : 'bg-surface-dim'
            }`}
          />
        </div>
      ))}
    </div>
  );
}

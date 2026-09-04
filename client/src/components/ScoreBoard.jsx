export default function ScoreBoard({ results, showRoundScore = true, highlight = null }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="bg-white/5">
            <th className="px-4 py-3 text-left text-xs font-display font-semibold text-onam-gold uppercase tracking-wider">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-xs font-display font-semibold text-onam-gold uppercase tracking-wider">
              Player
            </th>
            {showRoundScore && (
              <th className="px-4 py-3 text-right text-xs font-display font-semibold text-onam-gold uppercase tracking-wider">
                Round
              </th>
            )}
            <th className="px-4 py-3 text-right text-xs font-display font-semibold text-onam-gold uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((player, index) => (
            <tr
              key={player.id}
              className={`border-t border-white/5 transition-all duration-300 animate-slide-up ${
                highlight === player.id
                  ? 'bg-onam-gold/10'
                  : index % 2 === 0
                  ? 'bg-white/[0.02]'
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <td className="px-4 py-3">
                <span
                  className={`font-display font-bold ${
                    index === 0
                      ? 'text-onam-gold text-lg'
                      : index === 1
                      ? 'text-gray-300'
                      : index === 2
                      ? 'text-orange-400'
                      : 'text-white/50'
                  }`}
                >
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </span>
              </td>
              <td className="px-4 py-3 font-body font-medium text-onam-cream">
                {player.name}
              </td>
              {showRoundScore && (
                <td className="px-4 py-3 text-right font-display font-semibold text-onam-cream">
                  {player.roundScore ?? '-'}
                </td>
              )}
              <td className="px-4 py-3 text-right font-display font-bold text-onam-gold">
                {player.cumulativeScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

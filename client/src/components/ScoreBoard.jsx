export default function ScoreBoard({ results, showRoundScore = true, highlight = null }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-outline-variant/30">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-container-high">
            <th className="px-4 py-3 text-left text-xs font-headline font-semibold text-primary uppercase tracking-wider">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-xs font-headline font-semibold text-primary uppercase tracking-wider">
              Player
            </th>
            {showRoundScore && (
              <th className="px-4 py-3 text-right text-xs font-headline font-semibold text-primary uppercase tracking-wider">
                Round
              </th>
            )}
            <th className="px-4 py-3 text-right text-xs font-headline font-semibold text-primary uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((player, index) => (
            <tr
              key={player.id}
              className={`border-t border-outline-variant/20 transition-all duration-300 animate-slide-up ${
                highlight === player.id
                  ? 'bg-primary-fixed/20'
                  : index % 2 === 0
                  ? 'bg-surface-container-lowest/50'
                  : 'bg-surface-container-lowest'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <td className="px-4 py-3">
                <span
                  className={`font-numeric font-bold ${
                    index === 0
                      ? 'text-[#d69a3a] text-lg'
                      : index === 1
                      ? 'text-on-surface-variant text-lg'
                      : index === 2
                      ? 'text-[#b83230] text-lg'
                      : 'text-on-surface-variant/50'
                  }`}
                >
                  #{index + 1}
                </span>
              </td>
              <td className="px-4 py-3 font-body font-medium text-on-surface">
                {player.name}
              </td>
              {showRoundScore && (
                <td className="px-4 py-3 text-right font-numeric font-semibold text-on-surface">
                  {player.roundScore ?? '-'}
                </td>
              )}
              <td className="px-4 py-3 text-right font-numeric font-bold text-[#d69a3a]">
                {player.cumulativeScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import ScoreBoard from '../components/ScoreBoard';
import PetalAnimation from '../components/PetalAnimation';

function ConfettiPiece({ delay, left, color, shape }) {
  return (
    <div
      className="confetti-piece animate-confetti"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
        color,
        fontSize: `${14 + Math.random() * 10}px`,
      }}
    >
      {shape}
    </div>
  );
}

export default function FinalResults() {
  const { finalResults, playerId, isHost, playAgain, backToLobby } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!finalResults) return null;

  const { results, winnerId, winnerName } = finalResults;
  const isWinner = playerId === winnerId;
  const top3 = results.slice(0, 3);

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    left: Math.random() * 100,
    color: ['#F5A623', '#E8721C', '#C0392B', '#E91E63', '#27AE60', '#F1C40F'][
      Math.floor(Math.random() * 6)
    ],
    shape: ['🌸', '🌺', '✨', '⭐', '🎉', '🌼'][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <PetalAnimation count={25} />

      {/* Confetti */}
      {showConfetti &&
        confettiPieces.map((piece) => <ConfettiPiece key={piece.id} {...piece} />)}

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Trophy */}
        <div className="text-center animate-scale-in">
          <div className="text-7xl mb-4 animate-float">🏆</div>
          <h1 className="font-display text-4xl md:text-5xl font-black bg-gradient-to-r from-onam-gold via-onam-orange to-onam-gold bg-clip-text text-transparent">
            Game Over!
          </h1>
        </div>

        {/* Winner announcement */}
        <div className="glass-card px-10 py-8 text-center animate-scale-in border-onam-gold/40 shadow-onam-gold/20 shadow-2xl">
          <p className="text-sm text-onam-cream/50 font-body uppercase tracking-wider mb-2">
            🌟 Champion 🌟
          </p>
          <p className="font-display text-4xl font-black text-onam-gold mb-2">
            {winnerName}
          </p>
          <p className="text-onam-cream/60 font-body">
            with <span className="text-onam-gold font-bold">{results[0]?.cumulativeScore}</span> total points
          </p>
          {isWinner && (
            <p className="text-onam-orange font-display font-bold mt-3 animate-pulse-soft text-lg">
              🎉 That's you! Congratulations! 🎉
            </p>
          )}
        </div>

        {/* Podium */}
        {top3.length >= 2 && (
          <div className="flex items-end justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* 2nd place */}
            {top3[1] && (
              <div className="flex flex-col items-center">
                <div className="glass-card p-4 text-center w-28">
                  <p className="text-2xl mb-1">🥈</p>
                  <p className="font-display font-bold text-onam-cream text-sm truncate">
                    {top3[1].name}
                  </p>
                  <p className="text-onam-cream/50 text-xs font-body">
                    {top3[1].cumulativeScore} pts
                  </p>
                </div>
                <div className="w-28 h-16 bg-gradient-to-t from-gray-600/20 to-gray-500/10 rounded-t-lg mt-2" />
              </div>
            )}

            {/* 1st place */}
            <div className="flex flex-col items-center -mb-4">
              <div className="glass-card p-4 text-center w-32 border-onam-gold/40 animate-glow">
                <p className="text-3xl mb-1">🥇</p>
                <p className="font-display font-bold text-onam-gold text-base truncate">
                  {top3[0].name}
                </p>
                <p className="text-onam-gold/70 text-xs font-body">
                  {top3[0].cumulativeScore} pts
                </p>
              </div>
              <div className="w-32 h-24 bg-gradient-to-t from-onam-gold/20 to-onam-gold/5 rounded-t-lg mt-2" />
            </div>

            {/* 3rd place */}
            {top3[2] && (
              <div className="flex flex-col items-center">
                <div className="glass-card p-4 text-center w-28">
                  <p className="text-2xl mb-1">🥉</p>
                  <p className="font-display font-bold text-onam-cream text-sm truncate">
                    {top3[2].name}
                  </p>
                  <p className="text-onam-cream/50 text-xs font-body">
                    {top3[2].cumulativeScore} pts
                  </p>
                </div>
                <div className="w-28 h-10 bg-gradient-to-t from-orange-700/20 to-orange-600/10 rounded-t-lg mt-2" />
              </div>
            )}
          </div>
        )}

        {/* Full scoreboard */}
        <div className="w-full animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="section-title text-lg mb-3">📊 Final Standings</h3>
          <ScoreBoard
            results={results}
            showRoundScore={false}
            highlight={playerId}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <button onClick={backToLobby} className="btn-secondary">
            🏠 Leave
          </button>
          {isHost && (
            <button onClick={playAgain} className="btn-primary text-lg px-8">
              🔄 Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

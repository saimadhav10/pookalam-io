import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import ScoreBoard from '../components/ScoreBoard';

function ConfettiPiece({ delay, left, color, isCircle }) {
  return (
    <div
      className="confetti-piece animate-confetti"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2.5 + Math.random() * 2}s`,
        backgroundColor: color,
        width: `${8 + Math.random() * 6}px`,
        height: `${8 + Math.random() * 6}px`,
        borderRadius: isCircle ? '50%' : '2px',
        opacity: 0.8,
      }}
    />
  );
}

export default function FinalResults() {
  const { finalResults, playerId, isHost, playAgain, backToLobby } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!finalResults) return null;

  const { results, winnerId, winnerName } = finalResults;
  const isWinner = playerId === winnerId;
  const top3 = results.slice(0, 3);

  const confettiPieces = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2.5,
    left: Math.random() * 100,
    color: ['#4a7c59', '#c86343', '#d69a3a', '#705c30', '#78a886', '#e5b352'][
      Math.floor(Math.random() * 6)
    ],
    isCircle: i % 2 === 0,
  }));

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Subtle organic background mandala */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vw] max-w-none" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Confetti Particles */}
      {showConfetti &&
        confettiPieces.map((piece) => <ConfettiPiece key={piece.id} {...piece} />)}

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl w-full">
        {/* Championship Header */}
        <div className="text-center animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-tertiary-fixed text-ochre flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce-trophy">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H8v2h8v-2h-1c-.55 0-1-.45-1-1v-2.34" />
              <path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z" />
            </svg>
          </div>
          <span className="badge-terra-warm inline-block mb-1">
            Season Tournament Finale
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl font-black text-on-surface">
            Festival Grand Finale
          </h1>
          <p className="font-headline italic text-primary text-base sm:text-lg mt-1">
            Celebrating Onam Artistry & Floral Mastery
          </p>
        </div>

        {/* Winner Announcement Card */}
        <div className="terra-card px-8 py-6 text-center animate-scale-in border-2 border-ochre/40 shadow-terra-card w-full bg-surface-container-lowest">
          <div className="flex items-center justify-center gap-1.5 text-ochre text-xs font-label uppercase tracking-widest font-bold mb-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
            Tournament Champion
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          </div>
          <p className="font-headline text-3xl sm:text-4xl font-black text-on-surface mb-1">
            {winnerName}
          </p>
          <p className="font-numeric font-bold text-primary text-base sm:text-lg">
            {results[0]?.cumulativeScore} Total Points
          </p>
          {isWinner && (
            <div className="mt-3 px-4 py-2 rounded-xl bg-primary-fixed/40 border border-primary/30 inline-block animate-pulse-soft">
              <p className="text-primary font-headline font-bold text-sm">
                Congratulations! You are the Pookalam Grand Master!
              </p>
            </div>
          )}
        </div>

        {/* 3D Podium Layout */}
        {top3.length >= 2 && (
          <div className="flex items-end justify-center gap-3 sm:gap-4 w-full animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center flex-1 max-w-[120px]">
                <div className="terra-card p-3 text-center w-full bg-surface-container-lowest border-outline-variant/50">
                  <span className="font-numeric font-bold text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full inline-block mb-1">
                    #2
                  </span>
                  <p className="font-headline font-bold text-on-surface text-xs sm:text-sm truncate">
                    {top3[1].name}
                  </p>
                  <p className="font-numeric text-on-surface-variant text-[11px] font-semibold">
                    {top3[1].cumulativeScore} pts
                  </p>
                </div>
                <div className="w-full h-16 sm:h-20 bg-gradient-to-t from-[#bcb6aa] to-[#dcd8d0] rounded-t-xl mt-2 flex items-center justify-center shadow-sm">
                  <span className="font-numeric font-bold text-xs text-[#474238] uppercase tracking-wider">
                    Silver
                  </span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            <div className="flex flex-col items-center flex-1 max-w-[140px] -mb-2">
              <div className="terra-card p-3.5 text-center w-full border-2 border-ochre/50 bg-surface-container-lowest shadow-md">
                <div className="w-6 h-6 mx-auto mb-1 text-ochre">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                </div>
                <p className="font-headline font-bold text-on-surface text-sm sm:text-base truncate">
                  {top3[0].name}
                </p>
                <p className="font-numeric font-bold text-ochre text-xs sm:text-sm">
                  {top3[0].cumulativeScore} pts
                </p>
              </div>
              <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-[#b37c18] via-[#e2a83b] to-[#f0c368] rounded-t-xl mt-2 flex items-center justify-center shadow-md">
                <span className="font-numeric font-black text-sm text-[#543600] uppercase tracking-wider">
                  Champion
                </span>
              </div>
            </div>

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center flex-1 max-w-[120px]">
                <div className="terra-card p-3 text-center w-full bg-surface-container-lowest border-outline-variant/50">
                  <span className="font-numeric font-bold text-xs text-terracotta bg-terracotta-container px-2 py-0.5 rounded-full inline-block mb-1">
                    #3
                  </span>
                  <p className="font-headline font-bold text-on-surface text-xs sm:text-sm truncate">
                    {top3[2].name}
                  </p>
                  <p className="font-numeric text-on-surface-variant text-[11px] font-semibold">
                    {top3[2].cumulativeScore} pts
                  </p>
                </div>
                <div className="w-full h-12 sm:h-14 bg-gradient-to-t from-[#99432d] via-[#c6654b] to-[#e38c74] rounded-t-xl mt-2 flex items-center justify-center shadow-sm">
                  <span className="font-numeric font-bold text-xs text-[#4f1a0d] uppercase tracking-wider">
                    Bronze
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Full Standings Scoreboard */}
        <div className="terra-card p-4 w-full animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface">
              Full Standings
            </h3>
            <span className="text-xs font-label font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant/40">
              {results.length} Florists
            </span>
          </div>
          <ScoreBoard
            results={results}
            showRoundScore={false}
            highlight={playerId}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-slide-up pt-2" style={{ animationDelay: '0.7s' }}>
          <button onClick={backToLobby} className="btn-terra-secondary flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Lobby
          </button>
          {isHost && (
            <button onClick={playAgain} className="btn-terra-primary flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

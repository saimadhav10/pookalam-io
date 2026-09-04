import { useGame } from '../context/GameContext';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';

export default function RoundResults() {
  const { roundResults, playerId } = useGame();

  if (!roundResults) return null;

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center px-4 py-8 relative overflow-x-hidden">
      {/* Subtle organic background mandala */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[140vw] h-[140vw] max-w-none" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl w-full">
        {/* Festive Mango Leaf Garland Line */}
        <div className="w-full max-w-md">
          <svg className="w-full h-5 text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 600 20">
            <path d="M0 0 C 75 16, 125 16, 200 0 C 275 16, 325 16, 400 0 C 475 16, 525 16, 600 0" stroke="#78a886" strokeWidth="2.5" />
            <circle cx="100" cy="10" fill="#c86343" r="3.5" />
            <circle cx="300" cy="10" fill="#c4a66a" r="3.5" />
            <circle cx="500" cy="10" fill="#c86343" r="3.5" />
          </svg>
        </div>

        {/* Header */}
        <div className="text-center animate-slide-down">
          <span className="badge-terra-warm mb-2 inline-block">
            Round {roundResults.round} of {roundResults.totalRounds} Complete
          </span>
          <h1 className="font-headline text-3xl sm:text-4xl font-black text-on-surface">
            Round Standings
          </h1>
        </div>

        {/* Winner Announcement */}
        {roundResults.results.length > 0 && (
          <div className="terra-card px-8 py-6 text-center animate-scale-in border border-ochre/40 w-full relative overflow-hidden bg-surface-container-lowest">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H8v2h8v-2h-1c-.55 0-1-.45-1-1v-2.34" />
                <path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
              Round Winner
            </p>
            <p className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mt-1">
              {roundResults.results[0].name}
            </p>
            <p className="font-numeric font-bold text-primary text-sm sm:text-base mt-1">
              +{roundResults.results[0].roundScore} points this round
            </p>
          </div>
        )}

        {/* Score Table */}
        <div className="terra-card p-4 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <ScoreBoard
            results={roundResults.results}
            showRoundScore={true}
            highlight={playerId}
          />
        </div>

        {/* Auto-Advance Indicator */}
        <div className="flex flex-col items-center gap-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">
            Next round begins in...
          </p>
          <Timer duration={roundResults.displayTime} size="normal" />
        </div>
      </div>
    </div>
  );
}

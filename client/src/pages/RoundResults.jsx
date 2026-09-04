import { useGame } from '../context/GameContext';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';

export default function RoundResults() {
  const { roundResults, playerId } = useGame();

  if (!roundResults) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-xl w-full">
        {/* Header */}
        <div className="text-center animate-slide-down">
          <span className="badge-gold mb-3 inline-block">
            Round {roundResults.round} of {roundResults.totalRounds}
          </span>
          <h1 className="font-display text-3xl font-bold text-onam-cream">
            📊 Round Results
          </h1>
        </div>

        {/* Winner announcement */}
        {roundResults.results.length > 0 && (
          <div className="glass-card px-8 py-6 text-center animate-scale-in border-onam-gold/30">
            <p className="text-sm text-onam-cream/50 font-body mb-1">Round Winner</p>
            <p className="font-display text-2xl font-bold text-onam-gold">
              🏆 {roundResults.results[0].name}
            </p>
            <p className="text-onam-cream/60 font-body mt-1">
              {roundResults.results[0].roundScore} points this round
            </p>
          </div>
        )}

        {/* Score table */}
        <div className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <ScoreBoard
            results={roundResults.results}
            showRoundScore={true}
            highlight={playerId}
          />
        </div>

        {/* Auto-advance indicator */}
        <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-onam-cream/40 font-body">
            Next round starting in...
          </p>
          <Timer duration={roundResults.displayTime} size="normal" />
        </div>
      </div>
    </div>
  );
}

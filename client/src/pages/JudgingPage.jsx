import { useGame } from '../context/GameContext';
import Timer from '../components/Timer';
import StarRating from '../components/StarRating';

export default function JudgingPage() {
  const {
    judgingData,
    playerId,
    submitVote,
    hasVoted,
    currentRound,
    totalRounds,
  } = useGame();

  if (!judgingData) return null;

  const isOwnPookalam = judgingData.targetPlayerId === playerId;

  const handleRate = (score) => {
    submitVote(judgingData.targetPlayerId, score);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center px-4 py-6 relative overflow-x-hidden">
      {/* Subtle organic background mandala */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[140vw] h-[140vw] max-w-none" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between mb-6 animate-slide-down">
        <div className="flex items-center gap-3">
          <span className="badge-terra-warm">
            Round {currentRound} of {totalRounds}
          </span>
          <span className="text-on-surface-variant font-label text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/40">
            Judging {judgingData.judgingIndex + 1} of {judgingData.totalToJudge}
          </span>
        </div>
        <Timer
          key={`${judgingData.targetPlayerId}-${judgingData.judgingIndex}`}
          duration={judgingData.duration}
          size="normal"
        />
      </div>

      {/* Judge Header */}
      <div className="relative z-10 text-center mb-8 animate-slide-down">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
            {isOwnPookalam ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C12 2 7 8 7 13C7 16.31 9.69 19 13 19C16.31 19 19 16.31 19 13C19 8 12 2 12 2Z" fill="currentColor" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
              </svg>
            )}
          </div>
          <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
            Peer Review Stage
          </span>
        </div>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
          {isOwnPookalam ? 'Your Floral Carpet' : `Rate ${judgingData.targetPlayerName}'s Floral Carpet`}
        </h2>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="relative z-10 flex-1 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
        {/* Reference Image */}
        <div className="flex flex-col items-center gap-3 animate-slide-up">
          <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-ochre bg-surface-container-high px-3.5 py-1.5 rounded-full border border-outline-variant/40">
            <span className="w-2 h-2 rounded-full bg-ochre animate-pulse-soft" />
            Target Reference
          </div>
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-ochre/40 shadow-terra-card bg-surface-container-lowest p-1.5 flex items-center justify-center">
            <img
              src={`/pookalams/${judgingData.referenceImage}`}
              alt="Reference Pookalam"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* VS Emblem */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-terracotta text-white flex items-center justify-center font-headline font-black text-xl shadow-terra-terracotta border-2 border-[#e8815b]">
            VS
          </div>
        </div>

        {/* Player's Creation */}
        <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-primary bg-primary-fixed/40 px-3.5 py-1.5 rounded-full border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            {judgingData.targetPlayerName}'s Creation
          </div>
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/40 shadow-terra-card bg-surface-container-lowest p-1.5 flex items-center justify-center">
            <img
              src={judgingData.canvasDataUrl}
              alt={`${judgingData.targetPlayerName}'s Pookalam`}
              className="w-full h-full object-cover rounded-full bg-white"
            />
          </div>
        </div>
      </div>

      {/* Voting Area */}
      <div className="relative z-10 terra-card px-8 py-6 text-center max-w-xl w-full animate-scale-in">
        {isOwnPookalam ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12a4 4 0 0 0 8 0" />
              </svg>
            </div>
            <p className="font-headline font-bold text-lg text-on-surface">
              This is yours! Sit back and relax
            </p>
            <p className="font-body text-sm text-on-surface-variant">
              Other florists are evaluating your creation right now.
            </p>
          </div>
        ) : hasVoted ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center mb-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-headline font-bold text-lg text-primary">
              Vote recorded!
            </p>
            <p className="font-body text-sm text-on-surface-variant">
              Waiting for others to finish rating...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div>
              <p className="font-headline font-bold text-lg text-on-surface">
                How accurately did they capture the pattern?
              </p>
              <p className="font-body text-xs text-on-surface-variant mt-1">
                Rate petal symmetry, concentric harmony, and color fidelity.
              </p>
            </div>
            <StarRating onRate={handleRate} size="large" />
          </div>
        )}
      </div>
    </div>
  );
}

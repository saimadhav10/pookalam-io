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
    <div className="min-h-screen flex flex-col items-center px-4 py-6 relative">
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 animate-slide-down">
        <div className="flex items-center gap-4">
          <span className="badge-gold">
            Round {currentRound} / {totalRounds}
          </span>
          <span className="text-onam-cream/50 font-body text-sm">
            Judging {judgingData.judgingIndex + 1} of {judgingData.totalToJudge}
          </span>
        </div>
        <Timer
          key={`${judgingData.targetPlayerId}-${judgingData.judgingIndex}`}
          duration={judgingData.duration}
          size="normal"
        />
      </div>

      {/* Judge header */}
      <div className="text-center mb-8 animate-slide-down">
        <h2 className="font-display text-2xl font-bold text-onam-cream">
          {isOwnPookalam ? '🪞 Your Pookalam' : `⭐ Rate ${judgingData.targetPlayerName}'s Pookalam`}
        </h2>
      </div>

      {/* Side by side comparison */}
      <div className="flex-1 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
        {/* Reference */}
        <div className="flex flex-col items-center gap-3 animate-slide-up">
          <h3 className="font-display font-semibold text-onam-gold text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-onam-gold animate-pulse-soft" />
            Reference
          </h3>
          <div className="rounded-full overflow-hidden border-4 border-onam-gold/30 shadow-2xl">
            <img
              src={`/pookalams/${judgingData.referenceImage}`}
              alt="Reference Pookalam"
              className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-full"
            />
          </div>
        </div>

        {/* VS */}
        <div className="font-display text-3xl text-onam-cream/20 font-bold hidden md:block">
          VS
        </div>

        {/* Player's creation */}
        <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <h3 className="font-display font-semibold text-onam-green text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-onam-green animate-pulse-soft" />
            {judgingData.targetPlayerName}'s Creation
          </h3>
          <div className="rounded-full overflow-hidden border-4 border-onam-green/30 shadow-2xl">
            <img
              src={judgingData.canvasDataUrl}
              alt={`${judgingData.targetPlayerName}'s Pookalam`}
              className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-full bg-white"
            />
          </div>
        </div>
      </div>

      {/* Voting Area */}
      <div className="glass-card px-8 py-6 text-center animate-scale-in">
        {isOwnPookalam ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">🌸</span>
            <p className="text-onam-cream font-display font-semibold text-lg">
              This is yours! Sit back and relax
            </p>
            <p className="text-onam-cream/50 text-sm font-body">
              Others are rating your creation right now
            </p>
          </div>
        ) : hasVoted ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl animate-star-pop">✅</span>
            <p className="text-onam-green font-display font-semibold text-lg">
              Vote submitted!
            </p>
            <p className="text-onam-cream/50 text-sm font-body">
              Waiting for others to vote...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-onam-cream/70 font-body">How well did they recreate it?</p>
            <StarRating onRate={handleRate} size="large" />
          </div>
        )}
      </div>
    </div>
  );
}

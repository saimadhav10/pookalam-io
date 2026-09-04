import { useState, useEffect } from 'react';

export default function Timer({ duration, onEnd, size = 'normal' }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const progress = timeLeft / duration;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - progress);

  const isUrgent = timeLeft <= 10;
  const isWarning = timeLeft <= 20 && !isUrgent;

  const strokeColor = isUrgent
    ? '#C0392B'
    : isWarning
    ? '#F5A623'
    : '#27AE60';

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeDisplay = mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}`;

  const sizeClasses = size === 'large' ? 'w-32 h-32' : 'w-20 h-20';
  const textSize = size === 'large' ? 'text-3xl' : 'text-lg';

  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <span
        className={`${textSize} font-display font-bold ${
          isUrgent ? 'text-onam-red animate-countdown-pulse' : 'text-onam-cream'
        }`}
      >
        {timeDisplay}
      </span>
    </div>
  );
}

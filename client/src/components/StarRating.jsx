import { useState } from 'react';

export default function StarRating({ onRate, disabled = false, size = 'normal' }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const handleClick = (rating) => {
    if (disabled || selectedStar > 0) return;
    setSelectedStar(rating);
    onRate?.(rating);
  };

  const starSize = size === 'large' ? 'w-12 h-12' : 'w-9 h-9';

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoveredStar || selectedStar);
        const isSelected = selectedStar > 0;

        return (
          <button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !isSelected && !disabled && setHoveredStar(star)}
            onMouseLeave={() => !isSelected && setHoveredStar(0)}
            disabled={disabled || isSelected}
            className={`star-icon ${starSize} transition-all duration-200 ${
              isSelected && star <= selectedStar ? 'animate-star-pop' : ''
            } ${disabled || isSelected ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFilled ? '#F5A623' : 'none'}
              stroke={isFilled ? '#F5A623' : 'rgba(255,255,255,0.3)'}
              strokeWidth="1.5"
              className="w-full h-full drop-shadow-lg"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
      {selectedStar > 0 && (
        <span className="ml-3 text-onam-gold font-display font-semibold animate-scale-in">
          {selectedStar}/5 ✓
        </span>
      )}
    </div>
  );
}

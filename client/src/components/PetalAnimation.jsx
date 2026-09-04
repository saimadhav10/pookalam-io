import { useEffect, useState } from 'react';

const PETAL_COLORS = [
  '#4a7c59', // primary
  '#d69a3a', // ochre
  '#b83230', // terracotta
];

function Petal({ delay, duration, left, color, size }) {
  return (
    <div
      className="petal animate-petal-fall absolute top-[-10%] opacity-60"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`,
        color,
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
        <path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" />
      </svg>
    </div>
  );
}

export default function PetalAnimation({ count = 15 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      left: Math.random() * 100,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      size: 16 + Math.random() * 24,
    }));
    setPetals(newPetals);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} />
      ))}
    </div>
  );
}

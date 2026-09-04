import { useEffect, useState } from 'react';

const PETAL_COLORS = [
  '#F5A623', '#E8721C', '#C0392B', '#E91E63',
  '#F1C40F', '#27AE60', '#FFFFFF', '#6C3483',
];

const PETAL_SHAPES = ['●', '❀', '✿', '🌸', '🌺', '✾'];

function Petal({ delay, duration, left, color, shape, size }) {
  return (
    <div
      className="petal animate-petal-fall"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        fontSize: `${size}px`,
        color,
      }}
    >
      {shape}
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
      shape: PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)],
      size: 12 + Math.random() * 20,
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

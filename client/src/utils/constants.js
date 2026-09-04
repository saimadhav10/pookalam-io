export const PHASES = {
  LOBBY: 'LOBBY',
  WAITING: 'WAITING',
  CREATION: 'CREATION',
  JUDGING: 'JUDGING',
  ROUND_RESULTS: 'ROUND_RESULTS',
  FINAL_RESULTS: 'FINAL_RESULTS',
};

export const CREATION_TIME_OPTIONS = [
  { value: 30, label: '30 seconds' },
  { value: 60, label: '1 minute' },
  { value: 120, label: '2 minutes' },
  { value: 180, label: '3 minutes' },
];

export const JUDGING_TIME_OPTIONS = [
  { value: 15, label: '15 seconds' },
  { value: 30, label: '30 seconds' },
  { value: 45, label: '45 seconds' },
];

export const DRAWING_COLORS = [
  '#F5A623', // Marigold Gold
  '#E8721C', // Chrysanthemum Orange
  '#C0392B', // Hibiscus Red
  '#E91E63', // Rose Pink
  '#6C3483', // Purple
  '#2980B9', // Blue
  '#27AE60', // Leaf Green
  '#1B5E20', // Dark Green
  '#F1C40F', // Bright Yellow
  '#FFFFFF', // White / Jasmine
  '#8B4513', // Brown
  '#2C3E50', // Dark
];

export const BRUSH_SIZES = [
  { value: 3, label: 'S' },
  { value: 8, label: 'M' },
  { value: 16, label: 'L' },
];

export const SERVER_URL = 'http://localhost:3001';

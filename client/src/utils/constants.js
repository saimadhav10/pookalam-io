export const PHASES = {
  LOBBY: 'LOBBY',
  WAITING: 'WAITING',
  CREATION: 'CREATION',
  JUDGING: 'JUDGING',
  ROUND_RESULTS: 'ROUND_RESULTS',
  FINAL_RESULTS: 'FINAL_RESULTS',
};

export const CREATION_TIME_OPTIONS = [
  { value: 30, label: '30s' },
  { value: 60, label: '60s' },
  { value: 120, label: '120s' },
  { value: 180, label: '180s' },
];

export const JUDGING_TIME_OPTIONS = [
  { value: 15, label: '15s Quick' },
  { value: 30, label: '30s Balanced' },
  { value: 45, label: '45s Chill' },
];

// Authentic Kerala flower petal colors
export const DRAWING_COLORS = [
  { hex: '#c0392b', name: 'Chethi' },      // Hibiscus Crimson
  { hex: '#d69a3a', name: 'Jamanthi' },     // Marigold Gold
  { hex: '#34495e', name: 'Shanku' },       // Butterfly Pea Indigo
  { hex: '#ffffff', name: 'Thumba' },       // Sacred White
  { hex: '#fdf8ee', name: 'Mulla' },        // Jasmine Cream
  { hex: '#d97d8f', name: 'Arali' },        // Oleander Pink
  { hex: '#c86d48', name: 'Kongini' },      // Lantana Orange
  { hex: '#4a7c59', name: 'Pachila' },      // Bilva Leaf Green
  { hex: '#5b7f95', name: 'Neela' },        // Jacaranda Blue
  { hex: '#e5b352', name: 'Manjal' },       // Turmeric Yellow
  { hex: '#7a5c43', name: 'Nelam' },        // Soil Umber
  { hex: '#5e7d42', name: 'Kaitha' },       // Screw Pine Olive
];

export const BRUSH_SIZES = [
  { value: 3, label: 'Fine 3px' },
  { value: 8, label: 'Mid 8px' },
  { value: 16, label: 'Bold 16px' },
  { value: 28, label: 'Cluster 28' },
];

export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.PROD ? '' : 'http://localhost:3001');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MD3 Core - Primary (Forest Green)
        primary: '#4a7c59',
        'primary-container': '#78a886',
        'on-primary': '#ffffff',
        'on-primary-container': '#183823',
        'primary-fixed': '#c8e8d0',
        'primary-fixed-dim': '#8ecf9e',

        // MD3 Core - Secondary (Warm Earth)
        secondary: '#6b6358',
        'secondary-container': '#f0e8db',
        'secondary-fixed-dim': '#d4ccbf',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#5e5548',

        // MD3 Core - Tertiary (Warm Amber)
        tertiary: '#705c30',
        'tertiary-container': '#c4a66a',
        'tertiary-fixed': '#f8e0a8',
        'tertiary-fixed-dim': '#dcc48e',
        'on-tertiary-container': '#554020',

        // Surface & Background Hierarchy
        background: '#faf6f0',
        surface: '#faf6f0',
        'surface-dim': '#dbd7cf',
        'surface-bright': '#faf6f0',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f1ea',
        'surface-container': '#f0ece4',
        'surface-container-high': '#eae6de',
        'surface-container-highest': '#e4e0d8',
        'surface-variant': '#e4e0d8',
        'on-background': '#2e3230',
        'on-surface': '#2e3230',
        'on-surface-variant': '#4a4e4a',
        'inverse-surface': '#2e3230',
        'inverse-on-surface': '#f5f0e8',
        outline: '#74796e',
        'outline-variant': '#c4c8bc',

        // Error
        error: '#b83230',
        'error-container': '#ffdad8',
        'on-error': '#ffffff',

        // Terra Clay & Festivity
        terracotta: '#c86343',
        'terracotta-dark': '#9b422a',
        'terracotta-light': '#f6dfd8',
        'terracotta-container': '#faebe5',
        clay: '#b85d3b',
        'clay-stone': '#d8d2c6',
        ochre: '#d69a3a',
        'ochre-deep': '#aa7320',
        'amber-clay': '#d9822b',
        'warm-amber': '#e6a147',

        // Kerala Floral Petal Swatches
        'flower-chethi': '#c0392b',
        'flower-jamanthi': '#d69a3a',
        'flower-shanku': '#34495e',
        'flower-thumba': '#ffffff',
        'flower-mulla': '#fdf8ee',
        'flower-arali': '#d97d8f',
        'flower-kongini': '#c86d48',
        'flower-pachila': '#4a7c59',
        'flower-neela': '#5b7f95',
        'flower-manjal': '#e5b352',
        'flower-nelam': '#7a5c43',
        'flower-kaitha': '#5e7d42',
      },
      fontFamily: {
        headline: ['Literata', 'serif'],
        display: ['Literata', 'serif'],
        body: ['Nunito Sans', 'sans-serif'],
        label: ['Nunito Sans', 'sans-serif'],
        numeric: ['Space Grotesk', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        'terra-card': '0 4px 20px -2px rgba(46, 50, 48, 0.05), 0 1px 3px 0 rgba(46, 50, 48, 0.03)',
        'terra-card-hover': '0 12px 28px -6px rgba(74, 124, 89, 0.14), 0 4px 10px -2px rgba(70, 60, 40, 0.06)',
        'terra-btn': '0 4px 0 0 #31583d, 0 8px 16px rgba(74, 124, 89, 0.25)',
        'terra-btn-hover': '0 6px 0 0 #31583d, 0 12px 20px rgba(74, 124, 89, 0.35)',
        'terra-terracotta': '0 4px 0 0 #943a1a, 0 8px 18px rgba(200, 90, 50, 0.25)',
        'terra-secondary': '0 2px 0 0 #c4c8bc',
      },
      animation: {
        'mandala-slow': 'spin-slow 200s linear infinite',
        'mandala-reverse': 'spin-reverse-slow 160s linear infinite',
        'gentle-drift': 'gentle-drift 6s ease-in-out infinite',
        'bounce-trophy': 'bounce-trophy 3.5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'star-pop': 'starPop 0.3s ease-out',
        'countdown-pulse': 'countdownPulse 1s ease-in-out infinite',
        'shimmer-terra': 'terraStripe 3s linear infinite',
        'confetti': 'confetti 3s ease-out forwards',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse-slow': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'gentle-drift': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.45' },
          '50%': { transform: 'translateY(-8px) scale(1.03)', opacity: '0.65' },
        },
        'bounce-trophy': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.03)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        starPop: {
          '0%': { transform: 'scale(0.5)' },
          '70%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        countdownPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        terraStripe: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(1080deg) scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

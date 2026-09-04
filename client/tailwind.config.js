/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onam: {
          gold: '#F5A623',
          orange: '#E8721C',
          red: '#C0392B',
          green: '#27AE60',
          cream: '#FFF8E7',
          deep: '#1A1A2E',
          purple: '#6C3483',
          pink: '#E91E63',
          darkgreen: '#1B5E20',
          amber: '#FF8F00',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'petal-fall': 'petalFall 6s ease-in-out infinite',
        'petal-fall-slow': 'petalFall 10s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'confetti': 'confetti 3s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'star-pop': 'starPop 0.3s ease-out',
        'countdown-pulse': 'countdownPulse 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
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
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(1080deg) scale(0)', opacity: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 166, 35, 0.3), 0 0 10px rgba(245, 166, 35, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 166, 35, 0.6), 0 0 40px rgba(245, 166, 35, 0.3)' },
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
    },
  },
  plugins: [],
}

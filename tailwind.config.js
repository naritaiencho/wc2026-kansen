/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#04081A',
        surface: '#0A1130',
        foreground: '#F0F4FF',
        gold: '#F5C518',
        samurai: '#1E6FFF',
        pitch: '#00E07F',
        daznred: '#E5304C',
      },
      fontFamily: {
        display: ['Anton', 'Noto Sans JP', 'sans-serif'],
        body: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'aurora-1': 'aurora1 22s ease-in-out infinite',
        'aurora-2': 'aurora2 26s ease-in-out infinite',
        'aurora-3': 'aurora3 30s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        aurora1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(8vw, 6vh) scale(1.15)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-7vw, -5vh) scale(1.2)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.1)' },
          '50%': { transform: 'translate(5vw, -7vh) scale(0.95)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(0, 224, 127, 0.45)' },
          '50%': { boxShadow: '0 0 28px rgba(0, 224, 127, 0.85)' },
        },
      },
    },
  },
  plugins: [],
}

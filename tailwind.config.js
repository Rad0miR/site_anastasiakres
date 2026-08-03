/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0F',
        graphite: {
          DEFAULT: '#17171C',
          light: '#24242B',
          soft: '#3A3A44',
        },
        pearl: '#F8F6F7',
        cream: '#FDFBFC',
        rose: {
          50: '#FDF5F7',
          100: '#F9E6EA',
          200: '#F3D2DA',
          300: '#EBB9C4',
          400: '#DC98A8',
          500: '#C87C8D',
          600: '#A86174',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        wordmark: '0.34em',
        wide: '0.14em',
      },
      // Промежуточные ступени прозрачности — вся мягкость стекла построена на них
      opacity: {
        12: '0.12',
        15: '0.15',
        18: '0.18',
        22: '0.22',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },
      borderRadius: {
        card: '26px',
        pill: '999px',
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.6) inset, 0 24px 60px -24px rgba(28,18,22,0.22)',
        lift: '0 40px 80px -32px rgba(28,18,22,0.42)',
        poster: '0 20px 50px -26px rgba(20,12,16,0.55)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}

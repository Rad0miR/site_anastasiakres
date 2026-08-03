/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Палитра снята пипеткой с референса */
        night: {
          DEFAULT: '#060407', // фон страницы
          soft: '#0B080C', // подложка карточки
          line: '#1A1218', // тонкие разделители
        },
        rose: {
          50: '#FDEEF0',
          100: '#FBD9DC',
          200: '#F3BEC3',
          300: '#EFA9B2', // основной розовый
          400: '#E4909C',
          500: '#C8788A',
          600: '#8E5566',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Marck Script', 'cursive'],
      },
      letterSpacing: {
        wordmark: '0.06em',
        wide: '0.14em',
      },
      // Промежуточные ступени прозрачности — на них построена вся мягкость
      opacity: {
        12: '0.12',
        15: '0.15',
        18: '0.18',
        22: '0.22',
        28: '0.28',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        72: '0.72',
        85: '0.85',
      },
      borderRadius: {
        card: '24px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 24px 60px -32px rgba(0,0,0,0.9)',
        lift: '0 34px 70px -30px rgba(0,0,0,0.95), 0 0 0 1px rgba(239,169,178,0.28)',
        glow: '0 0 44px -6px rgba(239,169,178,0.55)',
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

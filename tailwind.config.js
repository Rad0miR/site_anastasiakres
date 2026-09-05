/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* Токены НОВОГО сайта (Kres AI). Версия /v1 их не использует — она
         держит свои значения в src/v1/v1.css, поэтому здесь можно менять
         всё, не боясь сломать первую версию. Палитра снята пипеткой
         с референса «Комп версия». */
      colors: {
        /* Тёмный коричнево-чёрный фон и его оттенки */
        ink: {
          DEFAULT: '#171010', // фон страницы
          deep: '#0C0808', // самая тёмная подложка: футер, вырезы
          soft: '#241A18', // подложка карточки
          line: '#3B2A27', // тонкие разделители и границы
        },
        /* Глубокий тёплый коричнево-бордовый */
        wine: {
          DEFAULT: '#3B2220',
          deep: '#2A1614',
          glow: '#5A2F2C', // из него делаются тёплые свечения
        },
        /* Dusty rose → soft blush → молочный */
        blush: {
          50: '#FFF8F5', // мягкий белый
          100: '#F7E4DF', // тёплый молочный/кремовый
          200: '#F2C9CC', // soft blush pink
          300: '#E9AFAF', // dusty rose — основной акцент
          400: '#D3948F',
          500: '#BE837F', // насыщенный: заливка кнопки
          600: '#8E5F5C',
        },
      },
      fontFamily: {
        /* Основной гротеск сайта: логотип, заголовки, интерфейс, текст */
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        /* Тонкая антиква с широким трекингом: «A BRIGHTER TOMORROW» */
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        /* Рукописные пометки поверх фотографий */
        script: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        wordmark: '-0.02em',
        wide: '0.16em',
        widest: '0.28em',
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
        card: '18px',
        tile: '14px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 24px 60px -34px rgba(0,0,0,0.95)',
        tile: 'inset 0 1px 0 rgba(255,248,245,0.06), 0 18px 40px -28px rgba(0,0,0,0.9)',
        lift: '0 34px 70px -30px rgba(0,0,0,0.95)',
        glow: '0 0 34px -6px rgba(233,175,175,0.5)',
        /* Свечение выбранной карточки стиля */
        pick: '0 0 0 1.5px rgba(255,248,245,0.9), 0 0 30px -2px rgba(233,175,175,0.55), 0 22px 50px -26px rgba(0,0,0,0.95)',
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

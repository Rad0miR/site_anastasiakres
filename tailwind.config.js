import v2 from './src/v2/tokens.js'

/**
 * Общий Tailwind на все версии сайта.
 *
 * Сам по себе этот файл ничего не оформляет: он только собирает токены
 * версий, каждый — под своим префиксом. Токены v2 лежат в
 * src/v2/tokens.js и попадают в тему как v2-ink, v2-blush-300,
 * v2-card, v2-silk; токены будущей v3 попадут как v3-… и переопределить
 * чужие не смогут при всём желании.
 *
 * ЧТОБЫ ДОБАВИТЬ ВЕРСИЮ: положите src/v3/tokens.js и допишите две строки —
 * import v3 from './src/v3/tokens.js' и { prefix: 'v3', tokens: v3 } ниже.
 *
 * ДВА ПРАВИЛА, НА КОТОРЫХ ВСЁ ДЕРЖИТСЯ:
 *
 *   1. Ничего не пишем в theme мимо extend — стандартные утилиты
 *      Tailwind (отступы, sm/md/lg, white, opacity-50) общие для всех
 *      версий, и переопределять их нельзя.
 *   2. Не заводим здесь токенов без префикса версии — иначе новая
 *      версия однажды перекрасит старую.
 *
 * Версия /v1 сюда не заглядывает вовсе: её оформление целиком в
 * src/v1/v1.css, а в разметке — только стандартные утилиты и точные
 * значения в скобках. Это тоже рабочий способ; префиксы просто короче.
 */
const VERSIONS = [{ prefix: 'v2', tokens: v2 }]

/** { colors: { ink: … } } → { colors: { 'v2-ink': … } } */
function withPrefix(prefix, tokens) {
  return Object.fromEntries(
    Object.entries(tokens).map(([group, values]) => [
      group,
      Object.fromEntries(Object.entries(values).map(([name, value]) => [`${prefix}-${name}`, value])),
    ]),
  )
}

const extend = {}
for (const { prefix, tokens } of VERSIONS) {
  for (const [group, values] of Object.entries(withPrefix(prefix, tokens))) {
    extend[group] = { ...extend[group], ...values }
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend },
  plugins: [],
}

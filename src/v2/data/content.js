/**
 * Весь текст сайта Kres AI — в одном файле.
 *
 * Вёрстку трогать не нужно: меняешь строку здесь — меняется на странице.
 * Названия соцсетей, типов контента и стилей лежат отдельно (social.js,
 * contentTypes.js, styles.js), потому что там к каждой строке привязаны
 * ссылка, иконка или картинка.
 *
 * ⚠️ В ТЗ два варианта части текста: один в разделе «Готовый текстовый
 * контент», другой на референсе «Комп версия». Здесь взят вариант
 * с референса — он назван финальным изображением-примером. Второй вариант
 * оставлен рядом в комментарии, поменять можно в одну строку.
 */
export const content = {
  /** Логотип. Пишется цельно, разделять нельзя: «Kres» + « AI» — это одно слово. */
  brand: { first: 'Kres', accent: 'AI' },

  header: {
    /** Единственный пункт справа. Больше в шапке ничего быть не должно. */
    connect: 'Let’s connect',
    /** Куда ведёт «Let’s connect» — к блоку соцсетей на этой же странице. */
    connectHref: '#find-me',
  },

  hero: {
    kicker: 'WELCOME TO',
    tagline: 'TURN IDEAS INTO VISUALS', // вариант из ТЗ: 'CREATING WORLDS WITH AI'
    // вариант из ТЗ: 'Visuals, characters, animation and stories — created with AI.'
    lead: ['AI visuals, creative ideas and a little', 'bit of magic. Thanks for being here ♡'],
    cta: 'Explore my worlds',
    ctaHref: '#find-me',
    /** Рукописные пометки поверх фона. Каждая строка выводится с новой. */
    notes: {
      left: ['Create', 'Explore', 'Inspire'],
      topRight: ['Same Girl', 'Bigger Ideas'],
      midRight: ['Good', 'Ideas', 'Brighter', 'Tomorrow'],
    },
  },

  social: { title: 'WHERE YOU CAN FIND ME' },

  types: { title: 'WHAT I CREATE' },

  styles: {
    title: 'MY VISUAL WORLD',
    subtitle: 'Different styles. One creative mind.',
    /** Подсказка под каруселью — появляется, пока ни один стиль не выбран. */
    hint: 'Choose a style to open it',
  },

  /** Большой визуал между стилями и финальной картинкой. */
  showcase: {
    note: ['Small', 'Moments', 'Big Stories'],
  },

  finale: {
    // вариант из ТЗ: 'A WORLD OF VISUALS' / 'CREATED WITH AI'
    title: ['A BRIGHTER', 'TOMORROW'],
    subtitle: 'WITH AI',
    notes: {
      left: ['Create', 'Explore', 'Inspire'],
      right: ['Bigger', 'Ideas', 'Ahead'],
    },
  },

  footer: {
    copyright: '© 2026 Kres AI. All rights reserved.',
    // вариант из ТЗ: 'MORE VISUALS. MORE STORIES.'
    tagline: 'MORE VISUALS. A BRIGHTER TOMORROW.',
  },
}

/**
 * Английский текст сайта Kres AI — исходный.
 *
 * Строки здесь слово в слово те же, что были на сайте до появления
 * переключателя языка: английскую версию правки не касались.
 *
 * Украинский и немецкий — соседние файлы, дерево у всех трёх одинаковое.
 * Добавил ключ здесь — добавь его же в uk.js и de.js, иначе на другом
 * языке в этом месте будет пусто.
 */
export default {
  header: {
    /** Подписи для скринридера: их не видно, но они читаются вслух. */
    language: 'Choose language',
    backToTop: 'Kres AI — back to top',
  },

  hero: {
    kicker: 'WELCOME TO',
    tagline: 'TURN IDEAS INTO VISUALS', // вариант из ТЗ: 'CREATING WORLDS WITH AI'

    /** Личное приветствие автора — над блоком «WELCOME TO». */
    intro: {
      greeting: 'Hi, I’m Anastasia Kres.',
      role: 'My profession is AI Creator.',
      about:
        'I create visuals, characters and stories using artificial intelligence. I love turning ideas into beautiful and unusual visuals.',
      invite: 'And now, let’s turn your idea into a visual and a real project ♡',
    },

    // вариант из ТЗ: 'Visuals, characters, animation and stories — created with AI.'
    lead: ['AI visuals, creative ideas and a little', 'bit of magic. Thanks for being here ♡'],

    /** Две кнопки первого экрана. Стрелка ↓ у обеих рисуется иконкой. */
    ctaTypes: 'Content types',
    ctaSocials: 'My socials',

    /** Рукописные пометки поверх фона. Каждая строка выводится с новой. */
    notes: {
      left: ['Create', 'Explore', 'Inspire'],
      topRight: ['Same Girl', 'Bigger Ideas'],
      midRight: ['Good', 'Ideas', 'Brighter', 'Tomorrow'],
    },
  },

  /**
   * Форма связи «Let’s connect ♡»: кнопка в шапке, блок под соцсетями
   * и само окно с тремя полями.
   *
   * cta — одна строка на три места (шапка, кнопка под соцсетями,
   * заголовок окна). Так они не могут разъехаться по формулировке.
   */
  connect: {
    cta: 'Let’s connect',

    /** Приглашение над кнопкой под соцсетями. Каждая строка — с новой. */
    invite: [
      'Have a question, an idea, or want to order a project?',
      'Leave your contacts and tell me a little about what you want to create ♡',
    ],

    /* Подпись над полем и уточнение в скобках под ней. */
    fields: {
      name: {
        label: 'How should I address you?',
        hint: '(First name, last name)',
        placeholder: 'Anastasia Kres',
      },
      contact: {
        label: 'How can I reach you?',
        hint: '(Telegram username / WhatsApp number)',
        placeholder: '@username',
      },
      message: {
        label: 'Your question or request',
        hint: '',
        placeholder: 'I would like to create…',
      },
    },

    /** Кнопка внизу формы. Сердечко рисуется иконкой. */
    send: 'SEND',
    sending: 'SENDING…',

    /* Три ответа посетителю. Технических подробностей в них нет и быть
       не должно: ни ответа Telegram, ни кода ошибки. */
    success: 'Thank you! Your message has been sent. ♡',
    error: 'Something went wrong. Please try again.',
    empty: 'Please fill in all three fields.',

    /** Подпись для скринридера на крестике. */
    close: 'Close',
  },

  social: {
    title: 'WHERE YOU CAN FIND ME',
    /* Вторая строка карточки — только у двух Instagram. Ключ = id площадки
       из data/social.js; сами названия площадок не переводятся. */
    notes: {
      'instagram-work': 'Work',
      'instagram-personal': 'Personal',
    },
  },

  types: {
    title: 'WHAT I CREATE',
    /* Ключ = id категории из data/contentTypes.js */
    items: {
      'ai-images': 'AI Images',
      'ai-videos': 'AI Videos',
      'ai-animation': 'AI Animation',
      'ai-characters': 'AI Characters',
      'ai-influencers': 'AI Influencers',
      cartoons: 'Cartoons',
      'animated-stories': 'Animated Stories',
      'animated-series': 'Animated Series',
      'product-content': 'Product Content',
      'social-content': 'Social Media Content',
      'visual-storytelling': 'Visual Storytelling',
    },
  },

  styles: {
    title: 'MY VISUAL WORLD',
    subtitle: 'Different styles. One creative mind.',
    /** Подсказка под каруселью — появляется, пока ни один стиль не выбран. */
    hint: 'Choose a style to open it',
    /* Ключ = id стиля из data/styles.js */
    items: {
      cinematic: 'Cinematic',
      cartoon: 'Cartoon',
      disney: 'Disney / Pixar / DreamWorks',
      'vintage-disney': 'Vintage Disney',
      surrealism: 'Surrealism',
      'ultra-realism': 'Ultra Realism',
      luxury: 'Luxury',
      dark: 'Dark',
      'miniature-worlds': 'Miniature Worlds',
      anime: 'Anime',
      cyberpunk: 'Cyberpunk',
    },
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

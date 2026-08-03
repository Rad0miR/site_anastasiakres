/**
 * Единственное место, где живут ссылки и содержимое карточек.
 *
 *  url      — ссылка (меняй свободно)
 *  image    — имя файла в src/assets/images БЕЗ расширения (youtube -> youtube.webp)
 *  sticker  — имя файла в src/assets/images/stickers БЕЗ расширения
 *  theme    — атмосфера фона: apartment | lab | desk | ocean | city | moodboard
 *  featured — true делает карточку широкой (главной) на десктопе
 *
 * Порядок массива = порядок карточек на странице.
 */
export const links = [
  {
    id: 'youtube',
    platform: 'YouTube',
    handle: '@anastasiakress',
    title: 'Тайны нашего мира',
    subtitle: 'Космос · Океан · Наука · История',
    url: 'https://youtube.com/@anastasiakress?si=6TS7uNmvTJfB7V6K',
    image: 'youtube',
    sticker: 'youtube',
    theme: 'ocean',
    featured: true,
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@kres.anastasia',
    title: 'Моя жизнь',
    subtitle: 'Эстетика · Красивые моменты',
    url: 'https://www.instagram.com/kres.anastasia?igsh=MTI3ZTM4dGs4OHRlaw%3D%3D&utm_source=qr',
    image: 'instagram',
    sticker: 'instagram',
    theme: 'apartment',
  },
  {
    id: 'instagram-ai',
    platform: 'Instagram AI',
    handle: '@kres.ai',
    title: 'AI Creator',
    subtitle: 'Нейросети · Эксперименты',
    url: 'https://www.instagram.com/kres.ai?igsh=MTc1eWV5dmVhb2c5',
    image: 'instagram-ai',
    sticker: 'instagram-ai',
    theme: 'lab',
  },
  {
    id: 'threads',
    platform: 'Threads',
    handle: '@kres.anastasia',
    title: 'Мысли и идеи',
    subtitle: 'Личный блог',
    url: 'https://www.threads.com/@kres.anastasia?igshid=NTc4MTIwNjQ2YQ==',
    image: 'threads',
    sticker: 'threads',
    theme: 'desk',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@anastasiakress',
    title: 'Каждый день',
    subtitle: 'Жизнь · Развлечения',
    url: 'https://www.tiktok.com/@anastasiakress?_r=1&_t=ZG-98ZeTli0L6v',
    image: 'tiktok',
    sticker: 'tiktok',
    theme: 'city',
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    handle: 'Nastya Kres',
    title: 'Вдохновение',
    subtitle: 'Идеи · Дизайн · Интерьер',
    url: 'https://pin.it/4t002oJJq',
    image: 'pinterest',
    sticker: 'pinterest',
    theme: 'moodboard',
  },
]

/**
 * Единственное место, где живут ссылки и содержимое карточек.
 *
 *  url      — ссылка (меняй свободно)
 *  image    — имя файла в src/v1/assets БЕЗ расширения (youtube -> youtube.webp)
 *  subtitle — массив строк: каждая строка выводится с новой строки
 *  badge    — розовая плашка в углу карточки, если нужна
 *
 * Порядок массива = порядок карточек на странице.
 */
export const links = [
  {
    id: 'instagram',
    platform: 'Instagram',
    subtitle: ['Мой личный блог'],
    url: 'https://www.instagram.com/kres.anastasia?igsh=MTI3ZTM4dGs4OHRlaw%3D%3D&utm_source=qr',
    image: 'instagram',
  },
  {
    id: 'instagram-ai',
    platform: 'Instagram AI',
    subtitle: ['AI-творчество', 'и вдохновение'],
    url: 'https://www.instagram.com/kres.ai?igsh=MTc1eWV5dmVhb2c5',
    image: 'instagram-ai',
  },
  {
    id: 'threads',
    platform: 'Threads',
    subtitle: ['Мысли, идеи', 'и ежедневные заметки'],
    url: 'https://www.threads.com/@kres.anastasia?igshid=NTc4MTIwNjQ2YQ==',
    image: 'threads',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    subtitle: ['Тайны мира,', 'науки и океана'],
    url: 'https://youtube.com/@anastasiakress?si=6TS7uNmvTJfB7V6K',
    image: 'youtube',
    badge: 'Главная',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    subtitle: ['Лайф-контент', 'и развлечения'],
    url: 'https://www.tiktok.com/@anastasiakress?_r=1&_t=ZG-98ZeTli0L6v',
    image: 'tiktok',
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    subtitle: ['Идеи, вдохновение', 'и эстетика'],
    url: 'https://pin.it/4t002oJJq',
    image: 'pinterest',
  },
]

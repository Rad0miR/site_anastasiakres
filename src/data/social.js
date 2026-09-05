/**
 * Шесть площадок в блоке «WHERE YOU CAN FIND ME».
 *
 *  name  — крупная строка
 *  note  — вторая строка мельче (нужна только двум Instagram)
 *  icon  — ключ из src/components/icons.jsx
 *  url   — ссылка. Пустая строка = карточка рисуется, но не кликается,
 *          вёрстка при этом не ломается.
 *
 * Порядок массива = порядок в строке. Добавлять сюда новые площадки не нужно:
 * по ТЗ их ровно шесть.
 */
export const social = [
  {
    id: 'instagram-work',
    name: 'Instagram',
    note: 'Work',
    icon: 'instagram',
    url: 'https://www.instagram.com/kres.ai?igsh=MTc1eWV5dmVhb2c5',
  },
  {
    id: 'instagram-personal',
    name: 'Instagram',
    note: 'Personal',
    icon: 'instagram',
    url: 'https://www.instagram.com/kres.anastasia?igsh=MTI3ZTM4dGs4OHRlaw%3D%3D&utm_source=qr',
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: 'threads',
    url: 'https://www.threads.com/@kres.anastasia?igshid=NTc4MTIwNjQ2YQ==',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'pinterest',
    url: 'https://pin.it/4t002oJJq',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    url: 'https://t.me/kressai',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    url: 'https://www.tiktok.com/@naomi.hol?_r=1',
  },
]

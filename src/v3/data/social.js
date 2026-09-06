/**
 * Шесть площадок в блоке «WHERE YOU CAN FIND ME».
 *
 *  id    — по нему берётся вторая строка карточки (social.notes в словарях)
 *  name  — название площадки. Единственный текст, который остаётся здесь:
 *          Instagram и Threads на всех языках называются одинаково
 *  icon  — ключ из src/v3/components/icons.jsx
 *  image — имя файла в src/v3/assets БЕЗ расширения — тематическое фото
 *          в нижней части карточки. Чтобы заменить — положи файл с тем
 *          же именем в src/v3/assets (см. правило в lib/images.js)
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
    icon: 'instagram',
    image: 'social-instagram-work',
    url: 'https://www.instagram.com/kres.ai?igsh=MTc1eWV5dmVhb2c5',
  },
  {
    id: 'instagram-personal',
    name: 'Instagram',
    icon: 'instagram',
    image: 'social-instagram-personal',
    url: 'https://www.instagram.com/kres.anastasia?igsh=MTI3ZTM4dGs4OHRlaw%3D%3D&utm_source=qr',
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: 'threads',
    image: 'social-threads',
    url: 'https://www.threads.com/@kres.anastasia?igshid=NTc4MTIwNjQ2YQ==',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'pinterest',
    image: 'social-pinterest',
    url: 'https://pin.it/4t002oJJq',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    image: 'social-telegram',
    url: 'https://t.me/kressai',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    image: 'social-tiktok',
    url: 'https://www.tiktok.com/@naomi.hol?_r=1',
  },
]

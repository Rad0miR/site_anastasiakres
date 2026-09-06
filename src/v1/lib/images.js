/**
 * Автоматический реестр картинок.
 *
 * Vite собирает всё, что лежит в src/v1/assets, на этапе сборки.
 * Файл ищется по имени без расширения, поэтому можно положить
 * youtube.webp, youtube.jpg или youtube.png — код менять не нужно.
 */
const modules = import.meta.glob('../assets/**/*.{webp,avif,png,jpg,jpeg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** { 'youtube': '/assets/youtube-a1b2.webp', 'avatar': '...' } */
const registry = Object.entries(modules).reduce((acc, [path, url]) => {
  const key = path.replace(/^.*\/assets\//, '').replace(/\.[^./]+$/, '')
  acc[key] = url
  return acc
}, {})

/** Фон карточки или аватар: getImage('youtube') */
export const getImage = (name) => (name ? (registry[name] ?? null) : null)

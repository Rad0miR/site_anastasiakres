/**
 * Реестр картинок нового сайта.
 *
 * Vite собирает всё, что лежит в src/assets/kres. Файл ищется по имени
 * БЕЗ расширения, поэтому можно положить hero.webp, hero.jpg или hero.png —
 * код менять не нужно.
 *
 * У версии /v1 своя папка (src/assets/images) и свой такой же реестр:
 * версии не делят между собой ни одной картинки и не мешают друг другу.
 */
const modules = import.meta.glob('../assets/kres/**/*.{webp,avif,png,jpg,jpeg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** { 'hero': '/assets/hero-a1b2.webp', 'style-cinematic': '...' } */
const registry = Object.entries(modules).reduce((acc, [path, url]) => {
  const key = path.replace(/^.*\/assets\/kres\//, '').replace(/\.[^./]+$/, '')
  acc[key] = url
  return acc
}, {})

/** Ссылка на картинку по имени файла, или null если файла нет. */
export const getImage = (name) => (name ? (registry[name] ?? null) : null)

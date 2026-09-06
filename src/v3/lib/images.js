/**
 * Реестр картинок версии v3.
 *
 * Vite собирает всё, что лежит в src/v3/assets. Файл ищется по имени
 * БЕЗ расширения, поэтому можно положить hero.webp, hero.jpg или hero.png —
 * код менять не нужно.
 *
 * У каждой версии сайта своя папка с картинками (src/v1/assets,
 * src/v3/assets, …): версии не делят между собой ни одного файла и
 * не мешают друг другу.
 */
const modules = import.meta.glob('../assets/**/*.{webp,avif,png,jpg,jpeg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** { 'hero': '/assets/hero-a1b2.webp', 'style-cinematic': '...' } */
const registry = Object.entries(modules).reduce((acc, [path, url]) => {
  const key = path.replace(/^.*\/assets\//, '').replace(/\.[^./]+$/, '')
  acc[key] = url
  return acc
}, {})

/** Ссылка на картинку по имени файла, или null если файла нет. */
export const getImage = (name) => (name ? (registry[name] ?? null) : null)

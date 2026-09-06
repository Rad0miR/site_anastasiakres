/**
 * Реестр версий сайта — единственное место, где они перечислены.
 *
 *   /      — актуальная версия (та, что указана в CURRENT)
 *   /v1    — первая версия, заморожена
 *   /v2    — вторая версия, заморожена
 *   /v3    — третья версия
 *   /v4 …  — все следующие
 *
 * Каждая версия живёт в своей папке src/<id>/ и полностью самостоятельна:
 * своя вёрстка, свои картинки (src/<id>/assets), своё оформление
 * (src/<id>/<id>.css), свои токены Tailwind (src/<id>/tokens.js) и свои
 * шрифты — вот они, в поле fonts. Общего у версий ровно три вещи:
 * src/main.jsx, src/index.css и этот файл.
 *
 * Роутера нет и не нужно: это не страницы одного приложения, а несколько
 * независимых приложений. Переход между ними — обычная ссылка с полной
 * перезагрузкой, и это правильно: стили одной версии гарантированно
 * не остаются на другой.
 *
 * Код версии грузится отдельным файлом и только тогда, когда её открыли
 * (load: () => import(...)). Поэтому пятая и шестая версии не сделают
 * загрузку сайта тяжелее — посетитель скачивает ровно одну.
 *
 * Хостинги уже настроены отдавать index.html на любой адрес:
 * netlify.toml (redirect 200) и wrangler.toml (not_found_handling).
 * Ничего донастраивать при добавлении версии не надо.
 *
 * Как выпустить новую версию — по шагам в README.md, раздел
 * «Как выпустить новую версию».
 */

/** Какая версия открывается на «/». Единственная строка, которую меняет релиз. */
export const CURRENT = 'v3'

export const versions = [
  {
    id: 'v1',
    lang: 'ru',
    title: 'KRES — Nastya Kres',
    description:
      'Nastya Kres — AI Creator. Все социальные сети в одном месте: YouTube, Instagram, Threads, TikTok, Pinterest.',
    themeColor: '#060407',
    fonts:
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;500;600&family=Marck+Script&display=swap',
    load: () => import('./v1/App.jsx'),
  },
  {
    id: 'v2',
    lang: 'en',
    title: 'Kres AI — Creating worlds with AI',
    description:
      'Kres AI — AI creator. Visuals, characters, animation and stories created with AI. Instagram, Threads, Pinterest, Telegram, TikTok.',
    themeColor: '#171010',
    fonts:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@300;400;500&family=Caveat:wght@400;500;600&display=swap',
    load: () => import('./v2/App.jsx'),
  },
  {
    id: 'v3',
    // Язык по умолчанию. Дальше его меняет сам посетитель — кнопкой
    // с глобусом в шапке; выбор запоминается и проставляется в <html lang>.
    lang: 'en',
    title: 'Kres AI — Creating worlds with AI',
    description:
      'Kres AI — AI creator. Visuals, characters, animation and stories created with AI. Instagram, Threads, Pinterest, Telegram, TikTok.',
    themeColor: '#171010',
    // Копия строки из index.html: у актуальной версии шрифты подключены
    // прямо в разметке, чтобы браузер начал их качать, не дожидаясь JS.
    // Если строки разойдутся, ничего не сломается — просто загрузятся дважды.
    //
    // Manrope здесь ради украинского: в Plus Jakarta Sans кириллицы нет
    // вовсе, и без пары к ней текст свалился бы на системный шрифт.
    // Латиницу по-прежнему набирает Jakarta — английский и немецкий
    // выглядят ровно как раньше.
    fonts:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@300;400;500&family=Caveat:wght@400;500;600&display=swap',
    load: () => import('./v3/App.jsx'),
  },
]

/** Адрес версии: /v1, /v2, … Актуальная открывается ещё и на «/». */
export const pathOf = (version) => `/${version.id}`

/** Версия по id или undefined. */
export const versionById = (id) => versions.find((version) => version.id === id)

/** Актуальная версия. Ошибка здесь = опечатка в CURRENT. */
export function currentVersion() {
  const version = versionById(CURRENT)
  if (!version) {
    throw new Error(`В CURRENT указана версия «${CURRENT}», которой нет в списке versions`)
  }
  return version
}

/**
 * Какую версию показывать на этом адресе.
 *
 * /v1 → v1, /v2 → v2, всё остальное (включая «/» и опечатки) → актуальная.
 * Адрес своей версии работает всегда — и пока она актуальная, и после того
 * как её сменит следующая. Поэтому ссылку на /v3 можно давать хоть сейчас:
 * она не протухнет.
 */
export function resolveVersion(pathname = window.location.pathname) {
  const path = pathname.replace(/\/+$/, '').toLowerCase()
  return versions.find((version) => pathOf(version) === path) ?? currentVersion()
}

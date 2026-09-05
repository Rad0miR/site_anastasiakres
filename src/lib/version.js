/**
 * Какую версию сайта показывать — решается один раз, по адресу.
 *
 *   /       — актуальный сайт (src/App.jsx)
 *   /v1     — первая версия   (src/v1/V1App.jsx), заморожена
 *
 * Роутер сюда не нужен: это не страницы одного приложения, а два
 * независимых приложения. Переход между ними — обычная ссылка с полной
 * перезагрузкой, и это правильно: стили одной версии гарантированно не
 * остаются на другой.
 *
 * Хостинги уже настроены отдавать index.html на любой адрес:
 * netlify.toml (redirect 200) и wrangler.toml (not_found_handling).
 */
export const V1_PATH = '/v1'

export function isV1(pathname = window.location.pathname) {
  return pathname.replace(/\/+$/, '').toLowerCase() === V1_PATH
}

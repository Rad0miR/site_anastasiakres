import { handleContact } from '../server/contact.js'

/**
 * Точка входа Cloudflare Worker — вариант размещения из wrangler.toml.
 *
 * Worker занимается ровно одним адресом: /api/contact (форма «Let's
 * connect ♡»). Всё остальное — статика сайта, её отдаёт привязка ASSETS,
 * и она же по правилу not_found_handling = "single-page-application"
 * возвращает index.html на адреса версий (/v1, /v2, /v3).
 *
 * Переменные окружения задаются в панели Cloudflare: Settings →
 * Variables and Secrets. TELEGRAM_BOT_TOKEN — обязательно как Secret.
 */
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/contact') return handleContact(request, env)
    return env.ASSETS.fetch(request)
  },
}

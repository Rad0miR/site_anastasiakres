import { handleContact } from '../../server/contact.js'

/**
 * Обёртка для Cloudflare Pages. Вся логика — в server/contact.js.
 *
 * Pages сам превращает файл functions/api/contact.js в адрес
 * /api/contact. Переменные окружения задаются в панели Cloudflare:
 * Settings → Variables and Secrets (TELEGRAM_BOT_TOKEN хранить как
 * Secret, TELEGRAM_CHAT_ID можно обычной переменной).
 *
 * Если сайт разворачивается не как Pages, а как Worker (wrangler.toml),
 * эта папка не используется — там за тот же адрес отвечает worker/index.js.
 */
export const onRequest = ({ request, env }) => handleContact(request, env)

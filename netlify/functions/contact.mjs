import { handleContact } from '../../server/contact.js'

/**
 * Обёртка для Netlify. Вся логика — в server/contact.js.
 *
 * Функции Netlify второго поколения принимают и возвращают обычные
 * Request и Response, поэтому обёртка ровно в одну строку. Переменные
 * окружения задаются в панели Netlify: Site configuration → Environment
 * variables (TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID).
 */
export default (request) => handleContact(request, process.env)

/* Адрес, по которому функция отвечает. Тот же путь продублирован
   редиректом в netlify.toml — на случай, если сборка окажется старее
   поддержки config.path. */
export const config = { path: '/api/contact' }

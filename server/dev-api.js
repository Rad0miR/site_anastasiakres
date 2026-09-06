import { handleContact } from './contact.js'

/**
 * /api/contact на локальном сервере разработки.
 *
 * На хостинге этот адрес обслуживает серверная функция (netlify/functions,
 * functions/api или worker/index.js — смотря куда развёрнут сайт), а
 * `npm run dev` — это чистый Vite, никаких функций в нём нет. Плагин
 * подставляет тот же самый обработчик, чтобы форма «Let’s connect ♡»
 * работала и вживую, и на компьютере, и оба раза одним кодом.
 *
 * Vite отсюда ничего не импортируется намеренно: плагин — обычный
 * объект, а переменные окружения приходят готовыми (их читает
 * vite.config.js). Поэтому файл запускается и проверяется без сборщика.
 *
 * @param {Record<string, string | undefined>} env  TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
 */
export function contactApi(env) {
  return {
    name: 'kres-contact-api',
    /* Только `npm run dev`: в сборку плагин не попадает вовсе. */
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => respond(req, res, env))
    },
  }
}

/**
 * Node-запрос → веб-Request → общий обработчик → Node-ответ.
 *
 * Обёртка нужна ровно для этого перевода: внутри сервера разработки
 * ходят req/res из node:http, а server/contact.js написан на веб-стандартах,
 * как того требуют площадки.
 */
export async function respond(req, res, env) {
  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)

    const request = new Request(`http://localhost${req.originalUrl ?? req.url}`, {
      method: req.method,
      headers: { 'content-type': req.headers['content-type'] ?? 'application/json' },
      body: chunks.length ? Buffer.concat(chunks) : undefined,
    })

    const response = await handleContact(request, env)
    res.statusCode = response.status
    response.headers.forEach((value, name) => res.setHeader(name, value))
    res.end(await response.text())
  } catch (error) {
    console.error('[contact] сервер разработки не смог обработать запрос:', error)
    res.statusCode = 500
    res.setHeader('content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: false }))
  }
}

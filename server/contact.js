/* ==================================================================== *
 *  Заявка с сайта → закрытая группа Telegram.
 *
 *  Один обработчик на все площадки. Написан на веб-стандартах
 *  (Request, Response, fetch), поэтому его дословно вызывают тонкие
 *  обёртки, и больше нигде этой логики нет:
 *
 *    netlify/functions/contact.mjs  — Netlify
 *    functions/api/contact.js       — Cloudflare Pages
 *    worker/index.js                — Cloudflare Workers
 *    vite.config.js                 — локальный npm run dev
 *
 *  ГЛАВНОЕ ПРАВИЛО: токен бота живёт только здесь, на сервере, и только
 *  в переменных окружения. В код его не вписывают и на фронт не отдают —
 *  иначе любой посетитель сможет писать в группу от имени бота.
 *
 *  Заявка нигде не сохраняется: ни в базе, ни в файле, ни в браузере.
 *  Она существует ровно столько, сколько идёт запрос, и уходит в Telegram.
 * ==================================================================== */

const TELEGRAM_API = 'https://api.telegram.org'

/** Сколько ждём ответа Telegram, мс. Дальше посетителю показываем ошибку. */
const TIMEOUT = 10_000

/**
 * Пределы длины полей.
 *
 * Нужны не для красоты: в одно сообщение Telegram влезает 4096 символов,
 * а мимо формы запрос отправить может кто угодно и какой угодно длины.
 * Те же числа стоят в maxLength полей формы (ConnectDialog.jsx) —
 * посетитель до них не дотянется, они про чужие запросы.
 */
export const LIMITS = { name: 120, contact: 120, message: 3000 }

/**
 * Разбирает запрос, проверяет поля и отправляет заявку ботом в группу.
 *
 * Наружу отдаёт только { ok: true } или { ok: false }: ни текста ошибки
 * Telegram, ни кода ответа посетитель видеть не должен. Что именно пошло
 * не так — уходит в лог площадки, его читает владелец сайта.
 *
 * @param {Request} request
 * @param {Record<string, string | undefined>} env  переменные окружения
 * @returns {Promise<Response>}
 */
export async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return json({ ok: false }, 405, { Allow: 'POST' })
  }

  const token = env?.TELEGRAM_BOT_TOKEN
  const chatId = env?.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('[contact] не заданы TELEGRAM_BOT_TOKEN и/или TELEGRAM_CHAT_ID')
    return json({ ok: false }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false }, 400)
  }

  /* Ловушка для роботов: поле website в форме спрятано от людей и всегда
     пустое. Заполнено — значит это автозаполнялка бота. Отвечаем как при
     успехе (пусть считает, что получилось) и никуда ничего не шлём. */
  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true })
  }

  const fields = {
    name: clean(body?.name),
    contact: clean(body?.contact),
    message: clean(body?.message),
  }

  const invalid = Object.entries(fields).some(
    ([field, value]) => value === '' || value.length > LIMITS[field],
  )
  if (invalid) return json({ ok: false }, 400)

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: format(fields),
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(TIMEOUT),
    })

    /* Telegram отвечает 200 и { ok: false } на свои же ошибки — например,
       когда бота выгнали из группы. Смотрим и статус, и поле. */
    const result = await response.json().catch(() => null)
    if (!response.ok || !result?.ok) {
      console.error('[contact] Telegram отказал:', response.status, result?.description ?? '')
      return json({ ok: false }, 502)
    }
  } catch (error) {
    console.error('[contact] не удалось достучаться до Telegram:', error)
    return json({ ok: false }, 502)
  }

  return json({ ok: true })
}

/**
 * Текст сообщения в группе. Вид задан ТЗ:
 *
 *   NEW REQUEST — Kres AI ♡
 *
 *   Name: Anastasia
 *   Contact: @username
 *   Request: хочу UGC-контент для бренда…
 *
 * parse_mode: 'HTML' — поэтому всё, что пришло с формы, проходит через
 * escape(): иначе «<b>» из поля стало бы разметкой, а сообщение с одинокой
 * «<» Telegram просто отверг бы.
 */
function format({ name, contact, message }) {
  return [
    '<b>NEW REQUEST — Kres AI ♡</b>',
    '',
    `<b>Name:</b> ${escape(name)}`,
    `<b>Contact:</b> ${escape(contact)}`,
    `<b>Request:</b> ${escape(message)}`,
  ].join('\n')
}

/**
 * Строка из запроса → обрезанная по краям строка. Всё прочее → ''.
 *
 * Управляющие символы вычищаем (\P{Cc} — «не управляющий»): в сообщении
 * их не видно, а сломать разметку или сам запрос они могут. Перевод
 * строки и табуляция — исключения: это часть текста заявки.
 */
function clean(value) {
  if (typeof value !== 'string') return ''
  return value.replace(/[^\P{Cc}\n\t]/gu, '').trim()
}

/** Экранирование для parse_mode: 'HTML' — Telegram требует ровно три знака. */
function escape(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function json(payload, status = 200, headers) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      /* Ответ на заявку не кэширует ни браузер, ни сеть площадки. */
      'cache-control': 'no-store',
      ...headers,
    },
  })
}

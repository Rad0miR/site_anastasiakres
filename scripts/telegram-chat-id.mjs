#!/usr/bin/env node
/**
 * Узнать id закрытой группы, куда бот шлёт заявки с формы.
 *
 *   1. добавьте бота в группу;
 *   2. напишите в ней любое сообщение боту — например, /start@ИмяБота;
 *   3. TELEGRAM_BOT_TOKEN=… npm run telegram:chat-id
 *      (или просто npm run telegram:chat-id, если токен уже лежит в .env)
 *
 * Скрипт покажет все чаты, которые бот видел, — из них нужен тот, что
 * с типом group или supergroup. Его id (отрицательное число вида
 * -1001234567890) и есть TELEGRAM_CHAT_ID.
 *
 * Почему это нельзя узнать один раз и записать в код: getUpdates отдаёт
 * только свежие события (Telegram хранит их сутки). Если список пуст —
 * напишите в группе ещё раз и запустите скрипт снова.
 *
 * Важно: если у бота включён режим приватности (по умолчанию включён),
 * он видит в группе только команды вида /start@ИмяБота и ответы себе.
 * Обычного «привет» в списке не будет — это нормально.
 */
import { readFileSync } from 'node:fs'

const token = process.env.TELEGRAM_BOT_TOKEN || fromDotEnv('TELEGRAM_BOT_TOKEN')

if (!token) {
  fail(
    'Не задан TELEGRAM_BOT_TOKEN.\n' +
      'Положите его в .env (образец — .env.example) или передайте в командной строке:\n' +
      '  TELEGRAM_BOT_TOKEN=123456:AA… npm run telegram:chat-id',
  )
}

const bot = await api('getMe')
console.log(`Бот: @${bot.username} (${bot.first_name})\n`)

const updates = await api('getUpdates')
const chats = new Map()

for (const update of updates) {
  const chat = Object.values(update).find((value) => value?.chat)?.chat
  if (chat) chats.set(chat.id, chat)
}

if (chats.size === 0) {
  fail(
    'Telegram не отдал ни одного события.\n\n' +
      'Что делать: напишите в группе /start@ИмяБота (именно с @ — так бот\n' +
      'увидит сообщение при включённом режиме приватности) и запустите\n' +
      'скрипт снова. Если у бота настроен webhook, getUpdates всегда пуст —\n' +
      'снимите его: https://api.telegram.org/bot<ТОКЕН>/deleteWebhook',
  )
}

console.log('Чаты, которые видел бот:\n')
for (const chat of chats.values()) {
  const name = chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(' ')
  const group = chat.type === 'group' || chat.type === 'supergroup'
  console.log(`  ${group ? '→' : ' '} ${chat.id}  ${chat.type.padEnd(10)} ${name}`)
}
console.log('\nСтрелкой отмечены группы. Нужный id — в TELEGRAM_CHAT_ID.')

async function api(method) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`)
  const body = await response.json().catch(() => null)
  if (!body?.ok) fail(`Telegram отказал на ${method}: ${body?.description ?? response.status}`)
  return body.result
}

/** Простейшее чтение .env: КЛЮЧ=значение, без кавычек и подстановок. */
function fromDotEnv(key) {
  try {
    const line = readFileSync(new URL('../.env', import.meta.url), 'utf8')
      .split('\n')
      .find((row) => row.trim().startsWith(`${key}=`))
    return line
      ?.slice(line.indexOf('=') + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
  } catch {
    return undefined
  }
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

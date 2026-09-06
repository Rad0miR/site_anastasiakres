import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Close, Heart } from './icons'
import { useConnect } from '../lib/connect'
import { useText } from '../lib/language'
import { SILK } from '../lib/motion'

/** Адрес серверной функции. Она же — единственный, кто знает токен бота. */
const ENDPOINT = '/api/contact'

/** Пределы полей. Те же числа стоят на сервере (server/contact.js). */
const LIMITS = { name: 120, contact: 120, message: 3000 }

/** Сколько подтверждение «Thank you!» висит перед тем, как окно закроется. */
const FAREWELL = 2200

/**
 * Форма связи — окно поверх сайта.
 *
 * Открывается двумя кнопками «Let’s connect ♡»: в шапке и под соцсетями.
 * Отдельной страницы у формы нет и по ТЗ быть не должно.
 *
 * Что происходит с заявкой: три поля уходят POST-запросом на /api/contact,
 * серверная функция пересылает их ботом в закрытую группу Telegram. На
 * сайте не остаётся ничего — ни в localStorage, ни в адресной строке;
 * набранный текст живёт только в состоянии этого компонента, а он
 * размонтируется вместе с окном.
 *
 * Технические подробности посетителю не показываем: что бы ни ответил
 * Telegram, внизу формы появится одна и та же фраза «Something went
 * wrong. Please try again.»
 */
export default function ConnectDialog() {
  const { open, closeConnect } = useConnect()

  return (
    <AnimatePresence>
      {/* Форма именно размонтируется при закрытии — так поля очищаются
          сами, без единой строки кода: следующее открытие всегда чистое. */}
      {open && <Dialog onClose={closeConnect} />}
    </AnimatePresence>
  )
}

const EMPTY = { name: '', contact: '', message: '', website: '' }

function Dialog({ onClose }) {
  const text = useText().connect
  const [values, setValues] = useState(EMPTY)

  /* idle → sending → sent | error, плюс empty (не заполнены поля). */
  const [status, setStatus] = useState('idle')

  const panel = useRef(null)
  const first = useRef(null)
  const dismiss = useRef(null)
  const farewell = useRef(null)
  const titleId = useId()

  /* Пока окно открыто, страница под ним не прокручивается. Поле справа
     компенсирует исчезнувшую полосу прокрутки: без него содержимое
     дёрнулось бы вбок в момент открытия. */
  useEffect(() => {
    const { body, documentElement } = document
    const gap = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.removeProperty('overflow')
      body.style.removeProperty('padding-right')
    }
  }, [])

  /* Фокус переносим в первое поле, Escape закрывает окно, Tab ходит
     по кругу внутри формы и не уходит на страницу под ней. */
  useEffect(() => {
    first.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panel.current?.querySelectorAll(
        'button:not([disabled]), input, textarea, [href]',
      )
      if (!focusable?.length) return

      const edge = event.shiftKey ? focusable[0] : focusable[focusable.length - 1]
      if (document.activeElement !== edge) return
      event.preventDefault()
      ;(event.shiftKey ? focusable[focusable.length - 1] : focusable[0]).focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  /* Форма отправлена и исчезла — вместе с ней исчезла и кнопка, на
     которой стоял фокус. Переносим его на крестик: пока окно не закрылось
     само, им можно управлять с клавиатуры. */
  useEffect(() => {
    if (status === 'sent') dismiss.current?.focus()
  }, [status])

  useEffect(() => () => clearTimeout(farewell.current), [])

  const set = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    /* Сообщение о незаполненных полях гасим, как только начали печатать. */
    setStatus((prev) => (prev === 'empty' || prev === 'error' ? 'idle' : prev))
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending' || status === 'sent') return

    const payload = {
      name: values.name.trim(),
      contact: values.contact.trim(),
      message: values.message.trim(),
      website: values.website,
    }

    if (!payload.name || !payload.contact || !payload.message) {
      setStatus('empty')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) throw new Error('не отправлено')

      setValues(EMPTY)
      setStatus('sent')
      /* Подтверждение читается пару секунд, потом сайт возвращается. */
      farewell.current = setTimeout(onClose, FAREWELL)
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: SILK }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain px-4 py-8 sm:items-center sm:px-6"
    >
      {/* Затемнение под окном. Нажатие мимо формы закрывает её — так же,
          как Escape и крестик. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 -z-10 bg-v3-ink-deep/85 backdrop-blur-[6px]"
      />

      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 22, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 14, scale: 0.99, filter: 'blur(8px)' }}
        transition={{ duration: 0.55, ease: SILK }}
        className="v3-glass relative w-full max-w-[520px] rounded-v3-card border border-v3-blush-100/25 px-5 py-6 shadow-v3-lift v3-xs:px-7 sm:px-9 sm:py-9"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="flex items-center gap-2.5 text-[19px] font-semibold text-v3-blush-50 sm:text-[22px]"
          >
            {text.cta}
            <Heart className="h-[17px] w-[17px] shrink-0 text-v3-blush-200 sm:h-[19px] sm:w-[19px]" />
          </h2>

          <button
            ref={dismiss}
            type="button"
            onClick={onClose}
            aria-label={text.close}
            className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-v3-ink-line/80 text-v3-blush-50/70 transition-all duration-500 ease-v3-silk hover:border-v3-blush-200/60 hover:text-v3-blush-50"
          >
            <Close className="h-[15px] w-[15px]" />
          </button>
        </div>

        {status === 'sent' ? (
          <Sent>{text.success}</Sent>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6 sm:mt-7">
            <Field
              ref={first}
              label={text.fields.name.label}
              hint={text.fields.name.hint}
              placeholder={text.fields.name.placeholder}
              value={values.name}
              onChange={set('name')}
              maxLength={LIMITS.name}
              autoComplete="name"
              required
            />

            <Field
              className="mt-5"
              label={text.fields.contact.label}
              hint={text.fields.contact.hint}
              placeholder={text.fields.contact.placeholder}
              value={values.contact}
              onChange={set('contact')}
              maxLength={LIMITS.contact}
              autoComplete="off"
              required
            />

            <Field
              as="textarea"
              className="mt-5"
              label={text.fields.message.label}
              hint={text.fields.message.hint}
              placeholder={text.fields.message.placeholder}
              value={values.message}
              onChange={set('message')}
              maxLength={LIMITS.message}
              rows={4}
              required
            />

            {/* Ловушка для роботов: людям она не видна и не доступна с
                клавиатуры, а автозаполнялка её заполнит — и сервер такую
                заявку молча выбросит. */}
            <input
              type="text"
              name="website"
              value={values.website}
              onChange={set('website')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <button
              type="submit"
              disabled={sending}
              className="v3-cta-glow group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-v3-pill bg-gradient-to-b from-v3-blush-100 to-v3-blush-200 px-7 py-3.5 text-[14px] font-semibold uppercase tracking-v3-wide text-v3-wine-deep transition-transform duration-500 ease-v3-silk hover:scale-[1.02] disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100 sm:text-[15px]"
            >
              {sending ? text.sending : text.send}
              <Heart className="h-[15px] w-[15px] shrink-0 transition-transform duration-500 ease-v3-silk group-hover:scale-110" />
            </button>

            {/* Место под ответом кнопки занято всегда — иначе появление
                строки дёргало бы окно вверх-вниз. */}
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 min-h-[18px] text-center text-[12.5px] ${
                status === 'idle' || status === 'sending' ? 'text-transparent' : 'text-v3-blush-300'
              }`}
            >
              {status === 'error' && text.error}
              {status === 'empty' && text.empty}
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * Поле формы: подпись сверху, уточнение в скобках под ней, само поле ниже.
 *
 * as="textarea" превращает поле в большое — по ТЗ таким должно быть
 * третье, «Ваш вопрос или заказ».
 */
const Field = forwardRef(function Field(
  { as = 'input', className = '', label, hint, ...props },
  ref,
) {
  const id = useId()
  const Tag = as

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[12px] font-medium uppercase tracking-v3-wide text-v3-blush-100/85"
      >
        {label}
      </label>
      {hint && <span className="mt-1 block text-[11.5px] text-v3-blush-50/45">{hint}</span>}

      <Tag
        {...props}
        id={id}
        ref={ref}
        className={`mt-2.5 block w-full rounded-v3-tile border border-v3-ink-line bg-v3-ink-deep/55 px-4 py-3 text-[14px] text-v3-blush-50 transition-colors duration-500 ease-v3-silk placeholder:text-v3-blush-50/30 hover:border-v3-blush-300/35 focus:border-v3-blush-300/60 ${
          as === 'textarea' ? 'min-h-[124px] resize-y leading-[1.6]' : ''
        }`}
      />
    </div>
  )
})

/** Подтверждение вместо формы. Через пару секунд окно закроется само. */
function Sent({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: SILK }}
      role="status"
      className="flex min-h-[168px] flex-col items-center justify-center gap-4 px-2 text-center text-[15px] leading-[1.6] text-v3-blush-50 sm:text-[16px]"
    >
      <Heart className="v3-icon-glow h-8 w-8 text-v3-blush-200" />
      {children}
    </motion.p>
  )
}

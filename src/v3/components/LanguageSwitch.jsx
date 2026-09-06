import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Globe, flagIcons } from './icons'
import { LANGUAGES } from '../data/content'
import { useLanguage, useText } from '../lib/language'
import { SILK } from '../lib/motion'

/**
 * Круглая кнопка выбора языка — вторая и последняя кнопка в шапке.
 *
 * Оформлена ровно как соседняя «Let’s connect ♡»: то же стекло, та же
 * тонкая розовая граница, то же свечение под курсором. Диаметр совпадает
 * с высотой пилюли — обе величины заданы в шапке одними и теми же
 * числами (h-9 / sm:42 / 2xl:44), меняются только парой.
 *
 * Внутри только глобус, без надписи: символ должен работать и для того,
 * кто не читает ни на одном из языков сайта.
 *
 * Список закрывается четырьмя способами — повторным нажатием, выбором
 * языка, кликом мимо и клавишей Escape. После Escape фокус возвращается
 * на кнопку: иначе он остался бы в исчезнувшем списке.
 */
export default function LanguageSwitch() {
  const { lang, choose } = useLanguage()
  const text = useText()
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    if (!open) return

    /* pointerdown, а не click: список должен закрыться в момент нажатия,
       до того как под ним что-нибудь сработает. */
    const onPointerDown = (event) => {
      if (!box.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      trigger.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={box} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={text.header.language}
        className={`v3-glass group inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ease-v3-silk sm:h-[42px] sm:w-[42px] 2xl:h-[44px] 2xl:w-[44px] ${
          open
            ? 'border-v3-blush-200/70 shadow-v3-glow'
            : 'border-v3-blush-100/35 hover:border-v3-blush-200/70 hover:shadow-v3-glow'
        }`}
      >
        {/* Свечение самого глобуса включается только когда список открыт:
            под курсором мягко светится вся кнопка (hover:shadow-v3-glow),
            двух свечений сразу было бы слишком. */}
        <Globe
          className={`h-[17px] w-[17px] text-v3-blush-50 transition-transform duration-500 ease-v3-silk group-hover:scale-110 sm:h-[19px] sm:w-[19px] ${
            open ? 'v3-icon-glow' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            aria-label={text.header.language}
            initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.42, ease: SILK }}
            className="v3-glass absolute right-0 top-[calc(100%+10px)] z-40 min-w-[176px] overflow-hidden rounded-v3-card border border-v3-blush-100/25 p-1.5 shadow-v3-lift"
          >
            {LANGUAGES.map((option) => {
              const Flag = flagIcons[option.flag]
              const active = option.id === lang

              return (
                <li key={option.id} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      choose(option.id)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-left text-[13px] transition-colors duration-300 ease-v3-silk hover:bg-v3-blush-100/10 ${
                      active ? 'text-v3-blush-50' : 'text-v3-blush-50/70 hover:text-v3-blush-50'
                    }`}
                  >
                    {Flag && (
                      <Flag className="h-[13px] w-[19px] shrink-0 rounded-[3px] ring-1 ring-inset ring-v3-blush-50/25" />
                    )}
                    <span className="flex-1 whitespace-nowrap">{option.name}</span>
                    {active && <Check className="h-[13px] w-[13px] shrink-0 text-v3-blush-200" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

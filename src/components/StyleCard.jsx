import { motion } from 'framer-motion'
import { getImage } from '../lib/images'
import { SILK } from '../lib/motion'

/**
 * Карточка стиля — это кнопка, а не ссылка.
 *
 * По ТЗ нажатие не ведёт на другой адрес и не открывает окно поверх
 * сайта: оно раскрывает картинку прямо в странице. Поэтому <button>
 * с aria-expanded — так это понимают и мышь, и клавиатура, и скринридер.
 */
export default function StyleCard({ style, active, panelId, onSelect }) {
  const src = getImage(style.image)

  return (
    <motion.li
      className="snap-start"
      style={{ width: 'clamp(94px, 7.6vw, 128px)', flex: '0 0 auto' }}
    >
      <button
        type="button"
        onClick={() => onSelect(style.id)}
        aria-expanded={active}
        aria-controls={panelId}
        className={`group relative block aspect-[102/156] w-full overflow-hidden rounded-card border transition-shadow duration-700 ease-silk ${
          active
            ? 'border-transparent shadow-pick'
            : 'border-ink-line/90 shadow-card hover:border-blush-300/40'
        }`}
      >
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[center_28%] transition-transform duration-[1100ms] ease-silk group-hover:scale-[1.06]"
          />
        ) : (
          /* Файла ещё нет — карточка остаётся на месте и остаётся кликабельной,
             вёрстка не съезжает. */
          <span className="block h-full w-full bg-gradient-to-b from-wine to-ink-deep" />
        )}

        {/* Подпись на затемнении внизу карточки */}
        <span
          aria-hidden="true"
          className="k-card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        />
        <span className="absolute inset-x-1.5 bottom-1.5 rounded-[10px] bg-ink-deep/55 px-1.5 py-1.5 backdrop-blur-[3px]">
          <span
            className={`block text-balance text-center text-[10.5px] font-medium leading-[1.2] transition-colors duration-500 ${
              active ? 'text-blush-50' : 'text-blush-50/80'
            }`}
          >
            {style.name}
          </span>
        </span>

        {/* Тёплое свечение по краю выбранной карточки */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.6, ease: SILK }}
          className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-blush-50/70"
        />
      </button>
    </motion.li>
  )
}

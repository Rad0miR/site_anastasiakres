import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import StyleCard from './StyleCard'
import { ChevronLeft, ChevronRight } from './icons'
import { useCarousel } from '../hooks/useCarousel'
import { styles } from '../data/styles'
import { content } from '../data/content'
import { getImage } from '../lib/images'
import { SILK, revealOnScroll, stagger, textUp } from '../lib/motion'

/**
 * «MY VISUAL WORLD» — единственный интерактивный блок сайта.
 *
 * Одиннадцать карточек в одну горизонтальную линию. На широком экране
 * помещаются все, на узком строка не переносится, а прокручивается вбок.
 *
 * Нажатие на карточку раскрывает картинку прямо здесь же, между
 * каруселью и нижней частью страницы: без перехода по адресу и без окна
 * поверх сайта. Повторное нажатие на ту же карточку закрывает панель —
 * отдельная кнопка «закрыть» для этого не нужна.
 *
 * Состояние живёт выше, в App: оно нужно и секциям ниже по странице,
 * которые расступаются, освобождая место раскрытой картинке.
 */
export default function ContentStyles({ openId, onToggle }) {
  const panelId = useId()
  const { rail, canPrev, canNext, overflows, scrollByPage } = useCarousel()
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const open = styles.find((s) => s.id === openId) ?? null

  /* Подводим раскрытую картинку к глазам. Ждём, пока панель наберёт
     высоту, иначе браузер прокрутит к ещё пустому месту. */
  useEffect(() => {
    if (!openId) return
    const id = setTimeout(() => {
      panelRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
      })
    }, 280)
    return () => clearTimeout(id)
  }, [openId, reduceMotion])

  return (
    <motion.section
      id="visual-world"
      aria-labelledby="visual-world-title"
      variants={stagger(0.07)}
      {...revealOnScroll}
      className="k-warm relative px-5 pb-6 pt-11 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16"
    >
      <div className="mx-auto w-full max-w-[1560px]">
        <motion.h2
          id="visual-world-title"
          variants={textUp}
          className="text-center text-[clamp(20px,3.4vw,46px)] font-light uppercase tracking-widest text-blush-50"
        >
          {content.styles.title}
        </motion.h2>
        <motion.p
          variants={textUp}
          className="mt-2 text-center text-[13px] text-blush-50/65 sm:text-[15px]"
        >
          {content.styles.subtitle}
        </motion.p>

        {/* ---------- карусель ---------- */}
        <motion.div variants={textUp} className="relative mt-6 sm:mt-8">
          <RailButton
            side="left"
            show={overflows}
            enabled={canPrev}
            onClick={() => scrollByPage(-1)}
          />
          <RailButton
            side="right"
            show={overflows}
            enabled={canNext}
            onClick={() => scrollByPage(1)}
          />

          <ul
            ref={rail}
            className="k-rail flex snap-x snap-mandatory justify-start gap-2 overflow-x-auto px-1 py-2 xl:justify-center"
          >
            {styles.map((style) => (
              <StyleCard
                key={style.id}
                style={style}
                active={style.id === openId}
                panelId={panelId}
                onSelect={onToggle}
              />
            ))}
          </ul>
        </motion.div>

        {/* ---------- раскрытая картинка ----------
            Обёртка с id живёт всегда, даже когда панели внутри нет:
            на неё ссылаются aria-controls всех одиннадцати кнопок,
            и ссылка не должна вести в пустоту. */}
        <div id={panelId} ref={panelRef}>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.9, ease: SILK },
                  opacity: { duration: 0.45, ease: SILK },
                }}
                className="overflow-hidden"
              >
                {/* Полоска света по кромке: панель именно раскрылась,
                    а не просто появилась */}
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: SILK, delay: 0.1 }}
                  className="k-seam mx-auto mt-5 block h-px w-full max-w-[820px]"
                />

                {/*
                  Смена стиля — перекрёстное растворение, а не «сначала
                  ушла старая, потом пришла новая»: ждать полсекунды
                  пустоту после каждого нажатия было бы утомительно.

                  Обе картинки лежат в одной ячейке grid, поэтому во
                  время перехода они наложены друг на друга и высота
                  блока не скачет.
                */}
                <figure className="mx-auto mt-6 grid w-full max-w-[820px] overflow-hidden rounded-[22px] border border-blush-300/25 shadow-lift">
                  <AnimatePresence>
                    <motion.div
                      key={open.id}
                      initial={{ opacity: 0, y: 44, scale: 1.04, filter: 'blur(16px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.995, filter: 'blur(10px)' }}
                      transition={{ duration: 0.8, ease: SILK }}
                      className="relative [grid-area:1/1]"
                    >
                      <StyleImage style={open} />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0">
                        <span aria-hidden="true" className="k-card-scrim block h-24 w-full" />
                        <span className="absolute inset-x-0 bottom-0 flex justify-center px-5 pb-4">
                          <span className="text-center text-[13px] font-light uppercase tracking-widest text-blush-50 sm:text-[15px]">
                            {open.name}
                          </span>
                        </span>
                      </figcaption>
                    </motion.div>
                  </AnimatePresence>
                </figure>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Подсказка гаснет, а не исчезает: место под ней остаётся занятым,
            поэтому при раскрытии страница не дёргается. */}
        <motion.p
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.4, ease: SILK }}
          className="mt-5 text-center text-[12px] tracking-wide text-blush-50/40"
        >
          {content.styles.hint}
        </motion.p>
      </div>
    </motion.section>
  )
}

/** Картинка стиля. Если файла ещё нет — на его месте ровный тёплый блок. */
function StyleImage({ style }) {
  const src = getImage(style.image)

  if (!src) {
    return (
      <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-wine to-ink-deep">
        <span className="text-[13px] uppercase tracking-widest text-blush-50/45">{style.name}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${style.name} — Kres AI`}
      loading="lazy"
      decoding="async"
      className="block aspect-square w-full object-cover"
    />
  )
}

/** Стрелка карусели. Прячется целиком, если листать некуда. */
function RailButton({ side, show, enabled, onClick }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  const placement = side === 'left' ? '-left-1 lg:-left-4' : '-right-1 lg:-right-4'

  return (
    <button
      type="button"
      onClick={onClick}
      /* Дублирует обычную прокрутку, поэтому убрана и с клавиатуры,
         и из дерева доступности — иначе это лишняя остановка табом. */
      tabIndex={-1}
      aria-hidden="true"
      className={[
        'k-glass absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center',
        'rounded-full border border-ink-line text-blush-100 transition-opacity duration-500 ease-silk sm:flex',
        placement,
        show ? '' : 'invisible opacity-0',
        enabled ? 'opacity-90 hover:opacity-100' : 'pointer-events-none opacity-25',
      ].join(' ')}
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  )
}

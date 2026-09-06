import { motion } from 'framer-motion'
import Header from './Header'
import Intro from './Intro'
import ScriptNote from './ScriptNote'
import Wordmark from './Wordmark'
import { ArrowDown } from './icons'
import { ANCHORS } from '../data/anchors'
import { getImage } from '../lib/images'
import { useText } from '../lib/language'
import { SILK, stagger, textUp } from '../lib/motion'

const bg = getImage('hero')

/**
 * Верхний экран.
 *
 * Фотография — только фон: логотип, текст и кнопки живут поверх неё
 * обычными HTML-элементами, поэтому масштабируются и остаются
 * выделяемыми и доступными.
 *
 * Затемнение кладём двумя слоями: вертикальное растворяет низ картинки
 * в фоне страницы, горизонтальное подкладывается под левую колонку,
 * чтобы белый текст читался на светлом закате.
 *
 * Высота задана только снизу (min-height). Пропорции те же, что были у
 * фиксированной высоты — 80svh на телефоне, 16:9 на планшете, — но текст
 * теперь может их и перерасти: приветствие сверху на разных языках
 * разной длины, а обрезать его нечем, у секции overflow-hidden.
 */
export default function Hero() {
  const { kicker, tagline, lead, ctaTypes, ctaSocials, notes } = useText().hero

  return (
    <section
      id={ANCHORS.top}
      className="relative isolate flex w-full flex-col overflow-hidden bg-v3-ink-deep min-h-[max(600px,80svh)] max-[520px]:min-h-[max(560px,80svh)] sm:min-h-[max(560px,56.25vw)] lg:min-h-[clamp(580px,52vw,860px)]"
    >
      {bg && (
        <motion.img
          src={bg}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: SILK }}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[54%_center] sm:object-[58%_center] lg:object-[center_44%]"
        />
      )}

      {/* Вертикальный переход в фон страницы + лёгкое общее затемнение */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12,8,8,0.55) 0%, rgba(12,8,8,0.12) 32%, rgba(12,8,8,0.55) 78%, #171010 100%)',
        }}
      />
      {/* Подложка под левой колонкой */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(12,8,8,0.86) 0%, rgba(12,8,8,0.58) 34%, rgba(12,8,8,0.06) 62%, rgba(12,8,8,0) 100%)',
        }}
      />

      <Header />

      {/* Нижнее поле на большом экране больше, чем кажется нужным: в левом
          нижнем углу лежит рукописная пометка (высотой около 150 px вместе
          с отступом), и кнопки не должны на неё наезжать. Текста в колонке
          стало больше, свободного места внизу само по себе не остаётся. */}
      <motion.div
        variants={stagger(0.11, 0.35)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-12 pt-24 sm:justify-center sm:px-8 sm:pb-28 lg:px-12 lg:pb-44 lg:pt-28"
      >
        <div className="max-w-[560px] lg:max-w-[680px] 2xl:max-w-[780px]">
          {/* Приветствие и «WELCOME TO» разделяет только воздух — никакой
              линии и никакой подложки между ними по ТЗ быть не должно. */}
          <Intro className="mb-8 sm:mb-10 lg:mb-12" />

          <motion.p
            variants={textUp}
            className="text-[11px] font-medium uppercase tracking-v3-widest text-v3-blush-100/80 sm:text-[13px] 2xl:text-[15px]"
          >
            {kicker}
          </motion.p>

          <motion.h1 variants={textUp} className="mt-2 sm:mt-3">
            <Wordmark arcs className="block text-[clamp(52px,11vw,152px)] leading-[0.92]" />
            <span className="sr-only">— {tagline}</span>
          </motion.h1>

          <motion.p
            variants={textUp}
            aria-hidden="true"
            className="mt-2 text-[clamp(11px,2.2vw,24px)] font-light uppercase tracking-v3-widest text-v3-blush-50/90 sm:mt-3"
          >
            {tagline}
          </motion.p>

          <motion.p
            variants={textUp}
            className="mt-5 max-w-[420px] 2xl:max-w-[480px] text-[clamp(13px,1.35vw,18px)] leading-[1.65] text-v3-blush-50/75 sm:mt-6"
          >
            {lead.map((row) => (
              <span key={row} className="block">
                {row}
              </span>
            ))}
          </motion.p>

          {/* Две кнопки — один набор: одинаковые по размеру и оформлению,
              разные только по адресу. В строку помещаются даже на 360 px
              и на всех трёх языках; если не поместятся — перенесутся. */}
          <motion.div
            variants={textUp}
            className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-4"
          >
            <HeroLink href={`#${ANCHORS.types}`}>{ctaTypes}</HeroLink>
            <HeroLink href={`#${ANCHORS.social}`}>{ctaSocials}</HeroLink>
          </motion.div>
        </div>

        {/* Рукописные пометки. На узком экране левая мешает тексту —
            там остаются только две правые, как на мобильном референсе. */}
        <ScriptNote
          lines={notes.left}
          className="absolute bottom-7 left-6 hidden text-[clamp(19px,1.8vw,28px)] lg:block"
        />
        <ScriptNote
          lines={notes.topRight}
          className="absolute right-4 top-[16%] text-[clamp(19px,4.4vw,32px)] sm:right-8 sm:top-[20%] lg:right-12"
        />
        <ScriptNote
          lines={notes.midRight}
          className="absolute right-5 top-[38%] text-[clamp(15px,3.4vw,24px)] sm:right-10 sm:top-[46%] lg:right-[8%]"
        />
      </motion.div>
    </section>
  )
}

/**
 * Кнопка первого экрана. Обе кнопки рисуются ею же — так они не могут
 * разъехаться по размеру, шрифту или анимации.
 *
 * Поля к самому узкому экрану сжимаются: на 360 px обе кнопки должны
 * помещаться в строку, а не уезжать на вторую.
 */
function HeroLink({ href, children }) {
  return (
    <a
      href={href}
      className="v3-cta-glow group inline-flex items-center gap-2.5 rounded-v3-pill bg-gradient-to-b from-v3-blush-100 to-v3-blush-200 px-4 py-3 text-[13px] font-semibold text-v3-wine-deep transition-transform duration-500 ease-v3-silk hover:scale-[1.03] v3-xs:gap-3 v3-xs:px-6 v3-xs:text-[14px] sm:gap-4 sm:px-7 sm:py-3.5 sm:text-[16px]"
    >
      {children}
      <ArrowDown className="h-[18px] w-[18px] shrink-0 transition-transform duration-700 ease-v3-silk group-hover:translate-y-1" />
    </a>
  )
}

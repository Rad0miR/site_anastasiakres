import { motion } from 'framer-motion'
import Header from './Header'
import ScriptNote from './ScriptNote'
import Wordmark from './Wordmark'
import { ArrowDown } from './icons'
import { content } from '../data/content'
import { getImage } from '../lib/images'
import { SILK, stagger, textUp } from '../lib/motion'

const bg = getImage('hero')

/**
 * Верхний экран.
 *
 * Фотография — только фон: логотип, текст и кнопка живут поверх неё
 * обычными HTML-элементами, поэтому масштабируются и остаются
 * выделяемыми и доступными.
 *
 * Затемнение кладём двумя слоями: вертикальное растворяет низ картинки
 * в фоне страницы, горизонтальное подкладывается под левую колонку,
 * чтобы белый текст читался на светлом закате.
 */
export default function Hero() {
  const { kicker, tagline, lead, cta, ctaHref, notes } = content.hero

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[600px] w-full flex-col overflow-hidden bg-ink-deep [height:80svh] max-h-[720px] max-[520px]:min-h-[560px] sm:max-h-none sm:min-h-[560px] sm:[height:auto] sm:[aspect-ratio:16/9] lg:[aspect-ratio:auto] lg:h-[clamp(580px,52vw,860px)]"
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

      <motion.div
        variants={stagger(0.11, 0.35)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-12 pt-24 sm:justify-center sm:px-8 sm:pb-28 lg:px-12 lg:pb-32"
      >
        <div className="max-w-[560px] lg:max-w-[680px] 2xl:max-w-[780px]">
          <motion.p
            variants={textUp}
            className="text-[11px] font-medium uppercase tracking-widest text-blush-100/80 sm:text-[13px] 2xl:text-[15px]"
          >
            {kicker}
          </motion.p>

          <motion.h1 variants={textUp} className="mt-2 sm:mt-3">
            <Wordmark className="block text-[clamp(52px,11vw,152px)] leading-[0.92]" />
            <span className="sr-only">— {tagline}</span>
          </motion.h1>

          <motion.p
            variants={textUp}
            aria-hidden="true"
            className="mt-2 text-[clamp(11px,2.2vw,24px)] font-light uppercase tracking-widest text-blush-50/90 sm:mt-3"
          >
            {tagline}
          </motion.p>

          <motion.p
            variants={textUp}
            className="mt-5 max-w-[420px] 2xl:max-w-[480px] text-[clamp(13px,1.35vw,18px)] leading-[1.65] text-blush-50/75 sm:mt-6"
          >
            {lead.map((row) => (
              <span key={row} className="block">
                {row}
              </span>
            ))}
          </motion.p>

          <motion.div variants={textUp} className="mt-7 sm:mt-8">
            <a
              href={ctaHref}
              className="k-cta-glow group inline-flex items-center gap-4 rounded-pill bg-gradient-to-b from-blush-100 to-blush-200 px-6 py-3 text-[14px] font-semibold text-wine-deep transition-transform duration-500 ease-silk hover:scale-[1.03] sm:px-8 sm:py-3.5 sm:text-[16px]"
            >
              {cta}
              <ArrowDown className="h-[18px] w-[18px] transition-transform duration-700 ease-silk group-hover:translate-y-1" />
            </a>
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

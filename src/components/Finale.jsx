import { motion } from 'framer-motion'
import ScriptNote from './ScriptNote'
import { content } from '../data/content'
import { getImage } from '../lib/images'
import { revealOnScroll, stagger, textUp } from '../lib/motion'

const src = getImage('finale')

/**
 * Нижняя часть сайта: закат во всю ширину и главная фраза поверх него.
 *
 * Картинка светлая, поэтому текст здесь тёмный — единственное место
 * на сайте, где так. Чтобы буквы не спорили с солнцем в центре кадра,
 * под ними лежит едва заметная светлая дымка.
 */
export default function Finale() {
  const { title, subtitle, notes } = content.finale

  return (
    <motion.section
      aria-labelledby="finale-title"
      variants={stagger(0.09)}
      {...revealOnScroll}
      className="relative isolate w-full overflow-hidden bg-wine-deep"
    >
      {src && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[64%_center] sm:object-center"
        />
      )}

      {/* Дымка под текстом + мягкий стык с тёмными секциями сверху и снизу */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 90% at 34% 46%, rgba(255,248,245,0.42) 0%, rgba(255,248,245,0) 62%),' +
            'linear-gradient(to bottom, rgba(23,16,16,0.5) 0%, rgba(23,16,16,0) 22%, rgba(23,16,16,0) 76%, rgba(12,8,8,0.55) 100%)',
        }}
      />

      <div className="relative flex min-h-[300px] w-full items-center justify-center px-4 py-14 [aspect-ratio:4/3] sm:px-5 sm:min-h-[300px] sm:[aspect-ratio:16/7] lg:[aspect-ratio:2135/736]">
        <ScriptNote
          lines={notes.left}
          tone="dark"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[clamp(18px,3.4vw,30px)] sm:left-10 lg:left-[6%]"
        />

        <motion.div variants={textUp} className="text-center">
          <h2
            id="finale-title"
            className="font-display text-[clamp(23px,2.6vw,48px)] font-light uppercase leading-[1.08] tracking-[0.12em] text-[#2A1E1C]"
          >
            {title.map((row) => (
              <span key={row} className="block">
                {row}
              </span>
            ))}
          </h2>
          <p className="mt-3 text-[clamp(9px,1vw,15px)] font-light uppercase tracking-widest text-[#4A3128] sm:mt-4">
            {subtitle}
          </p>
        </motion.div>

        <ScriptNote
          lines={notes.right}
          tone="dark"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[clamp(16px,3vw,28px)] sm:right-10 lg:right-[6%]"
        />
      </div>
    </motion.section>
  )
}

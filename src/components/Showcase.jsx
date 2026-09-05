import { motion } from 'framer-motion'
import ScriptNote from './ScriptNote'
import { content } from '../data/content'
import { getImage } from '../lib/images'
import { blurUp, revealOnScroll, stagger } from '../lib/motion'

const src = getImage('showcase')

/**
 * Большой визуал между стилями и финальной картинкой.
 *
 * На референсе здесь широкий кадр с рукописной пометкой справа, но
 * самого файла среди присланных не было. Поэтому секция — слот: пока
 * в src/assets/kres нет файла showcase.* , она не рисуется вовсе и не
 * оставляет пустой дыры. Появится файл — секция встанет на место сама,
 * трогать код не нужно.
 */
export default function Showcase() {
  if (!src) return null

  return (
    <motion.section
      aria-hidden="true"
      variants={stagger(0.08)}
      {...revealOnScroll}
      className="px-3 pb-6 pt-2 sm:px-5 lg:px-8"
    >
      <motion.div
        variants={blurUp}
        className="relative mx-auto w-full max-w-[1560px] overflow-hidden rounded-[22px] border border-ink-line/70 shadow-lift"
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover [aspect-ratio:16/9] sm:[aspect-ratio:21/9]"
        />
        <ScriptNote
          lines={content.showcase.note}
          className="absolute bottom-6 right-5 text-[clamp(18px,2.6vw,30px)] sm:bottom-9 sm:right-9"
        />
      </motion.div>
    </motion.section>
  )
}

import { motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { Heart } from './icons'
import { useText } from '../lib/language'
import { revealOnScroll, stagger, textUp } from '../lib/motion'

/**
 * Подвал. Логотип и копирайт слева, короткая фраза справа —
 * на широком экране в одну строку, на телефоне в две.
 */
export default function Footer() {
  const { copyright, tagline } = useText().footer

  return (
    <motion.footer
      variants={stagger(0.08)}
      {...revealOnScroll}
      className="bg-v3-ink-deep px-5 py-8 sm:px-8 lg:px-12"
    >
      <motion.div
        variants={textUp}
        className="mx-auto flex w-full max-w-[1560px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"
      >
        <div className="flex items-center gap-4">
          <Wordmark className="text-[19px] sm:text-[21px]" />
          <span aria-hidden="true" className="hidden h-4 w-px bg-v3-ink-line sm:block" />
          <p className="text-[12px] text-v3-blush-50/50 sm:text-[13px]">{copyright}</p>
        </div>

        <p className="flex items-center gap-2 text-[10.5px] uppercase tracking-v3-wide text-v3-blush-50/50 sm:text-[12px]">
          {tagline}
          <Heart className="h-[13px] w-[13px] shrink-0 text-v3-blush-200/80" />
        </p>
      </motion.div>
    </motion.footer>
  )
}

import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { textUp } from '../lib/motion'

/** Верхняя строка: словесный знак слева, стеклянная пилюля справа. */
export default function Header() {
  return (
    <motion.header
      variants={textUp}
      className="relative z-10 flex shrink-0 items-center justify-between"
    >
      <a
        href="#top"
        className="font-display text-[26px] font-semibold tracking-wordmark text-rose-200 transition-colors duration-500 ease-silk hover:text-rose-100 sm:text-[30px] lg:text-[32px]"
      >
        {profile.wordmark}
      </a>

      <a
        href="#links"
        className="pill-glass group inline-flex items-center gap-2 rounded-pill px-4 py-2 text-[13px] font-light text-white/85 transition-all duration-500 ease-silk hover:border-rose-300/70 hover:text-white sm:px-5 sm:text-sm"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-rose-300" aria-hidden="true">
          <path
            d="M12 2.6l2.72 6.06 6.6.66-4.94 4.44 1.4 6.5L12 16.9l-5.78 3.36 1.4-6.5L2.68 9.32l6.6-.66z"
            fill="currentColor"
          />
        </svg>
        {profile.aboutLabel}
      </a>
    </motion.header>
  )
}

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
        className="v1-display text-[26px] font-semibold tracking-[0.06em] text-[#F3BEC3] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#FBD9DC] sm:text-[30px] lg:text-[32px]"
      >
        {profile.wordmark}
      </a>

      <a
        href="#links"
        className="v1-pill-glass group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-light text-white/[0.85] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white sm:px-5 sm:text-sm"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#EFA9B2]" aria-hidden="true">
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

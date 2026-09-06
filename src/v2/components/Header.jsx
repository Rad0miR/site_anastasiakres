import { motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { Heart } from './icons'
import { content } from '../data/content'
import { SILK } from '../lib/motion'

/**
 * Шапка: логотип слева, «Let’s connect ♡» справа. Больше по ТЗ в ней
 * ничего нет — главная страница сама и есть портфолио, меню не нужно.
 *
 * Лежит поверх фона hero (absolute), а не липнет к верху: на референсе
 * она часть верхней картинки, а не отдельная панель.
 */
export default function Header() {
  const { connect, connectHref } = content.header

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: SILK, delay: 0.1 }}
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-7"
    >
      <a href="#top" className="rounded-md" aria-label="Kres AI — back to top">
        <Wordmark className="text-[22px] sm:text-[26px] lg:text-[30px] 2xl:text-[34px]" />
      </a>

      <a
        href={connectHref}
        className="v2-glass group inline-flex items-center gap-2 rounded-v2-pill border border-v2-blush-100/35 px-4 py-2 text-[12px] font-medium text-v2-blush-50 transition-all duration-500 ease-v2-silk hover:border-v2-blush-200/70 hover:shadow-v2-glow sm:px-5 sm:py-2.5 sm:text-[13.5px] 2xl:text-[15px]"
      >
        {connect}
        <Heart className="h-[13px] w-[13px] text-v2-blush-200 transition-transform duration-500 ease-v2-silk group-hover:scale-110" />
      </a>
    </motion.header>
  )
}

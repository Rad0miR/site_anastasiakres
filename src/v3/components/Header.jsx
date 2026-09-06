import { motion } from 'framer-motion'
import LanguageSwitch from './LanguageSwitch'
import Wordmark from './Wordmark'
import { Heart } from './icons'
import { ANCHORS } from '../data/anchors'
import { useText } from '../lib/language'
import { SILK } from '../lib/motion'

/**
 * Шапка: логотип слева, «Let’s connect ♡» и выбор языка справа. Больше
 * в ней ничего нет — главная страница сама и есть портфолио, меню не нужно.
 *
 * У двух кнопок справа общая высота — h-9 / sm:42 / 2xl:44. Она задана
 * числом, а не выведена из содержимого: круг должен совпадать с пилюлей
 * ровно, а у пилюли высота считается от строки текста, до которой круглой
 * кнопке не дотянуться (внутри неё нет строки, только иконка).
 *
 * Лежит поверх фона hero (absolute), а не липнет к верху: на референсе
 * она часть верхней картинки, а не отдельная панель.
 */
export default function Header() {
  const { connect, backToTop } = useText().header

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: SILK, delay: 0.1 }}
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-7"
    >
      <a href={`#${ANCHORS.top}`} className="rounded-md" aria-label={backToTop}>
        <Wordmark className="text-[22px] sm:text-[26px] lg:text-[30px] 2xl:text-[34px]" />
      </a>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <a
          href={`#${ANCHORS.social}`}
          className="v3-glass group inline-flex h-9 items-center gap-2 rounded-v3-pill border border-v3-blush-100/35 px-4 text-[12px] font-medium text-v3-blush-50 transition-all duration-500 ease-v3-silk hover:border-v3-blush-200/70 hover:shadow-v3-glow sm:h-[42px] sm:px-5 sm:text-[13.5px] 2xl:h-[44px] 2xl:text-[15px]"
        >
          {connect}
          <Heart className="h-[13px] w-[13px] shrink-0 text-v3-blush-200 transition-transform duration-500 ease-v3-silk group-hover:scale-110" />
        </a>

        <LanguageSwitch />
      </div>
    </motion.header>
  )
}

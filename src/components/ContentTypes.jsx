import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { typeIcons } from './icons'
import { contentTypes } from '../data/contentTypes'
import { content } from '../data/content'
import { revealOnScroll, stagger, textUp } from '../lib/motion'

/**
 * «WHAT I CREATE» — самый тихий блок страницы.
 *
 * Здесь намеренно нет ни одной фотографии и ни одной карточки: только
 * название и маленький контурный символ. Он служит паузой между двумя
 * визуально плотными блоками — соцсетями и стилями.
 *
 * Колонок ровно столько, сколько влезает без переноса длинных названий:
 * от двух на телефоне до шести на широком экране, как на референсе.
 */
export default function ContentTypes() {
  return (
    <motion.section
      aria-labelledby="what-i-create-title"
      variants={stagger(0.07)}
      {...revealOnScroll}
      className="relative border-y border-ink-line/50 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionTitle id="what-i-create-title">{content.types.title}</SectionTitle>

        <motion.ul
          variants={stagger(0.045, 0.1)}
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 xs:grid-cols-3 sm:mt-10 sm:gap-x-6 md:grid-cols-4 xl:grid-cols-6"
        >
          {contentTypes.map((type) => {
            const Icon = typeIcons[type.icon]
            return (
              <motion.li
                key={type.id}
                variants={textUp}
                className="group flex items-center gap-3 sm:gap-3.5"
              >
                {Icon && (
                  <Icon className="k-icon-glow h-[26px] w-[26px] shrink-0 text-blush-100/90 transition-transform duration-700 ease-silk group-hover:scale-110 sm:h-7 sm:w-7" />
                )}
                <span className="text-[12.5px] leading-tight text-blush-50/85 sm:text-[14px]">
                  {type.name}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </motion.section>
  )
}

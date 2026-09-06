import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { typeIcons } from './icons'
import { contentTypes } from '../data/contentTypes'
import { ANCHORS } from '../data/anchors'
import { useText } from '../lib/language'
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
  const { title, items } = useText().types

  return (
    <motion.section
      id={ANCHORS.types}
      aria-labelledby="what-i-create-title"
      variants={stagger(0.07)}
      {...revealOnScroll}
      className="relative scroll-mt-6 border-y border-v3-ink-line/50 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionTitle id="what-i-create-title">{title}</SectionTitle>

        <motion.ul
          variants={stagger(0.045, 0.1)}
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 v3-xs:grid-cols-3 sm:mt-10 sm:gap-x-6 md:grid-cols-4 xl:grid-cols-6"
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
                  <Icon className="v3-icon-glow h-[26px] w-[26px] shrink-0 text-v3-blush-100/90 transition-transform duration-700 ease-v3-silk group-hover:scale-110 sm:h-7 sm:w-7" />
                )}
                <span className="text-[12.5px] leading-tight text-v3-blush-50/85 sm:text-[14px]">
                  {items[type.id]}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </motion.section>
  )
}

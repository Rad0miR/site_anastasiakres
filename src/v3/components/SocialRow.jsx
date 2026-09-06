import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { socialIcons } from './icons'
import { social } from '../data/social'
import { ANCHORS } from '../data/anchors'
import { useText } from '../lib/language'
import { revealOnScroll, softIn, stagger } from '../lib/motion'

/**
 * «WHERE YOU CAN FIND ME» — шесть площадок в одну горизонтальную линию.
 *
 * Строка всегда одна: на широком экране карточки растягиваются и заполняют
 * её целиком (flex-1), на узком — не переносятся на второй ряд, а
 * прокручиваются вбок. Полосу прокрутки прячет .v3-rail, поэтому карусель
 * выглядит как часть композиции, а не как окно со скроллом.
 */
export default function SocialRow() {
  const { title } = useText().social

  return (
    <motion.section
      id={ANCHORS.social}
      aria-labelledby="find-me-title"
      variants={stagger(0.07)}
      {...revealOnScroll}
      className="v3-warm relative scroll-mt-6 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionTitle id="find-me-title">{title}</SectionTitle>

        {/* Боковая прокрутка обрезает всё, что выходит за строку, — в том
            числе подъём карточки под курсором. Поэтому у ленты есть
            вертикальные поля, а верхний отступ на столько же меньше:
            расстояние до заголовка остаётся прежним. */}
        <motion.ul
          variants={stagger(0.06, 0.1)}
          className="v3-rail mt-[22px] flex snap-x snap-mandatory gap-2.5 overflow-x-auto py-1.5 sm:mt-[30px]"
        >
          {social.map((item) => (
            <SocialItem key={item.id} item={item} />
          ))}
        </motion.ul>
      </div>
    </motion.section>
  )
}

function SocialItem({ item }) {
  const Icon = socialIcons[item.icon]
  /* Вторая строка есть только у двух Instagram — их и различает. */
  const note = useText().social.notes[item.id]
  /* Площадка без ссылки всё равно показывается — просто не кликается.
     Так строка из шести карточек не разъезжается, пока ссылку не пришлют. */
  const Tag = item.url ? 'a' : 'div'
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : { 'aria-disabled': 'true' }

  return (
    <motion.li
      variants={softIn}
      className="min-w-[104px] flex-1 shrink-0 snap-start lg:min-w-[140px]"
    >
      <Tag
        {...linkProps}
        className={`v3-glass group flex h-full flex-col items-center gap-2 rounded-v3-card border border-v3-ink-line/80 px-3 py-4 text-center shadow-v3-tile transition-all duration-500 ease-v3-silk lg:flex-row lg:gap-3 lg:px-4 lg:py-3.5 lg:text-left ${
          item.url
            ? 'hover:-translate-y-0.5 hover:border-v3-blush-300/45 hover:shadow-v3-lift'
            : 'cursor-default'
        }`}
      >
        {Icon && (
          <Icon className="v3-icon-glow h-7 w-7 shrink-0 text-v3-blush-100 transition-transform duration-500 ease-v3-silk group-hover:scale-105 lg:h-[26px] lg:w-[26px]" />
        )}
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium text-v3-blush-50 lg:text-[14px]">
            {item.name}
          </span>
          {note && (
            <span className="block truncate text-[11.5px] text-v3-blush-50/55 lg:text-[12.5px]">
              {note}
            </span>
          )}
        </span>
      </Tag>
    </motion.li>
  )
}

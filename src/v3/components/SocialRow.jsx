import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { socialIcons } from './icons'
import { social } from '../data/social'
import { ANCHORS } from '../data/anchors'
import { getImage } from '../lib/images'
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
  const photo = getImage(item.image)
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
      className="h-[236px] min-w-[104px] flex-1 shrink-0 snap-start lg:h-[300px] lg:min-w-[140px]"
    >
      <Tag
        {...linkProps}
        className={`group relative flex h-full flex-col overflow-hidden rounded-v3-card border border-v3-ink-line/80 px-3 pt-4 text-center shadow-v3-tile transition-all duration-500 ease-v3-silk lg:px-4 lg:pt-5 ${
          item.url
            ? 'hover:-translate-y-0.5 hover:border-v3-blush-300/45 hover:shadow-v3-lift'
            : 'cursor-default'
        }`}
      >
        {/* Фотография занимает всю карточку: подложки под иконкой нет,
            снимок читается целиком. object-bottom — чтобы низ кадра, где
            и стоит вся сцена, не срезался; сверху обрезается только
            размытая дымка, которая в этих файлах и так вшита. */}
        <span className="absolute inset-0">
          {photo ? (
            <img
              src={photo}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-bottom transition-transform duration-700 ease-v3-silk group-hover:scale-105"
            />
          ) : (
            <span className="block h-full w-full bg-gradient-to-b from-v3-wine to-v3-ink-deep" />
          )}
          {/* Размытие идёт по самой фотографии и сходит на нет к нижней
              строке подписи. Высота в пикселях, а не в процентах: уровень
              должен совпадать на всех карточках. */}
          <span
            aria-hidden="true"
            className="v3-social-veil pointer-events-none absolute inset-x-0 top-0 h-[112px] lg:h-[128px]"
          />
        </span>

        {/* Блик, пробегающий по карточке под курсором, — как в v1. */}
        <span aria-hidden="true" className="v3-sheen" />

        {/* Иконка и название лежат прямо на фотографии: от неё их отделяют
            только тёмно-розовая обводка и мягкий ореол (.v3-social-mark,
            .v3-social-label). Размеры и расположение прежние. */}
        <span className="relative z-10 flex flex-col items-center gap-2">
          {Icon && (
            <Icon className="v3-social-mark h-7 w-7 shrink-0 text-v3-blush-100 lg:h-[26px] lg:w-[26px]" />
          )}
          <span className="min-w-0">
            <span className="v3-social-label block truncate text-[13px] font-medium text-v3-blush-50 lg:text-[14px]">
              {item.name}
            </span>
            {note && (
              <span className="v3-social-label block truncate text-[11.5px] text-v3-blush-50/55 lg:text-[12.5px]">
                {note}
              </span>
            )}
          </span>
        </span>
      </Tag>
    </motion.li>
  )
}

import { motion } from 'framer-motion'
import { useText } from '../lib/language'
import { textUp } from '../lib/motion'

/**
 * Личное приветствие автора на первом экране.
 *
 * Не карточка и не отдельная секция: просто несколько строк тем же
 * шрифтом и в той же палитре, что и остальной текст героя. Живёт над
 * блоком «WELCOME TO», между ним и логотипом в шапке, и отделено от него
 * только воздухом — так это читается как обращение, а не как баннер.
 *
 * Ширина длинных строк ограничена (см. TEXT ниже): справа на первом
 * экране лежат рукописные пометки, и текст не должен под них заезжать.
 */
export default function Intro({ className = '' }) {
  const { greeting, role, about, invite } = useText().hero.intro

  return (
    <motion.div variants={textUp} className={className}>
      <p className="text-[clamp(15px,1.7vw,22px)] font-medium text-v3-blush-50">{greeting}</p>
      <p className="mt-1 text-[clamp(12.5px,1.35vw,17px)] font-light text-v3-blush-100/85">
        {role}
      </p>
      <p className={`mt-3.5 ${TEXT}`}>{about}</p>
      <p className={`mt-2 ${TEXT}`}>{invite}</p>
    </motion.div>
  )
}

/*
 * Ширина двух длинных абзацев.
 *
 * Растянуть их на всю колонку нельзя: приветствие стоит в верхней части
 * первого экрана, а там справа лежат рукописные пометки — строки заезжали
 * бы прямо под них. Поэтому ширина растёт вместе с экраном ровно настолько,
 * насколько пометки отодвигаются вправо.
 */
const TEXT =
  'max-w-[214px] text-[clamp(12.5px,1.25vw,16px)] leading-[1.65] text-v3-blush-50/70 v3-xs:max-w-[270px] sm:max-w-[380px] lg:max-w-[540px]'

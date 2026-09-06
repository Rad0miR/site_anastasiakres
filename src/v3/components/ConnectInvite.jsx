import { motion } from 'framer-motion'
import { Heart } from './icons'
import { useConnect } from '../lib/connect'
import { useText } from '../lib/language'
import { revealOnScroll, stagger, textUp } from '../lib/motion'

/**
 * Приглашение написать — сразу под блоком соцсетей, ровно посередине
 * страницы. Две строки текста и вторая кнопка «Let’s connect ♡»:
 * первая стоит в шапке, но до неё от середины страницы далеко.
 *
 * Открывают обе кнопки одно и то же окно (components/ConnectDialog.jsx)
 * и подписаны одной и той же строкой словаря — connect.cta.
 */
export default function ConnectInvite() {
  const { invite, cta } = useText().connect
  const { openConnect } = useConnect()

  return (
    <motion.section
      variants={stagger(0.08)}
      {...revealOnScroll}
      className="px-5 pb-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16"
    >
      <motion.div
        variants={textUp}
        className="mx-auto flex w-full max-w-[620px] flex-col items-center text-center"
      >
        <p className="text-[13.5px] leading-[1.7] text-v3-blush-50/75 sm:text-[15px]">
          {invite.map((row) => (
            <span key={row} className="block">
              {row}
            </span>
          ))}
        </p>

        <button
          type="button"
          onClick={openConnect}
          className="v3-cta-glow group mt-6 inline-flex items-center gap-3 rounded-v3-pill bg-gradient-to-b from-v3-blush-100 to-v3-blush-200 px-6 py-3 text-[13px] font-semibold text-v3-wine-deep transition-transform duration-500 ease-v3-silk hover:scale-[1.03] v3-xs:px-7 sm:py-3.5 sm:text-[15px]"
        >
          {cta}
          <Heart className="h-[15px] w-[15px] shrink-0 transition-transform duration-500 ease-v3-silk group-hover:scale-110" />
        </button>
      </motion.div>
    </motion.section>
  )
}

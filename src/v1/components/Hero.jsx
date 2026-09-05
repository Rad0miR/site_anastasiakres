import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { getImage } from '../lib/images'
import { textUp, stagger, SILK } from '../lib/motion'

/* Овальная маска: натюрморт должен раствориться в фоне, не показав край кадра.
   Радиусы подобраны так, чтобы прозрачность наступала раньше границ блока. */
const DECOR_MASK =
  'radial-gradient(ellipse 62% 66% at 52% 40%, #000 0%, #000 34%, rgba(0,0,0,0.62) 54%, transparent 74%)'

const Heart = () => (
  <svg viewBox="0 0 24 22" className="ml-[0.22em] inline-block h-[0.5em] w-[0.56em]" aria-hidden="true">
    <path
      d="M12 20.2S2.6 14.6 2.6 8.1A5.1 5.1 0 0 1 12 5.3a5.1 5.1 0 0 1 9.4 2.8c0 6.5-9.4 12.1-9.4 12.1z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Hero() {
  const avatar = getImage(profile.avatar)
  const decor = getImage(profile.decor)

  return (
    <motion.section variants={stagger(0.09, 0.14)} className="relative shrink-0 pt-7 sm:pt-9 lg:pt-2 2xl:pt-4">
      {/* Натюрморт из правого верхнего угла референса — свет и атмосфера */}
      {decor && (
        <motion.div
          variants={textUp}
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -top-16 h-[250px] w-[80%] sm:-right-7 sm:h-[320px] sm:w-[62%] lg:-right-10 lg:-top-16 lg:h-[350px] lg:w-[44%] 2xl:h-[390px] 2xl:w-[42%]"
        >
          <img
            src={decor}
            alt=""
            className="h-full w-full object-cover object-left opacity-[0.38] sm:opacity-80 lg:opacity-100"
            style={{ maskImage: DECOR_MASK, WebkitMaskImage: DECOR_MASK }}
          />
        </motion.div>
      )}

      <div className="relative flex items-start gap-4 min-[420px]:gap-5 sm:gap-7 lg:gap-9">
        {/* Круглое фото с розовым кольцом и мягким свечением */}
        <motion.div variants={textUp} className="relative shrink-0">
          <div
            className="absolute -inset-2 rounded-full blur-md sm:-inset-3"
            style={{
              background: 'radial-gradient(circle, rgba(239,169,178,0.45) 0%, rgba(239,169,178,0) 68%)',
              animation: 'v1-halo 7s var(--v1-ease-silk) infinite',
            }}
          />
          <div
            className="relative rounded-full p-[1.5px] sm:p-[2px]"
            style={{ background: 'linear-gradient(155deg, #FBD9DC 0%, #EFA9B2 42%, #6B4450 100%)' }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt={profile.name}
                width="760"
                height="760"
                decoding="async"
                className="block h-[92px] w-[92px] rounded-full object-cover min-[420px]:h-[104px] min-[420px]:w-[104px] sm:h-[150px] sm:w-[150px] lg:h-[124px] lg:w-[124px] 2xl:h-[150px] 2xl:w-[150px]"
              />
            ) : (
              <div className="grid h-[92px] w-[92px] place-items-center rounded-full bg-[#0B080C] v1-display text-2xl text-[#F3BEC3] min-[420px]:h-[104px] min-[420px]:w-[104px] sm:h-[150px] sm:w-[150px] sm:text-4xl lg:h-[124px] lg:w-[124px] 2xl:h-[150px] 2xl:w-[150px]">
                NK
              </div>
            )}
          </div>
        </motion.div>

        {/* Имя, описание, кнопка */}
        <div className="min-w-0 flex-1 lg:max-w-[560px]">
          <motion.h1
            variants={textUp}
            className="flex items-center v1-display text-[30px] leading-none text-[#F3BEC3] min-[420px]:text-[34px] sm:text-[46px] lg:text-[38px] 2xl:text-[44px]"
          >
            {profile.wordmark}
            <Heart />
          </motion.h1>

          {/* Переносы строк из референса включаются только на широком экране —
              на телефоне текст течёт сплошным абзацем и не рвётся на огрызки. */}
          <motion.p
            variants={textUp}
            className="mt-3 text-[13px] font-light leading-[1.55] text-white/[0.85] min-[420px]:text-[13.5px] sm:mt-4 sm:text-[15px] lg:mt-2.5 lg:text-[13px] lg:leading-[1.45] 2xl:text-[14.5px] 2xl:leading-[1.5]"
          >
            {profile.bio.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && ' '}
                {i > 0 && <br className="hidden lg:inline" />}
                {line}
              </Fragment>
            ))}
          </motion.p>

          <motion.div variants={textUp} className="mt-4 sm:mt-6 lg:mt-3 2xl:mt-4">
            <motion.a
              href="#links"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: SILK }}
              className="v1-pill-rose group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-medium v1-shadow-glow sm:px-7 sm:py-3 sm:text-[15px] lg:px-6 lg:py-2 lg:text-[13.5px] 2xl:px-7 2xl:py-2.5"
            >
              {profile.ctaLabel}
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                <path
                  d="M12 4.5v15m0 0l-5.5-5.5M12 19.5l5.5-5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

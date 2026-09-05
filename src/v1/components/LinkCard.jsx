import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import PlatformMark from './PlatformMark'
import { getImage } from '../lib/images'
import { usePointerParallax } from '../hooks/usePointerParallax'
import { blurUp, SILK } from '../lib/motion'

/**
 * Карточка-постер: фотография на всю площадь, затемнение слева
 * и блок «знак — название — подпись — кнопка» поверх него.
 *
 * На мобильном пропорции жёсткие (16:10, как на референсе), на десктопе
 * карточка тянется по высоте сетки — так все шесть помещаются в первый экран.
 */
export default function LinkCard({ link }) {
  const { id, platform, subtitle, url, image, badge } = link
  const photo = getImage(image)
  const { ref, x, y, onPointerMove, onPointerLeave, reduced } = usePointerParallax()

  const amp = reduced ? 0 : 1
  const imgX = useTransform(x, [0, 1], [10 * amp, -10 * amp])
  const imgY = useTransform(y, [0, 1], [7 * amp, -7 * amp])

  const spotX = useTransform(x, (v) => `${v * 100}%`)
  const spotY = useTransform(y, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(58% 92% at ${spotX} ${spotY}, rgba(239,169,178,0.20), transparent 68%)`

  return (
    <motion.a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      variants={blurUp}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.6, ease: SILK }}
      className="group relative block aspect-[16/10] overflow-hidden rounded-[24px] border border-[#EFA9B2]/[0.25] bg-[#0B080C] v1-shadow-card outline-none transition-shadow duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:border-[#EFA9B2] lg:aspect-auto lg:h-full"
    >
      {/* 1 — фотография */}
      {photo && (
        <motion.img
          src={photo}
          alt=""
          width="1280"
          height="853"
          decoding="async"
          style={{ x: imgX, y: imgY }}
          className="absolute -inset-[2%] h-[104%] w-[104%] max-w-none object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      )}

      {/* 2 — затемнение, на котором читается текст */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'var(--v1-card-scrim)' }} />

      {/* 3 — розовое пятно под курсором */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* 4 — блик */}
      <div className="v1-sheen-bar" />

      {/* 5 — контент */}
      <div className="relative flex h-full flex-col items-start justify-center p-5 min-[420px]:p-6 lg:p-4 2xl:p-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <PlatformMark
            id={id}
            className="h-[26px] w-[26px] shrink-0 text-[#F3BEC3] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] min-[420px]:h-7 min-[420px]:w-7 sm:h-8 sm:w-8 lg:h-[26px] lg:w-[26px] 2xl:h-[30px] 2xl:w-[30px]"
          />
          <span className="text-[19px] leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] min-[420px]:text-[21px] sm:text-[24px] lg:text-[20px] 2xl:text-[23px]">
            {platform}
          </span>
        </div>

        <p className="mt-3 text-[12.5px] font-light leading-[1.45] text-white/[0.72] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] min-[420px]:text-[13px] sm:mt-4 sm:text-[14px] lg:mt-2.5 lg:text-[12.5px] 2xl:mt-3.5 2xl:text-[13.5px]">
          {subtitle.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <span className="v1-pill-glass mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] font-light text-white/[0.90] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white sm:mt-5 sm:px-5 sm:py-2 sm:text-[13.5px] lg:mt-3.5 lg:px-4 lg:py-1.5 lg:text-[12.5px] 2xl:mt-4">
          Перейти
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path
              d="M4.5 12h15m0 0l-5.5-5.5M19.5 12L14 17.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* 6 — плашка «Главная» */}
      {badge && (
        <span className="v1-pill-rose absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium v1-shadow-glow sm:right-5 sm:top-5 sm:px-3.5 sm:text-[12px]">
          {badge}
          <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
            <path
              d="M12 2.6l2.72 6.06 6.6.66-4.94 4.44 1.4 6.5L12 16.9l-5.78 3.36 1.4-6.5L2.68 9.32l6.6-.66z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}

      {/* 7 — кольцо подсветки при наведении */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 ring-1 ring-inset ring-[#EFA9B2]/[0.45] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100" />
    </motion.a>
  )
}

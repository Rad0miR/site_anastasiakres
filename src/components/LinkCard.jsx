import { useState } from 'react'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import CardAtmosphere from './CardAtmosphere'
import Sticker from './Sticker'
import PlatformMark from './PlatformMark'
import { getImage } from '../lib/images'
import { usePointerParallax } from '../hooks/usePointerParallax'
import { blurUp, SILK } from '../lib/motion'

export default function LinkCard({ link }) {
  const { ref, x, y, onPointerMove, onPointerLeave, reduced } = usePointerParallax()
  const [hovered, setHovered] = useState(false)
  const photo = getImage(link.image)

  /* Наклон карточки — очень сдержанный, премиальный, без «игрушечности» */
  const rotateX = useTransform(y, [0, 1], reduced ? [0, 0] : [5, -5])
  const rotateY = useTransform(x, [0, 1], reduced ? [0, 0] : [-7, 7])

  /* Слои двигаются с разной амплитудой — отсюда ощущение глубины */
  const bgX = useTransform(x, [0, 1], reduced ? [0, 0] : [14, -14])
  const bgY = useTransform(y, [0, 1], reduced ? [0, 0] : [10, -10])
  const stickerX = useTransform(x, [0, 1], reduced ? [0, 0] : [-18, 18])
  const stickerY = useTransform(y, [0, 1], reduced ? [0, 0] : [-10, 10])
  const stickerRotate = useTransform(x, [0, 1], reduced ? [0, 0] : [-5, 5])

  /* Мягкое пятно света под курсором */
  const glowX = useTransform(x, (v) => `${v * 100}%`)
  const glowY = useTransform(y, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(38% 44% at ${glowX} ${glowY}, rgba(255,255,255,0.20), transparent 70%)`

  return (
    <motion.article
      variants={blurUp}
      className={link.featured ? 'md:col-span-2' : ''}
      style={{ perspective: 1400 }}
    >
      <motion.a
        ref={ref}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.platform} — ${link.title}`}
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          onPointerLeave()
          setHovered(false)
        }}
        onPointerEnter={() => setHovered(true)}
        style={{ rotateX, rotateY }}
        whileHover={reduced ? undefined : { scale: 1.018 }}
        whileTap={{ scale: 0.988 }}
        transition={{ duration: 0.6, ease: SILK }}
        className={[
          'group relative block overflow-hidden rounded-card',
          'shadow-poster ring-1 ring-white/12 outline-none',
          'transition-shadow duration-700 ease-silk hover:shadow-lift',
          'focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl',
          link.featured
            ? 'aspect-[4/5] xs:aspect-[16/11] md:aspect-[2.35/1]'
            : 'aspect-[4/5] sm:aspect-[5/6]',
        ].join(' ')}
      >
        {/* 1 — нарисованная атмосфера */}
        <motion.div className="layer" style={{ x: bgX, y: bgY, scale: 1.08 }}>
          <CardAtmosphere theme={link.theme} />
        </motion.div>

        {/* 2 — фотография, если файл добавлен в assets/images */}
        {photo && (
          <motion.div
            className="layer"
            style={{ x: bgX, y: bgY }}
            animate={{ scale: hovered && !reduced ? 1.09 : 1.02 }}
            transition={{ duration: 1.1, ease: SILK }}
          >
            <img
              src={photo}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* фото приглушено, чтобы атмосфера и текст остались читаемыми */}
            <div className="layer bg-[linear-gradient(180deg,rgba(10,8,12,0.10)_0%,rgba(10,8,12,0.55)_62%,rgba(8,6,10,0.86)_100%)]" />
          </motion.div>
        )}

        {/* 2.5 — подложка под текстом: белая типографика читается
            одинаково и на тёмном океане, и на светлом moodboard */}
        <div
          className="layer"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,7,11,0.42) 0%, rgba(10,7,11,0.06) 22%, transparent 40%), linear-gradient(180deg, transparent 42%, rgba(10,7,11,0.46) 72%, rgba(8,5,9,0.84) 100%)',
          }}
        />

        {/* 3 — свет под курсором */}
        <motion.div
          className="layer mix-blend-soft-light"
          style={{ background: spotlight }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: SILK }}
        />

        {/* 4 — блик, проходящий по стеклу */}
        <div className="layer overflow-hidden">
          <div className="sheen-bar" />
        </div>

        {/* 5 — мини-версия Насти */}
        <motion.div
          className={[
            'pointer-events-none absolute z-10',
            link.featured
              ? 'bottom-0 right-[6%] h-[74%] md:right-[9%] md:h-[86%]'
              : 'bottom-0 right-[5%] h-[52%] sm:h-[56%]',
          ].join(' ')}
          style={{ x: stickerX, y: stickerY, rotate: stickerRotate }}
          animate={{ scale: hovered && !reduced ? 1.07 : 1, y: hovered && !reduced ? -10 : 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        >
          <Sticker id={link.id} theme={link.theme} className="h-full w-auto" />
        </motion.div>

        {/* 6 — контент */}
        <div className="relative z-20 flex h-full flex-col justify-between p-5 sm:p-6 md:p-7">
          <div className="flex items-start justify-between gap-3">
            <span className="glass-dark inline-flex items-center gap-2 rounded-pill py-1.5 pl-2.5 pr-3.5 text-[11px] font-medium uppercase tracking-wide text-white/90">
              <PlatformMark id={link.id} className="h-3.5 w-3.5" />
              {link.platform}
            </span>

            <span className="glass-dark grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/90 transition-transform duration-500 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className={link.featured ? 'max-w-[64%] md:max-w-[52%]' : 'max-w-[78%]'}>
            <h3
              className={[
                'font-light leading-[1.06] tracking-[-0.02em] text-white',
                link.featured ? 'text-[30px] sm:text-4xl md:text-[44px]' : 'text-[26px] sm:text-[28px]',
              ].join(' ')}
            >
              {link.title}
            </h3>

            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-white/65 sm:text-[13px]">
              {link.subtitle}
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              <span className="h-px w-8 bg-rose-300/70 transition-all duration-700 ease-silk group-hover:w-14" />
              <span className="text-[11px] font-light tracking-wide text-white/50">{link.handle}</span>
            </div>
          </div>
        </div>

        {/* 7 — свечение по краю при наведении */}
        <div className="layer rounded-card ring-1 ring-inset ring-white/0 transition-all duration-700 ease-silk group-hover:ring-white/25 group-hover:shadow-[inset_0_0_60px_rgba(255,255,255,0.10)]" />
      </motion.a>
    </motion.article>
  )
}

import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { getImage } from '../lib/images'
import { blurUp, textUp, stagger, SILK } from '../lib/motion'

function Avatar() {
  const src = getImage(profile.avatar)

  return (
    <motion.div
      variants={blurUp}
      className="relative mx-auto h-[132px] w-[132px] sm:h-[164px] sm:w-[164px]"
    >
      {/* медленно вращающееся кольцо света */}
      <div
        className="absolute -inset-[14px] rounded-full opacity-70 blur-[10px]"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(243,210,218,0) 0deg, rgba(235,185,196,0.95) 90deg, rgba(255,255,255,0) 190deg, rgba(220,152,168,0.75) 290deg, rgba(243,210,218,0) 360deg)',
          animation: 'spin-slow 18s linear infinite',
        }}
      />
      <div className="absolute -inset-[3px] rounded-full bg-white/70 backdrop-blur-sm" />

      <motion.div
        whileHover={{ scale: 1.035 }}
        transition={{ duration: 0.7, ease: SILK }}
        className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/80 shadow-[0_26px_54px_-22px_rgba(64,32,42,0.45)]"
      >
        {src ? (
          <img
            src={src}
            alt={profile.name}
            width="328"
            height="328"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          /* Пока avatar.webp не добавлен — монограмма в тон палитре */
          <div className="grid h-full w-full place-items-center bg-[linear-gradient(150deg,#FBEAEE_0%,#F3D2DA_45%,#C98A96_100%)]">
            <span className="text-[42px] font-extralight tracking-[0.12em] text-white/95 sm:text-[52px]">
              NK
            </span>
          </div>
        )}
        <div className="layer rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent_45%)]" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.header
      variants={stagger(0.11, 0.15)}
      initial="hidden"
      animate="show"
      className="relative pt-14 text-center sm:pt-20 md:pt-24"
    >
      <Avatar />

      <motion.h1
        variants={textUp}
        className="mt-8 text-[42px] font-extralight uppercase leading-none tracking-wordmark text-ink sm:mt-10 sm:text-[58px] md:text-[68px]"
      >
        {/* отступ компенсирует трекинг последней буквы */}
        <span className="ml-[0.34em] inline-block">{profile.wordmark}</span>
      </motion.h1>

      <motion.div variants={textUp} className="mx-auto mt-6 h-px w-24 hairline sm:mt-7" />

      <motion.div
        variants={stagger(0.08)}
        className="mx-auto mt-6 max-w-[34rem] space-y-2.5 px-2 sm:mt-7"
      >
        {profile.bio.map((line, i) => (
          <motion.p
            key={i}
            variants={textUp}
            className={[
              'text-balance font-light leading-relaxed',
              i === 0
                ? 'text-[19px] text-ink sm:text-[21px]'
                : 'text-[14.5px] text-graphite/60 sm:text-[15.5px]',
            ].join(' ')}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      <motion.ul variants={stagger(0.07)} className="mt-7 flex flex-wrap justify-center gap-2">
        {profile.tags.map((tag) => (
          <motion.li
            key={tag}
            variants={textUp}
            className="glass-chip rounded-pill px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-graphite/70"
          >
            {tag}
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        variants={textUp}
        className="mt-12 text-[10.5px] font-light uppercase tracking-[0.28em] text-graphite/35 sm:mt-16"
      >
        Мои социальные сети
      </motion.p>
    </motion.header>
  )
}

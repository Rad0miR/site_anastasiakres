import { motion } from 'framer-motion'
import { Heart } from './icons'
import { noteIn } from '../lib/motion'

/**
 * Рукописная пометка поверх фотографии: несколько строк лесенкой
 * и сердечко под ними.
 *
 *   tone="light" — светлые буквы с тёмной тенью (тёмные кадры)
 *   tone="dark"  — тёмные буквы со светлой тенью (закат внизу сайта)
 *
 * Это декор, а не содержание, поэтому для скринридера блок скрыт —
 * иначе он читал бы «Same Girl Bigger Ideas» посреди описания сайта.
 */
const TONES = {
  light: { className: 'text-v3-blush-50/85', textShadow: '0 2px 14px rgba(0,0,0,0.55)' },
  dark: { className: 'text-[#2A1614]/80', textShadow: '0 1px 12px rgba(255,248,245,0.6)' },
}

export default function ScriptNote({ lines, className = '', heart = true, tone = 'light' }) {
  const { className: toneClass, textShadow } = TONES[tone] ?? TONES.light

  return (
    <motion.div
      variants={noteIn}
      aria-hidden="true"
      className={`pointer-events-none select-none font-v3-script leading-[1.15] ${toneClass} ${className}`}
      style={{ textShadow }}
    >
      {lines.map((line, i) => (
        /* Каждая следующая строка сдвинута вправо — так пишут от руки. */
        <span key={line} className="block" style={{ paddingLeft: `${i * 0.55}em` }}>
          {line}
        </span>
      ))}
      {heart && (
        <Heart
          className="mt-1 h-[1em] w-[1em] opacity-85"
          style={{ marginLeft: `${lines.length * 0.4}em` }}
        />
      )}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import ScriptNote from './ScriptNote'
import { content } from '../data/content'
import { getImage } from '../lib/images'
import { revealOnScroll, stagger, textUp } from '../lib/motion'

const src = getImage('finale')

/**
 * Нижняя часть сайта: закат во всю ширину и главная фраза поверх него.
 *
 * Картинка светлая, поэтому текст здесь тёмный — единственное место
 * на сайте, где так. Но светлая она не везде: надпись пересекает и
 * солнце, и робота, и кота. Читаемость держат два слоя — светлая дымка
 * под текстом и ореол вокруг самих букв.
 */
export default function Finale() {
  const { title, subtitle, notes } = content.finale

  return (
    <motion.section
      aria-labelledby="finale-title"
      variants={stagger(0.09)}
      {...revealOnScroll}
      className="relative isolate w-full overflow-hidden bg-v2-wine-deep"
    >
      {/* Кадр очень широкий, и всё главное — робот с котом — стоит у правого
          края. Поэтому на узком экране картинка прижата вправо: пусть слева
          уходит пустой залив, но кот остаётся целиком. К широкому экрану
          помещается уже всё, и снимок возвращается в центр. */}
      {src && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[88%_center] sm:object-[72%_center] lg:object-center"
        />
      )}

      {/* Дымка под текстом + мягкий стык с тёмными секциями сверху и снизу.
          Текст стоит ровно по центру кадра — там же и центр дымки. Радиусы
          заданы длинами, а не процентами: доля кадра, которую занимает
          надпись, на телефоне и на широком экране разная (пропорции секции
          меняются от 4/3 до 2135/736), а сама надпись растёт вместе с vw —
          вместе с ней растёт и пятно. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(clamp(210px,24vw,480px) clamp(120px,12vw,210px) at 50% 50%, rgba(255,248,245,0.44) 0%, rgba(255,248,245,0.22) 50%, rgba(255,248,245,0) 80%),' +
            'linear-gradient(to bottom, rgba(23,16,16,0.5) 0%, rgba(23,16,16,0) 22%, rgba(23,16,16,0) 76%, rgba(12,8,8,0.55) 100%)',
        }}
      />

      <div className="relative flex min-h-[300px] w-full items-center justify-center px-4 py-14 [aspect-ratio:4/3] sm:px-5 sm:min-h-[300px] sm:[aspect-ratio:16/7] lg:[aspect-ratio:2135/736]">
        <ScriptNote
          lines={notes.left}
          tone="dark"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[clamp(18px,3.4vw,30px)] sm:left-10 lg:left-[6%]"
        />

        {/* Светлый ореол вокруг букв — тот же приём, что у рукописных
            пометок (ScriptNote, tone="dark"). Он держит надпись читаемой
            там, где под ней тёмное: козырёк робота, рука, кот. Одной
            дымки для этого мало, а поднимать её до нужной плотности
            значило бы затянуть закат молоком. */}
        <motion.div
          variants={textUp}
          className="text-center"
          style={{
            textShadow: '0 0 10px rgba(255,248,245,0.95), 0 0 26px rgba(255,248,245,0.7)',
          }}
        >
          <h2
            id="finale-title"
            className="font-v2-display text-[clamp(23px,2.6vw,48px)] font-light uppercase leading-[1.08] tracking-[0.12em] text-[#2A1E1C]"
          >
            {title.map((row) => (
              <span key={row} className="block">
                {row}
              </span>
            ))}
          </h2>
          <p className="mt-3 text-[clamp(9px,1vw,15px)] font-light uppercase tracking-v2-widest text-[#4A3128] sm:mt-4">
            {subtitle}
          </p>
        </motion.div>

        <ScriptNote
          lines={notes.right}
          tone="dark"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[clamp(16px,3vw,28px)] sm:right-10 lg:right-[6%]"
        />
      </div>
    </motion.section>
  )
}

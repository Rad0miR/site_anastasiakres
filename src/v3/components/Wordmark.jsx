import { useId } from 'react'
import { brand } from '../data/brand'

/**
 * Логотип. Пишется всегда цельно: «Kres AI».
 *
 * Разделение на два <span> — только чтобы дать им разный градиент:
 * «Kres» светлый, «AI» ярко-розовый. Для копирования и для скринридера
 * это по-прежнему одна строка «Kres AI».
 *
 * arcs — светящиеся дуги вокруг надписи с искрой на верхнем конце.
 * Нужны обоим логотипам, и крупному, и маленькому: размеры внутри
 * заданы в em, поэтому дуги растут вместе со шрифтом.
 */
export default function Wordmark({ className = '', arcs = false }) {
  const { first, accent } = brand
  return (
    <span className={`font-v3-sans font-extrabold tracking-v3-wordmark ${className}`}>
      {/* Внутренняя обёртка сжата по ширине букв — от неё считаются дуги.
          Внешний span в hero растянут во всю колонку (block), и по нему
          они легли бы мимо надписи. */}
      <span className="relative inline-block">
        {arcs && <Arcs layer="back" />}

        <span className="v3-wordmark-glow relative z-10">
          <span className="v3-wordmark-kres">{first}</span>{' '}
          <span className="v3-wordmark-ai">{accent}</span>
        </span>

        {arcs && <Arcs layer="front" />}
      </span>
    </span>
  )
}

/**
 * Один слой дуг. Рисуется дважды — под буквами (layer="back") и над ними
 * (layer="front"); какой участок линии достанется какому слою, решают
 * взаимно дополняющие маски в v3.css. Поэтому свет ныряет за текст слева
 * от «K» и снова выходит перед ним.
 *
 * Дуги — две части одного наклонного эллипса: яркая идёт слева, под
 * надписью и вверх направо к искре, тусклая возвращается поверху.
 * Обе с градиентной обводкой, поэтому концы растворяются, а не обрываются.
 */
function Arcs({ layer }) {
  /* useId — чтобы два логотипа на странице не поделили один id градиента.
     Двоеточия из него убираем: они мешают ссылке url(#…). */
  const uid = useId().replace(/:/g, '')
  const sweepId = `v3-arc-sweep-${uid}`
  const backId = `v3-arc-back-${uid}`

  return (
    <svg aria-hidden="true" viewBox="0 0 220 95" className={`v3-orbit v3-orbit--${layer}`}>
      <defs>
        <linearGradient id={sweepId} x1="6" y1="65.5" x2="208.7" y2="15.7" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffd9ef" stopOpacity="0" />
          <stop offset="22%" stopColor="#ffdcf0" stopOpacity="0.95" />
          <stop offset="58%" stopColor="#ff9fd4" stopOpacity="1" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id={backId} x1="208.7" y1="15.7" x2="6" y2="65.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffc4e6" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#f89ad0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* возврат эллипса поверху — почти растаявший */}
      <path className="v3-arc" stroke={`url(#${backId})`} d="M208.7 15.7A107 34 -13 0 0 6 65.5" />

      {/* основной пробег: слева, под надписью и вверх направо */}
      <path className="v3-arc v3-arc--sweep" stroke={`url(#${sweepId})`} d="M6 65.5A107 34 -13 1 0 208.7 15.7" />

      {/* короткий внутренний росчерк — глубина, как на референсе */}
      <path
        className="v3-arc v3-arc--inner"
        stroke={`url(#${sweepId})`}
        d="M28 68.4A92 21 -9 1 0 196 26.6"
      />

      {/* Искра на конце яркой дуги. Живёт в дальнем слое: она стоит над
          буквами, а не на них, и маска ближнего слоя её бы срезала. */}
      {layer === 'back' && (
        <g transform="translate(196.5 4.5) scale(1.35)">
          <path
            className="v3-arc-spark"
            d="M12.5 6.5c.5 2.7 1.3 3.5 4 4-2.7.5-3.5 1.3-4 4-.5-2.7-1.3-3.5-4-4 2.7-.5 3.5-1.3 4-4Z"
          />
        </g>
      )}
    </svg>
  )
}

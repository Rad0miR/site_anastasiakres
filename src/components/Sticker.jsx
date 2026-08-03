import { memo } from 'react'
import { getSticker } from '../lib/images'

/**
 * Мини-версия Насти на карточке.
 *
 * Если в src/assets/images/stickers/<id>.png лежит настоящий 3D-стикер —
 * показываем его. Пока файла нет, рисуем векторную заглушку в стиле
 * die-cut: тёмное каре, светлое лицо, розовый корпус и тонкий белый кант.
 */

const HAIR = '#241E28'
const SKIN = '#F7DDD1'
const PROP = '#2E2731'
const PROP_LIGHT = '#F3D2DA'
const WARM = '#FFD9C0'

/** Рука одной линией — толщина одинаковая во всех позах */
const Arm = ({ d }) => (
  <path d={d} stroke={SKIN} strokeWidth="6.5" strokeLinecap="round" fill="none" />
)

/* --- руки (под корпусом, чтобы плечи закрывали место крепления) --- */
function PoseArms({ theme }) {
  switch (theme) {
    case 'apartment':
      return (
        <>
          <Arm d="M43 84 C35 76 35 64 43 57" />
          <Arm d="M77 86 C85 96 86 108 82 118" />
        </>
      )
    case 'lab':
      return (
        <>
          <Arm d="M42 88 C36 100 38 112 44 118" />
          <Arm d="M78 88 C84 100 82 112 76 118" />
        </>
      )
    case 'desk':
      return (
        <>
          <Arm d="M42 88 C37 100 40 112 47 116" />
          <Arm d="M78 88 C86 96 87 106 81 112" />
        </>
      )
    case 'ocean':
      return (
        <>
          <Arm d="M43 86 C35 84 30 78 31 70" />
          <Arm d="M77 86 C85 96 86 108 82 118" />
        </>
      )
    case 'city':
      return (
        <>
          <Arm d="M42 88 C36 98 35 110 41 118" />
          <Arm d="M78 86 C88 86 93 78 92 70" />
        </>
      )
    case 'moodboard':
      return (
        <>
          <Arm d="M42 88 C36 98 38 108 46 112" />
          <Arm d="M78 88 C84 98 82 108 74 112" />
        </>
      )
    default:
      return null
  }
}

/* --- реквизит (поверх корпуса) --- */
function PoseProps({ theme, gid }) {
  switch (theme) {
    /* селфи — телефон в поднятой руке */
    case 'apartment':
      return (
        <g transform="rotate(-16 43 46)">
          <rect x="35" y="33" width="15" height="25" rx="3.5" fill={PROP} />
          <rect x="37.5" y="35.5" width="10" height="19" rx="2" fill={PROP_LIGHT} />
        </g>
      )

    /* ноутбук */
    case 'lab':
      return (
        <g>
          <rect x="43" y="96" width="34" height="24" rx="2.5" fill={PROP} />
          <rect x="45.5" y="98.5" width="29" height="19" rx="1.5" fill={PROP_LIGHT} />
          <path d="M39 122 L81 122 L88 138 L32 138 Z" fill={PROP} />
          <path d="M33 136 H87" stroke="#5A4E5E" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )

    /* блокнот и ручка */
    case 'desk':
      return (
        <>
          <g transform="rotate(-8 60 118)">
            <rect x="38" y="102" width="44" height="32" rx="3" fill="#FBF3E8" />
            <rect x="38" y="102" width="6.5" height="32" rx="3" fill="#C07C8D" />
            <g stroke="#BFA895" strokeWidth="2" strokeLinecap="round">
              <path d="M50 112 H75" />
              <path d="M50 120 H71" />
              <path d="M50 128 H66" />
            </g>
          </g>
          <rect x="79" y="94" width="4.5" height="19" rx="2.25" fill={PROP} transform="rotate(38 81 103)" />
        </>
      )

    /* фонарь — луч уходит влево, мимо головы */
    case 'ocean':
      return (
        <>
          <g transform="rotate(-24 31 62)">
            <rect x="24" y="56" width="13" height="18" rx="3" fill={PROP} />
            <rect x="22.5" y="49" width="16" height="7.5" rx="2.5" fill="#DCEFFA" />
          </g>
          <path d="M27 50 L0 22 L0 78 Z" fill={`url(#${gid}-beam)`} stroke="none" />
        </>
      )

    /* съёмка на телефон */
    case 'city':
      return (
        <>
          <g transform="rotate(10 92 53)">
            <rect x="84" y="40" width="16" height="26" rx="3.5" fill={PROP} />
            <rect x="86.5" y="42.5" width="11" height="20" rx="2" fill={WARM} />
          </g>
          <circle cx="92" cy="31" r="7.5" fill="none" stroke={WARM} strokeWidth="2.5" opacity="0.85" />
        </>
      )

    /* рассматривает фотографии */
    case 'moodboard':
      return (
        <g transform="rotate(-5 60 114)">
          <rect x="40" y="96" width="40" height="36" rx="3" fill="#FFFDFB" />
          <rect x="43.5" y="99.5" width="33" height="23" rx="2" fill="#EFC7CF" />
          <rect x="43.5" y="126" width="15" height="3" rx="1.5" fill="#D9C6BD" />
        </g>
      )

    default:
      return null
  }
}

function Sticker({ id, theme, className = '' }) {
  const png = getSticker(id)

  if (png) {
    return (
      <img
        src={png}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`select-none drop-shadow-[0_18px_28px_rgba(12,8,12,0.45)] ${className}`}
      />
    )
  }

  const gid = `st-${id}`

  return (
    <svg
      viewBox="0 0 120 170"
      className={`select-none drop-shadow-[0_16px_26px_rgba(12,8,12,0.42)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* userSpaceOnUse — корпус во всех карточках заливается одинаково */}
        <linearGradient id={`${gid}-cloth`} gradientUnits="userSpaceOnUse" x1="34" y1="60" x2="80" y2="158">
          <stop offset="0%" stopColor="#FBEAEE" />
          <stop offset="45%" stopColor="#EFC3CF" />
          <stop offset="100%" stopColor="#B87487" />
        </linearGradient>
        <linearGradient id={`${gid}-beam`} gradientUnits="userSpaceOnUse" x1="27" y1="50" x2="0" y2="50">
          <stop offset="0%" stopColor="#DCEFFA" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#DCEFFA" stopOpacity="0" />
        </linearGradient>

        {/* Силуэт рисуется один раз и переиспользуется для белого канта */}
        <g id={gid}>
          <PoseArms theme={theme} />

          {/* волосы сзади */}
          <path
            d="M60 12 C74 12 85 23 85 39 C85 50 82 58 78 64 L80 76 C74 70 68 67 60 67 C52 67 46 70 40 76 L42 64 C38 58 35 50 35 39 C35 23 46 12 60 12 Z"
            fill={HAIR}
          />
          {/* лицо */}
          <circle cx="60" cy="41" r="15.5" fill={SKIN} />
          {/* чёлка */}
          <path
            d="M44 34 C47 21 53 16 60 16 C68 16 76 21 78 35 C72 27 66 25 59 26 C52 27 47 30 44 34 Z"
            fill={HAIR}
          />
          {/* шея */}
          <rect x="55.5" y="52" width="9" height="14" rx="4" fill={SKIN} />
          {/* корпус */}
          <path
            d="M60 63 C48 63 40 72 38 86 L33 140 C32 149 38 155 46 155 L74 155 C82 155 88 149 87 140 L82 86 C80 72 72 63 60 63 Z"
            fill={`url(#${gid}-cloth)`}
          />

          <PoseProps theme={theme} gid={gid} />
        </g>
      </defs>

      {/* белый кант: первый проход даёт обводку, второй закрывает её цветом */}
      <use href={`#${gid}`} stroke="#FFFFFF" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <use href={`#${gid}`} />
    </svg>
  )
}

export default memo(Sticker)

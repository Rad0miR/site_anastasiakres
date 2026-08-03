import { memo } from 'react'

/**
 * Знаки платформ в том же виде, что на референсе: Instagram и Threads —
 * контурные, YouTube, TikTok и Pinterest — залитые. Все берут цвет
 * у родителя через currentColor, поэтому набор выглядит единым.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/** Тёмный контрцвет внутри залитых знаков — под фон карточки. */
const VOID = '#120C10'

const InstagramGlyph = () => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="5.4" {...stroke} />
    <circle cx="12" cy="12" r="4.2" {...stroke} />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </>
)

const MARKS = {
  instagram: <InstagramGlyph />,

  'instagram-ai': (
    <>
      <InstagramGlyph />
      <path d="M19.4 14.9l.62 1.69 1.69.62-1.69.62-.62 1.69-.62-1.69-1.69-.62 1.69-.62z" fill="currentColor" />
    </>
  ),

  threads: (
    <>
      <path d="M12.6 21C7.7 21 4.5 17.6 4.5 12S7.8 3 12.7 3c3.5 0 5.9 1.5 7 4" {...stroke} />
      <path
        d="M12.6 21c4.3 0 6.5-2.2 6.5-5 0-3-2.5-4.6-5.9-4.6-2.4 0-4 1-4 2.6 0 1.5 1.2 2.4 2.7 2.4 2.2 0 3.4-1.8 3.4-4.7"
        {...stroke}
      />
    </>
  ),

  youtube: (
    <>
      <rect x="1.4" y="4.9" width="21.2" height="14.2" rx="4.9" fill="currentColor" />
      <path d="M10.1 8.9l5.8 3.1-5.8 3.1z" fill={VOID} />
    </>
  ),

  tiktok: (
    <path
      d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.82-2.47V9.66a5.7 5.7 0 1 0 4.91 5.64V8.9a7.35 7.35 0 0 0 4.29 1.37V7.18a4.28 4.28 0 0 1-3.23-1.36z"
      fill="currentColor"
    />
  ),

  pinterest: (
    <>
      <circle cx="12" cy="12" r="10.2" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.6 6.2h3.75c2.1 0 3.5 1.28 3.5 3.2 0 2-1.45 3.32-3.72 3.32h-1.5v5.08H9.6V6.2zm2.03 1.83v2.92h1.4c.98 0 1.55-.53 1.55-1.46 0-.94-.57-1.46-1.55-1.46h-1.4z"
        fill={VOID}
      />
    </>
  ),
}

function PlatformMark({ id, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {MARKS[id] ?? MARKS.instagram}
    </svg>
  )
}

export default memo(PlatformMark)

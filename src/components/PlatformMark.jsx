import { memo } from 'react'

/**
 * Монохромные знаки платформ. Одна линия, одна толщина —
 * поэтому шесть разных логотипов выглядят как один набор.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const InstagramGlyph = () => (
  <>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" {...stroke} />
    <circle cx="12" cy="12" r="4.1" {...stroke} />
    <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
  </>
)

const MARKS = {
  instagram: <InstagramGlyph />,

  'instagram-ai': (
    <>
      <InstagramGlyph />
      <path d="M19.6 15.4l.55 1.5 1.5.55-1.5.55-.55 1.5-.55-1.5-1.5-.55 1.5-.55z" fill="currentColor" />
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
      <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="4.2" {...stroke} />
      <path d="M10.4 9.4l5 2.6-5 2.6z" fill="currentColor" />
    </>
  ),

  tiktok: (
    <>
      <path d="M14.1 3.5v10.2a3.9 3.9 0 1 1-3.9-3.9" {...stroke} />
      <path d="M14.1 3.5c.5 2.6 2.4 4.2 5 4.4" {...stroke} />
    </>
  ),

  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M10 18.6l2.3-9.2" {...stroke} />
      <path
        d="M9.7 12.7c-.3-.6-.5-1.3-.5-2 0-2.3 1.8-4.1 4.1-4.1 2.1 0 3.6 1.4 3.6 3.4 0 2.3-1.3 4.1-3 4.1-1 0-1.7-.8-1.5-1.7"
        {...stroke}
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

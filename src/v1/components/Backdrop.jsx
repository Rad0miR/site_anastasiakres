import { memo } from 'react'

/**
 * Фон страницы: почти чёрная база и два медленно дышащих розовых пятна.
 * Живёт под контентом, ничего не перехватывает.
 */
function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_-10%,#150C13_0%,#0A0609_38%,#060407_72%)]" />

      <div
        className="absolute -right-[14%] -top-[18%] h-[58vmax] w-[58vmax] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(200,120,138,0.22) 0%, rgba(200,120,138,0) 68%)',
          animation: 'v1-aurora 26s var(--v1-ease-silk) infinite',
        }}
      />
      <div
        className="absolute -left-[20%] top-[46%] h-[52vmax] w-[52vmax] rounded-full blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(142,85,102,0.18) 0%, rgba(142,85,102,0) 70%)',
          animation: 'v1-aurora 33s var(--v1-ease-silk) 5s infinite',
        }}
      />
    </div>
  )
}

export default memo(Backdrop)

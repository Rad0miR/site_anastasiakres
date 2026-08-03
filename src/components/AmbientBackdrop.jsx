import { memo } from 'react'

/**
 * Фон всей страницы: перламутровая база и медленно дышащие розовые пятна.
 * Живёт под контентом, ничего не перехватывает.
 */
function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FDFBFC_0%,#F8F6F7_45%,#F3EEF0_100%)]" />

      <div
        className="absolute -left-[18%] -top-[22%] h-[70vmax] w-[70vmax] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(243,210,218,0.85) 0%, rgba(243,210,218,0) 68%)',
          animation: 'aurora 22s var(--ease-silk) infinite',
        }}
      />
      <div
        className="absolute -right-[22%] top-[12%] h-[62vmax] w-[62vmax] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(235,185,196,0.6) 0%, rgba(235,185,196,0) 70%)',
          animation: 'aurora 27s var(--ease-silk) 3s infinite',
        }}
      />
      <div
        className="absolute bottom-[-18%] left-[24%] h-[58vmax] w-[58vmax] rounded-full blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(210,206,214,0.55) 0%, rgba(210,206,214,0) 70%)',
          animation: 'aurora 31s var(--ease-silk) 6s infinite',
        }}
      />

      {/* едва заметная сетка — «инженерная» точность под мягкостью */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#0C0C0F 1px, transparent 1px), linear-gradient(90deg, #0C0C0F 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(70% 60% at 50% 30%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, black, transparent 80%)',
        }}
      />
    </div>
  )
}

export default memo(AmbientBackdrop)

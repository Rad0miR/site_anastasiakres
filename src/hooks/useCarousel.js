import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Горизонтальная карусель на обычной прокрутке.
 *
 * Прокрутку делает браузер — пальцем, колесом, клавишами. Хук только
 * добавляет стрелки и знает, есть ли ещё куда листать, чтобы гасить их
 * на краях и целиком прятать, когда всё и так помещается (широкий экран).
 *
 * Возвращает: { rail, canPrev, canNext, overflows, scrollByPage }
 */
export function useCarousel(deps = []) {
  const rail = useRef(null)
  const [state, setState] = useState({ canPrev: false, canNext: false, overflows: false })

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setState({
      // 2px — запас на дробные значения при масштабировании страницы
      canPrev: el.scrollLeft > 2,
      canNext: el.scrollLeft < max - 2,
      overflows: max > 2,
    })
  }, [])

  useEffect(() => {
    const el = rail.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, ...deps])

  /** Листаем на 80% видимой ширины: край предыдущего экрана остаётся виден. */
  const scrollByPage = useCallback((dir) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }, [])

  return { rail, ...state, scrollByPage }
}

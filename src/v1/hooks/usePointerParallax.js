import { useCallback, useRef } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Нормализованная позиция курсора внутри элемента (0..1 по обеим осям).
 * Возвращает пружинные motion values — движение получается мягким, без рывков.
 * На тач-устройствах и при prefers-reduced-motion остаётся ровно по центру.
 */
export function usePointerParallax() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)

  const config = { stiffness: 130, damping: 20, mass: 0.55 }
  const x = useSpring(rawX, config)
  const y = useSpring(rawY, config)

  const onPointerMove = useCallback(
    (event) => {
      if (reduced || event.pointerType === 'touch' || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      rawX.set((event.clientX - rect.left) / rect.width)
      rawY.set((event.clientY - rect.top) / rect.height)
    },
    [rawX, rawY, reduced],
  )

  const onPointerLeave = useCallback(() => {
    rawX.set(0.5)
    rawY.set(0.5)
  }, [rawX, rawY])

  return { ref, x, y, onPointerMove, onPointerLeave, reduced }
}

/**
 * Единые пресеты анимаций. Один ease на весь сайт = ощущение цельности.
 */
export const SILK = [0.16, 1, 0.3, 1]

/** Мягкое появление с расфокусом. */
export const blurUp = {
  hidden: { opacity: 0, y: 26, filter: 'blur(14px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: SILK },
  },
}

/** Появление текста — короче и мягче, чем у блоков. */
export const textUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: SILK },
  },
}

/** Контейнер с каскадом дочерних элементов. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const springSoft = { type: 'spring', stiffness: 150, damping: 22, mass: 0.7 }
export const springSnappy = { type: 'spring', stiffness: 320, damping: 30, mass: 0.6 }

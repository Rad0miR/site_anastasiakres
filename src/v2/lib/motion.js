/**
 * Единые пресеты анимаций версии v2.
 *
 * Один ease на всё = ощущение цельного полотна, а не набора эффектов.
 * Framer Motion сам гасит движение при системной настройке «уменьшить
 * движение» — за это отвечает MotionConfig в main.jsx.
 */
export const SILK = [0.16, 1, 0.3, 1]

/** Мягкое появление блока с расфокусом. */
export const blurUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(14px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: SILK },
  },
}

/** Появление текста — короче и мягче, чем у блоков. */
export const textUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: SILK },
  },
}

/** Рукописные пометки проявляются без сдвига — они «уже были на фото». */
export const noteIn = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: SILK } },
}

/** Контейнер с каскадом дочерних элементов. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Появление секции по скроллу: одинаково у всех блоков страницы. */
export const revealOnScroll = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.18, margin: '0px 0px -8% 0px' },
}

/**
 * Появление без вертикального сдвига.
 *
 * Нужно детям горизонтальных каруселей: у полосы с overflow-x браузер
 * обязан обрезать и вторую ось, поэтому любой сдвиг по Y на время
 * анимации срезает у карточек низ.
 */
export const softIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease: SILK } },
}

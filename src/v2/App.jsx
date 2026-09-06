import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import Hero from './components/Hero'
import SocialRow from './components/SocialRow'
import ContentTypes from './components/ContentTypes'
import ContentStyles from './components/ContentStyles'
import Showcase from './components/Showcase'
import Finale from './components/Finale'
import Footer from './components/Footer'
import { SILK } from './lib/motion'
import './v2.css'

/**
 * Kres AI — главная страница версии v2.
 *
 * Одно длинное полотно, порядок блоков задан ТЗ:
 *
 *   Hero → Social → Content Types → Content Styles → Финальный визуал → Footer
 *
 * Единственное состояние на всю версию — какой стиль сейчас раскрыт.
 * Оно живёт здесь, а не внутри ContentStyles, потому что нужно двоим:
 * самой карусели и нижней части страницы, которая расступается,
 * освобождая место раскрытой картинке.
 *
 * Версия самостоятельна: своя вёрстка, свои картинки (./assets), своё
 * оформление (./v2.css) и свои токены Tailwind (./tokens.js). Остальные
 * версии лежат по соседству — src/v1, src/v3, … — и ничего отсюда не
 * берут, поэтому этот файл можно переписывать целиком.
 */
export default function App() {
  const [openId, setOpenId] = useState(null)

  // useLayoutEffect, а не useEffect: класс должен встать до первой
  // отрисовки, иначе на мгновение мелькнёт чужой фон.
  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('v2')
    return () => root.classList.remove('v2')
  }, [])

  /* Повторное нажатие на ту же карточку закрывает панель. */
  const toggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="v2-grain relative bg-v2-ink">
      <Hero />
      <SocialRow />
      <ContentTypes />
      <ContentStyles openId={openId} onToggle={toggle} />

      <LayerBelow trigger={openId}>
        <Showcase />
        <Finale />
      </LayerBelow>

      <Footer />
    </div>
  )
}

/**
 * Нижний слой страницы: то, что расступается при раскрытии стиля.
 *
 * Само по себе раскрытие панели уже сдвигает эти секции вниз — так
 * устроен поток. Но чистый сдвиг потока выглядит как перерисовка, а не
 * как движение. Поэтому сверху добавлен короткий доводочный ход: блок
 * уезжает чуть дальше, чем нужно, и мягко возвращается. Именно он даёт
 * ощущение, что открылся следующий слой сайта.
 *
 * При системной настройке «уменьшить движение» Framer Motion гасит этот
 * ход сам — за это отвечает MotionConfig в main.jsx.
 */
function LayerBelow({ trigger, children }) {
  const controls = useAnimationControls()
  const mounted = useRef(false)

  useEffect(() => {
    // Первый заход — просто монтирование страницы, доводить нечего.
    if (!mounted.current) {
      mounted.current = true
      return
    }
    controls.start({
      y: [0, 34, 0],
      transition: { duration: 1.05, ease: SILK, times: [0, 0.42, 1] },
    })
  }, [trigger, controls])

  return (
    <motion.div animate={controls} className="relative">
      {children}
    </motion.div>
  )
}

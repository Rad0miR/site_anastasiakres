import { useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import Backdrop from './components/Backdrop'
import Header from './components/Header'
import Hero from './components/Hero'
import LinkCard from './components/LinkCard'
import Footer from './components/Footer'
import { links } from './data/links'
import { stagger } from './lib/motion'
import './v1.css'

/**
 * Первая версия сайта. Заморожена, открывается по адресу /v1.
 *
 * Всё оформление лежит в ./v1.css и включается классом v1 на <html>,
 * поэтому версия не зависит ни от tailwind.config.js, ни от src/index.css
 * и переживёт любую переработку основного сайта.
 */
export default function V1App() {
  // useLayoutEffect, а не useEffect: класс должен встать до первой отрисовки,
  // иначе на мгновение мелькнёт чужой фон.
  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('v1')
    return () => root.classList.remove('v1')
  }, [])

  return (
    <div id="top" className="v1-grain relative">
      <Backdrop />

      {/*
        Мобильный: обычный поток, страница прокручивается.
        Десктоп (lg+): колонка высотой в экран — сетка карточек забирает
        остаток высоты, поэтому все шесть видны без прокрутки.
      */}
      <motion.div
        variants={stagger(0.1, 0.08)}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-[720px] flex-col px-5 pt-5 sm:px-7 sm:pt-6 lg:h-[100svh] lg:max-w-[1120px] lg:px-10 lg:py-4 2xl:max-w-[1300px] 2xl:py-5"
      >
        <Header />
        <Hero />

        {/* Появление по загрузке, а не по скроллу: карточки — смысл страницы,
            они не должны зависеть от того, сработал ли IntersectionObserver */}
        <motion.section
          id="links"
          aria-label="Социальные сети"
          variants={stagger(0.08, 0.28)}
          className="mt-6 grid scroll-mt-4 grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-3.5 lg:mt-4 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-2 2xl:gap-4"
        >
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </motion.section>

        <Footer />
      </motion.div>
    </div>
  )
}

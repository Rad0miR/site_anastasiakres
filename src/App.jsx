import { motion } from 'framer-motion'
import AmbientBackdrop from './components/AmbientBackdrop'
import Hero from './components/Hero'
import LinkCard from './components/LinkCard'
import Footer from './components/Footer'
import { links } from './data/links'
import { stagger } from './lib/motion'

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      <AmbientBackdrop />

      <main className="relative mx-auto w-full max-w-[1080px] px-5 sm:px-8">
        <Hero />

        {/* Появление по загрузке, а не по скроллу: карточки — смысл страницы,
            они не должны зависеть от того, сработал ли IntersectionObserver */}
        <motion.section
          aria-label="Социальные сети"
          variants={stagger(0.1, 0.45)}
          initial="hidden"
          animate="show"
          className="mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:gap-5 md:grid-cols-2"
        >
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </motion.section>

        <Footer />
      </main>
    </div>
  )
}

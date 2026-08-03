import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { textUp } from '../lib/motion'

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      animate="show"
      variants={textUp}
      transition={{ delay: 1.1 }}
      className="pb-14 pt-16 text-center sm:pb-20 sm:pt-20"
    >
      <div className="mx-auto h-px w-16 hairline" />

      <p className="mt-7 text-[13px] font-light uppercase tracking-wordmark text-graphite/50">
        <span className="ml-[0.34em] inline-block">{profile.wordmark}</span>
      </p>

      <p className="mt-2.5 text-[11px] font-light tracking-wide text-graphite/35">
        © {new Date().getFullYear()} {profile.footnote}
      </p>
    </motion.footer>
  )
}

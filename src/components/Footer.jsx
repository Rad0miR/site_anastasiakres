import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { textUp } from '../lib/motion'

export default function Footer() {
  return (
    <motion.footer
      variants={textUp}
      className="relative mt-8 shrink-0 pb-6 sm:mt-10 lg:mt-3 lg:flex lg:items-end lg:justify-between lg:gap-8 lg:pb-0"
    >
      <p className="font-script text-[19px] leading-[1.7] text-rose-300/85 sm:text-[22px] lg:text-[17px] lg:leading-[1.5] 2xl:text-[19px]">
        {profile.thanks.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <p className="mt-4 text-center text-[11.5px] font-light text-white/45 sm:mt-5 sm:text-[12.5px] lg:mt-0 lg:text-right lg:text-[11.5px]">
        © {new Date().getFullYear()} {profile.copyright}
      </p>
    </motion.footer>
  )
}

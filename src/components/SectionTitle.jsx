import { motion } from 'framer-motion'
import { textUp } from '../lib/motion'

/**
 * Заголовок секции: широкий трекинг и тонкие линии по бокам,
 * гаснущие к краям. Линии — декор, поэтому вне заголовка.
 */
export default function SectionTitle({ children, id }) {
  return (
    <motion.div variants={textUp} className="flex items-center justify-center gap-4 sm:gap-6">
      <span
        aria-hidden="true"
        className="k-rule h-px max-w-[190px] flex-1"
        style={{ '--k-rule-dir': 'right' }}
      />
      <h2
        id={id}
        className="whitespace-nowrap text-center text-[11px] font-medium uppercase tracking-widest text-blush-100/85 sm:text-[13px]"
      >
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="k-rule h-px max-w-[190px] flex-1"
        style={{ '--k-rule-dir': 'left' }}
      />
    </motion.div>
  )
}

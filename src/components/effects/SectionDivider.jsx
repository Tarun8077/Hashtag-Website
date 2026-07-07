import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Ornamental divider: hairlines draw outward from a rotating gold
 * diamond as the divider scrolls into view.
 */
function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto flex max-w-4xl items-center justify-center gap-5 px-10"
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="h-px flex-1 origin-right bg-gradient-to-l from-gold-400/60 to-transparent"
      />
      <motion.span
        initial={{ rotate: 225, scale: 0, opacity: 0 }}
        whileInView={{ rotate: 45, scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-2 w-2 shrink-0 border border-gold-400/70 bg-gold-400/15 shadow-[0_0_12px_rgba(223,173,75,0.4)]"
      />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="h-px flex-1 origin-left bg-gradient-to-r from-gold-400/60 to-transparent"
      />
    </div>
  )
}

export default SectionDivider

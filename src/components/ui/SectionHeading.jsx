import { motion } from 'motion/react'
import { reveal, staggerContainer } from './reveal.js'

/**
 * Eyebrow + oversized serif heading, shared across all sections.
 * Wrap in a parent with `whileInView` variants, or use standalone
 * (it carries its own viewport trigger by default).
 */
function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  className = '',
}) {
  const aligned = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={`flex flex-col gap-5 ${aligned} ${className}`}
    >
      <motion.p
        variants={reveal}
        className="flex items-center gap-2 text-[0.65rem] font-light uppercase tracking-[0.4em] text-gold-300 md:text-xs"
      >
        {align !== 'left' && (
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400" />
        )}
        {eyebrow}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
      </motion.p>
      <motion.h2
        variants={reveal}
        className="max-w-3xl font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance text-white sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
    </motion.div>
  )
}

export default SectionHeading

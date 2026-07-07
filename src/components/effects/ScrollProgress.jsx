import { motion, useScroll, useSpring } from 'motion/react'

/** Hairline gold progress bar pinned to the very top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 shadow-[0_0_12px_rgba(223,173,75,0.6)]"
    />
  )
}

export default ScrollProgress

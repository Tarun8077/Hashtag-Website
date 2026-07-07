import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Hash } from 'lucide-react'

const HOLD_MS = 1600

const EASE = [0.76, 0, 0.24, 1]

/**
 * Cinematic entry: mark scales in, wordmark rises, a gold hairline
 * charges left→right, then the ink curtain lifts to reveal the hero.
 * Skipped entirely for reduced-motion users.
 */
function Preloader() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(!reduceMotion)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => setVisible(false), HOLD_MS)
    return () => clearTimeout(timer)
  }, [reduceMotion])

  // Hold the page still while the curtain is up
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          aria-hidden
        >
          {/* Gold edge that trails the curtain as it lifts */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

          <motion.span
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow-[0_0_48px_-8px_rgba(223,173,75,0.8)]"
          >
            <Hash className="h-7 w-7 text-ink-950" strokeWidth={2.5} />
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="mt-6 font-display text-3xl font-semibold tracking-wide text-white"
          >
            Hashtag <span className="text-gold-gradient italic">104</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-2 text-[0.6rem] font-light uppercase tracking-[0.4em] text-zinc-500"
          >
            Luxury Dining Lounge
          </motion.p>

          {/* Charging hairline */}
          <div className="mt-10 h-px w-40 overflow-hidden bg-white/10">
            <motion.span
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: HOLD_MS / 1000 - 0.2, ease: 'easeInOut' }}
              className="block h-full w-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader

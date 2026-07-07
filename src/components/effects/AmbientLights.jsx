import { motion } from 'motion/react'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Global atmosphere: slow amber orbs drifting behind every section,
 * plus a whisper of film grain above everything for a cinematic finish.
 */
function AmbientLights() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <motion.div
          animate={{ y: [0, -70, 0], x: [0, 50, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-48 left-[6%] h-[36rem] w-[36rem] rounded-full bg-gold-500/[0.05] blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 80, 0], x: [0, -40, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-56 h-[42rem] w-[42rem] rounded-full bg-rose-500/[0.04] blur-[130px]"
        />
        <motion.div
          animate={{ y: [0, -60, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-gold-700/[0.06] blur-[110px]"
        />
      </div>

      {/* Film grain */}
      <div
        aria-hidden
        style={{ backgroundImage: GRAIN }}
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.035] mix-blend-overlay"
      />
    </>
  )
}

export default AmbientLights

import { motion, useMotionValue, useSpring } from 'motion/react'

const variants = {
  gold: 'bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-[0_0_24px_-6px_rgba(223,173,75,0.6),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_-8px_rgba(223,173,75,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]',
  glass:
    'border border-white/15 bg-white/5 text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-gold-400/40 hover:bg-white/10',
}

const sizes = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-sm md:text-base',
  lg: 'px-8 py-3.5 text-base',
}

const MAGNET_STRENGTH = 0.22
const MAGNET_MAX_PX = 7

const clamp = (value, max) => Math.max(-max, Math.min(max, value))

/**
 * Premium CTA with a magnetic pull toward the cursor, a shine sweep
 * on hover (gold variant), and a spring press. Renders an <a> when
 * `href` is given.
 */
function CtaButton({
  variant = 'gold',
  size = 'md',
  href,
  icon: Icon,
  children,
  className = '',
  ...props
}) {
  const Component = href ? motion.a : motion.button

  const pullX = useMotionValue(0)
  const pullY = useMotionValue(0)
  const springX = useSpring(pullX, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(pullY, { stiffness: 220, damping: 16, mass: 0.4 })

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    pullX.set(
      clamp(
        (event.clientX - rect.left - rect.width / 2) * MAGNET_STRENGTH,
        MAGNET_MAX_PX,
      ),
    )
    pullY.set(
      clamp(
        (event.clientY - rect.top - rect.height / 2) * MAGNET_STRENGTH,
        MAGNET_MAX_PX,
      ),
    )
  }

  function handleMouseLeave() {
    pullX.set(0)
    pullY.set(0)
  }

  return (
    <Component
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-[color,background-color,border-color,box-shadow] duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {variant === 'gold' && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {Icon && (
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </span>
    </Component>
  )
}

export default CtaButton

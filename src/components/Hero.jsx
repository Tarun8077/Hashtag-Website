import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, CalendarCheck, MapPin, Star } from 'lucide-react'
import CtaButton from './ui/CtaButton.jsx'

const HERO_BASE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&auto=format&fit=crop'

// Deterministic pseudo-random so particles don't jump between renders
function seeded(i, salt) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function Particles({ count = 24 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seeded(i, 1) * 100,
        top: 30 + seeded(i, 2) * 70,
        size: 1.5 + seeded(i, 3) * 2.5,
        duration: 8 + seeded(i, 4) * 10,
        delay: seeded(i, 5) * 8,
        drift: (seeded(i, 6) - 0.5) * 60,
      })),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px 1px rgba(233,199,120,0.5)',
          }}
          animate={{
            y: [0, -140],
            x: [0, p.drift],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function RatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pr-5 pl-3 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.8 + i * 0.08,
              type: 'spring',
              stiffness: 300,
            }}
          >
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
          </motion.span>
        ))}
      </span>
      <span className="text-xs font-light tracking-wide text-zinc-300">
        <span className="font-medium text-white">4.9</span> · Noida&rsquo;s
        Finest Lounge
      </span>
    </motion.div>
  )
}

function ScrollIndicator() {
  return (
    <motion.a
      href="#experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
      className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      aria-label="Scroll down"
    >
      <span className="text-[0.6rem] font-light uppercase tracking-[0.35em] text-zinc-400 transition-colors duration-300 group-hover:text-gold-300">
        Scroll
      </span>
      <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-white/20 p-1.5">
        <motion.span
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-1.5 w-1 rounded-full bg-gold-300"
        />
      </span>
    </motion.a>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 32, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Cinematic parallax: background sinks and scales as content lifts away
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Cinematic background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <img
          src={`${HERO_BASE}&w=2400`}
          srcSet={`${HERO_BASE}&w=1080 1080w, ${HERO_BASE}&w=1920 1920w, ${HERO_BASE}&w=2400 2400w`}
          sizes="100vw"
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Static depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,6,0.65)_100%)]" />

      {/* Animated gradient overlay — slow amber glow drifting across the scene */}
      <motion.div
        aria-hidden
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            'linear-gradient(115deg, rgba(223,173,75,0.5), rgba(120,60,180,0.35), rgba(223,173,75,0.5))',
          backgroundSize: '300% 300%',
        }}
      />

      <Particles />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-20 text-center md:pt-32"
      >
        <RatingBadge />

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center gap-2 text-[0.65rem] font-light uppercase tracking-[0.4em] text-gold-300 md:text-xs"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400" />
          Luxury Dining Lounge &amp; Cafe
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-6xl leading-[0.95] font-medium tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Hashtag
          <span className="text-gold-gradient animate-shimmer bg-[length:200%_auto] italic">
            {' '}
            104
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl font-display text-xl font-normal text-zinc-300 italic md:text-2xl"
        >
          Where Every Night Becomes a Celebration.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <CtaButton
            href="#reserve"
            size="lg"
            icon={CalendarCheck}
            className="w-full sm:w-auto"
          >
            Reserve Table
          </CtaButton>
          <CtaButton
            href="#menu"
            variant="glass"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto"
          >
            Explore Menu
          </CtaButton>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex items-center gap-2 text-xs font-light tracking-[0.25em] text-zinc-400 uppercase"
        >
          <MapPin className="h-3.5 w-3.5 text-gold-400" />
          Sector 104 · Noida
        </motion.p>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}

export default Hero

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import CtaButton from './ui/CtaButton.jsx'
import { reveal, staggerContainer } from './ui/reveal.js'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800&auto=format&fit=crop'

const STATS = [
  { value: '50+', label: 'Signature Dishes' },
  { value: '4.9', label: 'Guest Rating' },
  { value: '7', label: 'Nights of Music' },
]

function About() {
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  // Gentle parallax inside the gold frame
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      {/* Floating decorations */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 -left-40 h-80 w-80 rounded-full bg-gold-700/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Animated image */}
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Offset gold frame */}
          <div
            aria-hidden
            className="absolute -inset-3 rounded-3xl border border-gold-400/25 md:-inset-5"
          />
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8)]"
          >
            <motion.img
              src={ABOUT_IMAGE}
              srcSet={`${ABOUT_IMAGE.replace('w=1800', 'w=900')} 900w, ${ABOUT_IMAGE} 1800w`}
              sizes="(min-width: 1024px) 45vw, 90vw"
              alt="Inside the Hashtag 104 lounge"
              loading="lazy"
              decoding="async"
              style={{ y: imgY }}
              className="h-[116%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          </div>

          {/* Floating glass caption card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-3 -bottom-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/70 px-5 py-4 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:-right-8"
          >
            <Sparkles className="h-5 w-5 text-gold-400" />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold text-white">
                Est. in Noida
              </p>
              <p className="text-[0.65rem] font-light uppercase tracking-[0.25em] text-zinc-400">
                Sector 104
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start"
        >
          <motion.p
            variants={reveal}
            className="flex items-center gap-2 text-[0.65rem] font-light uppercase tracking-[0.4em] text-gold-300 md:text-xs"
          >
            Our Story
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
          </motion.p>

          <motion.h2
            variants={reveal}
            className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            An Evening,{' '}
            <span className="text-gold-gradient italic">Elevated</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mt-7 max-w-lg text-base leading-relaxed font-light text-zinc-400 md:text-lg"
          >
            Tucked into the heart of Sector 104, Hashtag 104 is where Noida
            comes alive after dark. A dining lounge crafted for slow evenings
            and loud celebrations alike — plush interiors, amber light, and a
            kitchen that treats every plate as an occasion.
          </motion.p>

          <motion.p
            variants={reveal}
            className="mt-5 max-w-lg text-base leading-relaxed font-light text-zinc-400 md:text-lg"
          >
            From intimate dinners to birthday nights that spill onto the dance
            floor, every detail is tuned to one promise — where every night
            becomes a celebration.
          </motion.p>

          {/* Stats */}
          <motion.dl
            variants={reveal}
            className="mt-10 flex w-full max-w-md items-center justify-between gap-6 border-y border-white/10 py-6"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold text-gold-300 md:text-4xl">
                  {stat.value}
                </dd>
                <dd className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={reveal} className="mt-10">
            <CtaButton href="#experience" variant="glass" icon={ArrowRight}>
              Discover the Experience
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

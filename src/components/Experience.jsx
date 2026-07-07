import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { Disc3, Music, UtensilsCrossed, Martini } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import { reveal, staggerContainer } from './ui/reveal.js'

const EXPERIENCES = [
  {
    icon: Disc3,
    title: 'Live DJ',
    description:
      'Resident DJs spin deep house and Bollywood nights that keep the floor moving till late.',
  },
  {
    icon: Music,
    title: 'Live Music',
    description:
      'Unplugged evenings and soulful live acts — the soundtrack to slow dinners and long conversations.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Luxury Dining',
    description:
      'Plated with intent. A kitchen obsessed with detail, from the first amuse-bouche to the last bite.',
  },
  {
    icon: Martini,
    title: 'Cocktails',
    description:
      'A bar program of signature pours and classics done right, stirred under amber light.',
  },
]

function ExperienceCard({ icon: Icon, title, description }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(223,173,75,0.14), transparent 70%)`

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  return (
    <motion.article
      variants={reveal}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-500 hover:border-gold-400/30"
    >
      {/* Cursor-tracked glow */}
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Soft corner bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative z-10">
        <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-gold-300 shadow-[0_0_20px_-6px_rgba(223,173,75,0.4)] transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </span>

        <h3 className="mt-6 font-display text-2xl font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-gold-200">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed font-light text-zinc-400">
          {description}
        </p>

        <span className="mt-6 block h-px w-10 bg-gradient-to-r from-gold-400 to-transparent transition-all duration-500 group-hover:w-20" />
      </div>
    </motion.article>
  )
}

function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-28 md:py-40">
      {/* Floating decoration */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold-600/[0.07] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="The Experience"
          title={
            <>
              Crafted for the{' '}
              <span className="text-gold-gradient italic">Night</span>
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-20"
        >
          {EXPERIENCES.map((experience) => (
            <ExperienceCard key={experience.title} {...experience} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience

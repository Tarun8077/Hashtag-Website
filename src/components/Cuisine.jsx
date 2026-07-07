import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import { reveal, staggerContainer } from './ui/reveal.js'

const CUISINES = [
  {
    title: 'North Indian',
    subtitle: 'Tandoor · Dal Makhani · Kebabs',
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-amber-500/30 via-transparent',
  },
  {
    title: 'Mughlai',
    subtitle: 'Biryani · Korma · Nihari',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-rose-500/25 via-transparent',
  },
  {
    title: 'Chinese',
    subtitle: 'Dim Sum · Hakka · Wok-Fired',
    image:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-red-500/25 via-transparent',
  },
  {
    title: 'Continental',
    subtitle: 'Grills · Pastas · Platters',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-emerald-500/20 via-transparent',
  },
]

function CuisineCard({ title, subtitle, image, gradient, index }) {
  return (
    <motion.a
      variants={reveal}
      href="#menu"
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)] sm:aspect-[4/5]"
    >
      {/* Image zoom */}
      <motion.img
        src={image}
        srcSet={`${image.replace('w=1400', 'w=700')} 700w, ${image} 1400w`}
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
        alt={`${title} cuisine at Hashtag 104`}
        loading="lazy"
        decoding="async"
        variants={{ rest: { scale: 1.02 }, hover: { scale: 1.12 } }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Luxury gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${gradient} to-transparent opacity-50 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-90`}
      />
      {/* Gold sheen sweeping through on hover */}
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-200/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />

      {/* Index */}
      <span className="absolute top-5 left-5 font-display text-sm font-medium tracking-[0.2em] text-white/50 tabular-nums">
        0{index + 1}
      </span>

      {/* Arrow chip */}
      <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
        <ArrowUpRight className="h-4.5 w-4.5" />
      </span>

      {/* Content lifts on hover */}
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -8 } }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 p-6"
      >
        <span className="block h-px w-8 bg-gradient-to-r from-gold-400 to-transparent transition-all duration-500 group-hover:w-16" />
        <h3 className="mt-4 font-display text-3xl font-semibold text-white">
          {title}
        </h3>
        <p className="mt-1.5 text-xs font-light tracking-[0.18em] text-zinc-300 uppercase opacity-0 -translate-y-1 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {subtitle}
        </p>
      </motion.div>
    </motion.a>
  )
}

function Cuisine() {
  return (
    <section id="menu" className="relative overflow-hidden py-28 md:py-40">
      {/* Floating decorations */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -28, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 32, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-rose-500/[0.06] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="The Cuisine"
          title={
            <>
              Four Kitchens,{' '}
              <span className="text-gold-gradient italic">One Table</span>
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-20"
        >
          {CUISINES.map((cuisine, index) => (
            <CuisineCard key={cuisine.title} {...cuisine} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Cuisine

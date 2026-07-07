import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'

const TESTIMONIALS = [
  {
    quote:
      'The biryani arrived under a cloud of saffron steam and the DJ read the room perfectly all night. Easily the most polished lounge in Noida — we booked again before we left.',
    name: 'Aarav Mehta',
    title: 'Food Columnist',
    initials: 'AM',
    rating: 5,
  },
  {
    quote:
      'Celebrated our anniversary here. Candlelit corner table, a bottle they decanted tableside, and a dessert plate with our names in gold. Every detail felt intentional.',
    name: 'Priya Sharma',
    title: 'Anniversary Dinner',
    initials: 'PS',
    rating: 5,
  },
  {
    quote:
      'I host client dinners across Delhi NCR and Hashtag 104 is my default. The bar program is serious — ask for the smoked old fashioned — and the service never hovers.',
    name: 'Rohan Kapoor',
    title: 'Regular · Business Dining',
    initials: 'RK',
    rating: 5,
  },
  {
    quote:
      'Came for the live unplugged night, stayed for the dim sum. The room glows amber, the acoustics are perfect, and the staff remembered our order from a month ago.',
    name: 'Ananya Iyer',
    title: 'Live Music Regular',
    initials: 'AI',
    rating: 5,
  },
]

const SLIDE_INTERVAL_MS = 5000

function Stars({ count }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className="h-4 w-4 text-gold-400"
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  )
}

/** Small glass cards floating beside the slider (decorative stats). */
function FloatingCard({ className, float, children }) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: float }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none absolute z-10 hidden rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:block ${className}`}
    >
      {children}
    </motion.div>
  )
}

function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance, paused while hovered
  useEffect(() => {
    if (paused) return
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % TESTIMONIALS.length),
      SLIDE_INTERVAL_MS,
    )
    return () => clearInterval(timer)
  }, [paused])

  const goTo = (next) =>
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length)

  const active = TESTIMONIALS[index]

  return (
    <section id="testimonials" className="relative overflow-hidden py-28 md:py-40">
      {/* Floating decoration */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/[0.08] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Word of Mouth"
          title={
            <>
              Loved by the{' '}
              <span className="text-gold-gradient italic">Late Crowd</span>
            </>
          }
        />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          className="relative mx-auto mt-16 max-w-3xl md:mt-24"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Floating side cards */}
          <FloatingCard className="top-6 -left-44 -rotate-6" float={[0, -12, 0]}>
            <p className="font-display text-3xl font-semibold text-gold-gradient">
              4.9
            </p>
            <Stars count={5} />
            <p className="mt-1.5 text-[0.65rem] font-light uppercase tracking-[0.2em] text-zinc-400">
              Google Rating
            </p>
          </FloatingCard>
          <FloatingCard className="-right-44 bottom-8 rotate-6" float={[0, 12, 0]}>
            <p className="font-display text-3xl font-semibold text-gold-gradient">
              1,200+
            </p>
            <p className="mt-1.5 text-[0.65rem] font-light uppercase tracking-[0.2em] text-zinc-400">
              Five-Star Reviews
            </p>
          </FloatingCard>

          {/* Main glass review card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-12 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl md:px-14 md:py-16"
          >
            {/* Corner bloom */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -left-20 h-52 w-52 rounded-full bg-gold-400/10 blur-3xl"
            />
            {/* Oversized quote mark */}
            <Quote
              aria-hidden
              className="absolute top-8 right-8 h-16 w-16 rotate-180 text-gold-400/15 md:h-24 md:w-24"
              fill="currentColor"
              strokeWidth={0}
            />

            <div className="relative min-h-[16rem] sm:min-h-[13rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, x: 48, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Stars count={active.rating} />
                  <p className="mt-6 font-display text-2xl leading-snug font-medium text-zinc-100 italic md:text-[1.7rem]">
                    “{active.quote}”
                  </p>

                  <footer className="mt-8 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 font-display text-base font-semibold text-ink-950 shadow-[0_0_20px_-6px_rgba(223,173,75,0.7)]">
                      {active.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium tracking-wide text-white">
                        {active.name}
                      </p>
                      <p className="mt-0.5 text-xs font-light uppercase tracking-[0.18em] text-zinc-500">
                        {active.title}
                      </p>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(index - 1)}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md transition-colors duration-300 hover:border-gold-400/40 hover:text-gold-300"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </motion.button>

            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((testimonial, i) => (
                <button
                  key={testimonial.name}
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? 'w-8 bg-gradient-to-r from-gold-300 to-gold-500'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(index + 1)}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md transition-colors duration-300 hover:border-gold-400/40 hover:text-gold-300"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

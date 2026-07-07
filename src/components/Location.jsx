import { motion } from 'motion/react'
import {
  CalendarCheck,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import CtaButton from './ui/CtaButton.jsx'
import { reveal, staggerContainer } from './ui/reveal.js'

const HOURS = [
  { days: 'Monday — Thursday', time: '12:00 PM — 12:30 AM' },
  { days: 'Friday — Saturday', time: '12:00 PM — 1:30 AM', highlight: true },
  { days: 'Sunday', time: '11:00 AM — 12:30 AM' },
]

function InfoRow({ icon: Icon, label, children }) {
  return (
    <motion.div variants={reveal} className="flex items-start gap-4">
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/10 text-gold-300 shadow-[0_0_16px_-6px_rgba(223,173,75,0.4)]">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-zinc-500">
          {label}
        </p>
        <div className="mt-1.5 text-sm leading-relaxed font-light text-zinc-300">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/** Stylized map placeholder — glass panel with a grid, glow, and a live pin. */
function MapPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8)] lg:min-h-full"
    >
      {/* Map grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      {/* Fake roads */}
      <div aria-hidden className="absolute inset-0">
        <span className="absolute top-[30%] -left-4 h-px w-[120%] rotate-6 bg-white/10" />
        <span className="absolute top-[62%] -left-4 h-px w-[120%] -rotate-3 bg-white/[0.07]" />
        <span className="absolute top-0 left-[38%] h-[120%] w-px rotate-12 bg-white/[0.08]" />
        <span className="absolute top-0 left-[72%] h-[120%] w-px -rotate-6 bg-white/[0.06]" />
      </div>
      {/* Amber glow around the venue */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Pin with ping ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold-400/20 [animation-duration:2.5s]"
        />
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow-[0_0_32px_-4px_rgba(223,173,75,0.8)]"
        >
          <MapPin className="h-6 w-6 text-ink-950" strokeWidth={2.2} />
        </motion.span>
      </div>

      {/* Venue tag */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent p-6">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            Hashtag <span className="text-gold-gradient">104</span>
          </p>
          <p className="mt-1 text-xs font-light uppercase tracking-[0.24em] text-zinc-400">
            Sector 104 · Noida
          </p>
        </div>
        <a
          href="https://maps.google.com/?q=Hashtag+104+Sector+104+Noida"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-light tracking-wide text-white backdrop-blur-md transition-colors duration-300 hover:border-gold-400/40 hover:text-gold-200"
        >
          Open in Maps
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  )
}

function Location() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-40"
    >
      {/* Floating decorations */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -34, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Find Us"
          title={
            <>
              Reserve Your{' '}
              <span className="text-gold-gradient italic">Evening</span>
            </>
          }
        />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-2">
          <MapPlaceholder />

          {/* Contact card */}
          <motion.div
            id="reserve"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-gold-400/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-8">
              <InfoRow icon={MapPin} label="Address">
                <p>
                  Hashtag 104, First Floor, The High Street
                  <br />
                  Sector 104, Noida, Uttar Pradesh 201304
                </p>
              </InfoRow>

              <InfoRow icon={Clock} label="Opening Hours">
                <ul className="flex flex-col gap-2">
                  {HOURS.map(({ days, time, highlight }) => (
                    <li
                      key={days}
                      className="flex items-baseline justify-between gap-6"
                    >
                      <span className={highlight ? 'text-gold-200' : ''}>
                        {days}
                      </span>
                      <span
                        className={`text-right tabular-nums whitespace-nowrap ${
                          highlight ? 'text-gold-300' : 'text-zinc-400'
                        }`}
                      >
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <InfoRow icon={Phone} label="Reservations">
                <p>
                  <a
                    href="tel:+919876543210"
                    className="transition-colors duration-300 hover:text-gold-300"
                  >
                    +91 98765 43210
                  </a>
                </p>
              </InfoRow>

              <InfoRow icon={Mail} label="Events & Private Dining">
                <p>
                  <a
                    href="mailto:reserve@hashtag104.in"
                    className="transition-colors duration-300 hover:text-gold-300"
                  >
                    reserve@hashtag104.in
                  </a>
                </p>
              </InfoRow>

              <motion.div variants={reveal} className="mt-2 flex flex-wrap items-center gap-4">
                <CtaButton href="tel:+919876543210" size="lg" icon={CalendarCheck}>
                  Reserve Table
                </CtaButton>
                <p className="text-xs font-light tracking-wide text-zinc-500">
                  Walk-ins welcome · Reservations recommended on weekends
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Location

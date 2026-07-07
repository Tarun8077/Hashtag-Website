import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUp, Check, Hash } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { reveal, staggerContainer } from './ui/reveal.js'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <div className="min-h-[3.5rem]">
      <AnimatePresence mode="wait">
        {subscribed ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/30 bg-gold-400/10 px-5 py-3 text-sm font-light text-gold-200"
          >
            <Check className="h-4 w-4" />
            You’re on the list — see you at the table.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="group flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 pl-5 backdrop-blur-xl transition-colors duration-300 focus-within:border-gold-400/40"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              aria-label="Email address for newsletter"
              className="w-full bg-transparent text-sm font-light text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Subscribe to newsletter"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 text-ink-950 shadow-[0_0_20px_-6px_rgba(223,173,75,0.7)]"
            >
              <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.2} />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-ink-950 to-ink-900">
      {/* Giant watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-10 flex justify-center overflow-hidden"
      >
        <span className="font-display text-[22vw] leading-none font-bold whitespace-nowrap text-white/[0.02] select-none">
          #104
        </span>
      </div>
      {/* Amber floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[60rem] max-w-full -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-600/[0.07] blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto max-w-6xl px-6 pt-20 pb-10 md:px-8 md:pt-28"
      >
        {/* Newsletter band */}
        <motion.div
          variants={reveal}
          className="flex flex-col gap-8 border-b border-white/5 pb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-[0.65rem] font-light uppercase tracking-[0.4em] text-gold-300">
              The Guest List
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-white sm:text-4xl md:text-5xl">
              First to know about{' '}
              <span className="text-gold-gradient italic">every night</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed font-light text-zinc-400">
              New menus, DJ line-ups, and private tastings — a quiet note, once
              a month. No noise.
            </p>
          </div>
          <NewsletterForm />
        </motion.div>

        {/* Link columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <motion.div variants={reveal}>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow-[0_0_16px_-4px_rgba(223,173,75,0.7)]">
                <Hash className="h-4.5 w-4.5 text-ink-950" strokeWidth={2.5} />
              </span>
              <span className="font-display text-2xl font-semibold tracking-wide text-white">
                Hashtag <span className="text-gold-gradient">104</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed font-light text-zinc-400">
              A luxury dining lounge in Sector 104, Noida — four kitchens, a
              serious bar, and music that carries the night.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md transition-colors duration-300 hover:border-gold-400/40 hover:bg-gold-400/10 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.nav variants={reveal} aria-label="Footer">
            <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-zinc-500">
              Quick Links
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm font-light text-zinc-400 transition-colors duration-300 hover:text-gold-200"
                  >
                    <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Visit */}
          <motion.div variants={reveal}>
            <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-zinc-500">
              Visit
            </p>
            <address className="mt-5 text-sm leading-relaxed font-light text-zinc-400 not-italic">
              The High Street, Sector 104
              <br />
              Noida, Uttar Pradesh 201304
            </address>
            <p className="mt-4 text-sm font-light text-zinc-400">
              <a
                href="tel:+919876543210"
                className="transition-colors duration-300 hover:text-gold-200"
              >
                +91 98765 43210
              </a>
              <br />
              <a
                href="mailto:reserve@hashtag104.in"
                className="transition-colors duration-300 hover:text-gold-200"
              >
                reserve@hashtag104.in
              </a>
            </p>
            <p className="mt-4 text-xs font-light tracking-wide text-zinc-500">
              Open daily · till 12:30 AM
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={reveal}
          className="flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-8 sm:flex-row"
        >
          <p className="text-xs font-light tracking-wide text-zinc-500">
            © 2026 Hashtag 104. All rights reserved.
          </p>
          <p className="text-xs font-light tracking-[0.2em] text-zinc-600 uppercase">
            Luxury Dining Lounge · Noida
          </p>
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md transition-colors duration-300 hover:border-gold-400/40 hover:text-gold-300"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer

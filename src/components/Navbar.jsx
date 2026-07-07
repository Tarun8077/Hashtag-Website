import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { Hash, Menu, X, CalendarCheck } from 'lucide-react'
import CtaButton from './ui/CtaButton.jsx'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow-[0_0_16px_-4px_rgba(223,173,75,0.7)]">
        <Hash className="h-4.5 w-4.5 text-ink-950" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-wide text-white">
          Hashtag <span className="text-gold-gradient">104</span>
        </span>
        <span className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-zinc-400 transition-colors duration-300 group-hover:text-gold-300">
          Luxury Dining Lounge
        </span>
      </span>
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 32)
  })

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6"
      >
        <motion.nav
          animate={{
            paddingTop: scrolled ? '0.625rem' : '0.875rem',
            paddingBottom: scrolled ? '0.625rem' : '0.875rem',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 md:px-6 ${
            scrolled
              ? 'border-white/10 bg-ink-950/70 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'border-white/5 bg-white/[0.02]'
          }`}
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative px-4 py-2 text-sm font-light tracking-wide text-zinc-300 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <CtaButton
              href="#reserve"
              size="sm"
              icon={CalendarCheck}
              className="hidden sm:inline-flex"
            >
              Reserve Table
            </CtaButton>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950/90 px-6 pt-32 pb-12 backdrop-blur-2xl lg:hidden"
          >
            <nav>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.08 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/5 py-4"
                    >
                      <span className="text-xs font-light tabular-nums text-gold-400">
                        0{i + 1}
                      </span>
                      <span className="font-display text-4xl font-medium text-zinc-200 transition-colors duration-300 group-hover:text-gold-300">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <CtaButton
                href="#reserve"
                size="lg"
                icon={CalendarCheck}
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                Reserve Table
              </CtaButton>
              <p className="text-center text-xs font-light uppercase tracking-[0.3em] text-zinc-500">
                Sector 104 · Noida
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

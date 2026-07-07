import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Camera } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import { reveal, staggerContainer } from './ui/reveal.js'

/**
 * Images distributed across three parallax columns.
 * Aspect ratios vary per item to produce the masonry rhythm.
 */
const COLUMNS = [
  [
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
      alt: 'Amber-lit dining room at Hashtag 104',
      label: 'The Dining Room',
      aspect: 'aspect-[3/4]',
    },
    {
      src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
      alt: 'Signature cocktail with citrus garnish',
      label: 'Signature Pours',
      aspect: 'aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
      alt: 'Plated fine-dining course',
      label: 'Plated With Intent',
      aspect: 'aspect-[3/4]',
    },
  ],
  [
    {
      src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop',
      alt: 'Bartender finishing a cocktail at the bar',
      label: 'Behind the Bar',
      aspect: 'aspect-[4/5]',
    },
    {
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
      alt: 'Guests celebrating on a lounge evening',
      label: 'Lounge Nights',
      aspect: 'aspect-[3/4]',
    },
    {
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
      alt: 'Chef’s table spread of shared plates',
      label: 'The Chef’s Table',
      aspect: 'aspect-square',
    },
  ],
  [
    {
      src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop',
      alt: 'Moody interior with pendant lighting',
      label: 'After Dark',
      aspect: 'aspect-[3/4]',
    },
    {
      src: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1200&auto=format&fit=crop',
      alt: 'Champagne coupes raised in a toast',
      label: 'The Toast',
      aspect: 'aspect-square',
    },
    {
      src: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1200&auto=format&fit=crop',
      alt: 'Dessert course under warm light',
      label: 'Sweet Endings',
      aspect: 'aspect-[4/5]',
    },
  ],
]

function GalleryCard({ src, alt, label, aspect }) {
  return (
    <motion.figure
      variants={reveal}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)] ${aspect}`}
    >
      {/* Hover zoom */}
      <img
        src={src}
        srcSet={`${src.replace('w=1200', 'w=600')} 600w, ${src} 1200w`}
        sizes="(min-width: 768px) 30vw, 45vw"
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-112"
      />

      {/* Luxury dark veil, deepens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Gold sheen sweep */}
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-200/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />

      {/* Camera chip */}
      <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-gold-200 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
        <Camera className="h-4 w-4" strokeWidth={1.6} />
      </span>

      {/* Caption rises on hover */}
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="block h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" />
        <span className="mt-3 block font-display text-xl font-semibold tracking-wide text-white">
          {label}
        </span>
      </figcaption>
    </motion.figure>
  )
}

function Gallery() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Each column drifts at its own pace — parallax masonry
  const yLeft = useTransform(scrollYProgress, [0, 1], [40, -60])
  const yMiddle = useTransform(scrollYProgress, [0, 1], [90, -110])
  const yRight = useTransform(scrollYProgress, [0, 1], [20, -40])
  const columnOffsets = [yLeft, yMiddle, yRight]

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40"
    >
      {/* Floating decorations */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-24 -left-32 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 36, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-rose-500/[0.05] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="The Gallery"
          title={
            <>
              Moments in{' '}
              <span className="text-gold-gradient italic">Amber Light</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-2 items-start gap-4 md:mt-24 md:grid-cols-3 md:gap-6">
          {COLUMNS.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              style={{ y: columnOffsets[columnIndex] }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={`flex flex-col gap-4 md:gap-6 ${
                columnIndex === 2 ? 'hidden md:flex' : ''
              } ${columnIndex === 1 ? 'md:mt-16' : ''}`}
            >
              {column.map((item) => (
                <GalleryCard key={item.src} {...item} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

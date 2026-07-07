import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Experience from '../components/Experience.jsx'
import Cuisine from '../components/Cuisine.jsx'
import SectionDivider from '../components/effects/SectionDivider.jsx'

// Below-the-fold sections load in their own chunks
const Gallery = lazy(() => import('../components/Gallery.jsx'))
const Testimonials = lazy(() => import('../components/Testimonials.jsx'))
const Location = lazy(() => import('../components/Location.jsx'))
const Footer = lazy(() => import('../components/Footer.jsx'))

function Home() {
  return (
    <div id="main" className="relative z-10 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Cuisine />
        <Suspense fallback={null}>
          <SectionDivider />
          <Gallery />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <Location />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home

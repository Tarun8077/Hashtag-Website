import { MotionConfig } from 'motion/react'
import Home from './pages/Home.jsx'
import { useLenis } from './hooks/useLenis.js'
import Preloader from './components/effects/Preloader.jsx'
import ScrollProgress from './components/effects/ScrollProgress.jsx'
import AmbientLights from './components/effects/AmbientLights.jsx'

function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress />
      <AmbientLights />
      <Home />
    </MotionConfig>
  )
}

export default App

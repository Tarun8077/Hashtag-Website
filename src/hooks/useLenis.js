import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initializes Lenis smooth scrolling for the whole page.
 * Call once near the root of the app (e.g. in App.jsx).
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })

    return () => lenis.destroy()
  }, [])
}

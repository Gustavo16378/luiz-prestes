import { useEffect, useState } from 'react'

/**
 * Esconde a navbar ao rolar para baixo, mostra ao rolar para cima.
 * Também informa se a página já saiu do topo (para o border/background).
 */
export function useScrollDirection(threshold = 8) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 4)

      // Nunca esconde perto do topo.
      if (y < 80) {
        setHidden(false)
        last = y
        ticking = false
        return
      }

      if (Math.abs(y - last) > threshold) {
        setHidden(y > last)
        last = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { hidden, scrolled }
}

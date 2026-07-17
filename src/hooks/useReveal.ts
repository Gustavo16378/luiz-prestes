import { useEffect } from 'react'

/**
 * Reveal on scroll para todos os elementos [data-reveal].
 * Delay escalonado min(i*90, 270)ms por lote de interseção.
 * Respeita prefers-reduced-motion e não esconde o que já está visível no load.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        let i = 0
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.transitionDelay = `${Math.min(i * 90, 270)}ms`
          el.classList.add('reveal-in')
          io.unobserve(el)
          i++
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' },
    )

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )
    els.forEach((el) => {
      // Só prepara (esconde) o que ainda está abaixo da dobra no load.
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('reveal-ready')
        io.observe(el)
      }
    })

    return () => io.disconnect()
  }, [])
}

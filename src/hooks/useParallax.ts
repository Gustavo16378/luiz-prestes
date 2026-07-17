import { useEffect } from 'react'

/**
 * Parallax sutil (±26px) para elementos [data-parallax] dentro do seu container.
 * requestAnimationFrame com guard de frame; respeita prefers-reduced-motion.
 */
export function useParallax() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    )
    if (reduce || !els.length) return

    let busy = false

    const tick = () => {
      if (busy) return
      busy = true
      requestAnimationFrame(() => {
        els.forEach((el) => {
          const parent = el.parentElement
          if (!parent) return
          const r = parent.getBoundingClientRect()
          const p =
            (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
          el.style.transform = `translateY(${(-p * 26).toFixed(1)}px)`
        })
        busy = false
      })
    }

    tick()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
    }
  }, [])
}

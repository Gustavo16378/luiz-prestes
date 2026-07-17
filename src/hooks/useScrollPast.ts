import { useEffect, useState } from 'react'

/**
 * true quando scrollY passa de innerHeight * factor.
 * Usado pelo botão flutuante de WhatsApp (aparece após ~0.72 da primeira tela).
 */
export function useScrollPast(factor = 0.72) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      setPast(window.scrollY > window.innerHeight * factor)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [factor])

  return past
}

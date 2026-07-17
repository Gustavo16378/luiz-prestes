import { useEffect, useState } from 'react'

/**
 * Scroll spy one-page: retorna o id da seção atualmente em foco.
 */
export function useScrollSpy(ids: string[], offset = 90) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) return

    let ticking = false

    const update = () => {
      const pos = window.scrollY + offset + 1
      let current = sections[0].id

      for (const sec of sections) {
        if (sec.offsetTop <= pos) current = sec.id
      }

      // Perto do fim da página, ativa a última seção.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = sections[sections.length - 1].id
      }

      setActive(current)
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
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return active
}

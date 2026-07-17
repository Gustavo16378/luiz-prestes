import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { useScrollPast } from '../hooks/useScrollPast'

export function FloatingWhatsApp() {
  const past = useScrollPast(0.72)

  // Esconde o botão quando a zona final (CTA #contato ou footer) está no
  // viewport — a seção de contato já tem seu próprio CTA e o footer traz o
  // crédito do desenvolvedor. Via IntersectionObserver, sem cálculo de offset.
  const [atBottom, setAtBottom] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = [
      document.getElementById('contato'),
      document.querySelector('footer'),
    ].filter((el): el is HTMLElement => el !== null)
    if (!targets.length) return

    const intersecting = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) intersecting.add(e.target)
          else intersecting.delete(e.target)
        })
        setAtBottom(intersecting.size > 0)
      },
      { threshold: 0 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const visible = past && !atBottom

  return (
    <a
      href={site.waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-[clamp(14px,3vw,28px)] right-[clamp(14px,3vw,28px)] z-[1200] inline-flex items-center gap-2.5 rounded-full border border-[rgba(201,164,107,.7)] bg-forest px-[22px] py-3.5 font-sans text-[13px] font-semibold tracking-[.06em] text-[#F5EFE4] no-underline shadow-[0_18px_40px_-14px_rgba(16,28,21,.6)] transition-[opacity,transform] duration-[400ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-bronze-lit" />
      Agendar pelo WhatsApp
    </a>
  )
}

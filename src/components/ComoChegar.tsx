import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { site } from '../data/site'
import { useIsMobile } from '../hooks/useMediaQuery'

const CENTER: [number, number] = [site.coordenadas.lat, site.coordenadas.lng]

function EnderecoCard() {
  return (
    <>
      <span className="font-serif text-[19px] font-medium text-forest">
        {site.instituto}
      </span>
      <p className="m-0 font-sans text-[14px] leading-[1.6] text-body">
        {site.endereco.sala} — {site.endereco.predio}
        <br />
        {site.endereco.logradouro} · {site.endereco.cidade}
      </p>
      <a
        href={site.mapsBusca}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center self-start border border-forest px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-forest no-underline transition-colors duration-300 hover:bg-forest hover:text-[#F5EFE4]"
      >
        Como chegar →
      </a>
    </>
  )
}

export function ComoChegar() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement | null>(null)
  const mapElRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    const el = mapElRef.current
    const section = sectionRef.current
    if (!el || !section) return

    let flew = false
    let tries = 0

    const enableDrag = () => mapRef.current?.dragging.enable()

    const init = (): boolean => {
      if (mapRef.current) return true
      const map = L.map(el, { zoomControl: false, scrollWheelZoom: false })
      map.setView([-14.6, -52.5], 5)

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        },
      ).addTo(map)

      const tilePane = map.getPane('tilePane')
      if (tilePane) {
        tilePane.style.filter =
          'sepia(.15) saturate(.9) hue-rotate(-5deg) contrast(1.05)'
      }

      const icon = L.divIcon({
        className: '',
        html: `<div style="position:relative;width:22px;height:22px">
          <span style="position:absolute;inset:0;border-radius:50%;border:2px solid #B8925A;animation:lpPulse 2.5s ease-out infinite"></span>
          <span style="position:absolute;inset:3px;border-radius:50%;background:#1E3A2F;border:2px solid #B8925A;box-shadow:0 6px 14px -4px rgba(20,32,24,.5)"></span>
        </div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })
      L.marker(CENTER, { icon }).addTo(map)

      // Dragging só depois de o usuário tocar/clicar no mapa.
      map.dragging.disable()
      el.addEventListener('pointerdown', enableDrag)

      mapRef.current = map
      return true
    }

    // Lazy init: inicializa quando estiver a 600px de entrar na tela.
    const initIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          initIO.disconnect()
          const attempt = () => {
            if (!init() && tries++ < 40) setTimeout(attempt, 250)
          }
          attempt()
        }
      },
      { rootMargin: '600px 0px' },
    )
    initIO.observe(section)

    // flyTo uma única vez ao ficar visível.
    const flyIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !flew) {
          const attempt = () => {
            if (mapRef.current) {
              flew = true
              flyIO.disconnect()
              mapRef.current.flyTo(CENTER, 16, {
                duration: 3,
                easeLinearity: 0.25,
              })
            } else if (tries++ < 40) {
              init()
              setTimeout(attempt, 300)
            }
          }
          attempt()
        }
      },
      { threshold: 0.3 },
    )
    flyIO.observe(section)

    return () => {
      initIO.disconnect()
      flyIO.disconnect()
      el.removeEventListener('pointerdown', enableDrag)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <section
      id="como-chegar"
      ref={sectionRef}
      className="scroll-mt-[70px] px-[clamp(20px,5vw,64px)] pb-[clamp(72px,9vw,120px)]"
    >
      <div className="mx-auto flex max-w-shell flex-col gap-[clamp(28px,4vw,40px)]">
        <div data-reveal className="flex max-w-[680px] flex-col gap-3.5">
          <span className="eyebrow text-bronze">Como chegar</span>
          <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.15] text-forest [text-wrap:pretty]">
            Estamos no coração de Palmas.
          </h2>
        </div>

        <div data-reveal>
          <div
            className="frame p-[clamp(10px,1.5vw,14px)]"
            style={{ boxShadow: '0 40px 70px -45px rgba(28,44,33,.45)' }}
          >
            <div className="relative overflow-hidden">
              <div
                id="lp-mapa"
                ref={mapElRef}
                className="lp-map h-[clamp(380px,46vw,480px)] bg-sand"
              />

              {/* Controles de zoom customizados */}
              <div className="absolute right-3.5 top-3.5 z-[800] flex flex-col border border-[rgba(184,146,90,.6)] bg-[rgba(247,244,239,.96)] shadow-[0_12px_24px_-14px_rgba(28,44,33,.4)]">
                <button
                  onClick={() => mapRef.current?.zoomIn()}
                  aria-label="Aproximar"
                  className="h-[38px] w-[38px] cursor-pointer border-none bg-transparent font-sans text-[22px] font-light leading-none text-forest transition-colors duration-200 hover:bg-[rgba(184,146,90,.16)]"
                >
                  +
                </button>
                <div className="h-px bg-[rgba(184,146,90,.5)]" />
                <button
                  onClick={() => mapRef.current?.zoomOut()}
                  aria-label="Afastar"
                  className="h-[38px] w-[38px] cursor-pointer border-none bg-transparent font-sans text-[22px] font-light leading-none text-forest transition-colors duration-200 hover:bg-[rgba(184,146,90,.16)]"
                >
                  −
                </button>
              </div>

              {/* Card flutuante — desktop, sobre o mapa */}
              {!isMobile && (
                <div className="absolute bottom-[18px] left-[18px] z-[800] flex max-w-[330px] flex-col gap-2.5 border border-[rgba(184,146,90,.6)] bg-[rgba(247,244,239,.97)] px-6 py-[22px] shadow-[0_24px_48px_-24px_rgba(28,44,33,.45)]">
                  <EnderecoCard />
                </div>
              )}
            </div>
          </div>

          {/* Card — mobile, abaixo do mapa */}
          {isMobile && (
            <div className="mt-3.5 flex flex-col gap-2.5 border border-[rgba(184,146,90,.6)] bg-paper px-[22px] py-5">
              <EnderecoCard />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

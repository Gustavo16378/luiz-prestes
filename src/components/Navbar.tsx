import { useEffect, useState } from 'react'
import { navLinks } from '../data/nav'
import { site } from '../data/site'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useIsMobile, useMediaQuery } from '../hooks/useMediaQuery'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

const sectionIds = navLinks.map((l) => l.id)

export function Navbar() {
  const { hidden, scrolled } = useScrollDirection()
  const active = useScrollSpy(sectionIds)
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  // No mobile (< 768px) o hero abre com foto full-bleed: enquanto scrollY < 40
  // a navbar fica "sobre a foto" (transparente + textos cream) e, ao rolar,
  // volta ao estado creme com textos forest.
  const overHeroPhoto = useMediaQuery('(max-width: 767px)')
  const [nearTop, setNearTop] = useState(true)
  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const photoMode = overHeroPhoto && nearTop

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,backdrop-filter,border-color] duration-300 ease-out"
        style={{
          background: photoMode ? 'transparent' : 'rgba(247,244,239,.9)',
          backdropFilter: photoMode ? 'none' : 'blur(14px)',
          WebkitBackdropFilter: photoMode ? 'none' : 'blur(14px)',
          borderBottomColor:
            !photoMode && scrolled ? 'rgba(184,146,90,.3)' : 'transparent',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-[clamp(16px,4vw,32px)] py-[11px]">
          <Logo onPhoto={photoMode} />

          {!isMobile && (
            <nav className="flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="whitespace-nowrap font-sans text-[12px] font-semibold uppercase tracking-[.14em] no-underline transition-colors duration-200 hover:text-brick"
                  style={{ color: active === link.id ? '#C0392B' : '#4A4437' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-forest bg-forest px-[18px] py-2.5 font-sans text-[11.5px] font-semibold uppercase tracking-[.14em] text-[#F5EFE4] no-underline transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_12px_24px_-12px_rgba(30,58,47,.5)]"
              >
                Agendar
              </a>
            </nav>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border transition-colors duration-300"
              style={{
                borderColor: photoMode
                  ? 'rgba(255,255,255,.6)'
                  : 'rgba(184,146,90,.5)',
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px w-[18px] transition-colors duration-300"
                  style={{ background: photoMode ? '#FFFFFF' : '#1E3A2F' }}
                />
              ))}
            </button>
          )}
        </div>
      </header>

      {isMobile && (
        <MobileMenu
          open={menuOpen}
          activeId={active}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}

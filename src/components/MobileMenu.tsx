import { createPortal } from 'react-dom'
import { navLinks } from '../data/nav'
import { site } from '../data/site'
import { useScrollLock } from '../hooks/useScrollLock'

interface MobileMenuProps {
  open: boolean
  activeId: string
  onClose: () => void
}

/**
 * Menu mobile do kit padrão do estúdio.
 * Portal para document.body, overlay + painel com estilos inline, z-index 9998/9999.
 * Scroll lock à prova de iOS enquanto aberto.
 */
export function MobileMenu({ open, activeId, onClose }: MobileMenuProps) {
  useScrollLock(open)

  return createPortal(
    <div aria-hidden={!open}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(21,42,33,.42)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .35s ease',
        }}
      />

      {/* Painel */}
      <nav
        aria-label="Navegação principal"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: 'min(86vw, 360px)',
          background: '#F7F4EF',
          borderLeft: '1px solid rgba(184,146,90,.4)',
          boxShadow: '-30px 0 60px -30px rgba(21,42,33,.5)',
          display: 'flex',
          flexDirection: 'column',
          padding: '22px 26px 30px',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .4s cubic-bezier(.22,.61,.36,1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 28,
          }}
        >
          <span
            style={{
              font: "600 10px 'Source Sans 3', sans-serif",
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: '#8A8171',
            }}
          >
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            style={{
              background: 'none',
              border: '1px solid rgba(184,146,90,.5)',
              width: 40,
              height: 40,
              cursor: 'pointer',
              color: '#1E3A2F',
              font: "300 24px/1 'Source Sans 3', sans-serif",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {navLinks.map((link) => {
            const active = activeId === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={onClose}
                style={{
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(184,146,90,.25)',
                  textDecoration: 'none',
                  font: "500 22px 'Playfair Display', serif",
                  color: active ? '#C0392B' : '#1E3A2F',
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <a
          href={site.waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          style={{
            marginTop: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: '#1E3A2F',
            color: '#F5EFE4',
            border: '1px solid #1E3A2F',
            padding: '16px 22px',
            font: "600 12.5px 'Source Sans 3', sans-serif",
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Agendar pelo WhatsApp
        </a>
      </nav>
    </div>,
    document.body,
  )
}

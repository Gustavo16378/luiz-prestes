import { site } from '../data/site'

interface LogoProps {
  /** true no rodapé (paleta clara sobre fundo escuro) */
  dark?: boolean
  /** true na navbar mobile quando sobreposta à foto do hero (tudo em cream) */
  onPhoto?: boolean
  onClick?: () => void
}

export function Logo({ dark = false, onPhoto = false, onClick }: LogoProps) {
  let mark: string
  let name: string
  let sub: string

  if (onPhoto) {
    mark = 'border-[rgba(255,255,255,.7)] text-white'
    name = 'text-white'
    sub = 'text-white'
  } else if (dark) {
    mark = 'border-[rgba(201,164,107,.6)] text-[#E8D7B5]'
    name = 'text-[#F3EDDF]'
    sub = 'text-bronze-lit'
  } else {
    mark = 'border-[rgba(184,146,90,.65)] text-forest'
    name = 'text-forest'
    sub = 'text-label'
  }

  return (
    <a
      href="#inicio"
      onClick={onClick}
      className="flex items-center gap-3 no-underline"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center border font-serif text-[15px] font-medium transition-[color,border-color] duration-300 ${mark}`}
      >
        LP
      </span>
      <span className="flex flex-col leading-[1.2]">
        <span
          className={`font-serif text-[16px] font-medium tracking-[.01em] transition-colors duration-300 ${name}`}
          style={onPhoto ? { textShadow: '0 1px 8px rgba(0,0,0,.25)' } : undefined}
        >
          {site.nome}
        </span>
        <span
          className={`font-sans text-[8.5px] font-semibold uppercase tracking-[.24em] transition-colors duration-300 ${sub}`}
          style={onPhoto ? { textShadow: '0 1px 8px rgba(0,0,0,.25)' } : undefined}
        >
          {site.instituto}
        </span>
      </span>
    </a>
  )
}

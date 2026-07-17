import { site } from '../data/site'

type Variant = 'solid' | 'outline-dark' | 'compact'

interface WhatsAppButtonProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

const base =
  'inline-flex items-center gap-2.5 no-underline font-sans font-semibold uppercase text-center'

const variants: Record<Variant, string> = {
  // Verde autoridade, texto cream — CTA principal.
  solid:
    'bg-forest text-[#F5EFE4] border border-forest px-[30px] py-[17px] text-[13px] tracking-[.14em] ' +
    'transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 ' +
    'hover:shadow-[0_18px_34px_-16px_rgba(30,58,47,.55)]',
  // Contorno bronze sobre fundo escuro (seção REAC).
  'outline-dark':
    'border border-[rgba(201,164,107,.75)] text-[#E8D7B5] px-[26px] py-[15px] text-[12.5px] tracking-[.14em] ' +
    'transition-colors duration-300 hover:bg-[rgba(184,146,90,.16)]',
  // Menor, para navbar.
  compact:
    'bg-forest text-[#F5EFE4] border border-forest px-[18px] py-[10px] text-[11.5px] tracking-[.14em] ' +
    'transition-[transform,box-shadow] duration-300 hover:-translate-y-px ' +
    'hover:shadow-[0_12px_24px_-12px_rgba(30,58,47,.5)]',
}

export function WhatsAppButton({
  children,
  variant = 'solid',
  className = '',
}: WhatsAppButtonProps) {
  return (
    <a
      href={site.waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

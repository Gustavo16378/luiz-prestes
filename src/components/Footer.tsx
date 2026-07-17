import { site } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-[rgba(201,164,107,.4)] bg-forest-deep px-[clamp(20px,5vw,64px)] pb-7 pt-[clamp(48px,6vw,72px)]">
      <div className="mx-auto flex max-w-shell flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-x-12 gap-y-9">
          {/* Marca */}
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <Logo dark />
            <p className="m-0 font-sans text-[14px] leading-[1.65] text-[rgba(243,237,223,.55)]">
              Psiquiatria intervencionista e neuromodulação REAC, com escuta e
              ciência — em Palmas, Tocantins.
            </p>
          </div>

          {/* Endereço */}
          <div className="flex flex-col gap-2.5">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[.2em] text-bronze-lit">
              Endereço
            </span>
            <p className="m-0 font-sans text-[14.5px] leading-[1.65] text-[rgba(243,237,223,.75)]">
              {site.endereco.linha1}
              <br />
              {site.endereco.linha2}
            </p>
            <a
              href={site.mapsEndereco}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start border-b border-[rgba(201,164,107,.5)] pb-[3px] font-sans text-[12px] font-semibold uppercase tracking-[.12em] text-[rgba(233,224,207,.85)] no-underline transition-colors duration-200 hover:text-bronze-lit"
            >
              Ver no mapa
            </a>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-2.5">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[.2em] text-bronze-lit">
              Contato
            </span>
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[14.5px] text-[rgba(243,237,223,.75)] no-underline transition-colors duration-200 hover:text-bronze-lit"
            >
              Agendar pelo WhatsApp
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[14.5px] text-[rgba(243,237,223,.75)] no-underline transition-colors duration-200 hover:text-bronze-lit"
            >
              {site.instagram.handle}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2.5 border-t border-[rgba(201,164,107,.25)] pt-[22px]">
          <span className="font-sans text-[12.5px] leading-[1.6] text-[rgba(243,237,223,.5)]">
            Diretor Técnico: {site.nome} — {site.credenciais.crm} ·{' '}
            {site.credenciais.rqe}
          </span>
          <span className="font-sans text-[12.5px] leading-[1.6] text-[rgba(243,237,223,.5)]">
            © 2026 {site.instituto}. Conteúdo informativo — não substitui
            consulta médica.
          </span>
        </div>

        <div className="border-t border-[rgba(201,164,107,.15)] pt-5 text-center">
          <a
            href={site.desenvolvedor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11.5px] font-semibold uppercase tracking-[.16em] text-[rgba(243,237,223,.45)] no-underline transition-colors duration-200 hover:text-bronze-lit"
          >
            Desenvolvido por {site.desenvolvedor.nome}
          </a>
        </div>
      </div>
    </footer>
  )
}

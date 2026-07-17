import { site, imagens } from '../data/site'
import { Picture } from './Picture'
import { WhatsAppButton } from './WhatsAppButton'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative scroll-mt-[70px] md:px-[clamp(20px,5vw,64px)] md:pb-[clamp(56px,7vw,96px)] md:pt-[clamp(110px,15vh,170px)]"
      style={{
        background:
          'radial-gradient(1000px 560px at 84% 4%, rgba(184,146,90,.16), transparent 62%)',
      }}
    >
      <div className="mx-auto flex max-w-shell flex-col md:grid md:items-center md:gap-[clamp(40px,6vw,88px)] md:[grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        {/* Coluna de texto — no mobile vem DEPOIS da foto (order-2) */}
        <div className="order-2 flex flex-col gap-[26px] px-[clamp(20px,5vw,64px)] pb-[clamp(44px,10vw,72px)] pt-[clamp(24px,7vw,40px)] md:order-none md:p-0">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-7 bg-brick" />
            <span className="eyebrow text-label">
              {site.instituto} · Palmas — TO
            </span>
          </div>

          <h1 className="m-0 font-serif text-[clamp(38px,5.2vw,62px)] font-medium leading-[1.1] tracking-[-.01em] text-forest [text-wrap:pretty]">
            Recuperar sua <em className="text-[#96713A]">qualidade de vida</em> é
            o meu trabalho.
          </h1>

          <p className="m-0 max-w-[520px] font-sans text-[clamp(17px,1.6vw,19px)] leading-[1.65] text-body [text-wrap:pretty]">
            Psiquiatria intervencionista e neuromodulação REAC em Palmas —
            ciência de fronteira, com a escuta e o tempo que a sua história
            merece.
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-[26px] gap-y-[18px]">
            <WhatsAppButton>Agendar pelo WhatsApp</WhatsAppButton>
            <a
              href="#instituto"
              className="border-b border-[rgba(184,146,90,.7)] pb-1 font-sans text-[12.5px] font-semibold uppercase tracking-[.14em] text-forest no-underline transition-colors duration-200 hover:text-brick"
            >
              Conhecer o Instituto ↓
            </a>
          </div>

          <p className="m-0 mt-1 font-sans text-[12px] font-semibold uppercase tracking-[.16em] text-label">
            {site.nome} · {site.credenciais.crm} · {site.credenciais.rqe}
          </p>
        </div>

        {/* Coluna da foto — no mobile abre a página (order-1) */}
        <div className="order-1 md:order-none md:w-[min(100%,500px)] md:justify-self-center">
          {/* Mobile: foto full-bleed protagonista, sem moldura */}
          <div className="relative h-[62vh] w-full overflow-hidden bg-sand md:hidden">
            <Picture
              src={imagens.terno}
              alt="Retrato editorial do Dr. Luiz Prestes — barba, óculos e blazer, sob luz quente"
              width={1024}
              height={1024}
              priority
              position="center top"
              sizes="100vw"
            />
            {/* Scrim no topo — dá contraste para a navbar assentar sobre a foto */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[140px]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(30,30,24,.55) 0%, rgba(30,30,24,.22) 60%, transparent 100%)',
              }}
            />
            {/* Fusão da base da foto com o creme — só nos últimos ~26% */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, #F7F4EF 0%, rgba(247,244,239,.75) 10%, transparent 26%)',
              }}
            />
          </div>

          {/* Desktop: retrato em moldura de galeria (inalterado) */}
          <div className="hidden md:block">
            <div
              className="frame p-[clamp(12px,2vw,18px)]"
              style={{ boxShadow: '0 40px 70px -40px rgba(28,44,33,.45)' }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <Picture
                  src={imagens.terno}
                  alt="Retrato editorial do Dr. Luiz Prestes — barba, óculos e blazer, sob luz quente"
                  width={500}
                  height={625}
                  priority
                  sizes="(max-width: 979px) 100vw, 500px"
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 px-1 pt-3">
              <span className="font-serif text-[14px] italic text-muted">
                Dr. Luiz Prestes, fundador
              </span>
              <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[.18em] text-bronze">
                est. 2017
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

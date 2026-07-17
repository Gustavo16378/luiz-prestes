import { imagens } from '../data/site'
import { Picture } from './Picture'
import { WhatsAppButton } from './WhatsAppButton'

export function CtaFinal() {
  return (
    <section
      id="contato"
      className="scroll-mt-[70px] border-t border-[rgba(184,146,90,.3)] px-[clamp(20px,5vw,64px)] py-[clamp(80px,10vw,130px)]"
      style={{
        background:
          'radial-gradient(760px 420px at 50% 0%, rgba(184,146,90,.14), transparent 65%)',
      }}
    >
      <div
        data-reveal
        className="mx-auto flex max-w-[620px] flex-col items-center gap-[22px] text-center"
      >
        <div className="rounded-full border border-[rgba(184,146,90,.6)] p-2">
          <div className="h-[120px] w-[120px] overflow-hidden rounded-full">
            <Picture
              src={imagens.terno}
              alt="Dr. Luiz Prestes"
              width={120}
              height={120}
            />
          </div>
        </div>

        <h2 className="m-0 font-serif text-[clamp(32px,4.2vw,50px)] font-medium leading-[1.12] text-forest [text-wrap:pretty]">
          O primeiro passo pode ser hoje.
        </h2>
        <p className="m-0 font-sans text-[17.5px] leading-[1.7] text-body [text-wrap:pretty]">
          Me chame no WhatsApp. Minha equipe vai te ouvir, entender o seu momento
          e encontrar o melhor horário — presencial ou por telemedicina.
        </p>

        <WhatsAppButton className="px-[34px] py-[18px]">
          Agendar pelo WhatsApp
        </WhatsAppButton>

        <span className="font-sans text-[11px] font-semibold uppercase tracking-[.18em] text-label">
          Resposta em horário comercial
        </span>
      </div>
    </section>
  )
}

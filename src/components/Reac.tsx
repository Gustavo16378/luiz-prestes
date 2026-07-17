import { reac } from '../data/reac'
import { imagens } from '../data/site'
import { Picture } from './Picture'
import { WhatsAppButton } from './WhatsAppButton'

export function Reac() {
  return (
    <section
      id="reac"
      className="scroll-mt-[70px] bg-forest-panel px-[clamp(20px,5vw,64px)] py-[clamp(80px,10vw,130px)]"
      style={{
        background:
          'radial-gradient(1100px 620px at 12% 0%, rgba(184,146,90,.18), transparent 58%), #1C362B',
      }}
    >
      <div className="mx-auto grid max-w-shell items-start gap-[clamp(44px,6vw,90px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        {/* Texto */}
        <div data-reveal className="flex flex-col gap-[22px]">
          <span className="eyebrow text-bronze-lit">{reac.eyebrow}</span>
          <h2 className="m-0 font-serif text-[clamp(34px,4.4vw,54px)] font-medium leading-[1.08] text-[#F3EDDF] [text-wrap:pretty]">
            Neuromodulação <em className="text-bronze-lit">REAC</em>
          </h2>
          <p className="m-0 font-sans text-[17px] leading-[1.75] text-[rgba(243,237,223,.78)] [text-wrap:pretty]">
            {reac.intro}
          </p>

          <div className="flex flex-col">
            {reac.itens.map((item, i) => (
              <div
                key={item.numero}
                className={`flex gap-5 border-t border-[rgba(201,164,107,.35)] py-5 ${
                  i === reac.itens.length - 1
                    ? 'border-b border-b-[rgba(201,164,107,.35)]'
                    : ''
                }`}
              >
                <span className="font-serif text-[17px] font-medium italic text-bronze-lit">
                  {item.numero}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="m-0 font-serif text-[21px] font-medium text-[#F3EDDF]">
                    {item.titulo}
                  </h3>
                  <p className="m-0 font-sans text-[15.5px] leading-[1.65] text-[rgba(243,237,223,.66)]">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-[18px]">
            <WhatsAppButton variant="outline-dark">
              Perguntar sobre a REAC
            </WhatsAppButton>
          </div>

          <p className="m-0 max-w-[520px] font-serif text-[13.5px] italic leading-[1.6] text-[rgba(243,237,223,.5)]">
            {reac.disclaimer}
          </p>
        </div>

        {/* Foto da sala */}
        <div data-reveal className="w-[min(100%,480px)] justify-self-center">
          <div className="border border-[rgba(201,164,107,.55)] bg-[rgba(247,244,239,.04)] p-[clamp(12px,2vw,18px)]">
            <div className="aspect-[4/5] overflow-hidden bg-[#16291F]">
              <Picture
                src={imagens.reac}
                alt="Sala de neuromodulação com equipamento REAC sob luz quente"
                width={480}
                height={600}
                sizes="(max-width: 979px) 100vw, 480px"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3 px-1 pt-3">
            <span className="font-serif text-[14px] italic text-[rgba(243,237,223,.6)]">
              Sala de neuromodulação
            </span>
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[.18em] text-bronze-lit">
              Tecnologia REAC
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

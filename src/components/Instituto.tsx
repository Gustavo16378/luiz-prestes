import { instituto } from '../data/instituto'
import { site } from '../data/site'
import { Picture } from './Picture'

function Caption({ legenda, numero }: { legenda: string; numero: string }) {
  return (
    <div className="flex justify-between gap-3 px-1 pt-3">
      <span className="font-serif text-[14px] italic text-muted">{legenda}</span>
      <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[.18em] text-bronze">
        {numero}
      </span>
    </div>
  )
}

export function Instituto() {
  const { recepcao } = instituto
  const [sala, detalhe] = instituto.galeria

  return (
    <section
      id="instituto"
      className="scroll-mt-[70px] px-[clamp(20px,5vw,64px)] py-[clamp(72px,9vw,120px)]"
    >
      <div className="mx-auto flex max-w-shell flex-col gap-[clamp(28px,4vw,44px)]">
        {/* Cabeçalho */}
        <div data-reveal className="flex max-w-[680px] flex-col gap-3.5">
          <span className="eyebrow text-bronze">{instituto.eyebrow}</span>
          <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.15] text-forest [text-wrap:pretty]">
            {instituto.titulo}
          </h2>
          <p className="m-0 font-sans text-[17px] leading-[1.7] text-body [text-wrap:pretty]">
            {instituto.intro}
          </p>
        </div>

        {/* Foto grande com parallax */}
        <div data-reveal>
          <div className="relative aspect-[16/7] min-h-[300px] w-full overflow-hidden border border-[rgba(184,146,90,.5)]">
            <div
              data-parallax
              className="absolute inset-x-0 -inset-y-11 will-change-transform"
            >
              <Picture
                src={recepcao.src}
                alt={recepcao.alt}
                width={1240}
                height={543}
                sizes="100vw"
              />
            </div>
          </div>
          <Caption legenda={recepcao.legenda} numero={recepcao.numero} />
        </div>

        {/* Grid assimétrico */}
        <div className="flex flex-wrap gap-[clamp(18px,3vw,28px)]">
          <div data-reveal className="min-w-0 flex-[1.6_1_380px]">
            <div className="aspect-[16/10] overflow-hidden border border-[rgba(184,146,90,.5)]">
              <Picture
                src={sala.src}
                alt={sala.alt}
                width={720}
                height={450}
                sizes="(max-width: 979px) 100vw, 720px"
              />
            </div>
            <Caption legenda={sala.legenda} numero={sala.numero} />
          </div>

          <div data-reveal className="min-w-0 flex-[1_1_280px]">
            <div className="aspect-[4/5] overflow-hidden border border-[rgba(184,146,90,.5)]">
              <Picture
                src={detalhe.src}
                alt={detalhe.alt}
                width={460}
                height={575}
                sizes="(max-width: 979px) 100vw, 460px"
              />
            </div>
            <Caption legenda={detalhe.legenda} numero={detalhe.numero} />
          </div>
        </div>

        {/* Painel de endereço */}
        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border border-[rgba(201,164,107,.4)] bg-forest-panel px-[clamp(24px,4vw,44px)] py-[clamp(26px,4vw,38px)]"
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-serif text-[clamp(20px,2.4vw,26px)] font-medium text-[#F3EDDF]">
              Palmas Medical Center — Sala 812
            </span>
            <span className="font-sans text-[15px] leading-[1.5] text-[rgba(243,237,223,.66)]">
              Q. 401 Sul, Av. LO 11 · Palmas – TO · Atendimento com hora marcada
            </span>
          </div>
          <a
            href={site.mapsEndereco}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-[rgba(201,164,107,.75)] px-6 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[.14em] text-[#E8D7B5] no-underline transition-colors duration-300 hover:bg-[rgba(184,146,90,.16)]"
          >
            Ver no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

import { sobre } from '../data/sobre'
import { imagens } from '../data/site'
import { Picture } from './Picture'

export function Sobre() {
  return (
    <section
      id="sobre"
      className="scroll-mt-[70px] bg-[#F2ECE1] px-[clamp(20px,5vw,64px)] py-[clamp(72px,9vw,120px)]"
    >
      <div className="mx-auto grid max-w-shell items-center gap-[clamp(40px,6vw,88px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        {/* Retrato casual */}
        <div data-reveal className="w-[min(100%,440px)] justify-self-center">
          <div className="frame p-[clamp(12px,2vw,18px)]">
            <div className="aspect-[3/4] overflow-hidden bg-[#E7DECD]">
              <Picture
                src={imagens.camisa}
                alt="Retrato casual do Dr. Luiz Prestes no consultório"
                width={440}
                height={587}
                sizes="(max-width: 979px) 100vw, 440px"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3 px-1 pt-3">
            <span className="font-serif text-[14px] italic text-muted">
              {sobre.legendaFoto}
            </span>
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[.18em] text-bronze">
              Palmas · TO
            </span>
          </div>
        </div>

        {/* Bio */}
        <div data-reveal className="flex flex-col gap-5">
          <span className="eyebrow text-bronze">{sobre.eyebrow}</span>
          <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.15] text-forest [text-wrap:pretty]">
            {sobre.titulo}
          </h2>
          {sobre.paragrafos.map((p, i) => (
            <p
              key={i}
              className="m-0 font-sans text-[17px] leading-[1.75] text-body [text-wrap:pretty]"
            >
              {p}
            </p>
          ))}
          <blockquote className="mt-2 border-l-2 border-bronze py-1.5 pl-6 font-serif text-[clamp(20px,2.2vw,24px)] font-medium italic leading-[1.45] text-forest [text-wrap:pretty]">
            “{sobre.citacao}”
          </blockquote>
          <div className="mt-1.5 flex flex-wrap gap-2.5">
            {sobre.chips.map((chip) => (
              <span
                key={chip}
                className="border border-[rgba(184,146,90,.5)] px-4 py-[9px] font-sans text-[11.5px] font-semibold uppercase tracking-[.14em] text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

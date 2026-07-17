import { tratamentos } from '../data/tratamentos'

export function Tratamentos() {
  return (
    <section
      id="tratamentos"
      className="scroll-mt-[70px] px-[clamp(20px,5vw,64px)] py-[clamp(72px,9vw,120px)]"
    >
      <div className="mx-auto max-w-shell">
        <div
          data-reveal
          className="mb-[clamp(36px,5vw,56px)] flex max-w-[680px] flex-col gap-3.5"
        >
          <span className="eyebrow text-bronze">Como eu posso te ajudar</span>
          <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.15] text-forest [text-wrap:pretty]">
            Antes do diagnóstico, existe uma pessoa.
          </h2>
          <p className="m-0 font-sans text-[17px] leading-[1.7] text-body [text-wrap:pretty]">
            Cada condição abaixo tem tratamento sério e individualizado. Se você
            se reconhecer em alguma delas, esse pode ser o sinal para
            conversarmos.
          </p>
        </div>

        <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))]">
          {tratamentos.map((t) => (
            <article
              key={t.numero}
              data-reveal
              className="group flex flex-col gap-3 border border-[rgba(184,146,90,.32)] bg-paper px-[26px] pb-[30px] pt-7 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(192,57,43,.5)] hover:shadow-[0_28px_44px_-32px_rgba(30,58,47,.4)]"
            >
              <span className="font-serif text-[15px] font-medium italic tracking-[.08em] text-bronze">
                {t.numero}
              </span>
              <h3 className="m-0 font-serif text-[23px] font-medium leading-[1.2] text-forest">
                {t.titulo}
              </h3>
              <p className="m-0 font-sans text-[15.5px] leading-[1.65] text-body">
                {t.descricao}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

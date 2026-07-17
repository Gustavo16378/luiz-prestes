import { Fragment } from 'react'

const marcos = [
  'Psiquiatria intervencionista',
  'Neuromodulação REAC',
  'Instituto próprio desde 2017',
  'Presencial e telemedicina',
]

export function TrustBar() {
  return (
    <section className="border-y border-[rgba(184,146,90,.35)]">
      <div className="mx-auto flex max-w-shell flex-col items-center gap-2.5 px-[clamp(16px,4vw,32px)] py-4 md:flex-row md:flex-wrap md:justify-center md:gap-x-[22px] md:gap-y-2.5">
        {marcos.map((marco, i) => (
          <Fragment key={marco}>
            {/* separador "·" só existe inline no desktop */}
            {i > 0 && <span className="hidden text-bronze md:inline">·</span>}
            <span className="whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[.18em] text-label">
              {marco}
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  )
}

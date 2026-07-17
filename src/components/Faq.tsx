import { useState } from 'react'
import { faq } from '../data/faq'

export function Faq() {
  const [open, setOpen] = useState<number>(-1)

  return (
    <section className="border-t border-[rgba(184,146,90,.3)] px-[clamp(20px,5vw,64px)] py-[clamp(72px,9vw,110px)]">
      <div className="mx-auto max-w-[860px]">
        <div
          data-reveal
          className="mb-[clamp(28px,4vw,40px)] flex flex-col gap-3.5"
        >
          <span className="eyebrow text-bronze">Perguntas frequentes</span>
          <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,42px)] font-medium leading-[1.15] text-forest">
            O que costumam me perguntar
          </h2>
        </div>

        <div data-reveal className="flex flex-col">
          {faq.map((item, i) => {
            const isOpen = open === i
            const isLast = i === faq.length - 1
            return (
              <div
                key={item.pergunta}
                className={`border-t border-[rgba(184,146,90,.4)] ${
                  isLast ? 'border-b border-b-[rgba(184,146,90,.4)]' : ''
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-[18px] border-none bg-transparent px-1 py-[22px] text-left"
                >
                  <span className="font-serif text-[clamp(17px,2vw,20px)] font-medium text-forest">
                    {item.pergunta}
                  </span>
                  <span
                    className="font-sans text-[26px] font-light leading-none transition-[transform,color] duration-300"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      color: isOpen ? '#C0392B' : '#B8925A',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 max-w-[660px] px-1 pb-6 font-sans text-[16px] leading-[1.7] text-body">
                      {item.resposta}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

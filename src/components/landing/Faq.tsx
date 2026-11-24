'use client'

import { useRef, useState } from 'react'
import { LANDING_COPY } from '@/lib/constants/landing'
import { ButtonArrow, ButtonLink } from './ui/ButtonLink'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

const pad = (value: number) => String(value).padStart(2, '0')

export function Faq() {
  const { eyebrow, title, contact, items } = LANDING_COPY.faq
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1
    const targets: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    if (e.key in targets) {
      e.preventDefault()
      buttonRefs.current[targets[e.key]]?.focus()
    }
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} />

          <div className="mt-10 rounded-[1.75rem] bg-surface-panel p-6">
            <p className="font-medium text-ink">{contact.text}</p>
            <ButtonLink href={contact.href} variant="ink" className="mt-4 [--fill:var(--color-brand)]!">
              {contact.cta}
              <ButtonArrow />
            </ButtonLink>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <li
                key={item.question}
                className={`fill-hover rounded-[1.5rem] transition-colors duration-500 ease-out-quart [--fill:var(--color-blush)] ${isOpen ? 'bg-blush' : 'bg-surface-panel'}`}
              >
                <h3>
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el
                    }}
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center gap-4 rounded-[1.5rem] p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand sm:gap-5 sm:p-6"
                  >
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${isOpen ? 'text-brand' : 'text-text-subtle group-hover:text-brand'}`}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className={`flex-1 font-display text-lg font-semibold tracking-tight transition-[translate,color] duration-500 ease-out-quart sm:text-xl ${isOpen ? 'text-wine' : 'text-ink group-hover:translate-x-1'}`}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl transition-[rotate,background-color,color] duration-500 ease-out-quart ${isOpen ? 'rotate-45 bg-brand text-white' : 'bg-white text-ink group-hover:rotate-90 group-hover:bg-ink group-hover:text-white'}`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out-quart ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`pb-6 pl-5 pr-6 leading-relaxed text-text-secondary transition-[opacity,translate] duration-500 ease-out-quart sm:pl-[3.75rem] sm:pr-20 ${isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-2 opacity-0'}`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

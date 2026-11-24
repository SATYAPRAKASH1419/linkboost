import { LANDING_COPY } from '@/lib/constants/landing'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

export function HowItWorks() {
  const { eyebrow, title, steps } = LANDING_COPY.howItWorks

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-surface-panel py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="reveal flex flex-col justify-between gap-12 rounded-[1.75rem] bg-white p-7 ring-1 ring-border-subtle sm:p-8"
            >
              <div>
                <span className="font-display text-6xl font-black tracking-tight text-blush-strong">{step.number}</span>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-text-secondary">{step.body}</p>
              </div>
              <span className="self-start rounded-full bg-surface-panel px-3.5 py-1.5 font-mono text-xs text-text-secondary">
                {step.tag}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

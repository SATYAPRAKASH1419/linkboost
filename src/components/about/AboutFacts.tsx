import { ABOUT_COPY } from '@/lib/constants/about'
import { Container } from '../landing/ui/Container'

export function AboutFacts() {
  return (
    <section aria-label="LinkBoost in numbers" className="selection-inverse bg-wine py-16 sm:py-20">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {ABOUT_COPY.facts.map((fact) => (
            <div key={fact.label} className="reveal flex flex-col-reverse gap-2 border-l border-white/15 pl-5 sm:pl-6">
              <dt className="text-blush/80">{fact.label}</dt>
              <dd className="font-display text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

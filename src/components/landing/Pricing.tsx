import { LANDING_COPY } from '@/lib/constants/landing'
import { ButtonArrow, ButtonLink } from './ui/ButtonLink'
import { Container } from './ui/Container'

export function Pricing() {
  const { eyebrow, stat, statLabel, body, stackTitle, stack, cta } = LANDING_COPY.pricing

  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          <p className="mt-4 font-display text-[clamp(7rem,20vw,13rem)] font-black leading-[0.8] tracking-[-0.06em] text-brand">
            {stat}
          </p>
          <p className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{statLabel}</p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-text-secondary">{body}</p>
          <ButtonLink href="/signup" size="lg" className="mt-8">
            {cta}
            <ButtonArrow />
          </ButtonLink>
        </div>

        <div className="reveal rounded-[2rem] bg-surface-panel p-6 sm:p-8">
          <p className="font-display text-xl font-bold tracking-tight text-ink">{stackTitle}</p>
          <ul className="mt-6 space-y-3">
            {stack.map((row) => (
              <li
                key={row.tool}
                className="grid grid-cols-1 gap-1 rounded-2xl bg-white px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4"
              >
                <span className="text-text-muted line-through decoration-brand/60">{row.tool}</span>
                <span aria-hidden="true" className="hidden text-text-subtle sm:block">
                  →
                </span>
                <span className="font-semibold text-ink">{row.replacedBy}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

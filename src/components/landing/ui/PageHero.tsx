import { Container } from './Container'

interface PageHeroProps {
  eyebrow: string
  titleLines: readonly string[]
  lead: string
}

/** Oversized uppercase headline used at the top of secondary marketing pages */
export function PageHero({ eyebrow, titleLines, lead }: PageHeroProps) {
  return (
    <section className="pb-14 pt-10 sm:pb-20 sm:pt-16">
      <Container>
        <p className="animate-rise font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
        <h1 className="mt-5 animate-rise font-display text-[clamp(2.75rem,8vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.045em] text-ink [animation-delay:100ms]">
          {titleLines.map((line, index) => (
            <span key={line} className={`block ${index === titleLines.length - 1 && titleLines.length > 1 ? 'text-brand' : ''}`}>
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-2xl animate-rise text-xl leading-relaxed text-text-secondary [animation-delay:200ms] sm:text-2xl sm:leading-relaxed">
          {lead}
        </p>
      </Container>
    </section>
  )
}

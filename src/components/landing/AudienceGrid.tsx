import { LANDING_COPY } from '@/lib/constants/landing'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

export function AudienceGrid() {
  const { eyebrow, title, body, items } = LANDING_COPY.audience

  return (
    <section id="who-its-for" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p className="max-w-md text-lg leading-relaxed text-text-secondary">{body}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="reveal group fill-hover flex flex-col justify-between gap-10 rounded-[1.75rem] bg-surface-panel p-7 transition-transform duration-500 ease-out-quart [--fill:var(--color-blush)] hover:-translate-y-1 sm:p-8"
            >
              <div>
                <span className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-wine">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-text-secondary">{item.line}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {item.chips.map((chip) => (
                  <li key={chip} className="rounded-full bg-white px-3.5 py-1.5 font-mono text-xs text-text-secondary">
                    {chip}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

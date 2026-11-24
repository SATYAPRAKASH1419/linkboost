import { LANDING_COPY } from '@/lib/constants/landing'

export function CreatorMarquee() {
  const items = LANDING_COPY.marquee

  return (
    <section aria-label="Who LinkBoost is for" className="selection-inverse overflow-hidden bg-ink py-6">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 pr-8 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {item}
                <span className="h-2.5 w-2.5 rounded-full bg-brand" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

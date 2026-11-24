import { LANDING_COPY } from '@/lib/constants/landing'
import { PlatformOrbit } from './mockups/PlatformOrbit'
import { SourceFeedCard } from './mockups/SourceFeedCard'
import { Container } from './ui/Container'
import { PLATFORM_ICONS, PlatformIcon } from './ui/PlatformIcon'
import { SectionHeading } from './ui/SectionHeading'

const PLATFORMS = LANDING_COPY.platforms.items
const MARQUEE_ROWS = [PLATFORMS.slice(0, 6), PLATFORMS.slice(6)]

export function PlatformsSection() {
  const { eyebrow, title, body, footnote } = LANDING_COPY.platforms

  return (
    <section className="selection-inverse overflow-hidden bg-ink py-20 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="flex flex-col gap-10">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              eyebrowClassName="text-blush-strong"
              titleClassName="text-white"
            />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">{body}</p>
          </div>
          <SourceFeedCard />
        </div>

        <div className="reveal">
          <PlatformOrbit />
        </div>
      </Container>

      <div className="mt-20 flex flex-col gap-4">
        {MARQUEE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex w-max animate-marquee hover:[animation-play-state:paused] ${rowIndex === 1 ? '[animation-direction:reverse]' : ''}`}
            >
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
                  {row.map((item) => (
                    <li
                      key={item.platform}
                      className="fill-hover flex items-center gap-3 rounded-full bg-ink-soft py-2 pl-2 pr-5 ring-1 ring-white/10 [--fill:var(--color-brand)]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                        <PlatformIcon platform={item.platform} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="font-semibold text-white">{PLATFORM_ICONS[item.platform].title}</span>
                      <span className="font-mono text-xs text-white/50">{item.where}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Container>
        <p className="mt-10 text-center text-sm text-white/50">{footnote}</p>
      </Container>
    </section>
  )
}

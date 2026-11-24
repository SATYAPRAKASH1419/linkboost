import { LANDING_COPY, type FeatureTone } from '@/lib/constants/landing'
import { CheckoutDemo } from './mockups/CheckoutDemo'
import { CreatorPagePhone } from './mockups/CreatorPagePhone'
import { LeadMagnetCard } from './mockups/LeadMagnetCard'
import { SourceAnalyticsCard } from './mockups/SourceAnalyticsCard'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

const TONE_STYLES: Record<FeatureTone, { section: string; eyebrow: string; title: string; body: string; dot: string }> = {
  wine: {
    section: 'selection-inverse bg-wine',
    eyebrow: 'text-blush-strong',
    title: 'text-blush',
    body: 'text-blush/80',
    dot: 'bg-blush-strong',
  },
  blush: {
    section: 'bg-blush',
    eyebrow: 'text-brand',
    title: 'text-wine',
    body: 'text-text-secondary',
    dot: 'bg-brand',
  },
  ink: {
    section: 'selection-inverse bg-ink',
    eyebrow: 'text-blush-strong',
    title: 'text-white',
    body: 'text-white/70',
    dot: 'bg-brand',
  },
  panel: {
    section: 'bg-surface-panel',
    eyebrow: 'text-brand',
    title: 'text-ink',
    body: 'text-text-secondary',
    dot: 'bg-brand',
  },
}

const VISUALS: Record<string, React.ReactNode> = {
  payments: <CheckoutDemo />,
  'lead-magnets': <LeadMagnetCard />,
  'source-analytics': <SourceAnalyticsCard />,
  'creator-page': <CreatorPagePhone />,
}

export function FeatureSections() {
  return (
    <div id="features" className="scroll-mt-24">
      {LANDING_COPY.features.map((feature, index) => {
        const styles = TONE_STYLES[feature.tone]
        const visualFirst = index % 2 === 1

        return (
          <section key={feature.id} className={`${styles.section} py-16 sm:py-24 lg:py-28`}>
            <Container className="grid items-center gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
              <div className={`mx-auto w-full max-w-xl lg:max-w-none ${visualFirst ? 'lg:order-2' : ''}`}>
                <SectionHeading
                  eyebrow={feature.eyebrow}
                  title={feature.title}
                  eyebrowClassName={styles.eyebrow}
                  titleClassName={styles.title}
                />
                <p className={`mt-5 max-w-lg text-base leading-relaxed sm:mt-6 sm:text-lg ${styles.body}`}>{feature.body}</p>
                <ul className="mt-7 space-y-3 sm:mt-8">
                  {feature.points.map((point) => (
                    <li key={point} className={`flex items-start gap-3 font-medium ${styles.title}`}>
                      <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${styles.dot}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal mx-auto flex w-full max-w-xl justify-center lg:max-w-none">{VISUALS[feature.id]}</div>
            </Container>
          </section>
        )
      })}
    </div>
  )
}

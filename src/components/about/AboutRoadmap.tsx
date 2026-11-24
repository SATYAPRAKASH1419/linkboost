import { ABOUT_COPY } from '@/lib/constants/about'
import { Container } from '../landing/ui/Container'
import { SectionHeading } from '../landing/ui/SectionHeading'

export function AboutRoadmap() {
  const { eyebrow, title, stages } = ABOUT_COPY.roadmap

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {stages.map((stage, index) => {
            const isCurrent = index === 0

            return (
              <li
                key={stage.stage}
                className={`reveal flex flex-col rounded-[1.75rem] p-7 sm:p-8 ${isCurrent ? 'selection-inverse bg-ink text-white' : 'bg-surface-panel text-ink'}`}
              >
                <span
                  className={`self-start rounded-full px-3.5 py-1.5 font-mono text-xs font-medium ${isCurrent ? 'bg-brand text-white' : 'bg-white text-text-secondary'}`}
                >
                  {stage.stage}
                </span>
                <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">{stage.title}</h3>
                <ul className="mt-5 space-y-3">
                  {stage.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-center gap-3 ${isCurrent ? 'text-white/80' : 'text-text-secondary'}`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isCurrent ? 'bg-brand' : 'bg-text-subtle'}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

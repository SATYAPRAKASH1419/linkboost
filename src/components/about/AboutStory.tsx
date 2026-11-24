import { ABOUT_COPY } from '@/lib/constants/about'
import { Container } from '../landing/ui/Container'
import { SectionHeading } from '../landing/ui/SectionHeading'

export function AboutStory() {
  const { eyebrow, title, paragraphs } = ABOUT_COPY.story

  return (
    <section className="py-20 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="space-y-6 text-lg leading-relaxed text-text-secondary sm:text-xl sm:leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="reveal">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  )
}

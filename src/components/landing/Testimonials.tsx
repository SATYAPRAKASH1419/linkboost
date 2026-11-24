import Image from 'next/image'
import { LANDING_COPY } from '@/lib/constants/landing'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

export function Testimonials() {
  const { eyebrow, title, items } = LANDING_COPY.testimonials

  return (
    <section className="bg-surface-panel py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.name} className="reveal flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-border-subtle">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={`Portrait of ${item.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figure className="flex flex-1 flex-col justify-between gap-6 p-7">
                <blockquote className="text-lg leading-relaxed text-ink">“{item.quote}”</blockquote>
                <figcaption>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-text-muted">{item.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

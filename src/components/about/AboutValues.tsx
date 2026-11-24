import { ABOUT_COPY } from '@/lib/constants/about'
import { Container } from '../landing/ui/Container'
import { SectionHeading } from '../landing/ui/SectionHeading'

export function AboutValues() {
  const { eyebrow, title, items } = ABOUT_COPY.values

  return (
    <section className="bg-surface-panel py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <ol className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="reveal group fill-hover rounded-[1.75rem] bg-white p-7 ring-1 ring-border-subtle transition-[transform,box-shadow] duration-500 ease-out-quart [--fill:var(--color-blush)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(24,24,27,0.35)] sm:p-9"
            >
              <span className="font-mono text-xs text-brand">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{item.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-text-secondary">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

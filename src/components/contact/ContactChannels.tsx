import Link from 'next/link'
import { CONTACT_COPY, CONTACT_EMAILS } from '@/lib/constants/contact'
import { ButtonArrow, buttonClasses } from '../landing/ui/ButtonLink'

export function ContactChannels() {
  const { channels, faqCard } = CONTACT_COPY

  return (
    <div className="flex flex-col gap-4">
      {channels.map((channel) => {
        const address = CONTACT_EMAILS[channel.topic]

        return (
          <a
            key={channel.topic}
            href={`mailto:${address}`}
            className="group fill-hover rounded-[1.75rem] bg-surface-panel p-6 transition-transform duration-500 ease-out-quart [--fill:var(--color-blush)] hover:-translate-y-1 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">{channel.title}</h3>
              <span
                aria-hidden="true"
                className="text-xl text-text-subtle transition-[transform,color] duration-500 ease-out-quart group-hover:translate-x-1 group-hover:text-brand"
              >
                →
              </span>
            </div>
            <p className="mt-2 leading-relaxed text-text-secondary">{channel.body}</p>
            <p className="mt-4 font-mono text-sm text-brand">{address}</p>
          </a>
        )
      })}

      <div className="selection-inverse rounded-[1.75rem] bg-ink p-6 text-white sm:p-7">
        <h3 className="font-display text-xl font-bold tracking-tight">{faqCard.title}</h3>
        <p className="mt-2 leading-relaxed text-white/70">{faqCard.body}</p>
        <Link
          href={faqCard.href}
          className={`${buttonClasses('light', 'md')} mt-5 [--fill:var(--color-brand)]!`}
        >
          {faqCard.cta}
          <ButtonArrow />
        </Link>
      </div>
    </div>
  )
}

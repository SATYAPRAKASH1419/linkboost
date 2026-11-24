import { LANDING_COPY } from '@/lib/constants/landing'
import { ClaimLinkForm } from './ClaimLinkForm'
import { Container } from './ui/Container'

export function FinalCta() {
  const { title, body } = LANDING_COPY.finalCta

  return (
    <section className="selection-inverse bg-brand py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-4xl font-display text-[clamp(2.75rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-white">
          {title}
        </h2>
        <p className="mt-6 text-lg text-white/85">{body}</p>
        <div className="mt-10 flex w-full justify-center">
          <ClaimLinkForm buttonVariant="ink" />
        </div>
      </Container>
    </section>
  )
}

import Image from 'next/image'
import { LANDING_COPY } from '@/lib/constants/landing'
import { ClaimLinkForm } from './ClaimLinkForm'
import { LeadNotification } from './mockups/LeadNotification'
import { ReelComments } from './mockups/ReelComments'
import { Container } from './ui/Container'

export function Hero() {
  const { eyebrow, titleLines, lead, microcopy, image } = LANDING_COPY.hero

  return (
    <section className="pb-16 pt-10 sm:pt-16 lg:pb-24">
      <Container>
        <p className="animate-rise font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
        <h1 className="mt-5 animate-rise font-display text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-ink [animation-delay:100ms]">
          <span className="block">{titleLines[0]}</span>
          <span className="block text-brand">{titleLines[1]}</span>
        </h1>
      </Container>

      <Container className="mt-10 sm:mt-14">
        <div className="grid animate-rise grid-cols-1 overflow-hidden rounded-[2rem] bg-blush [animation-delay:200ms] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8 p-7 sm:p-10 lg:p-12">
            <p className="max-w-xl text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">{lead}</p>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-text-secondary">{microcopy}</p>
              <ClaimLinkForm />
            </div>
          </div>

          <div className="relative min-h-[37rem] sm:min-h-[38rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-x-4 top-4 flex justify-end sm:inset-x-6 sm:top-6">
              <div className="w-full max-w-[22rem] animate-rise [animation-delay:900ms]">
                <LeadNotification />
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex justify-center sm:inset-x-6 sm:bottom-6 lg:justify-start">
              <ReelComments />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

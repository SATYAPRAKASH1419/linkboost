import type { Metadata } from 'next'
import { ContactChannels } from '@/components/contact/ContactChannels'
import { ContactForm } from '@/components/contact/ContactForm'
import { Container } from '@/components/landing/ui/Container'
import { PageHero } from '@/components/landing/ui/PageHero'
import { CONTACT_COPY } from '@/lib/constants/contact'

export const metadata: Metadata = CONTACT_COPY.meta

export default function ContactPage() {
  const { eyebrow, title, lead } = CONTACT_COPY.hero

  return (
    <>
      <PageHero eyebrow={eyebrow} titleLines={[title]} lead={lead} />
      <section className="pb-20 sm:pb-28">
        <Container className="grid animate-rise gap-5 [animation-delay:300ms] lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          <ContactForm />
          <ContactChannels />
        </Container>
      </section>
    </>
  )
}

import { AudienceGrid } from '@/components/landing/AudienceGrid'
import { CreatorMarquee } from '@/components/landing/CreatorMarquee'
import { Faq } from '@/components/landing/Faq'
import { FeatureSections } from '@/components/landing/FeatureSections'
import { FinalCta } from '@/components/landing/FinalCta'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PlatformsSection } from '@/components/landing/PlatformsSection'
import { Pricing } from '@/components/landing/Pricing'
import { Testimonials } from '@/components/landing/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <CreatorMarquee />
      <AudienceGrid />
      <PlatformsSection />
      <HowItWorks />
      <FeatureSections />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}

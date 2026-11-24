import type { Metadata } from 'next'
import { AboutFacts } from '@/components/about/AboutFacts'
import { AboutGallery } from '@/components/about/AboutGallery'
import { AboutRoadmap } from '@/components/about/AboutRoadmap'
import { AboutStory } from '@/components/about/AboutStory'
import { AboutValues } from '@/components/about/AboutValues'
import { FinalCta } from '@/components/landing/FinalCta'
import { PageHero } from '@/components/landing/ui/PageHero'
import { ABOUT_COPY } from '@/lib/constants/about'

export const metadata: Metadata = ABOUT_COPY.meta

export default function AboutPage() {
  return (
    <>
      <PageHero {...ABOUT_COPY.hero} />
      <AboutGallery />
      <AboutStory />
      <AboutFacts />
      <AboutValues />
      <AboutRoadmap />
      <FinalCta />
    </>
  )
}

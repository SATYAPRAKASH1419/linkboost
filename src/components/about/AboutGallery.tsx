import Image from 'next/image'
import { ABOUT_COPY } from '@/lib/constants/about'
import { Container } from '../landing/ui/Container'

export function AboutGallery() {
  return (
    <Container>
      <ul className="grid animate-rise grid-cols-1 gap-4 [animation-delay:300ms] sm:grid-cols-3 sm:gap-5">
        {ABOUT_COPY.gallery.map((image, index) => (
          <li
            key={image.src}
            className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] sm:aspect-[3/4] ${index === 1 ? 'sm:translate-y-10' : ''}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 font-mono text-xs font-medium text-ink backdrop-blur">
              {image.label}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  )
}

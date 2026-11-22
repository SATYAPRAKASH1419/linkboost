import Image from 'next/image'
import { AUTH_COPY } from '@/lib/constants/auth'

export function AuthHeroShowcase() {
  return (
    <section className="hidden lg:block lg:w-1/2 h-full relative border-r border-zinc-200 overflow-hidden bg-[#FAF9F5]">
      {/* 100% Full Edge-to-Edge Storefront Graphic */}
      <Image
        src={AUTH_COPY.hero.imageSrc}
        alt={AUTH_COPY.hero.imageAlt}
        fill
        className="object-cover object-center select-none pointer-events-none"
        priority
        sizes="50vw"
      />

      {/* Floating Value Card Centered at Bottom */}
      <div className="absolute bottom-8 left-8 right-8 z-10 py-4 px-6 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-2xl text-white flex flex-col items-center text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E23744]/20 border border-[#E23744]/30 text-[#ff6b77] text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E23744] animate-pulse" />
          {AUTH_COPY.hero.badge}
        </div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
          {AUTH_COPY.hero.title}
        </h2>
      </div>
    </section>
  )
}

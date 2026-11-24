import Image from 'next/image'
import { siSpotify } from 'simple-icons'
import { BrandIcon, PlatformIcon, type PlatformKey } from '../ui/PlatformIcon'

const SOCIALS: PlatformKey[] = ['instagram', 'youtube', 'x', 'spotify', 'whatsapp']

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[12px] font-semibold text-ink">
      <span>9:41</span>
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.7" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.7" />
          <rect x="10" y="3" width="3" height="9" rx="0.7" />
          <rect x="15" y="0" width="3" height="12" rx="0.7" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 0 0 8 4c-1.8 0-3.4.7-4.6 1.8l1.2 1.3A4.9 4.9 0 0 1 8 5.8zm0 3.5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
        </svg>
        <span className="relative flex h-3 w-6 items-center rounded-[4px] border border-ink/40 p-[1.5px]">
          <span className="h-full w-[78%] rounded-[2px] bg-ink" />
          <span className="absolute -right-[3px] h-1.5 w-[2px] rounded-r bg-ink/40" />
        </span>
      </span>
    </div>
  )
}

function PdfThumb() {
  return (
    <span className="flex h-11 w-9 shrink-0 flex-col gap-1 rounded-[5px] bg-white/95 p-1.5" aria-hidden="true">
      <span className="h-1 w-5 rounded-full bg-brand" />
      <span className="h-0.5 w-full rounded-full bg-border-default" />
      <span className="h-0.5 w-4 rounded-full bg-border-default" />
      <span className="mt-auto h-3 w-full rounded-[2px] bg-blush" />
    </span>
  )
}

export function CreatorPagePhone() {
  return (
    <div className="w-[17.5rem] rounded-[3rem] bg-ink p-[9px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_30px_60px_-30px_rgba(24,24,27,0.6)] sm:w-[19rem]">
      <div className="relative overflow-hidden rounded-[2.45rem] bg-[#FBFAF8]">
        <span aria-hidden="true" className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <StatusBar />

        <div className="px-4 pb-3 pt-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/landing/creator-nutrition.jpg"
              alt=""
              width={68}
              height={68}
              className="h-[68px] w-[68px] rounded-full object-cover"
            />
            <p className="mt-2.5 font-display text-[17px] font-bold tracking-tight text-ink">Ananya Rao</p>
            <p className="mt-0.5 max-w-[14rem] text-[11.5px] leading-snug text-text-muted">
              Nutrition coach in Bengaluru. Meal prep that fits a busy week.
            </p>
            <ul aria-label="Social links" className="mt-3 flex gap-3.5 text-ink/80">
              {SOCIALS.map((platform) => (
                <li key={platform}>
                  <PlatformIcon platform={platform} color="current" className="h-[15px] w-[15px]" />
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-5 space-y-2">
            <li className="flex items-center gap-3 rounded-xl bg-brand p-2 pr-3 text-white">
              <PdfThumb />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">7-Day Meal Prep Guide</span>
                <span className="block text-[11px] text-white/75">Free PDF · 24 pages</span>
              </span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">FREE</span>
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white p-2 pr-3 text-ink ring-1 ring-black/5">
              <Image
                src="/landing/creator-nutrition.jpg"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-[7px] object-cover object-[50%_70%]"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">High-Protein Recipes eBook</span>
                <span className="block text-[11px] text-text-muted">42 recipes · pay via UPI</span>
              </span>
              <span className="text-[12px] font-bold">₹299</span>
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white p-2 pr-3 text-ink ring-1 ring-black/5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[7px] bg-blush text-[18px]" aria-hidden="true">
                🗓️
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">1:1 Nutrition Call</span>
                <span className="block text-[11px] text-text-muted">30 min · next slot Thu</span>
              </span>
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white p-2 pr-3 text-ink ring-1 ring-black/5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[7px] bg-[#191414]">
                <BrandIcon icon={siSpotify} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">Ep. 12: Protein myths</span>
                <span className="block text-[11px] text-text-muted">Eat Smart Podcast · 38 min</span>
              </span>
            </li>
          </ul>

          <p className="mt-4 text-center text-[10px] text-text-subtle">Made with LinkBoost</p>
        </div>

        <div className="border-t border-black/5 bg-white/90 px-4 pb-4 pt-2.5">
          <div className="flex items-center justify-center gap-1.5 rounded-[0.7rem] bg-black/[0.05] py-2 text-[12px] text-ink">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-text-muted" fill="currentColor" aria-hidden="true">
              <path d="M17 10V7A5 5 0 0 0 7 7v3H5v12h14V10h-2zM9 7a3 3 0 0 1 6 0v3H9V7z" />
            </svg>
            linkboost.bio/ananya
          </div>
          <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-28 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  )
}

/** iOS-style stacked push notifications: the moment a viewer becomes a lead */
export function LeadNotification() {
  return (
    <div className="relative w-full max-w-[22rem] pb-2">
      <div aria-hidden="true" className="absolute inset-x-3 bottom-0 h-8 rounded-[1.1rem] bg-white/55 backdrop-blur-xl" />
      <div className="relative flex gap-3 rounded-[1.35rem] bg-white/85 px-3.5 py-3 text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.6rem] bg-brand font-display text-base font-black text-white">
          L
        </span>
        <div className="min-w-0 flex-1 text-[13px] leading-snug">
          <p className="flex justify-between gap-2">
            <span className="font-semibold">New lead · ig-reel-meal-prep</span>
            <span className="shrink-0 text-text-muted">now</span>
          </p>
          <p className="mt-0.5 text-text-secondary">neha.s@gmail.com unlocked “7-Day Meal Prep Guide”</p>
        </div>
      </div>
    </div>
  )
}

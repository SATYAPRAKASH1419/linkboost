import { LANDING_COPY } from '@/lib/constants/landing'
import { PlatformIcon, type PlatformKey } from '../ui/PlatformIcon'

type EventKind = 'sale' | 'lead' | 'click'

const EVENTS: { platform: PlatformKey; tag: string; kind: EventKind; label: string }[] = [
  { platform: 'youtube', tag: 'yt-review', kind: 'sale', label: '₹499 sale' },
  { platform: 'instagram', tag: 'ig-reel-meal-prep', kind: 'lead', label: 'New lead' },
  { platform: 'spotify', tag: 'spotify-ep-12', kind: 'click', label: 'Link click' },
  { platform: 'whatsapp', tag: 'wa-status-diwali', kind: 'sale', label: '₹299 sale' },
  { platform: 'x', tag: 'x-thread-macros', kind: 'lead', label: 'New lead' },
  { platform: 'telegram', tag: 'tg-channel-pin', kind: 'click', label: 'Link click' },
  { platform: 'substack', tag: 'substack-weekly', kind: 'lead', label: 'PDF unlocked' },
  { platform: 'threads', tag: 'threads-qna', kind: 'click', label: 'Link click' },
]

const KIND_STYLES: Record<EventKind, string> = {
  sale: 'bg-emerald-400/15 text-emerald-300',
  lead: 'bg-brand/20 text-blush-strong',
  click: 'bg-white/10 text-white/60',
}

/** Decorative auto-scrolling feed of incoming events, tagged by source */
export function SourceFeedCard() {
  return (
    <div aria-hidden="true" className="w-full max-w-md rounded-2xl bg-ink-soft p-5 ring-1 ring-white/10 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold tracking-tight text-white">{LANDING_COPY.platforms.feedTitle}</p>
        <span className="flex items-center gap-2 font-mono text-xs text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          live
        </span>
      </div>

      <div className="mt-4 h-60 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        <ul className="animate-ticker hover:[animation-play-state:paused]">
          {[...EVENTS, ...EVENTS].map((event, index) => (
            <li key={`${index}-${event.tag}`} className="flex items-center justify-between gap-3 border-b border-white/5 py-3">
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <PlatformIcon platform={event.platform} className="h-4 w-4" />
                </span>
                <span className="truncate font-mono text-sm text-white/80">{event.tag}</span>
              </span>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${KIND_STYLES[event.kind]}`}>
                {event.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

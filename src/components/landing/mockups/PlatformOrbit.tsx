import { LANDING_COPY } from '@/lib/constants/landing'
import { PLATFORM_ICONS, PlatformIcon, type PlatformKey } from '../ui/PlatformIcon'

type OrbitItem = { platform: PlatformKey; where: string }

interface Ring {
  items: readonly OrbitItem[]
  /** Distance from the center, as % of the orbit's width */
  radius: number
  /** Seconds per full turn; the inner ring spins the other way */
  duration: number
  reverse?: boolean
}

const PLATFORMS = LANDING_COPY.platforms.items

const RINGS: Ring[] = [
  { items: PLATFORMS.slice(0, 5), radius: 25, duration: 45, reverse: true },
  { items: PLATFORMS.slice(5), radius: 43, duration: 70 },
]

function pointOnCircle(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    left: `${(50 + radius * Math.cos(angle)).toFixed(3)}%`,
    top: `${(50 + radius * Math.sin(angle)).toFixed(3)}%`,
  }
}

export function PlatformOrbit() {
  const { hubLabel } = LANDING_COPY.platforms

  return (
    <div className="group/orbit relative mx-auto aspect-square w-full max-w-[34rem]">
      {RINGS.map((ring) => {
        const spin = {
          animationDuration: `${ring.duration}s`,
          animationDirection: ring.reverse ? 'reverse' : 'normal',
        }

        return (
          <div
            key={ring.radius}
            style={spin}
            className="absolute inset-0 animate-orbit group-hover/orbit:[animation-play-state:paused]"
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
              style={{ width: `${ring.radius * 2}%`, height: `${ring.radius * 2}%` }}
            />
            {/* Glowing "traffic" dots riding along the ring */}
            {[0.18, 0.68].map((position) => (
              <span
                key={position}
                aria-hidden="true"
                style={pointOnCircle(position * 100, 100, ring.radius)}
                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_4px_rgba(226,55,68,0.55)]"
              />
            ))}

            {ring.items.map((item, index) => (
              <div
                key={item.platform}
                style={pointOnCircle(index, ring.items.length, ring.radius)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  style={spin}
                  className="group/icon relative animate-orbit-counter group-hover/orbit:[animation-play-state:paused]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out-quart group-hover/icon:scale-115 sm:h-14 sm:w-14">
                    <PlatformIcon platform={item.platform} className="h-5 w-5 sm:h-7 sm:w-7" />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 hidden w-max -translate-x-1/2 translate-y-1 rounded-xl bg-white px-3 py-2 text-center opacity-0 shadow-xl transition-[opacity,translate] duration-300 ease-out-quart group-hover/icon:translate-y-0 group-hover/icon:opacity-100 lg:block">
                    <span className="block text-sm font-semibold text-ink">{PLATFORM_ICONS[item.platform].title}</span>
                    <span className="block font-mono text-[11px] text-text-muted">{item.where}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      })}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-20 w-20 items-center justify-center sm:h-28 sm:w-28">
          {[0, 1, 2].map((ring) => (
            <span
              key={ring}
              aria-hidden="true"
              style={{ animationDelay: `${ring}s` }}
              className="absolute inset-0 animate-pulse-ring rounded-full bg-brand"
            />
          ))}
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-brand font-display text-3xl font-black text-white shadow-[0_0_60px_-5px_rgba(226,55,68,0.8)] sm:text-5xl">
            L
          </span>
        </div>
        <span className="absolute left-1/2 top-full mt-3 hidden -translate-x-1/2 whitespace-nowrap sm:block rounded-full bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-ink sm:text-xs">
          {hubLabel}
        </span>
      </div>
    </div>
  )
}

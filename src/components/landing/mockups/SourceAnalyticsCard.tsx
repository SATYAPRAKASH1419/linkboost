import { PlatformIcon, type PlatformKey } from '../ui/PlatformIcon'

const SOURCES: { platform: PlatformKey; tag: string; views: string; clicks: string; leads: number }[] = [
  { platform: 'instagram', tag: 'ig-reel-meal-prep', views: '4,812', clicks: '1,203', leads: 412 },
  { platform: 'youtube', tag: 'yt-protein-myths', views: '2,964', clicks: '688', leads: 238 },
  { platform: 'spotify', tag: 'spotify-ep-12', views: '1,377', clicks: '402', leads: 121 },
  { platform: 'x', tag: 'x-thread-macros', views: '905', clicks: '211', leads: 64 },
]

const MAX_LEADS = Math.max(...SOURCES.map((source) => source.leads))
const RANGES = ['7d', '30d', '90d']

/** Analytics panel: per-source table with views, clicks and leads */
export function SourceAnalyticsCard() {
  return (
    <div className="elevate w-full max-w-md overflow-hidden rounded-2xl bg-white text-ink">
      <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
        <div>
          <p className="text-sm font-semibold">Sources</p>
          <p className="mt-0.5 text-xs text-text-muted">
            835 leads · <span className="font-medium text-emerald-700">+38%</span> vs previous 30 days
          </p>
        </div>
        <div className="flex shrink-0 rounded-lg bg-surface-panel p-0.5 text-[11px] font-semibold">
          {RANGES.map((range) => (
            <span
              key={range}
              className={`rounded-md px-2 py-1 ${range === '30d' ? 'bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-text-muted'}`}
            >
              {range}
            </span>
          ))}
        </div>
      </div>

      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-y border-border-subtle bg-surface-panel/60 text-[11px] uppercase tracking-wide text-text-muted">
            <th className="px-4 py-2 text-left font-medium sm:px-5">Source</th>
            <th className="hidden py-2 text-right font-medium min-[420px]:table-cell">Views</th>
            <th className="hidden py-2 pl-3 text-right font-medium min-[420px]:table-cell">Clicks</th>
            <th className="px-4 py-2 text-right font-medium sm:px-5">Leads</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {SOURCES.map((source) => (
            <tr key={source.tag}>
              <td className="max-w-0 px-4 py-3 sm:px-5">
                <span className="flex items-center gap-2">
                  <PlatformIcon platform={source.platform} className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate font-mono text-[12px]">{source.tag}</span>
                </span>
              </td>
              <td className="hidden py-3 text-right tabular-nums text-text-secondary min-[420px]:table-cell">{source.views}</td>
              <td className="hidden py-3 pl-3 text-right tabular-nums text-text-secondary min-[420px]:table-cell">{source.clicks}</td>
              <td className="px-4 py-3 sm:px-5">
                <span className="flex items-center justify-end gap-2">
                  <span className="hidden h-1.5 w-10 overflow-hidden rounded-full bg-surface-subtle sm:block" aria-hidden="true">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${(source.leads / MAX_LEADS) * 100}%` }} />
                  </span>
                  <span className="w-8 text-right font-semibold tabular-nums">{source.leads}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

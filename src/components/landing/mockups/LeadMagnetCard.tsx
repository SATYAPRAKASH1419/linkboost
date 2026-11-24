const LEADS = [
  { contact: 'priya.s@gmail.com', source: 'ig-reel-budget', time: '2m' },
  { contact: 'arjun.k@outlook.com', source: 'yt-review', time: '9m' },
  { contact: '+91 98••• ••210', source: 'wa-status', time: '17m' },
  { contact: 'neha@studio.in', source: 'newsletter', time: '41m' },
]

/** Dashboard panel for one gated PDF: file, unlocks and the latest leads */
export function LeadMagnetCard() {
  return (
    <div className="elevate w-full max-w-md overflow-hidden rounded-2xl bg-white text-ink">
      <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3.5 sm:px-5">
        <span className="flex h-10 w-8 shrink-0 items-end justify-center rounded-[4px] bg-blush pb-1 font-mono text-[8px] font-bold text-brand ring-1 ring-brand/15" aria-hidden="true">
          PDF
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">budget-planner-2026.pdf</p>
          <p className="text-xs text-text-muted">2.4 MB · 1,284 unlocks</p>
        </div>
        <span className="shrink-0 rounded-lg border border-border-default px-2.5 py-1.5 text-xs font-semibold text-text-secondary">
          Export CSV
        </span>
      </div>

      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-text-muted">
            <th className="px-4 pb-1.5 pt-3 font-medium sm:px-5">Lead</th>
            <th className="hidden pb-1.5 pt-3 font-medium min-[420px]:table-cell">Source</th>
            <th className="px-4 pb-1.5 pt-3 text-right font-medium sm:px-5">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {LEADS.map((lead) => (
            <tr key={lead.contact}>
              <td className="max-w-0 truncate px-4 py-2.5 font-mono text-[12px] sm:px-5">{lead.contact}</td>
              <td className="hidden py-2.5 min-[420px]:table-cell">
                <span className="rounded-md bg-surface-panel px-1.5 py-0.5 font-mono text-[11px] text-text-secondary">{lead.source}</span>
              </td>
              <td className="px-4 py-2.5 text-right text-text-muted sm:px-5">{lead.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-border-subtle bg-surface-panel/60 px-4 py-2.5 text-xs text-text-muted sm:px-5">
        <span>Private file · signed links only</span>
        <span className="font-mono text-emerald-700">link expires 14:52</span>
      </div>
    </div>
  )
}

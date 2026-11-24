'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LANDING_COPY, LANDING_NAV } from '@/lib/constants/landing'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-panel"
      >
        <span className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ease-out-quart ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ease-out-quart ${open ? 'top-1.5 -rotate-45' : 'top-2.5'}`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        className={`absolute inset-x-3 top-[5.25rem] grid rounded-3xl bg-white shadow-[0_24px_48px_-24px_rgba(24,24,27,0.4)] ring-1 ring-border-subtle transition-[grid-template-rows,opacity] duration-400 ease-out-quart sm:inset-x-6 ${open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 p-3">
            {LANDING_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="fill-hover block rounded-2xl px-4 py-3 text-lg font-medium text-ink [--fill:var(--color-blush)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-border-subtle pt-3">
              <Link
                href={LANDING_COPY.header.login.href}
                onClick={close}
                className="fill-hover block rounded-2xl px-4 py-3 text-lg font-medium text-ink [--fill:var(--color-blush)]"
              >
                {LANDING_COPY.header.login.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

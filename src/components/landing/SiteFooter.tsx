import Link from 'next/link'
import { LANDING_COPY } from '@/lib/constants/landing'
import { Logo } from './Logo'
import { Container } from './ui/Container'

export function SiteFooter() {
  const { tagline, columns, legal } = LANDING_COPY.footer

  return (
    <footer className="selection-inverse bg-ink py-16 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-12">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-white/60">{tagline}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="link-underline text-white/80 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row">
          <p>© LinkBoost</p>
          <p>{legal}</p>
        </div>
      </Container>
    </footer>
  )
}

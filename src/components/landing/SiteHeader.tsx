import Link from 'next/link'
import { LANDING_COPY, LANDING_NAV } from '@/lib/constants/landing'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ButtonLink } from './ui/ButtonLink'

export function SiteHeader() {
  const { login, signup } = LANDING_COPY.header

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full bg-white/85 pl-5 pr-2 shadow-[0_10px_30px_-18px_rgba(24,24,27,0.35)] ring-1 ring-border-subtle backdrop-blur-xl sm:pl-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {LANDING_NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="fill-hover block rounded-full px-4 py-2 text-[15px] text-text-secondary transition-colors duration-300 ease-out-quart [--fill:var(--color-blush)] hover:text-wine"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            href={login.href}
            className="fill-hover hidden rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors duration-300 ease-out-quart [--fill:var(--color-surface-subtle)] sm:block"
          >
            {login.label}
          </Link>
          <ButtonLink href={signup.href} variant="ink" className="[--fill:var(--color-brand)]!">
            {signup.label}
          </ButtonLink>
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

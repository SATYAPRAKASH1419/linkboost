import Link from 'next/link'

interface LogoProps {
  tone?: 'dark' | 'light'
}

export function Logo({ tone = 'dark' }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="LinkBoost home">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
        L
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${tone === 'dark' ? 'text-ink' : 'text-white'}`}
      >
        LinkBoost
      </span>
    </Link>
  )
}

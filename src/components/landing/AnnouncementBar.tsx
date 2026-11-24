import Link from 'next/link'
import { LANDING_COPY } from '@/lib/constants/landing'

export function AnnouncementBar() {
  const { text, cta, href } = LANDING_COPY.announcement

  return (
    <div className="selection-inverse bg-wine px-5 py-2.5 text-center text-sm text-blush">
      {text}{' '}
      <Link href={href} className="link-underline font-semibold text-white hover:text-blush-strong">
        {cta}
      </Link>
    </div>
  )
}

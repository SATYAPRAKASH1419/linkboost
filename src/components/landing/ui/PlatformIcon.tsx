import {
  siDiscord,
  siFacebook,
  siInstagram,
  siPinterest,
  siSpotify,
  siSubstack,
  siTelegram,
  siThreads,
  siTwitch,
  siWhatsapp,
  siX,
  siYoutube,
  type SimpleIcon,
} from 'simple-icons'

export const PLATFORM_ICONS = {
  instagram: siInstagram,
  youtube: siYoutube,
  x: siX,
  spotify: siSpotify,
  whatsapp: siWhatsapp,
  threads: siThreads,
  facebook: siFacebook,
  telegram: siTelegram,
  discord: siDiscord,
  twitch: siTwitch,
  pinterest: siPinterest,
  substack: siSubstack,
} satisfies Record<string, SimpleIcon>

export type PlatformKey = keyof typeof PLATFORM_ICONS

type PlatformIconProps = {
  platform: PlatformKey
  /** `brand` uses the official color; `current` inherits the text color */
  color?: 'brand' | 'current'
  className?: string
}

export function PlatformIcon({ platform, ...rest }: PlatformIconProps) {
  return <BrandIcon icon={PLATFORM_ICONS[platform]} {...rest} />
}

type BrandIconProps = Omit<PlatformIconProps, 'platform'> & { icon: SimpleIcon }

/** Renders any simple-icons logo */
export function BrandIcon({ icon, color = 'brand', className = 'h-5 w-5' }: BrandIconProps) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className={className}
      fill={color === 'brand' ? `#${icon.hex}` : 'currentColor'}
    >
      <path d={icon.path} />
    </svg>
  )
}

import Link from 'next/link'

type ButtonVariant = 'brand' | 'ink' | 'light' | 'outline'
type ButtonSize = 'md' | 'lg'

/** `--fill` is the color that rises through the button on hover (see `fill-hover` in globals.css) */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  brand: 'bg-brand text-white [--fill:var(--color-ink)]',
  ink: 'bg-ink text-white [--fill:var(--color-wine)]',
  light: 'bg-white text-ink [--fill:var(--color-ink)] hover:text-white',
  outline: 'border border-current/25 text-current [--fill:var(--color-ink)] hover:border-ink hover:text-white',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

export const buttonBaseClasses =
  'group fill-hover inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,color,border-color] duration-300 ease-out-quart active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export function buttonClasses(variant: ButtonVariant = 'brand', size: ButtonSize = 'md') {
  return `${buttonBaseClasses} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`
}

/** Arrow that nudges forward when its parent `group` button is hovered */
export function ButtonArrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-500 ease-out-quart group-hover:translate-x-1">
      →
    </span>
  )
}

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function ButtonLink({ href, children, variant = 'brand', size = 'md', className = '' }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonClasses(variant, size)} ${className}`}>
      {children}
    </Link>
  )
}

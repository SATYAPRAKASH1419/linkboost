interface SectionHeadingProps {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
  eyebrowClassName?: string
  titleClassName?: string
}

export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  eyebrowClassName = 'text-brand',
  titleClassName = 'text-ink',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'items-start'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <p className={`font-mono text-xs font-medium uppercase tracking-[0.2em] ${eyebrowClassName}`}>{eyebrow}</p>
      <h2
        className={`font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl ${titleClassName}`}
      >
        {title}
      </h2>
    </div>
  )
}

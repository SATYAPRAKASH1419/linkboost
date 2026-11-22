interface BrandHeaderProps {
  className?: string
}

export function BrandHeader({ className = 'mb-4' }: BrandHeaderProps) {
  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#E23744] flex items-center justify-center font-bold text-white text-sm shadow-sm shadow-[#E23744]/20">
          L
        </div>
        <span className="font-bold text-lg tracking-tight text-zinc-950">LinkBoost</span>
      </div>
    </div>
  )
}

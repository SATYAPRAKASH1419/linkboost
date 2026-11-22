interface AuthDividerProps {
  label?: string
}

export function AuthDivider({ label = 'or with' }: AuthDividerProps) {
  return (
    <div className="relative my-4 flex items-center">
      <div className="w-full border-t border-zinc-200/80" />
      <span className="px-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-white shrink-0">
        {label}
      </span>
      <div className="w-full border-t border-zinc-200/80" />
    </div>
  )
}

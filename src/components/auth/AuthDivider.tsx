interface AuthDividerProps {
  label?: string
}

export function AuthDivider({ label = 'or with email' }: AuthDividerProps) {
  return (
    <div className="relative my-5 flex items-center">
      <div className="w-full border-t border-zinc-200" />
      <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-white shrink-0">
        {label}
      </span>
      <div className="w-full border-t border-zinc-200" />
    </div>
  )
}

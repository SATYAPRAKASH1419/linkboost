interface Comment {
  handle: string
  initials: string
  avatar: string
  text: string
  time: string
  likes?: number
  isAuthor?: boolean
  isReply?: boolean
}

const COMMENTS: Comment[] = [
  { handle: 'neha.fitlife', initials: 'N', avatar: 'bg-amber-200 text-amber-900', text: 'GUIDE 🙌 need this before Monday', time: '4m', likes: 12 },
  { handle: 'ananya.eats', initials: 'A', avatar: 'bg-blush-strong text-wine', text: 'Done! First button in my bio 💌', time: '3m', isAuthor: true, isReply: true },
  { handle: 'rahul.lifts', initials: 'R', avatar: 'bg-sky-200 text-sky-900', text: 'GUIDE', time: '9m', likes: 3 },
]

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  )
}

/** Instagram-style comments sheet: viewers asking for the freebie under a reel */
export function ReelComments() {
  return (
    <div className="elevate w-full max-w-[22rem] rounded-t-[1.25rem] rounded-b-xl bg-white pb-3 text-ink">
      <div className="flex flex-col items-center border-b border-border-subtle pb-2.5 pt-2">
        <span className="h-1 w-9 rounded-full bg-border-default" />
        <p className="mt-2 text-[13px] font-semibold">Comments</p>
      </div>

      <ul className="space-y-3.5 px-4 pt-3.5">
        {COMMENTS.map((comment) => (
          <li key={comment.handle} className={`flex gap-2.5 ${comment.isReply ? 'pl-10' : ''}`}>
            <span
              className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${comment.avatar} ${comment.isReply ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs'}`}
            >
              {comment.initials}
            </span>
            <div className="min-w-0 flex-1 text-[13px] leading-snug">
              <p>
                <span className="font-semibold">{comment.handle}</span>
                <span className="ml-1.5 text-text-muted">{comment.time}</span>
                {comment.isAuthor ? <span className="ml-1.5 text-text-muted">· Author</span> : null}
              </p>
              <p className="mt-0.5">{comment.text}</p>
              <p className="mt-1 text-xs font-medium text-text-muted">Reply</p>
            </div>
            <span className="flex flex-col items-center gap-0.5 pt-1 text-text-subtle">
              <HeartIcon />
              {comment.likes ? <span className="text-[10px]">{comment.likes}</span> : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="mx-3 mt-3.5 flex items-center gap-2 rounded-full border border-border-default px-3.5 py-2">
        <span className="flex-1 text-[13px] text-text-subtle">Add a comment for ananya.eats…</span>
        <span className="text-[13px] font-semibold text-sky-600/50">Post</span>
      </div>
    </div>
  )
}

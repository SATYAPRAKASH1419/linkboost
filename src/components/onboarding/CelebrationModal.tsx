'use client'

import React, { useState } from 'react'
import { VerifiedBadgeIcon } from './BrandIcons'

interface CelebrationModalProps {
  username: string
  onProceed: () => void
}

export function CelebrationModal({ username, onProceed }: CelebrationModalProps) {
  const [isCopied, setIsCopied] = useState(false)

  function copyPublicLink() {
    const link = `${window.location.origin}/u/${username.toLowerCase().trim() || 'me'}`
    navigator.clipboard.writeText(link)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-pop-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-zinc-100">
        <div className="w-14 h-14 mx-auto rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-3">
          <VerifiedBadgeIcon className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-1">
          You are officially live
        </h2>
        <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
          Your public creator page is configured and ready to capture leads and sales.
        </p>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 mb-5">
          <div className="text-left overflow-hidden mr-2">
            <span className="block text-[9px] uppercase font-bold text-zinc-400">Public Link</span>
            <span className="text-xs font-mono font-bold text-zinc-800 truncate block">
              linkboost.bio/{username.toLowerCase().trim() || 'you'}
            </span>
          </div>
          <button
            type="button"
            onClick={copyPublicLink}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-black active:scale-[0.96] text-white text-xs font-semibold shrink-0 cursor-pointer transition"
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <button
          type="button"
          onClick={onProceed}
          className="w-full h-11 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.96] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#E23744]/25 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Enter Creator Studio</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

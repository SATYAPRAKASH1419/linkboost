'use client'

import React, { useState, useRef, useEffect } from 'react'

export const CREATOR_CATEGORIES = [
  'Creator',
  'Tech & Dev',
  'Design',
  'Fitness & Health',
  'Startup & Business',
  'Music & Audio',
  'Education',
  'Other',
]

interface Step2ProfileProps {
  displayName: string
  setDisplayName: (val: string) => void
  bio: string
  setBio: (val: string) => void
  category: string
  setCategory: (val: string) => void
  keywords: string[]
  toggleKeyword: (kw: string) => void
  removeKeyword: (kw: string) => void
  customKeywordInput: string
  setCustomKeywordInput: (val: string) => void
  onAddCustomKeyword: (e: React.KeyboardEvent<HTMLInputElement>) => void
  presetKeywords: string[]
  isOAuthUser: boolean
  onNext: () => void
  onPrev: () => void
}

export function Step2Profile({
  displayName,
  setDisplayName,
  bio,
  setBio,
  category,
  setCategory,
  keywords,
  toggleKeyword,
  removeKeyword,
  customKeywordInput,
  setCustomKeywordInput,
  onAddCustomKeyword,
  presetKeywords,
  isOAuthUser,
  onNext,
  onPrev,
}: Step2ProfileProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)

  // Close custom dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="space-y-3.5 animate-slide-down-fade">
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
          Tell the world who you are
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
          Configure your public identity and core topics.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Display Name */}
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Alex Morgan"
              maxLength={40}
              className="w-full h-10 px-3 rounded-xl border border-zinc-300 text-xs font-medium text-zinc-900 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/10 outline-none transition"
              autoFocus
            />
          </div>

          {/* Custom Polished Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`w-full h-10 px-3 rounded-xl border bg-white text-xs font-medium text-zinc-900 flex items-center justify-between transition-all cursor-pointer ${
                isCategoryOpen
                  ? 'border-[#E23744] ring-2 ring-[#E23744]/10'
                  : 'border-zinc-300 hover:border-zinc-400'
              }`}
            >
              <span>{category || 'Select category'}</span>
              <svg
                className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  isCategoryOpen ? 'rotate-180 text-[#E23744]' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Floating Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-zinc-200 rounded-xl shadow-lg shadow-zinc-900/10 p-1.5 animate-slide-down-fade max-h-48 overflow-y-auto">
                {CREATOR_CATEGORIES.map((cat) => {
                  const isSelected = category === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat)
                        setIsCategoryOpen(false)
                      }}
                      className={`w-full px-2.5 py-1.5 text-left text-xs font-medium rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#E23744]/10 text-[#E23744] font-semibold'
                          : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                    >
                      <span>{cat}</span>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-[#E23744]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-semibold text-zinc-700 uppercase tracking-wider">
              Bio / Headline
            </label>
            <span className="text-[10px] text-zinc-400 font-mono">{bio.length}/160</span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
            rows={2}
            placeholder="Building digital products & sharing daily tech tips."
            className="w-full p-2.5 rounded-xl border border-zinc-300 text-xs text-zinc-900 focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/10 outline-none transition resize-none"
          />
        </div>

        {/* Keywords */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-semibold text-zinc-700 uppercase tracking-wider">
              Keywords ({keywords.length}/6)
            </label>
            <span className="text-[10px] text-zinc-400">Click to select or remove</span>
          </div>

          {/* Preset tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {presetKeywords.map((kw) => {
              const isSelected = keywords.includes(kw)
              return (
                <button
                  key={kw}
                  type="button"
                  onClick={() => toggleKeyword(kw)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer active:scale-[0.96] flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#E23744] text-white border-[#E23744] shadow-2xs'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  <span>#{kw}</span>
                  {isSelected && <span className="text-[10px] opacity-80">✕</span>}
                </button>
              )
            })}
          </div>

          {/* Custom tag input */}
          <div className="flex gap-1.5">
            <input
              type="text"
              value={customKeywordInput}
              onChange={(e) => setCustomKeywordInput(e.target.value)}
              onKeyDown={onAddCustomKeyword}
              placeholder="Add custom keyword and press Enter..."
              className="flex-1 h-8.5 px-3 rounded-lg border border-zinc-200 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#E23744] outline-none"
            />
          </div>

          {/* Custom tags with explicit remove */}
          {keywords.filter((k) => !presetKeywords.includes(k)).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {keywords
                .filter((k) => !presetKeywords.includes(k))
                .map((customTag) => (
                  <span
                    key={customTag}
                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-800 text-white"
                  >
                    #{customTag}
                    <button
                      type="button"
                      onClick={() => removeKeyword(customTag)}
                      className="text-zinc-300 hover:text-white cursor-pointer ml-0.5"
                    >
                      ✕
                    </button>
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        {isOAuthUser && (
          <button
            type="button"
            onClick={onPrev}
            className="px-3.5 h-10 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="flex-1 h-10 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.96] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#E23744]/25 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Continue to Socials</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

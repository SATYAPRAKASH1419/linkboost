'use client'

import React from 'react'
import { UseUsernameAvailabilityReturn } from '@/lib/hooks/useUsernameAvailability'

interface Step1UsernameProps {
  username: string
  setUsername: (val: string) => void
  usernameCheck: UseUsernameAvailabilityReturn
  onNext: () => void
}

export function Step1Username({
  username,
  setUsername,
  usernameCheck,
  onNext,
}: Step1UsernameProps) {
  return (
    <div className="space-y-4 animate-slide-down-fade">
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
          Claim your unique link
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
          Your permanent public address for your social bios.
        </p>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
          Public Handle
        </label>
        <div
          className={`relative flex items-center h-11 w-full rounded-xl bg-zinc-50 border transition-all duration-150 ${
            usernameCheck.status === 'taken' || usernameCheck.status === 'error'
              ? 'border-red-400 bg-red-50/20 ring-2 ring-red-500/10'
              : usernameCheck.status === 'available'
              ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-500/10'
              : 'border-zinc-300 focus-within:border-[#E23744] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#E23744]/10'
          }`}
        >
          <span className="pl-3.5 pr-1 text-xs font-mono text-zinc-400 select-none">
            linkboost.bio/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              const clean = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
              setUsername(clean)
            }}
            placeholder="yourname"
            className="w-full h-full bg-transparent pr-12 text-xs font-semibold text-zinc-900 outline-none placeholder:text-zinc-400"
            autoFocus
          />

          <div className="absolute right-3 flex items-center">
            {usernameCheck.isChecking && (
              <svg className="w-3.5 h-3.5 text-zinc-400 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {usernameCheck.status === 'available' && (
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Available
              </span>
            )}
            {usernameCheck.status === 'taken' && (
              <span className="text-[11px] font-semibold text-red-600 bg-red-100/70 px-2 py-0.5 rounded-full">
                Taken
              </span>
            )}
          </div>
        </div>

        {usernameCheck.errorMessage && (
          <p className="mt-1.5 text-xs font-medium text-[#E23744]">
            {usernameCheck.errorMessage}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!usernameCheck.isAvailable || usernameCheck.isChecking}
        onClick={onNext}
        className="w-full h-11 mt-2 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.96] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#E23744]/25 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>Continue to Profile</span>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

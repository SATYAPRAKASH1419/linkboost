'use client'

import React from 'react'
import { SocialLinkItem } from '@/lib/types/onboarding'

interface PlatformMeta {
  platform: SocialLinkItem['platform']
  name: string
  placeholder: string
  icon: React.ComponentType<{ className?: string }>
  badgeColor: string
}

interface Step3SocialsProps {
  socialLinks: SocialLinkItem[]
  activePlatform: SocialLinkItem['platform']
  setActivePlatform: (p: SocialLinkItem['platform']) => void
  platforms: PlatformMeta[]
  onAddOrUpdateSocial: (p: SocialLinkItem['platform'], url: string) => void
  onRemoveSocial: (p: SocialLinkItem['platform']) => void
  onNext: () => void
  onPrev: () => void
}

export function Step3Socials({
  socialLinks,
  activePlatform,
  setActivePlatform,
  platforms,
  onAddOrUpdateSocial,
  onRemoveSocial,
  onNext,
  onPrev,
}: Step3SocialsProps) {
  const currentTarget = platforms.find((p) => p.platform === activePlatform)
  const currentUrl = socialLinks.find((s) => s.platform === activePlatform)?.url || ''
  const Icon = currentTarget?.icon

  return (
    <div className="space-y-3.5 animate-slide-down-fade">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
            Connect your socials
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
            Select a network to add your direct profile URL.
          </p>
        </div>
        <button
          type="button"
          onClick={onNext}
          className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 underline underline-offset-4 cursor-pointer"
        >
          Skip for now
        </button>
      </div>

      {/* Platform Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {platforms.map(({ platform, name, icon: PxIcon, badgeColor }) => {
          const hasLink = socialLinks.some((s) => s.platform === platform && Boolean(s.url))
          const isActive = activePlatform === platform
          return (
            <button
              key={platform}
              type="button"
              onClick={() => setActivePlatform(platform)}
              className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-[0.96] ${badgeColor} ${
                isActive
                  ? 'border-[#E23744] ring-2 ring-[#E23744]/15 bg-white text-zinc-900'
                  : hasLink
                  ? 'border-emerald-400 bg-emerald-50/40 text-emerald-800'
                  : 'border-zinc-200 bg-zinc-50/80 text-zinc-700'
              }`}
            >
              <PxIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{name}</span>
              {hasLink && <span className="ml-auto text-emerald-600 font-bold text-[10px]">Active</span>}
            </button>
          )
        })}
      </div>

      {/* Selected Platform Input Box */}
      {currentTarget && Icon && (
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5 animate-slide-down-fade">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
            <div className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              <span>{currentTarget.name} URL</span>
            </div>
            {currentUrl && (
              <button
                type="button"
                onClick={() => onRemoveSocial(currentTarget.platform)}
                className="text-[11px] text-red-500 hover:underline cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
          <input
            type="url"
            value={currentUrl}
            onChange={(e) => onAddOrUpdateSocial(currentTarget.platform, e.target.value)}
            placeholder={currentTarget.placeholder}
            className="w-full h-9 px-3 rounded-lg border border-zinc-300 bg-white text-xs text-zinc-900 outline-none focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/10 transition"
            autoFocus
          />
        </div>
      )}

      {/* Connected Channels Summary */}
      {socialLinks.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mr-1">
            Connected:
          </span>
          {socialLinks.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-medium capitalize"
            >
              {s.platform}
              <button
                type="button"
                onClick={() => onRemoveSocial(s.platform)}
                className="text-emerald-600 hover:text-emerald-900 ml-0.5"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onPrev}
          className="px-3.5 h-10 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 h-10 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.96] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#E23744]/25 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Continue to Store & Docs</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

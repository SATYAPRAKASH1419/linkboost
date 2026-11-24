'use client'

import React from 'react'
import { SocialLinkItem, StoreDocItem } from '@/lib/types/onboarding'
import {
  InstagramIcon,
  TwitterXIcon,
  YouTubeIcon,
  TikTokIcon,
  GitHubIcon,
  LinkedInIcon,
  SpotifyIcon,
  VerifiedBadgeIcon,
  ChainLinkIcon,
  HamburgerMenuIcon,
  PlusIcon,
  ShoppingBagFilledIcon,
  DocumentIcon,
  CalendarIcon,
  ProductIcon,
  AffiliateIcon,
  BeaconsLogoIcon,
  LinkExternalIcon,
} from './BrandIcons'

interface PhonePreviewProps {
  username: string
  displayName: string
  bio: string
  category?: string
  keywords: string[]
  socialLinks: SocialLinkItem[]
  storeItems: StoreDocItem[]
  currentStep: number
}

export function PhonePreview({
  username,
  displayName,
  bio,
  category,
  keywords,
  socialLinks,
  storeItems,
}: PhonePreviewProps) {
  // Live values as per what the user enters
  const hasUsername = Boolean(username.trim())
  const hasDisplayName = Boolean(displayName.trim())
  const hasBio = Boolean(bio.trim())
  const hasCategory = Boolean(category && category !== 'General' && category !== '')

  const activeName = hasDisplayName
    ? displayName.trim()
    : hasUsername
    ? `@${username.trim()}`
    : 'Your Name'

  const initial = (activeName.replace(/^@/, '')[0] || 'C').toUpperCase()
  const displayHandle = hasUsername ? `linkboost.bio/${username.trim()}` : 'linkboost.bio/yourhandle'

  return (
    <div className="relative flex items-center justify-center w-full select-none">
      {/* ============================================================== */}
      {/* PHYSICAL PHONE CHASSIS (Adaptive Height, No Overflow/Clipping) */}
      {/* ============================================================== */}
      <div className="relative aspect-[9/18.5] h-[min(540px,calc(100vh-90px))] bg-[#18181B] rounded-[44px] p-2.5 shadow-2xl border-4 border-zinc-700/80 ring-1 ring-zinc-500/30 transition-transform duration-300">
        
        {/* Dynamic Island Capsule */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 flex items-center justify-end px-2.5 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-zinc-900 ring-1 ring-zinc-800" />
        </div>

        {/* Outer Titanium Rim Buttons Silhouette */}
        <div className="absolute -left-[6px] top-20 w-[2px] h-7 bg-zinc-600 rounded-l-sm" />
        <div className="absolute -left-[6px] top-30 w-[2px] h-10 bg-zinc-600 rounded-l-sm" />
        <div className="absolute -left-[6px] top-43 w-[2px] h-10 bg-zinc-600 rounded-l-sm" />
        <div className="absolute -right-[6px] top-26 w-[2px] h-14 bg-zinc-600 rounded-r-sm" />

        {/* Screen Glass Surface (Warm Porcelain Tone: #FAF8F5) */}
        <div className="relative w-full h-full bg-[#FAF8F5] rounded-[34px] overflow-hidden flex flex-col justify-between pt-2 pb-2.5 px-3 border border-stone-200/60 shadow-inner">

          {/* 1. Top Status Bar: Time & Telephony Icons */}
          <div className="relative z-30 flex items-center justify-between px-2 pt-0.5 pb-1 text-zinc-900">
            <span className="text-[11px] font-bold tracking-tight">9:41</span>
            
            {/* Right Status Group: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-zinc-800">
              {/* Cellular Signal (4 bars) */}
              <div className="flex items-end gap-[1.5px] h-2.5">
                <div className="w-[2px] h-[3px] bg-zinc-800 rounded-[0.5px]" />
                <div className="w-[2px] h-[5px] bg-zinc-800 rounded-[0.5px]" />
                <div className="w-[2px] h-[7px] bg-zinc-800 rounded-[0.5px]" />
                <div className="w-[2px] h-[9px] bg-zinc-800 rounded-[0.5px]" />
              </div>

              {/* Wi-Fi Icon */}
              <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0012 4zm0 3.5c3.74 0 7.15 1.48 9.68 3.89L12 19.34 2.32 11.39C4.85 8.98 8.26 7.5 12 7.5z" />
              </svg>

              {/* Battery Capsule with charge */}
              <div className="flex items-center">
                <div className="w-5 h-2.5 border-[1.2px] border-zinc-800 rounded-[3px] p-[1px] flex items-center">
                  <div className="w-3.5 h-full bg-zinc-800 rounded-[1.5px]" />
                </div>
                <div className="w-[1px] h-1 bg-zinc-800 rounded-r-xs -ml-[0.5px]" />
              </div>
            </div>
          </div>

          {/* 2. In-App Navigation Bar (Chain Link on left, Hamburger Menu on right) */}
          <div className="flex items-center justify-between px-1.5 py-0.5">
            <button
              type="button"
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-800 hover:bg-black/5 transition-colors"
            >
              <ChainLinkIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-800 hover:bg-black/5 transition-colors"
            >
              <HamburgerMenuIcon className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Screen Scrollable Body - Renders User Items Live */}
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col items-center text-center px-1">
            
            {/* Creator Avatar with Pink Ring & Radiating Delight Ticks */}
            <div className="relative mt-1 mb-1.5 shrink-0">
              {/* Radiating Delight Spark Ticks at 2 o'clock - Rotated Clockwise with Extended Length */}
              <div className="absolute -top-2.5 -right-3 text-[#F26464] pointer-events-none select-none">
                <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 14L9 4M10 16L18 7M15 19L22 13"
                    stroke="#F26464"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Avatar Frame with Soft Pink Ring */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-1 bg-[#FCE7E7] shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border border-stone-100 flex items-center justify-center shadow-inner">
                  {hasDisplayName || hasUsername ? (
                    <div className="w-full h-full bg-gradient-to-tr from-[#E23744] via-[#CB202D] to-orange-400 flex items-center justify-center font-bold text-lg text-white">
                      {initial}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400">
                      <svg className="w-8 h-8 text-stone-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Display Name & Brand Red Verified Badge */}
            <div className="flex items-center justify-center gap-1 mb-0.5 max-w-[200px]">
              <h3 className={`font-bold text-[14px] sm:text-[15px] truncate tracking-tight ${hasDisplayName || hasUsername ? 'text-zinc-900' : 'text-zinc-400 font-normal italic'}`}>
                {activeName}
              </h3>
              {(hasDisplayName || hasUsername) && (
                <VerifiedBadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="#E23744" />
              )}
            </div>

            {/* Public Link / Vanity URL */}
            <span className="text-[10px] font-mono text-stone-400 mb-1 block">
              {displayHandle}
            </span>

            {/* Category Tag if selected */}
            {hasCategory && (
              <span className="inline-block text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-200/80 text-zinc-700 mb-1.5">
                {category}
              </span>
            )}

            {/* Bio / Headline */}
            {hasBio ? (
              <p className="text-[10px] sm:text-[11px] font-normal text-zinc-600 mb-2.5 max-w-[210px] leading-snug line-clamp-2 px-1">
                {bio}
              </p>
            ) : (
              <p className="text-[10px] text-stone-300 italic mb-2.5 max-w-[200px]">
                Your headline or bio will appear here
              </p>
            )}

            {/* Keyword chips (rendered as user adds / toggles them) */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mb-2.5 max-w-[210px]">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-zinc-700 border border-stone-200/60"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}

            {/* ============================================================== */}
            {/* SOCIAL SQUIRCLE ROW (Only appears as user adds them)           */}
            {/* ============================================================== */}
            <div className="w-full flex items-center justify-center gap-2 mb-3">
              {socialLinks.length > 0 ? (
                <>
                  {socialLinks.map((s) => {
                    return (
                      <div
                        key={s.id}
                        className="w-8 h-8 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex items-center justify-center hover:scale-105 transition-transform"
                        title={s.platform}
                      >
                        {s.platform === 'instagram' && (
                          <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white">
                            <InstagramIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'twitter' && (
                          <div className="w-full h-full rounded-xl bg-zinc-900 flex items-center justify-center text-white">
                            <TwitterXIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'youtube' && (
                          <div className="w-full h-full rounded-xl bg-[#FF0000] flex items-center justify-center text-white">
                            <YouTubeIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'tiktok' && (
                          <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-white">
                            <TikTokIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'github' && (
                          <div className="w-full h-full rounded-xl bg-zinc-800 flex items-center justify-center text-white">
                            <GitHubIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'linkedin' && (
                          <div className="w-full h-full rounded-xl bg-[#0A66C2] flex items-center justify-center text-white">
                            <LinkedInIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'spotify' && (
                          <div className="w-full h-full rounded-xl bg-[#1DB954] flex items-center justify-center text-white">
                            <SpotifyIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {s.platform === 'other' && (
                          <div className="w-full h-full rounded-xl bg-stone-100 flex items-center justify-center text-zinc-700">
                            <LinkExternalIcon className="w-4 h-4 text-zinc-700" />
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Plus Squircle tile indicating more can be added */}
                  {socialLinks.length < 5 && (
                    <div className="w-8 h-8 rounded-xl bg-[#EFEAE4] border border-stone-200/60 flex items-center justify-center text-zinc-700 shadow-2xs">
                      <PlusIcon className="w-3.5 h-3.5 text-zinc-700" />
                    </div>
                  )}
                </>
              ) : (
                /* Empty state when user hasn't added any socials yet */
                <div className="w-full max-w-[210px] py-1.5 px-3 rounded-xl border border-dashed border-stone-200/90 text-[10px] text-stone-400 flex items-center justify-center gap-1.5">
                  <PlusIcon className="w-3 h-3 text-stone-400" />
                  <span>Social icons appear here</span>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* FEATURED STORE & DOCUMENTS (Only appears as user adds them)    */}
            {/* ============================================================== */}
            <div className="w-full space-y-2 mt-0.5 text-left">
              {storeItems.length > 0 ? (
                storeItems.map((item, idx) => {
                  // Cycle aesthetic styling matching the bento cards
                  const cardThemes = [
                    {
                      bg: 'bg-[#18181B] text-white border-zinc-800',
                      subText: 'text-zinc-400',
                      badgeBg: 'bg-white/10 text-white',
                      icon: <ProductIcon className="w-3.5 h-3.5 text-white" />,
                      btnBg: 'bg-white/10 text-white hover:bg-white/20',
                    },
                    {
                      bg: 'bg-[#F3EFEA] text-zinc-900 border-stone-200/70',
                      subText: 'text-zinc-500',
                      badgeBg: 'bg-stone-200/70 text-zinc-800',
                      icon: <DocumentIcon className="w-3.5 h-3.5 text-zinc-800" />,
                      btnBg: 'bg-stone-200/70 text-zinc-800 hover:bg-stone-300',
                    },
                    {
                      bg: 'bg-[#FCEBE6] text-zinc-900 border-rose-200/60',
                      subText: 'text-rose-900/60',
                      badgeBg: 'bg-rose-200/70 text-[#E23744]',
                      icon: <CalendarIcon className="w-3.5 h-3.5 text-[#E23744]" />,
                      btnBg: 'bg-rose-200/70 text-[#E23744] hover:bg-rose-300',
                    },
                    {
                      bg: 'bg-white text-zinc-900 border-stone-200/90 shadow-2xs',
                      subText: 'text-zinc-400',
                      badgeBg: 'bg-stone-100 text-zinc-700',
                      icon: <AffiliateIcon className="w-3.5 h-3.5 text-zinc-700" />,
                      btnBg: 'bg-stone-100 text-zinc-700 hover:bg-stone-200',
                    },
                  ]
                  const theme = cardThemes[idx % cardThemes.length]

                  return (
                    <div
                      key={item.id}
                      className={`w-full p-2.5 rounded-2xl ${theme.bg} border shadow-2xs flex items-center justify-between transition-transform hover:scale-[1.01]`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-1.5">
                        <div className={`w-7 h-7 rounded-xl ${theme.badgeBg} flex items-center justify-center shrink-0`}>
                          {item.type === 'document' ? (
                            <DocumentIcon className="w-3.5 h-3.5" />
                          ) : item.type === 'service' ? (
                            <CalendarIcon className="w-3.5 h-3.5" />
                          ) : item.type === 'affiliate' ? (
                            <AffiliateIcon className="w-3.5 h-3.5" />
                          ) : (
                            <ShoppingBagFilledIcon className="w-3.5 h-3.5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${theme.badgeBg}`}>
                              {item.type}
                            </span>
                            {item.price && (
                              <span className="text-[9px] font-bold text-emerald-500">
                                {item.price}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-bold truncate leading-tight">
                            {item.title}
                          </p>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-lg ${theme.btnBg} flex items-center justify-center shrink-0 transition-colors`}>
                        <LinkExternalIcon className="w-3 h-3" />
                      </div>
                    </div>
                  )
                })
              ) : (
                /* Empty state when user hasn't added any items yet */
                <div className="w-full py-4 px-3 rounded-2xl border border-dashed border-stone-300/80 text-center flex flex-col items-center justify-center gap-1 text-stone-400">
                  <ShoppingBagFilledIcon className="w-4 h-4 text-stone-300" />
                  <span className="text-[10px] font-medium text-stone-400">
                    Store & document links will appear here
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 4. Bottom Footer Pill inside Phone: "Powered by LinkBoost" */}
          <div className="pt-2 pb-0.5 flex justify-center shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5DE] shadow-2xs text-zinc-700">
              <BeaconsLogoIcon className="w-2.5 h-2.5 text-zinc-700" />
              <span className="text-[9px] font-semibold tracking-tight">
                Powered by LinkBoost
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

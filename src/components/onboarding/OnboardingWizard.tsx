'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  OnboardingStep,
  SocialLinkItem,
  StoreDocItem,
  CompleteOnboardingPayload,
} from '@/lib/types/onboarding'
import { useUsernameAvailability } from '@/lib/hooks/useUsernameAvailability'
import { PhonePreview } from './PhonePreview'
import { Step1Username } from './steps/Step1Username'
import { Step2Profile, CREATOR_CATEGORIES } from './steps/Step2Profile'
import { Step3Socials } from './steps/Step3Socials'
import { Step4Store, PresetItem } from './steps/Step4Store'
import { CelebrationModal } from './CelebrationModal'
import {
  InstagramIcon,
  TwitterXIcon,
  YouTubeIcon,
  TikTokIcon,
  GitHubIcon,
  LinkedInIcon,
  SpotifyIcon,
} from './BrandIcons'

interface OnboardingWizardProps {
  initialUsername?: string
  isOAuthUser?: boolean
  initialStep?: OnboardingStep
}

const PRESET_KEYWORDS = [
  'Tech',
  'Design',
  'Creator',
  'Developer',
  'Fitness',
  'Music',
  'Startup',
  'Newsletter',
]

const POPULAR_PLATFORMS = [
  { platform: 'instagram' as const, name: 'Instagram', placeholder: 'https://instagram.com/username', icon: InstagramIcon, badgeColor: 'hover:border-[#E1306C] hover:bg-[#E1306C]/5' },
  { platform: 'twitter' as const, name: 'X', placeholder: 'https://x.com/username', icon: TwitterXIcon, badgeColor: 'hover:border-zinc-900 hover:bg-zinc-100' },
  { platform: 'youtube' as const, name: 'YouTube', placeholder: 'https://youtube.com/@channel', icon: YouTubeIcon, badgeColor: 'hover:border-[#FF0000] hover:bg-[#FF0000]/5' },
  { platform: 'tiktok' as const, name: 'TikTok', placeholder: 'https://tiktok.com/@username', icon: TikTokIcon, badgeColor: 'hover:border-black hover:bg-zinc-100' },
  { platform: 'github' as const, name: 'GitHub', placeholder: 'https://github.com/username', icon: GitHubIcon, badgeColor: 'hover:border-zinc-800 hover:bg-zinc-100' },
  { platform: 'linkedin' as const, name: 'LinkedIn', placeholder: 'https://linkedin.com/in/username', icon: LinkedInIcon, badgeColor: 'hover:border-[#0A66C2] hover:bg-[#0A66C2]/5' },
  { platform: 'spotify' as const, name: 'Spotify', placeholder: 'https://open.spotify.com/artist/...', icon: SpotifyIcon, badgeColor: 'hover:border-[#1DB954] hover:bg-[#1DB954]/5' },
]

const STORE_PRESETS: PresetItem[] = [
  { type: 'document', title: 'Portfolio / Resume PDF', label: 'PDF Document' },
  { type: 'service', title: '1:1 Strategy Call', price: '$99', label: 'Service' },
  { type: 'product', title: 'Creator Guide / eBook', price: '$19', label: 'Product' },
  { type: 'affiliate', title: 'Daily Tech Setup & Gear', label: 'Affiliate' },
]

export function OnboardingWizard({
  initialUsername = '',
  isOAuthUser = false,
  initialStep = isOAuthUser && !initialUsername ? 1 : 2,
}: OnboardingWizardProps) {
  const router = useRouter()

  // Stepper state
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')

  // Phase 1: Username
  const [username, setUsername] = useState(initialUsername)
  const usernameCheck = useUsernameAvailability(username)

  // Phase 2: Name, Bio, Category, Keywords
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [category, setCategory] = useState(CREATOR_CATEGORIES[0])
  const [keywords, setKeywords] = useState<string[]>(['Creator', 'Design'])
  const [customKeywordInput, setCustomKeywordInput] = useState('')

  // Phase 3: Social Media Links
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>([])
  const [activeSocialPlatform, setActiveSocialPlatform] = useState<SocialLinkItem['platform']>('instagram')

  // Phase 4: Store Items & Docs
  const [storeItems, setStoreItems] = useState<StoreDocItem[]>([])
  const [newItemType, setNewItemType] = useState<StoreDocItem['type']>('product')
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemUrl, setNewItemUrl] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  // Launch Celebration Modal
  const [showCelebration, setShowCelebration] = useState(false)

  function handleNextStep() {
    setGlobalError(null)
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep)
    } else {
      finalizeOnboarding()
    }
  }

  function handlePrevStep() {
    setGlobalError(null)
    if (currentStep > 1) {
      if (!isOAuthUser && currentStep === 2) return
      setCurrentStep((prev) => (prev - 1) as OnboardingStep)
    }
  }

  async function finalizeOnboarding() {
    setIsSubmitting(true)
    setGlobalError(null)

    const payload: CompleteOnboardingPayload = {
      username: username.toLowerCase().trim(),
      displayName: displayName.trim() || username,
      bio: bio.trim(),
      category,
      keywords,
      socialLinks,
      storeItems,
    }

    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setGlobalError(data.error || 'Failed to complete profile configuration')
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setShowCelebration(true)
    } catch {
      setGlobalError('An unexpected network error occurred.')
      setIsSubmitting(false)
    }
  }

  // Phase 2 Keyword Helpers
  function toggleKeyword(kw: string) {
    if (keywords.includes(kw)) {
      setKeywords(keywords.filter((k) => k !== kw))
    } else if (keywords.length < 6) {
      setKeywords([...keywords, kw])
    }
  }

  function removeKeyword(kw: string) {
    setKeywords(keywords.filter((k) => k !== kw))
  }

  function handleAddCustomKeyword(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = customKeywordInput.trim().replace(/^#/, '')
      if (val && !keywords.includes(val) && keywords.length < 6) {
        setKeywords([...keywords, val])
        setCustomKeywordInput('')
      }
    }
  }

  // Phase 3 Social Helpers
  function addOrUpdateSocial(platform: SocialLinkItem['platform'], url: string) {
    setSocialLinks((prev) => {
      const existing = prev.find((item) => item.platform === platform)
      if (existing) {
        if (!url.trim()) return prev.filter((item) => item.platform !== platform)
        return prev.map((item) => (item.platform === platform ? { ...item, url } : item))
      }
      if (!url.trim()) return prev
      return [...prev, { id: `${platform}-${Date.now()}`, platform, url }]
    })
  }

  function removeSocial(platform: SocialLinkItem['platform']) {
    setSocialLinks((prev) => prev.filter((item) => item.platform !== platform))
  }

  // Phase 4 Store Helpers
  function handleAddStoreItem() {
    if (!newItemTitle.trim() || !newItemUrl.trim()) return

    setStoreItems((prev) => [
      ...prev,
      {
        id: `store-${Date.now()}`,
        type: newItemType,
        title: newItemTitle.trim(),
        url: newItemUrl.trim(),
        price: newItemPrice.trim() || undefined,
      },
    ])

    setNewItemTitle('')
    setNewItemUrl('')
    setNewItemPrice('')
  }

  function applyStorePreset(preset: PresetItem) {
    setNewItemType(preset.type)
    setNewItemTitle(preset.title)
    if (preset.price) setNewItemPrice(preset.price)
  }

  function handleRemoveStoreItem(id: string) {
    setStoreItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col justify-between overflow-hidden">
      {/* Mobile Tab Switcher (Zero Emojis) */}
      <div className="lg:hidden flex items-center justify-center shrink-0 mb-2">
        <div className="inline-flex p-0.5 rounded-lg bg-zinc-200 border border-zinc-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMobileTab('edit')}
            className={`px-3 py-1 rounded-md transition-all ${
              mobileTab === 'edit'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Configure
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`px-3 py-1 rounded-md transition-all ${
              mobileTab === 'preview'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main 2-Column Area - Screen Fit */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Form Steps */}
        <div className={`lg:col-span-7 w-full flex flex-col justify-center ${mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Progress Indicator */}
          <div className="mb-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-1.5">
              <span className="uppercase tracking-wider text-zinc-400 text-[10px]">
                Phase {currentStep} of 4
              </span>
              <span className="text-[#E23744] font-bold text-xs">
                {currentStep === 1 && 'Reserve Vanity Link'}
                {currentStep === 2 && 'Identity & Topics'}
                {currentStep === 3 && 'Social Networks'}
                {currentStep === 4 && 'Store & Documents'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-full transition-all duration-300 rounded-full ${
                    step <= currentStep ? 'bg-[#E23744]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Global Error Banner */}
          {globalError && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-[#E23744] text-xs flex items-center justify-between gap-2 shadow-2xs animate-slide-down-fade shrink-0">
              <span>{globalError}</span>
              <button
                type="button"
                onClick={() => setGlobalError(null)}
                className="text-[#E23744] hover:opacity-75 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Form Surface */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-xs p-5 sm:p-6 shrink-0">
            {currentStep === 1 && (
              <Step1Username
                username={username}
                setUsername={setUsername}
                usernameCheck={usernameCheck}
                onNext={handleNextStep}
              />
            )}

            {currentStep === 2 && (
              <Step2Profile
                displayName={displayName}
                setDisplayName={setDisplayName}
                bio={bio}
                setBio={setBio}
                category={category}
                setCategory={setCategory}
                keywords={keywords}
                toggleKeyword={toggleKeyword}
                removeKeyword={removeKeyword}
                customKeywordInput={customKeywordInput}
                setCustomKeywordInput={setCustomKeywordInput}
                onAddCustomKeyword={handleAddCustomKeyword}
                presetKeywords={PRESET_KEYWORDS}
                isOAuthUser={isOAuthUser}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}

            {currentStep === 3 && (
              <Step3Socials
                socialLinks={socialLinks}
                activePlatform={activeSocialPlatform}
                setActivePlatform={setActiveSocialPlatform}
                platforms={POPULAR_PLATFORMS}
                onAddOrUpdateSocial={addOrUpdateSocial}
                onRemoveSocial={removeSocial}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}

            {currentStep === 4 && (
              <Step4Store
                storeItems={storeItems}
                newItemType={newItemType}
                setNewItemType={setNewItemType}
                newItemTitle={newItemTitle}
                setNewItemTitle={setNewItemTitle}
                newItemUrl={newItemUrl}
                setNewItemUrl={setNewItemUrl}
                newItemPrice={newItemPrice}
                setNewItemPrice={setNewItemPrice}
                presets={STORE_PRESETS}
                onApplyPreset={applyStorePreset}
                onAddItem={handleAddStoreItem}
                onRemoveItem={handleRemoveStoreItem}
                onFinish={finalizeOnboarding}
                onPrev={handlePrevStep}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>

        {/* Right Column: Live Phone Mockup */}
        <div className={`lg:col-span-5 w-full justify-center items-center ${mobileTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          <PhonePreview
            username={username}
            displayName={displayName}
            bio={bio}
            category={category}
            keywords={keywords}
            socialLinks={socialLinks}
            storeItems={storeItems}
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* Post Launch Celebration Modal (Zero Emojis) */}
      {showCelebration && (
        <CelebrationModal
          username={username}
          onProceed={() => {
            router.push('/dashboard')
            router.refresh()
          }}
        />
      )}
    </div>
  )
}

'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AUTH_COPY } from '@/lib/constants/auth'
import { AuthHeroShowcase } from '@/components/auth/AuthHeroShowcase'
import { BrandHeader } from '@/components/auth/BrandHeader'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthInput } from '@/components/auth/AuthInput'
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter'
import { validateEmail, validatePassword, validateUsername } from '@/lib/validation/authValidation'
import { useUsernameAvailability } from '@/lib/hooks/useUsernameAvailability'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-white flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  )
}

function SignupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isOAuthRedirect = searchParams.get('oauth') === 'true'
  const isStepOnboarding = searchParams.get('step') === 'onboarding'

  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [isOnboarding, setIsOnboarding] = useState(isStepOnboarding || isOAuthRedirect)
  const [determinedStep, setDeterminedStep] = useState<number>(1)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Real-time username check with 350ms debounce
  const usernameCheck = useUsernameAvailability(username, 350)

  // Only show inline errors AFTER user has clicked the CTA
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string | null
    email?: string | null
    password?: string | null
  }>({})
  const [isShaking, setIsShaking] = useState(false)

  const usernameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const userMeta = session.user.user_metadata || {}

          // 1. If user has already completed onboarding, route straight to dashboard
          if (userMeta.onboarding_completed) {
            router.replace('/dashboard')
            return
          }

          // 2. Cross-verify with database profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, display_name, onboarding_completed')
            .eq('id', session.user.id)
            .maybeSingle()

          if (profile?.onboarding_completed) {
            router.replace('/dashboard')
            return
          }

          // 3. User is authenticated but still in onboarding
          const u = userMeta.username || profile?.username || ''
          if (u) setUsername(u)

          // Compute exactly which step they need next
          let resumeStep = 1
          if (!u) {
            resumeStep = 1
          } else if (!profile?.display_name && !userMeta.full_name) {
            resumeStep = 2
          } else {
            resumeStep = 3
          }
          setDeterminedStep(resumeStep)

          const isGoogle = session.user.app_metadata?.provider === 'google'
          if (isGoogle || isOAuthRedirect || isStepOnboarding) {
            setIsOnboarding(true)
          }
        }
      } catch (err) {
        console.error('Session check error:', err)
      } finally {
        setIsCheckingSession(false)
      }
    }
    checkUser()
  }, [isOAuthRedirect, isStepOnboarding, router, supabase])

  function triggerShake() {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 450)
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
    setUsername(sanitized)
    if (hasAttemptedSubmit) {
      setFieldErrors((prev) => ({ ...prev, username: validateUsername(sanitized) }))
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setEmail(val)
    if (hasAttemptedSubmit) {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(val) }))
    }
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setPassword(val)
    if (hasAttemptedSubmit) {
      setFieldErrors((prev) => ({ ...prev, password: validatePassword(val, 'signup') }))
    }
  }

  async function handleOAuthGoogle() {
    setLoading(true)
    setServerError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback?next=${encodeURIComponent('/signup?step=onboarding&oauth=true')}`,
      },
    })
    if (error) {
      setServerError(error.message)
      triggerShake()
      setLoading(false)
    }  
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)
    setSuccessMessage(null)
    setHasAttemptedSubmit(true)

    const usernameErr = validateUsername(username)
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password, 'signup')

    const errors = {
      username: usernameErr,
      email: emailErr,
      password: passwordErr,
    }

    setFieldErrors(errors)

    if (usernameErr || emailErr || passwordErr || !usernameCheck.isAvailable) {
      triggerShake()
      if (usernameErr || !usernameCheck.isAvailable) {
        usernameInputRef.current?.focus()
      } else if (emailErr) {
        emailInputRef.current?.focus()
      } else if (passwordErr) {
        passwordInputRef.current?.focus()
      }
      return
    }

    setLoading(true)

    const cleanUsername = username.toLowerCase().trim()
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username: cleanUsername,
        },
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setServerError(error.message)
      triggerShake()
    } else if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
      // Supabase email enumeration protection: email is already registered!
      setServerError('An account with this email already exists. Please sign in with Google or use the login page.')
      triggerShake()
    } else if (data.session) {
      // Immediate session: smoothly land directly to second phase
      setIsOnboarding(true)
    } else {
      setSuccessMessage('Account created! Please check your email inbox to confirm your account.')
    }

    setLoading(false)
  }

  // While validating active session & onboarding completion status
  if (isCheckingSession) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#E23744] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Phase-wise onboarding mode (Phases 1 -> 4) - 100vh Locked Non-Scrollable
  if (isOnboarding) {
    return (
      <main className="h-screen w-screen bg-[#F7F7F5] flex flex-col justify-between py-2 sm:py-3 px-4 sm:px-6 selection:bg-[#E23744]/10 selection:text-[#E23744] overflow-hidden">
        <BrandHeader className="mb-1 shrink-0" />
        <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
          <OnboardingWizard
            initialUsername={username}
            isOAuthUser={isOAuthRedirect}
            initialStep={determinedStep as 1 | 2 | 3 | 4}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen w-screen bg-white text-zinc-900 flex flex-col lg:flex-row antialiased selection:bg-[#E23744]/10 selection:text-[#E23744] overflow-hidden">
      {/* Left Column: Edge-to-Edge Image with Centered Value Card */}
      <AuthHeroShowcase />

      {/* Right Column: High-Precision Signup Form with Adaptive Scroll Resilience */}
      <section className="flex-1 h-full flex flex-col justify-start lg:justify-center px-5 py-6 sm:px-8 sm:py-8 lg:p-8 xl:p-12 bg-white overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Form Container with unified min-h for rock-solid consistent positioning */}
        <div className={`my-auto w-full max-w-sm sm:max-w-md lg:max-w-sm mx-auto flex flex-col justify-center py-2 transition-transform ${isShaking ? 'animate-form-shake' : ''}`}>
          {/* Top App Name */}
          <BrandHeader className="mb-1.5 sm:mb-2" />

          {/* Header Text */}
          <div className="space-y-0.5 mb-2.5 text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 leading-snug">
              {AUTH_COPY.signup.title}
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
              {AUTH_COPY.signup.subtitle}
            </p>
          </div>

          {/* Social Auth */}
          <GoogleAuthButton onClick={handleOAuthGoogle} disabled={loading} />

          {/* Divider */}
          <AuthDivider />

          {/* Server Error Message with Dismiss */}
          {serverError && (
            <div
              role="alert"
              className="mb-2.5 p-2.5 rounded-xl bg-red-50 border border-red-200 text-[#E23744] text-xs leading-relaxed flex items-start justify-between gap-2 font-medium animate-slide-down-fade shadow-2xs"
            >
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#E23744]" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{serverError}</span>
              </div>
              <button
                type="button"
                onClick={() => setServerError(null)}
                className="text-[#E23744]/70 hover:text-[#E23744] cursor-pointer text-xs shrink-0 font-bold px-1"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          )}

          {/* Success Confirmation Banner with Dismiss */}
          {successMessage && (
            <div
              role="status"
              className="mb-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed font-medium flex items-start justify-between gap-2 animate-slide-down-fade shadow-2xs"
            >
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{successMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="text-emerald-700/70 hover:text-emerald-800 cursor-pointer text-xs shrink-0 font-bold px-1"
                aria-label="Dismiss notice"
              >
                ✕
              </button>
            </div>
          )}

          {/* Form with noValidate to disable default browser tooltip */}
          <form onSubmit={handleSignUp} noValidate className="space-y-2">
            <div>
              <AuthInput
                ref={usernameInputRef}
                id="signup-username"
                label="Reserve Link URL"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="yourname"
                prefixElement="linkboost.bio/"
                error={
                  usernameCheck.status === 'taken'
                    ? 'This handle is already taken'
                    : hasAttemptedSubmit && (fieldErrors.username || usernameCheck.errorMessage)
                    ? fieldErrors.username || usernameCheck.errorMessage
                    : null
                }
                autoComplete="off"
                spellCheck={false}
              />
              {/* Real-time username micro-interaction badge */}
              <div className="flex items-center justify-between mt-1 px-1 text-[11px]">
                <span className="text-zinc-400">Unique public handle</span>
                <div>
                  {usernameCheck.isChecking && (
                    <span className="text-zinc-500 flex items-center gap-1 font-medium">
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Checking...
                    </span>
                  )}
                  {usernameCheck.status === 'available' && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      ✓ Available
                    </span>
                  )}
                  {usernameCheck.status === 'taken' && (
                    <span className="text-red-500 font-semibold">✗ Taken</span>
                  )}
                </div>
              </div>
            </div>

            <AuthInput
              ref={emailInputRef}
              id="signup-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="creator@domain.com"
              error={hasAttemptedSubmit ? fieldErrors.email : null}
              autoComplete="email"
            />

            <div>
              <AuthInput
                ref={passwordInputRef}
                id="signup-password"
                label="Create Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="At least 6 characters"
                error={hasAttemptedSubmit ? fieldErrors.password : null}
                autoComplete="new-password"
              />
              {/* Sleek Password Strength Progress Indicator */}
              <PasswordStrengthMeter password={password} />
            </div>

            <button
              type="submit"
              disabled={loading || (username.length > 0 && !usernameCheck.isAvailable)}
              suppressHydrationWarning
              className="w-full h-10.5 sm:h-11 mt-1 px-4 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.98] text-white font-semibold text-sm tracking-wide transition-all duration-150 shadow-md shadow-[#E23744]/25 hover:shadow-lg hover:shadow-[#E23744]/30 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>{AUTH_COPY.signup.loadingCta}</span>
                </>
              ) : (
                <span>{AUTH_COPY.signup.submitCta}</span>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-2.5 text-center text-xs text-zinc-500">
            {AUTH_COPY.signup.switchPrompt}{' '}
            <Link href={AUTH_COPY.signup.switchHref} className="text-[#E23744] hover:underline font-semibold ml-1">
              {AUTH_COPY.signup.switchCta}
            </Link>
          </div>

          {/* Legal Notice */}
          <p className="mt-2 text-[10px] text-center text-zinc-400 leading-normal max-w-xs mx-auto">
            {AUTH_COPY.legal}
          </p>
        </div>
      </section>
    </main>
  )
}

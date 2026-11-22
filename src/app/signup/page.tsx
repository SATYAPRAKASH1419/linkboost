'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { AUTH_COPY } from '@/lib/constants/auth'
import { AuthHeroShowcase } from '@/components/auth/AuthHeroShowcase'
import { BrandHeader } from '@/components/auth/BrandHeader'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthInput } from '@/components/auth/AuthInput'
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter'
import { validateEmail, validatePassword, validateUsername } from '@/lib/validation/authValidation'

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
        redirectTo: `${location.origin}/api/auth/callback`,
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

    if (usernameErr || emailErr || passwordErr) {
      triggerShake()
      if (usernameErr) {
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
    const { error } = await supabase.auth.signUp({
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
    } else {
      setSuccessMessage('Account created! Please check your email inbox to confirm your account.')
    }

    setLoading(false)
  }

  return (
    <main className="h-screen w-screen bg-white text-zinc-900 flex flex-col lg:flex-row antialiased selection:bg-[#E23744]/10 selection:text-[#E23744] overflow-hidden">
      {/* Left Column: Edge-to-Edge Image with Centered Value Card */}
      <AuthHeroShowcase />

      {/* Right Column: Zero Scroll High-Precision Signup Form */}
      <section className="flex-1 h-full flex flex-col justify-center px-5 py-4 sm:px-8 sm:py-6 lg:p-8 xl:p-12 bg-white overflow-hidden">
        {/* Form Container with unified min-h for rock-solid consistent positioning */}
        <div className={`my-auto w-full max-w-sm sm:max-w-md lg:max-w-sm mx-auto flex flex-col justify-center transition-transform ${isShaking ? 'animate-form-shake' : ''}`}>
          {/* Top App Name */}
          <BrandHeader className="mb-2 sm:mb-3" />

          {/* Header Text */}
          <div className="space-y-1 mb-3 text-center">
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

          {/* Server Error Message */}
          {serverError && (
            <div
              role="alert"
              className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-[#E23744] text-xs leading-relaxed flex items-start gap-2 font-medium animate-slide-down-fade shadow-xs"
            >
              <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#E23744]" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          {/* Success Confirmation Banner */}
          {successMessage && (
            <div
              role="status"
              className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed font-medium flex items-start gap-2 animate-slide-down-fade shadow-xs"
            >
              <svg className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form with noValidate to disable default browser tooltip */}
          <form onSubmit={handleSignUp} noValidate className="space-y-2.5">
            <AuthInput
              ref={usernameInputRef}
              id="signup-username"
              label="Reserve Link URL"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="yourname"
              prefixElement="linkboost.bio/"
              error={hasAttemptedSubmit ? fieldErrors.username : null}
              autoComplete="off"
              spellCheck={false}
            />

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
              disabled={loading}
              className="w-full h-11 sm:h-11.5 mt-1.5 px-4 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.98] text-white font-semibold text-sm tracking-wide transition-all duration-150 shadow-md shadow-[#E23744]/25 hover:shadow-lg hover:shadow-[#E23744]/30 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
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
          <div className="mt-3 text-center text-xs text-zinc-500">
            {AUTH_COPY.signup.switchPrompt}{' '}
            <Link href={AUTH_COPY.signup.switchHref} className="text-[#E23744] hover:underline font-semibold ml-1">
              {AUTH_COPY.signup.switchCta}
            </Link>
          </div>

          {/* Legal Notice - integrated cleanly inside the card, never pushed down */}
          <p className="mt-3 text-[10.5px] text-center text-zinc-400 leading-normal max-w-xs mx-auto">
            {AUTH_COPY.legal}
          </p>
        </div>
      </section>
    </main>
  )
}

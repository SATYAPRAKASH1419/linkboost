'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AUTH_COPY } from '@/lib/constants/auth'
import { AuthHeroShowcase } from '@/components/auth/AuthHeroShowcase'
import { BrandHeader } from '@/components/auth/BrandHeader'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { AuthDivider } from '@/components/auth/AuthDivider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  async function handleOAuthGoogle() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-white text-zinc-900 flex flex-col lg:flex-row antialiased selection:bg-[#E23744]/10 selection:text-[#E23744]">
      {/* Left Column: 100% Full Edge-to-Edge Image with Centered Value Card */}
      <AuthHeroShowcase />

      {/* Right Column: High-Precision Sign In Form */}
      <section className="flex-1 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white overflow-y-auto">
        <BrandHeader />

        {/* Form Container */}
        <div className="my-auto w-full max-w-sm mx-auto">
          {/* Header */}
          <div className="space-y-1.5 mb-6 text-center">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-zinc-900">
              {AUTH_COPY.login.title}
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
              {AUTH_COPY.login.subtitle}
            </p>
          </div>

          {/* Social Auth */}
          <GoogleAuthButton onClick={handleOAuthGoogle} disabled={loading} />

          {/* Divider */}
          <AuthDivider />

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[#E23744] text-xs leading-relaxed flex items-start gap-2 font-medium">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@domain.com"
                className="w-full rounded-xl bg-white border border-zinc-300 focus:border-[#E23744] focus:ring-4 focus:ring-[#E23744]/10 px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-300 outline-none transition shadow-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-700">Password</label>
                <a href="#" className="text-[11px] text-[#E23744] hover:underline font-semibold transition">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white border border-zinc-300 focus:border-[#E23744] focus:ring-4 focus:ring-[#E23744]/10 px-3.5 py-2.5 text-xs text-zinc-900 font-medium placeholder-zinc-300 outline-none transition pr-12 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-zinc-400 hover:text-zinc-700 transition font-medium"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.99] text-white font-semibold text-xs tracking-wide transition shadow-md shadow-[#E23744]/25 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>{AUTH_COPY.login.loadingCta}</span>
                </>
              ) : (
                <span>{AUTH_COPY.login.submitCta}</span>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-5 text-center text-xs text-zinc-500">
            {AUTH_COPY.login.switchPrompt}{' '}
            <Link href={AUTH_COPY.login.switchHref} className="text-[#E23744] hover:underline font-semibold ml-1">
              {AUTH_COPY.login.switchCta}
            </Link>
          </div>
        </div>

        {/* Legal notice */}
        <p className="text-[11px] text-center text-zinc-400 shrink-0">
          {AUTH_COPY.legal}
        </p>
      </section>
    </main>
  )
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { RESERVED_SLUGS } from '@/app/api/auth/check-username/route'
import { validateUsername } from '@/lib/validation/authValidation'
import { z } from 'zod'

const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.enum([
    'instagram',
    'twitter',
    'youtube',
    'tiktok',
    'github',
    'linkedin',
    'spotify',
    'other',
  ]),
  url: z.string().trim().max(500),
  label: z.string().optional(),
})

const storeItemSchema = z.object({
  id: z.string(),
  type: z.enum(['product', 'document', 'service', 'affiliate']),
  title: z.string().trim().min(1).max(100),
  url: z.string().trim().max(500),
  price: z.string().trim().max(50).optional(),
  description: z.string().trim().max(500).optional(),
})

const onboardingPayloadSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  displayName: z.string().trim().max(50).optional().default(''),
  bio: z.string().trim().max(160).optional().default(''),
  category: z.string().trim().max(50).optional().default('General'),
  keywords: z.array(z.string().trim().max(30)).max(10).optional().default([]),
  socialLinks: z.array(socialLinkSchema).max(25).optional().default([]),
  storeItems: z.array(storeItemSchema).max(30).optional().default([]),
})

function isSafeUrl(url: string): boolean {
  if (!url) return true
  try {
    const parsed = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Verify authenticated session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Please authenticate first.' },
        { status: 401 }
      )
    }

    const rawBody = await request.json().catch(() => null)
    const parseResult = onboardingPayloadSchema.safeParse(rawBody)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid onboarding payload' },
        { status: 400 }
      )
    }

    const {
      username,
      displayName,
      bio,
      category,
      keywords,
      socialLinks,
      storeItems,
    } = parseResult.data

    const cleanUsername = username.toLowerCase().trim()

    // 2. Validate handle syntax and reserved namespaces
    const usernameValidationError = validateUsername(cleanUsername)
    if (usernameValidationError) {
      return NextResponse.json(
        { error: usernameValidationError },
        { status: 400 }
      )
    }

    if (RESERVED_SLUGS.has(cleanUsername)) {
      return NextResponse.json(
        { error: 'This handle is reserved. Please choose another.' },
        { status: 400 }
      )
    }

    // 3. Validate URL protocols in social and store items to prevent javascript: or data: vectors
    const hasUnsafeSocialUrl = socialLinks.some((link) => link.url && !isSafeUrl(link.url))
    const hasUnsafeStoreUrl = storeItems.some((item) => item.url && !isSafeUrl(item.url))

    if (hasUnsafeSocialUrl || hasUnsafeStoreUrl) {
      return NextResponse.json(
        { error: 'Invalid URL detected. URLs must use http or https protocols.' },
        { status: 400 }
      )
    }

    // 4. Verify username isn't already taken by another account
    const { data: existingProfile, error: existingProfileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', cleanUsername)
      .neq('id', user.id)
      .maybeSingle()

    if (!existingProfileError && existingProfile) {
      return NextResponse.json(
        { error: 'This handle is already taken by another user.' },
        { status: 409 }
      )
    }

    // 5. Persist profile record (with fallback if schema lacks extra columns)
    const fullProfileData: Record<string, unknown> = {
      id: user.id,
      email: user.email,
      username: cleanUsername,
      display_name: displayName || cleanUsername,
      bio: bio || '',
      category: category || 'General',
      keywords: keywords || [],
      social_links: socialLinks || [],
      store_items: storeItems || [],
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    }

    let { error: profileError } = await supabase.from('profiles').upsert(
      fullProfileData,
      { onConflict: 'id' }
    )

    // Fallback if profiles table hasn't added extended columns yet
    if (profileError && profileError.message?.includes('schema cache')) {
      const basicProfileData: Record<string, unknown> = {
        id: user.id,
        email: user.email,
        username: cleanUsername,
        display_name: displayName || cleanUsername,
        bio: bio || '',
        updated_at: new Date().toISOString(),
      }

      const fallbackResult = await supabase.from('profiles').upsert(
        basicProfileData,
        { onConflict: 'id' }
      )
      profileError = fallbackResult.error
    }

    if (profileError) {
      console.error('Error saving profile data:', profileError)
      return NextResponse.json(
        { error: `Database error: ${profileError.message}` },
        { status: 500 }
      )
    }

    // 6. Keep Supabase Auth user metadata synchronized
    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: {
        username: cleanUsername,
        full_name: displayName || cleanUsername,
        bio: bio || '',
        category: category || 'General',
        keywords: keywords || [],
        social_links: socialLinks || [],
        store_items: storeItems || [],
        onboarding_completed: true,
      },
    })

    if (updateAuthError) {
      console.warn('Warning updating user metadata:', updateAuthError.message)
    }

    return NextResponse.json(
      {
        success: true,
        redirect: '/dashboard',
        message: 'Onboarding completed successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected onboarding completion error:', error)
    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    )
  }
}

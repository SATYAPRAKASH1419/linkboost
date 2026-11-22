/**
 * LinkBoost Authentication Validation Engine
 * Reusable client-side validation rules & password strength metrics.
 */

export interface FieldValidationResult {
  isValid: boolean
  error: string | null
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) {
    return 'Please enter your email address'
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@domain.com)'
  }
  return null
}

export function validatePassword(password: string, mode: 'login' | 'signup' = 'login'): string | null {
  if (!password) {
    return 'Please enter your password'
  }
  if (mode === 'signup' && password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return null
}

export function validateUsername(username: string): string | null {
  const trimmed = username.trim()
  if (!trimmed) {
    return 'Please choose a link username'
  }
  if (trimmed.length < 3) {
    return 'Username must be at least 3 characters'
  }
  if (trimmed.length > 30) {
    return 'Username cannot exceed 30 characters'
  }
  if (!/^[a-z0-9_-]+$/i.test(trimmed)) {
    return 'Use only letters, numbers, hyphens (-), and underscores (_)'
  }
  return null
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4
  label: 'Too weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong'
  color: string
  percent: number
  hasMinLength: boolean
  hasLetter: boolean
  hasNumber: boolean
  hasSpecial: boolean
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'Too weak',
      color: 'bg-zinc-200',
      percent: 0,
      hasMinLength: false,
      hasLetter: false,
      hasNumber: false,
      hasSpecial: false,
    }
  }

  const hasMinLength = password.length >= 6
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^a-zA-Z0-9]/.test(password)
  const isLong = password.length >= 10

  let score = 0
  if (hasMinLength) score += 1
  if (hasLetter && hasNumber) score += 1
  if (hasSpecial) score += 1
  if (isLong) score += 1

  const safeScore = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4

  const config: Record<
    0 | 1 | 2 | 3 | 4,
    { label: PasswordStrength['label']; color: string; percent: number }
  > = {
    0: { label: 'Too weak', color: 'bg-red-400', percent: 15 },
    1: { label: 'Weak', color: 'bg-red-500', percent: 25 },
    2: { label: 'Fair', color: 'bg-amber-500', percent: 50 },
    3: { label: 'Strong', color: 'bg-emerald-500', percent: 75 },
    4: { label: 'Very Strong', color: 'bg-emerald-600', percent: 100 },
  }

  return {
    score: safeScore,
    label: config[safeScore].label,
    color: config[safeScore].color,
    percent: config[safeScore].percent,
    hasMinLength,
    hasLetter,
    hasNumber,
    hasSpecial,
  }
}

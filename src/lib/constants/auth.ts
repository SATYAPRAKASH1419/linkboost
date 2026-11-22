/**
 * Authentication copy & configuration constants
 */

export const AUTH_COPY = {
  hero: {
    badge: '0% Platform Fee • Keep 100% of Sales',
    title: 'Turn comments into captured leads & sales.',
    imageAlt: 'LinkBoost Creator Storefront Showcase',
    imageSrc: '/creator_storefront_v2.png',
  },
  signup: {
    title: 'Claim your creator page',
    subtitle: 'Start capturing leads from your social traffic in under 2 minutes.',
    submitCta: 'Claim My Link & Continue →',
    loadingCta: 'Creating your account...',
    switchPrompt: 'Already have an account?',
    switchCta: 'Sign In',
    switchHref: '/login',
  },
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to manage your storefront, leads, and analytics.',
    submitCta: 'Sign In to Dashboard',
    loadingCta: 'Signing in...',
    switchPrompt: "Don't have an account?",
    switchCta: 'Create One',
    switchHref: '/signup',
  },
  legal: 'By continuing, you agree to our Terms. Zero commission, keep 100% of your earnings.',
} as const

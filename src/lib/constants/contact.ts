/**
 * Contact page copy & inbox routing
 */

// Confirm these inboxes exist before launch
export const CONTACT_EMAILS = {
  general: 'hello@linkboost.bio',
  support: 'support@linkboost.bio',
  partnerships: 'partners@linkboost.bio',
  press: 'press@linkboost.bio',
} as const

export type ContactTopic = keyof typeof CONTACT_EMAILS

export const CONTACT_COPY = {
  meta: {
    title: 'Contact us · LinkBoost',
    description: 'Questions, feedback or partnership ideas? Get in touch with the LinkBoost team.',
  },
  hero: {
    eyebrow: 'Contact us',
    title: 'Let’s talk.',
    lead: 'Questions, feedback, partnership ideas or just a hello. A real human reads every message.',
  },
  form: {
    title: 'Send us a message',
    fields: {
      name: { label: 'Your name', placeholder: 'Ananya Rao' },
      email: { label: 'Email', placeholder: 'you@example.com' },
      topic: { label: 'What is it about?' },
      message: { label: 'Message', placeholder: 'Tell us what’s on your mind…' },
    },
    topics: [
      { value: 'general', label: 'General question' },
      { value: 'support', label: 'Account & support' },
      { value: 'partnerships', label: 'Partnerships & brands' },
      { value: 'press', label: 'Press & media' },
    ] satisfies readonly { value: ContactTopic; label: string }[],
    submit: 'Send message',
    success: 'Your email app should open with the message ready. Just hit send.',
  },
  channels: [
    {
      topic: 'support',
      title: 'Help & support',
      body: 'Account, billing, bugs or anything not working the way it should.',
    },
    {
      topic: 'partnerships',
      title: 'Partnerships',
      body: 'Brands, agencies, communities and platforms that want to work with creators.',
    },
    {
      topic: 'press',
      title: 'Press & media',
      body: 'Stories, interviews and media kits about the creator economy in India and beyond.',
    },
  ] satisfies readonly { topic: ContactTopic; title: string; body: string }[],
  faqCard: {
    title: 'Looking for a quick answer?',
    body: 'Pricing, UPI payments, platforms and lead exports are covered in our FAQ.',
    cta: 'Read the FAQ',
    href: '/#faq',
  },
} as const

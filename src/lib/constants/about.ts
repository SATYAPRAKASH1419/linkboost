/**
 * About page copy
 */

export const ABOUT_COPY = {
  meta: {
    title: 'About us · LinkBoost',
    description: 'LinkBoost is the link in bio that sells, captures leads and shows what works. Built in India for creators, influencers, innovators and sellers everywhere.',
  },
  hero: {
    eyebrow: 'About LinkBoost',
    titleLines: ['Built for people', 'who build audiences.'],
    lead: 'Every day, millions of people say “link in bio”. We think that one link should work as hard as the person behind it.',
  },
  gallery: [
    { src: '/landing/creator-nutrition.jpg', alt: 'A nutrition creator holding a fresh salad bowl', label: 'Creators' },
    { src: '/landing/creator-finance.jpg', alt: 'A founder recording at his desk with a laptop and microphone', label: 'Innovators' },
    { src: '/landing/creator-baker.jpg', alt: 'A home baker presenting a cake and fresh pastries', label: 'Sellers' },
  ],
  story: {
    eyebrow: 'Why we exist',
    title: 'Most link-in-bio clicks quietly disappear',
    paragraphs: [
      'A follower taps your link, glances at a list of buttons and leaves. No email captured, no idea which post sent them, no way to reach them again.',
      'We started LinkBoost in India, where creators sell over UPI, close deals in DMs and grow on five platforms at once. The tools they had were built for a different market and treated analytics as an afterthought.',
      'So we built one link that showcases your work, captures leads and tells you exactly which post, video, thread or episode brought every follower in, wherever your audience lives.',
    ],
  },
  facts: [
    { value: 'Free', label: 'to start, no card needed' },
    { value: '12+', label: 'platforms your link lives on' },
    { value: '15 min', label: 'self-destructing file links' },
    { value: '5 min', label: 'from sign-up to live page' },
  ],
  values: {
    eyebrow: 'What we believe',
    title: 'Four promises we build around',
    items: [
      {
        title: 'Your audience is yours',
        body: 'Every lead you capture belongs to you. Export it anytime, take it anywhere. No lock-in, no hostage data.',
      },
      {
        title: 'India first, open to the world',
        body: 'UPI-ready from day one for Indian buyers, and the checkouts global creators already use. Your page works wherever your audience is.',
      },
      {
        title: 'Privacy by default',
        body: 'Files stay private, download links expire and visitor data is hashed. Your audience trusts you; we protect that trust.',
      },
      {
        title: 'Every platform, one link',
        body: 'Instagram, YouTube, X, Spotify, WhatsApp and beyond. You should not need a different tool for every app you post on.',
      },
    ],
  },
  roadmap: {
    eyebrow: 'Where we are headed',
    title: 'India first. Everywhere next.',
    // Review roadmap items before launch; they mirror the post-v1 list in docs/BACKEND_SRS.md
    stages: [
      {
        stage: 'Now',
        title: 'Launching in India',
        points: ['UPI-ready creator pages', 'Email-gated lead magnets', 'Per-post source analytics'],
      },
      {
        stage: 'Next',
        title: 'Sell without leaving',
        points: ['Native checkout', 'Custom domains', 'More block types'],
      },
      {
        stage: 'Later',
        title: 'Grow on autopilot',
        points: ['AI page builder', 'Email follow-ups', 'Team workspaces'],
      },
    ],
  },
} as const

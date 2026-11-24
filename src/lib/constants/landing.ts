/**
 * Landing page copy, navigation & content data
 */

export const LANDING_NAV = [
  { label: 'Who it’s for', href: '/#who-its-for' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
] as const

export const LANDING_COPY = {
  announcement: {
    text: 'Launching in India first, UPI-ready from day one.',
    cta: 'Grab your name early',
    href: '/signup',
  },
  header: {
    login: { label: 'Log in', href: '/login' },
    signup: { label: 'Sign up free', href: '/signup' },
  },
  hero: {
    eyebrow: 'For creators, influencers, innovators & sellers',
    titleLines: ['Share once.', 'Grow everywhere.'],
    lead: 'One link that showcases your products, collects your leads and accepts UPI. Share it on Instagram, YouTube, X, Spotify or WhatsApp and see exactly which post brought every follower in.',
    microcopy: 'Free to start. No card. Live in 5 minutes.',
    image: {
      src: '/landing/hero-creator.jpg',
      alt: 'A creator in a warm home studio filming a reel on her phone',
    },
  },
  claim: {
    prefix: 'linkboost.bio/',
    placeholder: 'yourname',
    cta: 'Claim your link',
    inputLabel: 'Choose your LinkBoost username',
  },
  marquee: [
    'Creators',
    'Influencers',
    'Innovators',
    'Sellers',
    'Coaches',
    'Educators',
    'Founders',
    'Artists',
    'Freelancers',
    'YouTubers',
    'Podcasters',
    'Musicians',
    'Streamers',
    'Writers',
    'Home chefs',
  ],
  platforms: {
    eyebrow: 'Works everywhere',
    title: 'One link. Every platform.',
    body: 'Your audience lives in more than one app. Put your LinkBoost link wherever they are, and every platform gets its own source tag so you know where your people really come from.',
    hubLabel: 'linkboost.bio/you',
    feedTitle: 'Live sources',
    items: [
      { platform: 'instagram', where: 'Bio & stories' },
      { platform: 'youtube', where: 'Description & pinned comment' },
      { platform: 'x', where: 'Profile & threads' },
      { platform: 'spotify', where: 'Podcast show notes' },
      { platform: 'whatsapp', where: 'Status & broadcasts' },
      { platform: 'threads', where: 'Profile & replies' },
      { platform: 'facebook', where: 'Page & groups' },
      { platform: 'telegram', where: 'Channel pinned post' },
      { platform: 'discord', where: 'Server welcome' },
      { platform: 'twitch', where: 'Stream panels' },
      { platform: 'pinterest', where: 'Pin destination' },
      { platform: 'substack', where: 'Newsletter footer' },
    ],
    footnote: 'And anywhere else a link fits: LinkedIn, email signatures, QR codes on packaging.',
  },
  audience: {
    eyebrow: 'Who it’s for',
    title: 'If you have an audience, you have a business',
    body: 'Whether you post reels, ship products or pitch ideas, LinkBoost turns attention into something you own.',
    items: [
      {
        title: 'Creators',
        line: 'Turn every view into a subscriber list no algorithm can take away.',
        chips: ['free-guide.pdf', 'latest-video'],
      },
      {
        title: 'Influencers',
        line: 'Know which post actually moved your audience, not just which one went viral.',
        chips: ['clicks per post', 'brand links'],
      },
      {
        title: 'Innovators',
        line: 'Waitlist, pitch deck and demo, all behind one link that collects early believers.',
        chips: ['join-waitlist', 'deck.pdf'],
      },
      {
        title: 'Sellers',
        line: 'Your products, your UPI, your storefront, all a single tap away.',
        chips: ['pay via UPI', 'catalogue.pdf'],
      },
      {
        title: 'Coaches',
        line: 'Give a free lesson, earn the trust, then book the paid call.',
        chips: ['free-masterclass', 'book-a-call'],
      },
      {
        title: 'Educators',
        line: 'Share notes and cheat sheets that grow a student list while you sleep.',
        chips: ['cheatsheet.pdf', 'course-link'],
      },
    ],
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Claim it. Share it. Grow it.',
    steps: [
      {
        number: '01',
        title: 'Claim your link',
        body: 'Grab linkboost.bio/yourname and stack your links, products, a free download and your UPI. No code, no designer.',
        tag: 'linkboost.bio/yourname',
      },
      {
        number: '02',
        title: 'Share it everywhere',
        body: 'Drop it in your Instagram bio, YouTube description, X profile, Spotify show notes or WhatsApp status. Every share gets its own source tag.',
        tag: '?src=yt-review',
      },
      {
        number: '03',
        title: 'Watch it grow',
        body: 'Followers become leads, leads become customers. Every click and sign-up lands on your dashboard, so you know what to post next.',
        tag: 'lead saved ✓ · yt-review',
      },
    ],
  },
  features: [
    {
      id: 'payments',
      tone: 'wine',
      eyebrow: 'Payments, your way',
      title: 'However they like to pay, you’re ready.',
      body: 'Indian buyers can pay with UPI. Already selling on Razorpay, Stripe, PayPal, Gumroad, Instamojo or Cashfree? Plug in the checkout you use today and let every buyer pay the way they prefer.',
      points: ['UPI plus the checkouts you already use', 'Prices in rupees or dollars', 'Ready for Indian and global buyers'],
    },
    {
      id: 'lead-magnets',
      tone: 'blush',
      eyebrow: 'Lead magnets',
      title: 'Give value. Get the email.',
      body: 'Gate a guide, checklist, pitch deck or preset pack behind a one-field form. Files stay private and download links self-destruct in 15 minutes.',
      points: ['Email-gated PDF downloads', 'Private storage, expiring links', 'One-click CSV export to any email tool'],
    },
    {
      id: 'source-analytics',
      tone: 'ink',
      eyebrow: 'Source analytics',
      title: 'Know which post brought them in.',
      body: 'Instagram reels, YouTube videos, X threads, Spotify episodes, WhatsApp broadcasts: tag every link you share and see views, clicks and leads per source. Then double down on what works.',
      points: ['Compare platforms side by side', 'Views, clicks & leads per post', 'Privacy-friendly, hashed visitor data'],
    },
    {
      id: 'creator-page',
      tone: 'panel',
      eyebrow: 'Your page',
      title: 'A page as unique as your hustle.',
      body: 'Stack links, freebies, products, your latest video, podcast or playlist, and social icons for every platform you are on. Pick a theme, reorder with a drag and publish in seconds.',
      points: ['Social icons for every platform', 'Drag-to-reorder blocks & themes', 'Fast, mobile-first public page'],
    },
  ],
  pricing: {
    eyebrow: 'Pricing',
    stat: 'Free',
    statLabel: 'to start. No card needed.',
    body: 'Claim your link, build your page and start capturing leads without paying a thing. Upgrade only when you need more.',
    stackTitle: 'One link instead of five tools',
    stack: [
      { tool: 'Link-in-bio app', replacedBy: 'Your LinkBoost page' },
      { tool: 'Form builder & email collector', replacedBy: 'Built-in lead capture' },
      { tool: 'Drive folder for freebies', replacedBy: 'Private, self-expiring PDFs' },
      { tool: 'Payment page builder', replacedBy: 'UPI & checkout blocks' },
      { tool: 'Link tracking tool', replacedBy: 'Per-post source analytics' },
    ],
    cta: 'Start free',
  },
  testimonials: {
    eyebrow: 'In their words',
    title: 'Creators, sellers and founders who stopped leaking traffic',
    // Placeholder quotes and names; replace with real testimonials before launch
    items: [
      {
        quote: 'One meal-prep reel brought 400 emails in a week. For the first time I know which content actually grows my business.',
        name: 'Ananya R.',
        role: 'Nutrition creator',
        image: '/landing/creator-nutrition.jpg',
      },
      {
        quote: 'I put my pitch deck and waitlist behind one link. Investors and early users both came through it, and I could see exactly from where.',
        name: 'Rohit M.',
        role: 'Fintech founder',
        image: '/landing/creator-finance.jpg',
      },
      {
        quote: 'Customers used to ask for my UPI in DMs. Now they tap, pay and order straight from my page. No more back-and-forth.',
        name: 'Meher K.',
        role: 'Home bakery owner',
        image: '/landing/creator-baker.jpg',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Good questions, straight answers',
    contact: { text: 'Still curious? A real human will answer.', cta: 'Ask us anything', href: '/contact' },
    items: [
      {
        question: 'Who is LinkBoost for?',
        answer: 'Anyone who shares a link with an audience: creators, influencers, coaches, educators, founders, freelancers and sellers. If people click your link, LinkBoost helps you turn those clicks into leads and sales.',
      },
      {
        question: 'Is it only for Instagram?',
        answer: 'Not at all. Use your link on Instagram, YouTube, X, Spotify, WhatsApp, Threads, Facebook, Telegram, Discord, Twitch, Pinterest, Substack, LinkedIn or anywhere a link fits. Add social icons for all of them on your page.',
      },
      {
        question: 'Is LinkBoost only for India?',
        answer: 'No. We are launching in India first, so UPI and Indian checkouts are first-class from day one. Creators anywhere can use LinkBoost with Stripe, PayPal, Gumroad or any checkout link.',
      },
      {
        question: 'How do I accept UPI payments?',
        answer: 'Add a payment block with your UPI details or your existing checkout link (Razorpay, Instamojo, Cashfree and others). Buyers pay with GPay, PhonePe, Paytm or any UPI app they already use.',
      },
      {
        question: 'How much does LinkBoost cost?',
        answer: 'You can start free, with no card needed. Paid plans with more lead magnets and deeper analytics are coming, and pricing will always be shown clearly before you pay.',
      },
      {
        question: 'How does LinkBoost know which post a buyer came from?',
        answer: 'Each link you share can carry a source tag, like “ig-reel-meal-prep”, “yt-review” or “spotify-ep-12”. Every view, click and lead from that link is saved with the tag, so you see exactly what content performs.',
      },
      {
        question: 'Are my PDFs safe from being shared publicly?',
        answer: 'Yes. Files are stored privately and visitors receive a signed download link that expires after 15 minutes, so the original file is never exposed.',
      },
      {
        question: 'Can I export my leads?',
        answer: 'Anytime. Download your leads as a CSV, filtered by date or source, and import them into any email or WhatsApp tool you use.',
      },
    ],
  },
  finalCta: {
    title: 'Your audience is already clicking. Make it count.',
    body: 'Claim linkboost.bio/yourname before someone else does.',
  },
  footer: {
    tagline: 'Share once. Grow everywhere.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Who it’s for', href: '/#who-its-for' },
          { label: 'How it works', href: '/#how-it-works' },
          { label: 'Features', href: '/#features' },
          { label: 'Pricing', href: '/#pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About us', href: '/about' },
          { label: 'Contact us', href: '/contact' },
          { label: 'FAQ', href: '/#faq' },
        ],
      },
      {
        title: 'Account',
        links: [
          { label: 'Sign up', href: '/signup' },
          { label: 'Log in', href: '/login' },
        ],
      },
    ],
    legal: 'Built in India. Made for creators everywhere.',
  },
} as const

export type FeatureTone = (typeof LANDING_COPY.features)[number]['tone']

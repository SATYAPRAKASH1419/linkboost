# LinkBoost — UI Design System, Laws & Interface Flow Manual

> **Document:** Design System, UX Laws & Product Interface Playbook  
> **Target Product:** LinkBoost (India-first Creator Sales Engine & Gated Lead Capture)  
> **Standard:** Anti-slop craft (`taste-skill` 2.5 + `ui-ux-pro-max` intelligence)  
> **Last Updated:** 22 November 2026

---

## 1. Executive Design Philosophy

### Why Generic "AI-Generated" UI Fails for Link-in-Bio
Most AI-coded creator tools look identical: floating dark-gray cards, purple-to-indigo gradient borders, vague stock photos, and plain Inter text. They fail because creators don't perceive them as high-earning sales engines.

LinkBoost adopts the **"High-Precision Business Terminal"** philosophy:
- **No generic stock images of smiling creators.** Show the **real mechanism** (the lead magnet, the comment keyword trigger, the verified lead count, the conversion rate).
- **No amateur link list aesthetic.** Treat the creator page like an e-commerce checkout and lead generation powerhouse.
- **Architectural, intentional contrast.** Deep obsidian text, clean architectural backgrounds, and Cranberry conversion accents.

---

## 2. Core UX Laws Applied to LinkBoost

### 2.1 Fitts's Law (Touch Targets & Interaction Speed)
> *The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.*

- **Primary Action Buttons (CTA):** Must span **100% container width** on mobile and auth panels (`w-full`) with a minimum height of **44px** (padding `py-2.5` to `py-3`).
- **Input Fields:** Minimum height **42px** with padding `px-3.5 py-2.5`. Avoid thin 32px inputs that frustrate mobile users.
- **Toggle Buttons & Secondary Links:** Optical hit-area padded to at least 44x44px even if the visible text is small.

### 2.2 Hick’s Law (Decision Overload Reduction)
> *The time it takes to make a decision increases logarithmically with the number and complexity of choices.*

- **Separate Routes for Actions:** Never jam login, signup, social auth, password reset, and username search into one confusing modal.
  - `/signup` does one thing: claim a username and create an account.
  - `/login` does one thing: sign in returning creators.
- **One Primary Action per Viewport:** Only one high-contrast primary button (`#E23744`) per screen. All other actions are secondary outlines or text links.

### 2.3 Jakob’s Law (Familiarity & Cognitive Load)
> *Users spend most of their time on other sites. They prefer your site to work the same way as all the other sites they already know.*

- **One-Tap Google OAuth:** Prominently positioned above or below email login with official branding colors (`#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`).
- **Standard Auth Conventions:** Email on top, password below, clear password visibility toggle ("Show/Hide"), intuitive "Forgot Password?" placement.

### 2.4 Miller’s Law (Chunking Information)
> *The average person can only keep 7 (plus or minus 2) items in their working memory.*

- Form fields are grouped in chunks of 2 or 3:
  1. *Identity:* Username / Slug
  2. *Credentials:* Email & Password
- Funnel metrics are grouped into clean 2-column comparison blocks (`Leads Captured` vs `Conversion Rate`).

### 2.5 Error Preservation Rule (UI-UX Pro-Max Mandate)
- **Never wipe user input on error.** If registration fails (e.g. password too short), preserve `username` and `email` in the form state. Clear only secret fields if required.
- Errors must be rendered in-context with clear contrast (Light Red `#FEF2F2` background with `#E23744` text and `border-red-200`).

---

## 3. Brand Identity & Color System

LinkBoost uses the **Cranberry & Obsidian** palette inspired by high-conversion Indian commerce leaders (like Zomato) blended with Swiss architectural typography.

### 3.1 Color Token Table

| Token Name | Hex / Value | Semantic Role | Tailwind Variable |
|---|---|---|---|
| **Brand Primary** | `#E23744` | Primary CTA buttons, brand badges, active highlights | `var(--color-brand)` |
| **Brand Hover** | `#CB202D` | Active / hover button state | `var(--color-brand-hover)` |
| **Brand Muted** | `rgba(226, 55, 68, 0.08)` | Subtle tag backgrounds, text selection | `var(--color-brand-muted)` |
| **Brand Glow** | `rgba(226, 55, 68, 0.22)` | Focus rings, box shadows | `shadow-brand` |
| **App Background** | `#FFFFFF` | Form container, root background | `var(--color-surface-app)` |
| **Panel Background** | `#F7F7F5` | Left showcase backdrop (warm Tyrolean gray) | `var(--color-surface-panel)` |
| **Card Surface** | `#FFFFFF` | Floating interactive cards | `var(--color-surface-card)` |
| **Border Subtle** | `#E8E8E5` | Grid lines, dividers, panel boundaries | `var(--color-border-subtle)` |
| **Border Default** | `#D8D8D4` | Unfocused form inputs, card edges | `var(--color-border-default)` |
| **Text Primary** | `#18181B` | Headings, hero copy, primary button text | `var(--color-text-primary)` |
| **Text Secondary** | `#3F3F46` | High-contrast body copy, input text | `var(--color-text-secondary)` |
| **Text Muted** | `#71717A` | Field labels, descriptions, helper hints | `var(--color-text-muted)` |
| **Text Subtle** | `#A1A1AA` | Slugs (`linkboost.bio/`), placeholders | `var(--color-text-subtle)` |
| **State Success** | `#059669` / `#ECFDF5` | "Live Funnel" badge, conversion rate metrics | Emerald Tokens |
| **State Error** | `#E23744` / `#FEF2F2` | Validation errors, failed logins | Red Tokens |

---

## 4. Typography Scale & Tri-Stack System

Rather than relying on a single default font, LinkBoost employs a **Tri-Stack Typography System**:

```
Display Headings  -->  Modern Geometric Sans (Negative tracking -0.025em to -0.03em)
Body & Form UI    -->  Optical Neutral Sans (Line height 1.4 to 1.5)
Data & Triggers   -->  Monospace (Slugs, metrics, reels, timestamps)
```

### 4.1 Type Hierarchy

| Element | Size | Weight | Tracking | Purpose |
|---|---|---|---|---|
| **H1 (Hero / Auth Title)** | `24px–28px` (1.5rem–1.75rem) | 600 SemiBold | `-0.025em` | Main screen anchor |
| **H2 (Showcase Headline)** | `28px–32px` (1.75rem–2.0rem) | 600 SemiBold | `-0.03em` | Value proposition on left panel |
| **Body (Descriptions)** | `13px–14px` (0.8125rem–0.875rem) | 400 Regular | `normal` | Explanations, error messages |
| **Form Labels** | `12px` (0.75rem) | 600 SemiBold | `0.01em` | High legibility above input fields |
| **Slug & Triggers** | `11px–12px` (mono) | 500 Medium | `0.02em` | `linkboost.bio/username`, Reel tags |
| **Footnotes / Legal** | `10px–11px` | 400 Regular | `normal` | Disclaimers, copyright notices |

---

## 5. Architectural Screen Layout Rules

### 5.1 The 100vh Non-Scrollable Viewport Lock
- **Desktop Rule (`lg:`):** Split-screen 50/50 container.
  - Left column: Showcases the live product value.
  - Right column: Clean, centered interaction form.
  - **Zero window scrollbars.** The root container is locked with `h-screen w-screen overflow-hidden`.
- **Mobile Rule (`<lg`):** Single column.
  - Form remains vertically centered (`my-auto`).
  - An internal scroll (`overflow-y-auto`) only triggers if the physical device height is under 600px (e.g. landscape mode), preventing broken or inaccessible buttons.

### 5.2 Equal Optical Edges & Balance
- Consistent padding rhythm:
  - Form container: max width `max-w-sm` (384px) centered.
  - Margin gutters: `p-6 sm:p-8 lg:p-10 xl:p-12`.
  - Input-to-button spacing: `space-y-3` for compact density without crowding.

### 5.3 Live Phone Mockup & Dynamic Island Rules
- **Physical Chassis Design:**
  - Ratio: `aspect-[9/18.5]` with adaptive height `h-[min(540px,calc(100vh-90px))]`.
  - Outer titanium bezel with hardware button silhouettes and dynamic island capsule at top center.
  - Screen surface: Warm porcelain background (`#FAF8F5`) with status bar (cellular signal, Wi-Fi, battery level).
- **Synchronous Live Binding:**
  - Real-time updates as user types: Avatar initial, display name, handle, bio, category badge, and keywords.
  - Social icons appear dynamically as squircle brand tiles with real SVG icons (Instagram, X, YouTube, TikTok, GitHub, LinkedIn, Spotify).
  - Store and document cards render with theme cycling matching creator lead magnet aesthetics.
- **Mobile Split Navigation:**
  - On viewports `<lg`, a segmented switch pill (`Configure` vs `Preview`) toggles between the step form and live preview without breaking the 100vh layout lock.

---

## 6. Key Interface User Flows

### Flow 1: Creator Acquisition & Claiming a Link
```
Landing / Direct Reel Traffic
         │
         ▼
     [/signup]
         │
         ├─ Enter desired username: "linkboost.bio/[yourname]" (Real-time debounced check via /api/auth/check-username)
         ├─ Enter email & password (or One-Tap Google OAuth)
         ├─ Password strength meter with real-time score & hints
         ├─ Click "Claim My Link & Continue →"
         │
         ▼
[api/auth/signup] (Supabase Auth)
         │
         ├─ Reserves slug in `profiles` and establishes session
         │
         ▼
Interactive 4-Phase Guided Onboarding Engine (/signup?step=onboarding)
```

### Flow 1.1: The 4-Phase Guided Onboarding Engine & Live Phone Preview
```
Onboarding Screen: 100vh Locked Layout (Left: Stepper Form | Right: Real-time Live Phone Mockup)
         │
         ├─ Phase 1: Vanity URL Claim
         │    └─ Real-time 350ms debounce handle availability badge (✓ Available / ✗ Taken)
         │
         ├─ Phase 2: Creator Identity & Topics
         │    ├─ Display Name (with fallback to @username)
         │    ├─ Category dropdown (Creator, Tech & Dev, Design, Fitness, Startup, etc.)
         │    ├─ Bio headline with 160-character countdown
         │    └─ Topic keywords: click-to-select presets (#Tech, #Design...) + custom tag input
         │
         ├─ Phase 3: Social Channels Connection
         │    ├─ Squircle tile selector (Instagram, X, YouTube, TikTok, GitHub, LinkedIn, Spotify)
         │    ├─ Active channel status pills
         │    └─ "Skip for now" non-blocking navigation
         │
         ├─ Phase 4: Featured Store & Lead Magnet Documents
         │    ├─ 1-Click starter templates (PDF Resume, 1:1 Strategy Call, Creator eBook, Tech Gear)
         │    ├─ Custom card form (product, document, service, affiliate) with title, price, URL
         │    └─ Instant render in live phone preview list
         │
         ▼
[POST /api/onboarding/complete]
         │
         ├─ 1. Verifies authenticated session
         ├─ 2. Validates Zod schema & URL safety
         ├─ 3. Re-checks handle syntax & reserved slugs
         ├─ 4. Upserts profile in `profiles` table
         ├─ 5. Synchronizes user_metadata (onboarding_completed: true)
         │
         ▼
Celebration Modal:
         ├─ Verified launch badge with soft pulse animation
         ├─ 1-Click public link copy button with visual confirmation
         └─ "Enter Creator Studio" CTA → [/dashboard]
```

### Flow 2: Returning Creator Management
```
Creator visits [/login]
         │
         ├─ Email/Password or Google OAuth
         │
         ▼
[api/auth/callback]
         │
         ├─ Exchanges code for JWT session cookie (via @supabase/ssr)
         │
         ▼
Redirect to [/dashboard]
         │
         ├─ Overview: Leads captured today, top converting reel
         ├─ Page Editor: Add/reorder blocks, upload gated PDF
         └─ Settings: Profile, category, social links
```

### Flow 3: Visitor Lead Capture (The Core Wedge)
```
Visitor clicks bio link on Instagram/YouTube: "linkboost.bio/kavita"
         │
         ▼
Renders Public Creator Page (SSR + Edge Cached)
         │
         ├─ Reads source tag if present (e.g. ?src=reel_playbook_4)
         ├─ Visitor sees "Email-Gated PDF" block
         ├─ Visitor enters email (+ optional WhatsApp phone) & accepts consent
         │
         ▼
[POST /api/public/:username/pdf/:blockId/access]
         │
         ├─ 1. Inserts row into `leads` table with source_tag
         ├─ 2. Generates short-lived signed URL (15-min expiry) for the PDF
         ├─ 3. Ingests non-blocking `lead_submit` event for analytics
         │
         ▼
Visitor receives immediate download access + Creator receives notification
```

---

## 7. Quality Checklist for All Future Pages (The Gate)

Before shipping any new page or component in LinkBoost, check these 8 criteria:

- [ ] **Contrast Test:** Text meets WCAG AAA standards (Obsidian `#18181B` on `#FFFFFF` is 16:1 contrast ratio).
- [ ] **No Placeholder-as-Label:** Every input field has a permanent visible `<label>` tag above it.
- [ ] **Focus Rings:** All interactive elements have visible, styled focus rings (`focus:ring-2 focus:ring-[#E23744]/20`).
- [ ] **Optical Balance:** Equal margins, no clipped edges, responsive from 320px mobile to 2560px ultra-wide.
- [ ] **Zero Slop Assets:** No generic AI illustrations or fake badges. All product demos reflect actual database features.
- [ ] **Type Consistency:** Headings use negative letter-spacing; metadata and numbers use monospace font.
- [ ] **State Feedback:** Loading spinners on buttons during async requests; error messages clearly visible without shifting layout.
- [ ] **Touch Accessibility:** Minimum tap target of 44x44px on all clickable items on touch screens.

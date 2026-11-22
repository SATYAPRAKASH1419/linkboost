# LinkBoost — Implementation Roadmap & Progress Tracker

> Full-stack Next.js (App Router) + TypeScript + Supabase single codebase.  
> Following the specifications from [BACKEND_SRS.md](file:///c:/Users/satya/Desktop/linkinbio/BACKEND_SRS.md).

---

## Progress Checklist

- [x] **Step 1: Next.js + TS Project Setup & Clean up**
  - Initialize Next.js with App Router, TypeScript, Tailwind CSS, ESLint, `src/` directory.
  - Clean out default boilerplate styles and components.
  - Verify local dev server runs.

- [x] **Step 2: Supabase Project Setup & Environment Configuration**
  - Create/configure Supabase project.
  - Install dependencies (`@supabase/supabase-js`, `@supabase/ssr`).
  - Configure `.env.local` with Supabase URL and Anon/Service keys.

- [x] **Step 3: Database Tables & RLS Policies (SQL Schema Migration)**
  - Run SQL migrations for 6 core tables: `users`, `pages`, `blocks`, `links`, `page_events`, `leads`.
  - Enable Row-Level Security (RLS) on all tenant-owned tables.
  - Add database triggers (auto-create profile on signup, update timestamps).

- [x] **Step 4: Supabase Client Utilities & Next.js 16 Proxy**
  - Set up browser client utility (`src/lib/supabase/client.ts`).
  - Set up server client utility (`src/lib/supabase/server.ts`).
  - Set up auth proxy (`src/proxy.ts` adopting Next.js 16 file convention) for session refreshing and route protection.

- [x] **Step 5: Auth Flow (Signup, Login, Sessions, OAuth)**
  - Auth route handlers: `/api/auth/callback` with open redirect mitigation (`safeNext`).
  - High-precision signup (`/signup`) and login (`/login`) with zero-scroll 100vh layout.
  - One-tap Google OAuth integration with state preservation.
  - Client-side validation engine powered by Zod (`src/lib/validation/authValidation.ts`).
  - Password strength meter and hydration warning suppression for password managers.

- [x] **Step 6: User Onboarding Engine & Profile Setup**
  - Real-time handle verification endpoint (`GET /api/auth/check-username`) with exact `.eq()` matching and `RESERVED_SLUGS` blocking.
  - Debounced username availability hook (`src/lib/hooks/useUsernameAvailability.ts`) with React 19 cascading-render compliance.
  - 4-Phase Guided Onboarding Wizard (`src/components/onboarding/OnboardingWizard.tsx`):
    - *Phase 1:* Reserve unique vanity link (`linkboost.bio/username`).
    - *Phase 2:* Identity (Display name, bio with character counter, custom category selector, custom/preset topic keywords).
    - *Phase 3:* Social media channels integration (Instagram, X, YouTube, TikTok, GitHub, LinkedIn, Spotify, Custom).
    - *Phase 4:* Featured store items & lead magnet documents (starter presets, product, service, affiliate, PDF).
  - Real-time live physical phone preview chassis (`src/components/onboarding/PhonePreview.tsx`).
  - Launch Celebration Modal with one-click link copy (`src/components/onboarding/CelebrationModal.tsx`).
  - Server-side onboarding completion endpoint (`POST /api/onboarding/complete`) with Zod schema parsing, URL safety checks, database profile upsert, and Supabase Auth metadata synchronization.

- [ ] **Step 7: Page & Content Block Management (CRUD + Reordering)**
  - Page settings: theme, title, publish/unpublish (`/api/pages`).
  - Block CRUD operations (`/api/pages/:pageId/blocks`).
  - Block reordering endpoint (`/api/pages/:pageId/blocks/reorder`).
  - Block toggle endpoint (`/api/blocks/:id/toggle`).

- [ ] **Step 8: Gated PDF Upload & Short-lived Signed URL Storage Flow**
  - Configure Supabase Storage bucket (`gated-pdfs` - private, `avatars` - public).
  - Storage upload handler with MIME validation and size limits.
  - Signed URL generator for 15-minute access window.

- [ ] **Step 9: Public Page View & Lead Capture Ingestion**
  - Public profile resolution (`GET /api/public/:username`).
  - Lead submission endpoint (`POST /api/public/:username/pdf/:blockId/access`).
  - Rate limiting and email validation.
  - Lead storage linked with source tag.

- [ ] **Step 10: Analytics Event Tracking & Dashboard Endpoints**
  - Lightweight event logger (`POST /api/public/events`) for views, clicks, opens.
  - IP hashing / deduping logic.
  - Creator analytics overview endpoint (`GET /api/analytics/overview`).
  - Per-source breakdown endpoint (`GET /api/analytics/sources`).

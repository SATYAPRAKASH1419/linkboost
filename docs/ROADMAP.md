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

- [x] **Step 4: Supabase Client Utilities**
  - Set up browser client utility (`src/lib/supabase/client.ts`).
  - Set up server client utility (`src/lib/supabase/server.ts`).
  - Set up auth middleware (`src/middleware.ts`) for session refreshing and route protection.

- [ ] **Step 5: Auth Flow (Signup, Login, Sessions)**
  - Auth route handlers: `/api/auth/callback`, `/api/auth/signout`.
  - Basic signup/login/session verification.
  - Protected route guard checks.

- [ ] **Step 6: User & Profile API Routes**
  - Profile retrieval & update (`GET /api/me`, `PATCH /api/me`).
  - Username uniqueness check and claim (`POST /api/me/username`).
  - Account deletion / export hooks.

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

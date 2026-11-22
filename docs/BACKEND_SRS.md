# LinkBoost — Backend Software Requirements Specification (SRS)

> **Version:** 1.0 | **Date:** 18 November 2026 | **Scope:** Solo-founder MVP (P0)

---

## 1. Project Overview

- **What:** Backend for a creator sales-page platform with lead capture and per-source analytics
- **Who it serves:** India-based creators, coaches and small sellers who share links via reels/DMs
- **Core flow:** Creator signs up → builds page → publishes → visitor lands → email-gated PDF → lead captured with source tag
- **Business model:** Flat monthly subscription (₹0 / ₹299 / ₹499), 0% platform commission, sellers use their own checkout in v1

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Next.js (API routes for backend) |
| Database | PostgreSQL via **Supabase** (Pro plan ~\$25/mo) |
| Auth | Supabase Auth (Email + Google OAuth) |
| File Storage | Supabase Storage (public bucket for images, private bucket for gated PDFs) |
| Hosting | Vercel Pro (~\$20/mo) — Hobby plan is non-commercial |
| Email | Transactional email provider (TBD — e.g. Resend, Postmark) |
| Analytics | First-party event table (no third-party at launch) |
| Payments | None in v1 (link-out to seller's own checkout) |
| AI | Deferred — not in MVP |

---

## 3. Database Schema (v1 — 6 core tables)

### 3.1 `users`
- `id` (UUID, PK)
- `email` (unique, not null)
- `username` (unique, slug, not null)
- `display_name`
- `avatar_url`
- `bio`
- `category`
- `plan` (enum: `free`, `creator`, `pro`)
- `trial_started_at` (timestamp, nullable — starts at first publish)
- `created_at`, `updated_at`

### 3.2 `pages`
- `id` (UUID, PK)
- `owner_id` (FK → users, not null) — **enforce RLS**
- `slug` (unique — same as username in v1)
- `title`
- `theme` (enum or string key)
- `is_published` (boolean, default false)
- `meta_title`, `meta_description`, `meta_image_url`
- `published_at`, `created_at`, `updated_at`

### 3.3 `blocks`
- `id` (UUID, PK)
- `page_id` (FK → pages, not null)
- `owner_id` (FK → users, not null) — **enforce RLS**
- `type` (enum: `link`, `heading`, `text`, `image`, `social_icons`, `product_card`, `gated_pdf`)
- `position` (integer, for ordering)
- `content` (JSONB — block-specific data)
- `is_enabled` (boolean, default true)
- `created_at`, `updated_at`

> [!IMPORTANT]
> For `gated_pdf` blocks, `content` JSONB stores: `{ file_path, file_name, description, consent_text }`. The actual file lives in Supabase private storage.

### 3.4 `links`
- `id` (UUID, PK)
- `block_id` (FK → blocks, nullable)
- `owner_id` (FK → users, not null)
- `url` (not null)
- `title`
- `source_tag` (string — identifies which reel/ad/post this link was shared from)
- `click_count` (integer, default 0 — denormalized counter)
- `created_at`

### 3.5 `page_events`
- `id` (UUID, PK)
- `page_id` (FK → pages, not null)
- `event_type` (enum: `page_view`, `link_click`, `pdf_open`, `lead_submit`)
- `source_tag` (nullable)
- `referrer` (nullable)
- `user_agent` (nullable)
- `ip_hash` (hashed, for dedup — never store raw IP)
- `metadata` (JSONB, nullable)
- `created_at`

> [!NOTE]
> Tolerate retried/duplicate events. Use `ip_hash` + `event_type` + short time window for basic dedup. Never let analytics writes block page rendering.

### 3.6 `leads`
- `id` (UUID, PK)
- `owner_id` (FK → users, not null) — **enforce RLS**
- `page_id` (FK → pages, not null)
- `email` (nullable)
- `phone` (nullable)
- `consent_text` (not null — what the user agreed to)
- `source_tag` (string — which reel/post/link produced this lead)
- `gated_pdf_block_id` (FK → blocks, nullable)
- `created_at`

### Row-Level Security (RLS)
- **Every tenant-owned table** must have `owner_id`
- RLS policies: users can only SELECT/INSERT/UPDATE/DELETE their own rows
- Test cross-tenant access explicitly — automated tests required

---

## 4. API Endpoints

### 4.1 Auth
| Method | Endpoint | What it does |
|---|---|---|
| POST | `/api/auth/signup` | Email/password registration |
| POST | `/api/auth/login` | Email/password login |
| GET | `/api/auth/google` | Google OAuth redirect |
| GET | `/api/auth/callback` | OAuth callback handler |
| POST | `/api/auth/logout` | End session |
| POST | `/api/auth/forgot-password` | Password reset email |
| POST | `/api/auth/reset-password` | Set new password with token |

### 4.2 Users / Profile
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/me` | Get current user profile |
| PATCH | `/api/me` | Update profile (name, bio, avatar, category) |
| POST | `/api/me/username` | Claim/change username (validate uniqueness) |
| POST | `/api/me/avatar` | Upload avatar image |
| DELETE | `/api/me` | Account deletion (GDPR/privacy) |
| GET | `/api/me/export` | Export all user data as JSON/CSV |

### 4.3 Pages
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/pages` | List user's pages (1 in v1) |
| POST | `/api/pages` | Create a page |
| GET | `/api/pages/:id` | Get page details (owner only) |
| PATCH | `/api/pages/:id` | Update page settings (theme, meta, title) |
| POST | `/api/pages/:id/publish` | Publish page (sets `is_published`, starts trial clock) |
| POST | `/api/pages/:id/unpublish` | Unpublish page |
| DELETE | `/api/pages/:id` | Delete page |

### 4.4 Blocks
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/pages/:pageId/blocks` | List all blocks for a page (ordered) |
| POST | `/api/pages/:pageId/blocks` | Add a block |
| PATCH | `/api/blocks/:id` | Update block content |
| DELETE | `/api/blocks/:id` | Delete a block |
| POST | `/api/pages/:pageId/blocks/reorder` | Reorder blocks (accept array of `{id, position}`) |
| PATCH | `/api/blocks/:id/toggle` | Enable/disable a block |

### 4.5 Gated PDF
| Method | Endpoint | What it does |
|---|---|---|
| POST | `/api/blocks/:id/upload-pdf` | Upload PDF to private storage (validate type + size) |
| POST | `/api/public/:username/pdf/:blockId/access` | Visitor submits email → creates lead → returns signed URL |
| GET | `/api/files/signed/:token` | Redirect to short-lived signed URL for the PDF |

### 4.6 Leads
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/leads` | List leads (paginated, filterable by source_tag, date) |
| GET | `/api/leads/export` | Export leads as CSV |
| DELETE | `/api/leads/:id` | Delete a lead |

### 4.7 Analytics
| Method | Endpoint | What it does |
|---|---|---|
| POST | `/api/public/events` | Record a page event (page_view, link_click, etc.) |
| GET | `/api/analytics/overview` | Page views, link clicks, top links, date range |
| GET | `/api/analytics/sources` | Per-source-tag breakdown |
| GET | `/api/analytics/leads` | Lead capture metrics |

### 4.8 Public Page Rendering
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/public/:username` | Fetch published page data (cacheable) |

### 4.9 Admin / Moderation
| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/admin/users` | List users (admin only) |
| POST | `/api/admin/pages/:id/suspend` | Suspend an abusive page |
| POST | `/api/admin/pages/:id/unsuspend` | Restore a suspended page |
| GET | `/api/admin/reports` | View abuse reports |

---

## 5. Authentication & Authorization

- **Auth provider:** Supabase Auth (email/password + Google OAuth)
- **Session:** JWT-based, stored in httpOnly secure cookie
- **Role checks:**
  - `authenticated` — any logged-in user
  - `owner` — resource belongs to `req.user.id`
  - `admin` — platform operator
- **All authorization enforced server-side + database RLS** — never rely on UI-only checks
- **Account recovery:** email-based password reset
- **Trial logic:** 14-day trial starts at first publish, not at sign-up

---

## 6. File Storage Rules

- **Avatar images** → public bucket, validate: JPEG/PNG/WebP, max 2 MB
- **Gated PDFs** → private bucket, validate: PDF only, max 10 MB (configurable)
- **Signed URLs** for gated PDFs: expire in 15 minutes, logged as `pdf_open` event
- **Per-user storage limit** — enforce to prevent abuse
- **Never serve gated files via public URLs**

---

## 7. Analytics Engine

- **First-party only** — no third-party scripts at launch
- **Events tracked:** `page_view`, `link_click`, `pdf_open`, `lead_submit`
- **Source tag:** attached to links — identifies which reel/post/ad drove the traffic
- **Dedup:** hash IP + event_type + 5-min window to avoid obvious double counts
- **Performance:** analytics writes must be non-blocking (async insert or buffered batch)
- **Dashboard queries:**
  - Total views, clicks, leads by date range
  - Top performing links
  - Per-source breakdown (which reel produced which leads)
  - Click-through rate (clicks / views)

---

## 8. Lead Capture Flow

```
Visitor lands on /:username
    → Sees gated PDF block
    → Enters email (+ optional phone)
    → Consent text displayed and recorded
    → Backend:
        1. Validate email format
        2. Rate-limit submissions (per IP, per page)
        3. Insert into `leads` table with source_tag
        4. Generate signed URL for the PDF (15 min expiry)
        5. Return signed URL to frontend
        6. Send transactional email to creator (new lead notification)
        7. Optionally email the PDF link to the visitor
        8. Log `lead_submit` + `pdf_open` events
```

---

## 9. Caching Strategy

- **Public pages:** aggressively cache (CDN / ISR) — invalidate on publish/unpublish/edit
- **Creator dashboard:** no cache, always fresh
- **Analytics data:** cache dashboard queries for 1–5 minutes
- **Signed URLs:** short-lived by design, never cached

---

## 10. Security Requirements

- [ ] Row-Level Security on all tenant tables — automated cross-tenant tests
- [ ] Input validation and sanitization on all endpoints
- [ ] Rate limiting on: auth endpoints, lead submission, event ingestion, file uploads
- [ ] CSRF protection on state-changing requests
- [ ] Helmet / security headers (CSP, HSTS, X-Frame-Options)
- [ ] SQL injection prevention (parameterized queries via Supabase client)
- [ ] XSS prevention in block content rendering
- [ ] File upload validation (type, size, magic bytes)
- [ ] Hashed IPs in analytics (never store raw)
- [ ] Secure session management (httpOnly, secure, sameSite cookies)
- [ ] Admin endpoints protected by role check
- [ ] Spam protection on lead forms (honeypot + rate limit)
- [ ] Audit log for admin actions (suspend, unsuspend, delete)

---

## 11. Privacy & Compliance

- [ ] Consent text stored with every lead record
- [ ] Data export endpoint (`GET /api/me/export`)
- [ ] Account deletion endpoint (`DELETE /api/me`) — cascade delete all user data
- [ ] Clear privacy disclosure on lead capture forms
- [ ] Data retention policy defined before launch
- [ ] No raw IP storage — only hashed
- [ ] Cookie consent handling on public pages
- [ ] Get legal advice on: Indian privacy law, consumer protection, GST, advertising disclosure

---

## 12. Email (Transactional)

- **Provider:** TBD (Resend / Postmark / SendGrid)
- **Emails to send:**
  - Welcome / email verification on signup
  - Password reset
  - New lead notification to creator
  - Gated PDF delivery to visitor (optional)
- **Requirements:**
  - Custom sender domain setup
  - Check free-tier limits before launch
  - Template-based, no raw HTML in code

---

## 13. Error Handling & Observability

- [ ] Global error handler returning consistent JSON error format
- [ ] Error tracking service (e.g. Sentry)
- [ ] Structured logging (request ID, user ID, action)
- [ ] Uptime monitoring with alerts
- [ ] Database backup + tested restore process
- [ ] Incident response process documented

---

## 14. API Response Format

```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Username is already taken"
  }
}

// Paginated
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

---

## 15. Build Phases (Backend Focus)

| Phase | What to build | Exit criteria |
|---|---|---|
| **Phase 1: Foundation** | Auth, user profile, username claim, DB schema, RLS | Sign-up → profile works; RLS tests pass |
| **Phase 2: Page Builder API** | Pages CRUD, blocks CRUD, reorder, templates, publish/unpublish | A user can create, edit, publish a page via API |
| **Phase 3: Public Page** | Public page data endpoint, caching, SEO meta | `GET /:username` returns full page data, cached |
| **Phase 4: Leads & Gated PDF** | PDF upload, signed URL generation, lead capture endpoint, lead list/export | Visitor enters email → lead saved with source → PDF served via signed URL |
| **Phase 5: Analytics** | Event ingestion, dashboard queries, source tracking | Events recorded without blocking; dashboard returns correct data |
| **Phase 6: Admin** | Moderation endpoints, abuse reports, audit log | Admin can suspend/unsuspend pages |
| **Phase 7: Hardening** | Security review, rate limiting, backups, monitoring, privacy flows | Backup restore tested; no critical findings |

---

## 16. What is NOT in v1

- ❌ Native payments/checkout (sellers link out to their own)
- ❌ AI features (prompt-to-page, content suggestions)
- ❌ Native Instagram/comment-to-DM automation (use existing tools)
- ❌ Full CRM, email sequences, segmentation
- ❌ Course hosting, digital downloads with fulfillment
- ❌ Custom domains
- ❌ Agency/team workspaces
- ❌ Marketplace, sponsored slots
- ❌ Mobile apps (iOS/Android)
- ❌ A/B testing
- ❌ Affiliate management
- ❌ White-label billing

---

## 17. Hosting & Deployment Checklist

- [ ] Vercel Pro plan activated (Hobby is non-commercial)
- [ ] Supabase Pro plan activated (free tier pauses after 7 days)
- [ ] Custom domain configured
- [ ] SSL/TLS verified
- [ ] Environment variables secured (not in repo)
- [ ] CI/CD pipeline set up
- [ ] Database migrations versioned and reversible
- [ ] Staging environment for testing before production deploys
- [ ] Backup schedule configured and restore tested

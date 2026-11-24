# LinkBoost — Landing Page Feature Promises

> Every feature or claim the public site makes, mapped to what the product actually has to ship.
> **Rule:** nothing goes live on the marketing site unless it is ✅ here, or the copy is changed first.
> **Sources audited:** `src/lib/constants/landing.ts`, `about.ts`, `contact.ts` and every mockup in `src/components/landing/mockups/` · **Spec:** [BACKEND_SRS.md](./BACKEND_SRS.md) · **Last audited:** 24 November 2026

---

## Status legend

| Status | Meaning |
|---|---|
| ✅ **In v1 scope** | Covered by the SRS. Build it as specified, then tick the checkbox. |
| 🟡 **Needs work** | Partly covered. Needs an extra field, endpoint, UI or a product decision. |
| 🔴 **Not in v1** | The SRS explicitly excludes it or cannot support it. Build it **or** change the copy before launch. |
| ⚪ **Content / ops** | Not a product feature: placeholder copy, inboxes, legal or operations. |

---

## 1. Account & onboarding

| | Promise (as worded on the site) | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Claim `linkboost.bio/yourname` | Hero, final CTA, How it works | `users.username`, `POST /api/me/username` | ✅ |
| [ ] | Username typed on the landing page carries into sign-up | Claim form → `/signup?username=` | Not implemented: signup page ignores the query param | 🟡 |
| [ ] | “Free to start. No card.” | Hero microcopy, Pricing, About facts | `plan: free` exists; SRS also defines a **14-day trial** at first publish | ✅ |
| [ ] | “Live in 5 minutes” / “publish in seconds” | Hero, Your page, About facts | Publish endpoint exists; onboarding flow not designed | 🟡 |
| [ ] | “No code, no designer” | How it works | Page builder (blocks + themes) | ✅ |

**Acceptance:** a new user can sign up with Google or email, keep the username they typed, add 3 blocks and publish in under 5 minutes without a card.

---

## 2. Pricing & commission

> **Business model note (24 Nov 2026):** LinkBoost will charge convenience and other fees (amounts TBD) and sell premium profile assets. The site therefore makes **no** “0% commission”, “keep every rupee” or fee-free claims, shows **no** plan prices, and does **not** mention premium assets yet. Revisit this section once fees are final.

| | Promise | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Free to start, upgrade only when you need more | Pricing | Plan `free` | ✅ |
| [ ] | “Paid plans with more lead magnets and deeper analytics are coming” | FAQ | **Plan limits are not defined** in the SRS | 🟡 |
| [ ] | “Pricing will always be shown clearly before you pay” | FAQ | Fees and plan prices must be shown before any charge (UI + checkout) | 🟡 |
| [ ] | Convenience / platform fees | *Not on the site by decision* | Not in SRS; amounts TBD | ⚪ |
| [ ] | Premium profile assets | *Not on the site by decision* | Not in SRS | ⚪ |

**Decisions needed:** final fee amounts and who pays them (buyer or creator); exact limits per plan; then update the Pricing section and FAQ together.

---

## 3. Payments

v1 has **no native payments** (SRS §16). Every payment claim must work through a link-out to the creator’s own UPI or checkout.

| | Promise | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Add your existing checkout link: Razorpay, Instamojo, Cashfree, Stripe, PayPal, Gumroad | Payments feature, FAQ, checkout demo | `product_card` / `link` block with external URL | ✅ |
| [ ] | “Add a payment block with your UPI details”; buyers pay with GPay, PhonePe, Paytm | FAQ, How it works, Sellers card, phone mockup (“Pay via UPI”) | No UPI block type. Needs a UPI ID field that opens a `upi://pay?pa=…&am=…` intent on mobile and shows a QR on desktop | 🟡 |
| [ ] | Price shown in ₹ or $ per product | Checkout demo, “Rupees or dollars” | `product_card.content` needs `price` + `currency` | 🟡 |
| [ ] | Card payments shown in the checkout demo **Card** tab | Checkout demo | Card payments only via the creator’s own gateway; **no native card form** | 🔴 |
| [ ] | Order confirmation (“Order confirmed”, “Total paid”) after paying | Checkout demo receipt | LinkBoost never sees the payment in v1 | 🔴 |

**Before launch, pick one:** label the checkout demo clearly as “what your buyer sees on your checkout”, **or** remove the Card tab and the receipt until native checkout ships.

---

## 4. Lead magnets & leads

| | Promise | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Email-gated PDF downloads behind a one-field form | Lead magnets, How it works, hero card | `gated_pdf` block, `POST /api/public/:username/pdf/:blockId/access` | ✅ |
| [ ] | Files stored privately | Lead magnets, FAQ, About | Private `gated-pdfs` bucket | ✅ |
| [ ] | Download links self-destruct in 15 minutes | Lead magnets, FAQ, About facts, mockup | Signed URLs, 15-min expiry | ✅ |
| [ ] | Gate “a guide, checklist, **pitch deck** or **preset pack**” | Lead magnets body | PDF only (10 MB). Preset packs are usually ZIP files | 🟡 |
| [ ] | Waitlist / “collects early believers” | Innovators card (`join-waitlist`), founder testimonial | `gated_pdf` requires a file. Needs an **email-capture-only** block | 🟡 |
| [ ] | “Unlocked by 1,284 people” count per lead magnet | Lead magnet mockup | `lead_submit` events per block | ✅ |
| [ ] | Recent leads list with timestamps | Lead magnet mockup | `GET /api/leads` | ✅ |
| [ ] | One-click CSV export | Lead magnets, FAQ | `GET /api/leads/export` | ✅ |
| [ ] | Export **filtered by date or source** | FAQ | List is filterable; export endpoint needs the same filters | 🟡 |
| [ ] | Import leads into “any email **or WhatsApp** tool” | FAQ | Phone is optional on `leads`; must be in the CSV when collected | ✅ |
| [ ] | “Your audience is yours”, export anytime, no lock-in | About values | `GET /api/me/export`, `DELETE /api/me` | ✅ |

---

## 5. Source analytics

| | Promise | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Every share gets its own source tag (`?src=yt-review`) | How it works, Platforms, FAQ | `source_tag` on `links` and `page_events`; page reads `?src=` | ✅ |
| [ ] | Easy way to create a tagged link per platform/post | Implied by “tag every link you share” | No UI or endpoint for generating tagged links | 🟡 |
| [ ] | Views, clicks and leads per source / per post | Source analytics, FAQ | `GET /api/analytics/sources` | ✅ |
| [ ] | “Compare platforms side by side” (icons per source) | Analytics card, Live sources feed | Needs a platform per tag (prefix convention like `ig-`, `yt-` or a `platform` field) | 🟡 |
| [ ] | Period-over-period trend (“+38%”) | Analytics card | Overview supports date ranges; comparison not specified | 🟡 |
| [ ] | Privacy-friendly, hashed visitor data | Source analytics, About values | `ip_hash`, never raw IP | ✅ |
| [ ] | “₹499 sale” rows per source | Live sources feed | v1 tracks views, clicks and leads only. **Sales are not tracked** (checkout is external) | 🔴 |
| [ ] | Live, real-time feed of events | Live sources card | Dashboard queries cached 1–5 min; no realtime | 🟡 |

**Fix options for 🔴:** reword to “which post sent every **lead**” and drop “sale” rows from the feed, **or** add post-purchase tracking (gateway webhooks or a thank-you-page pixel) to the roadmap.

---

## 6. Creator page

| | Promise | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Stack links, freebies and products | Your page, How it works | `link`, `gated_pdf`, `product_card` blocks | ✅ |
| [ ] | Drag to reorder blocks | Your page | `POST /api/pages/:pageId/blocks/reorder` | ✅ |
| [ ] | Themes that match your brand (swatch picker) | Your page, phone mockup | `pages.theme` | ✅ |
| [ ] | Social icons for every platform (12+) | Your page, FAQ, About facts, phone mockup | `social_icons` block. Icon set must cover Instagram, YouTube, X, Spotify, WhatsApp, Threads, Facebook, Telegram, Discord, Twitch, Pinterest, Substack and LinkedIn | 🟡 |
| [ ] | “Your latest video, podcast or playlist” | Your page body, phone mockup (Spotify episode) | Works as a plain `link`. Rich embeds are not in the SRS | 🟡 |
| [ ] | Booking link (“book-a-call”, “1:1 call”) | Coaches card, phone mockup | Plain `link` block | ✅ |
| [ ] | Fast, mobile-first public page | Your page | SSR + edge cache, invalidated on publish | ✅ |

---

## 7. Platforms

| | Promise | Where | SRS mapping | Status |
|---|---|---|---|---|
| [ ] | Works on Instagram, YouTube, X, Spotify, WhatsApp, Threads, Facebook, Telegram, Discord, Twitch, Pinterest, Substack, LinkedIn, email signatures | Platforms section, FAQ | It is a URL, so it works anywhere | ✅ |
| [ ] | Link previews look right when pasted into these apps | Implied | `meta_title`, `meta_description`, `meta_image_url` on pages | ✅ |
| [ ] | “QR codes on packaging” | Platforms footnote | No QR generation for a creator’s page | 🟡 |

---

## 8. About page

| | Promise | Where | Status |
|---|---|---|---|
| [ ] | Facts: free to start, 12+ platforms, 15-minute links, 5 minutes to go live | About facts strip | Depends on items above (✅ / 🟡) |
| [ ] | Four promises: audience ownership, India first & global, privacy by default, every platform | About values | ✅ once sections 3, 4, 5, 6 ship |
| [ ] | Roadmap **Next**: native checkout, custom domains, more block types | About roadmap | 🔴 All listed as “not in v1” in SRS §16 |
| [ ] | Roadmap **Later**: AI page builder, email follow-ups, team workspaces | About roadmap | 🔴 All listed as “not in v1” in SRS §16 |

**Decision needed:** confirm these are real plans you are happy to state publicly, or soften to “Exploring”.

---

## 9. Contact page & operations

| | Item | Where | Status |
|---|---|---|---|
| [ ] | Inboxes exist and are monitored: `hello@`, `support@`, `partners@`, `press@linkboost.bio` | `src/lib/constants/contact.ts` | ⚪ |
| [ ] | “A real human reads every message” / “A real human will answer” | Contact hero, FAQ | ⚪ |
| [ ] | Contact form actually delivers (today it opens the visitor’s mail app) | Contact form | 🟡 Needs the transactional email provider (SRS §12, still TBD) |

---

## 10. Placeholder content to replace before launch

| | Item | Where | Status |
|---|---|---|---|
| [ ] | Testimonials (Ananya R., Rohit M., Meher K.) and their numbers (“400 emails in a week”) | `landing.ts` → `testimonials` | ⚪ Replace with real, consented quotes |
| [ ] | Demo numbers in mockups (835 leads, 1,284 unlocks, +38%) | `landing/mockups/*` | ⚪ Fine as illustrations; never present them as platform stats |
| [ ] | Product names, emails and handles in mockups | `landing/mockups/*` | ⚪ Use fictional data only |
| [ ] | Legal pages linked from the site (privacy, terms, consent) | Footer (not yet linked) | ⚪ SRS §11 requires privacy disclosure and cookie consent |

---

## Launch gate

The marketing site can go live when:

1. Every row in sections 1–7 is ✅ **and ticked**, or its copy has been changed and this doc updated.
2. All 🔴 rows are resolved (built, or removed from the site).
3. Section 10 placeholders are replaced.

When you change marketing copy, update this file in the same commit.

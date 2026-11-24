# Landing Page Research — Link-in-Bio & Creator-Commerce Leaders

> **Purpose:** a knowledge base of how six high-standard creator-platform landing pages are actually built (UI, UX, micro-interactions, fonts, color, imagery), to inform the LinkBoost marketing site.
> **Captured:** 24 Nov 2026 · **Method:** live inspection in headless Google Chrome (Playwright) at 1440×900 desktop and 390×844 mobile. Each page was scrolled top to bottom to trigger lazy content and reveals, then computed styles, CSS rules, `document.fonts`, `document.getAnimations()` and hover states were read.
> **Scope:** read-only. No forms were submitted, no sign-ins made, and no links followed beyond the six URLs.

## Files

| Site | Teardown | Personality in one phrase |
|---|---|---|
| Linktree | [01-linktree.md](01-linktree.md) | Color-blocked brand poster |
| Beacons | [02-beacons.md](02-beacons.md) | Glassy SaaS with a choreographed product demo |
| Stan Store | [03-stan.md](03-stan.md) | Loud violet storefront, copy-driven conversion |
| Bio Sites (Squarespace) | [04-biosites.md](04-biosites.md) | Monochrome fashion editorial, video-first |
| SuperProfile (India) | [05-superprofile.md](05-superprofile.md) | Polished Framer SaaS, sans + italic serif |
| Topmate (India) | [06-topmate.md](06-topmate.md) | Brutalist poster type, warm blocks, one easing curve |

Supporting material:

- `shots/` contains a desktop hero, mobile hero and full-page desktop capture for every site.
- `data/` contains the raw probe output (JSON) for every site.
- `tools/probe.mjs` is the script that produced it. Re-run with `node tools/probe.mjs <out-dir> [site]` after `npm i playwright-core` in a scratch directory; it needs Google Chrome installed.

### Evidence tiers used in every file

- **[M] Measured:** read directly from the live page, so it is reproducible.
- **[D] Derived:** computed from measured values (ratios, em conversions, patterns).
- **[I] Inferred:** a judgement about intent or technique. It is never stated as fact.

---

## 1. Side-by-side comparison

### Stack and fonts

| | Stack | Display font | Body font | Accent font |
|---|---|---|---|---|
| Linktree | Next.js App Router, Tailwind v4 [I], Lottie, Rive | Link Sans (custom variable 300–900), weight 800 | Link Sans | DM Mono, Mencken Narrow, pixel font |
| Beacons | Next.js App Router, hand-written `ms-` CSS, Rive | Onest (variable 400–800), weight 700 | Inter (variable) | IBM Plex Mono 10px labels, Patrick Hand |
| Stan | Bootstrap 5, Swiper, Vue [I] | Plus Jakarta Sans 800/900 | Plus Jakarta Sans | (none; emoji used as accent) |
| Bio Sites | Next.js, CSS Modules | Clarkson 500 | Clarkson | Canela serif (templates) |
| SuperProfile | Framer, Lenis, styled-components | Hind Madurai 500 | Hind Madurai / Inter | **Instrument Serif italic** |
| Topmate | Next.js App Router, Tailwind v4, AntD | Inter 900 UPPERCASE | Inter | (none; one family only) |

### Hero headline

| | Size / line-height | Weight | Tracking | Mobile size |
|---|---|---|---|---|
| Linktree | 80 / 85.6px (1.07) | 800 | −0.02em | 37.4px |
| Beacons | 60.5 / 59.3px (0.98) | 700 | −0.03em | 40px |
| Stan | 72 / 75.6px (1.05) | 800 | −1.5px | 36px |
| Bio Sites | 35 / 35px (1.0) | 500 | −1px | 21px |
| SuperProfile | 65 / 58.5px (0.90) | 500 | −0.06em | 40px |
| Topmate | **162 / 139.3px (0.86)** | 900 | −0.045em | 54px |

All values [M]; the ratios in brackets are [D].

**Pattern [D]:** all six heroes use a line-height ≤ 1.07 and negative tracking of about −0.02em or tighter. Five of them set the headline at 60px or larger. Bio Sites keeps it at 35px because its full-bleed video carries the hero.

### Colors and shape

| | Primary CTA color | Page base | CTA radius | Shadows |
|---|---|---|---|---|
| Linktree | `#254F1A` / `#1E2330` | Section colors rotate | 9999px | Almost none |
| Beacons | `#000` | Lavender-to-blush gradient | 999px | Negative-spread "floating" |
| Stan | `#30FFB4` mint on `#6355FF` | Violet, then white | 100px | Huge soft (50px 80px) |
| Bio Sites | `#000` (inverts on hover) | Black / white | 46px | **None** |
| SuperProfile | `#0059FF` | White plus sky card | 48px | Layered 4–5 stack |
| Topmate | `#C7E98C` lime | White / peach / `#141414` | 999px | **None** |

### Motion

| | Main easing | CTA hover | Notable motion |
|---|---|---|---|
| Linktree | `cubic-bezier(.433,.217,.355,1)` 0.7s | bg lightens, 150ms | Hero image towers drift (30s loop) |
| Beacons | `cubic-bezier(.22,1,.36,1)` 0.9s | bg `#000` → `#2B2B2B`, 200ms | Staggered entrance; CSS product demo; scroll-driven tile straighten |
| Stan | `ease-in-out` 0.3s | **no change** | Image crossfades only |
| Bio Sites | `linear` 0.3s / `ease-in-out` 0.5s | full color invert | 100s template marquee; sticky-scroll storytelling |
| SuperProfile | spring `linear()` 2.8s | instant bg swap (JS) | Lenis smooth scroll; spring word reveal; 77s logo marquee |
| Topmate | `cubic-bezier(.25,1,.5,1)` 0.4s | **scale(0.97)** + darker bg | Rolling masked text; grid-rows accordion; 5s auto-advancing tab progress |

---

## 2. Cross-site patterns (what "high standard" means here)

These are [D] observations across the six sites. Where a pattern implies intent, it is [I].

1. **The hero claims a username.** Linktree (`linktr.ee/`) and Beacons (`beacons.ai/ yourname`) put a prefilled domain input next to the CTA. The visitor starts onboarding inside the hero.
2. **Show the product mechanism, not a stock smile.** Beacons builds the comment → keyword → auto-DM flow as live UI. Topmate overlays a booking card (₹1,499, UPI · Card, date chips, Confirm and Pay) on a real photo. Stan floats priced product chips. Every top site shows *transactions*, not decorations.
3. **Real people plus real UI.** Creator photography is always paired with that creator's page or checkout (Linktree's caption "Koy Sun. Lettering artist and illustrator.", Topmate's ring-light creator).
4. **Pills dominate.** Every site's primary CTA is a pill (radius 46px to 9999px). 999px/9999px is the single most-used radius on Linktree, Beacons and Topmate. Cards sit at 16–28px.
5. **Shadows are rare or engineered.** Topmate and Bio Sites use none. Linktree has 2 values. Where shadows exist, they are either negative-spread (Beacons `0 20px 40px -24px`) or multi-layer stacks (SuperProfile). Flat single `box-shadow: 0 4px 6px` "AI defaults" don't appear.
6. **Color blocks create rhythm.** Linktree (lime → blue → maroon → sage → cream → purple) and Topmate (white → peach → cream → lime → `#141414`) change the full-bleed background each section, so each scroll step feels like a new chapter.
7. **Every site has one motion voice.** Topmate reuses one curve almost everywhere. Beacons uses a family of ease-outs. Linktree pairs Tailwind's default with a custom 0.7s curve. Top-tier sites don't mix random easings.
8. **Ambient motion is slow; interactive motion is fast.** Background loops run 9–100s (Beacons glow 9s/28s, Linktree towers 30s, logo marquees 77–100s). Hovers and toggles run 150–400ms.
9. **Mono or serif accents add texture.** Beacons uses IBM Plex Mono micro-labels. Linktree uses DM Mono captions. SuperProfile uses an Instrument Serif italic line, and Bio Sites has Canela in templates. A second voice is used sparingly.
10. **India-first signals** appear on SuperProfile and Topmate: ₹ pricing, UPI, "₹100+ crore paid", Indian faces, WhatsApp-style proof, and Google One Tap on mobile.
11. **Social proof is quantified and up front.** Figures include "70M+" (Linktree), "10M+" with an avatar stack (Beacons), "500,000+" (SuperProfile) and "₹100+ crore" (Topmate). They sit in the hero or the first section after it.
12. **FAQ near the bottom, then a final CTA band.** All six end this way.

---

## 3. Micro-interaction recipes (in words)

These describe mechanisms observed on the sites. Values to use in LinkBoost must come from LinkBoost's own tokens; the measured numbers here are reference points, not defaults.

| Recipe | Seen on | How it's built |
|---|---|---|
| Staggered hero entrance | Beacons | Headline, paragraph and form rise and fade in sequence, each starting ~100ms after the previous, on a strong ease-out curve of just under 1s |
| Press-on-hover button | Topmate | On hover the button shrinks slightly (97%) on a long ease-out while the background darkens one step |
| Invert-on-hover pill | Bio Sites | Background and text colors swap over 300ms linear |
| Rolling word swap | Topmate | Each word sits in a line box with a few-pixel top/bottom fade mask; on change, the word slides vertically (500ms ease-out) while a short linear fade covers the swap |
| Height-free accordion | Topmate | The container's `grid-template-rows` transitions (0.4s ease-out), so it reaches content height without JavaScript measurement [I] |
| Rotating word in headline | Beacons | A single word slot cycles through audience types on a long infinite keyframe loop (16.8s) |
| Scroll-straightening tiles | Beacons | Tilted photo tiles rotate to 0° as they scroll in (CSS scroll-driven animation [I]) |
| Glass nav | Beacons | A fixed floating pill at 80% white with background blur and saturation; a soft shadow is present once scrolled |
| Breathing glow | Beacons | A blurred radial gradient plus a masked conic ring, slowly pulsing (9s) and rotating (28s) |
| Edge-faded marquee | SuperProfile, Bio Sites | Logos or templates move linearly over 77–100s inside a horizontal gradient mask (transparent → opaque at 12.5% → transparent) |
| Spring text reveal | SuperProfile | Words snap in, then settle over a long spring tail (50% of motion done at ~6% of the time) |
| Auto-advancing tabs | Topmate | A thin progress bar fills linearly over 5s, then the next offer tab activates [I] |
| Glass button on imagery | Bio Sites | A 25% black fill with a heavy background blur over the template images |

---

## 4. What this means for LinkBoost (design choices, not extractions)

The [UI design laws doc](../UI_DESIGN_AND_FLOW_LAWS.md) already defines the brand: Cranberry `#E23744`, obsidian `#18181B`, warm panel `#F7F7F5`, a tri-stack typography system and the "show the real mechanism" rule. That direction matches what the best sites do (pattern 2). Suggestions for the **marketing landing page**:

1. **Hero:** a username-claim input (`linkboost.bio/` + name) next to one Cranberry pill CTA, with a product-mechanism visual beside it. For example, a Reel comment "GUIDE", then the gated lead form, then "Lead captured ✓ · ₹499 sale" as a constructed live UI card on a real creator photo (the Topmate + Beacons pattern).
2. **Type:** the existing doc's H1 of 24–28px is for app and auth screens. A landing page needs a separate **display scale**. Every reference here uses 56–162px heroes with a line-height of about 0.86–1.07 and tracking of about −0.02 to −0.045em. Keep the mono voice for slugs, keywords and metrics, which matches the Beacons labels.
3. **Rhythm:** alternate full-bleed section backgrounds (white → `#F7F7F5` → obsidian → a Cranberry-tinted band), as Linktree and Topmate do, rather than one long white page.
4. **Depth:** stay flat (no shadow, as on Topmate and Bio Sites), or use one engineered negative-spread shadow for floating UI cards only.
5. **Motion voice:** pick **one** ease-out curve for all interactive motion and one slow cadence for ambient loops. Add press-on-hover CTAs, a grid-rows FAQ accordion and a staggered hero entrance. Respect `prefers-reduced-motion`.
6. **India-first proof:** ₹ amounts, UPI, Indian creators, WhatsApp/Instagram DM screenshots, and a quantified headline stat.
7. **Avoid:** Stan's missing hover feedback, PNG-heavy heroes, Framer-only JS motion, and very long mobile pages (SuperProfile's mobile page is 16.5k px).

---

## 5. Known gaps in this research

- Lottie/Rive asset contents (Linktree, Beacons) were not decoded.
- Keyframe bodies were captured only partially (names plus the running timings). Full keyframe CSS for the named animations is stored in `data/*.json` → `desktop.keyframes`, truncated to 600 characters each.
- Bio Sites breakpoints were not found by the stylesheet walk.
- Scroll-trigger logic (which scroll positions start which reveal) was sampled at two scroll points, not mapped exhaustively.
- Hover was probed on up to 5 above-the-fold buttons per site. Focus-visible and active states were not captured.
- Dark-mode or theme toggles were not exercised (none of the six landing pages exposed one).

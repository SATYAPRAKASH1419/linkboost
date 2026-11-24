import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const SITES = {
  linktree: 'https://linktr.ee/',
  beacons: 'https://beacons.ai/',
  stan: 'https://stan.store/',
  biosites: 'https://biosites.com/',
  superprofile: 'https://superprofile.bio/in',
  topmate: 'https://topmate.io/',
};
const OUT = process.argv[2];
const only = process.argv[3];
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'data'), { recursive: true });

const probe = () => {
  const res = performance.getEntriesByType('resource').map(r => r.name);
  const any = re => res.some(n => re.test(n));
  const attr = sel => !!document.querySelector(sel);
  const all = [...document.querySelectorAll('body *')];
  const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const count = (fn) => { const m = new Map(); for (const el of all) { const v = fn(el); if (v) m.set(v, (m.get(v) ?? 0) + 1); } return [...m].sort((a, b) => b[1] - a[1]); };

  const stack = {
    next: !!window.__NEXT_DATA__ || any(/\/_next\/static/), nextAppRouter: typeof self.__next_f !== 'undefined',
    nuxt: !!window.__NUXT__ || any(/\/_nuxt\//), gatsby: !!window.___gatsby, astro: attr('astro-island, [data-astro-cid]'),
    svelte: attr('[class*="svelte-"]'), webflow: !!document.documentElement.getAttribute('data-wf-page') || any(/webflow/),
    framer: attr('[data-framer-name], [class*="framer-"]') || any(/framerusercontent|framer\.com/),
    wordpress: any(/wp-content|wp-includes/),
    tailwind: attr('[class*="bg-linear-to"], [class*="bg-gradient-to"]') || getComputedStyle(document.documentElement).getPropertyValue('--tw-ring-offset-width') !== '',
    styledComponents: attr('[class^="sc-"]') || attr('style[data-styled]'), emotion: attr('[class^="css-"]'),
    cssModules: all.some(e => /\b[A-Za-z]+_[A-Za-z0-9]+__[A-Za-z0-9_-]{5}\b/.test(e.getAttribute('class') || '')),
    radix: attr('[data-radix-popper-content-wrapper], [data-state][data-side]'),
    gsap: !!window.gsap, lenis: !!window.lenis || attr('html.lenis'), lottie: attr('lottie-player, dotlottie-player, [class*="lottie"]') || any(/lottie/),
    rive: any(/rive/), threejs: !!window.THREE || any(/three/), swiper: attr('.swiper'), splide: attr('.splide'),
    generator: document.querySelector('meta[name="generator"]')?.content ?? null,
    scriptHosts: [...new Set(res.map(n => { try { return new URL(n).host } catch { return '' } }))].slice(0, 40),
  };

  const tokens = {}; const unreadable = []; const bps = new Set(); const keyframes = {}; const fontFaces = [];
  const bpre = /(min|max)-width:\s*[\d.]+(px|r?em)|width\s*[<>]=?\s*[\d.]+(px|r?em)/g;
  const walk = list => { for (const r of list ?? []) {
    if (r.selectorText && /(^|,)\s*(:root|html|:host|body)\s*(,|$)/.test(r.selectorText)) for (const p of r.style) if (p.startsWith('--')) tokens[p] = r.style.getPropertyValue(p).trim();
    for (const m of (r.media?.mediaText ?? r.conditionText ?? '').matchAll(bpre)) bps.add(m[0]);
    if (r.type === 7 || r.constructor?.name === 'CSSKeyframesRule') keyframes[r.name] = r.cssText.slice(0, 600);
    if (r.constructor?.name === 'CSSFontFaceRule') fontFaces.push(`${r.style.getPropertyValue('font-family')} | ${r.style.getPropertyValue('font-weight')} | ${r.style.getPropertyValue('src').slice(0, 140)}`);
    if (r.cssRules) walk(r.cssRules);
  }};
  for (const s of document.styleSheets) { let rules; try { rules = s.cssRules } catch { unreadable.push(s.href); continue } walk(rules); }

  const typeScale = (() => { const seen = new Map(); for (const el of all) {
    if ([...el.childNodes].every(n => n.nodeType !== 3 || !n.textContent.trim())) continue; if (!visible(el)) continue;
    const s = getComputedStyle(el);
    const key = `${parseFloat(s.fontSize)}px | w${s.fontWeight} | lh ${s.lineHeight} | ls ${s.letterSpacing} | ${s.fontFamily.split(',')[0]}`;
    seen.set(key, (seen.get(key) ?? 0) + 1); } return [...seen].sort((a, b) => b[1] - a[1]).slice(0, 30); })();

  const headings = [...document.querySelectorAll('h1,h2,h3')].filter(visible).slice(0, 30).map(h => {
    const s = getComputedStyle(h); return { tag: h.tagName, text: h.innerText.trim().replace(/\s+/g, ' ').slice(0, 120),
      size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, family: s.fontFamily.slice(0, 80), color: s.color, transform: s.textTransform }; });

  const buttons = [...document.querySelectorAll('a,button')].filter(visible).filter(b => {
    const s = getComputedStyle(b); return s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.borderStyle !== 'none'; }).slice(0, 25).map(b => {
    const s = getComputedStyle(b); const r = b.getBoundingClientRect();
    return { text: b.innerText.trim().replace(/\s+/g, ' ').slice(0, 50), bg: s.backgroundColor, color: s.color, radius: s.borderRadius,
      border: `${s.borderWidth} ${s.borderStyle} ${s.borderColor}`, pad: s.padding, size: `${Math.round(r.width)}x${Math.round(r.height)}`,
      font: `${s.fontSize} w${s.fontWeight} ${s.fontFamily.split(',')[0]}`, transition: `${s.transitionProperty} ${s.transitionDuration} ${s.transitionTimingFunction}`, shadow: s.boxShadow }; });

  const sections = [...document.querySelectorAll('section, main > div, body > div > div > section, footer, header, nav')].filter(visible).slice(0, 40).map(el => {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: (el.getAttribute('class') || '').slice(0, 60), top: Math.round(r.top + scrollY), h: Math.round(r.height), bg: s.backgroundColor,
      bgImg: s.backgroundImage.slice(0, 120), heading: el.querySelector('h1,h2')?.innerText?.trim().replace(/\s+/g, ' ').slice(0, 90) }; });

  const images = [...document.images].filter(i => i.currentSrc).slice(0, 60).map(i => {
    const r = i.getBoundingClientRect(); return { src: i.currentSrc.slice(0, 160), alt: (i.alt || '').slice(0, 60), w: Math.round(r.width), h: Math.round(r.height), natural: `${i.naturalWidth}x${i.naturalHeight}`, loading: i.loading, radius: getComputedStyle(i).borderRadius }; });
  const videos = [...document.querySelectorAll('video')].map(v => ({ src: (v.currentSrc || v.querySelector('source')?.src || '').slice(0, 160), poster: (v.poster || '').slice(0, 120), autoplay: v.autoplay, loop: v.loop, muted: v.muted, w: Math.round(v.getBoundingClientRect().width) }));

  const effects = (() => { const dead = v => !v || v === 'none' || v === 'normal' || v === '1' || v === 'blur(0px)'; const hits = [];
    for (const el of all) for (const ps of [null, '::before', '::after']) { const s = getComputedStyle(el, ps); const f = {};
      for (const p of ['backgroundImage', 'filter', 'backdropFilter', 'mixBlendMode', 'maskImage']) { const v = s[p] || (p === 'maskImage' ? s.webkitMaskImage : ''); if (!dead(v) && !/^url\(/.test(v)) f[p] = String(v).slice(0, 220); }
      if (Object.keys(f).length) hits.push({ tag: el.tagName, ps: ps ?? '', cls: (el.getAttribute('class') || '').slice(0, 50), f }); }
    return hits.slice(0, 30); })();

  return {
    url: location.href, title: document.title, description: document.querySelector('meta[name="description"]')?.content, viewport: innerWidth, docHeight: document.documentElement.scrollHeight,
    stack,
    fonts: { loaded: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`))], body: getComputedStyle(document.body).fontFamily, fontFaces: fontFaces.slice(0, 40) },
    tokens: Object.fromEntries(Object.entries(tokens).slice(0, 250)), tokenCount: Object.keys(tokens).length, unreadable,
    bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color,
    bgColors: count(el => visible(el) && getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)' ? getComputedStyle(el).backgroundColor : null).slice(0, 25),
    textColors: count(el => visible(el) && el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) ? getComputedStyle(el).color : null).slice(0, 15),
    typeScale, headings, buttons, sections, images, videos,
    radius: count(el => { const v = getComputedStyle(el).borderRadius; return v !== '0px' ? v : null }).slice(0, 15),
    shadow: count(el => { const v = getComputedStyle(el).boxShadow; return v !== 'none' ? v.slice(0, 160) : null }).slice(0, 12),
    transitions: count(el => { const s = getComputedStyle(el); return s.transitionDuration !== '0s' ? `${s.transitionProperty.slice(0, 80)} | ${s.transitionDuration} | ${s.transitionTimingFunction}` : null }).slice(0, 20),
    animationsCss: count(el => { const s = getComputedStyle(el); return s.animationName !== 'none' ? `${s.animationName} | ${s.animationDuration} | ${s.animationTimingFunction} | ${s.animationIterationCount}` : null }).slice(0, 20),
    keyframes, breakpoints: [...bps].sort(),
    liveAnimations: document.getAnimations().slice(0, 25).map(a => { const t = a.effect?.getTiming?.() ?? {}; return { target: a.effect?.target?.tagName, cls: (a.effect?.target?.getAttribute?.('class') || '').slice(0, 50), name: a.animationName ?? a.transitionProperty ?? '(waapi)', duration: t.duration, delay: t.delay, easing: t.easing, iter: t.iterations, kf: JSON.stringify((a.effect?.getKeyframes?.() ?? []).slice(0, 3).map(({ offset, easing, opacity, transform, filter }) => ({ offset, easing, opacity, transform, filter }))).slice(0, 300) }; }),
    effects,
    navLinks: [...document.querySelectorAll('header a, nav a, header button, nav button')].filter(visible).map(a => a.innerText.trim()).filter(Boolean).slice(0, 25),
    stickyHeader: (() => { const h = document.querySelector('header, nav'); return h ? { position: getComputedStyle(h).position, bg: getComputedStyle(h).backgroundColor, backdrop: getComputedStyle(h).backdropFilter, h: h.getBoundingClientRect().height } : null })(),
  };
};

const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const [name, url] of Object.entries(SITES)) {
  if (only && only !== name) continue;
  const result = {};
  try {
    // desktop
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2500);
    // capture early (entrance) animations
    result.entranceAnimations = await page.evaluate(() => document.getAnimations().slice(0, 30).map(a => { const t = a.effect?.getTiming?.() ?? {}; return { target: a.effect?.target?.tagName, cls: (a.effect?.target?.getAttribute?.('class') || '').slice(0, 50), name: a.animationName ?? a.transitionProperty ?? '(waapi)', duration: t.duration, delay: t.delay, easing: t.easing, iter: t.iterations }; }));
    await page.screenshot({ path: path.join(OUT, 'shots', `${name}-hero-desktop.jpg`), type: 'jpeg', quality: 70 });
    // dismiss cookie banners by pressing Escape only (no clicks on site content)
    await page.keyboard.press('Escape').catch(() => {});
    // progressive scroll to trigger reveals / lazy loading
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 600) { await page.evaluate(yy => window.scrollTo(0, yy), y); await page.waitForTimeout(250); }
    await page.waitForTimeout(800);
    // hero-scroll sample: what animations run mid-page
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.3));
    await page.waitForTimeout(700);
    result.midScrollAnimations = await page.evaluate(() => document.getAnimations().slice(0, 25).map(a => { const t = a.effect?.getTiming?.() ?? {}; return { target: a.effect?.target?.tagName, cls: (a.effect?.target?.getAttribute?.('class') || '').slice(0, 50), name: a.animationName ?? a.transitionProperty ?? '(waapi)', duration: t.duration, delay: t.delay, easing: t.easing, iter: t.iterations }; }));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    result.desktop = await page.evaluate(probe);
    // header state after scroll
    await page.evaluate(() => window.scrollTo(0, 400)); await page.waitForTimeout(600);
    result.headerAfterScroll = await page.evaluate(() => { const h = document.querySelector('header, nav'); if (!h) return null; const s = getComputedStyle(h); const r = h.getBoundingClientRect(); return { position: s.position, top: r.top, bg: s.backgroundColor, backdrop: s.backdropFilter, shadow: s.boxShadow, h: r.height }; });
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
    // hover probe on first 4 visible CTA-like buttons
    const cands = await page.$$('a, button');
    const hovers = [];
    for (const c of cands) {
      if (hovers.length >= 5) break;
      const info = await c.evaluate(el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { vis: r.width > 60 && r.height > 28 && r.top >= 0 && r.top < 880, bg: s.backgroundColor, text: el.innerText.trim().slice(0, 40) }; }).catch(() => null);
      if (!info?.vis || info.bg === 'rgba(0, 0, 0, 0)' || !info.text) continue;
      const read = () => c.evaluate(el => { const s = getComputedStyle(el); return { bg: s.backgroundColor, color: s.color, transform: s.transform, shadow: s.boxShadow.slice(0, 120), radius: s.borderRadius, border: s.borderColor, opacity: s.opacity, transition: `${s.transitionProperty.slice(0, 60)} ${s.transitionDuration} ${s.transitionTimingFunction}` }; });
      const before = await read();
      await c.hover({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(600);
      const after = await read();
      hovers.push({ text: info.text, before, after });
      await page.mouse.move(0, 0); await page.waitForTimeout(300);
    }
    result.hovers = hovers;
    await page.screenshot({ path: path.join(OUT, 'shots', `${name}-full-desktop.jpg`), type: 'jpeg', quality: 55, fullPage: true }).catch(e => { result.fullShotError = String(e) });
    await ctx.close();

    // mobile
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const mp = await mctx.newPage();
    await mp.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await mp.waitForTimeout(3000);
    await mp.screenshot({ path: path.join(OUT, 'shots', `${name}-hero-mobile.jpg`), type: 'jpeg', quality: 70 });
    result.mobile = await mp.evaluate(() => ({
      headings: [...document.querySelectorAll('h1,h2')].slice(0, 8).map(h => { const s = getComputedStyle(h); return { text: h.innerText.trim().slice(0, 80), size: s.fontSize, lh: s.lineHeight, weight: s.fontWeight }; }),
      nav: (() => { const h = document.querySelector('header, nav'); return h ? { h: h.getBoundingClientRect().height, bg: getComputedStyle(h).backgroundColor, items: [...h.querySelectorAll('a,button')].filter(a => a.getBoundingClientRect().width > 0).map(a => a.innerText.trim() || a.getAttribute('aria-label')).slice(0, 10) } : null })(),
      docHeight: document.documentElement.scrollHeight,
    }));
    await mctx.close();
  } catch (e) { result.error = String(e); }
  fs.writeFileSync(path.join(OUT, 'data', `${name}.json`), JSON.stringify(result, null, 1));
  console.log(name, result.error ?? 'ok');
}
await browser.close();

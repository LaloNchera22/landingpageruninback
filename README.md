# Runinback — landing

Pre-launch landing page for Runinback (video game tournaments). No login, no dashboard: ready to hook up once the dashboard is done.

**Stack:** React 19 + Vite · [GSAP](https://github.com/greensock/GSAP) (ScrollTrigger, SplitText) · [Lenis](https://github.com/darkroomengineering/lenis) · [Vanta](https://github.com/tengbao/vanta) · components adapted from [React Bits](https://github.com/DavidHDev/react-bits).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ (index, privacy, terms, cookies, 404)
npm run lint
```

## Structure

- `src/sections/hero/` — "INDEX"-style hero: wordmark, center column of animated typographic cards framed by `[ ]`, hover index and Vertical / Horizontal / Grid views.
- `src/sections/` — marquee, manifesto, how it works (pinned horizontal scroll), live bracket, roles, prize calculator, fair play, FAQ, CTA and footer.
- `src/bits/` — adapted React Bits components (SplitText, ScrollReveal, ScrollVelocity, DecryptedText, CountUp, Magnet, Noise).
- `src/components/Vanta.jsx` — Vanta backgrounds loaded on demand and only while on screen.
- `src/components/cookies/` + `src/lib/consent.js` — cookie banner and preferences (`rib-cookie-consent`).
- `src/legal/` + `*.html` — legal pages (drafts pending legal review).
- `docs/SEO.md` — SEO notes and launch to-dos.

## When the dashboard is ready

Set the URL in `SITE.appUrl` (`src/lib/site.js`): the "Notify me at launch" CTA becomes "Open Runinback". If you edit `src/content/faq.js`, update the JSON-LD in `index.html` too.

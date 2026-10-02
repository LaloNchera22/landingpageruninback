# SEO — Runinback ("coming soon" landing)

## What's configured

- **`index.html` (head)**: title, meta description, canonical `https://runinback.com/`, `robots` index/follow with `max-image-preview:large`, `theme-color` #0b0b0b, `color-scheme`, Open Graph (`en_US`, 1200×630 image with alt), Twitter `summary_large_image`, favicons 16/32, apple-touch-icon and manifest.
- **JSON-LD (`@graph`)**: `Organization` (logo `icon-512.png`, support email), `WebSite`, `WebPage` and `FAQPage`.
  - The `FAQPage` is a literal copy of `src/content/faq.js`. **If you change a question or answer, update the JSON-LD too** (Google penalizes markup that doesn't match visible content).
- **`<noscript>`**: H1 + summary + legal links, for crawlers without JS.
- **`public/robots.txt`**: allows everything and points to the sitemap.
- **`public/sitemap.xml`**: `/`, `/privacy.html`, `/terms.html`, `/cookies.html` (lastmod 2026-10-02).
- **`public/site.webmanifest`**: English name, brand colors, 192/512 icons.
- **`public/og-image.png`**: 1200×630, monochrome editorial style (logo, "Video game tournaments.", bracket inside [ ]).

## Keyword focus

Primary: **video game tournaments**. Secondary: **tournament brackets**, **1v1 tournaments**, **create a tournament (online)**, **tournaments with prizes / prize pool**, single elimination, private tournaments.

- One visible H1 per page containing "video game tournaments". Current: *"1v1 video game tournaments. Build your bracket, compete and win."*
- Section H2s use the secondary terms naturally ("How it works", "Prizes", "FAQ").
- **Never** name specific games or publishers.

## Launch to-dos

1. Verify the domain in **Google Search Console** and **Bing Webmaster Tools**; submit `sitemap.xml`.
2. Check previews with the Meta sharing debugger, the X card validator and Google's **Rich Results Test** (FAQPage).
3. When the dashboard ships: add its public URLs (e.g. the public tournament list) to the sitemap, update `lastmod`, and block private routes (`/app`, `/account`, etc.) in `robots.txt`. Private tournaments must be `noindex`.
4. When the platform opens: remove "Coming soon" from the meta description, the `<noscript>`, the OG image and the last FAQ answer.
5. Update the sitemap `lastmod` whenever the legal pages change.
6. Measure Core Web Vitals (Lighthouse / PageSpeed) after deploy; keep LCP < 2.5 s.
7. Optional: add `sameAs` to `Organization` once official social accounts exist.

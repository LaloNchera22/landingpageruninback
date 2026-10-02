# Runinback — landing

Landing pre-lanzamiento de Runinback (torneos de videojuegos). Sin login, sin panel: lista para conectarse cuando el dashboard esté listo.

**Stack:** React 19 + Vite · [GSAP](https://github.com/greensock/GSAP) (ScrollTrigger, SplitText) · [Lenis](https://github.com/darkroomengineering/lenis) · [Vanta](https://github.com/tengbao/vanta) · componentes adaptados de [React Bits](https://github.com/DavidHDev/react-bits).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ (index, privacidad, terminos, cookies, 404)
npm run lint
```

## Estructura

- `src/sections/hero/` — hero estilo "INDEX": wordmark, columna central con tarjetas tipográficas animadas enmarcadas por `[ ]`, índice con hover y vistas Vertical / Horizontal / Grid.
- `src/sections/` — marquee, manifiesto, cómo funciona (scroll horizontal fijado), bracket en vivo, roles, calculadora de premios, juego limpio, FAQ, CTA y footer.
- `src/bits/` — componentes de React Bits adaptados (SplitText, ScrollReveal, ScrollVelocity, DecryptedText, CountUp, Magnet, Noise).
- `src/components/Vanta.jsx` — fondos Vanta cargados bajo demanda y solo mientras están en pantalla.
- `src/components/cookies/` + `src/lib/consent.js` — banner y preferencias de cookies (`rib-cookie-consent`).
- `src/legal/` + `*.html` — páginas legales (borradores pendientes de revisión legal).
- `docs/SEO.md` — notas de SEO y pendientes de lanzamiento.

## Cuando el dashboard esté listo

Pon la URL en `SITE.appUrl` (`src/lib/site.js`): el CTA "Avísame cuando abra" pasa a "Entrar a Runinback". Si cambias `src/content/faq.js`, actualiza también el JSON-LD de `index.html`.

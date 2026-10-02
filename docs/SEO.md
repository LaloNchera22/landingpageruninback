# SEO — Runinback (landing "muy pronto")

## Qué está configurado

- **`index.html` (head)**: título (50 car.), meta description (146 car.), canonical `https://runinback.com/`, `robots` index/follow con `max-image-preview:large`, `theme-color` #0b0b0b, `color-scheme`, Open Graph (`es_MX`, imagen 1200×630 con alt), Twitter `summary_large_image`, favicons 16/32, apple-touch-icon y manifest.
- **JSON-LD (`@graph`)**: `Organization` (logo `icon-512.png`, email de soporte), `WebSite`, `WebPage` y `FAQPage`.
  - El `FAQPage` es copia literal de `src/content/faq.js`. **Si cambias una pregunta o respuesta, actualiza también el JSON-LD** (Google penaliza el marcado que no coincide con el contenido visible).
- **`<noscript>`**: H1 + resumen + enlaces legales, para rastreadores sin JS.
- **`public/robots.txt`**: permite todo y apunta al sitemap.
- **`public/sitemap.xml`**: `/`, `/privacidad.html`, `/terminos.html`, `/cookies.html` (lastmod 2026-10-02).
- **`public/site.webmanifest`**: nombre en español, colores de marca, iconos 192/512.
- **`public/og-image.png`**: 1200×630, estilo editorial monocromo (logo, "Torneos de videojuegos.", bracket entre [ ]).

## Enfoque de palabras clave

Principal: **torneos de videojuegos**. Secundarias: **brackets / bracket de torneo**, **torneos 1v1 / 1 contra 1**, **crear torneo (online)**, **torneos con premios / bolsa de premios**, eliminación directa, torneos privados.

- Un solo H1 visible por página, con "torneos de videojuegos". Sugerido: *"Torneos de videojuegos 1 contra 1. Crea tu bracket, compite y gana."*
- H2 por sección que usen las secundarias de forma natural (p. ej. "Cómo crear un torneo", "Premios", "Preguntas frecuentes").
- **Nunca** nombrar juegos ni editoras específicos.

## Pendientes para el lanzamiento

1. Verificar el dominio en **Google Search Console** y **Bing Webmaster Tools**; enviar `sitemap.xml`.
2. Revisar la vista previa con el depurador de Facebook/Meta, el validador de X y la **Prueba de resultados enriquecidos** de Google (FAQPage).
3. Cuando salga el dashboard: añadir sus URLs públicas (p. ej. lista de torneos públicos) al sitemap, actualizar `lastmod`, y bloquear en `robots.txt` las rutas privadas (`/app`, `/cuenta`, etc.). Los torneos privados deben llevar `noindex`.
4. Cuando abra la plataforma: quitar "Muy pronto" de la meta description, del `<noscript>`, de la OG image y de la última FAQ.
5. Actualizar `lastmod` del sitemap cada vez que cambien las páginas legales.
6. Medir Core Web Vitals (Lighthouse / PageSpeed) tras el deploy; mantener LCP < 2.5 s.
7. Opcional: agregar `sameAs` al `Organization` cuando existan redes sociales oficiales.

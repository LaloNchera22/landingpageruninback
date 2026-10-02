import { CookieBanner } from '../components/cookies';
import { openCookiePreferences } from '../lib/consent.js';
import { SITE } from '../lib/site.js';
import './legal.css';

export const LEGAL_UPDATED = '2026-10-02';
export const LEGAL_VERSION = '0.1';

const LEGAL_LINKS = [
  { href: '/terminos.html', label: 'Términos', key: 'terminos' },
  { href: '/privacidad.html', label: 'Privacidad', key: 'privacidad' },
  { href: '/cookies.html', label: 'Cookies', key: 'cookies' },
];

/** Header + footer + cookie banner shared by every legal page (and the 404). */
export function LegalShell({ current, children }) {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="lg-header">
        <div className="lg-wrap lg-header__row">
          <a className="lg-logo" href="/" aria-label={`${SITE.name} — inicio`}>
            <img src="/logo-lockup-ink.png" alt={SITE.name} width="718" height="120" />
          </a>
          <a className="lg-back" href="/">
            <span aria-hidden="true">←</span> Volver al inicio
          </a>
        </div>
      </header>

      <main id="contenido" className="lg-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="lg-footer">
        <div className="lg-wrap lg-footer__grid">
          <p className="lg-mono lg-footer__label">[ Legal ]</p>
          <nav className="lg-footer__nav" aria-label="Documentos legales">
            {LEGAL_LINKS.map((l) => (
              <a key={l.key} href={l.href} aria-current={current === l.key ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
            <button type="button" className="lg-footer__prefs" onClick={openCookiePreferences}>
              Configurar cookies
            </button>
          </nav>
          <p className="lg-footer__meta">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>© 2026 {SITE.name}</span>
          </p>
        </div>
      </footer>

      <CookieBanner />
    </>
  );
}

/**
 * Long-form legal document.
 * sections: [{ id, title, body }] — numbered automatically, listed in the TOC.
 */
export default function LegalLayout({ current, kicker = 'Legal', title, lead, sections }) {
  return (
    <LegalShell current={current}>
      <div className="lg-wrap">
        <section className="lg-hero" aria-labelledby="lg-title">
          <p className="lg-mono lg-hero__kicker">
            <span>[ {kicker} ]</span>
            <span>{SITE.name}</span>
          </p>
          <h1 id="lg-title" className="lg-hero__title">{title}</h1>
          {lead && <p className="lg-hero__lead">{lead}</p>}
          <p className="lg-mono lg-hero__meta">
            Última actualización: {LEGAL_UPDATED} · Versión {LEGAL_VERSION} (borrador, pendiente de revisión legal)
          </p>
        </section>

        <div className="lg-doc">
          <aside className="lg-toc" aria-labelledby="lg-toc-title">
            <p id="lg-toc-title" className="lg-mono lg-toc__title">En esta página</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="lg-toc__n">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="lg-prose">
            <div className="lg-draft" role="note">
              <p className="lg-mono">[ Borrador ]</p>
              <p>
                Este documento es un borrador de buena fe que describe cómo funciona {SITE.name}{' '}
                antes de su lanzamiento. No es asesoría legal y aún no ha sido revisado por un
                abogado. Los datos entre [corchetes] están pendientes de completar.
              </p>
            </div>

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="lg-section" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>
                  <span className="lg-section__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </div>
    </LegalShell>
  );
}

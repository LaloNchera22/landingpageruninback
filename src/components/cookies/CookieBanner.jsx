import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  OPEN_PREFS_EVENT,
  acceptAll,
  getConsent,
  onConsentChange,
  rejectAll,
  setConsent,
} from '../../lib/consent.js';
import './CookieBanner.css';

const OPTIONAL = [
  {
    key: 'analytics',
    title: 'Analíticas',
    text: 'Nos dirían, de forma agregada, qué secciones se visitan para mejorar el sitio. Hoy no usamos ninguna.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    text: 'Servirían para medir campañas o mostrar anuncios relevantes. Hoy no usamos ninguna.',
  },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function CookieBanner({ policyHref = '/cookies.html' }) {
  const [consent, setConsentState] = useState(() => getConsent());
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const configBtnRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Keep in sync with decisions made elsewhere (another component, the footer).
  useEffect(() => onConsentChange((c) => setConsentState(c)), []);

  const openPrefs = useCallback(() => {
    const c = getConsent();
    setDraft({ analytics: Boolean(c?.analytics), marketing: Boolean(c?.marketing) });
    returnFocusRef.current = document.activeElement;
    setOpen(true);
  }, []);

  const closePrefs = useCallback(() => {
    restoreFocusRef.current = true;
    setOpen(false);
  }, []);

  // Return focus once the dialog has unmounted. If the opener was the banner's
  // own "Configurar" button (hidden while the dialog is open), focus its
  // re-rendered counterpart instead.
  useEffect(() => {
    if (open || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    const target = el && el.isConnected ? el : configBtnRef.current;
    if (target && typeof target.focus === 'function') target.focus();
  }, [open, consent]);

  useEffect(() => {
    window.addEventListener(OPEN_PREFS_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, openPrefs);
  }, [openPrefs]);

  // Focus trap + Esc while the dialog is open.
  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const first = dialog?.querySelector(FOCUSABLE);
    first?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePrefs();
        return;
      }
      if (e.key !== 'Tab' || !dialog) return;
      const items = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === firstEl || !dialog.contains(document.activeElement))) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && (document.activeElement === lastEl || !dialog.contains(document.activeElement))) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevOverflow;
    };
  }, [open, closePrefs]);

  const decide = (fn) => {
    setConsentState(fn());
    if (open) closePrefs();
  };

  const showBanner = !consent && !open;

  return (
    <>
      {showBanner && (
        <section className="rib-cookie-bar" role="region" aria-label="Aviso de cookies">
          <div className="rib-cookie-bar__inner">
            <p className="rib-cookie-bar__label">
              <span aria-hidden="true">[</span> Cookies <span aria-hidden="true">]</span>
            </p>
            <p className="rib-cookie-bar__text">
              Solo usamos lo necesario para que el sitio funcione. Si aceptas, podríamos
              activar analíticas más adelante. Más en la{' '}
              <a href={policyHref}>Política de cookies</a>.
            </p>
            <div className="rib-cookie-bar__actions">
              <button
                ref={configBtnRef}
                type="button"
                className="rib-cbtn rib-cbtn--ghost"
                onClick={openPrefs}
              >
                Configurar
              </button>
              <button type="button" className="rib-cbtn" onClick={() => decide(rejectAll)}>
                Rechazar
              </button>
              <button type="button" className="rib-cbtn" onClick={() => decide(acceptAll)}>
                Aceptar
              </button>
            </div>
          </div>
        </section>
      )}

      {open && (
        <div className="rib-cookie-overlay" data-lenis-prevent onMouseDown={(e) => {
          if (e.target === e.currentTarget) closePrefs();
        }}>
          <div
            ref={dialogRef}
            className="rib-cookie-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
          >
            <header className="rib-cookie-dialog__head">
              <p className="rib-cookie-dialog__label">[ Preferencias ]</p>
              <button
                type="button"
                className="rib-cookie-dialog__close"
                onClick={closePrefs}
                aria-label="Cerrar preferencias de cookies"
              >
                Cerrar <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="rib-cookie-dialog__body" data-lenis-prevent>
              <h2 id={titleId} className="rib-cookie-dialog__title">Configurar cookies</h2>
              <p id={descId} className="rib-cookie-dialog__intro">
                Elige qué categorías permites. Puedes cambiarlo cuando quieras desde
                «Configurar cookies» en el pie de página.{' '}
                <a href={policyHref}>Leer la política</a>.
              </p>

              <ul className="rib-cookie-cats">
                <li className="rib-cookie-cat">
                  <span className="rib-cookie-cat__idx" aria-hidden="true">01</span>
                  <div className="rib-cookie-cat__copy">
                    <p className="rib-cookie-cat__title" id={`${titleId}-necessary`}>Necesarias</p>
                    <p className="rib-cookie-cat__text">
                      Guardan tu elección de cookies para no volver a preguntarte. Siempre activas.
                    </p>
                  </div>
                  <Toggle checked disabled labelledBy={`${titleId}-necessary`} note="Siempre" />
                </li>
                {OPTIONAL.map((cat, i) => (
                  <li className="rib-cookie-cat" key={cat.key}>
                    <span className="rib-cookie-cat__idx" aria-hidden="true">0{i + 2}</span>
                    <div className="rib-cookie-cat__copy">
                      <p className="rib-cookie-cat__title" id={`${titleId}-${cat.key}`}>{cat.title}</p>
                      <p className="rib-cookie-cat__text">{cat.text}</p>
                    </div>
                    <Toggle
                      checked={draft[cat.key]}
                      labelledBy={`${titleId}-${cat.key}`}
                      onChange={(v) => setDraft((d) => ({ ...d, [cat.key]: v }))}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <footer className="rib-cookie-dialog__foot">
              <button type="button" className="rib-cbtn rib-cbtn--line" onClick={() => decide(rejectAll)}>
                Rechazar todo
              </button>
              <button type="button" className="rib-cbtn rib-cbtn--line" onClick={() => decide(acceptAll)}>
                Aceptar todo
              </button>
              <button
                type="button"
                className="rib-cbtn rib-cbtn--solid"
                onClick={() => decide(() => setConsent(draft))}
              >
                Guardar selección
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

function Toggle({ checked, disabled = false, onChange, labelledBy, note }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      disabled={disabled}
      className="rib-switch"
      onClick={() => onChange?.(!checked)}
    >
      <span className="rib-switch__state" aria-hidden="true">
        {note || (checked ? 'Sí' : 'No')}
      </span>
      <span className="rib-switch__track" aria-hidden="true">
        <span className="rib-switch__thumb" />
      </span>
    </button>
  );
}

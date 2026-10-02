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
    title: 'Analytics',
    text: 'Would tell us, in aggregate, which sections get visited so we can improve the site. We don’t use any today.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    text: 'Would help us measure campaigns or show relevant ads. We don’t use any today.',
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
  // own "Settings" button (hidden while the dialog is open), focus its
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
        <section className="rib-cookie-bar" role="region" aria-label="Cookie notice">
          <div className="rib-cookie-bar__inner">
            <p className="rib-cookie-bar__label">
              <span aria-hidden="true">[</span> Cookies <span aria-hidden="true">]</span>
            </p>
            <p className="rib-cookie-bar__text">
              We only use what’s needed to make the site work. If you accept, we may
              turn on analytics later. More in our{' '}
              <a href={policyHref}>Cookie Policy</a>.
            </p>
            <div className="rib-cookie-bar__actions">
              <button
                ref={configBtnRef}
                type="button"
                className="rib-cbtn rib-cbtn--ghost"
                onClick={openPrefs}
              >
                Settings
              </button>
              <button type="button" className="rib-cbtn" onClick={() => decide(rejectAll)}>
                Reject
              </button>
              <button type="button" className="rib-cbtn" onClick={() => decide(acceptAll)}>
                Accept
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
              <p className="rib-cookie-dialog__label">[ Preferences ]</p>
              <button
                type="button"
                className="rib-cookie-dialog__close"
                onClick={closePrefs}
                aria-label="Close cookie preferences"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="rib-cookie-dialog__body" data-lenis-prevent>
              <h2 id={titleId} className="rib-cookie-dialog__title">Cookie settings</h2>
              <p id={descId} className="rib-cookie-dialog__intro">
                Choose which categories you allow. You can change this anytime from
                “Cookie settings” in the footer.{' '}
                <a href={policyHref}>Read the policy</a>.
              </p>

              <ul className="rib-cookie-cats">
                <li className="rib-cookie-cat">
                  <span className="rib-cookie-cat__idx" aria-hidden="true">01</span>
                  <div className="rib-cookie-cat__copy">
                    <p className="rib-cookie-cat__title" id={`${titleId}-necessary`}>Necessary</p>
                    <p className="rib-cookie-cat__text">
                      Store your cookie choice so we don’t ask again. Always on.
                    </p>
                  </div>
                  <Toggle checked disabled labelledBy={`${titleId}-necessary`} note="Always" />
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
                Reject all
              </button>
              <button type="button" className="rib-cbtn rib-cbtn--line" onClick={() => decide(acceptAll)}>
                Accept all
              </button>
              <button
                type="button"
                className="rib-cbtn rib-cbtn--solid"
                onClick={() => decide(() => setConsent(draft))}
              >
                Save choices
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
        {note || (checked ? 'On' : 'Off')}
      </span>
      <span className="rib-switch__track" aria-hidden="true">
        <span className="rib-switch__thumb" />
      </span>
    </button>
  );
}

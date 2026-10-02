// Cookie / storage consent store.
//
// The decision lives in localStorage under `rib-cookie-consent` as
//   { v: 1, necessary: true, analytics: boolean, marketing: boolean, ts }
// Every storage access is wrapped in try/catch: private windows, blocked site
// data or sandboxed previews can throw, and the site must still work (the
// banner simply shows again on the next visit).

export const CONSENT_KEY = 'rib-cookie-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = 'rib:consent';
export const OPEN_PREFS_EVENT = 'rib:open-cookie-prefs';
export const CATEGORIES = ['necessary', 'analytics', 'marketing'];

const isBrowser = typeof window !== 'undefined';

// In-memory fallback so a decision made in a session where storage is blocked
// still holds until the page is reloaded.
let memoryConsent = null;

function normalize(raw) {
  if (!raw || typeof raw !== 'object' || raw.v !== CONSENT_VERSION) return null;
  return {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: raw.analytics === true,
    marketing: raw.marketing === true,
    ts: typeof raw.ts === 'number' ? raw.ts : Date.now(),
  };
}

/** Returns the stored decision, or null when the visitor has not decided yet. */
export function getConsent() {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch {
    /* storage unavailable or corrupt value: fall through */
  }
  return memoryConsent;
}

/** Merges `partial` into the current decision (defaults: optional categories off) and saves it. */
export function setConsent(partial = {}) {
  const prev = getConsent() || { analytics: false, marketing: false };
  const next = {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: (partial.analytics ?? prev.analytics) === true,
    marketing: (partial.marketing ?? prev.marketing) === true,
    ts: Date.now(),
  };
  memoryConsent = next;
  if (isBrowser) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: keep the in-memory copy */
    }
    try {
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
    } catch {
      /* CustomEvent unsupported: ignore */
    }
  }
  return next;
}

export const acceptAll = () => setConsent({ analytics: true, marketing: true });
export const rejectAll = () => setConsent({ analytics: false, marketing: false });

/** True when the visitor allowed `category`. "necessary" is always true. */
export function hasConsent(category) {
  if (category === 'necessary') return true;
  const c = getConsent();
  return Boolean(c && c[category] === true);
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsentChange(cb) {
  if (!isBrowser) return () => {};
  const handler = (e) => cb(e.detail);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

/** Opens the cookie preferences dialog (rendered by <CookieBanner />). */
export function openCookiePreferences() {
  if (!isBrowser) return;
  window.dispatchEvent(new CustomEvent(OPEN_PREFS_EVENT));
}

/**
 * Runs `loaderFn` once, as soon as `category` is consented (immediately if it
 * already is). Returns a function that cancels the pending wait.
 *
 * Example — plugging in analytics later (do NOT add a tracker before the
 * cookie policy lists it):
 *
 *   loadWhenConsented('analytics', () => {
 *     const s = document.createElement('script');
 *     s.src = 'https://example-analytics.invalid/script.js';
 *     s.defer = true;
 *     s.dataset.domain = 'runinback.com';
 *     document.head.appendChild(s);
 *   });
 */
export function loadWhenConsented(category, loaderFn) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    try {
      loaderFn();
    } catch (err) {
      console.error(`[consent] loader for "${category}" failed`, err);
    }
  };
  if (hasConsent(category)) {
    run();
    return () => {};
  }
  const off = onConsentChange((c) => {
    if (c && (category === 'necessary' || c[category] === true)) {
      off();
      run();
    }
  });
  return off;
}

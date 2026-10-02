import { openCookiePreferences } from '../lib/consent.js';
import { SITE } from '../lib/site';
import { scrollToTarget } from '../lib/motion';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src="/logo-lockup.png" alt="Runinback" width="718" height="120" loading="lazy" className="footer-logo" />
        <button type="button" className="footer-up" onClick={() => scrollToTarget('#inicio')}>Back to top ↑</button>
      </div>
      <div className="footer-cols">
        <nav aria-label="Sections">
          <span className="footer-h">Index</span>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToTarget('#how-it-works'); }}>How it works</a>
          <a href="#prizes" onClick={(e) => { e.preventDefault(); scrollToTarget('#prizes'); }}>Prizes</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToTarget('#faq'); }}>FAQ</a>
        </nav>
        <nav aria-label="Legal">
          <span className="footer-h">Legal</span>
          <a href="/terms.html">Terms of Service</a>
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/cookies.html">Cookie Policy</a>
          <button type="button" onClick={openCookiePreferences}>Cookie settings</button>
        </nav>
        <div>
          <span className="footer-h">Contact</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Runinback. All rights reserved.</span>
        <span>Runinback is not affiliated with any game developer or publisher.</span>
      </div>
    </footer>
  );
}

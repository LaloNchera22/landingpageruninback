import { openCookiePreferences } from '../lib/consent.js';
import { SITE } from '../lib/site';
import { scrollToTarget } from '../lib/motion';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src="/logo-lockup.png" alt="Runinback" width="718" height="120" loading="lazy" className="footer-logo" />
        <button type="button" className="footer-up" onClick={() => scrollToTarget('#inicio')}>Volver arriba ↑</button>
      </div>
      <div className="footer-cols">
        <nav aria-label="Secciones">
          <span className="footer-h">Índice</span>
          <a href="#como-funciona" onClick={(e) => { e.preventDefault(); scrollToTarget('#como-funciona'); }}>Cómo funciona</a>
          <a href="#premios" onClick={(e) => { e.preventDefault(); scrollToTarget('#premios'); }}>Premios</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToTarget('#faq'); }}>Preguntas frecuentes</a>
        </nav>
        <nav aria-label="Legal">
          <span className="footer-h">Legal</span>
          <a href="/terminos.html">Términos y condiciones</a>
          <a href="/privacidad.html">Aviso de privacidad</a>
          <a href="/cookies.html">Política de cookies</a>
          <button type="button" onClick={openCookiePreferences}>Configurar cookies</button>
        </nav>
        <div>
          <span className="footer-h">Contacto</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Runinback. Todos los derechos reservados.</span>
        <span>Runinback no está afiliado a ningún desarrollador ni editor de videojuegos.</span>
      </div>
    </footer>
  );
}

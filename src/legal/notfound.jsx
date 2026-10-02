import '../styles/base.css';
import { mount } from './mount.jsx';
import { LegalShell } from './LegalLayout.jsx';

function NotFoundPage() {
  return (
    <LegalShell>
      <div className="lg-wrap">
        <section className="lg-404" aria-labelledby="nf-title">
          <p className="lg-mono">[ Error 404 ]</p>
          <p className="lg-404__code" aria-hidden="true">404</p>
          <div className="lg-404__row">
            <div>
              <h1 id="nf-title" className="lg-404__title">Esta página no existe.</h1>
              <p className="lg-404__text">
                El enlace puede estar roto o la página se movió. Vuelve al inicio para ver qué
                estamos construyendo.
              </p>
            </div>
            <div className="lg-404__links">
              <a className="lg-btn lg-btn--solid" href="/">Volver al inicio</a>
              <a className="lg-btn" href="/terminos.html">Términos</a>
            </div>
          </div>
        </section>
      </div>
    </LegalShell>
  );
}

mount(NotFoundPage);

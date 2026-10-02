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
              <h1 id="nf-title" className="lg-404__title">This page doesn’t exist.</h1>
              <p className="lg-404__text">
                The link may be broken or the page may have moved. Head back home to see what
                we’re building.
              </p>
            </div>
            <div className="lg-404__links">
              <a className="lg-btn lg-btn--solid" href="/">Back to home</a>
              <a className="lg-btn" href="/terms.html">Terms of Service</a>
            </div>
          </div>
        </section>
      </div>
    </LegalShell>
  );
}

mount(NotFoundPage);

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { SITE, isAppLive } from '../lib/site';
import Vanta from '../components/Vanta';
import Magnet from '../bits/Magnet';
import SplitText from '../bits/SplitText';

export default function Cta() {
  const root = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo('.cta-word', { yPercent: 30 }, {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, { scope: root });

  return (
    <section className="cta" ref={root} aria-labelledby="cta-title">
      <Vanta
        effect="waves"
        className="cta-bg"
        options={{ color: 0x111111, shininess: 35, waveHeight: 14, waveSpeed: 0.45, zoom: 0.85 }}
      />
      <div className="cta-inner">
        <span className="cta-status"><i aria-hidden="true" /> Estamos terminando la plataforma</span>
        <SplitText as="h2" id="cta-title" className="cta-title" type="chars" stagger={0.025}>
          Muy pronto.
        </SplitText>
        <p className="lead">
          Las inscripciones abren en cuanto el panel de torneos esté listo. ¿Organizas torneos o tienes una comunidad?
          Escríbenos y te avisamos primero.
        </p>
        <div className="cta-actions">
          <Magnet>
            {isAppLive() ? (
              <a className="btn btn-light" href={SITE.appUrl}>Entrar a Runinback</a>
            ) : (
              <a className="btn btn-light" href={`mailto:${SITE.email}?subject=${encodeURIComponent('Quiero saber cuándo abre Runinback')}`}>
                Avísame cuando abra
              </a>
            )}
          </Magnet>
          <span className="cta-mail">{SITE.email}</span>
        </div>
      </div>
      <div className="cta-word" aria-hidden="true">
        <img src="/logo-word.png" alt="" width="442" height="96" loading="lazy" />
      </div>
    </section>
  );
}

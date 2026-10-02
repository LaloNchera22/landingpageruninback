import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion';
import SplitText from '../bits/SplitText';
import DecryptedText from '../bits/DecryptedText';
import SectionLabel from './SectionLabel';

const STEPS = [
  {
    title: 'Crea y comparte',
    text: 'El anfitrión le pone nombre al torneo, elige de 4 a 32 jugadores y la inscripción, y lo hace público o privado. Un solo link invita a todos.',
    visual: <div className="pv-link"><span>runinback.com/t/</span><DecryptedText text="K7QM2XRA9P" trigger="view" /></div>,
  },
  {
    title: 'Se llenan los lugares',
    text: 'Los jugadores abren el link, ven la inscripción y el premio, y entran. El bracket arranca al llenarse, o antes con 4 o más. El orden se sortea.',
    visual: <div className="pv-seats">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}<b>8/8</b></div>,
  },
  {
    title: 'El anfitrión abre la sala',
    text: 'Para cada partida, el anfitrión crea la partida privada en el juego y publica el código de sala en el cuarto de la partida.',
    visual: <div className="pv-code">{'RN4821'.split('').map((c, i) => <span key={i}>{c}</span>)}</div>,
  },
  {
    title: 'Se juega, el ganador avanza',
    text: 'Juegan su 1 contra 1 y suben la pantalla final como prueba. El anfitrión marca al ganador, que avanza; el otro queda fuera.',
    visual: <div className="pv-vs"><span className="win">Tú</span><em>vs</em><span>Vexa</span></div>,
  },
  {
    title: '24 horas para apelar',
    text: 'Después de la final, cualquier jugador puede apelar una decisión. El premio se retiene hasta que una persona de nuestro equipo la revise.',
    visual: <div className="pv-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" /><circle className="pv-ring-fill" cx="50" cy="50" r="44" /></svg><b>24h</b></div>,
  },
  {
    title: 'Todos cobran',
    text: 'El premio del campeón y la comisión del anfitrión llegan a sus cuentas. Los chats de las partidas se borran cuando todo se liquida.',
    visual: <div className="pv-split"><span style={{ flex: 85 }}>85</span><span style={{ flex: 5 }} /><span style={{ flex: 10 }}>10</span></div>,
  },
];

export default function Process() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const el = track.current;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('.process-progress i', { scaleX: self.progress }),
        },
      });
      // Panel internals react to their own entry into the viewport.
      gsap.utils.toArray('.process-step').forEach((step) => {
        gsap.from(step.querySelectorAll('.ps-num, .ps-visual'), {
          yPercent: 30, autoAlpha: 0, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: step, containerAnimation: tween, start: 'left 85%', end: 'left 45%', scrub: true },
        });
      });
      gsap.to('.pv-ring-fill', {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '.pv-ring', containerAnimation: tween, start: 'left 90%', end: 'left 30%', scrub: true },
      });
    });
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.process-step').forEach((step) => {
        gsap.from(step, { y: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: step, start: 'top 85%', once: true } });
      });
    });
    return () => mm.revert();
  }, { scope: root });

  // Pinning changes page height; let triggers below re-measure once fonts settle.
  useGSAP(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()); });

  return (
    <section className="process" id="como-funciona" ref={root} aria-labelledby="process-title">
      <div className="process-head">
        <SectionLabel n="02">Cómo funciona</SectionLabel>
        <div className="process-progress" aria-hidden="true"><i /></div>
      </div>
      <div className="process-track" ref={track}>
        <div className="process-intro">
          <SplitText as="h2" id="process-title" className="h2" type="words" stagger={0.06}>
            Un bracket, de principio a fin.
          </SplitText>
          <p className="lead">Seis pasos. Cada partida es un 1 contra 1 en una partida privada del juego que elija el anfitrión.</p>
          <span className="process-hint" aria-hidden="true">Desliza →</span>
        </div>
        {STEPS.map((s, i) => (
          <article className="process-step" key={s.title}>
            <span className="ps-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="ps-visual" aria-hidden="true">{s.visual}</div>
            <div className="ps-copy">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

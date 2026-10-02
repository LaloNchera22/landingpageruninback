// Animated typographic tiles for the hero index. They stand in for the
// photographs of the reference: each one plays its GSAP timeline while it's
// the active item (or hovered in grid view) and rests on its final frame.
import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../../lib/motion';
import DecryptedText from '../../bits/DecryptedText';

function useTileTimeline(active, build) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const ctx = gsap.context(() => build(ref.current), ref);
    return () => ctx.revert();
    // build is static per tile
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return ref;
}

function Versus({ active }) {
  const ref = useTileTimeline(active, (el) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.from(el.querySelectorAll('.tv-big span'), { yPercent: 120, rotate: 8, stagger: 0.08, duration: 0.9, ease: 'expo.out' })
      .from(el.querySelectorAll('.tv-path'), { strokeDashoffset: 120, duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, '-=0.4')
      .from(el.querySelector('.tv-win'), { autoAlpha: 0, x: -8, duration: 0.4 }, '-=0.2')
      .to({}, { duration: 1.6 });
  });
  return (
    <div className="tile-in tv" ref={ref}>
      <span className="tile-label">R1 · Partida 3</span>
      <div className="tv-big" aria-hidden="true"><span>1</span><span>v</span><span>1</span></div>
      <svg className="tv-bracket" viewBox="0 0 120 60" aria-hidden="true">
        <path className="tv-path" d="M2 8 H40 V30 H70" />
        <path className="tv-path" d="M2 52 H40 V30" />
        <path className="tv-path" d="M70 30 H118" />
      </svg>
      <span className="tile-label tv-win">Gana · avanza</span>
    </div>
  );
}

function Seats({ active }) {
  const [n, setN] = useState(32);
  const ref = useTileTimeline(active, (el) => {
    const steps = [4, 8, 16, 32];
    const tl = gsap.timeline({ repeat: -1 });
    steps.forEach((s) => {
      tl.call(() => setN(s))
        .fromTo(el.querySelectorAll('.ts-dot'), { scale: 0.3, opacity: 0.15 }, {
          scale: (i) => (i < s ? 1 : 0.3), opacity: (i) => (i < s ? 1 : 0.15),
          duration: 0.5, stagger: { each: 0.012, from: 'start' }, ease: 'back.out(2)',
        })
        .to({}, { duration: 0.9 });
    });
  });
  return (
    <div className="tile-in ts" ref={ref}>
      <span className="tile-label">Lugares</span>
      <div className="ts-num" aria-hidden="true">{n}</div>
      <div className="ts-grid" aria-hidden="true">
        {Array.from({ length: 32 }, (_, i) => <i className="ts-dot" key={i} />)}
      </div>
      <span className="tile-label">4 · 8 · 16 · 32</span>
    </div>
  );
}

function Code({ active }) {
  const [k, setK] = useState(0);
  const codes = ['K7QM-2XRA', 'B4NX-91TQ', 'ZR8P-0KLM'];
  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const id = setInterval(() => setK((v) => (v + 1) % codes.length), 2600);
    return () => clearInterval(id);
  }, [active, codes.length]);
  return (
    <div className="tile-in tc">
      <span className="tile-label">Invitación privada</span>
      <div className="tc-code" aria-hidden="true">
        {active ? <DecryptedText key={k} text={codes[k]} speed={34} trigger="view" /> : codes[0]}
      </div>
      <span className="tile-label">runinback.com/t/····</span>
    </div>
  );
}

function Host({ active }) {
  const ref = useTileTimeline(active, (el) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.from(el.querySelectorAll('.th-word span'), { xPercent: -110, stagger: 0.06, duration: 0.8, ease: 'expo.out' })
      .from(el.querySelector('.th-cut'), { scaleX: 0, transformOrigin: 'left', duration: 0.6, ease: 'power3.inOut' }, '-=0.3')
      .from(el.querySelector('.th-pct'), { yPercent: 100, autoAlpha: 0, duration: 0.6, ease: 'expo.out' }, '-=0.2')
      .to({}, { duration: 1.8 });
  });
  return (
    <div className="tile-in th" ref={ref}>
      <span className="tile-label">Anfitrión</span>
      <div className="th-word" aria-hidden="true">{'HOST'.split('').map((c, i) => <span key={i}>{c}</span>)}</div>
      <i className="th-cut" />
      <div className="th-pct" aria-hidden="true">+5%</div>
    </div>
  );
}

function Pool({ active }) {
  const numRef = useRef(null);
  const ref = useTileTimeline(active, (el) => {
    const o = { v: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.to(o, { v: 85, duration: 1.4, ease: 'power3.out', onUpdate: () => { numRef.current.textContent = Math.round(o.v); } })
      .from(el.querySelectorAll('.tp-bar i'), { scaleX: 0, transformOrigin: 'left', stagger: 0.12, duration: 0.8, ease: 'expo.out' }, 0.2)
      .to({}, { duration: 1.2 });
  });
  return (
    <div className="tile-in tp" ref={ref}>
      <span className="tile-label">Al campeón</span>
      <div className="tp-num" aria-hidden="true"><span ref={numRef}>85</span><small>%</small></div>
      <div className="tp-bars" aria-hidden="true">
        <div className="tp-bar"><i style={{ width: '85%' }} /><span>85</span></div>
        <div className="tp-bar"><i style={{ width: '5%' }} /><span>5</span></div>
        <div className="tp-bar"><i style={{ width: '10%' }} /><span>10</span></div>
      </div>
    </div>
  );
}

function Clock({ active }) {
  const [s, setS] = useState(24 * 3600 - 1);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setS((v) => (v <= 0 ? 24 * 3600 - 1 : v - 1)), 1000);
    return () => clearInterval(id);
  }, [active]);
  const hh = String(Math.floor(s / 3600)).padStart(2, '0');
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  const frac = s / (24 * 3600);
  return (
    <div className="tile-in tk">
      <span className="tile-label">Ventana de apelación</span>
      <div className="tk-time" aria-hidden="true">
        <span>{hh}</span><span>{mm}</span><span key={ss} className="tk-tick">{ss}</span>
      </div>
      <div className="tk-track" aria-hidden="true"><i style={{ transform: `scaleX(${frac})` }} /></div>
      <span className="tile-label">Revisión humana</span>
    </div>
  );
}

function Fair({ active }) {
  const ref = useTileTimeline(active, (el) => {
    const rows = el.querySelectorAll('.tf-row');
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    rows.forEach((r) => {
      const split = SplitText.create(r.querySelector('.tf-txt'), { type: 'chars' });
      tl.from(split.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.025 })
        .from(r.querySelector('.tf-box'), { scale: 0, duration: 0.3, ease: 'back.out(3)' });
    });
    tl.to({}, { duration: 1 });
  });
  return (
    <div className="tile-in tf" ref={ref}>
      <span className="tile-label">Reglas</span>
      <ul className="tf-list" aria-hidden="true">
        <li className="tf-row"><b className="tf-box">✕</b><span className="tf-txt">El host no juega</span></li>
        <li className="tf-row"><b className="tf-box">✕</b><span className="tf-txt">10 min de espera</span></li>
        <li className="tf-row"><b className="tf-box">✕</b><span className="tf-txt">Pruebas en sala</span></li>
        <li className="tf-row"><b className="tf-box">✕</b><span className="tf-txt">Revisión humana</span></li>
      </ul>
    </div>
  );
}

const GENRES = ['PELEAS', 'DEPORTES', 'SHOOTERS', 'ESTRATEGIA', 'CARRERAS', 'CARTAS'];

function Genres({ active }) {
  const ref = useTileTimeline(active, (el) => {
    const words = el.querySelectorAll('.tg-word');
    gsap.set(words, { yPercent: 110 });
    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((w) => {
      tl.to(w, { yPercent: 0, duration: 0.6, ease: 'expo.out' })
        .to(w, { yPercent: -110, duration: 0.5, ease: 'expo.in' }, '+=0.9')
        .set(w, { yPercent: 110 });
    });
  });
  return (
    <div className="tile-in tg" ref={ref}>
      <span className="tile-label">Cualquier juego</span>
      <div className="tg-stack" aria-hidden="true">
        {GENRES.map((g, i) => <span className="tg-word" key={g} style={i ? undefined : { transform: 'none' }}>{g}</span>)}
      </div>
      <span className="tile-label">con partidas privadas</span>
    </div>
  );
}

export const TILE_COMPONENTS = {
  versus: Versus, seats: Seats, code: Code, host: Host, pool: Pool, clock: Clock, fair: Fair, genres: Genres,
};

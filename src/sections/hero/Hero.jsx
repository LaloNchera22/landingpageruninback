import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion, scrollToTarget } from '../../lib/motion';
import { INDEX_ITEMS } from '../../content/index-items';
import { SITE } from '../../lib/site';
import Vanta from '../../components/Vanta';
import Noise from '../../bits/Noise';
import DecryptedText from '../../bits/DecryptedText';
import { TILE_COMPONENTS } from './Tiles';
import './hero.css';

const VIEWS = [
  { id: 'vertical', label: 'Vertical' },
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'grid', label: 'Grid' },
];
const N = INDEX_ITEMS.length;
const wrap = (v) => ((((v + N / 2) % N) + N) % N) - N / 2;

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Mexico_City' })
      .format(new Date())
      .replace(/\s?([ap])\.?\s?m\.?/i, (_, p) => ` ${p.toUpperCase()}M`);
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const root = useRef(null);
  const stage = useRef(null);
  const tiles = useRef([]);
  const slots = useRef(INDEX_ITEMS.map((_, i) => i));
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState('vertical');
  const [size, setSize] = useState({ w: 220, h: 290 });
  const interacted = useRef(0);
  const time = useClock();

  // Tile size follows the stage, keeping a 3:4 card.
  useLayoutEffect(() => {
    const measure = () => {
      const r = stage.current.getBoundingClientRect();
      const mobile = window.innerWidth < 760;
      let w = mobile ? Math.min(r.width * 0.44, 200) : Math.min(r.width * 0.16, 250);
      let h = w * (4 / 3);
      const maxH = r.height * (mobile ? 0.62 : 0.4);
      if (h > maxH) { h = maxH; w = h * 0.75; }
      setSize({ w: Math.round(w), h: Math.round(h) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage.current);
    return () => ro.disconnect();
  }, []);

  // Lay out the tiles for the current view around the active one.
  const layout = useCallback((immediate) => {
    const { w, h } = size;
    const gap = Math.round(w * 0.045);
    const mobile = window.innerWidth < 760;
    const dur = immediate || prefersReducedMotion() ? 0 : 1.05;
    INDEX_ITEMS.forEach((_, i) => {
      const el = tiles.current[i];
      if (!el) return;
      const isActive = i === active;
      let x = 0, y = 0, scale = 1, opacity = isActive ? 1 : 0.32;
      if (view === 'grid') {
        const cols = mobile ? 2 : 4;
        const s = mobile ? 0.5 : 0.62;
        const rows = Math.ceil(N / cols);
        const col = i % cols, row = Math.floor(i / cols);
        x = (col - (cols - 1) / 2) * (w * s + gap * 2);
        y = (row - (rows - 1) / 2) * (h * s + gap * 2) + (mobile ? 0 : h * 0.12);
        scale = s;
        opacity = isActive ? 1 : 0.55;
        slots.current[i] = i - active;
      } else {
        const prev = slots.current[i];
        const target = wrap(i - active);
        const step = view === 'vertical' ? h + gap : w + gap;
        // A tile that wraps around jumps while off-screen, then glides in.
        if (Math.abs(target - prev) > N / 2 - 1 && !immediate) {
          const from = target + Math.sign(prev - target);
          gsap.set(el, view === 'vertical' ? { y: from * step, x: 0 } : { x: from * step, y: 0 });
        }
        slots.current[i] = target;
        if (view === 'vertical') y = target * step; else x = target * step;
      }
      gsap.to(el, { x, y, scale, opacity, duration: dur, ease: 'expo.out', overwrite: 'auto' });
    });
  }, [active, view, size]);

  useLayoutEffect(() => { layout(false); }, [layout]);

  // Idle autoplay through the index while the hero is visible.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(root.current);
    const id = setInterval(() => {
      if (visible && Date.now() - interacted.current > 5000 && hovered === null) setActive((a) => (a + 1) % N);
    }, 3400);
    return () => { clearInterval(id); io.disconnect(); };
  }, [hovered]);

  const pick = (i) => { interacted.current = Date.now(); setActive(i); };

  // Intro + scroll-out choreography.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
    tl.from('.hero-sheet', { clipPath: 'inset(48% 48% 48% 48% round 6px)', duration: 1.4, ease: 'expo.inOut' })
      .from('.hero-brand img', { yPercent: 105, duration: 1.1 }, '-=0.45')
      .fromTo('.hero-bracket', { scaleY: 0 }, { scaleY: 1, duration: 0.9, stagger: 0.08, clearProps: 'transform' }, '<0.1')
      .from('.hero-strip', { autoAlpha: 0, y: 40, duration: 1 }, '<')
      .fromTo('.hero-topline > *, .hero-intro > *, .hero-index li, .hero-foot > *', { autoAlpha: 0, y: 12 }, {
        autoAlpha: 1, y: 0, stagger: 0.025, duration: 0.8,
      }, '<0.15')
      .fromTo('.hero-side, .hero-note', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, clearProps: 'opacity,visibility' }, '<0.2');

    gsap.to('.hero-sheet', {
      scale: 0.9, borderRadius: 14, filter: 'brightness(0.7)', ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: root });

  const current = INDEX_ITEMS[hovered ?? active];

  return (
    <section className={`hero view-${view}`} ref={root} id="inicio" aria-labelledby="hero-title">
      <Vanta
        effect="fog"
        className="hero-backdrop"
        options={{ highlightColor: 0x9a9a96, midtoneColor: 0x3a3a38, lowlightColor: 0x161616, baseColor: 0x0b0b0b, blurFactor: 0.7, speed: 0.6, zoom: 0.8 }}
      />
      <div className="hero-sheet">
        <Noise alpha={14} />

        <div className="hero-brand">
          <img src="/logo-lockup-ink.png" alt="Runinback" width="718" height="120" />
        </div>

        <div className="hero-topline">
          <nav className="hero-nav" aria-label="Principal">
            <a href="#inicio" aria-current="page">Índice</a>
            <a href="#como-funciona" onClick={(e) => { e.preventDefault(); scrollToTarget('#como-funciona'); }}>Cómo funciona</a>
            <a href="#premios" onClick={(e) => { e.preventDefault(); scrollToTarget('#premios'); }}>Premios</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToTarget('#faq'); }}>FAQ</a>
          </nav>
          <span className="hero-clock" aria-label={`Hora en Ciudad de México: ${time}`}>CDMX {time}</span>
          <a className="hero-contact" href={`mailto:${SITE.email}`}>Contacto</a>
        </div>

        <div className="hero-intro">
          <h1 id="hero-title">Torneos de videojuegos 1 contra 1. Crea tu bracket, compite y gana.</h1>
          <p>
            Runinback es el índice de tus torneos. Un anfitrión arma el bracket, comparte un link y
            los jugadores compiten hasta que queda un campeón, que se lleva el 85% de la bolsa.
          </p>
          <p>Contacto: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>

        <div className="hero-stage" ref={stage} style={{ '--tw': `${size.w}px`, '--th': `${size.h}px` }}>
          <span className="hero-side hero-side-l">Torneos</span>
          <span className="hero-bracket hero-bracket-l" aria-hidden="true" />
          <div className="hero-strip" aria-hidden="true">
            {INDEX_ITEMS.map((item, i) => {
              const Tile = TILE_COMPONENTS[item.tile];
              const on = i === (hovered ?? active) || (view === 'grid' && i === active);
              return (
                <div
                  key={item.id}
                  className={`tile tone-${item.tone}${on ? ' is-active' : ''}`}
                  ref={(el) => { tiles.current[i] = el; }}
                  onClick={() => pick(i)}
                  onMouseEnter={() => view === 'grid' && pick(i)}
                >
                  <Tile active={on} />
                </div>
              );
            })}
          </div>
          <span className="hero-bracket hero-bracket-r" aria-hidden="true" />
          <span className="hero-side hero-side-r">Videojuegos</span>
          <p className="hero-note" aria-live="polite">
            <span className="hero-note-num">{String((hovered ?? active) + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}</span>
            <DecryptedText key={current.id} text={current.note} speed={14} trigger="view" />
          </p>
        </div>

        <ol className="hero-index" aria-label="Índice de Runinback" onMouseLeave={() => setHovered(null)}>
          {INDEX_ITEMS.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                className={i === active ? 'is-active' : ''}
                aria-pressed={i === active}
                onMouseEnter={() => { setHovered(i); pick(i); }}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ol>

        <div className="hero-foot">
          <div className="hero-views" role="group" aria-label="Vista del índice">
            {VIEWS.map((v, i) => (
              <button key={v.id} type="button" aria-pressed={view === v.id} className={view === v.id ? 'is-active' : ''} onClick={() => setView(v.id)}>
                {v.label}{i < VIEWS.length - 1 ? '.' : ''}
              </button>
            ))}
          </div>
          <span className="hero-rights">Muy pronto · © 2026 Runinback</span>
        </div>
      </div>
    </section>
  );
}

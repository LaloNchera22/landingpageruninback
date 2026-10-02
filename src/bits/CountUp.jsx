// Adapted from React Bits <CountUp/>: tweens to `to` with GSAP whenever the
// value changes, and on first view.
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

const fmt = (n, decimals) =>
  n.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function CountUp({ to, from = 0, duration = 1.2, decimals = 0, className = '' }) {
  const ref = useRef(null);
  const state = useRef({ v: from, seen: false });

  useEffect(() => {
    const el = ref.current;
    const s = state.current;
    const run = () => {
      if (prefersReducedMotion()) { s.v = to; el.textContent = fmt(to, decimals); return; }
      gsap.to(s, { v: to, duration, ease: 'power3.out', overwrite: true, onUpdate: () => { el.textContent = fmt(s.v, decimals); } });
    };
    if (s.seen) { run(); return; }
    el.textContent = fmt(s.v, decimals);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { s.seen = true; run(); io.disconnect(); }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, decimals]);

  return <span ref={ref} className={className}>{fmt(from, decimals)}</span>;
}

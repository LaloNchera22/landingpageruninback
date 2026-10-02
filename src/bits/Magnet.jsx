// Adapted from React Bits <Magnet/>. Uses GSAP quickTo instead of React state,
// so pointer moves don't re-render. Disabled on touch / reduced motion.
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

export default function Magnet({ children, padding = 60, strength = 3, className = '' }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    const xTo = gsap.quickTo(innerRef.current, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(innerRef.current, 'y', { duration: 0.5, ease: 'power3.out' });
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const inside = Math.abs(e.clientX - cx) < r.width / 2 + padding && Math.abs(e.clientY - cy) < r.height / 2 + padding;
      xTo(inside ? (e.clientX - cx) / strength : 0);
      yTo(inside ? (e.clientY - cy) / strength : 0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [padding, strength]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      <span ref={innerRef} style={{ display: 'inline-block', willChange: 'transform' }}>{children}</span>
    </span>
  );
}

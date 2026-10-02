import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

// Vanta effects are loaded on demand (each pulls in three.js), only run while
// on screen, and are skipped entirely for reduced-motion users — the element's
// CSS background shows instead.
const loaders = {
  fog: () => import('vanta/dist/vanta.fog.min.js'),
  net: () => import('vanta/dist/vanta.net.min.js'),
  waves: () => import('vanta/dist/vanta.waves.min.js'),
  dots: () => import('vanta/dist/vanta.dots.min.js'),
};

export default function Vanta({ effect = 'fog', options = {}, className = '', children }) {
  const ref = useRef(null);
  const optsKey = JSON.stringify(options);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    let fx = null;
    let cancelled = false;

    const start = async () => {
      if (fx || cancelled) return;
      const [THREE, mod] = await Promise.all([import('three'), loaders[effect]()]);
      if (cancelled || fx) return;
      const create = typeof mod.default === 'function' ? mod.default : mod.default?.default ?? mod;
      fx = create({
        el, THREE, mouseControls: true, touchControls: false, gyroControls: false,
        scale: 1, scaleMobile: 1, ...JSON.parse(optsKey),
      });
    };
    const stop = () => { fx?.destroy(); fx = null; };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '100px' });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); stop(); };
  }, [effect, optsKey]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

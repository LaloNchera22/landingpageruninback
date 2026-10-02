// Adapted from React Bits <ScrollVelocity/>: an endless marquee whose speed
// and direction follow the scroll velocity. Reimplemented on GSAP's ticker +
// Lenis velocity (no extra animation library); pauses when off-screen.
import { useEffect, useRef } from 'react';
import { gsap, getScrollVelocity, prefersReducedMotion } from '../lib/motion';

function Row({ text, baseVelocity, className, copies }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    let dir = Math.sign(baseVelocity) || 1;
    let visible = true;
    let width = track.firstElementChild?.offsetWidth ?? 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(track);
    const ro = new ResizeObserver(() => { width = track.firstElementChild?.offsetWidth ?? 0; });
    ro.observe(track);
    const reduced = prefersReducedMotion();

    const tick = (_t, delta) => {
      if (!visible || !width) return;
      const v = getScrollVelocity();
      if (v < -0.1) dir = -Math.sign(baseVelocity);
      else if (v > 0.1) dir = Math.sign(baseVelocity);
      const boost = 1 + Math.min(Math.abs(v) * 0.35, 8);
      x += dir * Math.abs(baseVelocity) * (delta / 1000) * (reduced ? 0.25 : boost);
      x = ((x % width) + width) % width;
      track.style.transform = `translate3d(${-x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); ro.disconnect(); };
  }, [baseVelocity]);

  return (
    <div className="sv-row">
      <div className="sv-track" ref={trackRef}>
        {Array.from({ length: copies }, (_, i) => (
          <span className={className} key={i} aria-hidden={i > 0 || undefined}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScrollVelocity({ texts, velocity = 60, className = '', copies = 4 }) {
  return (
    <div className="sv">
      {texts.map((t, i) => (
        <Row key={i} text={t} className={className} copies={copies} baseVelocity={i % 2 ? -velocity : velocity} />
      ))}
    </div>
  );
}

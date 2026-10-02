// Adapted from React Bits <DecryptedText/>: scrambles characters and resolves
// them into the final text when scrolled into view (or on hover).
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&[]/<>';

export default function DecryptedText({ text, as: Tag = 'span', className = '', speed = 40, trigger = 'view' }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || trigger !== 'view') return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRunning(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 1.6);
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < revealed ? c : CHARS[(Math.random() * CHARS.length) | 0]))
          .join(''),
      );
      if (revealed >= total) { clearInterval(id); setRunning(false); setOut(text); }
    }, speed);
    return () => clearInterval(id);
  }, [running, text, speed]);

  const hover = trigger === 'hover' ? { onMouseEnter: () => !prefersReducedMotion() && setRunning(true) } : {};

  return (
    <Tag ref={ref} className={className} aria-label={text} {...hover}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}

// Adapted from React Bits <Noise/>. The original repaints a 1024² canvas every
// other frame; this pre-renders a few small grain tiles once and cycles them
// as a CSS background, which costs almost nothing.
import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export default function Noise({ alpha = 18, size = 160, frames = 6, fps = 12, className = 'noise' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const urls = Array.from({ length: frames }, () => {
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
      return `url(${canvas.toDataURL()})`;
    });
    const el = ref.current;
    el.style.backgroundImage = urls[0];
    if (prefersReducedMotion()) return;
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % urls.length; el.style.backgroundImage = urls[i]; }, 1000 / fps);
    return () => clearInterval(id);
  }, [alpha, size, frames, fps]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}

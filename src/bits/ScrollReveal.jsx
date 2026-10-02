// Adapted from React Bits <ScrollReveal/>. Words fade/unblur as you scroll.
// Changes: only kills its own triggers, valid markup (configurable tag),
// accepts plain text children only.
import { useMemo, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';

export default function ScrollReveal({
  children,
  as: Tag = 'p',
  className = '',
  baseOpacity = 0.12,
  blur = 6,
  baseRotation = 2,
  start = 'top 85%',
  end = 'bottom 55%',
}) {
  const ref = useRef(null);
  const words = useMemo(
    () =>
      String(children)
        .split(/(\s+)/)
        .map((w, i) => (/^\s+$/.test(w) ? w : <span className="sr-word" key={i}>{w}</span>)),
    [children],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      const targets = el.querySelectorAll('.sr-word');
      gsap.fromTo(el, { rotate: baseRotation, transformOrigin: '0% 50%' }, {
        rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end, scrub: true },
      });
      gsap.fromTo(targets, { opacity: baseOpacity, filter: `blur(${blur}px)` }, {
        opacity: 1, filter: 'blur(0px)', ease: 'none', stagger: 0.05,
        scrollTrigger: { trigger: el, start, end, scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {words}
    </Tag>
  );
}

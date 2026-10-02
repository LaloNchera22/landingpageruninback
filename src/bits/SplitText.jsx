// Adapted from React Bits <SplitText/> (DavidHDev/react-bits).
// Changes: scoped ScrollTrigger cleanup, optional immediate play (no scroll
// trigger) for above-the-fold headings, masked lines, reduced-motion aware.
import { useRef } from 'react';
import { gsap, SplitText as GSAPSplitText, useGSAP, prefersReducedMotion } from '../lib/motion';

export default function SplitText({
  children,
  as: Tag = 'p',
  className = '',
  type = 'chars',
  stagger = 0.03,
  duration = 1.1,
  delay = 0,
  ease = 'expo.out',
  from = { yPercent: 110 },
  to = { yPercent: 0 },
  mask = 'lines',
  start = 'top 85%',
  immediate = false,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      let split;
      const run = () => {
        split = GSAPSplitText.create(el, {
          type: mask === 'lines' && !type.includes('lines') ? `lines,${type}` : type,
          mask,
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          autoSplit: true,
          onSplit(self) {
            const targets = type.includes('chars') ? self.chars : type.includes('words') ? self.words : self.lines;
            return gsap.fromTo(targets, from, {
              ...to,
              duration,
              delay,
              ease,
              stagger,
              scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
            });
          },
        });
      };
      if (document.fonts?.status === 'loaded') run();
      else document.fonts.ready.then(run);
      return () => split?.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

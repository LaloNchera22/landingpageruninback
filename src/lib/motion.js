import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

/** Lenis drives the page scroll; GSAP's ticker drives Lenis so ScrollTrigger
 *  and smooth scroll share one frame loop. */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function tick(time) {
  lenis?.raf(time * 1000);
}

export function stopSmoothScroll() {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
}

export const getLenis = () => lenis;

/** Smooth-scroll to a selector or element; falls back to native scrolling. */
export function scrollToTarget(target, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Signed scroll velocity in px/frame (0 without Lenis). */
export const getScrollVelocity = () => lenis?.velocity ?? 0;

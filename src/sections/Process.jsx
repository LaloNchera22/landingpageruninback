import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion';
import SplitText from '../bits/SplitText';
import DecryptedText from '../bits/DecryptedText';
import SectionLabel from './SectionLabel';

const STEPS = [
  {
    title: 'Create and share',
    text: 'The host names the tournament, picks 4 to 32 players and an entry fee, and makes it public or private. One link invites everyone.',
    visual: <div className="pv-link"><span>runinback.com/t/</span><DecryptedText text="K7QM2XRA9P" trigger="view" /></div>,
  },
  {
    title: 'Seats fill up',
    text: 'Players open the link, see the entry fee and the prize, and join. The bracket starts when it fills, or early with 4 or more. Seeds are random.',
    visual: <div className="pv-seats">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}<b>8/8</b></div>,
  },
  {
    title: 'The host opens the lobby',
    text: 'For each match, the host creates the private match in the game and posts the lobby code in the match room.',
    visual: <div className="pv-code">{'RN4821'.split('').map((c, i) => <span key={i}>{c}</span>)}</div>,
  },
  {
    title: 'Play it, the winner advances',
    text: 'You play the 1v1 and upload the end screen as proof. The host picks the winner, who moves on; the loser is out.',
    visual: <div className="pv-vs"><span className="win">You</span><em>vs</em><span>Vexa</span></div>,
  },
  {
    title: '24 hours to appeal',
    text: 'After the final, any player can appeal a call. The prize is held until a person on our team reviews it.',
    visual: <div className="pv-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" /><circle className="pv-ring-fill" cx="50" cy="50" r="44" /></svg><b>24h</b></div>,
  },
  {
    title: 'Everyone gets paid',
    text: "The champion's prize and the host's commission land in their accounts. Match chats are deleted once everything settles.",
    visual: <div className="pv-split"><span style={{ flex: 85 }}>85</span><span style={{ flex: 5 }} /><span style={{ flex: 10 }}>10</span></div>,
  },
];

export default function Process() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const el = track.current;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set('.process-progress i', { scaleX: self.progress }),
        },
      });
      // Panel internals react to their own entry into the viewport.
      gsap.utils.toArray('.process-step').forEach((step) => {
        gsap.from(step.querySelectorAll('.ps-num, .ps-visual'), {
          yPercent: 30, autoAlpha: 0, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: step, containerAnimation: tween, start: 'left 85%', end: 'left 45%', scrub: true },
        });
      });
      gsap.to('.pv-ring-fill', {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '.pv-ring', containerAnimation: tween, start: 'left 90%', end: 'left 30%', scrub: true },
      });
    });
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.process-step').forEach((step) => {
        gsap.from(step, { y: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: step, start: 'top 85%', once: true } });
      });
    });
    return () => mm.revert();
  }, { scope: root });

  // Pinning changes page height; let triggers below re-measure once fonts settle.
  useGSAP(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()); });

  return (
    <section className="process" id="how-it-works" ref={root} aria-labelledby="process-title">
      <div className="process-head">
        <SectionLabel n="02">How it works</SectionLabel>
        <div className="process-progress" aria-hidden="true"><i /></div>
      </div>
      <div className="process-track" ref={track}>
        <div className="process-intro">
          <SplitText as="h2" id="process-title" className="h2" type="words" stagger={0.06}>
            One bracket, start to finish.
          </SplitText>
          <p className="lead">Six steps. Every match is a 1v1 private match in whatever game the host picks.</p>
          <span className="process-hint" aria-hidden="true">Scroll →</span>
        </div>
        {STEPS.map((s, i) => (
          <article className="process-step" key={s.title}>
            <span className="ps-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="ps-visual" aria-hidden="true">{s.visual}</div>
            <div className="ps-copy">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

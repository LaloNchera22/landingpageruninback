import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import Vanta from '../components/Vanta';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

// An 8-player bracket that resolves itself as you scroll through it.
const R1 = ['Nyx', 'Kiro', 'You', 'Vexa', 'Orin', 'Sable', 'Juno', 'Mako'];
const R2 = ['Kiro', 'You', 'Sable', 'Juno'];
const R3 = ['You', 'Sable'];
const CHAMP = 'You';

function Round({ names, round, title }) {
  return (
    <div className={`lb-round lb-r${round}`}>
      <span className="lb-round-title">{title}</span>
      <div className="lb-matches">
        {Array.from({ length: names.length / 2 }, (_, m) => (
          <div className="lb-match" key={m}>
            {[0, 1].map((k) => {
              const name = names[m * 2 + k];
              return <span key={k} className={`lb-slot${name === 'You' ? ' is-you' : ''}`} data-name={name}>{name}</span>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiveBracket() {
  const root = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.lb-board', start: 'top 75%', end: 'bottom 45%', scrub: 0.6 },
    });
    tl.from('.lb-r1 .lb-slot', { autoAlpha: 0, x: -20, stagger: 0.04 })
      .to('.lb-r1 .lb-slot:not([data-name="Kiro"]):not([data-name="You"]):not([data-name="Sable"]):not([data-name="Juno"])', { opacity: 0.25, textDecoration: 'line-through', stagger: 0.03 })
      .from('.lb-r2 .lb-slot', { autoAlpha: 0, x: -20, stagger: 0.05 })
      .to('.lb-r2 .lb-slot[data-name="Kiro"], .lb-r2 .lb-slot[data-name="Juno"]', { opacity: 0.25, textDecoration: 'line-through' })
      .from('.lb-r3 .lb-slot', { autoAlpha: 0, x: -20, stagger: 0.06 })
      .to('.lb-r3 .lb-slot[data-name="Sable"]', { opacity: 0.25, textDecoration: 'line-through' })
      .from('.lb-champ-name', { yPercent: 110, duration: 0.8 })
      .from('.lb-prize', { autoAlpha: 0, y: 10 });
  }, { scope: root });

  return (
    <section className="live" ref={root} aria-labelledby="live-title">
      <Vanta
        effect="net"
        className="live-bg"
        options={{ color: 0x3a3a38, backgroundColor: 0x0b0b0b, points: 9, maxDistance: 20, spacing: 18, showDots: false }}
      />
      <div className="live-inner">
        <SectionLabel n="03" tone="ink">The bracket</SectionLabel>
        <SplitText as="h2" id="live-title" className="h2 live-title" type="chars" stagger={0.02}>
          Eight enter. One wins.
        </SplitText>
        <div className="lb-board" role="img" aria-label="Example 8-player bracket: you win the final against Sable and take 68 credits.">
          <div className="lb-head">
            <span>Friday Cup</span>
            <span>8 players · 10-credit entry</span>
          </div>
          <div className="lb-grid" aria-hidden="true">
            <Round names={R1} round={1} title="Quarterfinals" />
            <Round names={R2} round={2} title="Semifinals" />
            <Round names={R3} round={3} title="Final" />
            <div className="lb-round lb-champ">
              <span className="lb-round-title">Champion</span>
              <div className="lb-champ-box">
                <span className="lb-champ-name">{CHAMP}</span>
                <span className="lb-prize">+68 credits</span>
              </div>
            </div>
          </div>
          <p className="lb-foot">8 players × 10 credits = an 80-credit pool. Champion 68 · host 4 · Runinback 8.</p>
        </div>
      </div>
    </section>
  );
}

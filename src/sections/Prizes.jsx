import { useState } from 'react';
import CountUp from '../bits/CountUp';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

const SIZES = [4, 8, 16, 32];

export default function Prizes() {
  const [fee, setFee] = useState(10);
  const [players, setPlayers] = useState(8);
  const pool = fee * players;
  const rows = [
    { k: 'Champion', pct: 85 },
    { k: 'Host', pct: 5 },
    { k: 'Runinback', pct: 10 },
  ];

  return (
    <section className="prizes" id="prizes" aria-labelledby="prizes-title">
      <SectionLabel n="05">Prizes</SectionLabel>
      <div className="prizes-grid">
        <div className="prizes-copy">
          <SplitText as="h2" id="prizes-title" className="h2" type="words" stagger={0.05}>
            Where every entry fee goes.
          </SplitText>
          <p className="lead">
            The prize pool is every entry fee paid. The champion takes 85%, the host 5%, and Runinback keeps 10%. Try it:
          </p>
          <div className="calc">
            <label className="calc-field">
              <span className="calc-label">Entry fee <output>{fee} credits</output></span>
              <input type="range" min="1" max="100" step="1" value={fee} onChange={(e) => setFee(+e.target.value)} />
            </label>
            <fieldset className="calc-field">
              <legend className="calc-label">Players</legend>
              <div className="calc-chips">
                {SIZES.map((s) => (
                  <label key={s} className={`chip${players === s ? ' is-active' : ''}`}>
                    <input type="radio" name="players" value={s} checked={players === s} onChange={() => setPlayers(s)} />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="calc-note">Illustrative example. There's no real money until legal review is complete, and not in every country.</p>
          </div>
        </div>
        <div className="prizes-board" aria-live="polite">
          <div className="pb-pool">
            <span className="pb-label">Prize pool</span>
            <span className="pb-big"><CountUp to={pool} /></span>
            <span className="pb-unit">credits</span>
          </div>
          {rows.map((r) => (
            <div className="pb-row" key={r.k}>
              <span className="pb-k">{r.k}</span>
              <span className="pb-bar"><i style={{ transform: `scaleX(${r.pct / 100})` }} /></span>
              <span className="pb-pct">{r.pct}%</span>
              <span className="pb-v"><CountUp to={(pool * r.pct) / 100} decimals={pool * r.pct % 100 ? 2 : 0} /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

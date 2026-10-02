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
    { k: 'Campeón', pct: 85 },
    { k: 'Anfitrión', pct: 5 },
    { k: 'Runinback', pct: 10 },
  ];

  return (
    <section className="prizes" id="premios" aria-labelledby="prizes-title">
      <SectionLabel n="05">Premios</SectionLabel>
      <div className="prizes-grid">
        <div className="prizes-copy">
          <SplitText as="h2" id="prizes-title" className="h2" type="words" stagger={0.05}>
            A dónde va cada inscripción.
          </SplitText>
          <p className="lead">
            La bolsa es la suma de todas las inscripciones. El campeón se lleva el 85%, el anfitrión el 5% y Runinback el 10%. Pruébalo:
          </p>
          <div className="calc">
            <label className="calc-field">
              <span className="calc-label">Inscripción <output>{fee} créditos</output></span>
              <input type="range" min="1" max="100" step="1" value={fee} onChange={(e) => setFee(+e.target.value)} />
            </label>
            <fieldset className="calc-field">
              <legend className="calc-label">Jugadores</legend>
              <div className="calc-chips">
                {SIZES.map((s) => (
                  <label key={s} className={`chip${players === s ? ' is-active' : ''}`}>
                    <input type="radio" name="players" value={s} checked={players === s} onChange={() => setPlayers(s)} />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="calc-note">Ejemplo ilustrativo. No habrá dinero real hasta completar la revisión legal, y no en todos los países.</p>
          </div>
        </div>
        <div className="prizes-board" aria-live="polite">
          <div className="pb-pool">
            <span className="pb-label">Bolsa</span>
            <span className="pb-big"><CountUp to={pool} /></span>
            <span className="pb-unit">créditos</span>
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

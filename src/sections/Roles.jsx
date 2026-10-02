import { useState } from 'react';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

const ROLES = {
  jugador: {
    word: 'Jugador',
    lead: 'Abre el link de un amigo o elige un torneo público. Paga la inscripción, toma tu lugar y juega 1 contra 1 hasta que solo quede uno.',
    points: [
      'Juego rápido: te sienta en el siguiente bracket abierto',
      'El código de sala te espera en el cuarto de tu partida',
      'Sales con reembolso completo antes de que arranque',
      'Chat con tu rival y el anfitrión en cada partida',
    ],
  },
  anfitrion: {
    word: 'Anfitrión',
    lead: 'Ponle nombre, elige de 4 a 32 jugadores y la inscripción, hazlo público o privado. Tú abres cada sala, decides quién avanza y ganas el 5%.',
    points: [
      'Un link para compartir, incluso en torneos privados',
      'Arranca antes con 4 o más; los lugares vacíos pasan directo',
      'Publica el código de sala o una captura por partida',
      'Tu comisión se paga junto con el premio',
    ],
  },
};

export default function Roles() {
  const [role, setRole] = useState('jugador');
  const r = ROLES[role];
  return (
    <section className="roles" aria-labelledby="roles-title">
      <SectionLabel n="04">Dos formas de entrar</SectionLabel>
      <div className="roles-grid">
        <div className="roles-switch" role="tablist" aria-label="Elige tu lado">
          <h2 id="roles-title" className="visually-hidden">Elige tu lado: jugador o anfitrión</h2>
          {Object.entries(ROLES).map(([id, v]) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={role === id}
              aria-controls="roles-panel"
              className={`roles-word${role === id ? ' is-active' : ''}`}
              onMouseEnter={() => setRole(id)}
              onFocus={() => setRole(id)}
              onClick={() => setRole(id)}
            >
              <span className="roles-bracket" aria-hidden="true">[</span>
              {v.word}
              <span className="roles-bracket" aria-hidden="true">]</span>
            </button>
          ))}
        </div>
        <div className="roles-panel" id="roles-panel" role="tabpanel" aria-labelledby={`tab-${role}`}>
          <SplitText key={role} as="p" className="roles-lead" type="lines" stagger={0.08} duration={0.9} start="top 95%">
            {r.lead}
          </SplitText>
          <ol className="roles-points">
            {r.points.map((p, i) => (
              <li key={role + i} style={{ '--i': i }}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

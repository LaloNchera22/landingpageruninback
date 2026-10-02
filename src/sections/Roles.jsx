import { useState } from 'react';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

const ROLES = {
  player: {
    word: 'Player',
    lead: "Open a friend's invite link or pick a public tournament. Pay the entry fee, take your seat and play 1v1 until one player is left.",
    points: [
      'Quick Play seats you in the next open bracket',
      "The host's lobby code waits in your match room",
      'Leave for a full refund until it starts',
      'Chat with your opponent and the host in every match',
    ],
  },
  host: {
    word: 'Host',
    lead: 'Name it, pick 4 to 32 players and an entry fee, make it public or private. You open each lobby, decide who advances and earn 5%.',
    points: [
      'One share link, even for private brackets',
      'Start early with 4+ players; empty seats become byes',
      'Post the lobby code or a screenshot for each match',
      'Your commission is paid out with the prize',
    ],
  },
};

export default function Roles() {
  const [role, setRole] = useState('player');
  const r = ROLES[role];
  return (
    <section className="roles" aria-labelledby="roles-title">
      <SectionLabel n="04">Two ways in</SectionLabel>
      <div className="roles-grid">
        <div className="roles-switch" role="tablist" aria-label="Choose your side">
          <h2 id="roles-title" className="visually-hidden">Choose your side: player or host</h2>
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

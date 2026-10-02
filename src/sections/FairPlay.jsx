import DecryptedText from '../bits/DecryptedText';
import SplitText from '../bits/SplitText';
import SectionLabel from './SectionLabel';

const RULES = [
  { t: "Hosts can't play", d: "The person who decides the matches can't enter their own tournament." },
  { t: 'Appeals go to a person', d: "Our team reviews the match chat and screenshots. A wrong call moves the prize and the host's commission to the right winner." },
  { t: 'Quick calls get checked', d: 'A walkover needs a 10-minute wait and a reason. Suspicious patterns are flagged for review.' },
  { t: 'Leave without losing anything', d: 'Until the bracket starts you can leave for a full refund. If a tournament is canceled, everyone gets their entry fee back.' },
];

export default function FairPlay() {
  return (
    <section className="fair" aria-labelledby="fair-title">
      <SectionLabel n="06">Fair play</SectionLabel>
      <SplitText as="h2" id="fair-title" className="h2" type="words" stagger={0.05}>
        Hosts decide. People review.
      </SplitText>
      <ol className="fair-list">
        {RULES.map((r, i) => (
          <li key={r.t}>
            <span className="fair-n">{String(i + 1).padStart(2, '0')}</span>
            <DecryptedText as="h3" text={r.t} className="fair-t" />
            <p>{r.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

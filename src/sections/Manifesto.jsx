import ScrollReveal from '../bits/ScrollReveal';
import SectionLabel from './SectionLabel';

export default function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <SectionLabel n="01">Manifesto</SectionLabel>
      <h2 id="manifesto-title" className="visually-hidden">Why Runinback exists</h2>
      <ScrollReveal className="manifesto-text">
        Anyone can run a tournament. Few run it well. Runinback puts the bracket, the rules, the lobbies
        and the prizes behind one link, so all you have to worry about is playing.
      </ScrollReveal>
      <div className="manifesto-meta">
        <span>For hosts</span>
        <span>For players</span>
        <span>For any game with private matches</span>
      </div>
    </section>
  );
}

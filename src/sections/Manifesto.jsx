import ScrollReveal from '../bits/ScrollReveal';
import SectionLabel from './SectionLabel';

export default function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <SectionLabel n="01">Manifiesto</SectionLabel>
      <h2 id="manifesto-title" className="visually-hidden">Por qué existe Runinback</h2>
      <ScrollReveal className="manifesto-text">
        Cualquiera puede organizar un torneo. Pocos lo hacen bien. Runinback junta el bracket, las reglas, las salas
        y los premios en un solo link, para que tú solo te preocupes por jugar.
      </ScrollReveal>
      <div className="manifesto-meta">
        <span>Para anfitriones</span>
        <span>Para jugadores</span>
        <span>Para cualquier juego con partidas privadas</span>
      </div>
    </section>
  );
}

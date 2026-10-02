import ScrollVelocity from '../bits/ScrollVelocity';

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Runinback en pocas palabras">
      <ScrollVelocity
        className="marquee-text"
        velocity={70}
        texts={[
          'Crea · Comparte · Compite · Gana · ',
          'Torneos de videojuegos — brackets 1v1 — ',
        ]}
      />
    </section>
  );
}

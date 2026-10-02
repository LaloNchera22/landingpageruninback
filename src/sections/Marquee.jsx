import ScrollVelocity from '../bits/ScrollVelocity';

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Runinback in a few words">
      <ScrollVelocity
        className="marquee-text"
        velocity={70}
        texts={[
          'Create · Share · Compete · Win · ',
          'Video game tournaments — 1v1 brackets — ',
        ]}
      />
    </section>
  );
}

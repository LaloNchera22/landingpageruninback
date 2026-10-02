export default function SectionLabel({ n, children, tone = 'paper' }) {
  return (
    <div className={`section-label tone-${tone}`}>
      <span>[ {n} ]</span>
      <span>{children}</span>
    </div>
  );
}

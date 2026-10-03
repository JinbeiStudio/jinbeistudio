export default function SectionHeading({ depth, eyebrow, title }: { depth: string; eyebrow: string; title: string }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">
        <span className="eyebrow__depth">−{depth} m</span>
        <span className="eyebrow__line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

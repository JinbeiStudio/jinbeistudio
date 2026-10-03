import type { Dictionary } from '@/lib/content';
import SectionHeading from './SectionHeading';

export default function About({ about }: { about: Dictionary['about'] }) {
  return (
    <section id="about" className="section">
      <SectionHeading depth={about.depth} eyebrow={about.eyebrow} title={about.title} />
      <div className="about">
        <div className="about__text">
          {about.paragraphs.map((p) => (
            <p key={p} className="reveal">
              {p}
            </p>
          ))}
          <p className="about__note reveal">{about.nameNote}</p>
        </div>
        <dl className="stats">
          {about.stats.map((s) => (
            <div key={s.label} className="stat reveal">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

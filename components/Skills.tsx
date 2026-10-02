import type { Dictionary } from '@/lib/content';
import SectionHeading from './SectionHeading';

export default function Skills({ skills }: { skills: Dictionary['skills'] }) {
  const all = skills.groups.flatMap((g) => g.items);

  return (
    <section id="skills" className="section">
      <SectionHeading depth={skills.depth} eyebrow={skills.eyebrow} title={skills.title} />
      <div className="skills">
        {skills.groups.map((g, gi) => (
          <div key={g.name} className="skills__group reveal">
            <h3>{g.name}</h3>
            <ul>
              {g.items.map((item, i) => (
                <li key={item} className="bubble" style={{ '--d': gi * 0.7 + i * 0.35 } as React.CSSProperties}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Duplicated track makes the marquee loop without a jump. */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...all, ...all].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

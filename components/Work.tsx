import Image from 'next/image';
import type { Dictionary } from '@/lib/content';
import SectionHeading from './SectionHeading';
import ProjectVisual from './ProjectVisual';
import TiltCard from './TiltCard';

// The first card is wide; the last one too when the rest would leave an odd card alone in the 2-column grid.
const isWide = (i: number, count: number) => i === 0 || (i === count - 1 && (count - 1) % 2 === 1);

export default function Work({ work }: { work: Dictionary['work'] }) {
  return (
    <section id="work" className="section">
      <SectionHeading depth={work.depth} eyebrow={work.eyebrow} title={work.title} />
      <p className="section__intro reveal">{work.intro}</p>

      <div className="projects">
        {work.featured.map((p, i, all) => (
          <div key={p.name} className={`reveal projects__cell ${isWide(i, all.length) ? 'projects__cell--wide' : ''}`}>
            <TiltCard className="project">
              <ProjectVisual project={p} screenLabel={work.screenLabel} />
              <div className="project__body">
                <p className="project__kind">{p.kind}</p>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <ul className="chips" aria-label={work.stackLabel}>
                  {p.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                {p.href && (
                  <a className="project__link" href={p.href} target="_blank" rel="noopener noreferrer">
                    {work.visit} <span className="sr-only">{p.name}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      <h3 className="freelance__title reveal">{work.freelanceTitle}</h3>
      <ul className="freelance">
        {work.freelance.map((f) => (
          <li key={f.name} className="reveal">
            <a href={f.href} target="_blank" rel="noopener noreferrer" className="freelance__item">
              <Image src={f.image} alt="" width={900} height={512} sizes="(min-width: 976px) 25vw, 50vw" />
              <span>{f.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

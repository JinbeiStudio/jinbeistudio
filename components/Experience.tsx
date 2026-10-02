import type { Dictionary } from '@/lib/content';
import SectionHeading from './SectionHeading';

export default function Experience({ experience }: { experience: Dictionary['experience'] }) {
  return (
    <section id="experience" className="section">
      <SectionHeading depth={experience.depth} eyebrow={experience.eyebrow} title={experience.title} />
      <ol className="timeline">
        {experience.jobs.map((job) => (
          <li key={job.company} className="timeline__item reveal">
            <span className="timeline__dot" aria-hidden="true" />
            <p className="timeline__period">{job.period}</p>
            <h3>
              {job.role} <span className="timeline__company">· {job.company}</span>
            </h3>
            <p className="timeline__summary">{job.summary}</p>
            <ul className="chips" aria-label={experience.stackLabel}>
              {job.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="education reveal">
        <h3>{experience.education.title}</h3>
        <ul>
          {experience.education.items.map((e) => (
            <li key={e.school}>
              <span className="education__year">{e.year}</span>
              <span>
                <strong>{e.degree}</strong> — {e.school}
                <em>{e.note}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

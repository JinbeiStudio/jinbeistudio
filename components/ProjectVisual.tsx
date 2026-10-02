import Image from 'next/image';
import type { Project } from '@/lib/content';
import ModuleIcon from './ModuleIcon';

const domainOf = (href?: string) => (href ? new URL(href).hostname.replace(/^www\./, '') : '');

// Ocean-tinted at rest, true colours on hover; the frames tilt flat as the card is approached.
export default function ProjectVisual({ project, screenLabel }: { project: Project; screenLabel: string }) {
  if (project.screens?.length) {
    return (
      <div className="project__media project__stage project__stage--phones">
        {project.screens.map((src, i) => (
          <div key={src} className={`phone phone--${i}`}>
            <Image src={src} alt={i === 1 ? `${project.name} — ${screenLabel}` : ''} width={450} height={975} sizes="160px" />
          </div>
        ))}
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="project__media project__stage">
        <div className="browser">
          <div className="browser__bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{domainOf(project.href)}</p>
          </div>
          <div className="browser__screen">
            <Image src={project.image} alt={project.name} width={1400} height={875} sizes="(min-width: 976px) 45vw, 90vw" />
          </div>
        </div>
      </div>
    );
  }

  const highlights = project.highlights ?? [];
  return (
    <div className="project__media project__modules" aria-hidden="true">
      <ul style={{ '--cols': highlights.length % 3 === 0 ? 3 : 2 } as React.CSSProperties}>
        {highlights.map((h, m) => (
          <li key={h.label} style={{ '--m': m } as React.CSSProperties}>
            <ModuleIcon name={h.icon} />
            {h.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

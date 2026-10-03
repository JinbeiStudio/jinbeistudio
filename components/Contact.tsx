import type { Dictionary } from '@/lib/content';

export default function Contact({ contact }: { contact: Dictionary['contact'] }) {
  return (
    <section id="contact" className="section contact">
      <div className="contact__glow" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <p className="eyebrow reveal">
        <span className="eyebrow__depth">−{contact.depth} m</span>
        <span className="eyebrow__line" aria-hidden="true" />
        {contact.eyebrow}
      </p>
      <h2 className="contact__title reveal">{contact.title}</h2>
      <p className="contact__pitch reveal">{contact.pitch}</p>
      <a className="contact__email reveal" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
      <ul className="contact__links reveal">
        {contact.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

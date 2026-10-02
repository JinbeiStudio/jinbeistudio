import type { Dictionary } from '@/lib/content';
import WhaleShark from './WhaleShark';

// Letters carry a global index so the stagger runs across both words.
const name = ['Julien', 'Gabriel'].map((word, w, words) => {
  const offset = words.slice(0, w).join('').length;
  return { word, letters: [...word].map((ch, i) => ({ ch, i: offset + i })) };
});

export default function Hero({ hero }: { hero: Dictionary['hero'] }) {
  return (
    <section id="top" className="hero">
      <div className="hero__surface" aria-hidden="true">
        <div className="hero__caustics" />
        <div className="hero__sun" />
        <div className="hero__rays" />
        <div className="hero__rays hero__rays--alt" />
      </div>

      <div className="hero__shark-wrap" aria-hidden="true">
        <WhaleShark />
      </div>

      <div className="hero__content">
        <p className="status-pill">
          <span className="status-pill__dot" />
          {hero.status}
        </p>
        <h1 className="hero__name">
          <span className="sr-only">Julien Gabriel</span>
          {name.map(({ word, letters }, w) => (
            <span key={word} className="hero__word" aria-hidden="true">
              {w > 0 && ' '}
              {letters.map(({ ch, i }) => (
                <span key={i} className="hero__letter" style={{ '--i': i } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero__role">{hero.role}</p>
        <p className="hero__pitch">{hero.pitch}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={hero.primary.href}>
            {hero.primary.label}
          </a>
          <a className="btn btn--ghost" href={hero.secondary.href}>
            {hero.secondary.label}
          </a>
        </div>
      </div>

      <a className="scroll-cue" href="#about">
        <span>{hero.scroll}</span>
        <span className="scroll-cue__line" aria-hidden="true" />
      </a>
    </section>
  );
}

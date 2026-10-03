import Image from 'next/image';
import type { Dictionary } from '@/lib/content';
import CarouselButtons from './CarouselButtons';
import SectionHeading from './SectionHeading';

export default function Testimonials({ testimonials }: { testimonials: Dictionary['testimonials'] }) {
  return (
    <section id="testimonials" className="section section--bleed">
      <div className="section__inner">
        <SectionHeading depth={testimonials.depth} eyebrow={testimonials.eyebrow} title={testimonials.title} />
        {testimonials.translated && <p className="section__intro reveal">{testimonials.translated}</p>}
        <CarouselButtons target="testimonial-list" previous={testimonials.previous} next={testimonials.next} />
      </div>
      <ul id="testimonial-list" className="quotes" tabIndex={0} aria-label={testimonials.title}>
        {testimonials.items.map((t) => (
          <li key={t.author} className="quote">
            <blockquote>
              <p>“{t.quote}”</p>
            </blockquote>
            <div className="quote__author">
              <Image src={t.image} alt="" width={48} height={48} />
              <p>
                <strong>{t.author}</strong>
                <span>{t.company}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

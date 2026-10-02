'use client';

// Mouse users can't swipe or shift-scroll easily, so the hidden-scrollbar carousel gets arrows.
export default function CarouselButtons({ target, previous, next }: { target: string; previous: string; next: string }) {
  const scroll = (direction: 1 | -1) => {
    const list = document.getElementById(target);
    const card = list?.querySelector('li');
    if (!list || !card) return;
    list.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: 'smooth' });
  };

  return (
    <div className="carousel-buttons">
      <button type="button" onClick={() => scroll(-1)} aria-label={previous} aria-controls={target}>
        <span aria-hidden="true">←</span>
      </button>
      <button type="button" onClick={() => scroll(1)} aria-label={next} aria-controls={target}>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

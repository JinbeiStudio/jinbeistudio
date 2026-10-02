'use client';

import { useEffect, useRef, useState } from 'react';
import { creatureWidth, creatures, type CreatureKind } from './Creatures';

type Visitor = {
  id: number;
  kind: CreatureKind;
  top: number;
  leftward: boolean;
  scale: number;
  duration: number;
};

// Each animal lives at its own depth; the surface (hero) belongs to the whale shark alone.
const habitats: { section: string; kind: CreatureKind }[] = [
  { section: '#about', kind: 'turtle' },
  { section: '#experience', kind: 'manta' },
  { section: '#work', kind: 'shark' },
  { section: '#skills', kind: 'shark' },
  { section: '#testimonials', kind: 'whale' },
  { section: '#contact', kind: 'whale' },
];

const speed: Record<CreatureKind, [number, number]> = {
  shark: [18, 26],
  turtle: [28, 38],
  whale: [45, 60],
  manta: [24, 32],
};

const between = (min: number, max: number) => min + Math.random() * (max - min);

// The habitat whose section covers the middle of the viewport.
function currentHabitat() {
  const middle = innerHeight / 2;
  return habitats.find(({ section }) => {
    const rect = document.querySelector(section)?.getBoundingClientRect();
    return rect && middle >= rect.top && middle < rect.bottom;
  });
}

// One animal at a time crosses its own section of the page, scrolling with it.
export default function SeaLife() {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  // Short rest on first load or when the reader swims away; a longer one after a full crossing.
  const rest = useRef<[number, number]>([1500, 3000]);

  // Drop an animal as soon as its depth scrolls out of view, so it can't block the next habitat.
  useEffect(() => {
    if (!visitor) return;
    const check = window.setInterval(() => {
      const margin = innerHeight * 0.5;
      if (visitor.top < scrollY - margin || visitor.top > scrollY + innerHeight + margin) {
        rest.current = [1500, 3000];
        setVisitor(null);
      }
    }, 1000);
    return () => window.clearInterval(check);
  }, [visitor]);

  useEffect(() => {
    if (visitor || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let poll = 0;
    // Rest, then wait until the reader is in a habitat.
    const timer = window.setTimeout(() => {
      const trySpawn = () => {
        const habitat = document.hidden ? undefined : currentHabitat();
        if (!habitat) return;
        window.clearInterval(poll);
        setVisitor({
          id: Date.now(),
          kind: habitat.kind,
          top: scrollY + innerHeight * between(0.25, 0.65),
          leftward: Math.random() < 0.5,
          scale: between(0.85, 1.3),
          duration: between(...speed[habitat.kind]),
        });
      };
      poll = window.setInterval(trySpawn, 1500);
      trySpawn();
    }, between(...rest.current));

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(poll);
    };
  }, [visitor]);

  if (!visitor) return <div className="sea-life" aria-hidden="true" />;

  const Creature = creatures[visitor.kind];
  // Smaller means farther away: even softer and fainter.
  const distance = Math.max(0, 1.3 - visitor.scale);

  return (
    <div className="sea-life" aria-hidden="true">
      <div
        key={visitor.id}
        className={`sea-life__visitor ${visitor.leftward ? 'is-leftward' : ''}`}
        style={
          {
            top: visitor.top,
            width: creatureWidth[visitor.kind] * visitor.scale,
            '--swim': `${visitor.duration}s`,
            '--blur': `${(0.6 + distance * 1.2).toFixed(1)}px`,
            '--alpha': (0.75 - distance * 0.3).toFixed(2),
          } as React.CSSProperties
        }
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          rest.current = [6000, 12000];
          setVisitor(null);
        }}
      >
        <div className={`sea-life__body sea-life__body--${visitor.kind}`}>
          <Creature />
        </div>
      </div>
    </div>
  );
}

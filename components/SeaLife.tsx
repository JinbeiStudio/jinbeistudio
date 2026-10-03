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
  // Seconds already swum when it appears (negative animation delay), so it's mid-crossing on arrival.
  head: number;
};

// Each animal lives at its own depth; the surface (hero) belongs to the whale shark alone.
const habitats: { section: string; kind: CreatureKind }[] = [
  { section: '#about', kind: 'turtle' },
  { section: '#experience', kind: 'shark' },
  { section: '#work', kind: 'manta' },
  { section: '#skills', kind: 'manta' },
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

// The habitat under a probe point (in viewport px), plus where an animal should swim in it (page px).
function habitatAt(probe: number) {
  for (const habitat of habitats) {
    const rect = document.querySelector(habitat.section)?.getBoundingClientRect();
    if (!rect || probe < rect.top || probe >= rect.bottom) continue;
    // Keep the animal inside its section, away from the edges.
    const pad = Math.min(innerHeight * 0.2, rect.height / 3);
    const top = scrollY + Math.min(Math.max(probe, rect.top + pad), rect.bottom - pad);
    return { ...habitat, top };
  }
  return undefined;
}

// One animal at a time crosses its own section of the page, scrolling with it.
export default function SeaLife() {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const visitorRef = useRef<Visitor | null>(null);
  // Earliest time the next animal may appear: soon after arriving somewhere, longer after a full crossing.
  const nextSpawn = useRef(0);

  useEffect(() => {
    visitorRef.current = visitor;
  }, [visitor]);

  // One fast loop follows the reader and looks ahead in the scroll direction, so the next section's
  // animal is already swimming when it scrolls into view.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    nextSpawn.current = performance.now() + 800;
    let lastY = scrollY;
    let direction = 1;

    const tick = () => {
      if (document.hidden) return;
      const now = performance.now();
      if (scrollY !== lastY) direction = scrollY > lastY ? 1 : -1;
      lastY = scrollY;
      const current = visitorRef.current;

      if (current) {
        // Keep it while on screen, or while it waits ahead of the reader; once it falls behind, free the slot.
        const onScreen = current.top > scrollY - innerHeight * 0.1 && current.top < scrollY + innerHeight * 1.1;
        const ahead = direction > 0 ? current.top > scrollY && current.top < scrollY + innerHeight * 1.6 : current.top < scrollY + innerHeight && current.top > scrollY - innerHeight * 0.6;
        if (onScreen || ahead) return;
        visitorRef.current = null;
        setVisitor(null);
        nextSpawn.current = now;
        return;
      }

      if (now < nextSpawn.current) return;
      // Probe half a screen ahead of the middle of the viewport; fall back to what's on screen.
      const habitat = habitatAt(innerHeight * (0.5 + direction * 0.5)) ?? habitatAt(innerHeight * 0.5);
      if (!habitat) return;
      const duration = between(...speed[habitat.kind]);
      const next: Visitor = {
        id: now,
        kind: habitat.kind,
        top: habitat.top,
        leftward: Math.random() < 0.5,
        scale: between(0.85, 1.3),
        duration,
        head: duration * between(0.1, 0.25),
      };
      visitorRef.current = next;
      setVisitor(next);
    };

    const loop = window.setInterval(tick, 250);
    return () => window.clearInterval(loop);
  }, []);

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
            animationDelay: `-${visitor.head.toFixed(1)}s`,
            '--blur': `${(0.6 + distance * 1.2).toFixed(1)}px`,
            '--alpha': (0.75 - distance * 0.3).toFixed(2),
          } as React.CSSProperties
        }
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          nextSpawn.current = performance.now() + between(4000, 8000);
          visitorRef.current = null;
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

'use client';

import { useEffect, useId, useMemo, useRef } from 'react';
import { animate, creatures, prepare, withExtras, type CreatureKind } from '@/lib/sea';

// One animal from the shared sea package, swimming in place; the caller moves it across the page.
// `extra` is SVG drawn over the animal, where `@name` refers to the animal's own clips (as `@body`).
export default function SeaCreature({ kind, className, extra = '' }: { kind: CreatureKind; className?: string; extra?: string }) {
  // useId gives colons, which a url(#…) reference can't hold.
  const id = 'sea' + useId().replace(/[^\w-]/g, '');
  const prepared = useMemo(() => prepare(creatures[kind], { id, className }), [kind, id, className]);
  const html = useMemo(() => withExtras(prepared.svg, id, extra), [prepared, extra, id]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = box.current?.firstElementChild;
    if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return animate(svg, prepared, Math.random()).stop;
  }, [prepared]);

  return <div ref={box} className="sea-creature" dangerouslySetInnerHTML={{ __html: html }} />;
}

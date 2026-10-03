'use client';

import { useRef } from 'react';

// Feeds pointer position to CSS; the tilt and glare themselves are pure CSS.
export default function TiltCard({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  function onPointerMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', String((e.clientX - r.left) / r.width));
    el.style.setProperty('--py', String((e.clientY - r.top) / r.height));
  }

  function onPointerLeave() {
    ref.current?.style.setProperty('--px', '0.5');
    ref.current?.style.setProperty('--py', '0.5');
  }

  return (
    <article ref={ref} className={`tilt ${className}`} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {children}
    </article>
  );
}

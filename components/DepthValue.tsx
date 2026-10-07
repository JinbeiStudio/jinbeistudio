'use client';

import { useEffect, useRef } from 'react';

const MAX_DEPTH = 200;
// Bottom of the ocean gradient (--mid) and the abyss it darkens into, as RGB.
const WATER = [8, 42, 50];
const ABYSS = [1, 8, 11];
const TINT_STEPS = 40;

const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((c, i) => Math.round(c + (b[i] - c) * t)).join(' ')})`;

// Single source of scroll progress: the depth number, --dive (0..1) for CSS, and the header's data-solid flag.
// Variables go on the few elements that use them, not :root: a root change makes Safari restyle the whole page each frame.
export default function DepthValue() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const targets = [...document.querySelectorAll<HTMLElement>('.ocean, .depth, .site-header')];
    const header = document.querySelector<HTMLElement>('.site-header');
    let tintStep = -1;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
      for (const el of targets) el.style.setProperty('--dive', progress.toFixed(4));
      // A time-based CSS transition fades the header; tying it to scroll position looked abrupt in Safari.
      header?.toggleAttribute('data-solid', scrollY > 24);
      // Safari paints its bottom toolbar with the body colour, so match the water at the screen's bottom edge.
      // Quantised so the body restyles a few dozen times per dive, not every frame.
      const step = Math.round(Math.min(progress * 1.4, 1) * TINT_STEPS);
      if (step !== tintStep) {
        tintStep = step;
        document.body.style.backgroundColor = mix(WATER, ABYSS, step / TINT_STEPS);
      }
      if (ref.current) ref.current.textContent = `−${Math.round(progress * MAX_DEPTH)} m`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <span ref={ref} className="depth__value">
      −0 m
    </span>
  );
}

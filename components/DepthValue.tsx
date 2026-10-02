'use client';

import { useEffect, useRef } from 'react';

const MAX_DEPTH = 200;

// Single source of scroll progress: the depth number, plus --dive (0..1) and --header (0..1) for CSS.
// Safari's scroll-driven animations proved unreliable, so nothing page-wide depends on them.
export default function DepthValue() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
      root.style.setProperty('--dive', progress.toFixed(4));
      root.style.setProperty('--header', Math.min(scrollY / 160, 1).toFixed(3));
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

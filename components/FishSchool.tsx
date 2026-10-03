'use client';

import { useEffect, useRef } from 'react';

type Fish = { x: number; y: number; vx: number; vy: number; phase: number };

const COUNT = 46;
const MAX_SPEED = 2.4;
const VIEW = 70;
const SEPARATION = 22;

// A small boids simulation that schools around the cursor.
export default function FishSchool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    // Decorative only: skip on touch screens and when motion is reduced.
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(devicePixelRatio, 2);
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const target = { x: w * 0.7, y: h * 0.4, active: false };
    const fish: Fish[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      phase: Math.random() * Math.PI * 2,
    }));

    let idleTimer = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      target.active = true;
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => (target.active = false), 2500);
    };

    let raf = 0;
    let t = 0;
    const step = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      // Without a cursor the school follows a slow figure-eight.
      const tx = target.active ? target.x : w * 0.62 + Math.sin(t / 240) * w * 0.25;
      const ty = target.active ? target.y : h * 0.45 + Math.sin(t / 120) * h * 0.18;

      for (const f of fish) {
        let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, n = 0;
        for (const o of fish) {
          if (o === f) continue;
          const dx = o.x - f.x;
          const dy = o.y - f.y;
          const d = Math.hypot(dx, dy);
          if (d > VIEW) continue;
          n++;
          ax += o.vx;
          ay += o.vy;
          cx += o.x;
          cy += o.y;
          if (d < SEPARATION) {
            sx -= dx / (d || 1);
            sy -= dy / (d || 1);
          }
        }
        if (n) {
          f.vx += (ax / n - f.vx) * 0.05 + (cx / n - f.x) * 0.0008;
          f.vy += (ay / n - f.vy) * 0.05 + (cy / n - f.y) * 0.0008;
        }
        f.vx += sx * 0.06 + (tx - f.x) * 0.0006;
        f.vy += sy * 0.06 + (ty - f.y) * 0.0006;

        const speed = Math.hypot(f.vx, f.vy);
        if (speed > MAX_SPEED) {
          f.vx = (f.vx / speed) * MAX_SPEED;
          f.vy = (f.vy / speed) * MAX_SPEED;
        }
        f.x += f.vx;
        f.y += f.vy;
        f.phase += 0.25;

        const angle = Math.atan2(f.vy, f.vx);
        const wag = Math.sin(f.phase) * 0.35;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(angle);
        ctx.fillStyle = 'rgba(190, 240, 248, 0.32)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate(wag);
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-11, -3);
        ctx.lineTo(-11, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="fish-school" aria-hidden="true" />;
}

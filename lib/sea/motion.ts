// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Rig } from './engine';
import type { Pt } from './path';

export const TAU = Math.PI * 2;
export const rad = (deg: number) => (deg * Math.PI) / 180;
export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(t));

/**
 * A stroke that takes `power` of the cycle to go from 0 to 1 and the rest to come back,
 * as a fin pushes fast and recovers slowly.
 */
export const stroke = (ph: number, power: number) => {
  const p = ((ph % 1) + 1) % 1;
  return p < power ? ease(p / power) : 1 - ease((p - power) / (1 - power));
};

export const still: Rig = (x, y) => [x, y];

/**
 * A wave running from head to tail along a horizontal spine, bending the body up and down in the picture.
 * Points keep their distance from the spine, so a tail or fluke turns with it instead of shearing.
 */
export function spine(o: { head: number; tail: number; axis: number; amp: number; waves: number; env: (s: number) => number; shift?: number }): Rig {
  const f = (x: number, ph: number) => {
    const s = (o.head - x) / (o.head - o.tail);
    return o.amp * o.env(clamp(s, 0, 1.15)) * Math.sin(TAU * (ph + (o.shift ?? 0) - o.waves * s));
  };
  return (x, y, ph) => {
    const slope = (f(x + 0.5, ph) - f(x - 0.5, ph)) / 1;
    const a = Math.atan(slope);
    const off = y - o.axis;
    return [x - off * Math.sin(a), o.axis + f(x, ph) + off * Math.cos(a)];
  };
}

/** Pins a stiff part (a fin, a flipper) to the body at root: it rides and turns with the body, plus its own turn. */
export function attach(body: Rig, root: Pt, turn: (ph: number) => number = () => 0): Rig {
  return (x, y, ph) => {
    const r = body(root[0], root[1], ph);
    const a = body(root[0] - 1, root[1], ph), b = body(root[0] + 1, root[1], ph);
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + rad(turn(ph));
    const dx = x - root[0], dy = y - root[1];
    return [r[0] + dx * Math.cos(ang) - dy * Math.sin(ang), r[1] + dx * Math.sin(ang) + dy * Math.cos(ang)];
  };
}

/** A limb seen from above: turns about its root and looks shorter along `dir` (degrees) as it dips out of the plane. */
export function limb(root: Pt, dir: number, turn: (ph: number) => number, span: (ph: number) => number): Rig {
  const ux = Math.cos(rad(dir)), uy = Math.sin(rad(dir));
  return (x, y, ph) => {
    const dx = x - root[0], dy = y - root[1];
    const along = (dx * ux + dy * uy) * span(ph), across = -dx * uy + dy * ux;
    const px = along * ux - across * uy, py = along * uy + across * ux;
    const a = rad(turn(ph));
    return [root[0] + px * Math.cos(a) - py * Math.sin(a), root[1] + px * Math.sin(a) + py * Math.cos(a)];
  };
}

/** Runs b on the result of a. */
export const then = (a: Rig, b: Rig): Rig => (x, y, ph) => {
  const p = a(x, y, ph);
  return b(p[0], p[1], ph);
};

/** Moves the whole drawing by (dx, dy) at each phase: the surge of a stroke. */
export const shift = (by: (ph: number) => Pt): Rig => (x, y, ph) => {
  const d = by(ph);
  return [x + d[0], y + d[1]];
};

/**
 * Bends everything behind root a little further, fading in over `width` units, so flukes flick
 * through each turn while staying one piece with the body.
 */
export function flex(body: Rig, root: Pt, width: number, turn: (ph: number) => number): Rig {
  return (x, y, ph) => {
    const p = body(x, y, ph);
    const w = ease((root[0] + width / 2 - x) / width);
    if (w <= 0) return p;
    const r = body(root[0], root[1], ph);
    const a = rad(turn(ph)) * w;
    const dx = p[0] - r[0], dy = p[1] - r[1];
    return [r[0] + dx * Math.cos(a) - dy * Math.sin(a), r[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  };
}

/** Runs a rig drawn for a body facing right on a drawing facing up, the head at the top. */
export const upright = (rig: Rig): Rig => (x, y, ph) => {
  const p = rig(-y, x, ph);
  return [p[1], -p[0]];
};

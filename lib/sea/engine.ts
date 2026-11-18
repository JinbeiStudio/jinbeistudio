// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import { parse, serialize, subdivide, warp, type Pt, type Sub } from './path';

export type Attrs = Record<string, string | number>;
/**
 * A path or a group; `rig` names the motion its points follow, inherited by a group's children.
 * A pinned group moves as one stiff piece, carried and turned by its rig at the pin.
 */
export type Node = { d: string; a?: Attrs; rig?: string } | { g: Node[]; a?: Attrs; rig?: string; pin?: Pt };
/** Where a point of the still drawing is at phase ph (0 to 1) of the swim cycle. */
export type Rig = (x: number, y: number, ph: number) => Pt;

export interface Creature {
  viewBox: [number, number, number, number];
  /** Width on screen at scale 1, in px. */
  width: number;
  /** Seconds to cross the screen. */
  speed: [number, number];
  /** Seconds per swim cycle (tail beat, wing flap, bell pulse). */
  period: number;
  /** Gradients and patterns; `id="@name"` and `@name` refs are scoped per drawing. */
  defs: string;
  clips?: Record<string, { d: string; rig?: string }>;
  nodes: Node[];
  rigs: Record<string, Rig>;
  /** Longest path segment before bending, in viewBox units. */
  seg?: number;
}

export interface RenderOptions {
  /** Prefix for gradient and clip ids, unique per drawing on a page. */
  id: string;
  /** Phase of the swim cycle to draw, 0 to 1. */
  phase?: number;
  className?: string;
}

/** What changes between keyframes: a path's numbers, or a stiff group's move and turn. */
export type Track = { kind: 'path'; shape: number[]; closed: boolean[]; frames: Float32Array[] } | { kind: 'pin'; frames: Float32Array[] };

export interface Prepared {
  /** The drawing at phase 0; each moving element carries data-sea, in track order. */
  svg: string;
  tracks: Track[];
  period: number;
}

const subsCache = new WeakMap<object, Map<number, Sub[]>>();

function subsOf(key: object, d: string, seg: number): Sub[] {
  let bySeg = subsCache.get(key);
  if (!bySeg) subsCache.set(key, (bySeg = new Map()));
  let subs = bySeg.get(seg);
  if (!subs) bySeg.set(seg, (subs = subdivide(parse(d), seg)));
  return subs;
}

const esc = (v: string | number) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function attrs(a: Attrs | undefined, id: string): string {
  if (!a) return '';
  let out = '';
  for (const k in a) out += ` ${k}="${esc(String(a[k]).replace(/@([\w-]+)/g, `url(#${id}-$1)`))}"`;
  return out;
}

function flat(subs: Sub[]): Float32Array {
  const out: number[] = [];
  for (const sub of subs) {
    if (!sub.segs.length) continue;
    out.push(sub.segs[0][0][0], sub.segs[0][0][1]);
    for (const seg of sub.segs) out.push(seg[1][0], seg[1][1], seg[2][0], seg[2][1], seg[3][0], seg[3][1]);
  }
  return Float32Array.from(out);
}

function build(c: Creature, o: { id: string; phases: number[]; className?: string }): Prepared {
  const seg = c.seg ?? 8;
  const tracks: Track[] = [];
  const tag = () => ` data-sea="${tracks.length - 1}"`;

  const path = (key: object, d: string, rigName: string | undefined, a: string): string => {
    if (!rigName) return `<path${a} d="${d}"/>`;
    const rig = c.rigs[rigName];
    if (!rig) throw new Error('unknown rig ' + rigName);
    const subs = subsOf(key, d, seg);
    const warped = o.phases.map((ph) => warp(subs, (x, y) => rig(x, y, ph)));
    const live = subs.filter((sub) => sub.segs.length);
    tracks.push({ kind: 'path', shape: live.map((sub) => sub.segs.length), closed: live.map((sub) => sub.closed), frames: warped.map(flat) });
    return `<path${a}${tag()} d="${serialize(warped[0])}"/>`;
  };

  // A stiff group, moved by the rig as it moves the ground around its pin: carried, turned and stretched,
  // so a fill pattern inside goes with it.
  const pinned = (n: Node & { g: Node[] }, pin: Pt, rig: Rig): string => {
    const frames = o.phases.map((ph) => {
      const p = rig(pin[0], pin[1], ph), px = rig(pin[0] + 1, pin[1], ph), py = rig(pin[0], pin[1] + 1, ph);
      const a = px[0] - p[0], b = px[1] - p[1], c2 = py[0] - p[0], d = py[1] - p[1];
      return Float32Array.of(a, b, c2, d, p[0] - a * pin[0] - c2 * pin[1], p[1] - b * pin[0] - d * pin[1]);
    });
    tracks.push({ kind: 'pin', frames });
    const inner = `<g${attrs(n.a, o.id)}>${n.g.map((child) => node(child, undefined)).join('')}</g>`;
    return `<g${tag()} transform="${matrix(frames[0])}">${inner}</g>`;
  };

  const node = (n: Node, rig: string | undefined): string => {
    const r = n.rig ?? rig;
    if ('g' in n) {
      if (n.pin && r) {
        if (!c.rigs[r]) throw new Error('unknown rig ' + r);
        return pinned(n, n.pin, c.rigs[r]);
      }
      return `<g${attrs(n.a, o.id)}>${n.g.map((child) => node(child, r)).join('')}</g>`;
    }
    return path(n, n.d, r, attrs(n.a, o.id));
  };

  const defs = c.defs.replace(/id="@([\w-]+)"/g, `id="${o.id}-$1"`).replace(/@([\w-]+)/g, `url(#${o.id}-$1)`);
  let clips = '';
  for (const name in c.clips) {
    const clip = c.clips[name];
    clips += `<clipPath id="${o.id}-${name}">${path(clip, clip.d, clip.rig, '')}</clipPath>`;
  }
  const body = c.nodes.map((n) => node(n, undefined)).join('');

  const [x, y, w, h] = c.viewBox;
  const cls = o.className ? ` class="${o.className}"` : '';
  return { svg: `<svg${cls} viewBox="${x} ${y} ${w} ${h}" aria-hidden="true"><defs>${defs}${clips}</defs>${body}</svg>`, tracks, period: c.period };
}

const matrix = (f: ArrayLike<number>) =>
  `matrix(${f[0].toFixed(4)} ${f[1].toFixed(4)} ${f[2].toFixed(4)} ${f[3].toFixed(4)} ${f[4].toFixed(2)} ${f[5].toFixed(2)})`;

/** The drawing still, at one phase of its swim cycle. */
export const render = (c: Creature, o: RenderOptions): string => build(c, { id: o.id, phases: [o.phase ?? 0], className: o.className }).svg;

/** The drawing plus keyframes for animate(); more keyframes follow the curves more closely. */
export const prepare = (c: Creature, o: { id: string; keyframes?: number; className?: string }): Prepared => {
  const n = o.keyframes ?? 16;
  return build(c, { id: o.id, phases: Array.from({ length: n }, (_, k) => k / n), className: o.className });
};

const r1 = (v: number) => Math.round(v * 10) / 10;

function pathData(t: Extract<Track, { kind: 'path' }>, nums: Float32Array): string {
  let d = '', i = 0;
  for (let s = 0; s < t.shape.length; s++) {
    d += `M${r1(nums[i++])} ${r1(nums[i++])}`;
    for (let k = 0; k < t.shape[s]; k++) d += `C${r1(nums[i++])} ${r1(nums[i++])} ${r1(nums[i++])} ${r1(nums[i++])} ${r1(nums[i++])} ${r1(nums[i++])}`;
    if (t.closed[s]) d += 'Z';
  }
  return d;
}

/**
 * Moves a drawing made by prepare(), blending the two keyframes either side of each moment.
 * Runs until stop() or until the drawing leaves the page; offset (0 to 1) starts it partway through a cycle.
 */
export function animate(svg: Element, p: Prepared, offset = 0): { stop: () => void } {
  const els = Array.from(svg.querySelectorAll('[data-sea]'));
  const n = p.tracks[0]?.frames.length ?? 0;
  const scratch = p.tracks.map((t) => new Float32Array(t.frames[0].length));
  let raf = 0;
  const t0 = performance.now() - offset * p.period * 1000;
  const frame = (now: number) => {
    if (!svg.isConnected) return;
    const pos = ((((now - t0) / 1000 / p.period) % 1) + 1) % 1 * n;
    const k = Math.floor(pos) % n, k2 = (k + 1) % n, f = pos - Math.floor(pos);
    p.tracks.forEach((t, i) => {
      const a = t.frames[k], b = t.frames[k2], out = scratch[i];
      for (let j = 0; j < out.length; j++) out[j] = a[j] + (b[j] - a[j]) * f;
      els[i].setAttribute(t.kind === 'path' ? 'd' : 'transform', t.kind === 'path' ? pathData(t, out) : matrix(out));
    });
    raf = requestAnimationFrame(frame);
  };
  if (n) raf = requestAnimationFrame(frame);
  return { stop: () => cancelAnimationFrame(raf) };
}

export const aspect = (c: Creature) => c.viewBox[3] / c.viewBox[2];

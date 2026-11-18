// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
// Path data as cubic segments, so every point can be moved by a rig and frames keep the same structure.

export type Pt = [number, number];
export type Seg = [Pt, Pt, Pt, Pt];
export type Sub = { segs: Seg[]; closed: boolean };
export type Warp = (x: number, y: number) => Pt;

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const line = (a: Pt, b: Pt): Seg => [a, lerp(a, b, 1 / 3), lerp(a, b, 2 / 3), b];

/** Parses the absolute M, L, H, V, C and Z commands the art uses. */
export function parse(d: string): Sub[] {
  const tokens = d.match(/[MLHVCZ]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) ?? [];
  const subs: Sub[] = [];
  let i = 0;
  let cmd = '';
  let cur: Pt = [0, 0];
  let start: Pt = [0, 0];
  let sub: Sub | null = null;
  const num = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[A-Z]/i.test(tokens[i])) cmd = tokens[i++].toUpperCase();
    if (/[a-z]/.test(cmd)) throw new Error('relative commands are not supported: ' + d);
    switch (cmd) {
      case 'M':
        cur = start = [num(), num()];
        sub = { segs: [], closed: false };
        subs.push(sub);
        cmd = 'L';
        break;
      case 'L': {
        const p: Pt = [num(), num()];
        sub!.segs.push(line(cur, p));
        cur = p;
        break;
      }
      case 'H': {
        const p: Pt = [num(), cur[1]];
        sub!.segs.push(line(cur, p));
        cur = p;
        break;
      }
      case 'V': {
        const p: Pt = [cur[0], num()];
        sub!.segs.push(line(cur, p));
        cur = p;
        break;
      }
      case 'C': {
        const c1: Pt = [num(), num()];
        const c2: Pt = [num(), num()];
        const p: Pt = [num(), num()];
        sub!.segs.push([cur, c1, c2, p]);
        cur = p;
        break;
      }
      case 'Z':
        if (Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 1e-6) sub!.segs.push(line(cur, start));
        sub!.closed = true;
        cur = start;
        break;
      default:
        throw new Error(`unsupported command ${cmd} in ${d}`);
    }
  }
  return subs;
}

function split(s: Seg, t: number): [Seg, Seg] {
  const [a, b, c, d] = s;
  const ab = lerp(a, b, t), bc = lerp(b, c, t), cd = lerp(c, d, t);
  const abc = lerp(ab, bc, t), bcd = lerp(bc, cd, t);
  const m = lerp(abc, bcd, t);
  return [[a, ab, abc, m], [m, bcd, cd, d]];
}

/** Cuts segments longer than maxLen, so a bend follows the body instead of only moving its end points. */
export function subdivide(subs: Sub[], maxLen: number): Sub[] {
  return subs.map((sub) => {
    const segs: Seg[] = [];
    for (let s of sub.segs) {
      const len = Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]) + Math.hypot(s[2][0] - s[1][0], s[2][1] - s[1][1]) + Math.hypot(s[3][0] - s[2][0], s[3][1] - s[2][1]);
      const n = Math.max(1, Math.ceil(len / maxLen));
      for (let k = n; k > 1; k--) {
        const [head, rest] = split(s, 1 / k);
        segs.push(head);
        s = rest;
      }
      segs.push(s);
    }
    return { segs, closed: sub.closed };
  });
}

export const warp = (subs: Sub[], fn: Warp): Sub[] =>
  subs.map((sub) => ({ closed: sub.closed, segs: sub.segs.map((s) => s.map((p) => fn(p[0], p[1])) as Seg) }));

const fmt = (n: number) => {
  const r = Math.round(n * 10) / 10;
  return Object.is(r, -0) ? '0' : String(r);
};

export function serialize(subs: Sub[]): string {
  let out = '';
  for (const sub of subs) {
    if (!sub.segs.length) continue;
    out += `M${fmt(sub.segs[0][0][0])} ${fmt(sub.segs[0][0][1])}`;
    for (const s of sub.segs) out += `C${fmt(s[1][0])} ${fmt(s[1][1])} ${fmt(s[2][0])} ${fmt(s[2][1])} ${fmt(s[3][0])} ${fmt(s[3][1])}`;
    if (sub.closed) out += 'Z';
  }
  return out;
}

const K = 0.5523;

/** An ellipse as four cubic arcs, optionally turned by rot degrees about its centre. */
export function ellipse(cx: number, cy: number, rx: number, ry: number, rot = 0): string {
  const a = (rot * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a);
  const p = (x: number, y: number): string => `${fmt(cx + x * cos - y * sin)} ${fmt(cy + x * sin + y * cos)}`;
  return (
    `M${p(rx, 0)}` +
    `C${p(rx, ry * K)} ${p(rx * K, ry)} ${p(0, ry)}` +
    `C${p(-rx * K, ry)} ${p(-rx, ry * K)} ${p(-rx, 0)}` +
    `C${p(-rx, -ry * K)} ${p(-rx * K, -ry)} ${p(0, -ry)}` +
    `C${p(rx * K, -ry)} ${p(rx, -ry * K)} ${p(rx, 0)}Z`
  );
}

export const circle = (cx: number, cy: number, r: number) => ellipse(cx, cy, r, r);

// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
// Shared bits of the drawings.

/** The faint pale rim every outline uses. */
export const rim = { stroke: '#c8f0f5', 'stroke-opacity': 0.28, 'stroke-width': 0.8 };

/** Seeded PRNG, so the same spots come out on every build and every app. */
export function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const round = (n: number, digits = 1) => Number(n.toFixed(digits));

/**
 * Sea-turtle skin over a box: irregular plates on a staggered grid with pale seams between them,
 * as three paths of slightly different shades.
 */
export function scaleMosaic(x0: number, y0: number, x1: number, y1: number, size: number, seed: number): [string, string, string] {
  const rand = seeded(seed);
  const h = size * 0.86;
  const cols = Math.ceil((x1 - x0) / size) + 2, rows = Math.ceil((y1 - y0) / h) + 1;
  const v: [number, number][][] = [];
  for (let j = 0; j <= rows; j++) {
    v.push([]);
    for (let i = 0; i <= cols; i++) {
      const jx = (rand() - 0.5) * size * 0.5, jy = (rand() - 0.5) * h * 0.5;
      v[j].push([x0 - size + i * size + (j % 2 ? size / 2 : 0) + jx, y0 + j * h + jy]);
    }
  }
  const out: [string, string, string] = ['', '', ''];
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const quad = [v[j][i], v[j][i + 1], v[j + 1][i + 1], v[j + 1][i]];
      const cx = quad.reduce((a, p) => a + p[0], 0) / 4, cy = quad.reduce((a, p) => a + p[1], 0) / 4;
      // Each plate shrinks toward its middle, leaving a pale seam.
      const pts = quad.map((p) => `${round(cx + (p[0] - cx) * 0.85)} ${round(cy + (p[1] - cy) * 0.85)}`);
      out[Math.floor(rand() * 3)] += `M${pts[0]}L${pts[1]}L${pts[2]}L${pts[3]}Z`;
    }
  return out;
}

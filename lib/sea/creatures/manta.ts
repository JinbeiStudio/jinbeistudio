// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature, Rig } from '../engine';
import { rim, round } from '../art';
import { circle } from '../path';
import { TAU, clamp, rad, then, shift } from '../motion';

// Manta from above, facing right: far wider than long, with swept-back wings and rounded tips, a broad flat head
// between two curled cephalic fins, white shoulder patches, pale wingtips and a long thin tail.
// Each wing beat runs from the leading edge back to the tips; from above, a raised or lowered wing looks
// shorter, the tips most, since they bend furthest.

const AXIS = 100, HINGE = 12, SPAN = 88, FRONT = 150;

// The ray surges a little on each downstroke.
const surge = shift((ph) => [1.6 * Math.sin(TAU * (ph - 0.1)), 0]);

const flap: Rig = (x, y, ph) => {
  const r = y - AXIS, u = Math.abs(r);
  if (u <= HINGE) return [x, y];
  const side = r < 0 ? -1 : 1;
  const chord = clamp((FRONT - x) / 70);
  const beat = Math.sin(TAU * (ph - 0.16 * chord));
  // Wings ride a little high, as mantas fly with a slight upward set.
  const lift = rad(8);
  let across = HINGE, back = 0;
  const steps = 10, du = (u - HINGE) / steps;
  for (let i = 0; i < steps; i++) {
    const t = ((i + 0.5) * du) / (SPAN - HINGE);
    const a = lift + rad(50) * t ** 0.7 * beat;
    across += Math.cos(a) * du;
    // Tips trail as they sweep down.
    back += Math.abs(Math.sin(a)) * du * 0.08;
  }
  return [x - back, AXIS + side * across];
};

// The short tail sways a little from side to side.
const whip: Rig = (x, y, ph) => {
  const s = clamp((80 - x) / 66);
  return [x, y + 2.6 * s ** 1.5 * Math.sin(TAU * (ph - 0.7 * s))];
};

// A fainter rim than the other animals: the wide disc's edge read as too hard.
const soft = { ...rim, 'stroke-opacity': 0.14 };

// Top half of the outline, mirrored for the bottom: flat front, convex leading edge out to a rounded tip,
// concave trailing edge back past the pelvic fins, narrowing into the short tail.
const top = [
  [151, 100], [151, 96, 151, 93, 149, 91], [149, 76, 138, 46, 96, 14], [91, 10, 84, 11, 86, 17], [100, 37, 104, 62, 90, 84], [86, 89, 82, 93, 78, 96], [70, 98.8, 50, 99.7, 14, 100],
];
const DISC = (() => {
  const m = (y: number) => 2 * AXIS - y;
  let d = `M${top[0][0]} ${top[0][1]}`;
  for (const s of top.slice(1)) d += `C${s.join(' ')}`;
  for (let i = top.length - 1; i >= 1; i--) {
    const [c1x, c1y, c2x, c2y] = top[i];
    const end = top[i - 1].length === 2 ? top[i - 1] : top[i - 1].slice(4);
    d += `C${c2x} ${m(c2y)} ${c1x} ${m(c1y)} ${end[0]} ${m(end[1])}`;
  }
  return d + 'Z';
})();

// The same path on the other side of the body (paths of M, L and C only, as x y pairs).
const mirror = (d: string) => {
  let i = 0;
  return d.replace(/-?\d+(\.\d+)?/g, (n) => (i++ % 2 ? String(round(2 * AXIS - Number(n))) : n));
};

// Reef manta markings: a white patch on each shoulder, fading into the black toward the back like the wingtips, with a black stripe left
// down the middle between them.
// A thin dark band stays along the leading edge in front of each patch.
const SHOULDER =
  'M144.6 93.6C144.8 86 143.8 79 141.4 72.6C139.4 67.4 136.4 62.4 132.4 58.4' +
  'C130.6 60.6 129.8 62.8 128 64.2C126.4 65.4 124.6 65.2 124 66.8C123.4 68.6 124.8 69.8 124 71.4C123 73.2 120.6 73.4 120 75.4' +
  'C119.4 77.4 120.8 78.4 120.2 80.2C119.6 82 117.4 82.4 117.2 84.6C117 86.6 118.6 87.4 118.2 89.4C117.8 91.4 116.4 92.4 116.8 95.4' +
  'C126 95.8 136 95.4 144.6 93.6Z';
// Pale wingtips, fading in toward the body.
const TIP = 'M60 -4L120 -4L120 40L60 40Z';
// Pale streaks either side of the tail's root.
const TAIL_MARK = 'M89 96.4C85 97.6 81 98.6 75 99.3';
export const manta: Creature = {
  viewBox: [0, 0, 170, 200],
  width: 170,
  speed: [24, 32],
  period: 3.6,
  seg: 5,
  defs:
    '<radialGradient id="@back" gradientUnits="userSpaceOnUse" cx="126" cy="100" r="95"><stop offset="0" stop-color="#1d2e35"/><stop offset=".5" stop-color="#0e181d"/><stop offset="1" stop-color="#070d10"/></radialGradient>' +
    '<linearGradient id="@patch" gradientUnits="userSpaceOnUse" x1="116" y1="0" x2="144" y2="0"><stop offset="0" stop-color="#d6e3e5" stop-opacity="0"/><stop offset=".55" stop-color="#d6e3e5" stop-opacity=".55"/><stop offset="1" stop-color="#e4eef0" stop-opacity=".9"/></linearGradient>' +
    '<linearGradient id="@tipTop" gradientUnits="userSpaceOnUse" x1="0" y1="36" x2="0" y2="14"><stop offset="0" stop-color="#d6e3e5" stop-opacity="0"/><stop offset=".55" stop-color="#d6e3e5" stop-opacity=".55"/><stop offset="1" stop-color="#e4eef0" stop-opacity=".85"/></linearGradient>' +
    '<linearGradient id="@tipBottom" gradientUnits="userSpaceOnUse" x1="0" y1="164" x2="0" y2="186"><stop offset="0" stop-color="#d6e3e5" stop-opacity="0"/><stop offset=".55" stop-color="#d6e3e5" stop-opacity=".55"/><stop offset="1" stop-color="#e4eef0" stop-opacity=".85"/></linearGradient>',
  clips: { disc: { d: DISC, rig: 'wings' } },
  rigs: {
    wings: then(then(flap, whip), surge),
    body: surge,
  },
  nodes: [
    {
      rig: 'wings',
      g: [
        { d: DISC, a: { fill: '@back', ...soft } },
        { d: TIP, a: { fill: '@tipTop', 'clip-path': '@disc' } },
        { d: mirror(TIP), a: { fill: '@tipBottom', 'clip-path': '@disc' } },
        { d: SHOULDER + mirror(SHOULDER), a: { fill: '@patch', 'clip-path': '@disc' } },
        { d: TAIL_MARK + mirror(TAIL_MARK), a: { fill: 'none', stroke: '#d6e3e5', 'stroke-opacity': 0.55, 'stroke-width': 0.9, 'stroke-linecap': 'round' } },
      ],
    },
    {
      rig: 'body',
      g: [
        // Cephalic fins either side of the wide mouth, rolled inward like hooks.
        { d: 'M148 91.5C153 89.6 158 89 160.6 91C162 92.4 161.4 94.6 159.4 95.4C157 95.6 154 95.2 150 95Z' + mirror('M148 91.5C153 89.6 158 89 160.6 91C162 92.4 161.4 94.6 159.4 95.4C157 95.6 154 95.2 150 95Z'), a: { fill: '#121d22', ...rim } },
        { d: 'M150.6 94V106', a: { stroke: '#0a1418', 'stroke-width': 1.2, 'stroke-linecap': 'round', fill: 'none' } },
        { d: circle(145.5, 91.4, 1.1), a: { fill: '#05090b' } },
        { d: circle(145.5, 108.6, 1.1), a: { fill: '#05090b' } },
      ],
    },
  ],
};

// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature, Node } from '../engine';
import type { Pt } from '../path';
import { rim, scaleMosaic } from '../art';
import { circle, ellipse } from '../path';
import { TAU, limb, shift, stroke, then } from '../motion';

// Sea turtle from above, facing right. It flies with both front flippers together: a quick power stroke
// sweeps them back and down (shorter from above), then a slow recovery brings them forward again.
// The small rear flippers only steer.

const POWER = 0.4;
const sweep = (ph: number) => 8 - 40 * stroke(ph, POWER);
const dip = (ph: number) => 1 - 0.42 * stroke(ph, POWER);

// It gathers speed on each power stroke and eases off through the recovery.
const surge = shift((ph) => [2 * Math.sin(TAU * (ph - 0.3)), 0]);

const frontTop = then(limb([74, 36], -45, sweep, dip), surge);
const frontBottom = then(limb([74, 64], 45, (ph) => -sweep(ph), dip), surge);
const rearTop = then(limb([34, 36], -150, (ph) => 7 * Math.sin(TAU * (ph - 0.4)), () => 1), surge);
const rearBottom = then(limb([34, 64], 150, (ph) => -7 * Math.sin(TAU * (ph - 0.4)), () => 1), surge);
// The head draws in a little on each stroke.
const head = then(shift((ph) => [-1.2 * stroke(ph, POWER), 0]), surge);

// Limb and head outlines, with the box their scale dots cover.
const LIMBS: Record<string, { d: string; box: [number, number, number, number] }> = {
  frontTop: { d: 'M70 34C80 14 96 4 110 0C98 14 86 26 78 40Z', box: [68, 0, 112, 42] },
  frontBottom: { d: 'M70 66C80 86 96 96 110 100C98 86 86 74 78 60Z', box: [68, 58, 112, 102] },
  rearTop: { d: 'M34 36L16 26C20 32 24 38 30 42Z', box: [14, 24, 36, 44] },
  rearBottom: { d: 'M34 64L16 74C20 68 24 62 30 58Z', box: [14, 56, 36, 76] },
  head: { d: 'M84 44C90 40 102 40 108 48C110 50 110 52 108 54C102 62 90 60 84 56Z', box: [82, 38, 112, 62] },
};

// Pale skin showing between dark plates, the plates clipped to the outline, then the rim on top.
const PLATES = ['#33452f', '#3d4f35', '#46573b'];
const skin = (k: string, i: number): Node[] => [
  { d: LIMBS[k].d, a: { fill: '#8b9670' } },
  {
    a: { 'clip-path': `@${k}` },
    g: scaleMosaic(...LIMBS[k].box, k === 'head' ? 5.2 : 4.2, 7 + i).map((d, n) => ({ d, a: { fill: PLATES[n] } })),
  },
  { d: LIMBS[k].d, a: { fill: 'none', ...rim } },
];
const part = (k: string, pin: Pt, i: number): Node => ({ rig: k, pin, g: skin(k, i) });

const scutes = [
  // Vertebral row along the spine, then costal plates on each side.
  'M40 50L45 42H55L59 50L55 58H45Z',
  'M59 50L63 42H71L75 50L71 58H63Z',
  'M75 50L79 43H85L88 50L85 57H79Z',
  'M45 42L42 31C50 27 58 26 63 27L63 42H55Z',
  'M63 42L63 27C70 27 77 29 82 33L79 43H71Z',
  'M45 58L42 69C50 73 58 74 63 73L63 58H55Z',
  'M63 58L63 73C70 73 77 71 82 67L79 57H71Z',
  'M40 50L45 42L42 31C35 35 31 42 30 50C31 58 35 65 42 69L45 58Z',
  'M88 50L85 43L82 33C87 37 90 43 90 50C90 57 87 63 82 67L85 57Z',
];

export const turtle: Creature = {
  viewBox: [0, 0, 120, 100],
  width: 130,
  speed: [28, 38],
  period: 3.2,
  seg: 4,
  defs:
    '<radialGradient id="@scute" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#8a9a6c"/><stop offset=".55" stop-color="#4f6a52"/><stop offset="1" stop-color="#24372f"/></radialGradient>',
  rigs: { frontTop, frontBottom, rearTop, rearBottom, head, body: surge },
  clips: Object.fromEntries(Object.entries(LIMBS).map(([k, l]) => [k, { d: l.d }])),
  // Each limb moves as a stiff piece with its scales drawn on, so they go with it.
  nodes: [
    part('frontTop', [74, 36], 1),
    part('frontBottom', [74, 64], 2),
    part('rearTop', [34, 36], 3),
    part('rearBottom', [34, 64], 4),
    {
      rig: 'head',
      pin: [96, 50],
      g: [
        ...skin('head', 5),
        { d: circle(101, 45, 1.4), a: { fill: '#0b1614' } },
        { d: circle(101, 55, 1.4), a: { fill: '#0b1614' } },
      ],
    },
    {
      pin: [60, 50],
      rig: 'body',
      g: [
        { d: ellipse(60, 50, 31, 24), a: { fill: '#1c2b25', ...rim } },
        {
          g: scutes.map((d) => ({ d })),
          a: { fill: '@scute', stroke: '#d9eedd', 'stroke-opacity': 0.4, 'stroke-width': 0.7, 'stroke-linejoin': 'round' },
        },
        { d: ellipse(60, 50, 30, 23), a: { fill: 'none', stroke: '#d9eedd', 'stroke-opacity': 0.3, 'stroke-width': 2.2, 'stroke-dasharray': '3 2.4' } },
        { d: ellipse(54, 40, 16, 6), a: { fill: '#e6fbff', opacity: 0.12 } },
      ],
    },
  ],
};

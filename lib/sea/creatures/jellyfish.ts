// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature, Rig } from '../engine';
import { circle, ellipse } from '../path';
import { TAU, clamp, stroke } from '../motion';

// Moon jelly, leaning into its drift. The bell snaps shut, narrow and tall, and pushes the jelly forward,
// then opens slowly; the arms and tentacles follow late, the tips last, in a wave that runs down them.

const CONTRACT = 0.3, MARGIN = 62, TOP = 8;
const squeeze = (ph: number) => stroke(ph, CONTRACT);
// Forward is up the bell; the push comes just after the squeeze and fades through the glide.
const lift = (ph: number) => 5 * stroke(ph - 0.06, 0.42);

const bell: Rig = (x, y, ph) => {
  const c = squeeze(ph);
  const t = clamp((y - TOP) / (MARGIN - TOP));
  const narrow = 1 - 0.2 * c * (0.35 + 0.65 * t);
  return [60 + (x - 60) * narrow, TOP + (y - TOP) * (1 + 0.1 * c) - lift(ph)];
};

const trail: Rig = (x, y, ph) => {
  const s = clamp((y - MARGIN) / 165, 0, 1.1);
  const late = ph - 0.14 * s;
  const c = squeeze(late);
  const top = bell(60, MARGIN, late);
  const narrow = 1 - 0.18 * c * (1 - s) ** 2;
  const wave = 5 * s * Math.sin(TAU * (ph - 0.85 * s));
  return [60 + (x - 60) * narrow + wave, top[1] + (y - MARGIN) * (1 + 0.04 * c)];
};

const tentacles = [26, 36, 46, 74, 84, 94];

export const jellyfish: Creature = {
  viewBox: [0, 0, 120, 230],
  width: 120,
  speed: [60, 80],
  period: 2.8,
  seg: 6,
  defs:
    '<radialGradient id="@bell" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#d9f7ff" stop-opacity=".75"/><stop offset=".55" stop-color="#7fdcef" stop-opacity=".35"/><stop offset="1" stop-color="#5a8de0" stop-opacity=".12"/></radialGradient>' +
    '<radialGradient id="@glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f2e6ff" stop-opacity=".9"/><stop offset="1" stop-color="#b9a4ff" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="@arm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bdefff" stop-opacity=".7"/><stop offset="1" stop-color="#bdefff" stop-opacity="0"/></linearGradient>',
  rigs: { bell, trail },
  nodes: [
    {
      // Leans into its direction of travel; apps mirror it for leftward drifts.
      a: { transform: 'rotate(14 60 60)' },
      g: [
        {
          rig: 'trail',
          a: { class: 'jelly-trail' },
          g: [
            ...tentacles.map((x, i) => ({
              d: `M${x} 62C${x + (i % 2 ? 8 : -8)} 100 ${x + (i % 2 ? -6 : 6)} 150 ${x + (i % 2 ? 4 : -4)} 225`,
              a: { fill: 'none', stroke: '#a8e6f5', 'stroke-opacity': 0.35, 'stroke-width': 0.8 },
            })),
            { d: 'M52 64C42 90 62 112 50 140C44 156 56 170 50 186', a: { fill: 'none', stroke: '@arm', 'stroke-width': 5, 'stroke-linecap': 'round' } },
            { d: 'M60 64C70 92 52 116 64 146C70 162 58 178 64 196', a: { fill: 'none', stroke: '@arm', 'stroke-width': 6, 'stroke-linecap': 'round' } },
            { d: 'M68 64C78 88 66 110 74 134C78 148 70 160 74 172', a: { fill: 'none', stroke: '@arm', 'stroke-width': 4, 'stroke-linecap': 'round' } },
          ],
        },
        {
          rig: 'bell',
          a: { class: 'jelly-bell' },
          g: [
            {
              d: 'M18 62C18 26 38 8 60 8C82 8 102 26 102 62C95 68 88 63 81 67C75 63 68 68 60 65C52 68 45 63 39 67C32 63 25 68 18 62Z',
              a: { fill: '@bell', stroke: '#c9f6fb', 'stroke-opacity': 0.5, 'stroke-width': 0.8 },
            },
            { d: ellipse(60, 38, 22, 16), a: { fill: '@glow' } },
            {
              g: [circle(52, 36, 5), circle(68, 36, 5), circle(56, 46, 4.5), circle(64, 46, 4.5)].map((d) => ({ d })),
              a: { fill: 'none', stroke: '#e9dcff', 'stroke-opacity': 0.55, 'stroke-width': 1.4 },
            },
            {
              g: [22, 34, 47, 60, 73, 86, 98].map((x) => ({ d: circle(x, x === 60 ? 65 : 64, 1.3) })),
              a: { class: 'jelly-lights', fill: '#e6fbff' },
            },
          ],
        },
      ],
    },
  ],
};

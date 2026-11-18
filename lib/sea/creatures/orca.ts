// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature } from '../engine';
import { rim } from '../art';
import { ellipse, circle } from '../path';
import { TAU, attach, flex, spine } from '../motion';

// Orca, side view, facing right: the whale's up-and-down beat, quicker and tighter.
// The body narrows into a tail stock the flukes grow out of: one piece, bending as one.
// The flukes are horizontal, seen a little from above: the far lobe up and behind, the near lobe down and forward.

const body = flex(
  spine({ head: 292, tail: -14, axis: 62, amp: 6, waves: 0.5, env: (s) => 0.04 + 0.96 * s ** 2.2 }),
  [34, 62],
  16,
  (ph) => 12 * Math.sin(TAU * (ph - 0.2)),
);

const BODY = 'M292 60C286 45 262 34 230 32C190 30 140 36 100 44C80 48 62 53 48 56.5C40 58 34 58.8 30 59V65.5C34 65.8 40 66.6 48 68C70 73 100 79 140 81C190 83 240 81 268 75C284 71 294 66 292 60Z';
// Back and belly only, never across the tail stock where the flukes join.
const OUTLINE = 'M25 59.3C27 59.2 28.5 59.1 30 59C34 58.8 40 58 48 56.5C62 53 80 48 100 44C140 36 190 30 230 32C262 34 286 45 292 60C294 66 284 71 268 75C240 81 190 83 140 81C100 79 70 73 48 68C40 66.6 34 65.8 30 65.5C28.5 65.4 27 65.3 25 65.1';

export const orca: Creature = {
  viewBox: [-18, -22, 318, 132],
  width: 350,
  speed: [22, 30],
  period: 2.3,
  seg: 6,
  defs:
    '<linearGradient id="@skin" gradientUnits="userSpaceOnUse" x1="0" y1="30" x2="0" y2="82"><stop offset="0" stop-color="#2a3a41"/><stop offset=".45" stop-color="#111c21"/><stop offset="1" stop-color="#0a1317"/></linearGradient>' +
    '<linearGradient id="@white" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f8f9"/><stop offset="1" stop-color="#b9cdd1"/></linearGradient>' +
    '<linearGradient id="@fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#24343b"/><stop offset="1" stop-color="#0c1519"/></linearGradient>',
  rigs: {
    body,
    flipper: attach(body, [222, 74], (ph) => 6 * Math.sin(TAU * (ph + 0.25))),
  },
  nodes: [
    {
      rig: 'body',
      g: [
        // Far fluke, in its own shadow, then the near one.
        { d: 'M34 59.6C26 55.6 10 46 -12 40C-4 50 8 58 20 62C26 62 30 62 34 62Z', a: { fill: '#070d10' } },
        { d: 'M34 61C30 61.6 26 62 20 62C10 68 -2 77 -14 84C2 80 22 70 34 65.2Z', a: { fill: '@skin' } },
        // Rims on the flukes' outer edges only, so no line runs down the middle where the lobes meet.
        { d: 'M34 59.6C26 55.6 10 46 -12 40C-4 50 8 58 20 62C10 68 -2 77 -14 84C2 80 22 70 34 65.2', a: { fill: 'none', ...rim } },
        // The tall, broad dorsal fin of an adult male: curved leading edge, near-straight trailing edge, rounded tip.
        { d: 'M196 39C188 22 172 -2 159 -14C156 -16.5 152 -15 152 -11C152 4 148 26 140 42Z', a: { fill: '@fin', ...rim } },
        { d: BODY, a: { fill: '@skin' } },
        // Grey saddle patch behind the dorsal fin.
        { d: 'M196 38C182 45 160 47 132 44C146 37 172 34 196 38Z', a: { fill: '#8fa3a8', opacity: 0.45 } },
        // White belly sweeping up into the flank patch near the tail.
        { d: 'M272 71C244 79 200 81 160 80C130 79 104 76 84 69C96 64 108 64 118 70C136 73 170 72 200 70C230 68 256 67 272 71Z', a: { fill: '@white' } },
        { d: 'M232 72C229 85 221 97 209 101C203 99 207 87 218 74Z', a: { fill: '@fin', ...rim }, rig: 'flipper' },
        { d: OUTLINE, a: { fill: 'none', ...rim } },
        // The keel ridge along the tail stock.
        { d: 'M25 62.3C40 62.1 54 61.2 69 59.4', a: { fill: 'none', stroke: '#c9f6fb', 'stroke-opacity': 0.18, 'stroke-width': 0.9, 'stroke-linecap': 'round' } },
        { d: 'M100 47C150 38 210 34 262 38', a: { fill: 'none', stroke: '#e6fbff', 'stroke-opacity': 0.18, 'stroke-width': 1.4, 'stroke-linecap': 'round' } },
        {
          pin: [255, 50],
          g: [
            // White eye patch, just above and behind the eye.
            { d: ellipse(248, 47, 13, 5, -8), a: { fill: '@white' } },
            { d: circle(263, 53, 1.6), a: { fill: '#05090b' } },
            { d: circle(263.5, 52.5, 0.45), a: { fill: '#e6fbff' } },
          ],
        },
      ],
    },
  ],
};

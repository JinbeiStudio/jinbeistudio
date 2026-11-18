// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature, Node } from '../engine';
import { rim, round, seeded } from '../art';
import { circle } from '../path';
import { TAU, attach, flex, spine } from '../motion';

// Humpback, side view, facing right. Whales beat their flukes up and down, so the wave shows from the side:
// a slow rise and fall growing from a near-still head to the tail stock, the flukes flicking a beat behind.
// The body narrows into a deep tail stock the flukes grow out of: one piece, bending as one.

const rand = seeded(42);
const jitter = (n: number) => round((rand() - 0.5) * n, 1);

const body = flex(
  spine({ head: 396, tail: -20, axis: 88, amp: 10, waves: 0.55, env: (s) => 0.05 + 0.95 * s ** 2.4 }),
  [34, 88],
  18,
  (ph) => 10 * Math.sin(TAU * (ph - 0.2)),
);

// The near fluke, its trailing edge serrated as a humpback's is, from the notch out to the tip.
const NEAR_FLUKE = (() => {
  let d = 'M38 87C32 88 26 88 18 88';
  const n = 9;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const x = 18 - 38 * t, y = 88 + 30 * t ** 1.15;
    d += i < n ? `L${round(x + 1.2)} ${round(y - 0.4)}L${round(x)} ${round(y + 1.2)}` : `L${round(x)} ${round(y)}`;
  }
  return d + 'C0 112 24 99 38 92.6Z';
})();
// Rims on the flukes' outer edges only, so no line runs down the middle where the lobes meet.
const FLUKE_EDGES = 'M38 84.6C28 79.4 8 64 -16 54C-8 66 6 80 18 88' + NEAR_FLUKE.replace(/^M38 87C32 88 26 88 18 88/, 'M18 88').replace(/Z$/, '');

// Flat, tapering head; the back rises behind it, then slopes past the small dorsal fin into the tail stock.
const BODY =
  'M396 80C393 72 380 64 356 60C324 54 280 48 236 48C200 48 170 50 150 53C120 58 92 66 70 73C56 78 44 81 34 83.5V93.5' +
  'C44 95 56 98 70 101C102 107 150 112 200 114C250 115 300 110 336 102C360 97 380 92 390 88C394 86 397 83 396 80Z';
// Back and belly only, never across the tail stock where the flukes join.
const OUTLINE =
  'M28 84.4C30 84.1 32 83.8 34 83.5C44 81 56 78 70 73C92 66 120 58 150 53C170 50 200 48 236 48C280 48 324 54 356 60C380 64 393 72 396 80' +
  'C397 83 394 86 390 88C380 92 360 97 336 102C300 110 250 115 200 114C150 112 102 107 70 101C56 98 44 95 34 93.5C32 93.3 30 93 28 92.7';

// The pale belly, with the ragged edge humpbacks have where dark back meets white underside.
const bellyEdge = (() => {
  const anchors: [number, number][] = [[398, 86], [360, 93], [320, 97], [260, 101], [200, 104], [140, 102], [90, 98], [50, 94]];
  let d = 'M398 86';
  for (let i = 1; i < anchors.length; i++) {
    const [x0, y0] = anchors[i - 1], [x1, y1] = anchors[i];
    const steps = Math.max(2, Math.round((x0 - x1) / 7));
    for (let k = 1; k <= steps; k++) {
      const t = k / steps;
      d += `L${round(x0 + (x1 - x0) * t)} ${round(y0 + (y1 - y0) * t + (k < steps ? jitter(2.4) : 0))}`;
    }
  }
  return d + 'L50 140L400 140Z';
})();

// Ventral grooves running back from the chin, following the belly.
const pleats: Node[] = Array.from({ length: 9 }, (_, i) => ({
  d: `M${388 - i * 3} ${89 + i * 1.7}C${350 - i * 4} ${99 + i * 1.5} ${290 - i * 5} ${107 + i * 0.9} ${236 - i * 6} ${108 + i * 0.6}`,
}));

// Knobs (tubercles) in rows along the top of the head and the lower jaw.
const headTop = (x: number) => 60 + ((x - 356) / 40) * 19 + ((x - 356) / 40) ** 2 * 1.5;
const knobs: Node[] = [
  ...Array.from({ length: 11 }, (_, i) => {
    const x = 352 + i * 3.8 + jitter(1.2);
    return { d: circle(round(x), round(headTop(x) + 2.6 + jitter(1)), round(1.1 + rand() * 0.6)) };
  }),
  ...Array.from({ length: 8 }, (_, i) => {
    const x = 362 + i * 4 + jitter(1.4);
    return { d: circle(round(x), round(headTop(x) + 7.5 + jitter(1.2)), round(0.8 + rand() * 0.5)) };
  }),
  ...Array.from({ length: 6 }, (_, i) => ({ d: circle(round(384 - i * 6 + jitter(1)), round(89.5 + i * 1.1 + jitter(0.8)), 0.9) })),
];
const barnacles: Node[] = Array.from({ length: 14 }, () => ({ d: circle(round(372 + rand() * 20), round(89 + rand() * 6), round(0.5 + rand() * 0.7)) }));

// The very long pectoral fin, bumpy along its leading edge, pale toward the tip.
const flipper = (() => {
  const tip: [number, number] = [190, 143], front: [number, number] = [314, 105];
  let d = `M288 98C258 106 222 124 ${tip[0]} ${tip[1]}`;
  const n = 9;
  const at = (t: number): [number, number] => {
    const bow = Math.sin(Math.PI * t) * 9;
    return [tip[0] + (front[0] - tip[0]) * t + bow * 0.3, tip[1] + (front[1] - tip[1]) * t + bow];
  };
  for (let i = 0; i < n; i++) {
    const a = at(i / n), b = at((i + 1) / n);
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    const nx = (dy / len) * 2.4, ny = (-dx / len) * 2.4;
    d += `C${round(a[0] + dx * 0.25 + nx)} ${round(a[1] + dy * 0.25 + ny)} ${round(a[0] + dx * 0.75 + nx)} ${round(a[1] + dy * 0.75 + ny)} ${round(b[0])} ${round(b[1])}`;
  }
  return d + 'C306 101 296 97 288 98Z';
})();

const scars: Node[] = [
  { d: 'M246 66C252 64 258 63 264 63' },
  { d: 'M252 71C257 69.6 262 69 266 69' },
  { d: 'M180 62C186 60.5 191 60 196 60.4' },
  { d: 'M112 78C117 76 121 75 126 74.6' },
];

export const whale: Creature = {
  viewBox: [-24, 0, 424, 150],
  width: 615,
  speed: [45, 60],
  period: 5.2,
  seg: 8,
  defs:
    '<linearGradient id="@skin" gradientUnits="userSpaceOnUse" x1="0" y1="44" x2="0" y2="116"><stop offset="0" stop-color="#4b6873"/><stop offset=".3" stop-color="#2a414a"/><stop offset=".7" stop-color="#1b2c33"/><stop offset="1" stop-color="#22353c"/></linearGradient>' +
    '<linearGradient id="@belly" gradientUnits="userSpaceOnUse" x1="0" y1="90" x2="0" y2="116"><stop offset="0" stop-color="#a9bfc4"/><stop offset=".5" stop-color="#d3e1e4"/><stop offset="1" stop-color="#eaf2f3"/></linearGradient>' +
    '<linearGradient id="@flipper" gradientUnits="userSpaceOnUse" x1="300" y1="100" x2="190" y2="146"><stop offset="0" stop-color="#3b555e"/><stop offset=".28" stop-color="#b4c9ce"/><stop offset="1" stop-color="#e8f1f3"/></linearGradient>',
  clips: { body: { d: BODY, rig: 'body' } },
  rigs: {
    body,
    // The long pectoral fin sweeps slowly, a little out of step with the tail.
    flipper: attach(body, [300, 101], (ph) => 5 * Math.sin(TAU * (ph + 0.3))),
  },
  nodes: [
    {
      rig: 'body',
      g: [
        // Far fluke, in its own shadow, then the near one with its serrated trailing edge.
        { d: 'M38 84.6C28 79.4 8 64 -16 54C-8 66 6 80 18 88C26 88 32 88 38 88Z', a: { fill: '#0f1c21' } },
        { d: NEAR_FLUKE, a: { fill: '@skin' } },
        { d: FLUKE_EDGES, a: { fill: 'none', ...rim } },
        // Small hooked dorsal fin on its hump.
        { d: 'M166 52C160 48 152 42 140 39C143 44 141 50 132 55Z', a: { fill: '#22363e', ...rim } },
        { d: BODY, a: { fill: '@skin' } },
        {
          a: { 'clip-path': '@body' },
          g: [
            { d: bellyEdge, a: { fill: '@belly', opacity: 0.9 } },
            { g: pleats, a: { fill: 'none', stroke: '#5f7a82', 'stroke-opacity': 0.55, 'stroke-width': 0.7 } },
            { pin: [372, 72], g: knobs, a: { fill: '#5a7781' } },
            { pin: [382, 91], g: barnacles, a: { fill: '#e8f1f2', opacity: 0.8 } },
          ],
        },
        { g: scars, a: { fill: 'none', stroke: '#cfe2e6', 'stroke-opacity': 0.22, 'stroke-width': 0.8, 'stroke-linecap': 'round' } },
        // Long, curving mouth line, upturned at the corner.
        { d: 'M395 82C382 87 362 91 338 91C331 91 327 89 325 86', a: { fill: 'none', stroke: '#0b171c', 'stroke-opacity': 0.75, 'stroke-width': 1.1, 'stroke-linecap': 'round' } },
        { d: 'M80 72C130 60 200 51 300 52', a: { fill: 'none', stroke: '#e6fbff', 'stroke-opacity': 0.16, 'stroke-width': 1.6, 'stroke-linecap': 'round' } },
        { d: OUTLINE, a: { fill: 'none', ...rim } },
        // The keel ridge along the tail stock.
        { d: 'M28 88.7C46 88.1 66 86 85 81.6', a: { fill: 'none', stroke: '#c9f6fb', 'stroke-opacity': 0.2, 'stroke-width': 1, 'stroke-linecap': 'round' } },
        { d: flipper, a: { fill: '@flipper', ...rim }, rig: 'flipper' },
        {
          pin: [318, 82],
          g: [
            { d: circle(318, 82.5, 1.7), a: { fill: '#05090b' } },
            { d: circle(318.5, 82, 0.5), a: { fill: '#e6fbff' } },
          ],
        },
      ],
    },
  ],
};

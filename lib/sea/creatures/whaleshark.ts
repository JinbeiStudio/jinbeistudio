// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature, Node } from '../engine';
import { round, seeded } from '../art';
import { circle } from '../path';
import { TAU, attach, flex, spine, upright } from '../motion';

// Whale shark from above, swimming up: the site's hero. A slow travelling wave runs from a near-still head
// down to the tail, the tail flicking a beat behind, the long pectoral fins steady with a small sway.
// The rigs are written for a body facing right (x along, y across) and turned upright.

const profile: [number, number][] = [
  [24, 0], [30, 40], [50, 52], [100, 55], [132, 50], [176, 40], [230, 28], [290, 16], [364, 5], [400, 2],
];
function halfWidth(y: number) {
  if (y <= profile[0][0]) return profile[0][1];
  for (let i = 1; i < profile.length; i++) {
    const [y1, w1] = profile[i], [y0, w0] = profile[i - 1];
    if (y <= y1) return w0 + ((y - y0) / (y1 - y0)) * (w1 - w0);
  }
  return profile[profile.length - 1][1];
}
const at = (x: number, y: number) => `${round(x)} ${round(y)}`;
// Light from the surface: markings fade toward the tail.
const light = (y: number) => {
  const t = y / 470;
  return t < 0.7 ? 0.95 - (t / 0.7) * 0.6 : 0.35 - ((t - 0.7) / 0.3) * 0.15;
};

const along = flex(
  spine({ head: -24, tail: -442, axis: 100, amp: 9, waves: 0.7, env: (s) => 0.06 + 0.94 * s ** 2 }),
  [-392, 100],
  26,
  (ph) => 14 * Math.sin(TAU * (ph - 0.25)),
);

const BODY =
  'M100 24C124 22 146 30 152 50C158 74 156 104 150 132C142 176 128 230 116 290C111 318 107 340 105 364C104 378 103 390 102 400H98C97 390 96 378 95 364C93 340 89 318 84 290C72 230 58 176 50 132C44 104 42 74 48 50C54 30 76 22 100 24Z';
const OUTLINE =
  'M98 400C97 390 96 378 95 364C93 340 89 318 84 290C72 230 58 176 50 132C44 104 42 74 48 50C54 30 76 22 100 24C124 22 146 30 152 50C158 74 156 104 150 132C142 176 128 230 116 290C111 318 107 340 105 364C104 378 103 390 102 400';
const TAIL_OUTLINE = 'M102.6 392C108 406 132 426 168 442C140 440 116 430 100 414C92 424 74 432 54 436C70 424 90 408 97.4 392';
const TAIL = `${TAIL_OUTLINE}Z`;

// Small dense spots on the head, then staggered rows of spots between faint, wavy, uneven stripes;
// the same seed and order as the site, so the pattern matches.
type Spot = { x: number; y: number; r: number };
const { spots, stripes } = (() => {
  const rand = seeded(18);
  const spots: Spot[] = [];
  for (let y = 40; y < 92; y += 6) {
    const w = halfWidth(y) - 4;
    for (let x = 100 - w; x <= 100 + w; x += 6)
      spots.push({ x: round(x + (rand() - 0.5) * 3.5), y: round(y + (rand() - 0.5) * 3.5), r: round(0.7 + rand() * 0.5, 2) });
  }
  const stripes: { y: number; bend: number }[] = [];
  let row = 0;
  for (let y = 94; y < 390; y += 11 + rand() * 5, row++) {
    stripes.push({ y: round(y), bend: round(2 + (rand() - 0.5) * 6) });
    const yc = y + 6.5;
    const w = halfWidth(yc) - 4;
    const size = 1.05 + (1 - yc / 400) * 0.6;
    for (let x = 100 - w + (row % 2 ? 4.25 : 0); x <= 100 + w; x += 8.5) {
      if (rand() < 0.1) continue;
      spots.push({ x: round(x + (rand() - 0.5) * 4), y: round(yc + (rand() - 0.5) * 4), r: round(size * (0.75 + rand() * 0.5), 2) });
    }
  }
  return { spots, stripes };
})();
const tailSpots: Spot[] = (() => {
  const rand = seeded(7);
  const out: Spot[] = [];
  for (let y = 404; y < 440; y += 8)
    for (let x = 60; x <= 164; x += 9) out.push({ x: round(x + (rand() - 0.5) * 4), y: round(y + (rand() - 0.5) * 4), r: round(0.6 + rand() * 0.3, 2) });
  return out;
})();

// Spots in a few bands of brightness, one path each, rather than one element per spot.
const BANDS = 6;
const spotBands = (list: Spot[]): Node[] =>
  Array.from({ length: BANDS }, (_, b) => {
    const d = list.filter((s) => Math.min(BANDS - 1, Math.floor((s.y / 450) * BANDS)) === b).map((s) => circle(s.x, s.y, s.r)).join('');
    return { d, a: { 'fill-opacity': round(0.85 * light(((b + 0.5) * 450) / BANDS), 3) } };
  }).filter((n) => n.d);

const stripeNodes: Node[] = stripes.map(({ y, bend }) => {
  const w = halfWidth(y);
  return { d: `M${at(100 - w, y)}C${at(100 - w / 2, y + bend)} ${at(100 + w / 2, y + 4 - bend)} ${at(100 + w, y + 1)}`, a: { 'stroke-opacity': round(0.17 * light(y), 3) } };
});

// Three ridges per side plus the midline.
const RIDGES = [0, 0.38, -0.38, 0.72, -0.72]
  .map((f) => {
    const pts: string[] = [];
    for (let y = 60; y <= 392; y += 6) pts.push(at(100 + f * halfWidth(y), y));
    return `M${pts.join('L')}`;
  })
  .join('');

const GILLS = [96, 103, 110, 117, 124]
  .map((y) => {
    const w = halfWidth(y);
    return `M${at(100 - w + 3, y)}C${at(100 - w + 5, y + 0.6)} ${at(100 - w + 7.6, y + 2.6)} ${at(100 - w + 9, y + 5)}` +
      `M${at(100 + w - 3, y)}C${at(100 + w - 5, y + 0.6)} ${at(100 + w - 7.6, y + 2.6)} ${at(100 + w - 9, y + 5)}`;
  })
  .join('');

const line = (color: string, opacity: number, width: number) => ({ fill: 'none', stroke: color, 'stroke-opacity': opacity, 'stroke-width': width, 'stroke-linecap': 'round' });

export const whaleShark: Creature = {
  viewBox: [-30, 0, 260, 470],
  width: 300,
  speed: [0, 0],
  period: 5.6,
  seg: 8,
  defs:
    '<radialGradient id="@skin" gradientUnits="userSpaceOnUse" cx="100" cy="60" r="360"><stop offset="0" stop-color="#4f8a94"/><stop offset=".22" stop-color="#1b4650"/><stop offset=".55" stop-color="#103440"/><stop offset="1" stop-color="#0f323a"/></radialGradient>',
  clips: { body: { d: BODY, rig: 'body' }, tail: { d: TAIL, rig: 'body' } },
  rigs: {
    body: upright(along),
    // Long pectoral fins, held out stiff, swaying a little against the body's turn.
    finLeft: upright(attach(along, [-138, 60], (ph) => -5 * Math.sin(TAU * (ph + 0.1)))),
    finRight: upright(attach(along, [-138, 140], (ph) => -5 * Math.sin(TAU * (ph + 0.1)))),
  },
  nodes: [
    { d: 'M58 118C32 128 4 160 -6 198C16 188 42 172 62 158Z', a: { fill: '@skin' }, rig: 'finLeft' },
    { d: 'M142 118C168 128 196 160 206 198C184 188 158 172 138 158Z', a: { fill: '@skin' }, rig: 'finRight' },
    {
      rig: 'body',
      g: [
        // Pelvic fins.
        { d: 'M112 296C126 304 134 316 134 326C124 318 116 310 110 304ZM88 296C74 304 66 316 66 326C76 318 84 310 90 304Z', a: { fill: '@skin' } },
        { d: TAIL, a: { fill: '@skin' } },
        { g: spotBands(tailSpots), a: { fill: '#e9fdff', 'clip-path': '@tail' } },
        { d: TAIL_OUTLINE, a: { fill: 'none', stroke: '#c9f6fb', 'stroke-opacity': 0.35 } },
        { d: BODY, a: { fill: '@skin' } },
        {
          a: { 'clip-path': '@body' },
          g: [
            { d: RIDGES, a: line('#bfeef4', 0.11, 1.2) },
            { g: stripeNodes, a: { fill: 'none', stroke: '#cfeff4', 'stroke-width': 0.8 } },
            { g: spotBands(spots), a: { fill: '#e9fdff' } },
            { d: GILLS, a: line('#04141a', 0.6, 1) },
            // Wide mouth just inside the snout, following its curve so it never reads as a smile.
            { d: 'M61 35C76 27 124 27 139 35', a: line('#04141a', 0.6, 1.4) },
            { d: circle(54, 45, 2.7) + circle(146, 45, 2.7), a: { fill: '#04141a' } },
            { d: circle(54.8, 44.1, 0.75) + circle(146.8, 44.1, 0.75), a: { fill: '#e6fbff' } },
          ],
        },
        { d: OUTLINE, a: { fill: 'none', stroke: '#c9f6fb', 'stroke-opacity': 0.35, 'stroke-width': 1 } },
      ],
    },
  ],
};

/**
 * Scenery the apps draw over the whale shark: light drifting down its back, clipped to the body, and pilot fish
 * travelling with it. SVG to add inside the drawing; `@body` is the drawing's own body clip.
 */
export const whaleSharkExtras =
  '<defs><radialGradient id="ws-dapple"><stop offset="0" stop-color="#e6fbff" stop-opacity=".22"/><stop offset="1" stop-color="#e6fbff" stop-opacity="0"/></radialGradient></defs>' +
  '<g clip-path="@body"><g class="ws-dapples" fill="url(#ws-dapple)">' +
  '<ellipse cx="82" cy="70" rx="24" ry="13"/><ellipse cx="120" cy="120" rx="20" ry="11"/><ellipse cx="94" cy="170" rx="16" ry="9"/></g></g>' +
  '<g fill="#cfe9ee" fill-opacity=".7">' +
  [
    { x: 50, y: 182, s: 0.85 },
    { x: 146, y: 232, s: 0.8 },
    { x: 66, y: 266, s: 0.7 },
  ]
    .map(
      (p, i) =>
        `<g class="ws-pilot" style="animation-delay:${-i * 0.9}s"><path transform="translate(${p.x} ${p.y}) scale(${p.s})" d="M0-9C2.6-5 2.6 3 0 7C-2.6 3-2.6-5 0-9ZM0 6L3 12L0 10L-3 12Z"/></g>`,
    )
    .join('') +
  '</g>';

/** Puts extras into a drawing made with the given id, resolving `@name` to its clips and gradients. */
export const withExtras = (svg: string, id: string, extras: string) =>
  svg.replace('</svg>', `${extras.replace(/@([\w-]+)/g, `url(#${id}-$1)`)}</svg>`);

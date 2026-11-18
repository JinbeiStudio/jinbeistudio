// Generated from jinbeistudio-sea by tools/sync.ts. Edit it there, not here.
import type { Creature, Rig } from '../engine';
import { rim } from '../art';
import { circle } from '../path';
import { TAU, clamp, limb, rad, spine, then } from '../motion';

// Great white, side view, facing right. It swims by sweeping its tail sideways, across the line of sight,
// so from the side the tail is seen to narrow at each end of the sweep and widen as it crosses back.

const HEAD = 199, ROOT = 40, TIP = 14, AXIS = 42;
const SWAY = 34; // sideways reach of the tail tip, in viewBox units

// Sideways offset along the body: the front third stays straight, the wave grows toward the tail.
const sway = (x: number, ph: number) => {
  const s = (HEAD - x) / (HEAD - TIP);
  const env = clamp((s - 0.3) / 0.7) ** 2;
  return SWAY * env * Math.sin(TAU * (ph - 0.55 * s));
};

// How far along the picture each body point lands once the bent body is seen from the side.
const foreshorten = new Map<number, Float64Array>();
function lengthsAt(ph: number) {
  let table = foreshorten.get(ph);
  if (table) return table;
  table = new Float64Array(HEAD + 1);
  let acc = 0;
  for (let x = HEAD; x >= 0; x--) {
    table[x] = HEAD - acc;
    const slope = sway(x - 0.5, ph) - sway(x + 0.5, ph);
    acc += x > ROOT ? Math.cos(Math.atan(slope)) : 1;
  }
  foreshorten.set(ph, table);
  return table;
}

const yaw: Rig = (x, y, ph) => {
  const table = lengthsAt(ph);
  if (x >= ROOT) {
    const i = Math.min(HEAD, Math.max(0, Math.floor(x)));
    const t = x - i;
    const at = i < HEAD ? table[i] * (1 - t) + table[i + 1] * t : table[HEAD];
    return [at, y];
  }
  // The tail fin flexes a beat behind the stalk, so it narrows more than the body does.
  const stalk = Math.atan(sway(ROOT - 0.5, ph) - sway(ROOT + 0.5, ph));
  const fin = stalk + rad(34) * Math.sin(TAU * (ph - 0.72));
  const skew = Math.tan(rad(7)) * Math.sin(TAU * (ph - 0.6));
  return [table[ROOT] - (ROOT - x) * Math.cos(fin), y + (ROOT - x) * skew];
};

// A slight rise and fall of the back half, which the sweep carries.
const pitch = spine({ head: HEAD, tail: TIP, axis: AXIS, amp: 1.4, waves: 0.5, env: (s) => clamp((s - 0.4) / 0.6) ** 2 });
const body = then(yaw, pitch);

export const shark: Creature = {
  viewBox: [0, -4, 200, 84],
  width: 260,
  speed: [18, 26],
  period: 1.3,
  seg: 6,
  defs:
    '<linearGradient id="@skin" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="56"><stop offset="0" stop-color="#7e949b"/><stop offset=".5" stop-color="#566c74"/><stop offset="1" stop-color="#3f535a"/></linearGradient>' +
    '<linearGradient id="@belly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f7f8"/><stop offset="1" stop-color="#c3d3d6"/></linearGradient>' +
    '<linearGradient id="@fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6c838a"/><stop offset="1" stop-color="#3a4d54"/></linearGradient>',
  clips: {
    body: {
      d: 'M199 39C194 32 184 27 168 24C150 21 128 21 106 23C86 25 66 30 52 35C46 37 42 38.5 37 39.5V44.5C42 45.5 46 47 52 49C70 54 96 56 124 57C150 58 168 56 182 52C192 48 196 44 199 39Z',
      rig: 'body',
    },
  },
  rigs: {
    body,
    // The pectoral fin trims a little with each beat.
    pectoral: then(limb([132, 56], 0, (ph) => 4 * Math.sin(TAU * (ph - 0.2)), () => 1), body),
  },
  nodes: [
    {
      rig: 'body',
      g: [
        { d: 'M44 38.5C34 28 22 14 14 3C18 16 22 29 26 42C22 55 18 67 15 79C23 68 34 55 44 45.5Z', a: { fill: '@skin', ...rim } },
        { d: 'M64 33L59 26L56 34Z', a: { fill: '@fin' } },
        { d: 'M64 50L58 57L55 49Z', a: { fill: '@fin' } },
        { d: 'M92 55L85 63L80 54Z', a: { fill: '@fin' } },
        // Tall first dorsal: curved leading edge, swept-back concave trailing edge, slightly rounded tip.
        { d: 'M147 23.5C141 13 131 3 120 -2C117.5 -3 115.6 -1.6 115.8 1C114.6 10 112 18 104 24.5Z', a: { fill: '@fin', ...rim } },
        {
          d: 'M199 39C194 32 184 27 168 24C150 21 128 21 106 23C86 25 66 30 52 35C46 37 42 38.5 37 39.5V44.5C42 45.5 46 47 52 49C70 54 96 56 124 57C150 58 168 56 182 52C192 48 196 44 199 39Z',
          a: { fill: '@skin' },
        },
        // White belly with the ragged grey and white boundary of a great white.
        {
          d: 'M199 40C195 42 190 44 184 45L179 44.5L173 47L166 45.5L161 48.5L152 46.8L146 50L138 48.4L129 51L121 49.6L112 52L103 50.4L93 52.4L84 50.6L74 51.6L62 50L50 47V60H200Z',
          a: { fill: '@belly', 'clip-path': '@body' },
        },
        { d: 'M140 54C132 62 120 72 106 79C114 70 122 62 128 56Z', a: { fill: '@fin', ...rim }, rig: 'pectoral' },
        {
          d: 'M37 39.5C42 38.5 46 37 52 35C66 30 86 25 106 23C128 21 150 21 168 24C184 27 194 32 199 39C196 44 192 48 182 52C168 56 150 58 124 57C96 56 70 54 52 49C46 47 42 45.5 37 44.5',
          a: { fill: 'none', ...rim },
        },
        { d: 'M58 32C90 25 140 20 186 29', a: { fill: 'none', stroke: '#e6fbff', 'stroke-opacity': 0.3, 'stroke-width': 1.2, 'stroke-linecap': 'round' } },
        // Caudal keel: the faint lateral ridge along the tail stalk.
        { d: 'M38 42C46 41.6 54 41.4 64 41.6', a: { fill: 'none', stroke: '#c9f6fb', 'stroke-opacity': 0.22, 'stroke-width': 0.9, 'stroke-linecap': 'round' } },
      ],
    },
    {
      g: [
        { d: 'M150 30C147 36 147 42 150 48M155 29C152 35 152 42 155 48M160 29C157 35 157 41 160 47M165 29C162 35 162 41 165 46M170 30C167 35 167 40 170 45' },
        { d: 'M193 45C189 47 184 48 179 48', a: { 'stroke-opacity': 0.25 } },
      ],
      a: { fill: 'none', stroke: '#2b3b41', 'stroke-opacity': 0.75, 'stroke-width': 0.9, 'stroke-linecap': 'round' },
    },
    { d: circle(182, 35, 2.1), a: { fill: '#05090b' } },
    { d: circle(182.6, 34.4, 0.55), a: { fill: '#e6fbff' } },
  ],
};

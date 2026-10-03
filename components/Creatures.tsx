import { useId } from 'react';
import { round, seeded } from '@/lib/random';

// Side and top-view illustrations, all drawn facing right; SeaLife mirrors them for leftward swims.

export type CreatureKind = 'shark' | 'turtle' | 'whale' | 'manta';

export const creatureWidth: Record<CreatureKind, number> = { shark: 240, turtle: 130, whale: 580, manta: 200 };

// Gradient ids are scoped per instance so an outgoing and incoming creature never share defs.
function useIds<T extends string>(...names: T[]) {
  const base = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return Object.fromEntries(names.map((n) => [n, `${base}-${n}`])) as Record<T, string>;
}

const rim = { stroke: 'rgb(200 240 245 / 0.28)', strokeWidth: 0.8 };
const url = (id: string) => `url(#${id})`;

function Shark() {
  const id = useIds('skin', 'fin', 'tip', 'light');
  const body =
    'M197 37C188 25 168 19 141 19L117 1L108 21C86 23 66 27 46 31V42C70 46 96 50 117 50L130 64L137 50C162 50 186 46 197 37Z';

  return (
    <svg viewBox="0 0 200 70">
      <defs>
        {/* Countershading: dark back, pale belly, the way sharks hide from above and below. */}
        <linearGradient id={id.skin} gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="52">
          <stop offset="0" stopColor="#4d7f88" />
          <stop offset=".3" stopColor="#2a5560" />
          <stop offset=".58" stopColor="#1d4048" />
          <stop offset=".68" stopColor="#7fa8ae" />
          <stop offset="1" stopColor="#c4dde0" />
        </linearGradient>
        <linearGradient id={id.fin} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#30606a" />
          <stop offset="1" stopColor="#173840" />
        </linearGradient>
        {/* Black tips, as on a blacktip reef shark. */}
        <linearGradient id={id.tip} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#081418" />
          <stop offset=".35" stopColor="#1f4850" />
          <stop offset=".65" stopColor="#1f4850" />
          <stop offset="1" stopColor="#081418" />
        </linearGradient>
        <linearGradient id={id.light} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e6fbff" stopOpacity="0" />
          <stop offset=".6" stopColor="#e6fbff" stopOpacity=".55" />
          <stop offset="1" stopColor="#e6fbff" stopOpacity=".2" />
        </linearGradient>
      </defs>

      <g className="creature-tail" style={{ transformOrigin: '46px 36px' }}>
        <path d="M50 33L18 6L29 34L15 62L50 40Z" fill={url(id.tip)} {...rim} />
      </g>
      <path d="M72 44L62 56L58 45Z" fill={url(id.fin)} />
      <path d="M70 28L62 18L58 29Z" fill={url(id.fin)} />
      <path d={body} fill={url(id.skin)} {...rim} />
      <path d="M117 1L108 21L127 20Z" fill="#0b1c21" opacity=".55" />
      <path d="M116 49L132 66L138 50Z" fill={url(id.fin)} {...rim} />
      <path d="M128 60L132 66L134 59Z" fill="#081418" />
      <path d="M54 32C90 25 140 18 186 28" fill="none" stroke={url(id.light)} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M60 37C100 34 140 33 176 34" fill="none" stroke="#c9f0f4" strokeOpacity=".18" strokeWidth=".8" />
      <g fill="none" stroke="#0a1c21" strokeOpacity=".7" strokeWidth="1" strokeLinecap="round">
        <path d="M150 29C147 35 147 41 150 46M155 28C152 34 152 41 155 46M160 28C157 34 157 40 160 45M165 28C162 34 162 40 165 44M170 29C167 34 167 39 170 43" />
        <path d="M184 44C180 46 175 46 171 45" strokeOpacity=".35" />
      </g>
      <circle cx="181" cy="31" r="2" fill="#061418" />
      <circle cx="181.6" cy="30.4" r=".6" fill="#e6fbff" />
    </svg>
  );
}

function Turtle() {
  const id = useIds('scute', 'scales');
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
  ];

  return (
    <svg viewBox="0 0 120 100">
      <defs>
        <radialGradient id={id.scute} cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#8a9a6c" />
          <stop offset=".55" stopColor="#4f6a52" />
          <stop offset="1" stopColor="#24372f" />
        </radialGradient>
        {/* Staggered pale scales over the darker skin. */}
        <pattern id={id.scales} width="6" height="5" patternUnits="userSpaceOnUse">
          <rect width="6" height="5" fill="#2c443b" />
          <g fill="#7f9a86" stroke="#1a2a24" strokeWidth=".4">
            <circle cx="1.5" cy="1.25" r="1.35" />
            <circle cx="4.5" cy="3.75" r="1.35" />
          </g>
        </pattern>
      </defs>

      <g className="creature-flipper" style={{ transformOrigin: '74px 36px' }}>
        <path d="M70 34C80 14 96 4 110 0C98 14 86 26 78 40Z" fill={url(id.scales)} {...rim} />
      </g>
      <g className="creature-flipper creature-flipper--alt" style={{ transformOrigin: '74px 64px' }}>
        <path d="M70 66C80 86 96 96 110 100C98 86 86 74 78 60Z" fill={url(id.scales)} {...rim} />
      </g>
      <path d="M34 36L16 26C20 32 24 38 30 42ZM34 64L16 74C20 68 24 62 30 58Z" fill={url(id.scales)} {...rim} />
      <path d="M84 44C90 40 102 40 108 48C110 50 110 52 108 54C102 62 90 60 84 56Z" fill={url(id.scales)} {...rim} />
      <circle cx="101" cy="45" r="1.4" fill="#0b1614" />
      <circle cx="101" cy="55" r="1.4" fill="#0b1614" />
      <ellipse cx="60" cy="50" rx="31" ry="24" fill="#1c2b25" {...rim} />
      <g fill={url(id.scute)} stroke="#d9eedd" strokeOpacity=".4" strokeWidth=".7" strokeLinejoin="round">
        {scutes.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d="M88 50L85 43L82 33C87 37 90 43 90 50C90 57 87 63 82 67L85 57Z" />
      </g>
      <ellipse cx="60" cy="50" rx="30" ry="23" fill="none" stroke="#d9eedd" strokeOpacity=".3" strokeWidth="2.2" strokeDasharray="3 2.4" />
      <ellipse cx="54" cy="40" rx="16" ry="6" fill="#e6fbff" opacity=".12" />
    </svg>
  );
}

function Whale() {
  const id = useIds('skin', 'flipper', 'fluke', 'flukeClip');
  const rand = seeded(42);
  const tubercles = Array.from({ length: 16 }, () => ({ x: round(330 + rand() * 60), y: round(58 + rand() * 18), r: round(1.2 + rand() * 1.4) }));
  const barnacles = Array.from({ length: 22 }, () => ({ x: round(352 + rand() * 30), y: round(80 + rand() * 12), r: round(0.5 + rand() * 0.9) }));
  const mottling = Array.from({ length: 22 }, () => ({ x: round(8 + rand() * 40), y: round(56 + rand() * 58), r: round(1 + rand() * 2.2) }));

  return (
    <svg viewBox="0 0 400 150">
      <defs>
        <linearGradient id={id.skin} gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="110">
          <stop offset="0" stopColor="#4a6670" />
          <stop offset=".35" stopColor="#253b44" />
          <stop offset=".72" stopColor="#1b2d35" />
          <stop offset=".86" stopColor="#7d979e" />
          <stop offset="1" stopColor="#b9cdd1" />
        </linearGradient>
        <linearGradient id={id.flipper} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d4e4e7" />
          <stop offset=".6" stopColor="#9fb7bc" />
          <stop offset="1" stopColor="#4d6870" />
        </linearGradient>
        <clipPath id={id.flukeClip}>
          <path d="M48 80L10 52C14 62 18 72 22 84C16 94 10 104 4 116L48 92Z" />
        </clipPath>
        <linearGradient id={id.fluke} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a414a" />
          <stop offset="1" stopColor="#13232a" />
        </linearGradient>
      </defs>

      <g className="creature-tail creature-tail--slow" style={{ transformOrigin: '44px 84px' }}>
        <path d="M48 80L10 52C14 62 18 72 22 84C16 94 10 104 4 116L48 92Z" fill={url(id.fluke)} {...rim} />
        <g fill="#cfe2e5" opacity=".35" clipPath={url(id.flukeClip)}>
          {mottling.map((m) => (
            <circle key={`${m.x}-${m.y}`} cx={m.x} cy={m.y} r={m.r} />
          ))}
        </g>
      </g>
      <path
        d="M394 72C384 52 336 40 282 42C222 44 160 54 110 64C86 69 64 74 44 78V94C82 98 140 106 200 108C262 110 330 106 372 96C388 92 396 82 394 72Z"
        fill={url(id.skin)}
        {...rim}
      />
      <path d="M142 58C150 54 156 48 160 44C162 50 166 54 170 56Z" fill="#1f333b" {...rim} />
      {/* Ventral throat pleats. */}
      <g fill="none" stroke="#e1eef0" strokeOpacity=".35" strokeWidth=".7">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${384 - i * 2} ${84 + i * 1.6}C${340 - i * 4} ${96 + i * 1.4} ${290 - i * 6} ${100 + i} ${236 - i * 6} ${101 + i * 0.8}`} />
        ))}
      </g>
      <path d="M60 80C120 70 220 56 330 50" fill="none" stroke="#e6fbff" strokeOpacity=".22" strokeWidth="1.6" strokeLinecap="round" />
      <g fill="#5e7a83">
        {tubercles.map((t) => (
          <circle key={`${t.x}-${t.y}`} cx={t.x} cy={t.y} r={t.r} />
        ))}
      </g>
      <g fill="#e8f1f2" opacity=".75">
        {barnacles.map((b) => (
          <circle key={`${b.x}-${b.y}`} cx={b.x} cy={b.y} r={b.r} />
        ))}
      </g>
      <path d="M300 98C292 120 264 140 232 146C236 140 240 136 246 132C242 130 250 124 256 120C252 116 262 112 266 108C264 104 272 102 276 100Z" fill={url(id.flipper)} {...rim} />
      <path d="M350 68C354 66 360 66 362 70" fill="none" stroke="#0b171c" strokeWidth="1" />
      <circle cx="356" cy="71" r="1.8" fill="#0b171c" />
      <circle cx="356.5" cy="70.5" r=".5" fill="#e6fbff" />
    </svg>
  );
}

function Manta() {
  const id = useIds('back', 'patch', 'edge');
  const wings =
    'M160 55C159 42 150 28 134 18C118 8 96 3 76 4C66 5 63 9 67 15C77 28 84 39 83 47C78 53 66 54 54 55C66 56 78 57 83 63C84 71 77 82 67 95C63 101 66 105 76 106C96 107 118 102 134 92C150 82 159 68 160 55Z';

  return (
    <svg viewBox="0 0 170 110">
      <defs>
        <radialGradient id={id.back} gradientUnits="userSpaceOnUse" cx="128" cy="55" r="90">
          <stop offset="0" stopColor="#2c4650" />
          <stop offset=".5" stopColor="#17282f" />
          <stop offset="1" stopColor="#0c171c" />
        </radialGradient>
        <linearGradient id={id.patch} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#e9f4f5" stopOpacity=".85" />
          <stop offset="1" stopColor="#e9f4f5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id.edge} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#bcd8dc" stopOpacity=".5" />
          <stop offset="1" stopColor="#bcd8dc" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d="M54 55C38 55 18 56 0 58" fill="none" stroke="#14252b" strokeWidth="2" strokeLinecap="round" />
      <g className="creature-wings">
        <path d={wings} fill={url(id.back)} {...rim} />
        {/* The white shoulder patches that identify a manta from above. */}
        <path d="M140 40C130 32 116 22 100 16C110 26 116 36 118 46C126 46 134 44 140 40Z" fill={url(id.patch)} />
        <path d="M140 70C130 78 116 88 100 94C110 84 116 74 118 64C126 64 134 66 140 70Z" fill={url(id.patch)} />
        <path d="M68 12C78 26 84 38 83 47M68 98C78 84 84 72 83 63" fill="none" stroke={url(id.edge)} strokeWidth="2" />
      </g>
      <path d="M152 55C140 50 110 50 90 54C110 58 140 60 152 55Z" fill="#33505a" opacity=".6" />
      <path d="M158 50C164 46 167 42 166 38C162 41 158 45 156 50ZM158 60C164 64 167 68 166 72C162 69 158 65 156 60Z" fill="#1d3037" {...rim} />
    </svg>
  );
}

export const creatures: Record<CreatureKind, () => React.JSX.Element> = { shark: Shark, turtle: Turtle, whale: Whale, manta: Manta };

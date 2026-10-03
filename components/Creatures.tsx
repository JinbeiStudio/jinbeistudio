import { useId } from 'react';
import { round, seeded } from '@/lib/random';

// Side and top-view illustrations, all drawn facing right; SeaLife mirrors them for leftward swims.

export type CreatureKind = 'shark' | 'blacktip' | 'turtle' | 'whale' | 'manta' | 'orca' | 'jellyfish';

export const creatureWidth: Record<CreatureKind, number> = { shark: 260, blacktip: 240, turtle: 130, whale: 580, manta: 200, orca: 330, jellyfish: 120 };

// Height / width of each viewBox, so SeaLife can centre an animal on its spot instead of hanging it from its top edge.
export const creatureAspect: Record<CreatureKind, number> = { shark: 80 / 200, blacktip: 70 / 200, turtle: 100 / 120, whale: 150 / 400, manta: 110 / 170, orca: 110 / 300, jellyfish: 230 / 120 };

// Gradient ids are scoped per instance so an outgoing and incoming creature never share defs.
function useIds<T extends string>(...names: T[]) {
  const base = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return Object.fromEntries(names.map((n) => [n, `${base}-${n}`])) as Record<T, string>;
}

const rim = { stroke: 'rgb(200 240 245 / 0.28)', strokeWidth: 0.8 };
const url = (id: string) => `url(#${id})`;

// Great white: stocky body, conical snout, tall dorsal, near-symmetric crescent tail, jagged countershading.
function Shark() {
  const id = useIds('skin', 'belly', 'fin', 'clip');
  const body =
    'M199 39C194 32 184 27 168 24C150 21 128 21 106 23C86 25 68 30 54 35L44 38V46C58 50 76 54 98 56C124 58 150 58 170 55C186 52 194 46 199 39Z';

  return (
    <svg viewBox="0 0 200 80">
      <defs>
        <linearGradient id={id.skin} gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="56">
          <stop offset="0" stopColor="#7e949b" />
          <stop offset=".5" stopColor="#566c74" />
          <stop offset="1" stopColor="#3f535a" />
        </linearGradient>
        <linearGradient id={id.belly} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f7f8" />
          <stop offset="1" stopColor="#c3d3d6" />
        </linearGradient>
        <linearGradient id={id.fin} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c838a" />
          <stop offset="1" stopColor="#3a4d54" />
        </linearGradient>
        <clipPath id={id.clip}>
          <path d={body} />
        </clipPath>
      </defs>

      <g className="creature-tail" style={{ transformOrigin: '46px 42px' }}>
        <path d="M50 36L20 4C24 17 28 30 31 42C28 54 24 66 21 78L50 48Z" fill={url(id.fin)} {...rim} />
      </g>
      <path d="M64 33L59 26L56 34Z" fill={url(id.fin)} />
      <path d="M64 50L58 57L55 49Z" fill={url(id.fin)} />
      <path d="M92 55L85 63L80 54Z" fill={url(id.fin)} />
      {/* Tall triangular first dorsal, slightly swept back. */}
      <path d="M106 24C111 15 116 7 121 0C126 10 133 18 147 23Z" fill={url(id.fin)} {...rim} />
      <path d={body} fill={url(id.skin)} {...rim} />
      {/* White belly with the ragged grey/white boundary of a great white. */}
      <path
        clipPath={url(id.clip)}
        d="M199 40C195 42 190 44 184 45L179 44.5L173 47L166 45.5L161 48.5L152 46.8L146 50L138 48.4L129 51L121 49.6L112 52L103 50.4L93 52.4L84 50.6L74 51.6L62 50L50 47V60H200Z"
        fill={url(id.belly)}
      />
      <path d="M140 54C132 62 120 72 106 79C114 70 122 62 128 56Z" fill={url(id.fin)} {...rim} />
      <path d="M58 32C90 25 140 20 186 29" fill="none" stroke="#e6fbff" strokeOpacity=".3" strokeWidth="1.2" strokeLinecap="round" />
      <g fill="none" stroke="#2b3b41" strokeOpacity=".75" strokeWidth=".9" strokeLinecap="round">
        <path d="M150 30C147 36 147 42 150 48M155 29C152 35 152 42 155 48M160 29C157 35 157 41 160 47M165 29C162 35 162 41 165 46M170 30C167 35 167 40 170 45" />
        <path d="M193 45C189 47 184 48 179 48" strokeOpacity=".25" />
      </g>
      <circle cx="182" cy="35" r="2.1" fill="#05090b" />
      <circle cx="182.6" cy="34.4" r=".55" fill="#e6fbff" />
    </svg>
  );
}

// Blacktip reef shark: kept as an alternative to the great white; not assigned to a section.
function BlacktipShark() {
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

function Orca() {
  const id = useIds('skin', 'white', 'fin');
  const body =
    'M292 60C286 45 262 34 230 32C190 30 140 36 100 44C80 48 62 53 48 57V67C70 73 100 79 140 81C190 83 240 81 268 75C284 71 294 66 292 60Z';

  return (
    <svg viewBox="0 0 300 110">
      <defs>
        <linearGradient id={id.skin} gradientUnits="userSpaceOnUse" x1="0" y1="30" x2="0" y2="82">
          <stop offset="0" stopColor="#2a3a41" />
          <stop offset=".45" stopColor="#111c21" />
          <stop offset="1" stopColor="#0a1317" />
        </linearGradient>
        <linearGradient id={id.white} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1f8f9" />
          <stop offset="1" stopColor="#b9cdd1" />
        </linearGradient>
        <linearGradient id={id.fin} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24343b" />
          <stop offset="1" stopColor="#0c1519" />
        </linearGradient>
      </defs>

      <g className="creature-tail" style={{ transformOrigin: '50px 62px' }}>
        <path d="M54 57L14 36C18 46 22 55 27 62C22 69 18 78 14 88L54 67Z" fill={url(id.fin)} {...rim} />
      </g>
      {/* Tall, slightly swept-back dorsal fin. */}
      <path d="M146 39C150 26 147 12 139 2C156 10 172 24 188 37Z" fill={url(id.fin)} {...rim} />
      <path d={body} fill={url(id.skin)} {...rim} />
      {/* Grey saddle patch behind the dorsal fin. */}
      <path d="M196 38C182 45 160 47 132 44C146 37 172 34 196 38Z" fill="#8fa3a8" opacity=".45" />
      {/* White belly sweeping up into the flank patch near the tail. */}
      <path d="M272 71C244 79 200 81 160 80C130 79 104 76 84 69C96 64 108 64 118 70C136 73 170 72 200 70C230 68 256 67 272 71Z" fill={url(id.white)} />
      {/* White eye patch, just above and behind the eye. */}
      <ellipse cx="248" cy="47" rx="13" ry="5" transform="rotate(-8 248 47)" fill={url(id.white)} />
      <path d="M232 72C229 85 221 97 209 101C203 99 207 87 218 74Z" fill={url(id.fin)} {...rim} />
      <path d="M100 47C150 38 210 34 262 38" fill="none" stroke="#e6fbff" strokeOpacity=".18" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="263" cy="53" r="1.6" fill="#05090b" />
      <circle cx="263.5" cy="52.5" r=".45" fill="#e6fbff" />
    </svg>
  );
}

function Jellyfish() {
  const id = useIds('bell', 'glow', 'arm');
  const tentacles = [26, 36, 46, 74, 84, 94];

  return (
    <svg viewBox="0 0 120 230">
      <defs>
        <radialGradient id={id.bell} cx=".5" cy=".35" r=".7">
          <stop offset="0" stopColor="#d9f7ff" stopOpacity=".75" />
          <stop offset=".55" stopColor="#7fdcef" stopOpacity=".35" />
          <stop offset="1" stopColor="#5a8de0" stopOpacity=".12" />
        </radialGradient>
        <radialGradient id={id.glow} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#f2e6ff" stopOpacity=".9" />
          <stop offset="1" stopColor="#b9a4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.arm} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdefff" stopOpacity=".7" />
          <stop offset="1" stopColor="#bdefff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Leans into its direction of travel; SeaLife mirrors it for leftward drifts. */}
      <g transform="rotate(14 60 60)">
        <g className="jelly-trail">
          {tentacles.map((x, i) => (
            <path
              key={x}
              d={`M${x} 62C${x + (i % 2 ? 8 : -8)} 100 ${x + (i % 2 ? -6 : 6)} 150 ${x + (i % 2 ? 4 : -4)} 225`}
              fill="none"
              stroke="#a8e6f5"
              strokeOpacity=".35"
              strokeWidth=".8"
            />
          ))}
          <path d="M52 64C42 90 62 112 50 140C44 156 56 170 50 186" fill="none" stroke={url(id.arm)} strokeWidth="5" strokeLinecap="round" />
          <path d="M60 64C70 92 52 116 64 146C70 162 58 178 64 196" fill="none" stroke={url(id.arm)} strokeWidth="6" strokeLinecap="round" />
          <path d="M68 64C78 88 66 110 74 134C78 148 70 160 74 172" fill="none" stroke={url(id.arm)} strokeWidth="4" strokeLinecap="round" />
        </g>
        <g className="jelly-bell">
          <path
            d="M18 62C18 26 38 8 60 8C82 8 102 26 102 62C95 68 88 63 81 67C75 63 68 68 60 65C52 68 45 63 39 67C32 63 25 68 18 62Z"
            fill={url(id.bell)}
            stroke="#c9f6fb"
            strokeOpacity=".5"
            strokeWidth=".8"
          />
          <ellipse cx="60" cy="38" rx="22" ry="16" fill={url(id.glow)} />
          <g fill="none" stroke="#e9dcff" strokeOpacity=".55" strokeWidth="1.4">
            <circle cx="52" cy="36" r="5" />
            <circle cx="68" cy="36" r="5" />
            <circle cx="56" cy="46" r="4.5" />
            <circle cx="64" cy="46" r="4.5" />
          </g>
          <g className="jelly-lights" fill="#e6fbff">
            {[22, 34, 47, 60, 73, 86, 98].map((x) => (
              <circle key={x} cx={x} cy={x === 60 ? 65 : 64} r="1.3" />
            ))}
          </g>
        </g>
      </g>
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

export const creatures: Record<CreatureKind, () => React.JSX.Element> = { shark: Shark, blacktip: BlacktipShark, turtle: Turtle, whale: Whale, manta: Manta, orca: Orca, jellyfish: Jellyfish };

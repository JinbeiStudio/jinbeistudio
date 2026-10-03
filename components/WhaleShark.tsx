import { round, seeded } from '@/lib/random';

// Half-width of the original body outline at a given y, used to scatter the markings.
const profile: [number, number][] = [
  [24, 0], [30, 40], [50, 52], [100, 55], [132, 50], [176, 40], [230, 28], [290, 16], [364, 5], [400, 2],
];

// The original smooth outline (rounded head, long taper into the tail stalk).
const body =
  'M100 24C124 22 146 30 152 50C158 74 156 104 150 132C142 176 128 230 116 290C111 318 107 340 105 364C104 378 103 390 102 400H98C97 390 96 378 95 364C93 340 89 318 84 290C72 230 58 176 50 132C44 104 42 74 48 50C54 30 76 22 100 24Z';
const outline =
  'M98 400C97 390 96 378 95 364C93 340 89 318 84 290C72 230 58 176 50 132C44 104 42 74 48 50C54 30 76 22 100 24C124 22 146 30 152 50C158 74 156 104 150 132C142 176 128 230 116 290C111 318 107 340 105 364C104 378 103 390 102 400';

function halfWidth(y: number) {
  if (y <= profile[0][0]) return profile[0][1];
  for (let i = 1; i < profile.length; i++) {
    const [y1, w1] = profile[i];
    const [y0, w0] = profile[i - 1];
    if (y <= y1) return w0 + ((y - y0) / (y1 - y0)) * (w1 - w0);
  }
  return profile[profile.length - 1][1];
}

const at = (x: number, y: number) => `${round(x)} ${round(y)}`;

// Light from the surface: markings fade toward the tail. Baked per element because an SVG mask
// made WebKit repaint slowly while scrolling (45 fps vs 60 without it).
function light(y: number) {
  const t = y / 470;
  return round(t < 0.7 ? 0.95 - (t / 0.7) * 0.6 : 0.35 - ((t - 0.7) / 0.3) * 0.15, 2);
}

// The body is three horizontal bands of the same outline that bend at their joints, so the whole shark
// undulates rather than just the tail. Each band reaches under the one in front, so joints never open.
type Segment = { name: 'front' | 'mid' | 'rear'; from: number; to: number };
const OVERLAP = 10;
const segments: Segment[] = [
  { name: 'front', from: 0, to: 200 },
  { name: 'mid', from: 200, to: 300 },
  { name: 'rear', from: 300, to: 402 },
];

const bandRect = ({ name, from, to }: Segment) => ({
  x: -30,
  y: name === 'front' ? from : from - OVERLAP,
  width: 260,
  height: to - from + (name === 'front' ? 0 : OVERLAP) + (name === 'rear' ? 10 : 0),
});

const inSegment = (y: number, s: Segment) => y >= s.from && (y < s.to || s.name === 'rear');

type Spot = { x: number; y: number; r: number };

// Whale shark pattern: small dense spots on the head, then staggered rows of spots between faint, wavy,
// unevenly spaced transverse stripes. Irregularity matters: a clean grid reads as graph paper.
type Stripe = { y: number; bend: number };

function pattern() {
  const rand = seeded(18);
  const spots: Spot[] = [];
  // Head spots start behind the mouth line so it stays readable.
  for (let y = 40; y < 92; y += 6) {
    const w = halfWidth(y) - 4;
    for (let x = 100 - w; x <= 100 + w; x += 6) {
      spots.push({ x: round(x + (rand() - 0.5) * 3.5), y: round(y + (rand() - 0.5) * 3.5), r: round(0.7 + rand() * 0.5, 2) });
    }
  }
  const stripes: Stripe[] = [];
  let row = 0;
  for (let y = 94; y < 390; y += 11 + rand() * 5, row++) {
    stripes.push({ y: round(y), bend: round(2 + (rand() - 0.5) * 6) });
    const yc = y + 6.5;
    const w = halfWidth(yc) - 4;
    const size = 1.05 + (1 - yc / 400) * 0.6;
    const offset = row % 2 ? 4.25 : 0;
    for (let x = 100 - w + offset; x <= 100 + w; x += 8.5) {
      if (rand() < 0.1) continue;
      spots.push({ x: round(x + (rand() - 0.5) * 4), y: round(yc + (rand() - 0.5) * 4), r: round(size * (0.75 + rand() * 0.5), 2) });
    }
  }
  return { spots, stripes };
}

const { spots, stripes } = pattern();

// Three ridges per side plus the dorsal midline, drawn per segment so they bend with it.
function ridges(s: Segment) {
  const from = Math.max(s.from, 60);
  const to = Math.min(s.to, 392);
  if (from >= to) return '';
  return [0, 0.38, -0.38, 0.72, -0.72]
    .map((f) => {
      const points: string[] = [];
      for (let y = from; y <= to; y += 6) points.push(at(100 + f * halfWidth(y), y));
      return `M${points.join('L')}`;
    })
    .join('');
}

// Five gill slits on each side, just behind the head.
const gills = [96, 103, 110, 117, 124]
  .map((y) => {
    const w = halfWidth(y);
    return `M${at(100 - w + 3, y)}q4 1 6 5M${at(100 + w - 3, y)}q-4 1 -6 5`;
  })
  .join('');

// Pilot fish that travel with it, pointing in its direction of travel (up).
const pilots = [
  { x: 50, y: 182, s: 0.85 },
  { x: 146, y: 232, s: 0.8 },
  { x: 66, y: 266, s: 0.7 },
];

function SegmentBody({ segment }: { segment: Segment }) {
  const band = `ws-band-${segment.name}`;
  return (
    <>
      <defs>
        <clipPath id={band}>
          <rect {...bandRect(segment)} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${band})`}>
        <path d={body} fill="url(#ws-skin)" />
        <g clipPath="url(#ws-body)">
          <path d={ridges(segment)} fill="none" stroke="#bfeef4" strokeOpacity=".11" strokeWidth="1.2" strokeLinecap="round" />
          <g fill="none" stroke="#cfeff4" strokeWidth=".8">
            {stripes
              .filter(({ y }) => inSegment(y, segment))
              .map(({ y, bend }) => {
                const w = halfWidth(y);
                return (
                  <path
                    key={y}
                    strokeOpacity={round(0.17 * light(y), 3)}
                    d={`M${at(100 - w, y)}C${at(100 - w / 2, y + bend)} ${at(100 + w / 2, y + 4 - bend)} ${at(100 + w, y + 1)}`}
                  />
                );
              })}
          </g>
          <g className="shark-spots" fill="#e9fdff">
            {spots
              .filter((s) => inSegment(s.y, segment))
              .map((s) => (
                <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={s.r} fillOpacity={round(0.85 * light(s.y), 3)} />
              ))}
          </g>
          {segment.name === 'front' && (
            <>
              <path d={gills} fill="none" stroke="#04141a" strokeOpacity=".6" strokeWidth="1" strokeLinecap="round" />
              {/* Wide mouth just inside the snout, following its curve so it never reads as a smile. */}
              <path d="M61 35C76 27 124 27 139 35" fill="none" stroke="#04141a" strokeOpacity=".6" strokeWidth="1.4" strokeLinecap="round" />
              {/* Small eyes on the sides of the head, near the front. */}
              <g>
                <circle cx="54" cy="45" r="2.7" fill="#04141a" />
                <circle cx="146" cy="45" r="2.7" fill="#04141a" />
                <circle cx="54.8" cy="44.1" r=".75" fill="#e6fbff" />
                <circle cx="146.8" cy="44.1" r=".75" fill="#e6fbff" />
              </g>
              <g className="ws-dapples" fill="url(#ws-dapple)">
                <ellipse cx="82" cy="70" rx="24" ry="13" />
                <ellipse cx="120" cy="120" rx="20" ry="11" />
                <ellipse cx="94" cy="170" rx="16" ry="9" />
              </g>
            </>
          )}
        </g>
        <path d={outline} fill="none" stroke="#c9f6fb" strokeOpacity=".35" strokeWidth="1" />
      </g>
    </>
  );
}

const [front, mid, rear] = segments;

export default function WhaleShark({ className = '' }: { className?: string }) {
  return (
    <svg className={`shark ${className}`} viewBox="-30 0 260 470" aria-hidden="true">
      <defs>
        {/* User-space gradient: every segment shares one continuous light falloff from the head down. */}
        <radialGradient id="ws-skin" gradientUnits="userSpaceOnUse" cx="100" cy="60" r="360">
          <stop offset="0" stopColor="#4f8a94" />
          <stop offset=".22" stopColor="#1b4650" />
          <stop offset=".55" stopColor="#0c2a32" />
          <stop offset="1" stopColor="#071c22" />
        </radialGradient>
        <clipPath id="ws-body">
          <path d={body} />
        </clipPath>
        <radialGradient id="ws-dapple">
          <stop offset="0" stopColor="#e6fbff" stopOpacity=".22" />
          <stop offset="1" stopColor="#e6fbff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="ws-swim">
        <g className="shark-fin shark-fin--left">
          <path d="M58 118C32 128 4 160-6 198C16 188 42 172 62 158Z" fill="url(#ws-skin)" />
        </g>
        <g className="shark-fin shark-fin--right">
          <path d="M142 118C168 128 196 160 206 198C184 188 158 172 138 158Z" fill="url(#ws-skin)" />
        </g>

        <g className="ws-mid">
          <g className="ws-rear">
            <path d="M112 296C126 304 134 316 134 326C124 318 116 310 110 304ZM88 296C74 304 66 316 66 326C76 318 84 310 90 304Z" fill="url(#ws-skin)" />
            <g className="shark-tail">
              <path
                d="M96 394H104C120 412 142 428 168 442C140 440 116 430 102 414C92 424 74 432 54 436C70 424 86 408 96 394Z"
                fill="url(#ws-skin)"
                stroke="#c9f6fb"
                strokeOpacity=".35"
              />
            </g>
            <SegmentBody segment={rear} />
          </g>
          <SegmentBody segment={mid} />
        </g>

        <SegmentBody segment={front} />

        <g fill="#cfe9ee" fillOpacity=".7">
          {pilots.map((p, i) => (
            <g key={i} className="ws-pilot" style={{ animationDelay: `${-i * 0.9}s` }}>
              <path
                transform={`translate(${p.x} ${p.y}) scale(${p.s})`}
                d="M0-9C2.6-5 2.6 3 0 7C-2.6 3-2.6-5 0-9ZM0 6L3 12L0 10L-3 12Z"
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

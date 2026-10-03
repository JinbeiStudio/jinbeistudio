import { round, seeded } from '@/lib/random';

// Half-width of the body (top-down view) at a given y, used to scatter spots.
const profile: [number, number][] = [
  [24, 0], [30, 40], [50, 52], [100, 55], [132, 50], [176, 40], [230, 28], [290, 16], [364, 5], [400, 2],
];

function halfWidth(y: number) {
  for (let i = 1; i < profile.length; i++) {
    const [y1, w1] = profile[i];
    const [y0, w0] = profile[i - 1];
    if (y <= y1) return w0 + ((y - y0) / (y1 - y0)) * (w1 - w0);
  }
  return 0;
}

type Spot = { x: number; y: number; r: number };

function scatter(seed: number, yFrom: number, yTo: number, span: (y: number) => [number, number], size: (y: number) => number) {
  const rand = seeded(seed);
  const out: Spot[] = [];
  for (let y = yFrom; y < yTo; y += 9) {
    const [from, to] = span(y);
    for (let x = from; x <= to; x += 9) {
      out.push({ x: round(x + (rand() - 0.5) * 5), y: round(y + (rand() - 0.5) * 5), r: round(size(y) + rand() * 0.6, 2) });
    }
  }
  return out;
}

const bodySpots = scatter(
  18,
  34,
  398,
  (y) => [100 - Math.max(halfWidth(y) - 3, 0), 100 + Math.max(halfWidth(y) - 3, 0)],
  (y) => (y < 200 ? 1.05 : y < 340 ? 0.8 : 0.6),
);
// Clipped to the fin shape, so a loose bounding box is enough.
const tailSpots = scatter(7, 404, 444, () => [52, 170], () => 0.6);

// The body runs all the way to the tail fork; only the fin lobes move.
const body =
  'M100 24C124 22 146 30 152 50C158 74 156 104 150 132C142 176 128 230 116 290C111 318 107 340 105 364C104 378 103 390 102 400H98C97 390 96 378 95 364C93 340 89 318 84 290C72 230 58 176 50 132C44 104 42 74 48 50C54 30 76 22 100 24Z';

// Outline without the bottom edge, so body and tail read as one continuous shape.
const outline =
  'M98 400C97 390 96 378 95 364C93 340 89 318 84 290C72 230 58 176 50 132C44 104 42 74 48 50C54 30 76 22 100 24C124 22 146 30 152 50C158 74 156 104 150 132C142 176 128 230 116 290C111 318 107 340 105 364C104 378 103 390 102 400';

const tail = 'M96 394H104C120 412 142 428 168 442C140 440 116 430 102 414C92 424 74 432 54 436C70 424 86 408 96 394Z';

export default function WhaleShark({ className = '' }: { className?: string }) {
  return (
    <svg className={`shark ${className}`} viewBox="-30 0 260 470" aria-hidden="true">
      <defs>
        {/* User-space gradient: body, fins and tail share one continuous light falloff. */}
        <radialGradient id="shark-skin" gradientUnits="userSpaceOnUse" cx="100" cy="60" r="360">
          <stop offset="0" stopColor="#4f8a94" />
          <stop offset=".22" stopColor="#1b4650" />
          <stop offset=".55" stopColor="#0c2a32" />
          <stop offset="1" stopColor="#071c22" />
        </radialGradient>
        <linearGradient id="shark-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".7" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity=".2" />
        </linearGradient>
        <mask id="shark-spot-mask" maskUnits="userSpaceOnUse" x="-30" y="0" width="260" height="470">
          <rect x="-30" y="0" width="260" height="470" fill="url(#shark-light)" />
        </mask>
        <clipPath id="shark-body">
          <path d={body} />
        </clipPath>
        <clipPath id="shark-tail">
          <path d={tail} />
        </clipPath>
      </defs>

      <g className="shark-fin shark-fin--left">
        <path d="M58 118C32 128 4 160-6 198C16 188 42 172 62 158Z" fill="url(#shark-skin)" />
      </g>
      <g className="shark-fin shark-fin--right">
        <path d="M142 118C168 128 196 160 206 198C184 188 158 172 138 158Z" fill="url(#shark-skin)" />
      </g>
      <path d="M112 296C126 304 134 316 134 326C124 318 116 310 110 304ZM88 296C74 304 66 316 66 326C76 318 84 310 90 304Z" fill="url(#shark-skin)" />

      <g className="shark-tail">
        <path d={tail} fill="url(#shark-skin)" stroke="#c9f6fb" strokeOpacity=".35" strokeWidth="1" />
        <g clipPath="url(#shark-tail)" fill="#e9fdff" fillOpacity=".85" mask="url(#shark-spot-mask)">
          {tailSpots.map((s) => (
            <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
      </g>

      <path d={body} fill="url(#shark-skin)" />
      <g clipPath="url(#shark-body)">
        <g fill="none" stroke="#bfeef4" strokeOpacity=".22" strokeWidth="1.4" strokeLinecap="round">
          <path d="M100 64C100 160 101 260 100 398" />
          <path d="M80 82C82 180 90 270 97 380" />
          <path d="M120 82C118 180 110 270 103 380" />
          <path d="M60 104C62 110 62 118 60 124M57 112C59 118 59 126 57 132M140 104C138 110 138 118 140 124M143 112C141 118 141 126 143 132" />
        </g>
        <g className="shark-spots" fill="#e9fdff" fillOpacity=".85" mask="url(#shark-spot-mask)">
          {bodySpots.map((s) => (
            <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
      </g>
      <path d={outline} fill="none" stroke="#c9f6fb" strokeOpacity=".35" strokeWidth="1" />
    </svg>
  );
}

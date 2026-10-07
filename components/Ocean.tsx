import { round, seeded } from '@/lib/random';
import DepthValue from './DepthValue';

// Each layer is one element whose box-shadows are the particles, duplicated
// 100vh lower so the upward drift loops seamlessly.
function snow(seed: number, count: number, size: number, alpha: number) {
  const rand = seeded(seed);
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = round(rand() * 100, 2);
    const y = round(rand() * 100, 2);
    const a = round(alpha * (0.4 + rand() * 0.6), 2);
    const color = `rgba(200,245,250,${a})`;
    shadows.push(`${x}vw ${y}vh ${size}px ${color}`, `${x}vw ${y + 100}vh ${size}px ${color}`);
  }
  return shadows.join(',');
}

const layers = [
  { className: 'snow snow--far', shadow: snow(1, 140, 1, 0.55) },
  { className: 'snow snow--mid', shadow: snow(2, 70, 2.5, 0.6) },
  { className: 'snow snow--near', shadow: snow(3, 24, 4, 0.5) },
];

export default function Ocean({ depthLabel }: { depthLabel: string }) {
  return (
    <>
      <div className="ocean" aria-hidden="true">
        <div className="ocean__abyss" />
        {layers.map((l) => (
          <div key={l.className} className={l.className} style={{ boxShadow: l.shadow }} />
        ))}
      </div>
      {/* iOS Safari tints its status bar from a fixed strip at the top edge. */}
      <div className="status-tint" aria-hidden="true" />
      <div className="depth" aria-hidden="true">
        <span className="depth__label">{depthLabel}</span>
        <div className="depth__track">
          <div className="depth__fill" />
          {[0, 40, 80, 120, 160, 200].map((m) => (
            <span key={m} className="depth__tick" style={{ '--at': m / 200 } as React.CSSProperties}>
              {m}
            </span>
          ))}
        </div>
        <DepthValue />
      </div>
    </>
  );
}

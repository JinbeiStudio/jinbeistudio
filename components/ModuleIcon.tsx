export type ModuleIconName =
  | 'foundation'
  | 'risks'
  | 'events'
  | 'skills'
  | 'audits'
  | 'radiation'
  | 'folder'
  | 'users'
  | 'clipboard'
  | 'lock'
  | 'leave'
  | 'approve'
  | 'calendar'
  | 'filter';

// One trefoil blade: a 60° ring sector between two radii, centred on `angle`.
function blade(angle: number, inner = 3.2, outer = 9) {
  const point = (r: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(12 + r * Math.cos(rad)).toFixed(2)} ${(12 + r * Math.sin(rad)).toFixed(2)}`;
  };
  const a = angle - 30;
  const b = angle + 30;
  return `M${point(inner, a)}L${point(outer, a)}A${outer} ${outer} 0 0 1 ${point(outer, b)}L${point(inner, b)}A${inner} ${inner} 0 0 0 ${point(inner, a)}Z`;
}

const icons: Record<ModuleIconName, React.ReactNode> = {
  foundation: <path d="M12 3 21 8 12 13 3 8ZM3 12l9 5 9-5M3 16l9 5 9-5" />,
  risks: <path d="M12 3 19 6v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6ZM9 12l2 2 4-4" />,
  events: <path d="M12 3 22 20H2ZM12 10v4M12 17v.5" />,
  skills: (
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3 20c0-4 3-6 7-6s7 2 7 6M19 3v5M16.5 5.5h5" />
    </>
  ),
  audits: <path d="M4 20h16M7 16v-5M12 16V6M17 16V9" />,
  folder: <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5ZM3 10h18" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5M16 5.5a3 3 0 0 1 0 5.5M18 14c1.9.6 3 2.2 3 5" />
    </>
  ),
  clipboard: <path d="M9 4h6v3H9ZM9 5.5H6.5A1.5 1.5 0 0 0 5 7v12.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H15M8.5 12h7M8.5 16h5" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5" />
    </>
  ),
  leave: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  approve: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.8 2.8L16.5 9.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4M7.5 14h2M11 14h2M14.5 14h2M7.5 17h2M11 17h2" />
    </>
  ),
  filter: <path d="M4 5h16l-6.2 7.5V19l-3.6 1.5v-8Z" />,
  radiation: (
    <g fill="currentColor" stroke="none">
      <circle cx="12" cy="12" r="1.8" />
      {[-90, 30, 150].map((a) => (
        <path key={a} d={blade(a)} />
      ))}
    </g>
  ),
};

export default function ModuleIcon({ name }: { name: ModuleIconName }) {
  return (
    <svg className="project__module-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

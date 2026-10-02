import Image from 'next/image';
import type { Dictionary } from '@/lib/content';

export default function Header({ nav }: { nav: Dictionary['nav'] }) {
  const links = [
    { href: '#about', label: nav.about },
    { href: '#experience', label: nav.experience },
    { href: '#work', label: nav.work },
    { href: '#contact', label: nav.contact },
  ];

  return (
    <header className="site-header">
      <a href="#top" className="site-header__brand">
        <Image src="/logo-mark.webp" alt="" width={44} height={45} preload />
        <span>Julien Gabriel</span>
      </a>
      <nav aria-label={nav.label}>
        <ul className="site-header__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Plain anchor: the locales are separate root layouts, so this is a full document navigation. */}
      <a className="lang-switch" href={nav.switchHref} hrefLang={nav.switchLang} lang={nav.switchLang}>
        {nav.switchLang.toUpperCase()}
        <span className="sr-only"> — {nav.switchLabel}</span>
      </a>
    </header>
  );
}

import Image from 'next/image';
import type { Dictionary } from '@/lib/content';
import MobileMenu from './MobileMenu';

type Depths = { about: string; experience: string; work: string; contact: string };

export default function Header({ nav, depths }: { nav: Dictionary['nav']; depths: Depths }) {
  const links = [
    { href: '#about', label: nav.about, depth: depths.about },
    { href: '#experience', label: nav.experience, depth: depths.experience },
    { href: '#work', label: nav.work, depth: depths.work },
    { href: '#contact', label: nav.contact, depth: depths.contact },
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
      <MobileMenu links={links} openLabel={nav.menuOpen} closeLabel={nav.menuClose} />
    </header>
  );
}

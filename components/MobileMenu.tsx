'use client';

import { useEffect, useRef, useState } from 'react';

type MenuLink = { href: string; label: string; depth: string };

// Full-screen "dive" menu for phones: each section is listed at its depth.
export default function MobileMenu({ links, openLabel, closeLabel }: { links: MenuLink[]; openLabel: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    // Wait a frame: the panel must be visible before its first link can take focus.
    const focusFrame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Keep focus cycling between the toggle and the menu links while open.
      if (e.key !== 'Tab') return;
      const focusables = [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      root.style.overflow = '';
      removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Scrolling is locked while open, so close first and then jump to the section.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      document.documentElement.style.overflow = '';
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div ref={panelRef} id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} inert={!open}>
        <nav aria-label={openLabel}>
          <ol className="mobile-menu__list">
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i } as React.CSSProperties}>
                <a className="mobile-menu__link" href={l.href} onClick={(e) => go(e, l.href)}>
                  <span className="mobile-menu__depth">−{l.depth} m</span>
                  <span className="mobile-menu__label">{l.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}

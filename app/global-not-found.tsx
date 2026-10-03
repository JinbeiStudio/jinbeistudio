import type { Metadata } from 'next';
import Link from 'next/link';
import RootDocument from '@/components/RootDocument';

// The site has one root layout per language, so a single 404 is defined here (bilingual).
export const metadata: Metadata = {
  title: 'Lost at sea — Julien Gabriel',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <div className="ocean" aria-hidden="true" />
      <main className="lost">
        <p className="eyebrow">
          <span className="eyebrow__depth">−404 m</span>
          <span className="eyebrow__line" aria-hidden="true" />
          Lost at sea
        </p>
        <h1>This page sank to the bottom of the ocean.</h1>
        <p lang="fr">Cette page a coulé au fond de l’océan.</p>
        <div className="hero__actions">
          <Link className="btn btn--primary" href="/">
            Back to the surface
          </Link>
          <Link className="btn btn--ghost" href="/fr/" lang="fr">
            Retour à la surface
          </Link>
        </div>
      </main>
    </RootDocument>
  );
}

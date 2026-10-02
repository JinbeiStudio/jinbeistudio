import type { Dictionary } from '@/lib/content';

export default function Footer({ footer }: { footer: Dictionary['footer'] }) {
  return (
    <footer className="site-footer">
      <div className="seigaiha" aria-hidden="true" />
      <div className="site-footer__inner">
        <p>© {new Date().getFullYear()} Julien Gabriel · Jinbei Studio</p>
        <p>
          {footer.built}{' '}
          <a href="https://github.com/jinbeistudio/jinbeistudio" target="_blank" rel="noopener noreferrer">
            {footer.source}
          </a>
        </p>
      </div>
    </footer>
  );
}

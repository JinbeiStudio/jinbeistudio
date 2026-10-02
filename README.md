# jinbeistudio.com

Portfolio of Julien Gabriel, Senior Software Engineer.

- Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 4
- Animations are CSS-first (keyframes, `@property`, SVG, view-timeline reveals); one small scroll listener feeds the depth meter and darkening water, a canvas boids simulation draws the fish school
- English at `/`, French at `/fr/`; all copy lives in `lib/content.ts`

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

Deployed to GitHub Pages by GitHub Actions on every push to `main`.

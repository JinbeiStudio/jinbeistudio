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

## CI/CD

- **Pull requests** (`ci.yml`): lint, build, typecheck, then Lighthouse on `/` and `/fr/` (accessibility and SEO must score ≥ 90; performance and best practices warn below 80/90).
- **`main`** (`deploy.yml`): same checks, then deploys `out/` with GitHub's official Pages actions. Pages source must be set to *GitHub Actions*.
- **Dependabot**: weekly grouped updates for npm and GitHub Actions.

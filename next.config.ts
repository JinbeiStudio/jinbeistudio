import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages serves folders, so /fr must resolve to /fr/index.html.
  trailingSlash: true,
  images: { unoptimized: true },
  // Two root layouts (one per language) need a single app-wide 404.
  experimental: { globalNotFound: true },
};

export default nextConfig;

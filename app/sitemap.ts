import type { MetadataRoute } from 'next';
import { languageAlternates, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

// No lastModified: a build date would change on every dependency bump, which search engines learn to ignore.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(Object.entries(languageAlternates).map(([lang, path]) => [lang, `${siteUrl}${path}`]));
  return ['/', '/fr/'].map((path) => ({ url: `${siteUrl}${path}`, alternates: { languages } }));
}

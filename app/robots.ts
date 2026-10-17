import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Static export only prerenders route handlers explicitly marked static.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

import type { Metadata } from 'next';
import { dictionaries, type Locale } from './content';

export const siteUrl = 'https://jinbeistudio.com';

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = dictionaries[locale];
  const path = locale === 'en' ? '/' : '/fr/';

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    authors: [{ name: 'Julien Gabriel', url: siteUrl }],
    alternates: { canonical: path, languages: { en: '/', fr: '/fr/' } },
    manifest: '/images/favicon/site.webmanifest',
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: 'Jinbei Studio',
      locale: meta.ogLocale,
      type: 'profile',
      images: [{ url: '/images/socialmediashare.png', width: 1200, height: 630, alt: 'Julien Gabriel — Jinbei Studio' }],
    },
  };
}

export const viewport = { themeColor: '#04161c', colorScheme: 'dark' as const };

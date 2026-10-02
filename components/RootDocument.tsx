import { Inter, JetBrains_Mono, Unbounded } from 'next/font/google';
import type { Locale } from '@/lib/content';
import '@/app/globals.css';

const display = Unbounded({ subsets: ['latin'], variable: '--font-jb-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-jb-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jb-mono' });

export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

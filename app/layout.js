import './globals.css';
import { Raleway } from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata = {
  title: 'Jinbei Studio | Julien Gabriel | Développeur Fullstack',
  description:
    "Créé par Julien Gabriel, Jinbei Studio est une entreprise de création de sites internet et d'applications web et mobiles à Lannion en Bretagne. Jinbei Studio est là pour vous conseiller et vous apporter les solutions adaptées à vos différents projets.",
  creator: 'Julien Gabriel',
  publisher: 'Julien Gabriel',
  keywords: [
    'Jinbei Studio',
    'Julien Gabriel',
    'Développeur Fullstack',
    'Développement Application Web',
    'Développement Application Mobile',
    'Création Site Web',
  ],
  other: {
    'theme-color': '#ffffff',
    'msapplication-TileColor': '#da532c',
  },
  manifest: '/images/favicon/site.webmanifest',
  openGraph: {
    title: 'Jinbei Studio',
    description:
      "Créé par Julien Gabriel, Jinbei Studio est une entreprise de création de sites internet et d'applications web et mobiles à Lannion en Bretagne.",
    url: 'https://jinbeistudio.fr',
    siteName: 'Jinbei Studio',
    locale: 'fr-FR',
    type: 'website',
    images: [
      {
        url: 'https://jinbeistudio.fr/images/socialmediashare.png',
        width: 1200,
        height: 630,
        alt: 'Jinbei Studio',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body id="home" className={raleway.className}>
        {children}
      </body>
    </html>
  );
}

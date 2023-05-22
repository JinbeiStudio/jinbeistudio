import './globals.css'
import { Raleway } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Jinbei Studio | Julien Gabriel | Développeur Fullstack à Lannion",
  description: "Créé par Julien Gabriel, Jinbei Studio est une entreprise de création de sites internet et d'applications web et mobiles à Lannion en Bretagne. Jinbei Studio est là pour vous conseiller et vous apporter les solutions adaptées à vos différents projets.",
  creator: 'Julien Gabriel',
  publisher: 'Julien Gabriel',
  keywords: ['Jinbei Studio', 'Julien Gabriel', 'Développeur Fullstack', "Développement Application Web", "Développement Application Mobile", "Création Site Web"],
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

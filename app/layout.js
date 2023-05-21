import './globals.css'
import { Raleway } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Jinbei Studio",
  description: "Jinbei Studio par Julien Gabriel - Développeur Fullstack",
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

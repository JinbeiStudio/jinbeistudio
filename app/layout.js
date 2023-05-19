import './globals.css'
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Jinbei Studio",
  description: "Jinbei Studio par Julien Gabriel - Développeur Fullstack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}

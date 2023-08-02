import Nav from '@/components/molecules/nav';
import Banner from '@/components/molecules/banner';
import Services from '@/components/molecules/services';
import About from '@/components/molecules/about';
import Projects from '@/components/molecules/projects';
import Footer from '@/components/molecules/footer';
import Testimonies from '@/components/molecules/testimonies';
import Contact from '@/components/molecules/contact';
import FooterPattern from '@/components/atoms/footerpattern';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: 'Jinbei Studio',
    url: 'https://jinbeistudio.fr',
    logo: 'https://jinbeistudio.fr/images/logo.png',
    brand: 'Jinbei Studio',
    founder: 'Julien Gabriel',
    image: 'https://jinbeistudio.fr/images/logo.png',
    description:
      "Créé par Julien Gabriel, Jinbei Studio est une entreprise de création de sites internet et d'applications web et mobiles à Lannion en Bretagne. Jinbei Studio est là pour vous conseiller et vous apporter les solutions adaptées à vos différents projets.",
    keywords: 'Jinbei Studio,Julien Gabriel,Développeur Fullstack,Développement Application Web,Développement Application Mobile,Création Site Web',
  };

  return (
    <>
      <header className="justify-center h-24 mx-auto sticky top-0 bg-white z-50 w-full">
        <Nav />
      </header>
      <main>
        <section className="w-full">
          <Banner />
        </section>
        <section id="services" className="container pt-20 pb-28 sm:pt-40 sm:pb-48 mx-auto max-w-5xl max-lg:px-8">
          <Services />
        </section>
        <section id="about" className="w-full">
          <About />
        </section>
        <section id="projects" className="container py-24 mx-auto max-w-5xl px-8 lg:px-0">
          <Projects />
        </section>
        <section id="testimonies" className="w-full">
          <Testimonies />
        </section>
        <section id="contact" className="container py-24 mx-auto max-w-5xl px-8 lg:px-0">
          <Contact />
        </section>
        <FooterPattern />
      </main>
      <footer className="h-20 bg-blue w-full text-white">
        <Footer />
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

import { dictionaries, type Locale } from '@/lib/content';
import { siteUrl } from '@/lib/site';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import FishSchool from './FishSchool';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
import Ocean from './Ocean';
import SeaLife from './SeaLife';
import Skills from './Skills';
import Testimonials from './Testimonials';
import Work from './Work';

export default function Portfolio({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Julien Gabriel',
    jobTitle: 'Senior Software Engineer',
    url: siteUrl,
    image: `${siteUrl}/images/logo.png`,
    sameAs: t.contact.links.map((l) => l.href),
    knowsAbout: t.skills.groups.flatMap((g) => g.items),
  };

  return (
    <>
      <a className="skip-link" href="#about">
        {t.skipLink}
      </a>
      <Ocean depthLabel={t.depthLabel} />
      <SeaLife />
      <FishSchool />
      <Header nav={t.nav} />
      <main>
        <Hero hero={t.hero} />
        <About about={t.about} />
        <Experience experience={t.experience} />
        <Work work={t.work} />
        <Skills skills={t.skills} />
        <Testimonials testimonials={t.testimonials} />
        <Contact contact={t.contact} />
      </main>
      <Footer footer={t.footer} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

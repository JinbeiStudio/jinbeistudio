import { dictionaries, employer, type Locale } from '@/lib/content';
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
  // The person and the studio they founded, linked by @id so search engines read them as one entity graph.
  const person = `${siteUrl}/#person`;
  const studio = `${siteUrl}/#studio`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': person,
        name: 'Julien Gabriel',
        jobTitle: t.hero.role,
        url: siteUrl,
        image: `${siteUrl}/images/logo.png`,
        email: `mailto:${t.contact.email}`,
        sameAs: t.contact.links.map((l) => l.href),
        knowsAbout: t.skills.groups.flatMap((g) => g.items),
        worksFor: [{ '@type': 'Organization', name: employer }, { '@id': studio }],
      },
      {
        '@type': 'Organization',
        '@id': studio,
        name: 'Jinbei Studio',
        url: siteUrl,
        logo: `${siteUrl}/images/logo.png`,
        founder: { '@id': person },
      },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#about">
        {t.skipLink}
      </a>
      <Ocean depthLabel={t.depthLabel} />
      <SeaLife />
      <FishSchool />
      <Header
        nav={t.nav}
        depths={{ about: t.about.depth, experience: t.experience.depth, work: t.work.depth, contact: t.contact.depth }}
      />
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

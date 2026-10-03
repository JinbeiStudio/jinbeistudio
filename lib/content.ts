import type { ModuleIconName } from '@/components/ModuleIcon';

export type Locale = 'en' | 'fr';

type Link = { label: string; href: string };

export type Job = {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
};

export type Project = {
  name: string;
  kind: string;
  summary: string;
  stack: string[];
  // One visual per project: a site screenshot (browser frame), app screens (phone frames), or highlights (icon panel).
  image?: string;
  screens?: string[];
  highlights?: { label: string; icon: ModuleIconName }[];
  href?: string;
};

export type Testimonial = {
  author: string;
  company: string;
  quote: string;
  image: string;
};

export type Dictionary = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { label: string; about: string; experience: string; work: string; contact: string; switchLabel: string; switchHref: string; switchLang: Locale };
  hero: {
    status: string;
    role: string;
    pitch: string;
    primary: Link;
    secondary: Link;
    scroll: string;
  };
  about: {
    depth: string;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    nameNote: string;
  };
  experience: { depth: string; eyebrow: string; title: string; stackLabel: string; jobs: Job[]; education: { title: string; items: { school: string; degree: string; year: string; note: string }[] } };
  work: { depth: string; eyebrow: string; title: string; intro: string; visit: string; stackLabel: string; screenLabel: string; featured: Project[]; freelanceTitle: string; freelance: { name: string; image: string; href: string }[] };
  skills: { depth: string; eyebrow: string; title: string; groups: { name: string; items: string[] }[] };
  testimonials: { depth: string; eyebrow: string; title: string; translated: string; previous: string; next: string; items: Testimonial[] };
  contact: { depth: string; eyebrow: string; title: string; pitch: string; email: string; links: Link[] };
  footer: { built: string; source: string };
  depthLabel: string;
  skipLink: string;
};

const email = 'julien@jinbeistudio.com';
const socials: Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juliengabrielfr/' },
  { label: 'GitHub', href: 'https://github.com/jinbeistudio' },
];

const stacks = {
  imagine: ['Symfony', 'Angular', 'TypeScript', 'API Platform', 'Docker'],
  antilop: ['React', 'Next.js', 'Symfony', 'React Native', 'Expo'],
  cristalens: ['Laravel', 'Symfony', 'MySQL'],
  jinbei: ['Wix', 'HTML', 'CSS', 'JavaScript'],
  ing: ['Project management', 'Change management'],
};

const images = {
  avecoach: '/work/avecoach.webp',
  trocvelo: '/work/trocvelo.webp',
  upd: '/work/upd.webp',
};

const franceOliveScreens = ['/work/franceolive-observations.webp', '/work/franceolive-parcels.webp', '/work/franceolive-chart.webp'];

const freelance = [
  { name: "S'Coach", image: '/work/scoach.webp', href: 'https://www.s-coach.fr/' },
  { name: 'Be4You', image: '/work/be4you.webp', href: 'https://www.be4you.co/' },
  { name: 'Need', image: '/work/need.webp', href: 'https://www.ineedme.fr/' },
  { name: 'Accompagnements', image: '/work/gelernter.webp', href: 'https://www.accompagnements.net/' },
];

// Ordered by weight: frameworks, then language, libraries, data and infrastructure.
const skillGroups = (labels: [string, string, string, string]) => [
  { name: labels[0], items: ['Angular', 'React', 'Next.js', 'TypeScript', 'RxJS', 'Tailwind', 'Material Design', 'Bootstrap'] },
  {
    name: labels[1],
    items: ['Symfony', 'Laravel', 'API Platform', 'PHP', 'Doctrine', 'Symfony Messenger', 'PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ'],
  },
  { name: labels[2], items: ['React Native', 'Expo'] },
  { name: labels[3], items: ['Docker', 'Git', 'CI/CD', 'PHPUnit', 'Claude Code'] },
];

const people = {
  manegrier: '/people/sophiemanegrier.webp',
  pozzo: '/people/olivierpozzo.webp',
  herault: '/people/anthonyherault.webp',
  gelernter: '/people/sophiegelernter.webp',
  carette: '/people/xaviercarette.webp',
};

export const en: Dictionary = {
  meta: {
    title: 'Julien Gabriel — Senior Software Engineer',
    description:
      'Julien Gabriel, Senior Software Engineer. 10+ years in tech, building web and mobile products with Angular, React, Next.js and Symfony.',
    ogLocale: 'en_US',
  },
  nav: { label: 'Main', about: 'About', experience: 'Experience', work: 'Work', contact: 'Contact', switchLabel: 'Français', switchHref: '/fr/', switchLang: 'fr' },
  hero: {
    status: 'Available for freelance projects',
    role: 'Senior Software Engineer',
    pitch: 'I build calm, reliable web and mobile products with Angular, React and Symfony, from the first sketch to production.',
    primary: { label: 'Dive into my work', href: '#work' },
    secondary: { label: 'Get in touch', href: '#contact' },
    scroll: 'Scroll to dive',
  },
  about: {
    depth: '10',
    eyebrow: 'About',
    title: 'A decade in IT, from project lead to full‑stack engineer.',
    paragraphs: [
      'I started my career as an IT project manager at ING Bank France, where I learned how software serves real people and real deadlines.',
      'After 18 months travelling through 18 countries across Asia, Oceania and South America, I founded Jinbei Studio to design and build websites and web apps for businesses, and I have been shipping code ever since.',
      'Today I am a Senior Software Engineer at Imagine Human, working across Symfony and Angular in an agile team. I care about clear architecture, maintainable code and interfaces that feel effortless.',
    ],
    stats: [
      { value: '10+', label: 'years in tech' },
      { value: '8+', label: 'years shipping code' },
      { value: '18', label: 'countries on a world tour' },
      { value: '980', label: 'TOEIC score' },
    ],
    nameNote: 'Jinbei comes from jinbei-zame (甚兵衛鮫), the Japanese name for the whale shark: the gentle giant of the ocean. Steady, curious, and built to go the distance.',
  },
  experience: {
    depth: '40',
    eyebrow: 'Experience',
    title: 'Where I have been diving.',
    stackLabel: 'Stack',
    jobs: [
      {
        company: 'Imagine Human',
        role: 'Senior Software Engineer',
        period: '2023 — Today',
        summary:
          'Full-stack development of Winlassie Online, a QHSE SaaS platform used in nuclear, construction, rail and industry, with Symfony and Angular in an agile team.',
        stack: stacks.imagine,
      },
      {
        company: 'Antilop',
        role: 'Software Engineer',
        period: '2021 — 2023',
        summary: 'Web and mobile products for clients: e-commerce platforms (Troc Vélo, Ultra Premium Direct) and the France Olive mobile app.',
        stack: stacks.antilop,
      },
      {
        company: 'Cristalens Industrie',
        role: 'Software Engineer',
        period: '2020 — 2021',
        summary: 'Internal tools for a medical device manufacturer: HR information system, ERP and an e-CRF for clinical studies.',
        stack: stacks.cristalens,
      },
      {
        company: 'Jinbei Studio',
        role: 'Web Developer, founder',
        period: '2018 — 2020',
        summary: 'Websites for small businesses and independents, from brief to launch.',
        stack: stacks.jinbei,
      },
      {
        company: 'ING Bank France',
        role: 'IT Project Manager',
        period: '2014 — 2016',
        summary: 'Delivery of IT projects and change management in a banking environment.',
        stack: stacks.ing,
      },
    ],
    education: {
      title: 'Education',
      items: [
        { school: 'IUT de Lannion', degree: 'Bachelor, Software Engineering', year: '2021', note: 'Valedictorian, with honors' },
        { school: 'IAE Gustave Eiffel', degree: 'Master, Management', year: '2016', note: 'With honors' },
        { school: 'Université de Versailles', degree: 'Bachelor, Economics & Management', year: '2014', note: 'English specialty' },
      ],
    },
  },
  work: {
    depth: '80',
    eyebrow: 'Selected work',
    title: 'Things I helped bring to the surface.',
    intro: 'A selection of products I designed, built or contributed to, across web, mobile and internal tooling.',
    visit: 'Visit',
    stackLabel: 'Stack',
    screenLabel: 'app screen',
    featured: [
      {
        name: 'Winlassie Online',
        kind: 'SaaS · QHSE',
        summary:
          'A cloud platform that helps organisations manage health, safety and environmental compliance: risk assessment, workplace incidents, employee qualifications and medical follow-up, audits and KPIs, and radiation protection.',
        stack: ['Symfony', 'Angular'],
        highlights: [
          { label: 'Foundation', icon: 'foundation' },
          { label: 'Risks', icon: 'risks' },
          { label: 'Events', icon: 'events' },
          { label: 'Skills & medical', icon: 'skills' },
          { label: 'Audits & KPIs', icon: 'audits' },
          { label: 'Radiation protection', icon: 'radiation' },
        ],
        href: 'https://www.winlassie.com/nos-logiciels/winlassie-online/',
      },
      {
        name: 'Avé Coach',
        kind: 'Website & CMS · Coaching',
        summary:
          'A custom website and CMS for an executive coach in the Paris region: she edits her texts and images from her own admin, pages are rendered server-side for SEO, and the contact form sends emails.',
        stack: ['Node.js', 'Express', 'SQLite', 'JWT', 'Nodemailer'],
        image: images.avecoach,
        href: 'https://ave-coach.fr',
      },
      {
        name: 'Troc Vélo',
        kind: 'Marketplace · E-commerce',
        summary: 'A cycling and outdoor marketplace where riders buy, sell and share gear without fees.',
        stack: ['Symfony', 'React'],
        image: images.trocvelo,
        href: 'https://www.troc-velo.com/fr-fr',
      },
      {
        name: 'Cristalens e-CRF',
        kind: 'Web app · Medical',
        summary: 'Electronic case report forms used by investigators to capture clinical study data securely.',
        stack: ['Symfony', 'MySQL'],
        highlights: [
          { label: 'Multi-study access', icon: 'folder' },
          { label: 'Investigator accounts', icon: 'users' },
          { label: 'Case report forms', icon: 'clipboard' },
          { label: 'Secure data capture', icon: 'lock' },
        ],
        href: 'https://cristalens-international.com/',
      },
      {
        name: 'Oléiculteur — France Olive',
        kind: 'Mobile app · iOS & Android',
        summary: 'A mobile app for olive growers to manage their farms and parcels.',
        stack: ['React Native', 'Expo', 'Symfony'],
        screens: franceOliveScreens,
        href: 'https://apps.apple.com/us/app/ol%C3%A9iculteur/id6444620038',
      },
      {
        name: 'Ultra Premium Direct',
        kind: 'E-commerce · Subscription',
        summary: 'A direct-to-consumer pet food store with subscriptions, serving hundreds of thousands of customers.',
        stack: ['Next.js', 'React', 'Symfony'],
        image: images.upd,
        href: 'https://www.ultrapremiumdirect.com',
      },
      {
        name: 'Cristalens HRIS',
        kind: 'Internal tool · HR',
        summary: 'Leave planning and team scheduling for every department of the company.',
        stack: ['Laravel', 'MySQL'],
        highlights: [
          { label: 'Leave requests', icon: 'leave' },
          { label: 'Approval workflow', icon: 'approve' },
          { label: 'Team calendar', icon: 'calendar' },
          { label: 'Department filters', icon: 'filter' },
        ],
      },
    ],
    freelanceTitle: 'Websites crafted with Jinbei Studio',
    freelance,
  },
  skills: {
    depth: '120',
    eyebrow: 'Toolkit',
    title: 'What I work with.',
    groups: skillGroups(['Front-end', 'Back-end', 'Mobile', 'Tooling & practice']),
  },
  testimonials: {
    depth: '160',
    eyebrow: 'Kind words',
    title: 'What clients say.',
    translated: 'Translated from French',
    previous: 'Previous testimonial',
    next: 'Next testimonial',
    items: [
      {
        author: 'Sophie Manégrier',
        company: "S'Coach",
        quote:
          'Julien built my website from A to Z, mastering the technical platform, the budget, the tools, the images, the aesthetics, the consistency of the content and the spelling! In French and English! A great, true professional.',
        image: people.manegrier,
      },
      {
        author: 'Anthony Hérault',
        company: 'Be4You',
        quote:
          'Listening, responsiveness and creativity are the three words that come to mind. In a few days, Julien built a site that looks like me, that I am proud of, and that reflects the values of my business.',
        image: people.herault,
      },
      {
        author: 'Xavier Carette',
        company: 'Need',
        quote: 'With a precise brief, it took Julien barely a week to build my site. Proactive, available, pleasant: I recommend him.',
        image: people.carette,
      },
      {
        author: 'Sophie Gelernter',
        company: 'Accompagnements',
        quote: 'His questions, relevance, responsiveness and availability helped me build a site that reflects who I am. Julien is a great teacher.',
        image: people.gelernter,
      },
      {
        author: 'Olivier Pozzo',
        company: 'Luthier',
        quote: 'I love how my work is showcased and how smooth the navigation is. A great tool for my visibility in France and abroad. I highly recommend him.',
        image: people.pozzo,
      },
    ],
  },
  contact: {
    depth: '200',
    eyebrow: 'Contact',
    title: "Let's build something deep.",
    pitch: 'Have a project in mind, or just want to talk tech? My inbox is open.',
    email,
    links: socials,
  },
  footer: { built: 'Built with Next.js, TypeScript, CSS animations and a little canvas.', source: 'Source on GitHub' },
  depthLabel: 'Depth',
  skipLink: 'Skip to content',
};

export const fr: Dictionary = {
  meta: {
    title: 'Julien Gabriel — Senior Software Engineer',
    description:
      'Julien Gabriel, Senior Software Engineer : plus de 10 ans dans la tech à concevoir des produits web et mobiles avec Angular, React, Next.js et Symfony.',
    ogLocale: 'fr_FR',
  },
  nav: { label: 'Navigation principale', about: 'À propos', experience: 'Parcours', work: 'Projets', contact: 'Contact', switchLabel: 'English', switchHref: '/', switchLang: 'en' },
  hero: {
    status: 'Disponible pour des missions freelance',
    role: 'Senior Software Engineer',
    pitch: 'Je conçois des produits web et mobiles fiables avec Angular, React et Symfony, de la première esquisse à la production.',
    primary: { label: 'Plonger dans mes projets', href: '#work' },
    secondary: { label: 'Me contacter', href: '#contact' },
    scroll: 'Défilez pour plonger',
  },
  about: {
    depth: '10',
    eyebrow: 'À propos',
    title: 'Dix ans dans l’IT, de chef de projet à développeur full‑stack.',
    paragraphs: [
      'J’ai commencé ma carrière comme chef de projet informatique chez ING Bank France, où j’ai appris comment un logiciel sert de vraies personnes, avec de vraies échéances.',
      'Après 18 mois de voyage à travers 18 pays d’Asie, d’Océanie et d’Amérique du Sud, j’ai fondé Jinbei Studio pour concevoir et développer des sites et applications web pour des entreprises, et je n’ai plus cessé de coder depuis.',
      'Aujourd’hui, je suis Senior Software Engineer chez Imagine Human, sur Symfony et Angular au sein d’une équipe agile. J’aime les architectures claires, le code maintenable et les interfaces qui semblent évidentes.',
    ],
    stats: [
      { value: '10+', label: 'ans dans la tech' },
      { value: '8+', label: 'ans de développement' },
      { value: '18', label: 'pays lors d’un tour du monde' },
      { value: '980', label: 'score TOEIC' },
    ],
    nameNote: 'Jinbei vient de jinbei-zame (甚兵衛鮫), le nom japonais du requin-baleine : le géant paisible de l’océan. Constant, curieux, et taillé pour aller loin.',
  },
  experience: {
    depth: '40',
    eyebrow: 'Parcours',
    title: 'Mes dernières plongées.',
    stackLabel: 'Technologies',
    jobs: [
      {
        company: 'Imagine Human',
        role: 'Senior Software Engineer',
        period: '2023 — Aujourd’hui',
        summary:
          'Développement full-stack de Winlassie Online, une plateforme SaaS QHSE utilisée dans le nucléaire, le BTP, le ferroviaire et l’industrie, avec Symfony et Angular au sein d’une équipe agile.',
        stack: stacks.imagine,
      },
      {
        company: 'Antilop',
        role: 'Software Engineer',
        period: '2021 — 2023',
        summary: 'Produits web et mobiles pour des clients : plateformes e-commerce (Troc Vélo, Ultra Premium Direct) et l’application mobile France Olive.',
        stack: stacks.antilop,
      },
      {
        company: 'Cristalens Industrie',
        role: 'Software Engineer',
        period: '2020 — 2021',
        summary: "Outils internes pour un fabricant de dispositifs médicaux : SIRH, ERP et e-CRF pour les études cliniques.",
        stack: stacks.cristalens,
      },
      {
        company: 'Jinbei Studio',
        role: 'Développeur web, fondateur',
        period: '2018 — 2020',
        summary: 'Sites web pour des TPE et indépendants, du brief à la mise en ligne.',
        stack: stacks.jinbei,
      },
      {
        company: 'ING Bank France',
        role: 'Chef de projet IT',
        period: '2014 — 2016',
        summary: 'Pilotage de projets informatiques et conduite du changement en environnement bancaire.',
        stack: ['Gestion de projet', 'Conduite du changement'],
      },
    ],
    education: {
      title: 'Formation',
      items: [
        { school: 'IUT de Lannion', degree: 'Licence pro, Génie logiciel', year: '2021', note: 'Major de promotion, mention bien' },
        { school: 'IAE Gustave Eiffel', degree: 'Master, Management', year: '2016', note: 'Mention bien' },
        { school: 'Université de Versailles', degree: 'Licence, Économie et gestion', year: '2014', note: 'Spécialité anglais' },
      ],
    },
  },
  work: {
    depth: '80',
    eyebrow: 'Projets',
    title: 'Ce que j’ai aidé à faire remonter à la surface.',
    intro: 'Une sélection de produits que j’ai conçus, développés ou auxquels j’ai contribué : web, mobile et outils internes.',
    visit: 'Voir',
    stackLabel: 'Technologies',
    screenLabel: 'écran de l’application',
    featured: [
      {
        name: 'Winlassie Online',
        kind: 'SaaS · QHSE',
        summary:
          'Une plateforme cloud qui aide les organisations à piloter la santé, la sécurité et l’environnement : évaluation des risques, accidents du travail, habilitations et suivi médical, audits et indicateurs, et radioprotection.',
        stack: ['Symfony', 'Angular'],
        highlights: [
          { label: 'Socle', icon: 'foundation' },
          { label: 'Risques', icon: 'risks' },
          { label: 'Événements', icon: 'events' },
          { label: 'Aptitudes', icon: 'skills' },
          { label: 'Pilotage', icon: 'audits' },
          { label: 'Radioprotection', icon: 'radiation' },
        ],
        href: 'https://www.winlassie.com/nos-logiciels/winlassie-online/',
      },
      {
        name: 'Avé Coach',
        kind: 'Site & CMS · Coaching',
        summary:
          'Un site et un CMS sur mesure pour une coach de dirigeants en région parisienne : elle modifie ses textes et images depuis son propre espace d’administration, les pages sont générées côté serveur pour le SEO et le formulaire de contact envoie des emails.',
        stack: ['Node.js', 'Express', 'SQLite', 'JWT', 'Nodemailer'],
        image: images.avecoach,
        href: 'https://ave-coach.fr',
      },
      {
        name: 'Troc Vélo',
        kind: 'Marketplace · E-commerce',
        summary: 'Une marketplace vélo et outdoor où les cyclistes achètent, vendent et partagent leur matériel sans frais.',
        stack: ['Symfony', 'React'],
        image: images.trocvelo,
        href: 'https://www.troc-velo.com/fr-fr',
      },
      {
        name: 'Cristalens e-CRF',
        kind: 'Application web · Médical',
        summary: 'Cahiers d’observation électroniques permettant aux investigateurs de saisir les données d’études cliniques en toute sécurité.',
        stack: ['Symfony', 'MySQL'],
        highlights: [
          { label: 'Accès multi-études', icon: 'folder' },
          { label: 'Comptes investigateurs', icon: 'users' },
          { label: 'Cahiers d’observation', icon: 'clipboard' },
          { label: 'Saisie sécurisée', icon: 'lock' },
        ],
        href: 'https://cristalens-international.com/fr/',
      },
      {
        name: 'Oléiculteur — France Olive',
        kind: 'App mobile · iOS & Android',
        summary: 'Une application mobile pour les oléiculteurs, pour gérer leurs exploitations et leurs parcelles.',
        stack: ['React Native', 'Expo', 'Symfony'],
        screens: franceOliveScreens,
        href: 'https://apps.apple.com/fr/app/ol%C3%A9iculteur/id6444620038',
      },
      {
        name: 'Ultra Premium Direct',
        kind: 'E-commerce · Abonnement',
        summary: 'Une boutique d’alimentation animale en direct, avec abonnements, au service de centaines de milliers de clients.',
        stack: ['Next.js', 'React', 'Symfony'],
        image: images.upd,
        href: 'https://www.ultrapremiumdirect.com',
      },
      {
        name: 'Cristalens SIRH',
        kind: 'Outil interne · RH',
        summary: 'Planification des congés et des équipes pour tous les services de l’entreprise.',
        stack: ['Laravel', 'MySQL'],
        highlights: [
          { label: 'Demandes de congés', icon: 'leave' },
          { label: 'Circuit de validation', icon: 'approve' },
          { label: 'Planning des équipes', icon: 'calendar' },
          { label: 'Filtres par service', icon: 'filter' },
        ],
      },
    ],
    freelanceTitle: 'Sites réalisés avec Jinbei Studio',
    freelance,
  },
  skills: {
    depth: '120',
    eyebrow: 'Boîte à outils',
    title: 'Mes outils.',
    groups: skillGroups(['Front-end', 'Back-end', 'Mobile', 'Outils & pratiques']),
  },
  testimonials: {
    depth: '160',
    eyebrow: 'Témoignages',
    title: 'Ils en parlent.',
    translated: '',
    previous: 'Témoignage précédent',
    next: 'Témoignage suivant',
    items: [
      {
        author: 'Sophie Manégrier',
        company: 'S’Coach',
        quote:
          'Julien m’a construit mon site de A à Z, maîtrisant à la fois la plate-forme technique, l’économique, l’outil, les images, l’esthétique, la cohérence du contenu et l’orthographe ! En prime en français et en anglais ! Un grand et vrai professionnel.',
        image: people.manegrier,
      },
      {
        author: 'Anthony Hérault',
        company: 'Be4You',
        quote:
          'Écoute du besoin, réactivité et créativité sont les 3 termes qui me viennent en tête. En quelques jours, Julien a su réaliser un site qui me ressemble, dont je suis fier et qui reflète les valeurs de mon activité.',
        image: people.herault,
      },
      {
        author: 'Xavier Carette',
        company: 'Need',
        quote: 'Avec un brief précis, il n’aura fallu à Julien qu’à peine 1 semaine pour me faire mon site. Force de proposition, disponible, agréable, je le recommande.',
        image: people.carette,
      },
      {
        author: 'Sophie Gelernter',
        company: 'Accompagnements',
        quote: 'Son questionnement, sa pertinence, sa réactivité et sa disponibilité m’ont permis de réaliser un site à mon image. Julien est très bon expert pédagogue.',
        image: people.gelernter,
      },
      {
        author: 'Olivier Pozzo',
        company: 'Luthier',
        quote: 'J’apprécie la mise en valeur de mon travail et la fluidité de la navigation. C’est un très bon outil pour ma visibilité en France comme à l’étranger. Je le recommande vivement.',
        image: people.pozzo,
      },
    ],
  },
  contact: {
    depth: '200',
    eyebrow: 'Contact',
    title: 'Plongeons ensemble dans votre prochain projet.',
    pitch: 'Un projet en tête, ou simplement envie de parler tech ? Écrivez-moi.',
    email,
    links: socials,
  },
  footer: { built: 'Réalisé avec Next.js, TypeScript, des animations CSS et un peu de canvas.', source: 'Code source sur GitHub' },
  depthLabel: 'Profondeur',
  skipLink: 'Aller au contenu',
};

export const dictionaries: Record<Locale, Dictionary> = { en, fr };

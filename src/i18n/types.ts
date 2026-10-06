export type Locale = 'fr' | 'en';

export interface ProjectTexts {
  tagline: string;
  description: string;
  caseStudy?: {
    problem: string;
    process: string;
    solution: string;
    results: string[];
  };
}

export interface ProjectMetaTexts {
  badge: string;
  metrics: string[];
}

export interface Translations {
  skipToContent: string;
  backToTop: string;

  nav: {
    links: {
      projects: string;
      skills: string;
      services: string;
      about: string;
      contact: string;
      gallery: string;
    };
    cta: string;
    ctaFull: string;
  };

  hero: {
    available: string;
    headingLines: [string, string, string, string];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statExpLabel: string;
    statProjectsLabel: string;
    platformsLabel: string;
    scrollLabel: string;
  };

  marquee: {
    items: string[];
  };

  projects: {
    sectionLabel: string;
    heading: string;
    headingEm: string;
    close: string;
    viewProject: string;
    view: string;
    demoLive: string;
    filterAll: string;
    flagship: string;
    statusLabels: Record<string, string>;
    caseStudySections: {
      problem: string;
      approach: string;
      solution: string;
      results: string;
    };
    items: Record<string, ProjectTexts>;
    meta: Record<string, ProjectMetaTexts>;
  };

  stack: {
    sectionLabel: string;
    heading: string;
    headingEm: string;
    categories: Array<{ category: string; description: string }>;
  };

  services: {
    sectionLabel: string;
    heading: string;
    headingEm: string;
    items: Array<{ title: string; description: string }>;
  };

  process: {
    sectionLabel: string;
    heading: string;
    headingEm: string;
    description: string;
    steps: Array<{ title: string; description: string }>;
  };

  about: {
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    headingEm: string;
    bio: string;
    metaLabels: {
      domains: string;
      experience: string;
      languages: string;
    };
    metaValues: {
      domains: string;
      expUnit: string;
      projectsUnit: string;
      languages: string;
    };
    badges: {
      available: string;
    };
  };

  timeline: {
    sectionLabel: string;
    heading: string;
    headingEm: string;
    events: Array<{ years: string; title: string; description: string }>;
  };

  contact: {
    sectionLabel: string;
    headingLines: [string, string];
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      projectType: string;
      projectTypePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      disclaimer: string;
    };
    projectTypes: string[];
    labels: {
      email: string;
      location: string;
      socials: string;
    };
    whatsapp: {
      name: string;
      email: string;
      company: string;
      type: string;
    };
  };

  footer: {
    tagline: string;
    columns: {
      correspondence: string;
      socials: string;
    };
    bottomBar: string;
  };

  text3d: {
    lines: string[];
  };

  profile: {
    availability: string;
  };
}

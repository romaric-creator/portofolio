import type { Translations } from './types';

export const en: Translations = {
  skipToContent: 'Skip to content',
  backToTop: 'Back to top',

  nav: {
    links: {
      projects: 'Work',
      skills: 'Skills',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
    },
    cta: 'Start',
    ctaFull: 'Start a project',
  },

  hero: {
    available: 'Available for work',
    headingLines: [
      'I turn business',
      'processes into',
      'simple and',
      'efficient software.',
    ],
    subtitle: "I design and build digital solutions for SMBs, startups and entrepreneurs — from idea to production.",
    ctaPrimary: 'Start a project',
    ctaSecondary: 'View my work',
    statExpLabel: 'years of experience',
    statProjectsLabel: 'products delivered',
    platformsLabel: 'platforms',
    scrollLabel: 'Scroll',
  },

  marquee: {
    items: [
      'Business apps', 'SaaS', 'Automation',
      'React', 'Node.js', 'TypeScript', 'React Native',
      'Electron', 'Web', 'Mobile', 'Desktop', 'Backend',
    ],
  },

  projects: {
    sectionLabel: 'Selected work',
    heading: "What I've designed",
    headingEm: 'and delivered.',
    close: 'Close',
    viewProject: 'View project',
    view: 'View',
    demoLive: 'Live demo',
    caseStudySections: {
      problem: 'The problem',
      approach: 'The approach',
      solution: 'The solution',
      results: 'Results',
    },
    items: {
      '01': {
        tagline: "Business management and accounting app for hotels, restaurants, and SMBs.",
        description: "Complete system with hotel modules (reservations, check-in/out), bar/restaurant (orders, kitchen workflow), sales & POS, double-entry accounting, staff management and reports. Docker multi-service architecture with RBAC and secure transactions.",
        caseStudy: {
          problem: "Hotels and restaurants in Douala managed reservations, orders and accounting on paper or Excel, causing errors and losses.",
          process: "Modular design: each business domain (hotel, restaurant, POS, accounting) is an independent module with its own RBAC. Docker architecture to isolate services.",
          solution: "Unified platform covering the full cycle: reservation → check-in → order → invoicing → double-entry accounting.",
          results: ["+40% operational efficiency", "Zero duplicate data entry", "Real-time reports"],
        },
      },
      '02': {
        tagline: "Mobile platform for coordinating blood donation in Cameroon.",
        description: "Full mobile app connecting blood donors, hospitals and administration. Async queues, push notifications, admin dashboard.",
        caseStudy: {
          problem: "In Cameroon, finding a compatible blood donor in an emergency relies on word of mouth, delaying vital transfusions.",
          process: "Built a donor/recipient matching system by blood type with BullMQ queues to handle demand peaks.",
          solution: "Mobile app connecting donors, hospitals and administration with real-time push notifications and geolocation.",
          results: ["Blood donation coordination", "Real-time notifications", "Admin dashboard"],
        },
      },
      '03': {
        tagline: "Full-stack collaborative platform with mobile app.",
        description: "Complete ecosystem: website, backend API and mobile app. End-to-end TypeScript architecture, user management, collaboration system.",
      },
      '04': {
        tagline: "AI for agricultural yield prediction.",
        description: "Machine Learning system that predicts agricultural yield (tons/hectare) and recommends improvements to maximize production.",
      },
      '05': {
        tagline: "Mentorship API and university social network (IUC).",
        description: "Complete backend for a student mentorship platform: automatic mentor/mentee assignment, PDF class list import, news feed with posts/comments/likes, Redis cache, Swagger docs and multi-campus management.",
        caseStudy: {
          problem: "IUC had no structured mentorship system between alumni and new students — everything was done manually.",
          process: "Automatic mentor/mentee assignment algorithm based on major and campus, with PDF class list import.",
          solution: "Complete REST API with social news feed, Redis cache for performance, and Swagger documentation.",
          results: ["Automated assignment", "PDF list import", "Integrated Redis cache"],
        },
      },
      '06': {
        tagline: "High-performance project management API for teams.",
        description: "TypeScript REST API for collaborative project and task management. JWT authentication, roles, documented RESTful endpoints.",
      },
      '07': {
        tagline: "Complete management system for a driving school (desktop).",
        description: "Electron desktop app for multi-site driving school management: registrations, payments, attendance, instructor scheduling, learner tracking. Client/server architecture with NestJS REST API and MySQL.",
        caseStudy: {
          problem: "The driving school managed registrations, payments and scheduling on paper across multiple sites with no unified view.",
          process: "Electron + NestJS client/server architecture enabling offline use with synchronization.",
          solution: "Full desktop app: registrations, payments, attendance, instructor scheduling, multi-site learner tracking.",
          results: ["Multi-site management", "Automated workflow", "Offline synchronization"],
        },
      },
      '08': {
        tagline: "Desktop app for IT maintenance management.",
        description: "Electron software for repair shops: device intake, maintenance tickets, PDF invoicing, client management, reports and inventory. Zustand state management, Excel export.",
        caseStudy: {
          problem: "IT repair shops tracked tickets and invoicing manually with no client history.",
          process: "Zustand state management for reactivity, Prisma for the database, React PDF for automated invoicing.",
          solution: "Full desktop software: intake, tickets, PDF invoicing, client management, reports and inventory.",
          results: ["PDF and Excel export", "Complete client history", "Inventory management"],
        },
      },
    },
    meta: {
      '01': { badge: "Enterprise architecture", metrics: ["+40% operational efficiency", "Secure RBAC modules"] },
      '02': { badge: "Social impact", metrics: ["Blood donation coordination", "Real-time notifications"] },
      '03': { badge: "Collaborative platform", metrics: ["End-to-end TypeScript", "Cross-platform"] },
      '04': { badge: "Artificial intelligence", metrics: ["Agricultural ML prediction", "Optimized recommendations"] },
      '05': { badge: "High-availability API", metrics: ["Integrated Redis cache", "Automated PDF import"] },
      '06': { badge: "REST API", metrics: ["Secure JWT auth", "Roles and permissions"] },
      '07': { badge: "Business app", metrics: ["Multi-site management", "Automated workflow"] },
      '08': { badge: "Desktop business tool", metrics: ["PDF and Excel export", "Zustand state"] },
    },
  },

  stack: {
    sectionLabel: 'Skills',
    heading: 'The tools',
    headingEm: 'I master.',
    categories: [
      { category: 'Frontend & Mobile', description: 'Reactive, accessible, performant interfaces' },
      { category: 'Backend & API', description: 'Robust, scalable, secure systems' },
      { category: 'Data & Infrastructure', description: 'Reliable persistence, optimized performance' },
      { category: 'Quality & Tooling', description: 'Maintainable code, controlled deliveries' },
    ],
  },

  services: {
    sectionLabel: 'How I can help',
    heading: 'Solutions for',
    headingEm: 'every need.',
    items: [
      {
        title: 'Business applications',
        description: 'Apps tailored to your business processes: management, orders, inventory, clients, operations and dashboards.',
      },
      {
        title: 'SaaS & MVP',
        description: 'From idea to working product: architecture, interface, backend, database, authentication and deployment.',
      },
      {
        title: 'Automation',
        description: 'Replace manual tasks and scattered workflows with centralized, reliable digital processes.',
      },
      {
        title: 'Mobile applications',
        description: 'Android and iOS apps with React Native, built around real user needs.',
      },
      {
        title: 'Backend & Integrations',
        description: 'APIs, authentication systems, databases, real-time features and third-party service integration.',
      },
    ],
  },

  process: {
    sectionLabel: 'My process',
    heading: 'How',
    headingEm: 'I work.',
    description: "A clear process to reduce uncertainty and deliver a product that meets your expectations.",
    steps: [
      { title: 'Discovery', description: 'We define together the problem, objectives and constraints of your project.' },
      { title: 'Planning', description: 'Architecture, features, roadmap and clear estimate before writing a line of code.' },
      { title: 'Development', description: 'Iterative development with regular demos to validate each step.' },
      { title: 'Delivery', description: 'Testing, deployment and documentation for a smooth production release.' },
      { title: 'Support', description: 'Maintenance, fixes and product improvements after delivery.' },
    ],
  },

  about: {
    sectionLabel: 'About',
    headingLine1: 'I turn concrete needs',
    headingLine2: 'into',
    headingEm: 'functional digital tools.',
    bio: "Full-Stack Developer based in Douala, I work across the entire development cycle: interfaces, APIs, databases, deployment. I particularly enjoy replacing manual processes with simple, structured and usable tools.",
    metaLabels: {
      domains: 'Domains',
      experience: 'Experience',
      languages: 'Languages',
    },
    metaValues: {
      domains: 'Web · Mobile · Desktop · Backend',
      expUnit: 'years',
      projectsUnit: 'products delivered',
      languages: 'French · English',
    },
    badges: {
      available: 'Available',
    },
  },

  timeline: {
    sectionLabel: 'Journey',
    heading: 'The path of',
    headingEm: 'a passionate builder.',
    events: [
      {
        years: 'June – August 2026',
        title: 'IT Consultant Intern',
        description: "Simis BTP Holding. Internal process automation, business app development to replace manual workflows, IT strategy consulting and company website creation.",
      },
      {
        years: '2022 – 2026',
        title: 'Freelance Developer',
        description: "Design and development of web, mobile and desktop applications for SMBs, startups and entrepreneurs.",
      },
    ],
  },

  contact: {
    sectionLabel: 'Contact',
    headingLines: ['A project?', "Let's talk."],
    subtitle: 'Describe your needs and I will get back to you within 24 hours.',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      company: 'Company / Project',
      companyPlaceholder: 'Your company or project name',
      projectType: 'Project type',
      projectTypePlaceholder: 'Select...',
      message: 'Project description',
      messagePlaceholder: 'Describe your needs, goals and constraints...',
      submit: 'Send my request',
      disclaimer: 'The form opens WhatsApp with your message. You can also reach me by email.',
    },
    projectTypes: [
      'Business application',
      'SaaS / MVP',
      'Mobile application',
      'Automation',
      'API / Backend',
      'Other',
    ],
    labels: {
      email: 'Email',
      location: 'Location',
      socials: 'Socials',
    },
    whatsapp: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      type: 'Type',
    },
  },

  footer: {
    tagline: 'Full-Stack Developer based in Douala. Available for projects and international collaborations.',
    columns: {
      correspondence: 'Get in touch',
      socials: 'Socials',
    },
    bottomBar: 'Douala, Cameroon · Portfolio v3',
  },

  text3d: {
    lines: ['I turn', 'business', 'processes into', 'simple', 'software.'],
  },

  profile: {
    availability: 'Working remotely with clients worldwide',
  },
};

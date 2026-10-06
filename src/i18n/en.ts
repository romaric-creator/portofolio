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
      gallery: 'Gallery',
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
    subtitle: "I automate the manual processes of SMBs: from Excel and WhatsApp to a real app.",
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
    filterAll: 'All',
    flagship: 'Flagship project',
    statusLabels: {
      production:    'Live',
      delivered:     'Delivered',
      'in-progress': 'In progress',
      prototype:     'Prototype',
    },
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
          problem: "Hotels and restaurants in Douala managed reservations, orders and accounting on paper or Excel - no shared data between modules, no audit trail, frequent double entries.",
          process: "Each business domain (hotel, restaurant, POS, accounting) is an isolated service with its own RBAC, deployed via Docker Compose for independent scaling. Built a double-entry accounting engine from scratch with transaction integrity guarantees. Event-driven workflow connects modules: reservation → check-in → order → invoicing → ledger entry.",
          solution: "One unified platform covers the full operational cycle. Staff work in their module; managers get a consolidated view. Zero manual reconciliation between systems.",
          results: ["+40% operational efficiency measured on-site", "Zero double data entry across modules", "Real-time financial reports replacing end-of-day manual tallying"],
        },
      },
      '02': {
        tagline: "Mobile platform for coordinating blood donation in Cameroon.",
        description: "Full mobile app (React Native + Expo) connecting blood donors, hospitals and administration. BullMQ async queues with priority lanes, Firebase push notifications, geolocation matching, role-based JWT auth for 3 user types (donor, hospital, admin), and a web admin dashboard.",
        caseStudy: {
          problem: "In Cameroon, finding a compatible blood donor in an emergency relies entirely on word of mouth and phone calls - a process that loses critical minutes when minutes matter.",
          process: "Designed a matching algorithm by blood type, urgency level and donor proximity. BullMQ async queues with priority lanes ensure no request is dropped during demand spikes. Firebase Cloud Messaging handles cross-platform push delivery. JWT + role-based access separates donor, hospital and admin flows.",
          solution: "A mobile app where hospitals post urgent requests and compatible donors receive an instant push notification. Geolocation narrows the match radius. Admins monitor the coordination in real time from a web dashboard.",
          results: ["Recognized at the Orange Innovation Challenge Cameroon (OIC Finalist)", "BullMQ queues absorb demand spikes without dropped events", "Cross-platform push delivery on Android and iOS via Firebase"],
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
          problem: "IUC had no structured mentorship system between alumni and new students - everything was done manually.",
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
      '09': {
        tagline: "Multi-tenant restaurant SaaS with analytical AI copilot, native Tool Use and real-time ordering.",
        description: "SaaS platform for African restaurants: admin dashboard, QR code client menu, real-time kitchen interface. The core: Console IQ - a Cohere Command R+ AI copilot with Two-Pass pipeline, native Tool Use (query_database, execute_manager_action, search_dish_images), real-time snapshot injected into every preamble, and 6 dynamically generated UI widgets (ChatChart, StockAlert, SmartActions, StrategyInsight, MenuForm, DecisionTool). Microservices architecture (9 services), multi-level Redis cache, Electron desktop, AI freemium model.",
        caseStudy: {
          problem: "African restaurants manage menus, orders and kitchen operations with fragmented tools - no centralised analytics or operational intelligence.",
          process: "Two-Pass pipeline: Pass 1 (Cohere selects tools), tenant-whitelisted SQL execution, Pass 2 (SSE-streamed response with injected results). Real-time snapshot (revenue, low stock, top dish) injected into every preamble. Strict security: 6 whitelisted tables, automatic tenant injection, per-role rate limiting.",
          solution: "Console IQ (admin): analytical copilot that reads and writes the DB via Tool Use, generating 6 custom UI widget types. Menu Researcher: multi-source synthesis (Reddit, Wikidata, OpenFoodFacts + African database) with reliability labels. Personalised client recommendations based on order history.",
          results: ["Two-Pass pipeline + native Tool Use", "6 AI-generated UI widgets", "Multi-source Menu Researcher", "Real-time DB snapshot"],
        },
      },
    },
    meta: {
      '01': { badge: "Enterprise architecture", metrics: ["+40% operational efficiency", "Secure RBAC modules"] },
      '02': { badge: "Social impact · OIC Finalist", metrics: ["React Native mobile app", "BullMQ async queues"] },
      '03': { badge: "Full-stack ecosystem", metrics: ["Web + API + Mobile", "End-to-end TypeScript"] },
      '04': { badge: "Artificial intelligence", metrics: ["Agricultural ML prediction", "Optimized recommendations"] },
      '05': { badge: "High-availability API", metrics: ["Integrated Redis cache", "Automated PDF import"] },
      '06': { badge: "REST API", metrics: ["Secure JWT auth", "Roles and permissions"] },
      '07': { badge: "Business app", metrics: ["Multi-site management", "Automated workflow"] },
      '08': { badge: "Desktop business tool", metrics: ["PDF and Excel export", "Zustand state"] },
      '09': { badge: "AI SaaS · Flagship project", metrics: ["Two-Pass pipeline + Tool Use", "9 microservices · Redis cache"] },
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
        title: 'Automation',
        description: 'I replace Excel files, notebooks and WhatsApp with centralized digital processes: zero duplicate data entry, zero lost information.',
      },
      {
        title: 'Business apps & SaaS',
        description: 'From idea to delivered product: management, orders, inventory, POS, invoicing, dashboards, and everything that runs your business.',
      },
      {
        title: 'AI & LLM Integrations',
        description: 'I add intelligence to your apps: prediction, automated assistants, classification and recommendations powered by your own data.',
      },
      {
        title: 'Mobile applications',
        description: 'Android and iOS apps with React Native, built around the real needs of field users.',
      },
      {
        title: 'Backend & APIs',
        description: 'Robust APIs, secure authentication, databases, real-time features and third-party service integrations.',
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
        description: "SIMS BTP Holdings. Internal process automation, business app development to replace manual workflows, IT strategy consulting and company website creation.",
      },
      {
        years: '2025',
        title: 'Co-founder & CTO - SparkNest',
        description: "Co-founded a digital solutions collective based in Douala. Design and development of custom web, mobile and desktop applications for Cameroonian SMBs.",
      },
      {
        years: '2026',
        title: 'VitaSang - OIC Finalist',
        description: "Blood donation coordination mobile app recognised at the Orange Innovation Challenge Cameroon.",
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

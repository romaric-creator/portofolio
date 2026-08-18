export const PROFILE = {
  fullName: "Tenda Boupda Christian Romaric",
  professionalTitle: "Développeur Full-Stack Passionné",
  location: "Douala, Cameroun",
  github: "github.com/romaric-creator",
  email: "christiantendainfo2006@gmail.com",
  phone: "+237 678261699",
  education: "BTS Génie Logiciel — Institut Universitaire de la Côte (IUC), Douala",
  status: "Développeur Full Stack avec 4 ans d'expérience, spécialisé dans la création d'applications web et mobiles modernes.",
  heroPhrase: "Je transforme les idées en solutions numériques efficaces et intuitives.",
  tagline: "Autonome, rigoureux et capable de travailler en équipe, je construis des systèmes web et mobiles haute performance.",
  linkedin: "https://cm.linkedin.com/in/christian-tenda-5a3529354",
  stats: {
    exp: "4+",
    projects: "15+"
  },
  languages: ["Français (Courant)", "Anglais (Débutant)"]
};

export const TECH_STACK = {
  "Frontend": ["React JS", "JavaScript", "CSS/Tailwind", "HTML5", "Next.js"],
  "Mobile": ["React Native", "Firebase", "Expo", "PWA"],
  "Backend": ["Node.js", "PHP", "Express.js", "MySQL", "Sequelize", "Redis"],
  "Outils": ["Git/GitHub", "VS Code", "npm", "Docker", "Postman"],
  "Centres d'intérêt": ["Technologie", "Musique", "Sport"]
};

export const PROJECTS = [
  {
    id: "01",
    name: "GLOBEApp",
    tagline: "Application de gestion commerciale et comptabilité pour résidences, hôtels, restaurants et PME.",
    description: "Système complet avec modules hôtel (réservations, check-in/out), bar/restaurant (commandes, workflow cuisine), ventes & caisse, comptabilité en partie double, gestion du personnel et rapports. Architecture Docker multi-services avec RBAC et transactions sécurisées.",
    stack: ["React 19", "NestJS", "PostgreSQL", "Redis", "Prisma", "Docker", "Ant Design"],
    links: {
      github: "github.com/romaric-creator/GLOBEApp",
      live: null
    },
    visualPlaceholder: "gradient-vitasang"
  },
  {
    id: "02",
    name: "VitaSang",
    tagline: "Plateforme mobile de coordination du don de sang au Cameroun.",
    description: "Application mobile complète permettant la mise en relation entre donneurs de sang, hôpitaux et administration. Files d'attente asynchrones, notifications push, tableau de bord admin.",
    stack: ["React Native", "Expo", "Node.js", "Express", "MySQL", "Redis", "BullMQ"],
    links: {
      github: null,
      live: null
    },
    visualPlaceholder: "gradient-flexystore"
  },
  {
    id: "03",
    name: "Sparknest",
    tagline: "Plateforme collaborative full-stack avec application mobile.",
    description: "Écosystème complet : site web, API backend et application mobile. Architecture TypeScript end-to-end, gestion d'utilisateurs, système de collaboration.",
    stack: ["React", "TypeScript", "React Native", "Node.js", "Express"],
    links: {
      github: "github.com/romaric-creator/sparknest",
      live: null
    },
    visualPlaceholder: "gradient-vitasang"
  },
  {
    id: "04",
    name: "AgrisIA",
    tagline: "IA de prédiction du rendement agricole.",
    description: "Système Machine Learning qui prédit le rendement agricole (tonnes/hectare) et recommande des améliorations pour maximiser la production.",
    stack: ["Python", "Jupyter", "Scikit-learn", "Pandas", "NumPy"],
    links: {
      github: "github.com/romaric-creator/AgrisIa",
      live: null
    },
    visualPlaceholder: "gradient-flexystore"
  },
  {
    id: "05",
    name: "Mentor-X",
    tagline: "API de parrainage et réseau social universitaire (IUC).",
    description: "Backend complet pour une plateforme de mentorat étudiant : attribution automatique parrain/filleul, import PDF des listes de classe, fil d'actualités avec posts/commentaires/likes, cache Redis, documentation Swagger et gestion multi-campus.",
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "Redis", "Cloudinary", "Swagger"],
    links: {
      github: "github.com/romaric-creator/Mentor-X-backend",
      live: null
    },
    visualPlaceholder: "gradient-flexystore"
  },
  {
    id: "06",
    name: "Taskly — API REST",
    tagline: "API haute performance de gestion de projets en équipe.",
    description: "API REST TypeScript pour la gestion collaborative de projets et de tâches. Authentification JWT, rôles, endpoints RESTful documentés.",
    stack: ["TypeScript", "Node.js", "Express", "MySQL", "JWT"],
    links: {
      github: "github.com/romaric-creator/Taskly",
      live: null
    },
    visualPlaceholder: "gradient-vitasang"
  },
  {
    id: "07",
    name: "SafeDriving",
    tagline: "Système de gestion complet pour auto-école (desktop).",
    description: "Application desktop Electron pour la gestion d'une auto-école multi-sites : inscriptions, paiements, présences, planning moniteurs, suivi des apprenants. Architecture client/serveur avec API REST NestJS et base MySQL.",
    stack: ["React", "TypeScript", "Electron", "NestJS", "MySQL", "TypeORM", "Tailwind"],
    links: {
      github: null,
      live: null
    },
    visualPlaceholder: "gradient-flexystore"
  },
  {
    id: "08",
    name: "TechFlow",
    tagline: "Application desktop de gestion de maintenance informatique.",
    description: "Logiciel Electron pour ateliers de réparation : réception d'appareils, tickets de maintenance, facturation PDF, gestion clients, rapports et inventaire. State management avec Zustand, export Excel.",
    stack: ["React", "TypeScript", "Electron", "Prisma", "Zustand", "Tailwind", "React PDF"],
    links: {
      github: null,
      live: null
    },
    visualPlaceholder: "gradient-vitasang"
  }
];

export const TIMELINE_EVENTS = [
  {
    years: "2024 – 2026",
    title: "BTS Génie Logiciel",
    description: "Institut Universitaire de la Côte (IUC), Douala."
  },
  {
    years: "2023 – 2024",
    title: "Baccalauréat TI (Technologies de l'Information)",
    description: "Collège Evangélique de New Bell."
  },
  {
    years: "2022 – 2026",
    title: "Développeur Freelance",
    description: "Réalisation de divers projets web et mobiles pour des clients locaux et internationaux."
  }
];

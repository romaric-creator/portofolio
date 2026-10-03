import type { Translations } from './types';

export const fr: Translations = {
  skipToContent: 'Aller au contenu',
  backToTop: 'Retour en haut',

  nav: {
    links: {
      projects: 'Travaux',
      skills: 'Compétences',
      services: 'Services',
      about: 'À propos',
      contact: 'Contact',
    },
    cta: 'Démarrer',
    ctaFull: 'Démarrer un projet',
  },

  hero: {
    available: 'Disponible pour missions',
    headingLines: [
      'Je transforme les',
      'processus métier',
      'en logiciels simples',
      'et efficaces.',
    ],
    subtitle: "Je conçois et développe des solutions digitales pour les PME, startups et entrepreneurs, de l'idée jusqu'à la mise en production.",
    ctaPrimary: 'Démarrer un projet',
    ctaSecondary: 'Voir mes travaux',
    statExpLabel: "ans d'expérience",
    statProjectsLabel: 'produits livrés',
    platformsLabel: 'plateformes',
    scrollLabel: 'Scroll',
  },

  marquee: {
    items: [
      'Applications métier', 'SaaS', 'Automatisation',
      'React', 'Node.js', 'TypeScript', 'React Native',
      'Electron', 'Web', 'Mobile', 'Desktop', 'Backend',
    ],
  },

  projects: {
    sectionLabel: 'Travaux sélectionnés',
    heading: "Ce que j'ai conçu",
    headingEm: 'et livré.',
    close: 'Fermer',
    viewProject: 'Voir le projet',
    view: 'Voir',
    demoLive: 'Demo live',
    caseStudySections: {
      problem: 'Le problème',
      approach: "L'approche",
      solution: 'La solution',
      results: 'Résultats',
    },
    items: {
      '01': {
        tagline: "Application de gestion commerciale et comptabilité pour résidences, hôtels, restaurants et PME.",
        description: "Système complet avec modules hôtel (réservations, check-in/out), bar/restaurant (commandes, workflow cuisine), ventes & caisse, comptabilité en partie double, gestion du personnel et rapports. Architecture Docker multi-services avec RBAC et transactions sécurisées.",
        caseStudy: {
          problem: "Les hôtels et restaurants de Douala géraient réservations, commandes et comptabilité sur papier ou Excel, causant erreurs et pertes.",
          process: "Conception modulaire : chaque métier (hôtel, restaurant, caisse, compta) est un module indépendant avec son propre RBAC. Architecture Docker pour isoler les services.",
          solution: "Plateforme unifiée couvrant tout le cycle : réservation → check-in → commande → facturation → comptabilité en partie double.",
          results: ["+40% d'efficacité opérationnelle", "Zéro double saisie", "Rapports temps réel"],
        },
      },
      '02': {
        tagline: "Plateforme mobile de coordination du don de sang au Cameroun.",
        description: "Application mobile complète permettant la mise en relation entre donneurs de sang, hôpitaux et administration. Files d'attente asynchrones, notifications push, tableau de bord admin.",
        caseStudy: {
          problem: "Au Cameroun, trouver un donneur de sang compatible en urgence repose sur le bouche-à-oreille, retardant les transfusions vitales.",
          process: "Mise en place d'un système de matching donneur/receveur par groupe sanguin avec files d'attente BullMQ pour gérer les pics de demande.",
          solution: "App mobile connectant donneurs, hôpitaux et administration avec notifications push en temps réel et géolocalisation.",
          results: ["Coordination don de sang", "Notifications temps réel", "Tableau de bord admin"],
        },
      },
      '03': {
        tagline: "Plateforme collaborative full-stack avec application mobile.",
        description: "Écosystème complet : site web, API backend et application mobile. Architecture TypeScript end-to-end, gestion d'utilisateurs, système de collaboration.",
      },
      '04': {
        tagline: "IA de prédiction du rendement agricole.",
        description: "Système Machine Learning qui prédit le rendement agricole (tonnes/hectare) et recommande des améliorations pour maximiser la production.",
      },
      '05': {
        tagline: "API de parrainage et réseau social universitaire (IUC).",
        description: "Backend complet pour une plateforme de mentorat étudiant : attribution automatique parrain/filleul, import PDF des listes de classe, fil d'actualités avec posts/commentaires/likes, cache Redis, documentation Swagger et gestion multi-campus.",
        caseStudy: {
          problem: "L'IUC n'avait aucun système structuré de parrainage entre anciens et nouveaux étudiants, tout se faisait manuellement.",
          process: "Algorithme d'attribution automatique parrain/filleul basé sur la filière et le campus, avec import PDF des listes de classe.",
          solution: "API REST complète avec fil d'actualités social, cache Redis pour la performance, et documentation Swagger.",
          results: ["Attribution automatisée", "Import PDF des listes", "Cache Redis intégré"],
        },
      },
      '06': {
        tagline: "API haute performance de gestion de projets en équipe.",
        description: "API REST TypeScript pour la gestion collaborative de projets et de tâches. Authentification JWT, rôles, endpoints RESTful documentés.",
      },
      '07': {
        tagline: "Système de gestion complet pour auto-école (desktop).",
        description: "Application desktop Electron pour la gestion d'une auto-école multi-sites : inscriptions, paiements, présences, planning moniteurs, suivi des apprenants. Architecture client/serveur avec API REST NestJS et base MySQL.",
        caseStudy: {
          problem: "L'auto-école gérait inscriptions, paiements et planning sur papier à travers plusieurs sites, sans vue d'ensemble.",
          process: "Architecture client/serveur Electron + NestJS permettant une utilisation hors-ligne avec synchronisation.",
          solution: "Application desktop complète : inscriptions, paiements, présences, planning moniteurs, suivi apprenants multi-sites.",
          results: ["Gestion multi-sites", "Workflow automatisé", "Synchronisation hors-ligne"],
        },
      },
      '08': {
        tagline: "Application desktop de gestion de maintenance informatique.",
        description: "Logiciel Electron pour ateliers de réparation : réception d'appareils, tickets de maintenance, facturation PDF, gestion clients, rapports et inventaire. State management avec Zustand, export Excel.",
        caseStudy: {
          problem: "Les ateliers de réparation informatique suivaient les tickets et la facturation manuellement, sans historique client.",
          process: "State management Zustand pour la réactivité, Prisma pour la base de données, React PDF pour la facturation automatisée.",
          solution: "Logiciel desktop complet : réception, tickets, facturation PDF, gestion clients, rapports et inventaire.",
          results: ["Export PDF et Excel", "Historique client complet", "Gestion d'inventaire"],
        },
      },
    },
    meta: {
      '01': { badge: "Architecture d'entreprise", metrics: ["+40% efficacité opérationnelle", "Modules RBAC sécurisés"] },
      '02': { badge: "Impact social", metrics: ["Coordination don de sang", "Notifications temps réel"] },
      '03': { badge: "Plateforme collaborative", metrics: ["TypeScript end-to-end", "Multi-plateforme"] },
      '04': { badge: "Intelligence artificielle", metrics: ["Prédiction ML agricole", "Recommandations optimisées"] },
      '05': { badge: "API haute disponibilité", metrics: ["Cache Redis intégré", "Import PDF automatisé"] },
      '06': { badge: "API REST", metrics: ["Auth JWT sécurisée", "Rôles et permissions"] },
      '07': { badge: "Application métier", metrics: ["Gestion multi-sites", "Workflow automatisé"] },
      '08': { badge: "Outil métier desktop", metrics: ["Export PDF et Excel", "State Zustand"] },
    },
  },

  stack: {
    sectionLabel: 'Compétences',
    heading: 'Les outils que',
    headingEm: 'je maîtrise.',
    categories: [
      { category: 'Frontend & Mobile', description: 'Interfaces réactives, accessibles et performantes' },
      { category: 'Backend & API', description: 'Systèmes robustes, scalables, sécurisés' },
      { category: 'Données & Infrastructure', description: 'Persistence fiable, performances optimisées' },
      { category: 'Qualité & Outillage', description: 'Code maintenable, livraisons maîtrisées' },
    ],
  },

  services: {
    sectionLabel: 'Comment je peux vous aider',
    heading: 'Des solutions pour',
    headingEm: 'chaque besoin.',
    items: [
      {
        title: 'Applications métier',
        description: 'Applications adaptées aux processus spécifiques de votre entreprise : gestion, commandes, stocks, clients, opérations et tableaux de bord.',
      },
      {
        title: 'SaaS & MVP',
        description: "De l'idée au produit fonctionnel : architecture, interface, backend, base de données, authentification et déploiement.",
      },
      {
        title: 'Automatisation',
        description: 'Remplacement des tâches manuelles et workflows dispersés par des processus numériques centralisés et fiables.',
      },
      {
        title: 'Applications mobiles',
        description: 'Applications Android et iOS avec React Native, conçues autour des besoins réels des utilisateurs.',
      },
      {
        title: 'Backend & Intégrations',
        description: "APIs, systèmes d'authentification, bases de données, temps réel et intégration de services tiers.",
      },
    ],
  },

  process: {
    sectionLabel: 'Mon processus',
    heading: 'Comment',
    headingEm: 'je travaille.',
    description: "Un processus clair pour réduire l'incertitude et livrer un produit qui correspond à vos attentes.",
    steps: [
      { title: 'Découverte', description: 'Nous définissons ensemble le problème, les objectifs et les contraintes de votre projet.' },
      { title: 'Planification', description: 'Architecture, fonctionnalités, roadmap et estimation claire avant de coder.' },
      { title: 'Développement', description: 'Développement itératif avec démonstrations régulières pour valider chaque étape.' },
      { title: 'Livraison', description: 'Tests, déploiement et documentation pour une mise en production sereine.' },
      { title: 'Support', description: 'Maintenance, corrections et évolutions du produit après la livraison.' },
    ],
  },

  about: {
    sectionLabel: 'À propos',
    headingLine1: 'Je transforme des besoins concrets',
    headingLine2: 'en outils',
    headingEm: 'numériques fonctionnels.',
    bio: "Développeur Full-Stack basé à Douala, j'interviens sur l'ensemble du cycle de développement : interfaces, API, bases de données, déploiement. J'aime particulièrement remplacer des processus manuels par des outils simples, structurés et exploitables.",
    metaLabels: {
      domains: 'Domaines',
      experience: 'Expérience',
      languages: 'Langues',
    },
    metaValues: {
      domains: 'Web · Mobile · Desktop · Backend',
      expUnit: 'ans',
      projectsUnit: 'projets livrés',
      languages: 'Français · Anglais',
    },
    badges: {
      available: 'Disponible',
    },
  },

  timeline: {
    sectionLabel: 'Parcours',
    heading: "L'évolution d'un",
    headingEm: 'concepteur passionné.',
    events: [
      {
        years: 'Juin – Août 2026',
        title: 'Stage Consultant IT',
        description: "Simis BTP Holding. Automatisation des processus internes, développement d'applications métier pour remplacer les workflows manuels, conseil en stratégie IT et création du site web de l'entreprise.",
      },
      {
        years: '2022 – 2026',
        title: 'Développeur Freelance',
        description: "Conception et développement d'applications web, mobiles et desktop pour des PME, startups et entrepreneurs.",
      },
    ],
  },

  contact: {
    sectionLabel: 'Contact',
    headingLines: ['Un projet ?', 'Parlons-en.'],
    subtitle: 'Décrivez votre besoin et je vous recontacte sous 24h pour en discuter.',
    form: {
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      email: 'Email',
      emailPlaceholder: 'votre@email.com',
      company: 'Entreprise / Projet',
      companyPlaceholder: 'Nom de votre entreprise ou projet',
      projectType: 'Type de projet',
      projectTypePlaceholder: 'Sélectionner...',
      message: 'Description du projet',
      messagePlaceholder: 'Décrivez votre besoin, vos objectifs et vos contraintes...',
      submit: 'Envoyer ma demande',
      disclaimer: 'Le formulaire ouvre WhatsApp avec votre message. Vous pouvez aussi me contacter par email.',
    },
    projectTypes: [
      'Application métier',
      'SaaS / MVP',
      'Application mobile',
      'Automatisation',
      'API / Backend',
      'Autre',
    ],
    labels: {
      email: 'Email',
      location: 'Localisation',
      socials: 'Réseaux',
    },
    whatsapp: {
      name: 'Nom',
      email: 'Email',
      company: 'Entreprise',
      type: 'Type',
    },
  },

  footer: {
    tagline: 'Full-Stack Developer basé à Douala. Disponible pour missions et collaborations internationales.',
    columns: {
      correspondence: 'Correspondance',
      socials: 'Réseaux',
    },
    bottomBar: 'Douala, Cameroon · Portfolio v3',
  },

  text3d: {
    lines: ['Je transforme', 'les processus', 'metier en', 'logiciels', 'simples.'],
  },

  profile: {
    availability: 'Working remotely with clients worldwide',
  },
};

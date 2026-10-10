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
      gallery: 'Galerie',
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
    subtitle: "Je construis des logiciels de gestion, des SaaS et des outils avec de l'IA pour aider les PME à mieux travailler.",
    ctaPrimary: 'Démarrer un projet',
    ctaSecondary: 'Voir mes travaux',
    statExpLabel: "ans d'expérience",
    statProjectsLabel: 'produits livrés',
    platformsLabel: 'plateformes',
    scrollLabel: 'Scroll',
  },

  marquee: {
    items: [
      'Applications métier', 'SaaS', 'Automatisation', 'Intégration IA',
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
    filterAll: 'Tout',
    flagship: 'Projet phare',
    statusLabels: {
      production:    'En production',
      delivered:     'Livré',
      'in-progress': 'En cours',
      prototype:     'Prototype',
    },
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
          problem: "Les hôtels et restaurants de Douala géraient réservations, commandes et comptabilité sur papier ou Excel. Aucune donnée partagée entre modules, pas de piste d'audit, des doubles saisies à répétition.",
          process: "Chaque métier (hôtel, restaurant, caisse, compta) est un service isolé avec son propre RBAC, déployé via Docker Compose pour un scaling indépendant. Moteur de comptabilité en partie double développé from scratch avec garanties d'intégrité transactionnelle. Workflow événementiel entre modules : réservation → check-in → commande → facturation → écriture comptable.",
          solution: "Une seule plateforme couvre l'intégralité du cycle opérationnel. Chaque équipe travaille dans son module, les managers obtiennent une vue consolidée. Zéro réconciliation manuelle entre systèmes.",
          results: ["+40% d'efficacité opérationnelle mesurée sur site", "Zéro double saisie entre modules", "Rapports financiers temps réel remplaçant les totaux manuels de fin de journée"],
        },
      },
      '02': {
        tagline: "Plateforme mobile de coordination du don de sang au Cameroun.",
        description: "Application mobile complète (React Native + Expo) connectant donneurs, hôpitaux et administration. Files d'attente BullMQ avec lanes prioritaires, notifications push Firebase, matching géolocalisé, auth JWT multi-rôles (donneur, hôpital, admin) et dashboard web admin.",
        caseStudy: {
          problem: "Au Cameroun, trouver un donneur de sang compatible en urgence repose entièrement sur le bouche-à-oreille et les appels téléphoniques. Un processus qui perd des minutes critiques quand chaque minute compte.",
          process: "Algorithme de matching par groupe sanguin, niveau d'urgence et proximité du donneur. Files d'attente BullMQ avec lanes prioritaires pour qu'aucune demande ne soit perdue lors des pics. Firebase Cloud Messaging gère la livraison push cross-platform. JWT + accès par rôle sépare les flux donneur, hôpital et admin.",
          solution: "Une app mobile où les hôpitaux publient les urgences et les donneurs compatibles reçoivent une notification instantanée. La géolocalisation affine le rayon de match. Les admins coordonnent en temps réel depuis un dashboard web.",
          results: ["Reconnu au Orange Innovation Challenge Cameroun (Finaliste OIC)", "Les files BullMQ absorbent les pics de demande sans perte d'événement", "Livraison push cross-platform Android et iOS via Firebase"],
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
      '09': {
        tagline: "SaaS restaurant multi-tenant avec copilote IA analytique, Tool Use natif et commandes temps réel.",
        description: "Plateforme SaaS pour restaurants africains : dashboard admin, menu client QR, interface cuisine. Le cœur : Console IQ, copilote IA Cohere Command R+ avec pipeline Two-Pass, Tool Use natif (query_database, execute_manager_action, search_dish_images), snapshot temps réel injecté dans chaque preamble et 6 widgets UI générés dynamiquement (ChatChart, StockAlert, SmartActions, StrategyInsight, MenuForm, DecisionTool). Architecture microservices (9 services), cache Redis multi-niveau, Electron desktop, freemium IA.",
        caseStudy: {
          problem: "Les restaurants africains gèrent menus, commandes et cuisine avec des outils fragmentés, sans analytics centralisées ni intelligence opérationnelle.",
          process: "Pipeline Two-Pass : Pass 1 (Cohere sélectionne les outils), exécution SQL whitelistée par tenant, Pass 2 (réponse streamée SSE avec résultats injectés). Snapshot temps réel (CA, stock critique, meilleur plat) injecté dans chaque preamble. Sécurité stricte : 6 tables whitelistées, injection tenant automatique, rate limiting par rôle.",
          solution: "Console IQ (admin) : copilote analytique qui lit et écrit la BDD via Tool Use, génère 6 types de widgets UI custom. Menu Researcher : synthèse multi-source (Reddit, Wikidata, OpenFoodFacts + base africaine) avec labels de fiabilité. Recommandations client personnalisées basées sur l'historique.",
          results: ["Pipeline Two-Pass + Tool Use natif", "6 widgets UI générés par l'IA", "Menu Researcher multi-source", "Snapshot BDD temps réel"],
        },
      },
    },
    meta: {
      '01': { badge: "Architecture d'entreprise", metrics: ["+40% efficacité opérationnelle", "Modules RBAC sécurisés"] },
      '02': { badge: "Impact social · Finaliste OIC", metrics: ["App mobile React Native", "Files asynchrones BullMQ"] },
      '03': { badge: "Écosystème full-stack", metrics: ["Web + API + Mobile", "TypeScript end-to-end"] },
      '04': { badge: "Intelligence artificielle", metrics: ["Prédiction ML agricole", "Recommandations optimisées"] },
      '05': { badge: "API haute disponibilité", metrics: ["Cache Redis intégré", "Import PDF automatisé"] },
      '06': { badge: "API REST", metrics: ["Auth JWT sécurisée", "Rôles et permissions"] },
      '07': { badge: "Application métier", metrics: ["Gestion multi-sites", "Workflow automatisé"] },
      '08': { badge: "Outil métier desktop", metrics: ["Export PDF et Excel", "State Zustand"] },
      '09': { badge: "SaaS IA · Projet phare", metrics: ["Pipeline Two-Pass + Tool Use", "9 microservices, cache Redis"] },
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
        title: 'Automatisation',
        description: "Je remplace Excel, les cahiers et les WhatsApp par des processus numériques centralisés : zéro double saisie, zéro perte d'information.",
      },
      {
        title: 'Applications métier & SaaS',
        description: "De l'idée au produit livré : gestion, commandes, stocks, caisse, facturation, tableaux de bord, et tout ce qui fait tourner votre activité.",
      },
      {
        title: 'IA & Intégrations LLM',
        description: "J'intègre de l'intelligence dans vos applications : prédiction, assistant automatisé, classification et recommandations basées sur vos données.",
      },
      {
        title: 'Applications mobiles',
        description: 'Applications Android et iOS avec React Native, conçues autour des besoins réels des utilisateurs de terrain.',
      },
      {
        title: 'Backend & APIs',
        description: 'APIs robustes, authentification sécurisée, bases de données, temps réel et intégrations de services tiers.',
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
    bio: "Je suis développeur Full-Stack basé à Douala. Ces quatre dernières années, j'ai conçu des logiciels de gestion pour des PME camerounaises — des hôtels, des restaurants, des auto-écoles, des ateliers de réparation. Parmi mes projets récents : un SaaS restaurant avec un copilote IA intégré et une application mobile primée au concours Orange Innovation Challenge.",
    metaLabels: {
      domains: 'Domaines',
      experience: 'Expérience',
      languages: 'Langues',
    },
    metaValues: {
      domains: 'Web, Mobile, Desktop et Backend',
      expUnit: 'ans',
      projectsUnit: 'projets livrés',
      languages: 'Français et Anglais',
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
        title: 'Stage Consultant IT chez SIMS BTP Holdings',
        description: "J'ai automatisé des processus internes et conçu des outils pour remplacer leurs fichiers et workflows manuels. J'ai aussi conseillé sur la stratégie IT et créé le site web de l'entreprise.",
      },
      {
        years: '2026',
        title: 'VitaSang, finaliste Orange Innovation Challenge',
        description: "Application mobile qui connecte des donneurs de sang et des hôpitaux en situation d'urgence, reconnue parmi les meilleurs projets du concours Orange Innovation Challenge Cameroun.",
      },
      {
        years: '2025',
        title: 'Co-fondateur et CTO de SparkNest',
        description: "On a créé SparkNest pour concevoir des applications sur mesure pour les PME camerounaises. Je m'occupais de l'architecture technique et de la livraison des projets.",
      },
      {
        years: '2022 – 2026',
        title: 'Développeur Freelance',
        description: "Quatre ans de projets pour des PME, des startups et des entrepreneurs. J'ai conçu des logiciels pour des hôtels, des restaurants, des auto-écoles et des ateliers de réparation informatique.",
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

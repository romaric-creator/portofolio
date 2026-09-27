import { motion } from 'framer-motion';
import { Briefcase, Rocket, Repeat, Smartphone, Server } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    icon: Briefcase,
    title: 'Applications métier',
    description: 'Applications adaptées aux processus spécifiques de votre entreprise : gestion, commandes, stocks, clients, opérations et tableaux de bord.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'Docker'],
  },
  {
    num: '02',
    icon: Rocket,
    title: 'SaaS & MVP',
    description: "De l'idée au produit fonctionnel : architecture, interface, backend, base de données, authentification et déploiement.",
    stack: ['React', 'TypeScript', 'Node.js', 'Prisma'],
  },
  {
    num: '03',
    icon: Repeat,
    title: 'Automatisation',
    description: 'Remplacement des tâches manuelles et workflows dispersés par des processus numériques centralisés et fiables.',
    stack: ['Node.js', 'Express', 'Redis', 'BullMQ'],
  },
  {
    num: '04',
    icon: Smartphone,
    title: 'Applications mobiles',
    description: 'Applications Android et iOS avec React Native, conçues autour des besoins réels des utilisateurs.',
    stack: ['React Native', 'Expo', 'TypeScript'],
  },
  {
    num: '05',
    icon: Server,
    title: 'Backend & Intégrations',
    description: "APIs, systèmes d'authentification, bases de données, temps réel et intégration de services tiers.",
    stack: ['NestJS', 'Express', 'MySQL', 'WebSockets'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            Comment je peux vous aider
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3">
            Des solutions pour{' '}
            <em className="text-amber">chaque besoin.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-surface rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <Icon size={22} className="text-amber" />
                  <span className="font-code text-[13px] font-semibold text-amber">{s.num}</span>
                </div>

                <h3 className="font-display text-xl font-normal text-ink leading-tight">
                  {s.title}
                </h3>

                <p className="text-sand text-sm leading-relaxed flex-1">
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {s.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-code text-[9px] tracking-widest uppercase text-dust bg-canvas px-3 py-1.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

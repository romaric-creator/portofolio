import { motion } from 'framer-motion';
import { Monitor, Smartphone, Server, AppWindow } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    icon: Monitor,
    title: 'Applications Web',
    description: 'Plateformes SaaS, dashboards de gestion, sites d\'entreprise et interfaces React à fort trafic. Du prototype jusqu\'à la mise en production.',
    stack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    num: '02',
    icon: Smartphone,
    title: 'Applications Mobiles',
    description: 'Apps iOS & Android avec React Native et Expo. Expériences soignées et performances proches du natif.',
    stack: ['React Native', 'Expo'],
  },
  {
    num: '03',
    icon: Server,
    title: 'Backend & API',
    description: 'APIs RESTful robustes, bases de données relationnelles et documentaires, WebSockets, authentification JWT.',
    stack: ['Node.js', 'Express', 'MySQL', 'MongoDB'],
  },
  {
    num: '04',
    icon: AppWindow,
    title: 'Desktop & Automatisation',
    description: 'Applications bureau Electron, remplacement de workflows manuels par des outils numériques structurés et exploitables.',
    stack: ['Electron', 'TypeScript', 'SQL'],
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
          className="mb-14"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            Ce que je construis
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-normal text-ink mt-3">
            Quatre domaines,{' '}
            <em className="text-amber" style={{ fontStyle: 'italic' }}>une seule exigence.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-canvas hover:bg-surface transition-colors duration-300 p-8 flex flex-col gap-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <span className="font-code text-[11px] tracking-widest text-amber">{s.num}</span>
                  <Icon
                    size={20}
                    className="text-dust group-hover:text-amber group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-normal text-ink leading-tight">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sand text-sm leading-relaxed flex-1">
                  {s.description}
                </p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {s.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-code text-[9px] tracking-widest uppercase text-dust border border-line px-2.5 py-1"
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

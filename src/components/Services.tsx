import { motion } from 'framer-motion';
import { Briefcase, Rocket, Repeat, Smartphone, Server } from 'lucide-react';
import { useTranslation } from '../i18n';

const ICONS = [Briefcase, Rocket, Repeat, Smartphone, Server];
const STACKS = [
  ['React', 'NestJS', 'PostgreSQL', 'Docker'],
  ['React', 'TypeScript', 'Node.js', 'Prisma'],
  ['Node.js', 'Express', 'Redis', 'BullMQ'],
  ['React Native', 'Expo', 'TypeScript'],
  ['NestJS', 'Express', 'MySQL', 'WebSockets'],
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-14 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            {t.services.sectionLabel}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3 leading-[1.05] tracking-[-0.02em]">
            {t.services.heading}{' '}
            <em className="text-amber">{t.services.headingEm}</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i];
            const stack = STACKS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-surface rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <Icon size={22} className="text-amber" />
                  <span className="font-code text-[13px] font-semibold text-amber">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-xl font-normal text-ink leading-tight">
                  {service.title}
                </h3>

                <p className="text-sand text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {stack.map((tech) => (
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

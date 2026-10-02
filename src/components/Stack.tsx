import { motion } from 'framer-motion';
import {
  SiReact, SiTypescript, SiTailwindcss, SiFramer, SiExpo,
  SiNodedotjs, SiNestjs, SiExpress, SiJsonwebtokens, SiSocketdotio,
  SiPostgresql, SiMysql, SiRedis, SiPrisma, SiDocker, SiSequelize,
  SiGithub, SiGitlab, SiEslint, SiElectron, SiSwagger, SiPostman,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { STACK_EXPERTISE } from '../data/projects';

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const ICONS: Record<string, IconComponent> = {
  'React / React Native': SiReact,
  'TypeScript':           SiTypescript,
  'Tailwind CSS':         SiTailwindcss,
  'Framer Motion':        SiFramer,
  'Expo':                 SiExpo,
  'Node.js':              SiNodedotjs,
  'NestJS':               SiNestjs,
  'Express':              SiExpress,
  'REST / JWT Auth':      SiJsonwebtokens,
  'WebSockets':           SiSocketdotio,
  'PostgreSQL':           SiPostgresql,
  'MySQL':                SiMysql,
  'Redis':                SiRedis,
  'Prisma':               SiPrisma,
  'Docker':               SiDocker,
  'Sequelize':            SiSequelize,
  'Git / GitHub':         SiGithub,
  'GitLab CI/CD':         SiGitlab,
  'ESLint / Prettier':    SiEslint,
  'Electron':             SiElectron,
  'Swagger':              SiSwagger,
  'Postman':              SiPostman,
  'VS Code':              VscVscode,
};


export default function Stack() {
  return (
    <section id="stack" className="py-28 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            Technologies
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3">
            Les outils que{' '}
            <em className="text-amber">je maîtrise.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {STACK_EXPERTISE.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-surface rounded-2xl p-7"
            >
              <div className="mb-5">
                <span className="font-code text-[9px] tracking-widest uppercase text-amber">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl font-normal text-ink mt-1">{cat.category}</h3>
                <p className="font-body text-[13px] text-dust mt-1">{cat.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => {
                  const Icon = ICONS[skill.name];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.88, y: 8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ delay: i * 0.06 + j * 0.04, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="inline-flex items-center gap-2.5 bg-canvas px-4 py-2.5 rounded-full"
                    >
                      {Icon && <Icon size={16} className="text-ink opacity-60 flex-shrink-0" />}
                      <span className="font-body text-[13px] font-medium text-ink leading-none">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import {
  SiReact, SiTypescript, SiTailwindcss, SiFramer, SiExpo,
  SiNodedotjs, SiNestjs, SiExpress, SiJsonwebtokens, SiSocketdotio,
  SiPostgresql, SiMysql, SiRedis, SiPrisma, SiDocker, SiSequelize,
  SiGithub, SiGitlab, SiEslint, SiElectron, SiSwagger, SiPostman,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { STACK_EXPERTISE } from '../data/projects';
import { useTranslation } from '../i18n';

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
  const { t } = useTranslation();

  return (
    <section id="stack" className="py-14 px-6" style={{ background: '#1e3a5f' }}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-white/50">
            {t.stack.sectionLabel}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-white mt-3 leading-[1.05] tracking-[-0.02em]">
            {t.stack.heading}{' '}
            <em className="text-amber">{t.stack.headingEm}</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {STACK_EXPERTISE.map((cat, i) => {
            const catTranslation = t.stack.categories[i];
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="mb-5">
                  <span className="font-code text-[9px] tracking-widest uppercase text-amber">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl font-normal text-white mt-1">
                    {catTranslation?.category ?? cat.category}
                  </h3>
                  <p className="font-body text-[13px] text-white/50 mt-1">
                    {catTranslation?.description ?? cat.description}
                  </p>
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
                        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                      >
                        {Icon && <Icon size={16} className="text-white/60 flex-shrink-0" />}
                        <span className="font-body text-[13px] font-medium text-white/90 leading-none">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

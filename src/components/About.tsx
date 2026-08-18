import { motion } from 'framer-motion';
import { PROFILE } from '../data/projects';

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const STATS = [
  { value: '4+',  label: "Années d'expérience" },
  { value: '15+', label: 'Projets livrés'       },
  { value: '2',   label: 'Plateformes : Web + Mobile' },
  { value: 'BTS', label: 'Génie Logiciel, IUC'  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <span className="inline-block text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            À propos
          </span>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4">
          <FadeUp delay={0.05}>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-ink leading-tight">
              Tenda Boupda Christian Romaric,<br />
              Développeur Full-Stack{' '}
              <span className="text-amber">basé à Douala</span>
            </h2>
            <p className="text-sand text-base mt-6 leading-relaxed">{PROFILE.status}</p>
            <p className="text-sand text-sm mt-4 leading-relaxed">
              <span className="text-ink font-semibold text-xs uppercase tracking-wide mr-2">Formation :</span>
              {PROFILE.education}
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              {PROFILE.languages.map((lang) => (
                <span
                  key={lang}
                  className="text-xs border border-line text-sand px-3 py-1.5 rounded-md font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-canvas border border-line p-6 rounded-lg hover:border-amber hover:shadow-sm transition-all group"
              >
                <span className="font-display text-3xl font-extrabold text-ink group-hover:text-amber transition-colors">
                  {s.value}
                </span>
                <p className="text-xs text-sand mt-2 leading-relaxed font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

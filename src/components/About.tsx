import { motion } from 'framer-motion';
import { MapPin, Wifi } from 'lucide-react';
import { PROFILE } from '../data/projects';

const profileImg = '/photo-christian-tenda.jpg';
const ease = [0.23, 1, 0.32, 1] as const;

const META = [
  { label: 'Formation',    value: 'BTS Génie Logiciel, IUC Douala' },
  { label: 'Domaines',     value: 'Web · Mobile · Desktop · Backend' },
  { label: 'Langues',      value: 'Français · Anglais' },
];

export default function About() {
  return (
    <section id="about" className="bg-canvas overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
          className="font-code text-[10px] tracking-[0.2em] uppercase text-dust pt-28 pb-10"
        >
          01 / Identité &amp; Démarche
        </motion.p>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 lg:gap-20 items-start">

          {/* Left — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-display font-normal text-ink leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Je transforme des besoins concrets
              <br className="hidden sm:block" /> en outils{' '}
              <em className="text-amber" style={{ fontStyle: 'italic' }}>
                numériques fonctionnels.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.14, ease }}
              className="text-sand text-base leading-relaxed mt-7 max-w-lg"
            >
              Développeur Full-Stack basé à Douala, j'interviens sur l'ensemble du cycle de développement : interfaces, API, bases de données, déploiement. J'aime particulièrement remplacer des processus manuels par des outils simples, structurés et exploitables.
            </motion.p>

            {/* Meta table */}
            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.22, ease }}
              className="mt-10 space-y-3"
            >
              {META.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[120px_1fr] items-baseline gap-4">
                  <dt className="font-code text-[9px] tracking-widest uppercase text-dust">{label}</dt>
                  <dd className="font-body text-sm text-ink">{value}</dd>
                </div>
              ))}
            </motion.dl>

            {/* Status chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="flex flex-wrap items-center gap-3 mt-10 pb-28"
            >
              <span className="inline-flex items-center gap-2 font-code text-[10px] tracking-widest uppercase text-amber bg-amber/10 border border-amber/25 px-3 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                Disponible
              </span>
              <span className="inline-flex items-center gap-2 font-code text-[10px] tracking-widest uppercase text-sand bg-surface border border-line px-3 py-2">
                <MapPin size={10} />
                Douala, Cameroun
              </span>
              <span className="inline-flex items-center gap-2 font-code text-[10px] tracking-widest uppercase text-sand bg-surface border border-line px-3 py-2">
                <Wifi size={10} />
                Remote &amp; On-site
              </span>
            </motion.div>
          </div>

          {/* Right — photo */}
          <div className="hidden lg:block relative pt-6 pl-6">
            {/* Photo */}
            <motion.div
              className="relative"
              style={{ marginTop: '1.5rem', marginLeft: '1.5rem' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <img
                src={profileImg}
                alt="Tenda Boupda Christian Romaric — Développeur Full-Stack"
                loading="lazy"
                className="w-full object-cover object-top"
                style={{
                  aspectRatio: '3/4',
                  filter: 'grayscale(10%) contrast(105%)',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* Name below */}
            <div className="mt-5 ml-6">
              <p className="font-display text-base font-normal text-ink">{PROFILE.fullName}</p>
              <p className="font-code text-[10px] tracking-widest uppercase text-dust mt-1">
                Développeur Full-Stack
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

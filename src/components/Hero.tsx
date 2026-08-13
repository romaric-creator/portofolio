import { motion } from 'framer-motion';
import { MapPin, ArrowDown, ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../data/projects';
import profileImg from '../assets/IMG-20260214-WA0033.jpg';

const ease = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-canvas overflow-hidden flex flex-col justify-center"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--color-line) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="inline-flex items-center gap-2 bg-amber/10 text-amber px-3 py-1.5 text-xs font-semibold tracking-wide rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                Disponible pour des projets
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.2rem] xl:text-[3.75rem] font-extrabold text-ink leading-[1.08]"
            >
              Je transforme les idées en{' '}
              <span className="text-amber">solutions numériques.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="text-sand text-base lg:text-lg leading-relaxed max-w-lg"
            >
              {PROFILE.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease }}
              className="flex flex-wrap items-center gap-8 py-5 border-y border-line"
            >
              <div>
                <span className="font-display text-3xl font-extrabold text-ink">{PROFILE.stats.exp}</span>
                <p className="text-xs text-sand font-medium mt-0.5">ans d'experience</p>
              </div>
              <div className="w-px h-8 bg-line hidden sm:block" />
              <div>
                <span className="font-display text-3xl font-extrabold text-ink">{PROFILE.stats.projects}</span>
                <p className="text-xs text-sand font-medium mt-0.5">projets livres</p>
              </div>
              <div className="w-px h-8 bg-line hidden sm:block" />
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-amber flex-shrink-0" />
                <span className="text-sand text-sm font-medium">{PROFILE.location}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-ink text-canvas px-7 py-3.5 font-display font-semibold text-sm rounded-lg hover:bg-amber transition-colors"
              >
                Voir mes projets
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-ink text-ink px-7 py-3.5 font-display font-semibold text-sm rounded-lg hover:border-amber hover:text-amber transition-colors"
              >
                Me contacter
              </a>
              <a
                href="/cv-christian-tenda.pdf"
                download
                className="inline-flex items-center gap-2 text-sand px-4 py-3.5 font-display font-semibold text-sm hover:text-amber transition-colors"
              >
                <Download size={16} />
                Mon CV
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-amber/5 rounded-2xl -z-10" />
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-[22rem] overflow-hidden rounded-xl border-2 border-line shadow-lg">
                <img
                  src={profileImg}
                  alt={PROFILE.fullName}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sand hover:text-amber transition-colors"
      >
        <span className="text-[11px] font-medium tracking-wide">Decouvrir</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}

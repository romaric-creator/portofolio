import { motion } from 'framer-motion';
import { MapPin, ArrowDown, ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../data/projects';
const profileImg = '/photo-christian-tenda.jpg';

const ease = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-canvas overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Desktop: photo a droite avec fondu */}
        <img
          src={profileImg}
          alt=""
          className="hidden sm:block absolute right-[10%] w-1/2 lg:w-2/5 h-[calc(100%-50px)] object-cover object-top"
          style={{
            top: '50px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 45%, black 55%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 45%, black 55%, transparent 80%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-20 relative">
        <div className="max-w-2xl flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="font-display text-sm sm:text-base font-semibold text-sand tracking-wide"
          >
            {PROFILE.fullName}
          </motion.p>

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
            className="text-sand text-base lg:text-lg leading-relaxed"
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
              <p className="text-xs text-sand font-medium mt-0.5">ans d'expérience</p>
            </div>
            <div className="w-px h-8 bg-line hidden sm:block" />
            <div>
              <span className="font-display text-3xl font-extrabold text-ink">{PROFILE.stats.projects}</span>
              <p className="text-xs text-sand font-medium mt-0.5">projets livrés</p>
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
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sand hover:text-amber transition-colors"
      >
        <span className="text-[11px] font-medium tracking-wide">Découvrir</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}

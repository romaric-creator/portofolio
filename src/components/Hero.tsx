import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import posthog from 'posthog-js';
import { PROFILE } from '../data/projects';

const ease = [0.23, 1, 0.32, 1] as const;
const TAGS = ['Applications métier', 'SaaS', 'Automatisation', 'Web', 'Mobile'];

function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const p = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ value, label }: { value: string; label: string }) {
  const num = parseInt(value);
  const hasNum = !isNaN(num);
  const suffix = hasNum ? value.replace(String(num), '') : '';
  const { count, ref } = useCounter(hasNum ? num : 0, 1200);

  return (
    <div className="flex flex-col gap-1">
      <span ref={ref} className="font-display text-3xl text-ink">
        {hasNum ? `${count}${suffix}` : value}
      </span>
      <span className="font-code text-[10px] tracking-widest uppercase text-dust">{label}</span>
    </div>
  );
}

export default function Hero() {
  const STATS = [
    { value: PROFILE.stats.exp,      label: "ans d'expérience" },
    { value: PROFILE.stats.projects, label: 'produits livrés'  },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-canvas flex flex-col overflow-hidden"
    >
      <div className="flex-1 flex flex-col max-w-7xl mx-auto px-6 w-full pt-28 lg:pt-32">

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="font-code text-[10px] tracking-[0.12em] uppercase text-dust bg-surface px-3.5 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="font-display font-normal leading-[1.06] text-ink mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
        >
          <span className="block">Je transforme les</span>
          <span className="block">processus métier</span>
          <span className="block text-amber" style={{ fontStyle: 'italic' }}>en logiciels</span>
          <span className="block text-amber" style={{ fontStyle: 'italic' }}>simples et efficaces.</span>
        </motion.h1>

        {/* Subtitle + CTA */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="text-sand text-lg leading-relaxed"
          >
            Je conçois et développe des solutions digitales pour les PME, startups et entrepreneurs, de l'idée jusqu'à la mise en production.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65, ease }}
            className="font-code text-[11px] tracking-[0.1em] uppercase text-dust mt-5"
          >
            Full-Stack Developer · {PROFILE.location} · {PROFILE.availability}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 bg-ink text-canvas font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-amber transition-colors duration-200"
            >
              Démarrer un projet
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-ink font-body font-medium text-sm px-6 py-3.5 rounded-full border border-line hover:border-amber hover:text-amber transition-all duration-200"
            >
              Voir mes travaux
            </a>
            <a
              href="/cv-christian-tenda.pdf"
              download
              onClick={() => posthog.capture('cv_downloaded')}
              className="inline-flex items-center gap-2 text-dust font-body text-sm hover:text-amber transition-colors"
            >
              <Download size={14} />
              CV
            </a>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="flex flex-wrap items-end gap-12 py-8 mb-4 border-t border-line"
        >
          {STATS.map((s, i) => (
            <StatItem key={i} value={s.value} label={s.label} />
          ))}
          <div className="flex flex-col gap-1">
            <span className="font-body text-sm font-medium text-ink">Web · Mobile · Desktop</span>
            <span className="font-code text-[10px] tracking-widest uppercase text-dust">plateformes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

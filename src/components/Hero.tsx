import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import posthog from 'posthog-js';
import { PROFILE } from '../data/projects';

function HeroVisual() {
  const shapes = [
    { w: 180, h: 180, x: 60, y: 40, delay: 0.9, rotate: 12 },
    { w: 120, h: 120, x: 220, y: 180, delay: 1.1, rotate: -8 },
    { w: 200, h: 80, x: 100, y: 300, delay: 1.3, rotate: 6 },
    { w: 80, h: 200, x: 320, y: 60, delay: 1.0, rotate: -15 },
    { w: 140, h: 140, x: 260, y: 280, delay: 1.2, rotate: 20 },
  ];

  return (
    <div className="w-full h-full relative">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rotate }}
          transition={{ duration: 1.2, delay: s.delay, ease: [0.23, 1, 0.32, 1] }}
          className="absolute border border-amber/20"
          style={{ width: s.w, height: s.h, left: s.x, top: s.y }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-amber) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute font-display text-amber/10 select-none pointer-events-none"
        style={{ fontSize: '12rem', right: 20, top: '50%', transform: 'translateY(-50%)', lineHeight: 1 }}
      >
        {'</>'}
      </motion.div>
    </div>
  );
}

const ease = [0.23, 1, 0.32, 1] as const;

const HEADLINE = [
  { text: 'Je conçois',        italic: false },
  { text: 'et développe',      italic: false },
  { text: 'des applications',  italic: true  },
  { text: 'concrètes.',        italic: true  },
];

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
    <div className="flex items-baseline gap-2.5">
      <span ref={ref} className="font-display text-2xl font-normal text-ink">
        {hasNum ? `${count}${suffix}` : value}
      </span>
      <span className="font-code text-[10px] tracking-widest uppercase text-dust">{label}</span>
    </div>
  );
}

export default function Hero() {
  const STATS = [
    { value: PROFILE.stats.exp,      label: 'ans d\'expérience' },
    { value: PROFILE.stats.projects, label: 'projets livrés'    },
    { value: 'Remote',               label: 'DLA ⇌ INT'         },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-canvas flex flex-col overflow-hidden"
    >
      {/* Top info strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between px-6 max-w-6xl mx-auto w-full pt-24 pb-6"
      >
        <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
          Développeur Full-Stack
        </span>
        <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
          Douala, Cameroun
        </span>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto px-6 w-full">

        {/* Headline + 3D */}
        <div className="relative flex-1 flex items-center">

          {/* Decorative visual */}
          <div
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2"
            style={{ width: 500, height: 460 }}
          >
            <HeroVisual />
          </div>

          {/* Headline — line by line */}
          <div className="relative z-10 py-12 max-w-[720px]">
            <h1
              className="font-display font-normal leading-[1.02] text-ink"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
            >
              {(() => {
                let charOffset = 0;
                return HEADLINE.map((line, i) => {
                  const lineDelay = 0.15 + i * 0.15;
                  const chars = line.text.split('');
                  const el = (
                    <span
                      key={i}
                      className={`block ${line.italic ? 'text-amber' : ''}`}
                      style={{ fontStyle: line.italic ? 'italic' : 'normal' }}
                    >
                      {chars.map((char, j) => (
                        <motion.span
                          key={j}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: lineDelay + j * 0.02,
                            ease,
                          }}
                          className="inline-block"
                          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  );
                  charOffset += chars.length;
                  return el;
                });
              })()}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62, ease }}
              className="text-sand text-base leading-relaxed max-w-sm mt-8"
            >
              Je transforme des besoins concrets en outils numériques fonctionnels : web, mobile, desktop et backend.
            </motion.p>
          </div>
        </div>

        {/* Bottom strip — stats + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center py-7"
        >
          {/* Stats with counters */}
          <div className="flex flex-wrap items-center gap-8">
            {STATS.map((s, i) => (
              <StatItem key={i} value={s.value} label={s.label} />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-ink text-canvas font-body font-semibold text-sm px-6 py-3 hover:bg-amber transition-colors duration-200"
            >
              Voir mes travaux
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="/cv-christian-tenda.pdf"
              download
              onClick={() => posthog.capture('cv_downloaded')}
              className="group inline-flex items-center gap-2 text-dust font-body text-sm hover:text-amber transition-colors"
            >
              <Download size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

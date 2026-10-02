import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import posthog from 'posthog-js';
import { PROFILE } from '../data/projects';

const ease = [0.23, 1, 0.32, 1] as const;

function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();

        const start = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);

          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);

          setCount(Math.round(eased * target));

          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          }
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { count, ref };
}

function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const match = value.match(/^(\d+)/);

  const number = match ? Number(match[1]) : null;
  const suffix = match ? value.slice(match[1].length) : '';

  const { count, ref } = useCounter(number ?? 0);

  return (
    <div className="group flex flex-col gap-1">
      <span
        ref={ref}
        className="font-display text-3xl leading-none text-ink transition-transform duration-300 group-hover:translate-y-[-2px]"
      >
        {number !== null ? `${count}${suffix}` : value}
      </span>

      <span className="font-code text-[10px] uppercase tracking-[0.16em] text-dust">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const STATS = [
    {
      value: PROFILE.stats.exp,
      label: "ans d'expérience",
    },
    {
      value: PROFILE.stats.projects,
      label: 'produits livrés',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-canvas"
    >
      {/* --------------------------------------------------
          BACKGROUND
      -------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main ambient light */}
        <div className="absolute -right-[15%] -top-[15%] h-[65vw] w-[65vw] max-h-[850px] max-w-[850px] rounded-full bg-[#eef7e0] opacity-70 blur-[100px]" />

        {/* Bottom ambient light */}
        <div className="absolute -bottom-[20%] -left-[10%] h-[45vw] w-[45vw] max-h-[600px] max-w-[600px] rounded-full bg-[#e6ebf0] opacity-50 blur-[100px]" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #111 1px, transparent 1px),
              linear-gradient(to bottom, #111 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Small ambient details */}
        <div className="absolute left-[8%] top-[30%] h-1.5 w-1.5 rounded-full bg-amber/40" />
        <div className="absolute right-[25%] top-[20%] h-2 w-2 rounded-full bg-ink/10" />
        <div className="absolute bottom-[20%] right-[10%] h-1.5 w-1.5 rounded-full bg-amber/30" />
      </div>

      {/* --------------------------------------------------
          MAIN CONTENT
      -------------------------------------------------- */}

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-8 pt-28 sm:px-8 lg:px-10 lg:pt-32">

        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

          {/* ------------------------------------------------
              LEFT
          ------------------------------------------------ */}

          <div className="flex flex-col">

            {/* Availability */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease,
              }}
              className="mb-7 flex w-fit items-center gap-2.5 rounded-full border border-amber/20 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>

              <span className="text-xs font-semibold text-[#5a8a18] sm:text-sm">
                Disponible pour missions
              </span>
            </motion.div>

            {/* H1 */}

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="max-w-4xl font-display font-normal leading-[0.98] tracking-[-0.035em] text-ink"
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
              }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease },
                  },
                }}
                className="block"
              >
                Je transforme les
              </motion.span>

              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease },
                  },
                }}
                className="block"
              >
                processus métier
              </motion.span>

              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease },
                  },
                }}
                className="block text-amber italic"
              >
                en logiciels simples
              </motion.span>

              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease },
                  },
                }}
                className="block text-amber italic"
              >
                et efficaces.
              </motion.span>
            </motion.h1>

            {/* Description */}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.65,
                ease,
              }}
              className="mt-8 max-w-xl"
            >
              <p className="text-base leading-7 text-sand sm:text-lg">
                Je conçois et développe des solutions digitales pour les
                PME, startups et entrepreneurs, de l'idée jusqu'à la mise
                en production.
              </p>

              <p className="mt-4 font-code text-[10px] uppercase tracking-[0.13em] text-dust sm:text-[11px]">
                Full-Stack Developer
                <span className="mx-2 text-line">·</span>
                {PROFILE.location}
                <span className="mx-2 text-line">·</span>
                {PROFILE.availability}
              </p>
            </motion.div>

            {/* CTA */}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease,
              }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5a8a18] hover:shadow-xl hover:shadow-amber/30"
              >
                Démarrer un projet

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-5 py-3.5 text-sm font-medium text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-white"
              >
                Voir mes travaux

                <ExternalLink
                  size={13}
                  className="opacity-50 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="/cv-christian-tenda.pdf"
                download
                onClick={() => posthog.capture('cv_downloaded')}
                className="group inline-flex items-center gap-2 px-2 py-3 text-sm text-dust transition-colors hover:text-amber"
              >
                <Download
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />

                CV
              </a>
            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.95,
                ease,
              }}
              className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-7 border-t border-line pt-7"
            >
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}

              <div className="flex flex-col gap-1">
                <span className="font-body text-sm font-medium text-ink">
                  Web · Mobile · Desktop
                </span>

                <span className="font-code text-[10px] uppercase tracking-[0.16em] text-dust">
                  plateformes
                </span>
              </div>
            </motion.div>
          </div>

          {/* ------------------------------------------------
              RIGHT — PORTRAIT
          ------------------------------------------------ */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease,
            }}
            className="flex items-center justify-center order-first lg:order-none"
          >
            <div className="group relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[600px]">

              {/* Decorative offset frame */}

              <div className="absolute -right-3 -top-3 h-full w-full rounded-[24px] bg-amber/10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

              <div className="absolute -bottom-3 -left-3 h-full w-full rounded-[24px] border border-ink/10 transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />

              {/* Image */}

              <div className="relative overflow-hidden rounded-[24px] bg-[#e9ece8] shadow-2xl shadow-black/10">

                <img
                  src="/image.png"
                  alt="Christian Tenda — Full-Stack Developer"
                  loading="eager"
                  fetchPriority="high"
                  className="block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  style={{
                    filter: 'contrast(1.05) saturate(1.04)',
                  }}
                />

                {/* Image overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

                {/* Technical label */}

                <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 font-code text-[9px] uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  Full-Stack · JS · Product
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <a
          href="#projects"
          className="group flex flex-col items-center gap-2"
          aria-label="Voir les projets"
        >
          <span className="font-code text-[9px] uppercase tracking-[0.18em] text-dust">
            Scroll
          </span>

          <span className="h-8 w-px overflow-hidden bg-line">
            <span className="block h-1/2 w-full translate-y-[-100%] bg-ink transition-transform duration-700 group-hover:translate-y-[200%]" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}

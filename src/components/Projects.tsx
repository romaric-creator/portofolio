import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import posthog from 'posthog-js';
import { PROJECTS } from '../data/projects';

type Category = 'Tous' | 'Web' | 'Mobile' | 'Backend' | 'Desktop' | 'IA';
const CATEGORIES: Category[] = ['Tous', 'Web', 'Mobile', 'Backend', 'Desktop', 'IA'];

const GRADIENTS: Record<string, string> = {
  'gradient-vitasang': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'gradient-flexystore': 'linear-gradient(135deg, #1a1612 0%, #2d1f10 50%, #3d2a14 100%)',
};

const SPAN_IDS = new Set(['01', '02', '07']);

/* ── Case Study Modal ─────────────────────────────── */
function CaseStudyModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  const [shotIdx, setShotIdx] = useState(0);
  const shots = project.screenshots ?? [];
  const cs = (project as any).caseStudy as { problem: string; process: string; solution: string; results: string[] } | undefined;
  const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  useEffect(() => {
    if (shots.length <= 1) return;
    const t = setInterval(() => setShotIdx(i => (i + 1) % shots.length), 3500);
    return () => clearInterval(t);
  }, [shots.length]);

  const STEPS = [
    { key: 'problem', label: 'Probleme', icon: '01' },
    { key: 'process', label: 'Processus', icon: '02' },
    { key: 'solution', label: 'Solution', icon: '03' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-4xl my-8 mx-4 sm:mx-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-[#6e6259] hover:text-[#ede9e3] transition-colors z-10"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Hero banner */}
        <div className="relative overflow-hidden" style={{ aspectRatio: shots.length > 0 ? '16/8' : '16/5' }}>
          {shots.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={shotIdx}
                src={shots[shotIdx]}
                alt={project.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full" style={{ background: gradient }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-transparent to-[#0f0e0c]/30" />

          {/* Project title over banner */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <span className="font-code text-[9px] tracking-widest uppercase text-amber">{project.category}</span>
            <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#ede9e3] mt-1">{project.name}</h3>
          </div>

          {/* Screenshot nav */}
          {shots.length > 1 && (
            <div className="absolute bottom-6 right-6 sm:right-8 flex items-center gap-3">
              <button
                onClick={() => setShotIdx(i => (i - 1 + shots.length) % shots.length)}
                className="p-1.5 border border-[#ede9e3]/20 text-[#ede9e3]/60 hover:text-[#ede9e3] hover:border-[#ede9e3]/40 transition-colors"
                aria-label="Precedent"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="font-code text-[10px] text-[#ede9e3]/50">
                {String(shotIdx + 1).padStart(2, '0')}/{String(shots.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => setShotIdx(i => (i + 1) % shots.length)}
                className="p-1.5 border border-[#ede9e3]/20 text-[#ede9e3]/60 hover:text-[#ede9e3] hover:border-[#ede9e3]/40 transition-colors"
                aria-label="Suivant"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-canvas border-x border-b border-line">

          {/* Tagline + actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-6 sm:p-8 border-b border-line">
            <p className="text-sand text-base leading-relaxed max-w-lg">{project.tagline}</p>
            {project.links.github && (
              <a
                href={`https://${project.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 font-code text-[10px] tracking-widest uppercase bg-ink text-canvas px-4 py-2.5 hover:bg-amber transition-colors"
              >
                GitHub <ArrowUpRight size={11} />
              </a>
            )}
          </div>

          {/* Case Study steps */}
          {cs && (
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
              {STEPS.map(step => (
                <div key={step.key} className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-code text-[10px] text-amber">{step.icon}</span>
                    <span className="font-code text-[9px] tracking-widest uppercase text-dust">{step.label}</span>
                  </div>
                  <p className="text-sm text-sand leading-relaxed">{cs[step.key]}</p>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {cs && (
            <div className="p-6 sm:p-8 border-t border-line">
              <p className="font-code text-[9px] tracking-widest uppercase text-dust mb-4">Resultats</p>
              <div className="flex flex-wrap gap-3">
                {cs.results.map(r => (
                  <span key={r} className="inline-flex items-center gap-2 font-code text-[11px] text-ink bg-amber/8 border border-amber/15 px-4 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description + Stack */}
          <div className="p-6 sm:p-8 border-t border-line">
            <p className="text-sm text-dust leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="font-code text-[9px] tracking-widest uppercase text-dust border border-line px-2.5 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Bento Card ───────────────────────────────────── */
function BentoCard({ project, index, large, onClick }: {
  project: typeof PROJECTS[0];
  index: number;
  large: boolean;
  onClick: () => void;
}) {
  const shot = project.screenshots?.[0] ?? null;
  const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer border border-line hover:border-amber/40 transition-colors duration-300 ${
        large ? 'col-span-1 md:col-span-2 aspect-[2/1]' : 'col-span-1 aspect-square'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {shot ? (
          <img src={shot} alt="" loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
        <span className="font-code text-[9px] tracking-widest uppercase text-amber/90 mb-1">
          {project.category}
        </span>
        <h3 className={`font-display font-normal text-[#ede9e3] leading-tight ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {project.name}
        </h3>
        <p className="text-[#a89890] text-sm mt-1.5 leading-relaxed line-clamp-2">
          {project.tagline}
        </p>

        {/* Stack preview */}
        <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {project.stack.slice(0, large ? 5 : 3).map(tech => (
            <span key={tech} className="font-code text-[8px] tracking-widest uppercase text-[#ede9e3]/70 border border-[#ede9e3]/20 px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 p-2 text-[#ede9e3]/0 group-hover:text-[#ede9e3]/80 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <ArrowUpRight size={16} />
      </div>
    </motion.article>
  );
}

/* ── Main Section ─────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState<Category>('Tous');
  const [detail, setDetail] = useState<typeof PROJECTS[0] | null>(null);

  const filtered = active === 'Tous' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <AnimatePresence>
        {detail && <CaseStudyModal project={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>

      <section id="projects" className="py-28 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
          >
            <div>
              <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
                02 / Travaux selectionnes
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-normal text-ink mt-3">
                Ce que j'ai concu et livre.
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2" role="tablist">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active === cat}
                  onClick={() => setActive(cat)}
                  className={`font-code text-[10px] tracking-widest uppercase px-3 py-1.5 transition-all duration-200 focus:outline-none ${
                    active === cat
                      ? 'bg-ink text-canvas'
                      : 'text-dust border border-line hover:border-sand hover:text-sand'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Bento Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {filtered.map((project, i) => (
                <BentoCard
                  key={project.id}
                  project={project}
                  index={i}
                  large={SPAN_IDS.has(project.id) && active === 'Tous'}
                  onClick={() => {
                    posthog.capture('project_detail_opened', { project: project.name });
                    setDetail(project);
                  }}
                />
              ))}

              {filtered.length === 0 && (
                <p className="font-code text-[11px] text-dust py-16 text-center col-span-full">
                  Aucun projet dans cette categorie.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import posthog from 'posthog-js';
import { PROJECTS } from '../data/projects';

const ease = [0.23, 1, 0.32, 1] as const;

const GRADIENTS: Record<string, string> = {
  'gradient-vitasang': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'gradient-flexystore': 'linear-gradient(135deg, #1a1612 0%, #2d1f10 50%, #3d2a14 100%)',
};

const FEATURED_NAMES = ['GLOBEApp', 'SafeDriving'];
const FEATURED = FEATURED_NAMES
  .map(name => PROJECTS.find(p => p.name === name))
  .filter((p): p is typeof PROJECTS[0] => !!p);
const REST = PROJECTS.filter(p => !FEATURED_NAMES.includes(p.name));

/* ─── 3D Tilt Hook ─── */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, rotateX, rotateY, onMove, onLeave };
}

/* ─── Screenshot Preview Hook (auto-cycle on hover) ─── */
function useScreenshotPreview(screenshots: string[]) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const onEnter = useCallback(() => {
    if (screenshots.length <= 1) return;
    setHovering(true);
    setCurrentIdx(0);
    intervalRef.current = setInterval(() => {
      setCurrentIdx(i => (i + 1) % screenshots.length);
    }, 800);
  }, [screenshots.length]);

  const onLeave = useCallback(() => {
    setHovering(false);
    setCurrentIdx(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return { currentIdx, hovering, onEnter, onLeave, hasMultiple: screenshots.length > 1 };
}

/* ─── Progress bar for screenshot cycling ─── */
function ScreenshotProgress({ total, current, active }: { total: number; current: number; active: boolean }) {
  if (total <= 1) return null;
  return (
    <div className={`absolute bottom-0 left-0 right-0 flex gap-0.5 h-0.5 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 bg-white/20 overflow-hidden">
          <motion.div
            className="h-full bg-amber"
            initial={{ width: '0%' }}
            animate={{
              width: i < current ? '100%' : i === current && active ? '100%' : '0%',
            }}
            transition={i === current && active ? { duration: 0.8, ease: 'linear' } : { duration: 0.15 }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Case Study (full-page, sticky screenshot, scroll-driven) ─── */
function CaseStudy({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  const [shotIdx, setShotIdx] = useState(0);
  const shots = project.screenshots ?? [];
  const cs = (project as any).caseStudy as { problem: string; process: string; solution: string; results: string[] } | undefined;
  const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];
  const containerRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  // Scroll-driven screenshot change: each narrative section maps to a screenshot
  useEffect(() => {
    if (shots.length <= 1 || !containerRef.current) return;
    const container = containerRef.current;
    const onScroll = () => {
      const sections = sectionRefs.current.filter(Boolean);
      if (!sections.length) return;
      const containerTop = container.scrollTop + container.clientHeight * 0.4;
      let activeIdx = 0;
      sections.forEach((sec, i) => {
        if (sec && sec.offsetTop <= containerTop) activeIdx = i;
      });
      setShotIdx(activeIdx % shots.length);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [shots.length]);

  const SECTIONS = cs ? [
    { label: 'Le problème', text: cs.problem },
    { label: "L'approche", text: cs.process },
    { label: 'La solution', text: cs.solution },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-canvas overflow-y-auto"
      transition={{ duration: 0.4, ease }}
    >
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-10 py-4 bg-canvas/80 backdrop-blur-xl border-b border-line"
      >
        <div className="flex items-center gap-3">
          <span className="font-code text-[10px] tracking-widest uppercase text-amber">{project.category}</span>
          <span className="w-px h-3 bg-line" />
          <span className="font-display text-sm text-ink">{project.name}</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-code text-[11px] tracking-widest uppercase text-dust hover:text-ink active:text-amber transition-colors py-2 px-3 -mr-3 rounded-full"
        >
          Fermer <X size={14} />
        </button>
      </motion.div>

      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="pt-12 sm:pt-16 pb-10"
        >
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-ink leading-[1.08]">
            {project.name}
          </h2>
          <p className="text-sand text-base sm:text-lg leading-relaxed max-w-2xl mt-4">
            {project.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="font-code text-[10px] tracking-widest uppercase text-dust bg-surface px-3 py-1.5 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            {project.links.github && (
              <a
                href={`https://${project.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-code text-[11px] tracking-widest uppercase text-amber hover:text-ink transition-colors"
              >
                GitHub <ArrowUpRight size={12} />
              </a>
            )}
            {project.links.live && (
              <a
                href={`https://${project.links.live}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-wide bg-amber text-white px-5 py-2.5 rounded-full hover:bg-ink transition-colors"
              >
                Demo live <ExternalLink size={12} />
              </a>
            )}
          </div>
        </motion.div>

        {cs ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-20">
            {/* Left — sticky screenshot (scroll-driven change) */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                className="relative rounded-2xl overflow-hidden bg-surface"
                style={{ aspectRatio: '16/10' }}
              >
                {shots.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={shotIdx}
                      src={shots[shotIdx]}
                      alt={project.name}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full" style={{ background: gradient }} />
                )}

                {/* Screenshot counter */}
                {shots.length > 1 && (
                  <div className="absolute top-3 right-3 font-code text-[10px] text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    {String(shotIdx + 1).padStart(2, '0')}/{String(shots.length).padStart(2, '0')}
                  </div>
                )}
              </motion.div>

              {/* Thumbnail strip */}
              {shots.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2 -mx-1 px-1">
                  {shots.map((shot, i) => (
                    <button
                      key={i}
                      onClick={() => setShotIdx(i)}
                      className={`relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-300 ${
                        i === shotIdx ? 'ring-2 ring-amber ring-offset-2 ring-offset-canvas scale-105' : 'opacity-40 hover:opacity-70 active:opacity-80'
                      }`}
                    >
                      <img src={shot} alt="" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — scrollable narrative (scroll drives screenshot changes) */}
            <div className="space-y-14 lg:pt-2">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.label}
                  ref={el => { sectionRefs.current[i] = el; }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                >
                  <span className="font-code text-[10px] tracking-[0.2em] uppercase text-amber">{section.label}</span>
                  <p className="text-ink text-base sm:text-lg leading-relaxed mt-3">{section.text}</p>
                </motion.div>
              ))}

              {/* Results */}
              <motion.div
                ref={el => { sectionRefs.current[SECTIONS.length] = el; }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease }}
              >
                <span className="font-code text-[10px] tracking-[0.2em] uppercase text-amber">Résultats</span>
                <div className="mt-4 space-y-3">
                  {cs.results.map((r, i) => (
                    <motion.div
                      key={r}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber mt-2 flex-shrink-0" />
                      <span className="text-ink text-sm sm:text-base leading-relaxed">{r}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="pt-8 border-t border-line"
              >
                <p className="text-sand text-sm leading-relaxed">{project.description}</p>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="relative rounded-2xl overflow-hidden mb-10"
              style={{ aspectRatio: shots.length > 0 ? '16/9' : '16/7' }}
            >
              {shots.length > 0 ? (
                <img src={shots[0]} alt={project.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full" style={{ background: gradient }} />
              )}
            </motion.div>
            <p className="text-ink text-lg leading-relaxed max-w-2xl">{project.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Featured Card (3D tilt + screenshot preview on hover) ─── */
function FeaturedCard({ project, onClick }: { project: typeof PROJECTS[0]; onClick: () => void }) {
  const shots = project.screenshots ?? [];
  const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];
  const { ref, rotateX, rotateY, onMove, onLeave: tiltLeave } = useTilt(6);
  const preview = useScreenshotPreview(shots);

  const handleMove = (e: React.MouseEvent) => onMove(e);
  const handleEnter = () => preview.onEnter();
  const handleLeave = () => { tiltLeave(); preview.onLeave(); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group cursor-pointer"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        style={{ rotateX, rotateY }}
        className="relative overflow-hidden rounded-2xl will-change-transform"
      >
        <div className="relative" style={{ aspectRatio: '16/9' }}>
          {shots.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={preview.hovering ? preview.currentIdx : 0}
                src={shots[preview.hovering ? preview.currentIdx : 0]}
                alt={project.name}
                initial={preview.hovering ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full" style={{ background: gradient }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <ScreenshotProgress total={shots.length} current={preview.currentIdx} active={preview.hovering} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <span className="font-code text-[10px] tracking-widest uppercase text-amber">
            {project.category}
          </span>
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-white mt-1 group-hover:text-amber transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.stack.slice(0, 4).map(tech => (
              <span key={tech} className="font-code text-[10px] tracking-widest uppercase text-white/50">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber/80 transition-colors duration-300">
          <ArrowUpRight size={14} className="text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Compact Card (3D tilt + screenshot preview) ─── */
function CompactCard({ project, index, onClick }: {
  project: typeof PROJECTS[0];
  index: number;
  onClick: () => void;
}) {
  const shots = project.screenshots ?? [];
  const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];
  const { ref, rotateX, rotateY, onMove, onLeave: tiltLeave } = useTilt(6);
  const preview = useScreenshotPreview(shots);

  const handleMove = (e: React.MouseEvent) => onMove(e);
  const handleEnter = () => preview.onEnter();
  const handleLeave = () => { tiltLeave(); preview.onLeave(); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group cursor-pointer"
      style={{ perspective: 600 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        style={{ rotateX, rotateY }}
        className="bg-surface rounded-2xl overflow-hidden will-change-transform hover:shadow-xl hover:shadow-ink/8 transition-shadow duration-300"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          {shots.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={preview.hovering ? preview.currentIdx : 0}
                src={shots[preview.hovering ? preview.currentIdx : 0]}
                alt={project.name}
                initial={preview.hovering ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full" style={{ background: gradient }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 font-code text-[10px] tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {project.category}
          </span>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber/80 transition-colors duration-300">
            <ArrowUpRight size={12} className="text-white" />
          </div>
          <ScreenshotProgress total={shots.length} current={preview.currentIdx} active={preview.hovering} />
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-normal text-ink group-hover:text-amber active:text-amber transition-colors duration-200">
            {project.name}
          </h3>
          <p className="text-sand text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.stack.slice(0, 3).map(tech => (
              <span key={tech} className="font-code text-[10px] tracking-widest uppercase text-dust">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Featured Section (desktop grid + mobile swipe) ─── */
function FeaturedSection({ onOpen }: { onOpen: (p: typeof PROJECTS[0]) => void }) {
  return (
    <>
      {/* Desktop: grid */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {FEATURED.map(project => (
          <FeaturedCard key={project.id} project={project} onClick={() => onOpen(project)} />
        ))}
      </div>

      {/* Mobile: horizontal scroll with snap */}
      <div className="sm:hidden mb-5 -mx-5">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {FEATURED.map(project => {
            const shot = project.screenshots?.[0];
            const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];
            return (
              <div
                key={project.id}
                onClick={() => onOpen(project)}
                className="flex-shrink-0 w-[85vw] snap-center cursor-pointer relative overflow-hidden rounded-2xl active:scale-[0.98] transition-transform"
                style={{ aspectRatio: '16/10' }}
              >
                {shot ? (
                  <img src={shot} alt={project.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full" style={{ background: gradient }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-code text-[10px] tracking-widest uppercase text-amber">{project.category}</span>
                  <h3 className="font-display text-xl font-normal text-white mt-1">{project.name}</h3>
                  <p className="text-white/70 text-sm mt-1 line-clamp-2">{project.tagline}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 mt-1">
          {FEATURED.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-dust/30" />
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Main Section ─── */
export default function Projects() {
  const [detail, setDetail] = useState<typeof PROJECTS[0] | null>(null);

  const openDetail = (project: typeof PROJECTS[0]) => {
    posthog.capture('project_detail_opened', { project: project.name });
    setDetail(project);
  };

  return (
    <>
      <AnimatePresence>
        {detail && <CaseStudy project={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>

      <section id="projects" className="py-28 px-5 sm:px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="mb-14"
          >
            <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
              Travaux sélectionnés
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3">
              Ce que j'ai conçu{' '}
              <em className="text-amber">et livré.</em>
            </h2>
          </motion.div>

          <FeaturedSection onOpen={openDetail} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REST.map((project, i) => (
              <CompactCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => openDetail(project)}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

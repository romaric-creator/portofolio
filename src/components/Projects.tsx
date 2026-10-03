import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, GitBranch, Heart, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import posthog from 'posthog-js';
import { useTranslation } from '../i18n';
import { useLocalizedProjects } from '../i18n/data';
import { useLikes, type LikesApi } from '../hooks/useLikes';

const ease = [0.23, 1, 0.32, 1] as const;

type Project = ReturnType<typeof useLocalizedProjects>[0];

const GRADIENTS: Record<string, string> = {
  'gradient-vitasang': 'linear-gradient(135deg, #1e3a5f 0%, #2a4a6f 50%, #1e3a5f 100%)',
  'gradient-flexystore': 'linear-gradient(135deg, #1e3a5f 0%, #3d6b2e 50%, #84c225 100%)',
};

const FEATURED_NAMES = ['GLOBEApp', 'SafeDriving'];

const CATEGORY_COLORS: Record<string, string> = {
  'Web':     'text-sky-400 bg-sky-400/10',
  'Mobile':  'text-violet-400 bg-violet-400/10',
  'IA':      'text-emerald-400 bg-emerald-400/10',
  'Backend': 'text-amber bg-amber/10',
  'Desktop': 'text-cyan-400 bg-cyan-400/10',
};

/* ─── Like Button ─── */
function LikeButton({ projectId, likes, variant = 'card' }: {
  projectId: string;
  likes: LikesApi;
  variant?: 'card' | 'featured';
}) {
  const isLiked = likes.liked.has(projectId);
  const count = likes.counts[projectId] ?? 0;

  const base = variant === 'featured'
    ? `flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
        isLiked ? 'bg-rose-500/80 text-white' : 'bg-black/40 text-white/80 hover:bg-rose-500/60'
      }`
    : `flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
        isLiked ? 'bg-rose-500/80 text-white' : 'bg-black/40 text-white/80 hover:bg-rose-500/60'
      }`;

  return (
    <motion.button
      onClick={e => { e.stopPropagation(); likes.toggle(projectId); }}
      whileTap={{ scale: 0.8 }}
      className={base}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart size={13} style={{ fill: isLiked ? 'currentColor' : 'none' }} />
      </motion.div>
      <span className="font-code text-[11px] font-semibold">{count > 0 ? count : ''}</span>
    </motion.button>
  );
}

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

/* ─── Screenshot Preview Hook ─── */
function useScreenshotPreview(screenshots: string[]) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

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

/* ─── Progress bar ─── */
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

/* ─── Screenshot Lightbox ─── */
function ScreenshotLightbox({ shots, startIdx, onClose }: {
  shots: string[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % shots.length);
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + shots.length) % shots.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [shots.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>

      {shots.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + shots.length) % shots.length); }}
            className="absolute left-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % shots.length); }}
            className="absolute right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <motion.img
        key={idx}
        src={shots[idx]}
        alt=""
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />

      {shots.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-code text-[11px] text-white/50 tracking-widest">
          {String(idx + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Case Study ─── */
function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useTranslation();
  const [shotIdx, setShotIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const shots = project.screenshots ?? [];
  const cs = project.caseStudy as { problem: string; process: string; solution: string; results: string[] } | undefined;
  const gradient = GRADIENTS[project.visualPlaceholder] ?? GRADIENTS['gradient-vitasang'];
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

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
    { label: t.projects.caseStudySections.problem,  text: cs.problem  },
    { label: t.projects.caseStudySections.approach, text: cs.process  },
    { label: t.projects.caseStudySections.solution, text: cs.solution },
  ] : [];

  return (
    <>
    <AnimatePresence>
      {lightbox && shots.length > 0 && (
        <ScreenshotLightbox shots={shots} startIdx={shotIdx} onClose={() => setLightbox(false)} />
      )}
    </AnimatePresence>
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
          {t.projects.close} <X size={14} />
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
                {t.projects.demoLive} <ExternalLink size={12} />
              </a>
            )}
          </div>
        </motion.div>

        {cs ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-20">
            {/* Left — sticky screenshot */}
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
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {shots.length > 1 && (
                    <span className="font-code text-[10px] text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      {String(shotIdx + 1).padStart(2, '0')}/{String(shots.length).padStart(2, '0')}
                    </span>
                  )}
                  {shots.length > 0 && (
                    <button
                      onClick={() => setLightbox(true)}
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-amber/80 hover:text-white transition-colors"
                    >
                      <Maximize2 size={13} />
                    </button>
                  )}
                </div>
              </motion.div>

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

            {/* Right — scrollable narrative */}
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
                <span className="font-code text-[10px] tracking-[0.2em] uppercase text-amber">
                  {t.projects.caseStudySections.results}
                </span>
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
    </>
  );
}

/* ─── Featured Card ─── */
function FeaturedCard({ project, onClick, likes }: { project: Project; onClick: () => void; likes: LikesApi }) {
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
          <span className={`inline-block font-code text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full mb-2 ${CATEGORY_COLORS[project.category] ?? 'text-amber bg-amber/10'}`}>
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
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 font-code text-[10px] tracking-widest uppercase text-amber">
              Case study <ArrowUpRight size={10} />
            </span>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber/80 transition-colors duration-300">
          <ArrowUpRight size={14} className="text-white" />
        </div>
        <div className="absolute top-4 left-4" onClick={e => e.stopPropagation()}>
          <LikeButton projectId={project.id} likes={likes} variant="featured" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Compact Card ─── */
function CompactCard({ project, index, onClick, likes }: {
  project: Project;
  index: number;
  onClick: () => void;
  likes: LikesApi;
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
          <span className={`absolute top-3 left-3 font-code text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full ${CATEGORY_COLORS[project.category] ?? 'text-white/80 bg-black/30'} backdrop-blur-sm`}>
            {project.category}
          </span>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber/80 transition-colors duration-300">
            <ArrowUpRight size={12} className="text-white" />
          </div>
          <div className="absolute bottom-3 left-3" onClick={e => e.stopPropagation()}>
            <LikeButton projectId={project.id} likes={likes} />
          </div>
          <ScreenshotProgress total={shots.length} current={preview.currentIdx} active={preview.hovering} />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-normal text-ink group-hover:text-amber active:text-amber transition-colors duration-200">
              {project.name}
            </h3>
            <span className="flex-shrink-0 inline-flex items-center gap-1 font-code text-[9px] tracking-widest uppercase text-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
              Case study <ArrowUpRight size={10} />
            </span>
          </div>
          <p className="text-sand text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.stack.slice(0, 3).map(tech => (
              <span key={tech} className="font-code text-[10px] tracking-widest uppercase text-dust bg-surface border border-line/40 px-2 py-0.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          {(project.links.github || project.links.live) && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-line/40" onClick={e => e.stopPropagation()}>
              {project.links.github && (
                <a
                  href={`https://${project.links.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-code text-[10px] tracking-widest uppercase text-dust hover:text-ink transition-colors bg-surface border border-line/40 px-3 py-1.5 rounded-full"
                >
                  <GitBranch size={11} /> Code
                </a>
              )}
              {project.links.live && (
                <a
                  href={`https://${project.links.live}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-code text-[10px] tracking-widest uppercase text-amber hover:text-white hover:bg-amber transition-colors bg-amber/10 border border-amber/30 px-3 py-1.5 rounded-full"
                >
                  <ExternalLink size={11} /> Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Featured Section ─── */
function FeaturedSection({ projects, onOpen, likes }: { projects: Project[]; onOpen: (p: Project) => void; likes: LikesApi }) {
  const { t } = useTranslation();
  const featured = FEATURED_NAMES
    .map(name => projects.find(p => p.name === name))
    .filter((p): p is Project => !!p);

  return (
    <>
      {/* Desktop: grid */}
      <div className="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {featured.map(project => (
          <FeaturedCard key={project.id} project={project} onClick={() => onOpen(project)} likes={likes} />
        ))}
      </div>

      {/* Mobile: horizontal scroll with snap */}
      <div className="sm:hidden mb-5 -mx-5">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {featured.map(project => {
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
                  <span className="inline-flex items-center gap-1.5 mt-3 font-body text-[12px] font-semibold text-white bg-amber/90 px-4 py-2 rounded-full">
                    {t.projects.viewProject} <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 mt-1">
          {featured.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-dust/30" />
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Main Section ─── */
export default function Projects() {
  const { t } = useTranslation();
  const projects = useLocalizedProjects();
  const rest = projects.filter(p => !FEATURED_NAMES.includes(p.name));
  const [detail, setDetail] = useState<Project | null>(null);
  const likes = useLikes();

  const openDetail = (project: Project) => {
    posthog.capture('project_detail_opened', { project: project.name });
    setDetail(project);
  };

  return (
    <>
      <AnimatePresence>
        {detail && <CaseStudy project={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>

      <section id="projects" className="py-14 px-5 sm:px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
              {t.projects.sectionLabel}
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3 leading-[1.05] tracking-[-0.02em]">
              {t.projects.heading}{' '}
              <em className="text-amber">{t.projects.headingEm}</em>
            </h2>
          </motion.div>

          <FeaturedSection projects={projects} onOpen={openDetail} likes={likes} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project, i) => (
              <CompactCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => openDetail(project)}
                likes={likes}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

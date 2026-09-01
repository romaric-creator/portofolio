import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Images } from 'lucide-react';
import posthog from 'posthog-js';
import { PROJECTS, TECH_ICONS } from '../data/projects';
import { GithubIcon } from './Icons';
import Lightbox from './Lightbox';

type Project = typeof PROJECTS[0];
type Category = 'Tous' | 'Web' | 'Mobile' | 'Backend' | 'Desktop' | 'IA';

const CATEGORIES: Category[] = ['Tous', 'Web', 'Mobile', 'Backend', 'Desktop', 'IA'];

const CATEGORY_COUNT: Record<Category, number> = {
  Tous: PROJECTS.length,
  Web: PROJECTS.filter(p => p.category === 'Web').length,
  Mobile: PROJECTS.filter(p => p.category === 'Mobile').length,
  Backend: PROJECTS.filter(p => p.category === 'Backend').length,
  Desktop: PROJECTS.filter(p => p.category === 'Desktop').length,
  IA: PROJECTS.filter(p => p.category === 'IA').length,
};

const CATEGORY_COLOR: Record<string, string> = {
  Web:     'bg-blue-50 text-blue-600 border-blue-200',
  Mobile:  'bg-purple-50 text-purple-600 border-purple-200',
  Backend: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Desktop: 'bg-orange-50 text-orange-600 border-orange-200',
  IA:      'bg-pink-50 text-pink-600 border-pink-200',
};

interface LightboxState {
  images: string[];
  index: number;
  projectName: string;
}

function ProjectCard({
  project,
  onOpenLightbox,
}: {
  project: Project;
  onOpenLightbox: (images: string[], index: number, name: string) => void;
}) {
  const screenshots = project.screenshots;
  const thumb = screenshots?.[0];

  return (
    <div className="bg-canvas border border-line rounded-xl overflow-hidden flex flex-col group hover:border-amber hover:shadow-lg transition-all duration-300">

      {/* Image / placeholder */}
      {thumb ? (
        <button
          onClick={() => { onOpenLightbox(screenshots!, 0, project.name); posthog.capture('project_lightbox_opened', { project: project.name, category: project.category }); }}
          className="relative w-full h-52 img-relief overflow-hidden cursor-zoom-in flex-shrink-0"
          aria-label={`Voir les captures de ${project.name}`}
        >
          <img
            src={thumb}
            alt={`Aperçu ${project.name}`}
            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          {screenshots!.length > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-ink/65 text-canvas text-[10px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
              <Images size={10} />
              {screenshots!.length}
            </div>
          )}
        </button>
      ) : (
        <div className="w-full h-52 img-relief flex-shrink-0" />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Top row: category badge + links */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${CATEGORY_COLOR[project.category]}`}>
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.links.github && (
              <a
                href={`https://${project.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('project_github_clicked', { project: project.name })}
                className="text-sand hover:text-ink transition-colors"
                aria-label="Code source"
              >
                <GithubIcon size={15} />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('project_live_clicked', { project: project.name })}
                className="text-sand hover:text-amber transition-colors"
                aria-label="Demo live"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {!project.links.github && !project.links.live && (
              <span className="text-[10px] text-dust font-medium border border-line rounded px-1.5 py-0.5">
                Privé
              </span>
            )}
          </div>
        </div>

        {/* Title + tagline */}
        <h3 className="font-display font-extrabold text-ink text-lg leading-tight group-hover:text-amber transition-colors">
          {project.name}
        </h3>
        <p className="text-sand text-xs font-medium mt-1.5 leading-relaxed line-clamp-2">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sand text-sm mt-3 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-line">
          {project.stack.slice(0, 6).map((tech) => {
            const icon = TECH_ICONS[tech];
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1 text-[11px] bg-surface text-ink px-2 py-0.5 border border-line rounded font-medium"
              >
                {icon && (
                  <img src={icon} alt="" width={12} height={12} className="object-contain flex-shrink-0" loading="lazy" />
                )}
                {tech}
              </span>
            );
          })}
          {project.stack.length > 6 && (
            <span className="text-[11px] text-dust font-medium px-2 py-0.5">
              +{project.stack.length - 6}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>('Tous');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const filtered = active === 'Tous'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active);

  const openLightbox = (images: string[], index: number, projectName: string) =>
    setLightbox({ images, index, projectName });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox(prev => prev && prev.index > 0 ? { ...prev, index: prev.index - 1 } : prev);
  const nextImage = () => setLightbox(prev => prev && prev.index < prev.images.length - 1 ? { ...prev, index: prev.index + 1 } : prev);

  return (
    <section id="projects" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Projets Réalisés
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-ink">
            Ce que j'ai construit
          </h2>
          <p className="text-sand text-base mt-3 max-w-lg">
            Une sélection de projets web et mobile qui illustrent mon savoir-faire technique.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mt-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-4 py-1.5 text-sm font-semibold rounded-full border transition-colors duration-200 focus:outline-none"
              style={{
                color: active === cat ? 'var(--color-ink)' : 'var(--color-sand)',
                borderColor: active === cat ? 'var(--color-amber)' : 'var(--color-line)',
                background: 'transparent',
              }}
            >
              {active === cat && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-amber"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
              {CATEGORY_COUNT[cat] > 0 && (
                <span className={`ml-1.5 text-[10px] font-bold ${active === cat ? 'opacity-80' : 'text-dust'}`}>
                  {CATEGORY_COUNT[cat]}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="mt-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <ProjectCard project={project} onOpenLightbox={openLightbox} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          projectName={lightbox.projectName}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}

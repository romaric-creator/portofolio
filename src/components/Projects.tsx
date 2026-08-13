import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';

type Project = typeof PROJECTS[0];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

function ProjectCard({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className={`relative bg-canvas border border-line rounded-lg p-6 flex flex-col overflow-hidden group hover:border-amber transition-all h-full ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-amber font-bold text-sm">{project.id}</span>
        {project.links.github && (
          <a
            href={`https://${project.links.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sand hover:text-amber transition-colors p-1"
          >
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      <h3 className="font-display font-extrabold text-ink text-xl mt-3 group-hover:text-amber transition-colors leading-tight">
        {project.name}
      </h3>
      <p className="text-sand text-xs font-medium mt-1.5 leading-relaxed">{project.tagline}</p>
      <p className="text-sand text-sm mt-3 leading-relaxed flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mt-5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] bg-surface text-ink px-2 py-0.5 border border-line rounded font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-4 pt-4 border-t border-line">
        {project.links.github && (
          <a
            href={`https://${project.links.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-sand hover:text-amber transition-colors font-medium"
          >
            <GithubIcon />
            Code source
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-sand hover:text-amber transition-colors font-medium"
          >
            <ExternalLink size={12} />
            Demo
          </a>
        )}
        {!project.links.github && !project.links.live && (
          <span className="text-xs text-dust font-medium">Projet prive</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Projets Realises
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-ink">
            Ce que j'ai construit
          </h2>
          <p className="text-sand text-base mt-3 max-w-lg">
            Une selection de projets web et mobile qui illustrent mon savoir-faire technique.
          </p>
        </motion.div>

        {/* Desktop bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:grid gap-5 mt-12"
          style={{
            gridTemplateColumns: '1.6fr 1fr',
            gridTemplateRows: '280px 280px auto auto auto auto',
          }}
        >
          <div className="h-full" style={{ gridColumn: '1', gridRow: '1 / span 2' }}>
            <ProjectCard project={PROJECTS[0]} className="h-full" />
          </div>
          <div className="h-full" style={{ gridColumn: '2', gridRow: '1' }}>
            <ProjectCard project={PROJECTS[1]} className="h-full" />
          </div>
          <div className="h-full" style={{ gridColumn: '2', gridRow: '2' }}>
            <ProjectCard project={PROJECTS[2]} className="h-full" />
          </div>
          <div style={{ gridColumn: '1', gridRow: '3' }}>
            <ProjectCard project={PROJECTS[3]} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '3' }}>
            <ProjectCard project={PROJECTS[4]} />
          </div>
          <div style={{ gridColumn: '1 / span 2', gridRow: '4' }}>
            <ProjectCard project={PROJECTS[5]} />
          </div>
          <div style={{ gridColumn: '1', gridRow: '5' }}>
            <ProjectCard project={PROJECTS[6]} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '5' }}>
            <ProjectCard project={PROJECTS[7]} />
          </div>
        </motion.div>

        {/* Mobile stack */}
        <div className="md:hidden flex flex-col gap-4 mt-12">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

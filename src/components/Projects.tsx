import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { GithubIcon } from './Icons';

type Project = typeof PROJECTS[0];

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
            <GithubIcon size={13} />
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
          <span className="text-xs text-dust font-medium">Projet privé</span>
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
            Projets Réalisés
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-ink">
            Ce que j'ai construit
          </h2>
          <p className="text-sand text-base mt-3 max-w-lg">
            Une sélection de projets web et mobile qui illustrent mon savoir-faire technique.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:grid grid-cols-2 gap-5 mt-12"
        >
          <div className="row-span-2">
            <ProjectCard project={PROJECTS[0]} className="h-full" />
          </div>
          <div>
            <ProjectCard project={PROJECTS[1]} className="h-full" />
          </div>
          <div>
            <ProjectCard project={PROJECTS[2]} className="h-full" />
          </div>
          <div>
            <ProjectCard project={PROJECTS[3]} />
          </div>
          <div>
            <ProjectCard project={PROJECTS[4]} />
          </div>
          <div className="col-span-2">
            <ProjectCard project={PROJECTS[5]} />
          </div>
          <div>
            <ProjectCard project={PROJECTS[6]} />
          </div>
          <div>
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

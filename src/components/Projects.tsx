import { PROJECTS } from '../data/projects';
import '../styles/projects.css';

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  links: { github: string | null; live: string | null };
  visualPlaceholder?: string;
}

interface ProjectCardProps {
  project: Project;
  isLarge?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isLarge = false }) => {
  // Fonction pour calculer la rotation 3D au survol
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const xAxis = (rect.width / 2 - (e.clientX - rect.left)) / 25;
    const yAxis = (e.clientY - rect.top - rect.height / 2) / 25;
    card.style.transform = `perspective(1000px) rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      className={`project-card ${isLarge ? 'large' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="project-number watermark-number">{project.id}</span>
      <div className="card-left-border"></div>
      <h3 className="card-title">{project.name}</h3>
      <p className="project-tagline">{project.tagline}</p>
      <p className="project-description">{project.description}</p>
      <div className="project-stack">
        {project.stack.map((tech) => (
          <span key={tech} className="tag-label">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.github && (
          <a href={`https://${project.links.github}`} target="_blank" rel="noopener noreferrer" className="ghost-button">
            GitHub →
          </a>
        )}
        {project.links.live && (
          <a href={`https://${project.links.live}`} target="_blank" rel="noopener noreferrer" className="ghost-button">
            Live Démo →
          </a>
        )}
      </div>
      <div className="visual-placeholder">
        {/* Un placeholder visuel stylisé */}
        {project.visualPlaceholder && (
          <div className={`gradient-placeholder ${project.visualPlaceholder}`}></div>
        )}
      </div>
    </div>
  );
};

interface ProjectsProps {
  addRevealElement: (el: HTMLElement | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({ addRevealElement }) => {

  // Pour l'agencement asymétrique 60/40, les projets 2 et 3 seront sur la même ligne.
  const project1 = PROJECTS[0];
  const project2 = PROJECTS[1];
  const project3 = PROJECTS[2];
  const project4 = PROJECTS[3];

  return (
    <section id="projects" className="projects-section reveal-element" ref={addRevealElement}> {/* Ajout de ref et classe */}
      <h2 className="section-title" data-number="03">03. Mes Projets Réalisés</h2>
      <div className="projects-grid">
        <ProjectCard project={project1} isLarge={true} />
        <div className="projects-row-60-40">
          <ProjectCard project={project2} />
          <ProjectCard project={project3} />
        </div>
        <ProjectCard project={project4} />
      </div>
    </section>
  );
};

export default Projects;

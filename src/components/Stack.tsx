import { TECH_STACK } from '../data/projects';
import '../styles/stack.css';

interface StackProps {
  addRevealElement: (el: HTMLElement | null) => void;
}

const Stack: React.FC<StackProps> = ({ addRevealElement }) => {

  return (
    <section id="stack" className="stack-section reveal-element" ref={addRevealElement}>
      <h2 className="section-title" data-number="02">02. Ma Stack Technique</h2>
      <div className="stack-categories">
        {Object.entries(TECH_STACK).map(([category, technologies]) => (
          <div key={category} className="stack-category">
            <h3>{category}</h3>
            <div className="tech-tags">
              {technologies.map((tech) => (
                <span key={tech} className="tag-label">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;

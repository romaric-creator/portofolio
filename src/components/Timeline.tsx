import { TIMELINE_EVENTS } from '../data/projects';
import '../styles/timeline.css';

interface TimelineProps {
  addRevealElement: (el: HTMLElement | null) => void;
}

const Timeline: React.FC<TimelineProps> = ({ addRevealElement }) => {

  return (
    <section id="timeline" className="timeline-section reveal-element" ref={addRevealElement}>
      <h2 className="section-title" data-number="04">04. Mon Parcours</h2>
      <div className="timeline-container">
        {TIMELINE_EVENTS.map((event, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-years">{event.years}</span>
              <h3 className="timeline-title">{event.title}</h3>
              {event.description && <p className="timeline-description">{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;

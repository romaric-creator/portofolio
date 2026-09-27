import { motion } from 'framer-motion';
import { TIMELINE_EVENTS } from '../data/projects';

export default function Timeline() {
  return (
    <section id="timeline" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            Parcours
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3 max-w-xl leading-tight">
            L'évolution d'un{' '}
            <em className="text-amber">concepteur passionné.</em>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {TIMELINE_EVENTS.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="group bg-canvas rounded-xl p-6 hover:shadow-md hover:shadow-ink/5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-code text-[13px] font-semibold text-amber">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-code text-[11px] text-dust tracking-wide sm:w-36">
                    {event.years}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-normal text-ink leading-snug group-hover:text-amber transition-colors duration-200">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-sand text-sm mt-2 leading-relaxed">{event.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

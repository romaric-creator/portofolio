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
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            04 / Parcours
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-normal text-ink mt-3 max-w-xl leading-tight">
            L'évolution continue d'un{' '}
            <em className="text-amber" style={{ fontStyle: 'italic' }}>concepteur passionné.</em>
          </h2>
        </motion.div>

        <div className="mt-14 relative">
          {/* Ligne verticale animée */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px bg-amber/30"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originY: 0, left: '3.5rem' }}
          />

          <div className="border-t border-line">
            {TIMELINE_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="flex gap-6 sm:gap-10 py-7 border-b border-line group hover:bg-canvas/60 transition-colors px-2 -mx-2"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * 0.12 + 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="font-code text-sm text-amber flex-shrink-0 w-6 mt-0.5"
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <h3 className="font-display text-lg font-normal text-ink leading-snug group-hover:text-amber transition-colors duration-200">
                      {event.title}
                    </h3>
                    <span className="font-code text-[10px] text-dust tracking-widest flex-shrink-0">
                      {event.years}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sand text-sm mt-2 leading-relaxed">{event.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

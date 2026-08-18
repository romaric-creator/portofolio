import { motion } from 'framer-motion';
import { TIMELINE_EVENTS } from '../data/projects';

export default function Timeline() {
  return (
    <section id="timeline" className="py-28 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Parcours
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-ink">
            Éducation &amp; Expérience
          </h2>
        </motion.div>

        <div className="relative mt-14">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-line" />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-1 w-[22px] h-[22px] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-amber ring-4 ring-canvas" />
                </div>

                <span className="text-xs text-amber font-semibold tracking-wide">{event.years}</span>
                <h3 className="font-display font-bold text-ink text-lg mt-1 leading-snug">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="text-sand text-sm mt-1.5 leading-relaxed">{event.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

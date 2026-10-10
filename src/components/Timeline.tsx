import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';

export default function Timeline() {
  const { t } = useTranslation();

  return (
    <section id="timeline" className="py-20 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            {t.timeline.sectionLabel}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3 max-w-xl leading-[1.05] tracking-[-0.02em]">
            {t.timeline.heading}{' '}
            <em className="text-amber">{t.timeline.headingEm}</em>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {t.timeline.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="group bg-canvas rounded-xl p-8 hover:shadow-md hover:shadow-ink/5 transition-all duration-300"
            >
              <div className="flex gap-6">
                <span className="font-code text-[13px] font-semibold text-amber/50 flex-shrink-0 pt-0.5 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <span className="font-code text-xs text-amber tracking-wide block mb-2">
                    {event.years}
                  </span>
                  <h3 className="font-display text-lg font-normal text-ink leading-snug group-hover:text-amber transition-colors duration-200">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-sand text-sm mt-3 leading-relaxed max-w-2xl">
                      {event.description}
                    </p>
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

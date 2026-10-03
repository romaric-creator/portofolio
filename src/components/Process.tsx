import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';

export default function Process() {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-14 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            {t.process.sectionLabel}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3 leading-[1.05] tracking-[-0.02em]">
            {t.process.heading}{' '}
            <em className="text-amber">{t.process.headingEm}</em>
          </h2>
          <p className="text-sand text-base leading-relaxed max-w-lg mt-5">
            {t.process.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-canvas rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:shadow-ink/5 transition-all duration-300"
            >
              <span className="font-code text-[13px] font-semibold text-amber">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg font-normal text-ink">
                {step.title}
              </h3>
              <p className="text-sand text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

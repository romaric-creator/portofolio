import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/projects';

export default function Process() {
  return (
    <section id="process" className="py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="font-code text-[10px] tracking-[0.2em] uppercase text-dust">
            Mon processus
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-normal text-ink mt-3">
            Comment{' '}
            <em className="text-amber">je travaille.</em>
          </h2>
          <p className="text-sand text-base leading-relaxed max-w-lg mt-5">
            Un processus clair pour réduire l'incertitude et livrer un produit qui correspond à vos attentes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-canvas rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:shadow-ink/5 transition-all duration-300"
            >
              <span className="font-code text-[13px] font-semibold text-amber">
                {step.num}
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

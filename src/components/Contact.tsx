import { motion } from 'framer-motion';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { PROFILE } from '../data/projects';
import { GithubIcon, LinkedinIcon } from './Icons';

const SOCIALS = [
  { Icon: () => <GithubIcon size={16} />,   label: 'GitHub',    href: `https://${PROFILE.github}` },
  { Icon: () => <LinkedinIcon size={16} />, label: 'LinkedIn',  href: PROFILE.linkedin },
  { Icon: MessageCircle,                    label: 'WhatsApp',  href: `https://wa.me/${PROFILE.phone.replace(/\D/g, '')}` },
  { Icon: Mail,                             label: 'Email',     href: `mailto:${PROFILE.email}` },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-surface overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-ink leading-tight"
        >
          Travaillons
          <br />
          <span className="text-amber">ensemble.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-sand text-base mt-6 max-w-md leading-relaxed"
        >
          Vous avez un projet en tête ? Je suis disponible pour des missions freelance, collaborations ou opportunités.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-8"
        >
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-3 bg-ink text-canvas px-8 py-4 font-display font-semibold text-sm rounded-lg hover:bg-amber transition-colors"
          >
            Envoyer un email
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap gap-3 mt-10"
        >
          {SOCIALS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 border border-line px-5 py-3 rounded-lg text-ink hover:border-amber hover:text-amber transition-colors"
            >
              <Icon />
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

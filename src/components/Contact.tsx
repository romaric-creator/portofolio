import { motion } from 'framer-motion';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { PROFILE } from '../data/projects';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const SOCIALS = [
  { Icon: GithubIcon,    label: 'GitHub',    href: `https://${PROFILE.github}` },
  { Icon: LinkedinIcon,  label: 'LinkedIn',  href: PROFILE.linkedin },
  { Icon: MessageCircle, label: 'WhatsApp',  href: `https://wa.me/${PROFILE.phone.replace(/\D/g, '')}` },
  { Icon: Mail,          label: 'Email',     href: `mailto:${PROFILE.email}` },
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
          Vous avez un projet en tete ? Je suis disponible pour des missions freelance, collaborations ou opportunites.
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

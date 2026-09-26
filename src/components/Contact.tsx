import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react';
import posthog from 'posthog-js';
import { PROFILE } from '../data/projects';
import { GithubIcon, LinkedinIcon } from './Icons';

const W    = '#f0ede8';
const W60  = 'rgba(240,237,232,0.6)';
const W20  = 'rgba(240,237,232,0.2)';
const W10  = 'rgba(240,237,232,0.12)';
const DARK = '#111110';

const PHONE = PROFILE.phone.replace(/\D/g, '');

export default function Contact() {
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const greeting = name.trim() ? `Bonjour Christian, je m'appelle ${name.trim()}.\n\n` : '';
    const text = encodeURIComponent(`${greeting}${message.trim()}`);
    posthog.capture('contact_whatsapp_form', { hasName: !!name.trim() });
    window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-28 px-6 overflow-hidden" style={{ background: '#a73400' }}>
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="font-code text-[10px] tracking-[0.2em] uppercase"
          style={{ color: W60 }}
        >
          Contact
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4 items-start">

          {/* Left — headline + info */}
          <div>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight"
              style={{ color: W }}
            >
              {['Travaillons', 'ensemble.'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: 0.05 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="block"
                  style={{ fontStyle: i === 1 ? 'italic' : 'normal' }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base mt-6 max-w-md leading-relaxed"
              style={{ color: W60 }}
            >
              Vous avez un projet numérique, un besoin d'automatisation ou une idée à transformer en produit ? Je suis disponible pour des missions freelance, collaborations et opportunités.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => posthog.capture('contact_email_clicked')}
                className="inline-flex items-center gap-3 font-body font-semibold text-sm px-6 py-3 transition-opacity hover:opacity-90"
                style={{ background: DARK, color: W }}
              >
                <Mail size={14} />
                Email
              </a>
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('contact_social_clicked', { platform: 'WhatsApp' })}
                className="inline-flex items-center gap-3 font-body font-semibold text-sm px-6 py-3 hover:opacity-80 transition-opacity"
                style={{ border: `1px solid ${W20}`, color: W }}
              >
                <MessageCircle size={14} />
                WhatsApp direct
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8"
              style={{ borderTop: `1px solid ${W10}` }}
            >
              <div>
                <p className="font-code text-[9px] tracking-widest uppercase mb-2" style={{ color: W60 }}>Email</p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={() => posthog.capture('contact_email_clicked')}
                  className="font-code text-[10px] break-all hover:opacity-70 transition-opacity"
                  style={{ color: W }}
                >
                  {PROFILE.email}
                </a>
              </div>
              <div>
                <p className="font-code text-[9px] tracking-widest uppercase mb-2" style={{ color: W60 }}>Localisation</p>
                <span className="font-code text-[10px] inline-flex items-center gap-1.5" style={{ color: W }}>
                  <MapPin size={10} />
                  {PROFILE.location}
                </span>
              </div>
              <div>
                <p className="font-code text-[9px] tracking-widest uppercase mb-2" style={{ color: W60 }}>Réseaux</p>
                <div className="flex items-center gap-4">
                  <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer"
                    onClick={() => posthog.capture('contact_social_clicked', { platform: 'GitHub' })}
                    style={{ color: W }} className="hover:opacity-70 transition-opacity" aria-label="GitHub">
                    <GithubIcon size={15} />
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
                    onClick={() => posthog.capture('contact_social_clicked', { platform: 'LinkedIn' })}
                    style={{ color: W }} className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
                    <LinkedinIcon size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — WhatsApp form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-8"
              style={{ background: 'rgba(240,237,232,0.92)', border: `1px solid rgba(240,237,232,0.4)` }}
            >
              {/* Nom */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                  Votre nom
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex : Marie Dupont"
                  className="contact-input w-full font-code text-[13px] px-4 py-3 outline-none transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: DARK,
                    caretColor: DARK,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = DARK)}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                  Votre message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Décrivez votre projet ou votre besoin…"
                  rows={5}
                  required
                  className="contact-input w-full font-body text-sm px-4 py-3 outline-none resize-none transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: DARK,
                    caretColor: DARK,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = DARK)}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 font-code text-[11px] tracking-widest uppercase px-6 py-4 mt-1 transition-opacity hover:opacity-90"
                style={{ background: '#a73400', color: W }}
              >
                <Send size={14} />
                Ouvrir WhatsApp avec ce message
              </button>

              <p className="font-code text-[9px]" style={{ color: 'rgba(0,0,0,0.45)' }}>
                Cliquer sur le bouton prépare et ouvre WhatsApp avec votre message pré-rempli.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

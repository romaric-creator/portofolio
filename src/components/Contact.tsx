import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react';
import { capture } from '../lib/analytics';
import { PROFILE } from '../data/projects';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useTranslation } from '../i18n';

const W    = '#e2e8f0';
const W60  = 'rgba(226,232,240,0.6)';
const W20  = 'rgba(226,232,240,0.2)';
const W10  = 'rgba(226,232,240,0.12)';
const DARK = '#1e3a5f';

const PHONE = PROFILE.phone.replace(/\D/g, '');

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName]        = useState('');
  const [email, setEmail]      = useState('');
  const [company, setCompany]  = useState('');
  const [projectType, setType] = useState('');
  const [message, setMessage]  = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const parts = [];
    if (name.trim())    parts.push(`${t.contact.whatsapp.name} : ${name.trim()}`);
    if (email.trim())   parts.push(`${t.contact.whatsapp.email} : ${email.trim()}`);
    if (company.trim()) parts.push(`${t.contact.whatsapp.company} : ${company.trim()}`);
    if (projectType)    parts.push(`${t.contact.whatsapp.type} : ${projectType}`);
    parts.push(`\n${message.trim()}`);

    const text = encodeURIComponent(parts.join('\n'));
    capture('contact_project_request', {
      hasName: !!name.trim(),
      hasEmail: !!email.trim(),
      projectType,
    });
    window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const inputBase = "w-full font-body text-[14px] px-4 py-3.5 outline-none transition-all duration-200 rounded-xl";
  const inputStyle = {
    background: 'rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.1)',
    color: DARK,
    caretColor: DARK,
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = '#84c225');
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)');

  return (
    <section id="contact" className="py-14 px-6 overflow-hidden" style={{ background: '#1e3a5f' }}>
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="font-code text-[10px] tracking-[0.2em] uppercase"
          style={{ color: W60 }}
        >
          {t.contact.sectionLabel}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4 items-start">

          <div>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight"
              style={{ color: W }}
            >
              {t.contact.headingLines.map((word, i) => (
                <motion.span
                  key={i}
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
              {t.contact.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => capture('contact_email_clicked')}
                className="inline-flex items-center gap-3 font-body font-semibold text-sm px-6 py-3 rounded-full transition-opacity hover:opacity-90"
                style={{ background: DARK, color: W }}
              >
                <Mail size={15} />
                Email
              </a>
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => capture('contact_social_clicked', { platform: 'WhatsApp' })}
                className="inline-flex items-center gap-3 font-body font-semibold text-sm px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
                style={{ border: `1px solid ${W20}`, color: W }}
              >
                <MessageCircle size={15} />
                WhatsApp
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
                <p className="font-code text-[9px] tracking-widest uppercase mb-2" style={{ color: W60 }}>
                  {t.contact.labels.email}
                </p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={() => capture('contact_email_clicked')}
                  className="font-body text-[12px] break-all hover:opacity-70 transition-opacity"
                  style={{ color: W }}
                >
                  {PROFILE.email}
                </a>
              </div>
              <div>
                <p className="font-code text-[9px] tracking-widest uppercase mb-2" style={{ color: W60 }}>
                  {t.contact.labels.location}
                </p>
                <span className="font-body text-[12px] inline-flex items-center gap-1.5" style={{ color: W }}>
                  <MapPin size={11} />
                  {PROFILE.location}
                </span>
              </div>
              <div>
                <p className="font-code text-[9px] tracking-widest uppercase mb-2" style={{ color: W60 }}>
                  {t.contact.labels.socials}
                </p>
                <div className="flex items-center gap-4">
                  <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer"
                    onClick={() => capture('contact_social_clicked', { platform: 'GitHub' })}
                    style={{ color: W }} className="hover:opacity-70 transition-opacity" aria-label="GitHub">
                    <GithubIcon size={16} />
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
                    onClick={() => capture('contact_social_clicked', { platform: 'LinkedIn' })}
                    style={{ color: W }} className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                    {t.contact.form.name}
                  </label>
                  <input
                    id="contact-name" type="text" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t.contact.form.namePlaceholder}
                    className={`${inputBase} contact-input`} style={inputStyle}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                    {t.contact.form.email}
                  </label>
                  <input
                    id="contact-email" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.contact.form.emailPlaceholder}
                    className={`${inputBase} contact-input`} style={inputStyle}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-company" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                  {t.contact.form.company}
                </label>
                <input
                  id="contact-company" type="text" value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder={t.contact.form.companyPlaceholder}
                  className={`${inputBase} contact-input`} style={inputStyle}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-type" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                  {t.contact.form.projectType}
                </label>
                <select
                  id="contact-type" value={projectType}
                  onChange={e => setType(e.target.value)}
                  className={inputBase} style={inputStyle}
                  onFocus={onFocus} onBlur={onBlur}
                >
                  <option value="">{t.contact.form.projectTypePlaceholder}</option>
                  {t.contact.projectTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-code text-[9px] tracking-widest uppercase" style={{ color: DARK }}>
                  {t.contact.form.message}
                </label>
                <textarea
                  id="contact-message" value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={4} required
                  className={`${inputBase} contact-input resize-none`} style={inputStyle}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 font-body text-sm font-semibold px-6 py-4 mt-1 rounded-full shadow-lg shadow-[#84c225]/30 hover:shadow-xl hover:shadow-[#84c225]/40 hover:scale-[1.02] transition-all duration-200"
                style={{ background: '#84c225', color: '#ffffff' }}
              >
                <Send size={15} />
                {t.contact.form.submit}
              </button>

              <p className="font-body text-[11px] text-center" style={{ color: 'rgba(0,0,0,0.4)' }}>
                {t.contact.form.disclaimer}
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

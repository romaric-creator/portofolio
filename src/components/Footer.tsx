import { PROFILE, NAV_LINKS } from '../data/projects';
import { GithubIcon, LinkedinIcon } from './Icons';
import { MessageCircle, Mail } from 'lucide-react';

const SOCIALS = [
  { Icon: GithubIcon,   label: 'GitHub',   href: `https://${PROFILE.github}` },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: PROFILE.linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="lg:col-span-1">
            <a href="#hero" className="font-display text-2xl font-normal text-canvas">
              TENDA<span className="text-amber">.</span>
            </a>
            <p className="text-canvas/50 text-sm mt-4 leading-relaxed max-w-[220px]">
              Full-Stack Developer basé à Douala. Disponible pour missions et collaborations internationales.
            </p>
          </div>

          <div>
            <p className="font-code text-[9px] tracking-widest uppercase text-canvas/40 mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="font-body text-sm text-canvas/60 hover:text-amber transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-code text-[9px] tracking-widest uppercase text-canvas/40 mb-5">Correspondance</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-body text-sm text-canvas/60 hover:text-amber transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={13} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${PROFILE.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-canvas/60 hover:text-amber transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-code text-[9px] tracking-widest uppercase text-canvas/40 mb-5">Réseaux</p>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-canvas/60 hover:text-amber transition-colors inline-flex items-center gap-2"
                  >
                    <Icon size={13} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-[12px] text-canvas/40">
            &copy; 2026 {PROFILE.fullName}
          </p>
          <p className="font-body text-[12px] text-canvas/30">
            Douala, Cameroon · Portfolio v3
          </p>
        </div>
      </div>
    </footer>
  );
}

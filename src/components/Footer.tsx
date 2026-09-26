import { PROFILE, NAV_LINKS } from '../data/projects';
import { GithubIcon, LinkedinIcon } from './Icons';
import { MessageCircle, Mail } from 'lucide-react';

const SOCIALS = [
  { Icon: GithubIcon,   label: 'GitHub',   href: `https://${PROFILE.github}` },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: PROFILE.linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" className="font-display text-2xl font-normal text-ink">
              TENDA<span className="text-amber">•</span>
            </a>
            <p className="text-dust text-xs mt-3 leading-relaxed max-w-[200px]">
              Développeur Full-Stack basé à Douala, disponible pour missions et collaborations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-code text-[9px] tracking-widest uppercase text-dust mb-4">Navigation</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="font-code text-[11px] text-sand hover:text-amber transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Correspondance */}
          <div>
            <p className="font-code text-[9px] tracking-widest uppercase text-dust mb-4">Correspondance</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-code text-[11px] text-sand hover:text-amber transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={11} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${PROFILE.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code text-[11px] text-sand hover:text-amber transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={11} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux */}
          <div>
            <p className="font-code text-[9px] tracking-widest uppercase text-dust mb-4">Réseaux</p>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-code text-[11px] text-sand hover:text-amber transition-colors inline-flex items-center gap-2"
                  >
                    <Icon size={11} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-code text-[10px] text-dust">
            &copy; 2026 {PROFILE.fullName}
          </p>
          <p className="font-code text-[10px] text-dust/50">
            Douala, Cameroun · Portfolio v2
          </p>
        </div>
      </div>
    </footer>
  );
}

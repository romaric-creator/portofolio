import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Navbar() {
  const { t, locale, toggleLocale } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const NAV_LINKS: { href: string; label: string; isRoute?: boolean }[] = [
    { href: '#about',    label: t.nav.links.about     },
    { href: '#services', label: t.nav.links.services  },
    { href: '#projects', label: t.nav.links.projects },
    { href: '#stack',    label: t.nav.links.skills   },
    { href: '/gallery',  label: t.nav.links.gallery, isRoute: true },
    { href: '#contact',  label: t.nav.links.contact   },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-canvas/80 backdrop-blur-xl border-b border-line/60 shadow-sm'
            : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <a
            href="#hero"
            className="group/logo flex items-center gap-2.5 flex-shrink-0"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="transition-transform duration-300 group-hover/logo:scale-105"
            >
              <path
                d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
                className="fill-ink transition-colors duration-300 group-hover/logo:fill-[#17304f]"
              />
              <path
                d="M8 9H24V13.5H18.5V24H13.5V13.5H8V9Z"
                fill="white"
              />
            </svg>
            <span className="font-display text-2xl font-semibold leading-none">
              <em className="text-amber italic tracking-[-0.03em]">TENDA</em><span className="text-ink/30 not-italic">.</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, label, isRoute }) => (
              <li key={href}>
                {isRoute ? (
                  <Link
                    to={href}
                    className={`relative font-body text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                      location.pathname === href
                        ? 'text-ink bg-surface'
                        : 'text-dust hover:text-ink'
                    }`}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className={`relative font-body text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                      activeSection === href
                        ? 'text-ink bg-surface'
                        : 'text-dust hover:text-ink'
                    }`}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleLocale}
              className="font-code text-[12px] tracking-widest uppercase px-3 py-2 rounded-full border border-line hover:border-ink text-dust hover:text-ink transition-all duration-200"
              aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-white bg-amber px-5 py-2.5 rounded-full shadow-md shadow-amber/25 hover:bg-[#5a8a18] hover:shadow-lg hover:shadow-amber/35 transition-all duration-200"
            >
              {t.nav.cta}
              <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLocale}
              className="font-code text-[11px] tracking-widest uppercase px-2.5 py-1.5 rounded-full border border-line text-dust hover:text-ink transition-all duration-200"
              aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-ink hover:text-amber transition-colors p-1"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-canvas/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {NAV_LINKS.map(({ href, label, isRoute }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {isRoute ? (
                    <Link
                      to={href}
                      onClick={() => setOpen(false)}
                      className="font-display text-4xl font-normal text-ink hover:text-amber transition-colors"
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="font-display text-4xl font-normal text-ink hover:text-amber transition-colors"
                    >
                      {label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.25 }}
              className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold text-white bg-amber px-6 py-3.5 rounded-full self-start shadow-lg shadow-amber/30 hover:bg-[#5a8a18] transition-all"
            >
              {t.nav.ctaFull}
              <ArrowUpRight size={14} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

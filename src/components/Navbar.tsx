import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { NAV_LINKS } from '../data/projects';

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  return { dark, toggle };
}

export default function Navbar() {
  const { dark, toggle: toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-canvas/90 backdrop-blur-md border-b border-line'
            : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-lg font-normal text-ink leading-none flex-shrink-0"
          >
            TENDA<span className="text-amber">•</span>
          </a>

          {/* Desktop links — centered */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`relative font-code text-[11px] tracking-[0.12em] uppercase transition-colors ${
                    activeSection === href
                      ? 'text-ink'
                      : 'text-dust hover:text-sand'
                  }`}
                >
                  {label}
                  {activeSection === href && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute left-0 right-0 block h-px bg-amber"
                      style={{ bottom: '-3px' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Theme toggle */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 text-dust hover:text-amber transition-colors"
              aria-label={dark ? 'Mode clair' : 'Mode sombre'}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 font-code text-[11px] tracking-[0.12em] uppercase text-ink border border-line px-4 py-2 hover:border-amber hover:text-amber transition-colors"
            >
              Démarrer
              <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-1 text-dust hover:text-amber transition-colors"
              aria-label={dark ? 'Mode clair' : 'Mode sombre'}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-ink hover:text-amber transition-colors p-1"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-canvas flex flex-col justify-center px-8 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-normal text-ink hover:text-amber transition-colors"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.28, duration: 0.25 }}
              className="mt-12 inline-flex items-center gap-2 font-code text-[11px] tracking-widest uppercase text-amber border border-amber/40 px-5 py-3 self-start"
            >
              Démarrer un projet
              <ArrowUpRight size={13} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

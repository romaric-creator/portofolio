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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-canvas/80 backdrop-blur-xl border-b border-line/60 shadow-sm'
            : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <a
            href="#hero"
            className="font-display text-xl font-normal text-ink leading-none flex-shrink-0"
          >
            TENDA<span className="text-amber">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
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
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-dust hover:text-amber hover:bg-surface transition-all duration-200"
              aria-label={dark ? 'Mode clair' : 'Mode sombre'}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-canvas bg-ink px-5 py-2.5 rounded-full hover:bg-amber transition-colors duration-200"
            >
              Démarrer
              <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-dust hover:text-amber transition-colors"
              aria-label={dark ? 'Mode clair' : 'Mode sombre'}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
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
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
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
              transition={{ delay: 0.3, duration: 0.25 }}
              className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold text-canvas bg-ink px-6 py-3.5 rounded-full self-start hover:bg-amber transition-colors"
            >
              Démarrer un projet
              <ArrowUpRight size={14} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect } from 'react';
import posthog from 'posthog-js';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBand from './components/MarqueeBand';
import Projects from './components/Projects';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import Stack from './components/Stack';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

function App() {
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const pct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      [25, 50, 75, 100].forEach(t => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          posthog.capture('scroll_depth', { percent: t });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <CustomCursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeBand />
        <Projects />
        <Services />
        <Process />
        <About />
        <Stack />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

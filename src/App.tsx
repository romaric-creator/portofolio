import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBand from './components/MarqueeBand';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const Stack = lazy(() => import('./components/Stack'));
const Process = lazy(() => import('./components/Process'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const Gallery = lazy(() => import('./pages/Gallery'));

function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const pct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      [25, 50, 75, 100].forEach(t => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          import('./lib/analytics').then(a => a.capture('scroll_depth', { percent: t }));
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
      <Suspense>
        <CustomCursor />
      </Suspense>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        {t.skipToContent}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeBand />
        <Suspense>
          <About />
          <Services />
          <Projects />
          <Stack />
          <Process />
          <Timeline />
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<Suspense><Gallery /></Suspense>} />
    </Routes>
  );
}

export default App;

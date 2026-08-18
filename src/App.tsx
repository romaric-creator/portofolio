import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

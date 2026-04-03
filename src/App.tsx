import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';
import useScrollReveal from './hooks/useScrollReveal';
import CustomCursor from './components/CustomCursor';
import ReadingProgress from './components/ReadingProgress';

function App() {
  const [theme, toggleTheme] = useTheme();
  // useScrollReveal est initialisé ici, mais l'ajout des éléments à observer se fera dans chaque composant de section
  const addRevealElement = useScrollReveal();

  return (
    <>
      <CustomCursor />
      <ReadingProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero addRevealElement={addRevealElement} />
      <Stack addRevealElement={addRevealElement} />
      <Projects addRevealElement={addRevealElement} />
      <Timeline addRevealElement={addRevealElement} />
      <Contact addRevealElement={addRevealElement} />
      <Footer addRevealElement={addRevealElement} />
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

interface NavbarProps {
  theme: string;
  toggleTheme: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo">TC<span className="navbar-logo-dot">.</span></a>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '—'}
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#hero" className="nav-links" onClick={toggleMenu}>
              Accueil
            </a>
          </li>
          <li className="nav-item">
            <a href="#stack" className="nav-links" onClick={toggleMenu}>
              Stack
            </a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-links" onClick={toggleMenu}>
              Projets
            </a>
          </li>
          <li className="nav-item">
            <a href="#timeline" className="nav-links" onClick={toggleMenu}>
              Parcours
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-links" onClick={toggleMenu}>
              Contact
            </a>
          </li>
          <li className="nav-item theme-toggle-mobile">
            <button onClick={toggleTheme} className="theme-toggle-button">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
        <button onClick={toggleTheme} className="theme-toggle-button desktop-only">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

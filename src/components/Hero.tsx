import React, { useEffect, useRef } from 'react';
import { PROFILE } from '../data/projects';
import '../styles/hero.css';
import profileImg from '../assets/IMG-20260214-WA0033.jpg';

interface HeroProps {
  addRevealElement: (el: HTMLElement | null) => void;
}

const Hero: React.FC<HeroProps> = ({ addRevealElement }) => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animation du titre mot par mot
    if (heroTextRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const words = heroTextRef.current.children;
      Array.from(words).forEach((word, index) => {
        (word as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, []);

  // Placeholder pour le pattern SVG africain
  const africanPattern = (
    <svg className="african-pattern" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="kentePattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0L5 5L0 10L-5 5L0 0Z" fill="var(--text-primary)" opacity="0.025" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#kentePattern)" />
    </svg>
  );

  const linkedinIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );

  return (
    <section id="hero" className="hero-section reveal-element" ref={addRevealElement}>
      {africanPattern}
      <div className="hero-grid-container">
        <div className="hero-content-main">
          <div className="hero-branding-intro">
            <span className="hero-surname">Tenda Christian Boupda</span>
            <div className="name-line"></div>
          </div>

          <h1 className="hero-title-editorial" ref={heroTextRef}>
            {PROFILE.heroPhrase.split(' ').map((word, index) => (
              <span key={index} className="word-reveal">
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <div className="hero-details">
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <p className="detail-value">{PROFILE.status}</p>
            </div>
            <div className="detail-item">
              <span className="detail-label">Localisation</span>
              <p className="detail-value">{PROFILE.location}</p>
            </div>
            <div className="detail-item">
              <span className="detail-label">LinkedIn</span>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="detail-link">
                {linkedinIcon} connect
              </a>
            </div>
          </div>
        </div>

        <div className="hero-portrait-section">
          <div className="portrait-wrapper">
            <img src={profileImg} alt={PROFILE.fullName} className="portrait-main-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

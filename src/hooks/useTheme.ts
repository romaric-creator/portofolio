import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    // Vérifie si le thème est déjà enregistré dans localStorage ou si l'utilisateur préfère le mode sombre
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent | React.KeyboardEvent) => {
    const currentTheme = theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Animation de vague circulaire
    if (event && 'clientX' in event && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Récupère la couleur de fond de la destination
      const destinationBg = newTheme === 'dark' ? '#0E0E0B' : '#FAF7F0';

      const transitionDiv = document.createElement('div');
      transitionDiv.id = 'theme-transition';
      transitionDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${destinationBg};
        clip-path: circle(0% at ${x}px ${y}px);
        z-index: 99999;
        pointer-events: none;
      `;
      document.body.appendChild(transitionDiv);

      requestAnimationFrame(() => {
        transitionDiv.style.transition = 'clip-path 0.7s cubic-bezier(0.65, 0, 0.35, 1)';
        transitionDiv.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;

        // Change le thème réel à la moitié de l'animation pour un fondu fluide
        setTimeout(() => {
          setTheme(newTheme);
        }, 350);
      });

      transitionDiv.addEventListener('transitionend', () => {
        transitionDiv.remove();
      });
    } else {
      setTheme(newTheme);
    }
  };

  return [theme, toggleTheme] as const;
};

export default useTheme;

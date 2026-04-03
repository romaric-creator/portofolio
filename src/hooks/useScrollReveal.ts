import { useEffect, useRef } from 'react';

const useScrollReveal = () => {
  const elements = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    observerRef.current = observer;

    // Observer les éléments déjà présents
    elements.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const addRevealElement = (el: HTMLElement | null) => {
    if (el && !elements.current.includes(el)) {
      elements.current.push(el);
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    }
  };

  return addRevealElement;
};

export default useScrollReveal;

import { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setHasPointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hover = !!target.closest('a, button, [data-hover]');
      el.dataset.hover = hover ? '1' : '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-amber w-2 h-2 -ml-1 -mt-1 transition-[width,height,margin,opacity] duration-150 data-[hover='1']:w-5 data-[hover='1']:h-5 data-[hover='1']:-ml-2.5 data-[hover='1']:-mt-2.5 data-[hover='1']:opacity-60"
      style={{ willChange: 'transform' }}
    />
  );
}

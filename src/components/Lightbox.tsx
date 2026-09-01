import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  index: number;
  projectName: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, projectName, onClose, onPrev, onNext }: LightboxProps) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    if (e.key === 'ArrowRight' && hasNext) onNext();
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9998] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-canvas/70 hover:text-canvas transition-colors p-2 rounded-lg hover:bg-white/10"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-canvas/60 text-sm font-medium">
            {index + 1} / {images.length}
          </div>
        )}

        {/* Prev */}
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 text-canvas/70 hover:text-canvas transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Précédent"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="img-relief-dark rounded-lg shadow-2xl overflow-hidden w-[90vw] h-[82vh] flex items-center justify-center">
            <img
              src={images[index]}
              alt={`${projectName} — capture ${index + 1}`}
              className="w-full h-full object-contain block"
            />
          </div>
          <p className="text-center text-canvas/50 text-xs mt-3 font-medium">{projectName}</p>
        </motion.div>

        {/* Next */}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 text-canvas/70 hover:text-canvas transition-colors p-3 rounded-full hover:bg-white/10"
            aria-label="Suivant"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

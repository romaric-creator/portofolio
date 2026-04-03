import { useRef, useEffect } from 'react';

const HeroGeometric = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX - innerWidth / 2) / 25;
            const moveY = (clientY - innerHeight / 2) / 25;

            container.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="hero-geometric-container" ref={containerRef}>
            <div className="geometric-shape shape-1"></div>
            <div className="geometric-shape shape-2"></div>
            <div className="geometric-shape shape-3"></div>
            <style>{`
        .hero-geometric-container {
          position: relative;
          width: 300px;
          height: 300px;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .geometric-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid var(--accent-primary);
          opacity: 0.2;
          border-radius: 20px;
        }

        .shape-1 { transform: translateZ(50px) rotate(45deg); }
        .shape-2 { transform: translateZ(0px) rotate(15deg); border-color: var(--accent-secondary); border-style: dashed; }
        .shape-3 { transform: translateZ(-50px) rotate(-15deg); opacity: 0.1; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .hero-geometric-container {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default HeroGeometric;

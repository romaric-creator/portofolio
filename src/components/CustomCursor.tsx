import { useState, useEffect, useRef } from 'react';
import '../styles/globals.css';

const CustomCursor = () => {
    const [isInteractable, setIsInteractable] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            if (target) {
                const isClickable = target.closest('a, button, [role="button"], .interactable');
                setIsInteractable(!!isClickable);
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        let animId: number;
        const animate = () => {
            const lerpFactor = 0.15;
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorPos.current.x}px`;
                cursorRef.current.style.top = `${cursorPos.current.y}px`;
            }
            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);
        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isInteractable ? 'interactable' : ''}`}
        />
    );
};

export default CustomCursor;

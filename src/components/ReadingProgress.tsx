import { useState, useEffect } from 'react';
import '../styles/globals.css';

const ReadingProgress = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const progress = (currentScroll / totalHeight) * 100;
            setWidth(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <div className="reading-progress-bar" style={{ width: `${width}%` }} />;
};

export default ReadingProgress;

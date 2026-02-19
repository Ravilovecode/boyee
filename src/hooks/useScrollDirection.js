import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Returns 'down' or 'up' based on scroll direction.
 * Returns null when near the top (< threshold px).
 * Resets automatically on route change.
 */
const useScrollDirection = (threshold = 60) => {
    const [scrollDir, setScrollDir] = useState(null);
    const lastScrollY = useRef(0);
    const location = useLocation();

    // Reset state on every page navigation
    useEffect(() => {
        setScrollDir(null);
        lastScrollY.current = window.scrollY;
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const diff = currentY - lastScrollY.current;

            if (currentY < threshold) {
                setScrollDir(null); // near top — always show both navs
            } else if (diff > 4) {
                setScrollDir('down');
            } else if (diff < -4) {
                setScrollDir('up');
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return scrollDir;
};

export default useScrollDirection;

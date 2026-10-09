import React, { useState, useEffect } from 'react';

/**
 * Dribbble-inspired top scroll progress ribbon.
 * Renders a sleek 2.5px amber-to-gold gradient line at the very top of the viewport
 * that dynamically tracks reading progress across any page.
 */
export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 transition-[width] duration-75 ease-out shadow-[0_0_10px_rgba(245,158,11,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

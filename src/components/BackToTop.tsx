import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Dribbble-inspired floating Scroll to Top button with animated SVG progress ring.
 */
export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  // SVG circle calculations for 44px container
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex items-center justify-center h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-white/90 backdrop-blur-md border border-neutral-300/80 shadow-lg hover:shadow-xl hover:border-amber-500/50 hover:bg-white text-neutral-800 hover:text-amber-700 transition-all duration-300 hover:-translate-y-1 active:scale-95 group cursor-pointer"
      title="Scroll to top"
    >
      {/* Circular SVG Progress Ring */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none p-0.5"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(217, 119, 6, 0.15)"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-out"
        />
      </svg>

      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
};

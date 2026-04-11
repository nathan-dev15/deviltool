import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 animate-pop-in ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-5" />
    </button>
  );
};
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const darkIds = new Set(['hero', 'clients', 'map', 'qhse', 'specs', 'contact', 'footer']);

    const update = () => {
      const scrollY = window.scrollY;
      // Show after scrolling past hero
      setVisible(scrollY > 600);

      // Detect current section's background
      const probe = scrollY + window.innerHeight * 0.05;
      let isDark = true;
      for (const id of darkIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (probe >= top && probe < bottom) {
            isDark = true;
            break;
          }
        }
      }
      const lightIds = ['about', 'industries', 'epc', 'projects'];
      for (const id of lightIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (probe >= top && probe < bottom) {
            isDark = false;
            break;
          }
        }
      }
      setOnDark(isDark);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const label = language === 'ar' ? 'العودة للأعلى' : language === 'en' ? 'Scroll to top' : 'Retour en haut';

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label={label}
      className={`scroll-to-top ${visible ? 'visible' : ''} ${onDark ? 'on-dark' : ''}`}
    >
      <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
    </button>
  );
}

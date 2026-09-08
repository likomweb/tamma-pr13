'use client';

import React, { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const darkIds = new Set(['hero', 'clients', 'map', 'contact', 'footer']);

    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      setProgress(docHeight > 0 ? scrollY / docHeight : 0);

      // Check which section we're in
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
      // Light sections override
      const lightIds = ['about', 'industries', 'projects', 'specs', 'qhse', 'epc'];
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

  return (
    <div
      className={`reading-progress ${onDark ? '' : 'on-dark'}`}
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

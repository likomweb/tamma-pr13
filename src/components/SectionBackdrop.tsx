'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * SectionBackdrop — a fixed atmospheric gradient that shifts between
 * section themes as the user scrolls. Uses RAF + debounce to reduce jank.
 */
export default function SectionBackdrop() {
  const [variant, setVariant] = useState<'dark' | 'light'>('dark');
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let isDark = true;
    const darkIds = ['hero', 'clients', 'map', 'specs', 'qhse'];
    const lightIds = ['about', 'industries', 'epc', 'projects', 'contact'];

    for (const id of darkIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) { isDark = true; break; }
      }
    }
    for (const id of lightIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) { isDark = false; break; }
      }
    }
    setVariant(isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [update]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: variant === 'dark'
          ? 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(196,112,63,0.06) 0%, transparent 70%)'
          : 'transparent',
        transition: 'background 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    />
  );
}

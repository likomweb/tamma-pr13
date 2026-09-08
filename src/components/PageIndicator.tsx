'use client';

import { useEffect, useState } from 'react';

const SECTIONS: { id: string; num: string; name: string }[] = [
  { id: 'about', num: '01', name: 'Profil' },
  { id: 'industries', num: '02', name: 'Pôles' },
  { id: 'epc', num: '03', name: 'Chaîne EPC' },
  { id: 'projects', num: '04', name: 'Réalisations' },
  { id: 'map', num: '05', name: 'Carte' },
  { id: 'specs', num: '06', name: 'Moyens' },
  { id: 'qhse', num: '07', name: 'QHSE' },
  { id: 'contact', num: '08', name: 'Contact' },
];

export default function PageIndicator() {
  const [current, setCurrent] = useState(SECTIONS[0]);
  const [atTop, setAtTop] = useState(true);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const darkIds = new Set(['hero', 'clients', 'map', 'qhse', 'specs', 'contact', 'footer']);
    const onScroll = () => {
      const scrollY = window.scrollY;
      setAtTop(scrollY < 100);

      const pos = scrollY + window.innerHeight * 0.35;
      let active = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          if (pos >= top) active = s;
        }
      }
      setCurrent(active);

      // Detect background
      const probe = scrollY + window.innerHeight * 0.05;
      let isDark = false;
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
      setOnDark(isDark);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (atTop) return null;

  return (
    <div className={`page-indicator ${onDark ? 'on-dark' : ''}`}>
      <span className="font-semibold text-current">P.{current.num}</span>
      <span className="mx-1.5 opacity-40">/</span>
      <span className="opacity-60">08</span>
      <span className="ml-2">{current.name}</span>
    </div>
  );
}

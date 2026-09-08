'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MouseEffectsProps {
  className?: string;
  showTrail?: boolean;
  showGradient?: boolean;
}

export default function MouseEffects({
  className = '',
  showTrail = false,
  showGradient = true,
}: MouseEffectsProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const target = useRef({ x: -1000, y: -1000 });
  const current = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;

    const node = containerRef.current;
    if (!node) return;

    // Skip on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      // Only react when cursor is inside the section
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        target.current = { x, y };
        if (!active) setActive(true);
      } else if (active) {
        setActive(false);
      }
    };

    const tick = () => {
      // Lerp for smooth trail
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }
      if (gradientRef.current) {
        gradientRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduceMotion]);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      {showGradient && (
        <div
          ref={gradientRef}
          className={`mouse-gradient ${active ? 'active' : ''}`}
        />
      )}
      {showTrail && (
        <div
          ref={trailRef}
          className={`cursor-trail ${active ? 'active' : ''}`}
        />
      )}
    </div>
  );
}

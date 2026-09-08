'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import MouseEffects from './MouseEffects';

export default function Clients() {
  const { language } = useLanguage();

  const clientList = [
    { name: 'SONATRACH', type: 'Hydrocarbures & Énergie' },
    { name: 'SONELGAZ', type: 'Transport THT/HT' },
    { name: 'GCB', type: 'Génie Civil Pétrolier' },
    { name: 'TÉCNICAS REUNIDAS', type: 'Ingénierie Pétrochimique' },
    { name: 'SAMSUNG ENGINEERING', type: 'Contracteur EPC' },
    { name: 'ALGÉRIE TÉLÉCOM', type: 'Fibre Optique' },
    { name: 'SNTF', type: 'Infrastructures Ferroviaires' },
    { name: 'TECNIMONT', type: 'Ingénierie Industrielle' },
    { name: 'BASP', type: 'Services Pétroliers' },
    { name: 'ENTP', type: 'Travaux aux Puits' },
    { name: 'ENCC - SPA', type: 'Charpente & Chaudronnerie' },
    { name: 'KAHRIF', type: 'Électrification HT' },
    { name: 'SARPI', type: 'Projets Industriels' },
    { name: 'INERGA', type: 'Infrastructures Énergétiques' },
  ];

  const marqueeList = [...clientList, ...clientList];

  return (
    <section id="clients" className="py-12 lg:py-14 bg-[var(--color-noir)] text-white relative overflow-hidden scroll-dark">

      {/* Mouse gradient + trail */}
      <MouseEffects />

      {/* Section transition — fade into cream About section below */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-paper)] pointer-events-none" />

      <div className="container-editorial mb-7 flex items-center justify-between">
        <div className="flex items-baseline gap-5">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-semibold text-[var(--color-rust)]">14</span>
            <span className="text-[10px] font-bold tracking-[0.22em] text-white/70 uppercase">
              {language === 'ar' ? 'شركاؤنا' : 'Partenaires & Donneurs d\'Ordres'}
            </span>
          </div>
          <span className="hidden sm:block w-8 h-px bg-[var(--color-rust)]" />
          <span className="hidden sm:block text-[10px] font-bold tracking-[0.22em] text-white/70 uppercase">
            25+ Ans · Confiance Institutionnelle
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-r from-[var(--color-noir)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-l from-[var(--color-noir)] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee py-2 flex items-center gap-16 sm:gap-20">
          {marqueeList.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-5 text-left group cursor-default shrink-0"
            >
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-white tracking-[0.05em] font-display uppercase">
                  {client.name}
                </span>
                <span className="text-[10px] text-white/55 font-medium mt-0.5 tracking-wide">
                  {client.type}
                </span>
              </div>
              <span className="text-white/10 font-light text-lg ml-4">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

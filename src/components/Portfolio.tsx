'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X, MapPin, Building2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  descriptor: string;
  descriptorEn: string;
  client: string;
  location: string;
  year: string;
  description: string;
  descriptionEn: string;
  image: string;
  scope: string[];
  scopeEn: string[];
}

const KEY_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Poste Électrique 400/220 kV',
    nameEn: 'Electrical Substation 400/220 kV',
    category: 'Transport THT',
    descriptor: 'Larbaa · 2020',
    descriptorEn: 'Larbaa · 2020',
    client: 'SONELGAZ STOS',
    location: 'LARBAA, W. BLIDA',
    year: '2020',
    description: 'Construction du poste électrique 400/220 kV de Larbaa. Génie civil lourd, montage des transformateurs de puissance, mise en place des disjoncteurs THT et raccordement au réseau national.',
    descriptionEn: 'Construction of the 400/220 kV electrical substation in Larbaa. Heavy civil works, power transformer assembly, high-voltage circuit breaker installation and connection to the national grid.',
    image: '/images/tamma_real/larbaa_full.webp',
    scope: ['Génie civil lourd pour transformateurs de puissance', 'Montage électromécanique des travées 400 kV', 'Câblage des armoires de relayage et contrôle-commande', 'Raccordement au réseau national Sonelgaz'],
    scopeEn: ['Heavy civil works for power transformers', 'Electromechanical assembly of 400 kV bays', 'SCADA and relay cabinet wiring', 'Connection to the Sonelgaz national grid'],
  },
  {
    id: 'p2',
    name: 'Poste Blindé GIS 60/30 kV',
    nameEn: 'GIS Metal-Enclosed Substation 60/30 kV',
    category: 'Postes Blindés GIS',
    descriptor: 'Eucalyptus · 2022',
    descriptorEn: 'Eucalyptus · 2022',
    client: 'SONELGAZ ENGINEERING',
    location: 'EUCALYPTUS, W. ALGIERS',
    year: '2022',
    description: 'Montage spécialisé de l\'appareillage blindé sous enveloppe métallique (GIS Siemens), caniveaux techniques, câblage contrôle-commande et essais diélectriques.',
    descriptionEn: 'Specialized metal-enclosed switchgear assembly (Siemens GIS), technical cable ducts, SCADA wiring and dielectric testing.',
    image: '/images/tamma_real/eucalyptus_gis.webp',
    scope: ['Génie civil du bâtiment blindé GIS', 'Manutention et assemblage des modules Siemens', 'Câblage contrôle-commande', 'Essais diélectriques et mise en service'],
    scopeEn: ['Civil engineering of the GIS building', 'Handling and assembly of Siemens modules', 'SCADA and control-command wiring', 'Dielectric testing and commissioning'],
  },
  {
    id: 'p3',
    name: 'Poste Blindé GIS 60/10 kV',
    nameEn: 'GIS Metal-Enclosed Substation 60/10 kV',
    category: 'Postes Blindés GIS',
    descriptor: 'Bouzereah · 2023',
    descriptorEn: 'Bouzereah · 2023',
    client: 'SONELGAZ ENGINEERING',
    location: 'BOUZEREAH, W. ALGIERS',
    year: '2023',
    description: 'Montage sous enveloppe métallique pour poste GIS 60/10 kV, câblage contrôle-commande et essais de mise en service.',
    descriptionEn: 'Metal-enclosed switchgear assembly for the 60/10 kV GIS substation, SCADA wiring and commissioning tests.',
    image: '/images/tamma_real/larbaa_switchyard.webp',
    scope: ['Montage sous enveloppe métallique GIS', 'Câblage contrôle-commande', 'Essais de mise en service'],
    scopeEn: ['GIS metal-enclosed switchgear assembly', 'SCADA and control-command wiring', 'Commissioning tests'],
  },
  {
    id: 'p4',
    name: 'Poste Injecteur 400/220 kV',
    nameEn: 'Injector Substation 400/220 kV',
    category: 'Transport THT',
    descriptor: 'Ain Arnat · 2019',
    descriptorEn: 'Ain Arnat · 2019',
    client: 'SONELGAZ STOS',
    location: 'AIN ARNAT, W. SÉTIF',
    year: '2019',
    description: "Construction du poste injecteur 400/220 kV pour l'évacuation de la centrale thermique. Travaux d'ingénierie civile, fondations des transformateurs et montage électromécanique haute tension.",
    descriptionEn: 'Construction of the 400/220 kV injector substation for power plant evacuation. Civil engineering works, transformer foundations and high-voltage electromechanical assembly.',
    image: '/images/tamma_real/ain_arnat_full.webp',
    scope: ['Ingénierie civile et fondations transformateurs', 'Montage électromécanique haute tension', 'Plateformes d\'évacuation de la centrale thermique', 'Essais et mise en service'],
    scopeEn: ['Civil engineering and transformer foundations', 'High-voltage electromechanical assembly', 'Power plant evacuation platforms', 'Testing and commissioning'],
  },
  {
    id: 'p5',
    name: 'Poste PACK+ 60/30 kV',
    nameEn: 'PACK+ Substation 60/30 kV',
    category: 'Transport HT/MT',
    descriptor: 'Ain Ouessara · 2021',
    descriptorEn: 'Ain Ouessara · 2021',
    client: 'SONELGAZ STOS',
    location: 'AIN OUESSARA, W. DJELFA',
    year: '2021',
    description: "Construction du poste PACK+ 60/30 kV. Génie civil, montage électromécanique et essais. Travaux complétés incluant connexions électriques, installation et traitement d'huile des transformateurs principaux.",
    descriptionEn: 'Construction of the PACK+ 60/30 kV substation. Civil engineering, electromechanical assembly and testing. Completed works including electrical connections, installation and oil treatment of main transformers.',
    image: '/images/tamma_real/ain_arnat_switchyard.webp',
    scope: ['Génie civil du poste', 'Montage électromécanique 60/30 kV', 'Connexions électriques des transformateurs', "Traitement d'huile des transformateurs principaux"],
    scopeEn: ['Substation civil engineering', '60/30 kV electromechanical assembly', 'Transformer electrical connections', 'Main transformer oil treatment'],
  },
  {
    id: 'p6',
    name: 'Ligne Aérienne 400 kV',
    nameEn: '400 kV Overhead Power Line',
    category: 'Transport THT',
    descriptor: 'Marsat · 2021',
    descriptorEn: 'Marsat · 2021',
    client: 'SONELGAZ STOS',
    location: 'MARSAT, W. MOSTAGANEM',
    year: '2021',
    description: "Construction de la ligne aérienne 400 kV avec coupure à Hadjret Ennouss/Tipaza. Montage et levage des pylônes métalliques, tirage et réglage des câbles conducteurs sous tension mécanique.",
    descriptionEn: 'Construction of the 400 kV overhead line with section break at Hadjret Ennouss/Tipaza. Pylon assembly and lifting, conductor stringing and tensioning under mechanical load.',
    image: '/images/tamma_real/hadjret_400kv_full.webp',
    scope: ['Fouilles, ferraillage et coulage des massifs', "Assemblage et levage des pylônes métalliques", 'Tirage et réglage des câbles conducteurs', "Câble de garde OPGW et raccordement"],
    scopeEn: ['Excavation, rebar and concrete foundations', 'Pylon assembly and lifting', 'Conductor stringing and tensioning', 'OPGW guard cable and connection'],
  },
];

const FULL_PROJECTS = [
  { num: '01', year: '2020', sector: 'THT', project: 'Poste 400/220 kV', location: 'LARBAA, W. BLIDA', client: 'SONELGAZ STOS' },
  { num: '02', year: '2022', sector: 'GIS', project: 'Poste GIS 60/30 kV', location: 'EUCALYPTUS, W. ALGIERS', client: 'SONELGAZ ENGINEERING' },
  { num: '03', year: '2023', sector: 'GIS', project: 'Poste GIS 60/10 kV', location: 'BOUZEREAH, W. ALGIERS', client: 'SONELGAZ ENGINEERING' },
  { num: '04', year: '2021', sector: 'THT', project: 'Poste Injecteur 400/220 kV', location: 'AIN ARNAT, W. SETIF', client: 'SONELGAZ STOS' },
  { num: '05', year: '2022', sector: 'THT', project: 'Poste PACK+ 60/30 kV', location: 'AIN OUESSARA, W. DJELFA', client: 'SONELGAZ STOS' },
  { num: '06', year: '2022', sector: 'EPC', project: 'Travaux centrale et traitement huile', location: 'AIN OUESSARA, W. DJELFA', client: 'SONELGAZ ENGINEERING' },
  { num: '07', year: '2019', sector: 'ELEC', project: 'Tests CHELTERS MT/LV ADRAR', location: 'W. ADRAR', client: 'SONATRACH' },
  { num: '08', year: '2023', sector: 'THT', project: 'Ligne aerienne 400 kV', location: 'MARSAT, W. MOSTAGANEM', client: 'SONELGAZ STOS' },
  { num: '09', year: '2021', sector: 'THT', project: 'Coupure ligne 400 kV Hadjret Ennous', location: 'MAHALMA / TIPAZA', client: 'SONELGAZ STOS' },
  { num: '10', year: '2023', sector: 'ELEC', project: 'Liaison souterraine 60 kV', location: 'REGHAIA, W. ALGIERS', client: 'SONELGAZ STOS' },
  { num: '11', year: '2022', sector: 'ELEC', project: 'Ligne aero-souterraine 220 kV Cap Blanc', location: 'MASSERGHINE, W. ORAN', client: 'SONELGAZ STOS' },
  { num: '12', year: '2021', sector: 'GC', project: 'Genie civil 220 kV Skikda', location: 'W. SKIKDA', client: 'SONELGAZ STOS' },
  { num: '13', year: '2023', sector: 'THT', project: 'Sous-station 60/30 kV RAR', location: 'OUED BELLIL, W. GHARDAIA', client: 'SONELGAZ ENGINEERING' },
  { num: '14', year: '2020', sector: 'FIBER', project: 'Fibre optique 320 km', location: 'BORDJ EL HAOUES, W. DJANET', client: 'ALGERIE TELECOM' },
  { num: '15', year: '2020', sector: 'FIBER', project: 'Fibre optique 160 km', location: 'W. ILLIZI', client: 'ALGERIE TELECOM' },
  { num: '16', year: '2022', sector: 'GC', project: 'Maintenance genie civil', location: 'RHOUD ENOUSS', client: 'SONATRACH DP/RN' },
  { num: '17', year: '2021', sector: 'HYD', project: 'Maintenance reseaux hydrauliques HMD', location: 'HASSI MESSAOUD', client: 'SONATRACH DP/HMD' },
  { num: '18', year: '2022', sector: 'HYD', project: 'Pose/depose conduites eau 28 km', location: 'OHANET', client: 'SONATRACH DP/HMD' },
  { num: '19', year: '2023', sector: 'EPC', project: 'Usine dolomite EPC', location: 'AIN M LILA, W. OUM EL BOUAGHI', client: 'ENCC-SPA' },
  { num: '20', year: '2021', sector: 'HYD', project: 'Pose/depose conduites eau', location: 'GASSI TOUIL', client: 'SONATRACH FOR HMD' },
  { num: '21', year: '2020', sector: 'GC', project: 'Rehabilitation reseaux sanitation', location: 'TFT', client: 'SONATRACH DP/TFT' },
  { num: '22', year: '2023', sector: 'GC', project: 'Rehab. plateformes workover', location: 'HASSI MESSAOUD and GASSI', client: 'SONATRACH DP/HMD' },
  { num: '23', year: '2021', sector: 'MNT', project: 'Pompes submersibles Berkine', location: 'GROUPEMENT BERKINE', client: 'DIS LTD - WEATHERFORD and ENTP JV' },
  { num: '24', year: '2022', sector: 'MNT', project: 'Location groupes electogenes et cabines', location: 'BRN', client: 'BASP/HMD' },
  { num: '25', year: '2019', sector: 'MNT', project: 'Location camions et transport personnel', location: 'BLIDA', client: 'INERGA' },
  { num: '26', year: '2020', sector: 'GC', project: 'Fourniture magasins d archives', location: 'HASSI MESSAOUD', client: 'GROUPEMENT QC' },
  { num: '27', year: '2023', sector: 'HYD', project: 'Installation systemes irrigation', location: 'OUARGLA', client: 'DSA OUARGLA' },
  { num: '28', year: '2021', sector: 'MNT', project: 'Location bulldozers', location: 'HASSI MESSAOUD', client: 'ENAGEO' },
  { num: '29', year: '2020', sector: 'HYD', project: 'Forage puits eau 200 m', location: 'SOUGEUR, TIARET', client: 'DRE TIARET' },
  { num: '30', year: '2023', sector: 'THT', project: 'Poste PACK+ 60/30 kV', location: 'EL BORDJIA, MOSTAGANEM', client: 'SONELGAZ STOS' },
  { num: '31', year: '2022', sector: 'ELEC', project: 'Forage horizontal 60 kV', location: 'SKIKDA VILLE', client: 'SONELGAZ STOS' },
  { num: '32', year: '2023', sector: 'ELEC', project: 'Deroulage cables 6,5 km AKB', location: 'AKBOU, W. BEJAIA', client: 'SONELGAZ STOS' },
  { num: '33', year: '2021', sector: 'THT', project: 'Ligne 220 kV phosphate 33 km', location: 'BLAD EL HADBA, W. TEBESSA', client: 'SONELGAZ STOS' },
  { num: '34', year: '2023', sector: 'THT', project: 'Levage pylones 60 kV Zeralda', location: 'ZERALDA, W. ALGIERS', client: 'SONELGAZ STOS' },
];

const SECTOR_COLORS: Record<string, string> = {
  THT: 'bg-[var(--color-accent)] text-white',
  GIS: 'bg-[var(--color-ink)] text-white',
  ELEC: 'bg-[var(--color-graphite)] text-white',
  FIBER: 'bg-[#2d6a4f] text-white',
  HYD: 'bg-[#1d4e89] text-white',
  EPC: 'bg-[var(--color-accent)] text-white',
  GC: 'bg-[var(--color-charcoal)] text-white',
  MNT: 'bg-[var(--color-mist)] text-[var(--color-ink)]',
};

export default function Portfolio() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [showFullArchive, setShowFullArchive] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, KEY_PROJECTS.length - slidesPerView);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < maxIndex;

  const goLeft = () => { if (canGoLeft) setCurrentIndex((i) => i - 1); };
  const goRight = () => { if (canGoRight) setCurrentIndex((i) => i + 1); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedProject) return;
      if (e.key === 'ArrowLeft') goLeft();
      if (e.key === 'ArrowRight') goRight();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canGoLeft, canGoRight, selectedProject]);

  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goRight();
      else goLeft();
    }
    touchStart.current = null;
  };

  const cardWidth = 100 / slidesPerView;

  return (
    <section id="projects" className="bg-white section-pad">
      <div className="container-editorial">
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 mb-8 lg:mb-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="section-label">
                <span className="num">04</span>
                <span className="name">{language === 'ar' ? 'المشاريع' : language === 'en' ? 'Projects' : 'Realisations'}</span>
              </div>
              <div className="eyebrow">Nos Realisations</div>
              <h2 className="display-lg text-[var(--color-ink)]">
                34 projets documentes.<br />Vingt-cinq ans.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="body-lg text-[var(--color-graphite)]">
                {language === 'fr'
                  ? 'Cliquez sur un projet pour consulter le dossier technique.'
                  : language === 'en'
                  ? 'Click on a project to access the technical file.'
                  : 'انقر على مشروع.'}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="mb-6 lg:mb-8">
          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            ref={containerRef}
          >
            <div className="overflow-hidden">
              <div
                className={`flex${shouldReduceMotion ? '' : ' transition-transform duration-500'}`}
                style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
              >
                {KEY_PROJECTS.map((p) => (
                  <div
                    key={p.id}
                    className="shrink-0 px-3"
                    style={{ width: `${cardWidth}%` }}
                  >
                    <article
                      onClick={() => setSelectedProject(p)}
                      className="card group cursor-pointer h-full flex flex-col overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0e12]">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className={`object-cover${shouldReduceMotion ? '' : ' transition-transform duration-700 group-hover:scale-105'}`}
                        />
                        {/* Hover overlay — subtle zoom hint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        {/* Hover preview hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold tracking-[0.16em] text-white bg-white/15 backdrop-blur-md px-3 py-1.5 uppercase rounded-full">
                            {p.category}
                          </span>
                          <span className="text-[10px] font-mono tracking-[0.12em] text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full">
                            {language === 'en' ? p.descriptorEn : p.descriptor}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 lg:p-7 flex flex-col flex-1 space-y-4">
                        <div className="flex items-center gap-2 text-[11px] text-[var(--color-mist)]">
                          <MapPin className="w-3 h-3 text-[var(--color-accent)]" />
                          <span className="font-medium tracking-wide">{p.location}</span>
                        </div>
                        <h3 className="text-base lg:text-lg font-semibold text-[var(--color-ink)] font-display tracking-tight leading-[1.25]">
                          {language === 'en' ? p.nameEn : p.name}
                        </h3>
                        <p className="text-sm text-[var(--color-graphite)] leading-[1.65] flex-1">
                          {(language === 'en' ? p.descriptionEn : p.description).substring(0, 110)}...
                        </p>
                        <div className="pt-4 flex items-center justify-between border-t border-[rgba(10,12,13,0.06)]">
                          <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--color-accent)] uppercase">
                            {p.client}
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[var(--color-paper)] flex items-center justify-center group-hover:bg-[var(--color-ink)] group-hover:text-white text-[var(--color-graphite)] transition-all duration-300">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Side arrows — all screen sizes */}
            <div className="flex absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <button
                type="button"
                onClick={goLeft}
                disabled={!canGoLeft}
                aria-label="Previous project"
                className={`pointer-events-auto absolute -left-2 lg:-left-5 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(10,12,13,0.08)] shadow-lg flex items-center justify-center text-[var(--color-ink)] transition-all duration-300 active:scale-95 ${
                  canGoLeft ? 'hover:bg-[var(--color-ink)] hover:text-white hover:scale-110 hover:shadow-xl' : 'opacity-30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goRight}
                disabled={!canGoRight}
                aria-label="Next project"
                className={`pointer-events-auto absolute -right-2 lg:-right-5 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(10,12,13,0.08)] shadow-lg flex items-center justify-center text-[var(--color-ink)] transition-all duration-300 active:scale-95 ${
                  canGoRight ? 'hover:bg-[var(--color-ink)] hover:text-white hover:scale-110 hover:shadow-xl' : 'opacity-30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-8 h-1.5 bg-[var(--color-accent)]'
                    : 'w-1.5 h-1.5 bg-[var(--color-mist)]/30 hover:bg-[var(--color-mist)]/60'
                }`}
              />
            ))}
            <span className="ml-3 text-[10px] font-mono text-[var(--color-mist)] tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Archive Table */}
        <ScrollReveal>
          <div className="card overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 lg:p-8 border-b border-[rgba(10,12,13,0.06)]">
              <div>
                <h4 className="text-lg font-semibold text-[var(--color-ink)] font-display">
                  Registre Complet des 34 Realisations
                </h4>
                <p className="text-sm text-[var(--color-mist)] mt-1">
                  Projets certifies et receptionnes par nos clients.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullArchive(!showFullArchive)}
                className="btn-outline text-xs shrink-0"
              >
                {showFullArchive
                  ? (language === 'fr' ? 'Masquer' : 'Hide')
                  : (language === 'fr' ? 'Afficher les 34 projets' : 'Show all 34')}
                {showFullArchive ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </button>
            </div>

            {showFullArchive && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[680px]">
                  <thead className="bg-[var(--color-paper)]">
                    <tr>
                      <th className="p-3 sm:p-4 pl-4 sm:pl-6 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-mist)]">N</th>
                      <th className="p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-mist)]">
                        {language === 'fr' ? 'Projet' : language === 'en' ? 'Project' : 'المشروع'}
                      </th>
                      <th className="p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-mist)]">
                        {language === 'fr' ? 'Localisation' : language === 'en' ? 'Location' : 'الموقع'}
                      </th>
                      <th className="p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-mist)]">Secteur</th>
                      <th className="p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-mist)]">
                        {language === 'fr' ? 'Client' : language === 'en' ? 'Client' : 'العميل'}
                      </th>
                      <th className="p-3 sm:p-4 pr-4 sm:pr-6 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-mist)]">Annee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FULL_PROJECTS.map((row, i) => (
                      <tr
                        key={row.num}
                        className={`border-t border-[rgba(10,12,13,0.05)] hover:bg-[var(--color-paper)] transition-colors ${i % 2 === 1 ? 'bg-[rgba(10,12,13,0.015)]' : ''}`}
                      >
                        <td className="p-3 sm:p-4 pl-4 sm:pl-6 font-mono font-semibold text-[var(--color-accent)] text-xs whitespace-nowrap">{row.num}</td>
                        <td className="p-3 sm:p-4 font-semibold text-[var(--color-ink)] text-xs sm:text-sm whitespace-nowrap">{row.project}</td>
                        <td className="p-3 sm:p-4 text-[var(--color-graphite)] text-xs sm:text-sm whitespace-nowrap">{row.location}</td>
                        <td className="p-3 sm:p-4">
                          <span className={`inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] font-mono font-bold tracking-wider uppercase rounded-full ${SECTOR_COLORS[row.sector] || 'bg-gray-100 text-gray-600'}`}>
                            {row.sector}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-[var(--color-charcoal)] text-xs sm:text-sm font-medium whitespace-nowrap">{row.client}</td>
                        <td className="p-3 sm:p-4 pr-4 sm:pr-6 text-[var(--color-mist)] text-xs font-mono whitespace-nowrap">{row.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0a0e12]/85 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-y-auto max-h-[92vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 flex items-center justify-between z-10 border-b border-[rgba(10,12,13,0.06)]">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-bold tracking-[0.16em] text-white bg-[var(--color-accent)] px-3 py-1.5 uppercase rounded-full">
                  {selectedProject.category}
                </span>
                <span className="text-sm text-[var(--color-mist)] font-medium">
                  {language === 'fr' ? 'Projet' : 'Project'} {selectedProject.id.replace('p', '')}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-mist)] tracking-wider hidden sm:block">
                  {selectedProject.year}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-[var(--color-paper)] rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[var(--color-graphite)]" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#0a0e12]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-3">
                <h3 className="display-md text-[var(--color-ink)]">
                  {language === 'en' ? selectedProject.nameEn : selectedProject.name}
                </h3>
                <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-graphite)]">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[var(--color-accent)]" />
                    <strong className="font-semibold text-[var(--color-ink)]">{selectedProject.client}</strong>
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                    {selectedProject.location}
                  </span>
                </div>
              </div>

              <p className="text-base lg:text-lg text-[var(--color-graphite)] leading-[1.7]">
                {language === 'en' ? selectedProject.descriptionEn : selectedProject.description}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: language === 'fr' ? 'Tension' : 'Voltage', value: '400/220 kV' },
                  { label: language === 'fr' ? 'Annee' : 'Year', value: selectedProject.year },
                  { label: language === 'fr' ? 'Secteur' : 'Sector', value: selectedProject.category },
                  { label: language === 'fr' ? 'Dossier' : 'Dossier', value: `PROJ/${selectedProject.year}-${selectedProject.id.replace('p', '').padStart(3, '0')}` },
                ].map((s, i) => (
                  <div key={i} className="p-4 bg-[var(--color-paper)] rounded-lg">
                    <span className="block text-[9px] font-mono tracking-widest text-[var(--color-mist)] uppercase mb-1">{s.label}</span>
                    <span className="block text-sm font-semibold text-[var(--color-ink)] font-display">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-mist)] uppercase">
                  {language === 'fr' ? 'Perimetre des Travaux' : 'Scope of Works'}
                </h4>
                <div className="space-y-3">
                  {(language === 'en' ? selectedProject.scopeEn : selectedProject.scope).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[var(--color-charcoal)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(10,12,13,0.06)]">
              <p className="text-sm text-[var(--color-mist)] text-center sm:text-left">
                {language === 'fr' ? 'Projet certifie et receptionne.' : 'Project certified and accepted.'}
              </p>
              <a
                href="#contact-form"
                onClick={() => setSelectedProject(null)}
                className="btn-premium text-xs shrink-0"
              >
                <span>{language === 'fr' ? 'Discuter d\'un projet similaire' : 'Discuss similar project'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

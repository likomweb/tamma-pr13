'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { ShieldCheck, Leaf, HeartPulse } from 'lucide-react';

export default function QHSE() {
  const { language } = useLanguage();

  const content = {
    fr: {
      tag: "Politique QHSE",
      title: "Trois certifications.<br/>Un engagement formel.",
      subtitle: "TAMMA vise à devenir un partenaire idéal et de référence dans le management de projets en Algérie — dans l'étude, la réalisation et le développement de structures énergétiques, génie civil, travaux publics et hydraulique.",
      pillars: [
        {
          num: "ISO 9001:2015",
          icon: ShieldCheck,
          title: "Management de la Qualité",
          desc: "Notre gestion de projet est méticuleusement structurée, garantissant la livraison d'un produit de qualité.",
          footer: "Conformité Réglementaire · Audits Annuels",
          scope: "Étude, conception et réalisation de projets EPC — Postes THT/HT, lignes aériennes et souterraines, gazoducs, génie civil industriel, fibre optique et maintenance.",
        },
        {
          num: "ISO 14001:2015",
          icon: Leaf,
          title: "Management Environnemental",
          desc: "Minimiser les risques de contamination, notamment les déversements d'hydrocarbures et les rejets d'eau dans le milieu naturel, et prévenir les nuisances et contaminations.",
          footer: "Protection des Écosystèmes Sahariens",
          scope: "Prévention des déversements d'hydrocarbures, gestion des déchets de chantier en zone saharienne, protection de la nappe phréatique et des écosystèmes steppiques.",
        },
        {
          num: "ISO 45001:2018",
          icon: HeartPulse,
          title: "Santé & Sécurité au Travail",
          desc: "Réduire ou éliminer les atteintes à la santé de nos employés. Mettre à disposition les ressources nécessaires à l'amélioration continue de notre système intégré.",
          footer: "Politique Zéro Incident",
          scope: "Travaux en hauteur sur pylônes THT, manipulation de transformateurs de puissance, opérations de levage lourd, chantier en zone désertique isolée, habilitations électriques H0V/B2V/BR.",
        }
      ],
      kpis: [
        { num: "0", unit: "incident", label: "Objectif Zéro Accident" },
        { num: "100", unit: "%", label: "Personnel Habilité Électrique" },
        { num: "12", unit: "/an", label: "Audits Internes Programmés" },
      ],
      quote: "Nous nous engageons à respecter les exigences légales et réglementaires applicables, à prévenir les nuisances et contaminations, et à fournir les ressources nécessaires à l'amélioration continue de notre système de management de la qualité, santé, sécurité et environnement.",
      attribution: "La Direction Générale · SARL TAMMA"
    },
    en: {
      tag: "QHSE Policy",
      title: "Three certifications.<br/>A formal commitment.",
      subtitle: "TAMMA aims to become an ideal and reference partner in project management in Algeria — in the study, realization, and development of energy structures, civil engineering, public works, and hydraulics.",
      pillars: [
        {
          num: "ISO 9001:2015",
          icon: ShieldCheck,
          title: "Quality Management",
          desc: "Our project management is meticulously structured, ensuring the delivery of a quality product.",
          footer: "Regulatory Compliance · Annual Audits",
          scope: "Study, design and realization of EPC projects — HV/MV substations, overhead and underground lines, gas pipelines, industrial civil works, fiber optic and maintenance.",
        },
        {
          num: "ISO 14001:2015",
          icon: Leaf,
          title: "Environmental Management",
          desc: "Minimize contamination risks, particularly hydrocarbon spills and water discharges into the natural environment, and prevent nuisances and contamination.",
          footer: "Saharan Ecosystem Protection",
          scope: "Hydrocarbon spill prevention, construction waste management in Saharan zones, aquifer and steppe ecosystem protection.",
        },
        {
          num: "ISO 45001:2018",
          icon: HeartPulse,
          title: "Occupational Health & Safety",
          desc: "Reduce or eliminate harm to the health of our employees. Provide the necessary resources for the continuous improvement of our integrated system.",
          footer: "Zero Incident Policy",
          scope: "Working at height on HV pylons, power transformer handling, heavy lifting operations, isolated desert site work, electrical authorizations H0V/B2V/BR.",
        }
      ],
      kpis: [
        { num: "0", unit: "incident", label: "Zero Accident Target" },
        { num: "100", unit: "%", label: "Electrically Authorized Staff" },
        { num: "12", unit: "/yr", label: "Internal Audits Planned" },
      ],
      quote: "We commit to complying with applicable legal and regulatory requirements, preventing nuisances and contamination, and providing the necessary resources for the continuous improvement of our quality, health, safety, and environmental management system.",
      attribution: "General Management · SARL TAMMA"
    },
    ar: {
      tag: "سياسة QHSE",
      title: "ثلاث شهادات.<br/>التزام رسمي.",
      subtitle: "تطمح تامة إلى أن تصبح شريكاً مثالياً ومرجعياً في إدارة المشاريع في الجزائر.",
      pillars: [
        { num: "ISO 9001:2015", icon: ShieldCheck, title: "إدارة الجودة", desc: "إدارة مشاريع منظمة بدقة.", footer: "الامتثال التنظيمي", scope: "دراسة وتصميم وتنفيذ مشاريع EPC." },
        { num: "ISO 14001:2015", icon: Leaf, title: "الإدارة البيئية", desc: "تقليل مخاطر التلوث.", footer: "حماية النظم البيئية", scope: "منع الانسكابات، إدارة النفايات." },
        { num: "ISO 45001:2018", icon: HeartPulse, title: "الصحة والسلامة", desc: "تقليل الأضرار بصحة الموظفين.", footer: "سياسة عدم الحوادث", scope: "العمل على ارتفاعات، الرفع الثقيل." },
      ],
      kpis: [
        { num: "0", unit: "حادثة", label: "هدف صفر حادث" },
        { num: "100", unit: "٪", label: "موظفون مرخصون" },
        { num: "12", unit: "/سنة", label: "عمليات تدقيق" },
      ],
      quote: "نلتزم بالامتثال للمتطلبات القانونية والتنظيمية المعمول بها.",
      attribution: "الإدارة العامة · سارل تامة"
    }
  };

  const c = content[language] || content.fr;

  return (
    <section id="qhse" className="bg-[var(--color-midnight)] text-white relative section-pad">

      {/* Section transition — fade from dark QHSE into light Contact section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-paper)] pointer-events-none" />
      <div className="container-editorial relative z-10">

        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 mb-8 lg:mb-10">
            <div className="lg:col-span-5 space-y-5">
              <div className="section-label on-dark">
                <span className="num">07</span>
                <span className="name">{language === 'ar' ? 'QHSE' : language === 'en' ? 'QHSE' : 'Politique QHSE'}</span>
              </div>
              <div className="eyebrow on-dark">{c.tag}</div>
              <h2 className="display-lg text-white" dangerouslySetInnerHTML={{ __html: c.title }} />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="body-lg text-white/60">{c.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* KPI Summary — premium soft tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-8 lg:mb-10">
          {c.kpis.map((kpi) => (
            <div key={kpi.num} className="p-6 sm:p-7 lg:p-9 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06] text-center hover:bg-white/[0.06] transition-colors">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white tracking-[-0.03em] leading-none">
                  {kpi.num}
                </span>
                <span className="text-sm sm:text-base text-[var(--color-rust)] font-mono">{kpi.unit}</span>
              </div>
              <p className="text-[10px] font-mono text-white/50 tracking-widest uppercase mt-3">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        {/* Certification Pillars — premium soft cards */}
        <div className="space-y-4 mb-8 lg:mb-10">
          {c.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.num} delay={idx * 0.08}>
                <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.06] p-7 lg:p-10 hover:bg-white/[0.05] transition-colors">
                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-4 flex gap-5 lg:pr-8">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-3">
                        <span className="inline-block text-[10px] font-mono font-semibold text-[var(--color-rust)] tracking-widest uppercase">
                          {pillar.num}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-semibold text-white font-display tracking-tight leading-[1.15]">
                          {pillar.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-white/55 font-medium tracking-[0.14em] uppercase">
                          <span className="block w-4 h-px bg-[var(--color-rust)]" />
                          {pillar.footer}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-sm lg:text-base text-white/70 leading-[1.75]">
                        {pillar.desc}
                      </p>
                      <div className="p-4 lg:p-5 rounded-xl bg-black/30">
                        <span className="block text-[9px] font-mono font-bold tracking-[0.2em] text-[var(--color-rust)] uppercase mb-2">
                          {language === 'fr' ? 'Périmètre de Certification' : language === 'en' ? 'Certification Scope' : 'نطاق الشهادة'}
                        </span>
                        <p className="text-[12px] text-white/65 leading-[1.65]">
                          {pillar.scope}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="card-dark p-8 lg:p-12">
            <div className="flex items-start gap-6">
              <span className="text-6xl lg:text-7xl text-[var(--color-rust)] font-display leading-none shrink-0">"</span>
              <div className="flex-1 space-y-6">
                <p className="text-lg lg:text-2xl text-white leading-[1.5] font-display font-medium tracking-[-0.015em]">
                  {c.quote}
                </p>
                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                    — {c.attribution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import About from '@/components/About';
import Industries from '@/components/Industries';
import EPCValueChain from '@/components/EPCValueChain';
import Portfolio from '@/components/Portfolio';
import InteractiveAlgeriaMap from '@/components/InteractiveAlgeriaMap';
import SpecsTable from '@/components/SpecsTable';
import QHSE from '@/components/QHSE';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PageIndicator from '@/components/PageIndicator';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollToTop from '@/components/ScrollToTop';
import SectionBackdrop from '@/components/SectionBackdrop';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-charcoal)] antialiased selection:bg-[var(--color-ink)] selection:text-[var(--color-paper)] overflow-x-hidden">
      <SectionBackdrop />
      <Navbar />
      <ReadingProgress />
      <PageIndicator />
      <ScrollToTop />
      <Hero />
      <Clients />
      {/* Diagonal divider: Hero/Clients (light) → About (light) */}
      <div className="h-12 lg:h-20 bg-[var(--color-paper)]" />
      <About />
      {/* Diagonal: About → Industries */}
      <div className="h-10 lg:h-16 bg-[var(--color-paper)]" />
      <Industries />
      {/* Diagonal: Industries → Value Chain */}
      <div className="h-10 lg:h-16 bg-[var(--color-cream)]" />
      <EPCValueChain />
      {/* Diagonal: Value Chain → Portfolio */}
      <div className="h-10 lg:h-16 bg-[var(--color-cream)]" />
      <Portfolio />
      {/* Diagonal: Portfolio → Map (dark) */}
      <div className="h-8 lg:h-14 bg-[var(--color-midnight)]" />
      <InteractiveAlgeriaMap />
      {/* Diagonal: Map → Specs (dark) */}
      <div className="h-8 lg:h-14 bg-[var(--color-midnight)]" />
      <SpecsTable />
      {/* Diagonal: Specs → QHSE (dark) */}
      <div className="h-8 lg:h-14 bg-[var(--color-midnight)]" />
      <QHSE />
      {/* Diagonal: QHSE → Contact (light) */}
      <div className="h-8 lg:h-14 bg-[var(--color-paper)]" />
      <ContactSection />
      <Footer />
    </main>
  );
}

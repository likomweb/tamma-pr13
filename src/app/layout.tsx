import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Editorial serif for premium headlines
const fraunces = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const viewport = {
  themeColor: '#f8f7f3',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SARL TAMMA EPC SOLUTIONS | Energy • Oil & Gas Algeria',
  description: 'Leader en ingénierie EPC, conception et réalisation de grands projets d\'infrastructures d\'énergie, pétrole et gaz en Algérie. Catégorie VII, ISO 9001, 14001, 45001.',
  keywords: [
    'SARL TAMMA',
    'TAMMA EPC',
    'Oil and Gas Algeria',
    'Énergie Algérie',
    'Sonatrach',
    'Sonelgaz',
    'Poste haute tension',
    'Hassi Messaoud',
    'Génie civil pétrolier'
  ],
  authors: [{ name: 'SARL TAMMA SERVICES' }],
  creator: 'SARL TAMMA SERVICES',
  publisher: 'SARL TAMMA SERVICES',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    title: 'SARL TAMMA EPC SOLUTIONS | Energy • Oil & Gas Algeria',
    description: 'Catégorie VII — Étude, conception et réalisation de grands projets d\'infrastructures d\'énergie, pétrole et gaz en Algérie.',
    siteName: 'SARL TAMMA SERVICES',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    'application-name': 'SARL TAMMA EPC',
    'apple-mobile-web-app-title': 'SARL TAMMA',
    'geo.region': 'DZ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-[var(--color-paper)] text-[var(--color-charcoal)] font-body antialiased selection:bg-[var(--color-ink)] selection:text-[var(--color-paper)] scroll-snap-type-y-proximity">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Construction, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--color-paper)] px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="w-24 h-24 mx-auto rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
          <Construction className="w-10 h-10 text-[var(--color-accent)]" />
        </div>
        <div className="space-y-3">
          <h1 className="display-md text-[var(--color-ink)]">404</h1>
          <p className="text-lg text-[var(--color-graphite)]">
            Cette section est en cours de construction.
          </p>
        </div>
        <p className="text-sm text-[var(--color-mist)] max-w-sm mx-auto leading-[1.6]">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Revenez à l'accueil ou explorez nos réalisations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/" className="btn-premium group">
            <Home className="w-4 h-4 mr-2" />
            <span>Retour à l'accueil</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          <Link href="#projects" className="btn-outline">
            <span>Voir nos réalisations</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
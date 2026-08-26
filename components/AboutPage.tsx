
import React from 'react';
import { About } from './About';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AboutPageProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <div className="pt-20">
        <About />
      </div>

      <section className="py-24 px-6 lg:px-12 bg-white/5 text-center">
        <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">Strategic Partnership</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
          RH Event Design
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed mb-10">
          A Hong Kong-based luxury event design and full-service PR firm — DFB Digital's partner for the digital side of their work.
        </p>
        <a
          href="/rh-event-design"
          className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
        >
          <span>Learn More</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
        </a>
      </section>

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};


import React, { useState } from 'react';
import { ClientRoster } from './ClientRoster';
import { DiscoveryCallModal } from './DiscoveryCallModal';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface OurWorkPageProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <div className="pt-32 pb-8 px-6 lg:px-12 text-center">
        <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">Our Work</p>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
          Client <span className="text-[#bdffcf]">Roster</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          A look at who we work with, and what we've built for them.
        </p>
      </div>

      <ClientRoster />

      <section className="py-24 px-6 lg:px-12 bg-brand-black text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
          Want to Be Next?
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Let's talk about what you're trying to build.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-3 px-10 py-5 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
        >
          Book a Discovery Call
        </button>
      </section>

      <DiscoveryCallModal isOpen={showForm} onClose={() => setShowForm(false)} prefillMessage="Inquiry from Our Work page" />

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};

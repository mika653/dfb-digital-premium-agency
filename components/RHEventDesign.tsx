
import React, { useState } from 'react';
import { DiscoveryCallModal } from './DiscoveryCallModal';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface RHEventDesignProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const services = [
  "Media Relations",
  "Brand Activations",
  "Digital Communications",
  "Society Events",
  "Content Creation",
  "Reputation Management",
  "Private Celebrations",
];

export const RHEventDesign: React.FC<RHEventDesignProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-brand-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">Strategic Partnership</p>
          <h1 className="serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-8 text-white">
            RH Event Design
          </h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-4 font-light italic">
            "Timeless Luxury. A Modern Presence."
          </p>
          <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
            A Hong Kong-based luxury event design and full-service PR firm — and DFB Digital's partner for the digital side of their work.
          </p>
        </div>
      </section>

      {/* About RH */}
      <section className="py-16 md:py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            About <span className="text-[#bdffcf]">RH Event Design</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            RH Event Design is led by <strong className="text-white">Reyna Harilela</strong>, who brings over 20 years of experience in PR and event production. The firm works with what it describes as "the world's most desirable brands" — companies that deserve to be talked about, not just seen.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            Based in Hong Kong, RH Event Design is known for society events, brand activations, and private celebrations produced with the same level of curation Reyna applies to her own "Little Black Book" of trusted dining, travel, and lifestyle recommendations.
          </p>
        </div>
      </section>

      {/* What They Do */}
      <section className="py-16 md:py-28 px-6 lg:px-12 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-10 text-center">
            What They <span className="text-[#bdffcf]">Do</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <div key={idx} className="p-5 border border-white/10 rounded-xl text-center">
                <p className="text-white/80 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Work */}
      <section className="py-16 md:py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">Notable Work</p>
          <p className="text-2xl md:text-3xl font-heading font-bold text-white mb-6 leading-snug">
            CALËO Fine Jewellery VIP Launch
          </p>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Guest curation and full event design for CALËO Fine Jewellery's VIP launch at The Hari, Hong Kong.
          </p>
          <div className="p-8 md:p-10 border-l-4 border-[#bdffcf] bg-white/5 rounded-r-2xl text-left max-w-2xl mx-auto">
            <p className="text-white/80 text-lg italic leading-relaxed mb-4">
              "Reyna has this knack for connecting the right people, and always has access to the best venues."
            </p>
            <p className="text-white/40 text-sm uppercase tracking-widest">— Client testimonial</p>
          </div>
        </div>
      </section>

      {/* The Partnership */}
      <section className="py-16 md:py-28 px-6 lg:px-12 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Why We <span className="text-[#bdffcf]">Partner</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            Modern PR and luxury events don't stop at the room — the brand's digital presence needs to hold up to the same standard as the room itself. RH Event Design brings the relationships, taste, and event execution. DFB Digital brings the websites, digital strategy, and systems that carry that same level of polish online.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            It's a straightforward split: they handle the room, we handle what happens on a screen before and after it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-28 px-6 lg:px-12 relative overflow-hidden bg-brand-black">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Learn More About <span className="text-[#bdffcf]">RH Event Design</span>
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Get in touch with DFB Digital about a joint event or digital engagement, or visit RH Event Design's site to see their full portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-brand-black font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-[#bdffcf] smooth-transition"
            >
              Book a Discovery Call
            </button>
            <a
              href="https://rheventdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              <span>Visit rheventdesign.com</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </section>

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <DiscoveryCallModal isOpen={showForm} onClose={() => setShowForm(false)} prefillMessage="Inquiry via RH Event Design Partnership" />
    </div>
  );
};

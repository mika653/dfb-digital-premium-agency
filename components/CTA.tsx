
import React, { useState } from 'react';
import { DiscoveryCallModal } from './DiscoveryCallModal';

export const CTA: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="py-48 px-6 lg:px-12 bg-brand-black text-brand-white relative overflow-hidden texture-noise texture-gradient-dark">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/10 skew-x-12 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tight">
              Still Not Sure <br />
              <span className="text-[#bdffcf]">What You Need?</span>
            </h2>

            <p className="text-xl text-brand-white/60 mb-16 leading-relaxed max-w-xl">
              That's completely fine. Some conversations are better had person-to-person. If you'd like help clarifying your options, let's start with a short, no-pressure discovery call.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="px-10 py-5 bg-brand-white text-brand-black font-heading font-bold text-xs uppercase tracking-widest rounded-full hover:bg-brand-blue hover:text-white smooth-transition"
            >
              Book a Discovery Call
            </button>
          </div>
        </div>
      </section>

      <DiscoveryCallModal isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};


import React from 'react';

export const WhyDFB: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 px-6 lg:px-12 bg-brand-black text-white text-center texture-noise texture-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-12 tracking-tight leading-tight">
          Digital isn’t about doing more.<br />
          <span className="text-brand-blue text-glow-blue">It's about doing it right.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-blue/10 smooth-transition">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Structural Clarity</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              We navigate the ins and outs of digital marketing to provide a clear roadmap for our clients.
            </p>
          </div>
          
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-blue/10 smooth-transition">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Bespoke Strategies</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              Every business is different. We conceptualize tailor-made strategies for specific and evolving needs.
            </p>
          </div>
          
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-blue/10 smooth-transition">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Transparency</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              Direct access to the team handling your work. No more feeling like you're left in the dark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

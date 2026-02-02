
import React from 'react';

export const WhyDFB: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 px-6 lg:px-12 bg-brand-black text-white text-center texture-noise texture-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-12 tracking-tight leading-tight">
          Digital isn’t about doing more.<br />
          <span className="text-[#bdffcf]">It's about doing it right.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-blue/10 smooth-transition">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Clear Direction</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              We help you understand what to do, what not to do, and why—so you're not guessing or wasting money.
            </p>
          </div>

          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-blue/10 smooth-transition">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Right-Fit Solutions</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              Your business isn't generic. We recommend and build digital solutions that make sense for your goals.
            </p>
          </div>

          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-blue/10 smooth-transition">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Open Communication</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              You'll always know what's happening every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

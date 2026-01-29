
import React from 'react';

export const CTA: React.FC = () => {
  return (
    <section className="py-48 px-6 lg:px-12 bg-brand-black text-brand-white relative overflow-hidden texture-noise texture-gradient-dark">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/10 skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tight">
            Ready for <br />
            <span className="text-brand-blue text-glow-blue">Absolute Clarity?</span>
          </h2>
          
          <p className="text-xl text-brand-white/60 mb-16 leading-relaxed max-w-xl">
            We invite you to explore how our structured approach can align with your business objectives. No high-pressure sales, just an intentional conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <button className="px-10 py-5 bg-brand-white text-brand-black font-heading font-bold text-xs uppercase tracking-widest rounded-full hover:bg-brand-blue hover:text-white smooth-transition">
              See if this is the right fit
            </button>
            <button className="px-10 py-5 border border-white/20 text-brand-white font-heading font-bold text-xs uppercase tracking-widest rounded-full hover:border-brand-blue smooth-transition">
              View the Approach
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-mint">
              Daddy FunBuckets
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base max-w-xl">
              <p>
                DFB Digital is led by <span className="text-white font-bold">Daddy FunBuckets</span>, a Digital Marketing & Strategy Consultant with 12+ years of international experience across Asia, the Middle East, and global markets.
              </p>
              <p>
                DFB specializes in digital marketing strategy, transformation, social media, blockchain/crypto, and AI-driven innovation.
              </p>
            </div>
            
            <button className="mt-12 group flex items-center justify-between gap-10 px-6 py-4 border border-brand-blue text-brand-blue font-bold text-xs uppercase tracking-widest hover:bg-brand-blue hover:text-white smooth-transition">
              <span>Learn More</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-8 border-white/5">
              <img
                src="/DFB Picture.png"
                alt="Daddy FunBuckets"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

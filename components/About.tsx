
import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-black text-white texture-noise texture-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-brand-mint">
              Experience. Strategy. A Different Way of Thinking.
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base max-w-xl">
              <p>
                DFB Digital is led by <span className="text-white font-bold">Daddy FunBuckets</span>, a digital marketing and strategy consultant with 12+ years of experience working across Asia, the Middle East, and global markets.
              </p>
              <p>
                "DFB" blends practical strategy, digital transformation, and emerging technologies—including AI—to help businesses, brands, and organizations move forward with clarity and confidence.
              </p>
            </div>
            
            <a href="#digital-consultancy" className="mt-12 group flex items-center justify-between gap-10 px-6 py-4 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 active:bg-blue-700 smooth-transition">
              <span>Learn More</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-8 border-white/5">
              <img
                src="/DFB Picture.png"
                alt="Daddy FunBuckets"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay"></div>
              {/* LinkedIn button */}
              <a
                href="https://linkedin.com/in/daddyfunbuckets"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 w-12 h-12 bg-[#0A66C2] hover:bg-[#004182] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl smooth-transition group"
                aria-label="Connect on LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:scale-110 smooth-transition">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background with warm city lights and professional imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="/new-hero-image.png"
          alt="Professional businesswoman reviewing analytics in a modern office"
          className="w-full h-full object-cover object-[70%_center] md:object-center"
        />
        {/* Dark overlay with gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/80 to-brand-black/40 md:from-brand-black/90 md:via-brand-black/70 md:to-brand-black/10"></div>
        {/* Subtle warm tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-900/20"></div>
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <Reveal className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] mb-6 sm:mb-8 tracking-tight text-white">
            Do Digital <span className="italic">Better.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4 max-w-xl font-light tracking-wide">
            You didn't build your business by <em className="italic">guessing</em>.
          </p>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-xl font-light tracking-wide">
            We won't ask you to start today — every recommendation comes with a <span className="text-[#bdffcf]">plain-English</span> reason behind it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/services"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition w-fit"
            >
              <span>View Services</span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white/30 group-hover:border-white/60 smooth-transition">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 smooth-transition">
                  <polyline points="9 6 15 12 9 18"></polyline>
                </svg>
              </span>
            </a>
          </div>

          <a href="/rh-event-design" className="mt-10 inline-block text-xs uppercase tracking-widest text-white/40 hover:text-white/70 smooth-transition">
            In Strategic Partnership with <span className="text-white/60">RH Event Design</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

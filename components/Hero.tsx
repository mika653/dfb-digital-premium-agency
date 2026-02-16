
import React from 'react';

interface HeroProps {
  onMatchmakerClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onMatchmakerClick }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background with warm city lights and professional imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="/new-hero-image.png"
          alt="Professional businesswoman reviewing analytics in a modern office"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay with gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/70 to-brand-black/10"></div>
        {/* Subtle warm tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-900/20"></div>
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] mb-8 tracking-tight text-white">
            Do Digital <span className="italic">Better.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4 max-w-xl font-light tracking-wide">
            It takes experience and informed decisions
            <br className="hidden sm:block" />
            {' '}to get results that matter
          </p>

          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-xl font-light tracking-wide">
            We'll help you move forward with the right strategy—not guesswork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition w-fit"
            >
              <span>View Services</span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white/30 group-hover:border-white/60 smooth-transition">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 smooth-transition">
                  <polyline points="9 6 15 12 9 18"></polyline>
                </svg>
              </span>
            </a>
            <button
              onClick={onMatchmakerClick}
              className="group inline-flex items-center gap-3 px-6 py-3.5 border border-white/50 hover:border-white/80 hover:bg-white/10 active:bg-white/20 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition w-fit"
            >
              <span>Find Your Fit</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 smooth-transition">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

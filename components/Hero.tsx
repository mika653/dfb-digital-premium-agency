
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
          src="/HERO IMAGE.png"
          alt="Professional team collaboration"
          className="w-full h-full object-cover object-right"
        />
        {/* Dark overlay with gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/40"></div>
        {/* Subtle warm tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-900/20"></div>
      </div>

      {/* Subtle chart/graph decoration */}
      <div className="absolute bottom-20 left-1/4 z-[1] opacity-20">
        <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
          <rect x="10" y="80" width="20" height="40" fill="white" fillOpacity="0.3" />
          <rect x="40" y="60" width="20" height="60" fill="white" fillOpacity="0.4" />
          <rect x="70" y="40" width="20" height="80" fill="white" fillOpacity="0.5" />
          <rect x="100" y="20" width="20" height="100" fill="white" fillOpacity="0.6" />
          <rect x="130" y="30" width="20" height="90" fill="white" fillOpacity="0.5" />
          {/* Growth arrow */}
          <path d="M20 75 L140 15" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M130 10 L145 15 L135 25" stroke="white" strokeWidth="2" strokeOpacity="0.4" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] mb-8 tracking-tight text-white">
            Do Digital <span className="italic">Better.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4 max-w-xl font-light tracking-wide">
            It takes experience and informed decisions<br className="hidden sm:block" />
            to get results that matter
          </p>

          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-xl font-light tracking-wide">
            Now take your business to that next level
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
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
              className="group inline-flex items-center gap-3 px-6 py-3.5 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
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

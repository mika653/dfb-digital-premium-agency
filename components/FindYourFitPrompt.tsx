
import React from 'react';
import { Reveal } from './Reveal';

interface FindYourFitPromptProps {
  onMatchmakerClick?: () => void;
}

export const FindYourFitPrompt: React.FC<FindYourFitPromptProps> = ({ onMatchmakerClick }) => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-[#bdffcf]/25 via-white to-[#FED7AA]/25">
      <Reveal className="max-w-3xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-black/50 font-medium mb-4">Prefer to Browse First?</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">
          Try the 2-Minute <em className="italic">Fit Finder</em>
        </h2>
        <p className="text-black/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Answer a few quick questions and we'll match you to the right service — no calls, no forms, just quick answers.
        </p>
        <button
          onClick={onMatchmakerClick}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-orange text-brand-black font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#fdc98a] smooth-transition"
        >
          <span>Find Your Fit</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </Reveal>
    </section>
  );
};


import React from 'react';

interface IntakeProps {
  onBack: () => void;
}

const JOTFORM_URL = 'https://form.jotform.com/261293633350050';
// Embed-friendly version (same form, iframe-optimized)
const JOTFORM_EMBED = 'https://form.jotform.com/261293633350050';

export const Intake: React.FC<IntakeProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-brand-black">
      {/* Slim nav */}
      <nav className="bg-[#FAFAF7]/95 backdrop-blur-md border-b border-black/5 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-3">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto" />
          </button>
          <a
            href="mailto:joe@dfbdigital.com"
            className="text-xs tracking-widest uppercase text-black/50 hover:text-brand-blue smooth-transition font-medium"
          >
            Questions?
          </a>
        </div>
      </nav>

      {/* Branded header */}
      <section className="px-6 lg:px-12 pt-12 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 shadow-sm rounded-full mb-6">
            <span className="w-2 h-2 bg-[#2dd180] rounded-full"></span>
            <span className="text-brand-black text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              Welcome to DFB Digital
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold leading-tight tracking-tight mb-4">
            Let's make it <span className="text-brand-blue">official.</span>
          </h1>
          <p className="text-base sm:text-lg text-black/65 max-w-2xl mx-auto leading-relaxed">
            Fill in the form below and we'll have everything we need to kick off your project — usually within 1 business day.
          </p>
        </div>
      </section>

      {/* JotForm embed */}
      <section className="px-4 sm:px-6 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm">
          <iframe
            src={JOTFORM_EMBED}
            title="DFB Digital Intake Form"
            className="w-full block"
            style={{ minHeight: 'min(1200px, 100vh)', border: 'none' }}
            allowFullScreen
          />
        </div>
        <p className="max-w-3xl mx-auto text-center text-xs text-black/40 mt-4">
          Trouble loading the form?{' '}
          <a
            href={JOTFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline font-medium"
          >
            Open it in a new tab
          </a>
        </p>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 lg:px-12 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-8 w-auto" />
            <span className="text-black/40 text-xs tracking-widest uppercase font-medium">Boutique Digital Agency</span>
          </div>
          <div className="text-xs text-black/45">
            <a href="mailto:joe@dfbdigital.com" className="hover:text-brand-blue smooth-transition">joe@dfbdigital.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

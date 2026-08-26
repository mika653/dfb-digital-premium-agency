
import React, { useState } from 'react';
import { DiscoveryCallModal } from './DiscoveryCallModal';
import { Trust } from './Trust';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface DigitalTransformationProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const steps = [
  {
    title: "A Working Session",
    description: "A working session directly with Daddy FunBuckets, Founder — not a junior account manager."
  },
  {
    title: "A Written Roadmap",
    description: "A written roadmap, ranked by impact and cost — so you know what matters most first."
  },
  {
    title: "You Choose What's Next",
    description: "You choose what to act on — with us or on your own. Nothing is bundled."
  }
];

export const DigitalTransformation: React.FC<DigitalTransformationProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/Digital Consultancy.jpeg" alt="Daddy FunBuckets, Founder of DFB Digital" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/50 via-black/40 to-black/70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">Digital Transformation Consultation</p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-8 text-white">
            A Clear Plan for Catching Up <span className="text-[#bdffcf]">— Without Starting Over.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-4 max-w-3xl mx-auto font-light">
            A one-on-one review of where your business stands digitally, and a straight-talk roadmap for what to fix first, second, and never.
          </p>

          <div className="max-w-2xl mx-auto mt-8 mb-12 pl-6 border-l-4 border-violet-500 text-left">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">What "Digital Transformation" actually means here</p>
            <p className="text-white/80 text-base leading-relaxed">
              Not a buzzword, not a rebuild. A plain-English look at your website, systems, and processes — what's working, what's costing you customers, and what to leave alone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-violet-500 hover:bg-[#8b5cf6] text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              <span>Book a Discovery Call</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a href="#what-you-get" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition">
              Learn More
            </a>
          </div>
          <p className="text-white/40 text-sm mt-6">On the call, we'll tell you honestly whether a full consultation makes sense for where your business is today.</p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black to-brand-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-violet-300/80 font-medium mb-6">Who It's For</p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Established business owners who know something needs to change but don't have time to sort hype from what's real.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section id="what-you-get" className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              What You <span className="text-[#bdffcf]">Get</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              A written, plain-English assessment of your website, systems, and processes. What's working. What's costing you customers. What to leave alone.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-32 px-6 lg:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              How It <span className="text-[#bdffcf]">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="border-t-2 border-violet-500/40 pt-6">
                <div className="text-5xl font-heading font-bold text-violet-500/30 mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Outcome */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            The <span className="text-[#bdffcf]">Outcome</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            You leave with a decision-ready plan, not a sales pitch — and the confidence that whatever you do next, it's the right next step, not just the newest one.
          </p>
        </div>
      </section>

      {/* Trust / Proof */}
      <Trust />

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden bg-brand-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready for a <span className="text-[#bdffcf]">Clear Plan</span>?
          </h2>
          <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">
            On the call, we'll tell you honestly whether a full consultation makes sense for where your business is today.
          </p>
          <p className="text-white/40 text-sm mb-12">No pressure. No jargon. If it's not a fit, we'll tell you on the call.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-violet-500 hover:bg-[#8b5cf6] text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition group"
          >
            <span>Book a Discovery Call</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <DiscoveryCallModal isOpen={showForm} onClose={() => setShowForm(false)} prefillMessage="Inquiry about Digital Transformation Consultation" />
    </div>
  );
};

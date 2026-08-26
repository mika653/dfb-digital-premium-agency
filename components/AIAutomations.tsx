
import React, { useState } from 'react';
import { DiscoveryCallModal } from './DiscoveryCallModal';
import { Trust } from './Trust';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AIAutomationsProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const sections = [
  {
    number: "01",
    title: "What This Actually Means",
    description: "No new software to learn. No dashboards to check. It runs quietly inside the tools you already use — email, calendar, CRM, invoicing."
  },
  {
    number: "02",
    title: "What It's Built For",
    description: "Fewer dropped follow-ups. Hours back in your week. We'll show you the real time cost first, and give you a straight estimate — not a marketing number."
  },
  {
    number: "03",
    title: "How We Build It",
    description: "We watch how your business works, map the repetitive parts, then build and test it with you. Nothing goes live until you've seen it work."
  }
];

const outcomes = [
  { title: "Fewer Dropped Follow-Ups", description: "Every lead and every client gets the response they were promised, on time, every time." },
  { title: "Time Back for Your Team", description: "The repetitive parts of the day disappear so your people can focus on customers, not admin." },
  { title: "Nothing Goes Live Without You", description: "You see every automation working before it ever touches a real customer." }
];

export const AIAutomations: React.FC<AIAutomationsProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" alt="A desk with a checklist and laptop, representing automated business workflows" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-black/30 to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-indigo-500 to-brand-blue"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">AI Automations</p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] mb-8 text-white">
            Get Your Time <span className="text-[#bdffcf]">Back.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-10 max-w-3xl mx-auto font-light">
            AI Automations quietly handle the repetitive work in your business — replying, scheduling, follow-ups, data entry — so you and your team spend time on customers, not admin.
          </p>

          <div className="max-w-2xl mx-auto mb-12 pl-6 border-l-4 border-brand-blue text-left">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">What we mean by "AI"</p>
            <p className="text-white/80 text-base leading-relaxed">
              Software that reads, sorts, and responds to routine tasks that would otherwise sit on someone's desk. It doesn't replace your team — it clears the busywork off their plate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              <span>Book a Discovery Call</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a href="#what-it-means" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition">
              Learn More
            </a>
          </div>
          <p className="text-white/40 text-sm mt-6">On the call, we'll walk through what's eating your time and whether automation is actually the right fix — not assume it is.</p>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black to-brand-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-blue-300/80 font-medium mb-6">Ideal For</p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Businesses doing the same manual steps every day. Replying. Scheduling. Chasing. Data entry. It's costing you real hours every week.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section id="what-it-means" className="py-16 md:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {sections.map((s, index) => (
              <div key={index} className="border-t-2 border-brand-blue/40 pt-6">
                <div className="text-5xl font-heading font-bold text-brand-blue/30 mb-4">{s.number}</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/70 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 md:py-32 px-6 lg:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              The <span className="text-[#bdffcf]">Outcome</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((o, index) => (
              <div key={index} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-blue/50 smooth-transition">
                <h3 className="text-xl font-heading font-bold text-white mb-4">{o.title}</h3>
                <p className="text-white/70 leading-relaxed">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Proof */}
      <Trust />

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden bg-brand-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready to Get Your <span className="text-[#bdffcf]">Time Back</span>?
          </h2>
          <p className="text-xl text-white/70 mb-4 max-w-2xl mx-auto">
            On the call, we'll walk through what's eating your time and whether automation is actually the right fix — not assume it is.
          </p>
          <p className="text-white/40 text-sm mb-12">No pressure. No jargon. If it's not a fit, we'll tell you on the call.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition group"
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

      <DiscoveryCallModal isOpen={showForm} onClose={() => setShowForm(false)} prefillMessage="Inquiry about AI Automations" />
    </div>
  );
};

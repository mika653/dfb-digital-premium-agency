
import React, { useState } from 'react';

interface VIPAccessProps {
  onBack: () => void;
}

const vipOffers = [
  {
    id: 'audit',
    title: "Website & Social Media Audit",
    tagline: "Get clarity on what's working—and what's quietly holding you back.",
    description: "I'll take a professional look at your:",
    features: [
      "Website usability & messaging",
      "Social media presence & consistency",
      "Brand clarity, credibility, and digital first impressions"
    ],
    perfectFor: "Business owners who feel like their digital presence should be doing more.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 'session',
    title: "Free 30-Minute Power Session",
    tagline: "A focused workshop tailored to what you actually need right now.",
    value: "worth $200",
    description: "Pick your topic:",
    features: [
      "Digital Transformation (from messy to manageable)",
      "Social Media Marketing: Tips, Tricks & Truths",
      "Web Design & Development that actually converts",
      "Formulating a sound, realistic digital strategy"
    ],
    perfectFor: "Founders, leaders, and teams who want direction—not jargon.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 'roadmap',
    title: "Digital Roadmap Snapshot",
    tagline: "A high-level game plan for where your digital efforts should go next.",
    badge: "NEW – Highly Recommended",
    description: "Based on your business, industry, and goals, I'll map out:",
    features: [
      "Your top digital priorities",
      "Quick wins vs. long-term plays",
      "Tools, platforms, and workflows you actually need (and what to ignore)"
    ],
    perfectFor: "Decision-makers who want confidence before spending time or money.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
        <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
        <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    gradient: "from-orange-500 to-amber-500"
  }
];

const whyReasons = [
  "Digital doesn't have to be confusing",
  "Strategy beats guesswork every time",
  "And good conversations deserve better than \"Let's keep in touch\""
];

export const VIPAccess: React.FC<VIPAccessProps> = ({ onBack }) => {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const handleClaim = () => {
    const offer = vipOffers.find(o => o.id === selectedOffer);
    const subject = `VIP Access: ${offer?.title}`;
    const body = `Hi DFB Digital,\n\nI scanned the QR code and would like to claim my VIP freebie:\n\n${offer?.title}\n\nLooking forward to doing digital better together!\n\nBest regards`;
    window.location.href = `mailto:hello@dfbdigital.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-brand-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,0,255,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-12 w-auto" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue/20 to-purple-500/20 rounded-full border border-brand-blue/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bdffcf]">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-[#bdffcf] text-sm font-semibold">VIP Access</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* VIP Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-blue/20 via-purple-500/20 to-pink-500/20 rounded-full border border-white/20 mb-8">
            <span className="w-3 h-3 bg-brand-blue rounded-full animate-pulse"></span>
            <span className="text-white font-semibold tracking-wide">EXCLUSIVE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            VIP ACCESS <span className="text-[#bdffcf]">UNLOCKED</span>
          </h1>

          <div className="space-y-4 text-xl md:text-2xl text-white/70 mb-12">
            <p>You didn't scan this by accident.</p>
            <p>You're here because we crossed paths—</p>
          </div>

          <div className="max-w-2xl mx-auto p-8 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-white/80 text-lg leading-relaxed">
              This is your <span className="text-[#bdffcf] font-semibold">VIP pass</span> to a few value-packed digital treats—on the house.
              <br /><br />
              <span className="text-white font-semibold">Choose one (1) of the following:</span>
            </p>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="pb-16 px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {vipOffers.map((offer) => (
              <div
                key={offer.id}
                onClick={() => setSelectedOffer(offer.id)}
                className={`group cursor-pointer p-8 bg-white/5 border rounded-2xl smooth-transition ${
                  selectedOffer === offer.id
                    ? 'border-brand-blue bg-brand-blue/10'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${offer.gradient} flex items-center justify-center text-white shrink-0 ${
                    selectedOffer === offer.id ? 'scale-110' : 'group-hover:scale-105'
                  } smooth-transition`}>
                    {offer.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl font-heading font-bold text-white">{offer.title}</h3>
                      {offer.value && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                          {offer.value}
                        </span>
                      )}
                      {offer.badge && (
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                          {offer.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-white/70 text-lg mb-4">{offer.tagline}</p>
                    <p className="text-white/50 mb-3">{offer.description}</p>

                    <ul className="space-y-2 mb-6">
                      {offer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/60">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bdffcf] mt-0.5 shrink-0">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <span className="font-semibold">Perfect for:</span>
                      <span>{offer.perfectFor}</span>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 smooth-transition ${
                    selectedOffer === offer.id
                      ? 'border-brand-blue bg-brand-blue'
                      : 'border-white/30'
                  }`}>
                    {selectedOffer === offer.id && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="pb-16 px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-heading font-bold text-white mb-6 text-center">
              Why Am I Doing This? <span className="text-[#bdffcf]">Because</span>
            </h3>
            <ul className="space-y-4">
              {whyReasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-4 text-white/70 text-lg">
                  <span className="w-2 h-2 bg-brand-blue rounded-full shrink-0"></span>
                  {reason}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-white/60 text-center text-lg">
              This is how I start relationships—<span className="text-white font-semibold">with value first.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-white/60 mb-6 text-lg">
            Unlock Your VIP Freebie below<br />
            and together let's
          </p>

          <button
            onClick={handleClaim}
            disabled={!selectedOffer}
            className={`group inline-flex items-center gap-3 px-10 py-5 font-heading font-bold text-sm uppercase tracking-widest rounded-full smooth-transition ${
              selectedOffer
                ? 'bg-brand-blue hover:bg-blue-600 text-white cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <span>Do Digital Better</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selectedOffer ? 'group-hover:translate-x-1 smooth-transition' : ''}>
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg>
          </button>

          {!selectedOffer && (
            <p className="mt-4 text-white/40 text-sm">
              Select an offer above to continue
            </p>
          )}
        </div>
      </section>

      {/* Footer note */}
      <div className="pb-12 px-6 text-center relative z-10">
        <p className="text-white/30 text-xs">
          This exclusive offer is for QR code scanners only. Thank you for connecting.
        </p>
      </div>
    </div>
  );
};

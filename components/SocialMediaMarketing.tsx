
import React from 'react';

interface SocialMediaMarketingProps {
  onBack: () => void;
}

const benefits = [
  {
    title: "Strategy & Planning",
    description: "Data-informed social media strategies, content planning, and brand voice development tailored to your goals.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    )
  },
  {
    title: "Content & Creative",
    description: "Monthly and quarterly content calendars, post copywriting, and creative direction that resonates with your audience.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    )
  },
  {
    title: "Performance & Growth",
    description: "Comprehensive performance tracking, reporting, and community engagement guidelines that drive measurable growth.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    )
  }
];

const features = [
  {
    title: "Platform-Specific Optimization",
    description: "Tailored strategies for Instagram, Facebook, LinkedIn, TikTok, and more—because each platform demands a different approach."
  },
  {
    title: "Brand Voice & Messaging",
    description: "A consistent, recognizable voice across all channels that builds trust and sets you apart from the noise."
  },
  {
    title: "Add-On Capabilities",
    description: "Reels and short-form video strategy, event-based social campaigns, and campaign-specific content pushes when you need them."
  }
];

const coreBenefits = [
  {
    title: "Consistency",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    title: "Engagement",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    title: "Growth",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    )
  }
];

export const SocialMediaMarketing: React.FC<SocialMediaMarketingProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto" />
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button onClick={onBack} className="text-white/70 hover:text-white smooth-transition">Home</button>
            <a href="/#services" className="text-white/70 hover:text-white smooth-transition">Services</a>
            <a href="/#matchmaker" className="text-white/70 hover:text-white smooth-transition">Find Your Fit</a>
            <a href="mailto:hello@dfbdigital.com" className="px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:from-teal-600 hover:to-teal-700 smooth-transition">
              Get in Touch
            </a>
          </div>
          <button onClick={onBack} className="md:hidden text-white/70 hover:text-white smooth-transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1687008943553-f7560ffea8db?auto=format&fit=crop&q=80&w=2000" alt="Social Media Marketing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-teal-900/30 to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400"></div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-teal-500/30 rounded-full blur-[100px] md:blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-teal-400/25 rounded-full blur-[100px] md:blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium tracking-wide">Build Your Brand Online</span>
          </div>

          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-4">
            Show up with purpose, not just presence.
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] mb-8">
            <span className="text-white">Social Media </span>
            <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 bg-clip-text text-transparent">Marketing</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            Strategic social media management that builds audience, drives engagement, and turns followers into advocates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@dfbdigital.com?subject=Social Media Marketing Inquiry" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition">
              <span>Get Started</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#benefits" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black to-brand-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 rounded-full border border-teal-500/30 mb-6">
            <span className="text-teal-400 text-sm font-medium tracking-wide">Ideal For</span>
          </div>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Brands and businesses that want a consistent, strategic social media presence—without the guesswork or burnout.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Why <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Social Media Marketing</span>?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-teal-500/50 hover:bg-white/10 smooth-transition">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Key <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Deliverables</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-teal-500/50 smooth-transition">
                <h3 className="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              The <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Outcome</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreBenefits.map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2000" alt="Social media background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-brand-black/70"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready to <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">Show Up</span>?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Build a social media presence that works for your business—strategically, consistently, and intentionally.
          </p>
          <a href="mailto:hello@dfbdigital.com?subject=Social Media Marketing Inquiry" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition group">
            <span>Get in Touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto opacity-50" />
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} DFB Digital. All rights reserved.</p>
          <button onClick={onBack} className="text-white/50 hover:text-white text-sm smooth-transition">Back to Home</button>
        </div>
      </footer>
    </div>
  );
};

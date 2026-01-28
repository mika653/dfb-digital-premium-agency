
import React from 'react';

interface LaunchPadProps {
  onBack: () => void;
}

const benefits = [
  {
    title: "Scalable Architecture",
    description: "Your website grows with your business, supporting new pages and initiatives over time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    )
  },
  {
    title: "Easy Management",
    description: "Teams can update content and manage the site without relying on technical support.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    )
  },
  {
    title: "Goal-Oriented Design",
    description: "Layouts and flows are structured around engagement, conversion, and long-term objectives.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    )
  }
];

const features = [
  {
    title: "Flexible Structure",
    description: "A flexible page and content structure designed to support growth, new sections, and evolving needs."
  },
  {
    title: "Team-Friendly Updates",
    description: "Built so internal teams can update and maintain content without relying on constant technical support."
  },
  {
    title: "Strategic Layouts",
    description: "Layouts and flows are designed around your goals—whether that's engagement, information, conversion, or community building."
  }
];

const coreBenefits = [
  {
    title: "Built to Grow With You",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    )
  },
  {
    title: "Clarity for Users, Control for Teams",
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
    title: "Long-Term Reliability",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  }
];

export const LaunchPad: React.FC<LaunchPadProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white smooth-transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-12 w-auto" />
          </div>
          <a
            href="mailto:hello@dfbdigital.com"
            className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:from-orange-600 hover:to-amber-700 smooth-transition"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1457364559154-aa2644600ebb?auto=format&fit=crop&q=80&w=2000"
            alt="Rocket Launch"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 via-amber-900/30 to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400"></div>
        </div>

        {/* Floating light effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/25 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium tracking-wide">Ready for Liftoff</span>
          </div>

          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-4">
            Your digital foundation, built right from day one.
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] mb-8">
            <span className="text-white">Launch</span>
            <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 bg-clip-text text-transparent">Pad</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            A full website solution for businesses and organizations ready to grow. Thoughtfully structured, easy to manage, and designed to evolve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@dfbdigital.com?subject=LaunchPad Inquiry"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              <span>Get Started</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black to-brand-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/30 mb-6">
            <span className="text-orange-400 text-sm font-medium tracking-wide">Ideal For</span>
          </div>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Businesses, NGOs, and organizations that want a scalable, future-ready website.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Why <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">LaunchPad</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-orange-500/50 hover:bg-white/10 smooth-transition"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition">
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
      <section className="py-32 px-6 lg:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Key <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 border-l-2 border-orange-500/50 hover:border-orange-500 smooth-transition"
              >
                <h3 className="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              The <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Benefits</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000"
            alt="Professional background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-brand-black/70"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready for <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Liftoff</span>?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Build a website that grows with your vision. Start with a foundation designed for long-term success.
          </p>
          <a
            href="mailto:hello@dfbdigital.com?subject=LaunchPad Inquiry"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition group"
          >
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
          <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto opacity-50" />
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} DFB Digital. All rights reserved.
          </p>
          <button
            onClick={onBack}
            className="text-white/50 hover:text-white text-sm smooth-transition"
          >
            Back to Home
          </button>
        </div>
      </footer>
    </div>
  );
};

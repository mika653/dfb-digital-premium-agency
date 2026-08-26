
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface EmailCRMProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const benefits = [
  {
    title: "Email Strategy",
    description: "Full email marketing strategy, newsletter setup, and optimization to keep your audience engaged and informed."
  },
  {
    title: "Automation",
    description: "Onboarding sequences, follow-up workflows, and triggered campaigns that nurture leads on autopilot."
  },
  {
    title: "CRM Intelligence",
    description: "List segmentation, audience targeting, and data-driven campaign strategies that put the right message in front of the right people."
  }
];

const features = [
  {
    title: "Newsletter Setup & Optimization",
    description: "Consistent, engaging newsletters that keep your audience connected and your brand top of mind."
  },
  {
    title: "Automated Sequences",
    description: "Onboarding flows, follow-up sequences, and nurture campaigns that work while you focus on what matters."
  },
  {
    title: "Event & Campaign Emails",
    description: "Announcements, launches, and promotional campaigns that drive attendance, awareness, and action."
  }
];

const coreBenefits = [
  {
    title: "Retention"
  },
  {
    title: "Precision"
  },
  {
    title: "Growth"
  }
];

export const EmailCRM: React.FC<EmailCRMProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2000" alt="A handshake, representing nurtured client relationships" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 via-emerald-900/30 to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <p className="text-sm uppercase tracking-widest text-green-300/80 font-medium mb-6">Nurture & Convert</p>

          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-4">
            The right message. The right time. Every time.
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] mb-8">
            <span className="text-white">Email & </span>
            <span className="text-[#bdffcf]">CRM</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            Nurture leads and retain customers with precision email sequences, CRM-driven campaigns, and automated workflows that scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@dfbdigital.com?subject=Email %26 CRM Marketing Inquiry" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition">
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
          <p className="text-sm uppercase tracking-widest text-green-300/80 font-medium mb-6">Ideal For</p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            NGOs, HOAs, professionals, and consultants who need structured, reliable communication with their audience—without the spam.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Why <span className="text-[#bdffcf]">Email & CRM</span>?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="border-t-2 border-green-500/40 pt-6">
                <div className="text-5xl font-heading font-bold text-green-500/30 mb-4">{`0${index + 1}`}</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.description}</p>
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
              Key <span className="text-[#bdffcf]">Deliverables</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-green-500/50 smooth-transition">
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
              The <span className="text-[#bdffcf]">Outcome</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {coreBenefits.map((benefit, index) => (
              <div key={index} className="border-t-2 border-green-500/40 pt-6 text-center">
                <div className="text-5xl font-heading font-bold text-green-500/30 mb-4">{`0${index + 1}`}</div>
                <h3 className="text-lg font-heading font-bold text-white">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=2000" alt="Email marketing background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-brand-black/70"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready to <span className="text-[#bdffcf]">Nurture</span>?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Build email and CRM systems that keep your audience engaged and your pipeline growing.
          </p>
          <a href="mailto:hello@dfbdigital.com?subject=Email %26 CRM Marketing Inquiry" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition group">
            <span>Get in Touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};

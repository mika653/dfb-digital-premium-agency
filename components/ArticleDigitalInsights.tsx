
import React from 'react';

interface ArticleProps {
  onBack: () => void;
  onBlogClick: () => void;
}

const packages = [
  {
    name: "Foundation",
    tagline: "Basic package",
    description: "Includes a marketing analysis, strategy and basic dashboard",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    gradient: "from-slate-500 to-slate-700",
    features: [
      "Marketing analysis",
      "Strategic roadmap",
      "Basic performance dashboard",
      "Monthly insights report"
    ]
  },
  {
    name: "Solution",
    tagline: "Targeted package",
    description: "Assistance in solving specific issues and pain points",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Targeted problem solving",
      "Pain point identification",
      "Custom solutions",
      "Implementation support"
    ]
  },
  {
    name: "Digit-All",
    tagline: "Full package",
    description: "Includes an analysis, strategy, complete dashboard and social media management for 6 months",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Comprehensive analysis",
      "Full strategic planning",
      "Complete dashboard suite",
      "6-month social media management"
    ]
  }
];

export const ArticleDigitalInsights: React.FC<ArticleProps> = ({ onBack, onBlogClick }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-12 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button onClick={onBack} className="text-white/70 hover:text-white smooth-transition">Home</button>
            <button onClick={onBlogClick} className="text-white/70 hover:text-white smooth-transition">Blog</button>
            <a href="/#services" className="text-white/70 hover:text-white smooth-transition">Services</a>
            <a
              href="mailto:hello@dfbdigital.com"
              className="px-5 py-2 bg-brand-blue text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition"
            >
              Get in Touch
            </a>
          </div>

          <button onClick={onBlogClick} className="md:hidden text-white/70 hover:text-white smooth-transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      </header>

      {/* Article Content */}
      <article className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <button onClick={onBlogClick} className="hover:text-white smooth-transition">Blog</button>
            <span>/</span>
            <span className="text-white/60">DFB's Digital Insights</span>
          </div>

          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">
                Services
              </span>
              <span className="text-white/40 text-sm">3 min read</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              DFB's Digital <span className="text-[#bdffcf]">Insights</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed">
              A practical resource for business owners looking to understand digital more clearly.
            </p>
          </header>

          {/* Lead */}
          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <p className="text-white/70 text-lg leading-relaxed">
              Subscribe to receive insights, trends, and real-world perspectives on how digital can apply to your business — without the jargon.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              We've structured our offerings into three distinct packages, each designed to meet businesses at different stages of their digital journey.
            </p>
          </div>

          {/* Packages */}
          <section className="mb-20">
            <h2 className="text-2xl font-heading font-bold text-white mb-10">Our Packages</h2>

            <div className="space-y-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] smooth-transition"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center text-white shrink-0`}>
                      {pkg.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                        <h3 className="text-2xl font-heading font-bold text-white">{pkg.name}</h3>
                        <span className="text-white/40 text-sm font-medium">{pkg.tagline}</span>
                      </div>

                      <p className="text-white/60 leading-relaxed mb-6">
                        {pkg.description}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-white/50 text-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bdffcf] shrink-0">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-10 bg-gradient-to-br from-brand-blue/20 to-cyan-500/10 border border-brand-blue/30 rounded-2xl text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Let's discuss which package aligns best with your business goals and current digital needs.
            </p>
            <a
              href="mailto:hello@dfbdigital.com?subject=Inquiry about DFB Digital Packages"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm uppercase tracking-widest rounded-full smooth-transition"
            >
              <span>Get in Touch</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18"></polyline>
              </svg>
            </a>
          </section>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <button
              onClick={onBlogClick}
              className="flex items-center gap-2 text-white/50 hover:text-white smooth-transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Back to Blog</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};


import React from 'react';

const comingSoonItems = [
  {
    title: "Podcast",
    description: "Conversations on design, digital and building with intention. Stories, insights, and practical guidance for doing digital better.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "DFB Digital Academy",
    description: "Courses, templates and training designed to help you navigate digital with clarity and confidence. Learn at your own pace, with guidance that supports real progress.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Insights, Tools & Ideas",
    description: "Get inside the mind of Daddy FunBuckets—sharing real-world lessons, sharp observations, and practical wisdom from more than a decade in the digital space.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    gradient: "from-orange-500 to-amber-500"
  }
];

export const ComingSoon: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-black relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,255,0.05)_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
            <span className="text-white/60 text-sm font-medium tracking-wide">In Development</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Coming <span className="text-brand-blue">Soon</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            New ways to learn, grow, and do digital better. Stay tuned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comingSoonItems.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] smooth-transition"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl smooth-transition`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-heading font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed mb-6">{item.description}</p>

                <div className="flex items-center gap-2 text-white/30 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter signup teaser */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-4">
            Want to be the first to know when these launch?
          </p>
          <a
            href="mailto:hello@dfbdigital.com?subject=Keep me updated on DFB Digital launches"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-full smooth-transition text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Get Notified</span>
          </a>
        </div>
      </div>
    </section>
  );
};

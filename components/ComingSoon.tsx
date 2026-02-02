
import React from 'react';
import { NewsletterForm } from './NewsletterForm';

const comingSoonItems = [
  {
    title: "Blog",
    description: "Clear, forward-looking perspectives on digital trends and the ideas shaping smarter decisions for what comes next.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Podcast",
    description: "Conversations with thought leaders on where digital marketing, AI, and emerging technologies are headed\u2014with real-world implications for businesses that want to stay ahead.",
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
    description: "Courses, templates and training that help you make smarter digital decisions\u2014at your own pace.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-500"
  }
];

export const ComingSoon: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-black relative overflow-hidden texture-noise texture-gradient-dark">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,255,0.05)_0%,transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            On the <span className="text-brand-blue text-glow-blue">Horizon</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            New ways to learn, grow, and approach digital with intention.
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

        {/* Newsletter signup */}
        <div className="mt-16 max-w-xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-6">
            Stay ahead with digital insights, updates, and early access—straight to your inbox.
          </p>
          <NewsletterForm variant="dark" compact />
        </div>
      </div>
    </section>
  );
};

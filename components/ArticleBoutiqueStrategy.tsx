
import React from 'react';

interface ArticleProps {
  onBack: () => void;
  onBlogClick: () => void;
}

export const ArticleBoutiqueStrategy: React.FC<ArticleProps> = ({ onBack, onBlogClick }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto" />
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
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <button onClick={onBlogClick} className="hover:text-white smooth-transition">Blog</button>
            <span>/</span>
            <span className="text-white/60">Boutique Agency Strategy</span>
          </div>

          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                Strategy
              </span>
              <span className="text-white/40 text-sm">5 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
              How Boutique Agencies Think About Digital Strategy
            </h1>
            <p className="text-2xl text-white/60 font-light">
              (That Big Agencies Don't)
            </p>
          </header>

          {/* Hero Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-16">
            <img
              src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&q=80&w=1200"
              alt="Strategy planning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/70 text-xl leading-relaxed mb-12">
              Digital strategy often gets confused with execution. More channels, more tools, more activity. But strategy isn't about doing more. <strong className="text-white">It's about choosing what not to do.</strong>
            </p>

            <p className="text-white/60 leading-relaxed mb-12">
              Boutique digital agencies tend to approach strategy differently—not because they have fewer resources, but because they're closer to the problem. That proximity changes how decisions are made.
            </p>

            <p className="text-white/60 leading-relaxed mb-16">
              Below is how boutique agencies typically think about digital strategy, and why that mindset often leads to better outcomes.
            </p>

            {/* Section 1 */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-lg">1</span>
                <h2 className="text-2xl font-heading font-bold text-white">Strategy Starts With Constraints, Not Ideas</h2>
              </div>
              <div className="pl-16">
                <p className="text-white/60 leading-relaxed mb-4">
                  Big agencies often start with possibilities. Boutique agencies start with constraints.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  Budget, team capacity, timelines, internal workflows, and decision-making speed all shape what is realistic. Strategy becomes effective when it works within these boundaries instead of ignoring them.
                </p>
                <div className="p-4 bg-white/5 border-l-2 border-purple-500 rounded-r-lg">
                  <p className="text-white/70 italic">
                    Clear constraints reduce wasted effort and focus resources where they matter most.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-lg">2</span>
                <h2 className="text-2xl font-heading font-bold text-white">Prioritization Comes Before Channels</h2>
              </div>
              <div className="pl-16">
                <p className="text-white/60 leading-relaxed mb-4">
                  A common mistake in digital planning is starting with platforms: SEO, paid ads, social media, email, AI tools.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  Boutique agencies typically reverse this order. They identify:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3 text-white/60">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 mt-1 shrink-0">
                      <polyline points="9 6 15 12 9 18"></polyline>
                    </svg>
                    The primary business objective
                  </li>
                  <li className="flex items-start gap-3 text-white/60">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 mt-1 shrink-0">
                      <polyline points="9 6 15 12 9 18"></polyline>
                    </svg>
                    The biggest bottleneck preventing growth
                  </li>
                  <li className="flex items-start gap-3 text-white/60">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 mt-1 shrink-0">
                      <polyline points="9 6 15 12 9 18"></polyline>
                    </svg>
                    The fastest path to measurable improvement
                  </li>
                </ul>
                <div className="p-4 bg-white/5 border-l-2 border-purple-500 rounded-r-lg">
                  <p className="text-white/70 italic">
                    Only then do channels come into the conversation. Strategy is about sequencing, not stacking.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-lg">3</span>
                <h2 className="text-2xl font-heading font-bold text-white">Fewer Metrics, Better Decisions</h2>
              </div>
              <div className="pl-16">
                <p className="text-white/60 leading-relaxed mb-4">
                  More data doesn't always lead to better insight.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  Boutique agencies often track fewer metrics, but they track the right ones. Metrics are chosen based on decision-making value, not reporting volume.
                </p>
                <div className="p-4 bg-white/5 border-l-2 border-purple-500 rounded-r-lg">
                  <p className="text-white/70 italic">
                    If a metric doesn't change behaviour, it usually doesn't belong in the strategy.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-lg">4</span>
                <h2 className="text-2xl font-heading font-bold text-white">Strategy Is a Living System, Not a One-Time Deck</h2>
              </div>
              <div className="pl-16">
                <p className="text-white/60 leading-relaxed mb-4">
                  Digital environments change constantly—algorithms, user behaviour, platforms, and tools evolve.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  Boutique agencies treat strategy as a system that adapts over time. Plans are revisited, refined, and challenged regularly rather than locked into static documents.
                </p>
                <div className="p-4 bg-white/5 border-l-2 border-purple-500 rounded-r-lg">
                  <p className="text-white/70 italic">
                    This flexibility allows for faster learning and course correction.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-heading font-bold text-lg">5</span>
                <h2 className="text-2xl font-heading font-bold text-white">Execution and Strategy Are Closely Linked</h2>
              </div>
              <div className="pl-16">
                <p className="text-white/60 leading-relaxed mb-4">
                  In smaller teams, strategists often stay close to execution. That feedback loop matters.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Seeing what actually happens in campaigns, websites, and content informs better strategic decisions. Strategy improves when it's grounded in real-world performance, not assumptions.
                </p>
              </div>
            </section>

            {/* DFB Says */}
            <section className="p-10 bg-gradient-to-br from-brand-blue/20 to-purple-500/10 border border-brand-blue/30 rounded-2xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#bdffcf] uppercase tracking-wider">DFB Says</h3>
              </div>
              <p className="text-white text-xl leading-relaxed mb-4">
                Effective digital strategy isn't about doing everything. It's about doing the right things in the right order, for the right reasons.
              </p>
              <p className="text-white/70 text-lg">
                Boutique agencies succeed not by being louder, but by being clearer.
              </p>
            </section>
          </div>

          {/* CTA */}
          <section className="p-10 bg-white/5 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Want Strategic Clarity?</h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Let's have an intentional conversation about your digital strategy—no jargon, no pressure.
            </p>
            <a
              href="mailto:hello@dfbdigital.com?subject=Let's discuss digital strategy"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm uppercase tracking-widest rounded-full smooth-transition"
            >
              <span>Start the Conversation</span>
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

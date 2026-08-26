
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface ArticleProps {
  onBack: () => void;
  onBlogClick: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const faqs = [
  {
    q: "What is digital transformation in simple terms?",
    a: "It's the process of using digital tools and systems to run your business better — clearer websites, less manual admin, and decisions based on real data instead of guesswork. It's not one product you buy; it's an ongoing way of operating."
  },
  {
    q: "Do I need to replace all my systems to \"do\" digital transformation?",
    a: "No. Most businesses keep 80% of what already works and fix the 20% that's actually costing them time or customers. A good digital transformation plan tells you what to leave alone, not just what to change."
  },
  {
    q: "How long does digital transformation take?",
    a: "A written assessment and roadmap typically takes days, not months. Implementing the roadmap is staged — you act on the highest-impact items first, at a pace that fits your business."
  },
  {
    q: "Is digital transformation just about AI?",
    a: "No. AI and automation are often part of it, but digital transformation also covers your website, your customer data, your marketing systems, and how your team actually works day to day. AI is one tool among several."
  },
  {
    q: "How much does digital transformation cost?",
    a: "It depends entirely on what's found and what you choose to act on — because nothing is bundled. The starting point is a plain-English assessment, not a fixed-price package."
  }
];

export const ArticleDigitalTransformationExplained: React.FC<ArticleProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <article className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <button onClick={onBlogClick} className="hover:text-white smooth-transition">Blog</button>
            <span>/</span>
            <span className="text-white/60">Digital Transformation, Explained</span>
          </div>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-semibold rounded-full">Digital Transformation</span>
              <span className="text-white/40 text-sm">6 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              What Is Digital Transformation, Really?
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              A plain-English guide for business owners who are tired of the buzzword and just want a straight answer.
            </p>
          </header>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/70 text-xl leading-relaxed mb-12">
              "Digital transformation" gets used to sell almost anything — new software, a rebrand, an app nobody asked for. <strong className="text-white">Here's what it actually means, without the sales pitch.</strong>
            </p>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">The Plain Definition</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Digital transformation is using digital tools to run your business with less friction. A clearer website. Fewer manual steps. Decisions based on what's actually happening, not what you assume is happening.
              </p>
              <p className="text-white/60 leading-relaxed">
                It's not a single project with an end date. It's an ongoing habit of asking: "is there a better way to do this part of the business?"
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">What It's Not</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 mt-1 shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  It's not buying a new piece of software and hoping it fixes things.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 mt-1 shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  It's not a website redesign for its own sake.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 mt-1 shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  It's not about looking modern for its own sake. It's about running better.
                </li>
              </ul>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Signs Your Business Is Due For It</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Your team re-types the same information into more than one system.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  You genuinely don't know which marketing efforts are working.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Your website hasn't meaningfully changed in years, but your business has.
                </li>
              </ul>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">How to Start Without Overhauling Everything</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Start with an honest, written assessment — not a sales pitch. Something that tells you plainly what's working, what's costing you customers, and what to leave alone because it wouldn't move the needle.
              </p>
              <div className="p-4 bg-white/5 border-l-2 border-violet-500 rounded-r-lg">
                <p className="text-white/70 italic">
                  You rank what's found by impact and cost, then choose what to act on — with help or on your own. Nothing bundled, nothing assumed.
                </p>
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-8">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {faqs.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-heading font-bold text-white mb-2">{item.q}</h3>
                    <p className="text-white/60 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="p-10 bg-violet-500/10 border border-violet-500/30 rounded-2xl text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Want a Straight Answer for Your Business?</h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              A Digital Transformation Consultation gets you a written, plain-English assessment — what's working, what's not, and what to fix first.
            </p>
            <button
              onClick={() => onServiceNavigate && onServiceNavigate('digitaltransformation')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-500 hover:bg-[#8b5cf6] text-white font-semibold text-sm uppercase tracking-widest rounded-full smooth-transition"
            >
              <span>See Digital Transformation Consultation</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
            </button>
          </section>

          <div className="mt-16 pt-8 border-t border-white/10">
            <button onClick={onBlogClick} className="flex items-center gap-2 text-white/50 hover:text-white smooth-transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>Back to Blog</span>
            </button>
          </div>
        </div>
      </article>

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};

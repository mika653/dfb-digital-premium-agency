
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
    q: "Is social media still worth it for established businesses?",
    a: "Yes, but as consistency, not volume. A steady, focused presence on one or two platforms beats scattered effort across five. Strategy is about choosing what not to do."
  },
  {
    q: "What is AI search and why does it matter for marketing?",
    a: "More people now ask AI tools like ChatGPT or Perplexity questions instead of typing them into Google. Those tools answer using clear, well-structured content they can find and quote. If your business's website doesn't explain what you do in plain language, you simply won't get mentioned in those answers."
  },
  {
    q: "Do I need to be on every platform?",
    a: "No. Being everywhere thinly is worse than being somewhere consistently. Pick the one or two channels your actual customers use, and do those well."
  },
  {
    q: "How do I compete with big-budget marketing?",
    a: "Established businesses compete on trust and proof, not ad spend. A real testimonial with a real name and a real result outperforms a bigger budget with generic claims."
  },
  {
    q: "What's the first step to modernizing our marketing?",
    a: "An honest audit of what's actually working today versus what you assume is working. Most businesses are surprised by the gap between the two."
  }
];

export const ArticleModernMarketing: React.FC<ArticleProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <article className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <button onClick={onBlogClick} className="hover:text-white smooth-transition">Blog</button>
            <span>/</span>
            <span className="text-white/60">Modern Marketing for Established Businesses</span>
          </div>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">Marketing</span>
              <span className="text-white/40 text-sm">5 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Modern Marketing for Established Businesses: What Actually Works Now
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              The channels changed. What earns trust didn't.
            </p>
          </header>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/70 text-xl leading-relaxed mb-12">
              Most marketing advice is written for startups trying to get noticed. <strong className="text-white">Established businesses have a different problem: staying credible while everything around them moves.</strong>
            </p>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Why Old Playbooks Are Losing Effectiveness</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Posting more, everywhere, used to be enough to stand out. It isn't anymore — audiences are more skeptical, and attention is split across more places than ever.
              </p>
              <p className="text-white/60 leading-relaxed">
                What's replaced volume is trust: proof, consistency, and a clear, plain-spoken message.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">What's Actually Working Now</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Consistent content on one or two channels, not scattered effort everywhere.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Real proof — named clients, specific results — over generic claims.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Direct, plain-English messaging instead of jargon.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Email and CRM follow-up that actually nurtures leads, instead of a one-time blast.
                </li>
              </ul>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">The Rise of AI-Powered Search</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                A growing share of people now ask AI tools questions directly instead of searching and clicking through ten links. Those tools answer using content they can clearly read and trust.
              </p>
              <div className="p-4 bg-white/5 border-l-2 border-emerald-500 rounded-r-lg">
                <p className="text-white/70 italic">
                  If your website doesn't explain, in plain language, what you do and who it's for, you won't show up in those answers — no matter how good the work itself is.
                </p>
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">How to Modernize Without Losing Your Voice</h2>
              <p className="text-white/60 leading-relaxed">
                Start with an honest audit of what's actually working versus what you assume is working. Then fix the gap — not the whole system.
              </p>
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

          <section className="p-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Not Sure Where Your Marketing Stands?</h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Answer a few questions and get matched to the service that fits where your business is today.
            </p>
            <button
              onClick={onMatchmakerClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm uppercase tracking-widest rounded-full smooth-transition"
            >
              <span>Get Matched</span>
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

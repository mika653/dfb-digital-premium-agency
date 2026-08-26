
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
    q: "Will AI automation replace my employees?",
    a: "No. Well-built automation removes repetitive admin — replying, scheduling, data entry — so your existing team spends time on customers instead of busywork. It clears the busywork off their plate; it doesn't clear them off the payroll."
  },
  {
    q: "Is AI automation expensive?",
    a: "It scales to what you automate. The right way to start is by finding the specific time cost of your current manual process first, then getting a straight estimate for fixing it — not a marketing number."
  },
  {
    q: "What's the difference between AI automation and just using ChatGPT?",
    a: "Using a chatbot is one person typing questions into a browser tab. Automation is a system that runs in the background of tools you already use — email, calendar, CRM, invoicing — without anyone having to remember to open an app."
  },
  {
    q: "How do I know what to automate first?",
    a: "Start with whatever repeats every single day and never changes: appointment reminders, lead follow-ups, invoice chasing, data entry between systems. If a task is identical every time, it's a good automation candidate."
  },
  {
    q: "Is my business too small for AI automation?",
    a: "No — if anything, small and boutique businesses benefit most, because there's no large admin team to absorb the repetitive work. One or two well-placed automations can return hours a week."
  }
];

export const ArticleAIAutomationGuide: React.FC<ArticleProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <article className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <button onClick={onBlogClick} className="hover:text-white smooth-transition">Blog</button>
            <span>/</span>
            <span className="text-white/60">AI Automation for Established Businesses</span>
          </div>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-brand-blue/20 text-blue-300 text-xs font-semibold rounded-full">AI &amp; Automation</span>
              <span className="text-white/40 text-sm">5 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              AI Automation for Established Businesses: What It Actually Means
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Not robots. Not hype. Just the repetitive parts of your day, handled quietly.
            </p>
          </header>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/70 text-xl leading-relaxed mb-12">
              For an established business owner, "AI" often sounds like either a toy or a threat. <strong className="text-white">In practice, it's neither — it's a way to stop doing the same manual steps every single day.</strong>
            </p>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">What It Looks Like Day-to-Day</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Software that reads, sorts, and responds to routine tasks that would otherwise sit on someone's desk: a lead form that gets an instant reply, a reminder that goes out before a no-show, an invoice that chases itself.
              </p>
              <p className="text-white/60 leading-relaxed">
                It runs inside tools you already use — email, calendar, CRM, invoicing. No new dashboard for your staff to learn or avoid.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">What It's Not</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-1 shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  It's not a chatbot bolted onto your website for its own sake.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-1 shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  It's not "set it and forget it" magic — it's built, tested, and shown to you before it touches a real customer.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-1 shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  It's not a replacement for your team. It's a way to give them their time back.
                </li>
              </ul>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Where Most Businesses Start</h2>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Lead and client follow-ups that currently get missed or delayed.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Appointment scheduling and reminders.
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-1 shrink-0"><polyline points="9 6 15 12 9 18"></polyline></svg>
                  Data entry between systems that don't talk to each other.
                </li>
              </ul>
              <div className="p-4 bg-white/5 border-l-2 border-brand-blue rounded-r-lg">
                <p className="text-white/70 italic">
                  If a task is identical every time it happens, it's usually a good place to start.
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

          <section className="p-10 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">See What's Worth Automating in Your Business</h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              We'll show you the real time cost of your current manual process first — and give you a straight estimate, not a marketing number.
            </p>
            <button
              onClick={() => onServiceNavigate && onServiceNavigate('aiautomations')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm uppercase tracking-widest rounded-full smooth-transition"
            >
              <span>See AI Automations</span>
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

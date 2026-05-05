
import React, { useState, useEffect } from 'react';

interface PMASEVProps {
  onBack: () => void;
}

const outcomes = [
  {
    title: 'More new patients',
    description: 'A modern, credentialed practice site that ranks on Google and converts visitors into appointments.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 11h-6"></path>
        <path d="M19 8v6"></path>
      </svg>
    ),
  },
  {
    title: 'Five-star reviews, on autopilot',
    description: 'Automated review requests after visits. Build the online reputation your practice deserves.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
  {
    title: 'After-hours inquiries, handled',
    description: 'A smart intake assistant answers patient questions 24/7 — so you stop losing leads after office hours.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
  {
    title: 'A digital roadmap for your association',
    description: 'For PMASEV leadership: a clear plan to modernize member communications, events, and community engagement.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 3 19 8 16 16 19 21 16 21 3 16 6 8 3 3 6"></polyline>
        <line x1="8" y1="3" x2="8" y2="16"></line>
        <line x1="16" y1="6" x2="16" y2="19"></line>
      </svg>
    ),
  },
];

export const PMASEV: React.FC<PMASEVProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    practice: '',
    email: '',
    phone: '',
    specialty: '',
    challenge: '',
  });
  const [utm, setUtm] = useState({ source: '', medium: '', campaign: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get('utm_source') || 'pmasev',
      medium: params.get('utm_medium') || 'direct',
      campaign: params.get('utm_campaign') || 'deck',
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/joe@dfbdigital.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          practice: formData.practice || 'Not provided',
          email: formData.email,
          phone: formData.phone || 'Not provided',
          specialty: formData.specialty || 'Not provided',
          challenge: formData.challenge || 'No details provided',
          source: `PMASEV deck — ${utm.source}/${utm.medium}/${utm.campaign}`,
          _subject: `PMASEV Lead — ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', practice: '', email: '', phone: '', specialty: '', challenge: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-blue selection:text-white">
      {/* Slim navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-3">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto" />
          </button>
          <a
            href="#connect"
            className="px-5 py-2 bg-brand-blue text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition"
          >
            Get Your Health Check
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden texture-noise texture-gradient-dark">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 skew-x-12 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#bdffcf]/5 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-[#bdffcf]/30 mb-10">
            <span className="w-2 h-2 bg-[#bdffcf] rounded-full"></span>
            <span className="text-[#bdffcf] text-xs font-semibold tracking-widest uppercase">Proud Digital Partner of PMASEV</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8 tracking-tight max-w-4xl">
            Your patients are choosing their doctor on Google.
            <br />
            <span className="text-[#bdffcf]">Let's make sure they choose you.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl font-light tracking-wide">
            You spent decades earning your credentials. Your digital presence should reflect that — not lag behind it. We help Filipino-American physicians turn Google searches into booked appointments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#connect"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-widest uppercase rounded-full smooth-transition w-fit"
            >
              <span>Free 20-Min Digital Health Check</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18"></polyline>
              </svg>
            </a>
            <a
              href="#what-we-do"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 text-white font-semibold text-sm tracking-widest uppercase rounded-full smooth-transition w-fit"
            >
              See What We Do
            </a>
          </div>

          <p className="mt-10 text-xs text-white/40 tracking-widest uppercase">
            PMASEV members only · No obligation · 20 minutes
          </p>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="py-32 px-6 lg:px-12 bg-brand-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#bdffcf] mb-6">What we do for the medical community</p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-20 tracking-tight max-w-4xl">
            Four problems we solve, <br />
            <span className="text-white/40">in plain English.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="group relative p-10 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-[#bdffcf]/40 hover:bg-white/[0.05] smooth-transition"
              >
                <div className="absolute top-0 left-10 w-12 h-1 bg-[#bdffcf] rounded-b-full"></div>
                <div className="text-[#bdffcf] mb-8 mt-4">{item.icon}</div>
                <h3 className="text-2xl font-heading font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect form */}
      <section id="connect" className="py-32 px-6 lg:px-12 bg-brand-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/10 skew-x-12 translate-x-1/2"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: pitch */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#bdffcf] mb-6">Free Digital Health Check</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 tracking-tight leading-[1.1]">
                A 20-minute call. <br />
                <span className="text-[#bdffcf]">No pitch deck. No pressure.</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-lg">
                Tell us about your practice. We'll review your current online presence and send you a one-page action plan — yours to keep, whether you work with us or not.
              </p>

              <ul className="space-y-4 text-white/70">
                {[
                  'Google ranking review for your specialty + city',
                  'Website credibility & conversion audit',
                  'Online reputation snapshot (reviews, listings)',
                  'Three concrete next steps, prioritized',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bdffcf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#bdffcf]/20 flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#bdffcf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Request received.</h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
                    We'll reach out within 1 business day to schedule your Digital Health Check. In the meantime, watch your inbox — we'll send a quick confirmation.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">Request your Digital Health Check</h3>
                  <p className="text-white/40 text-sm mb-8">All fields with * are required.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition"
                          placeholder="Dr. Juan Dela Cruz"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Practice / Clinic</label>
                        <input
                          type="text"
                          value={formData.practice}
                          onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition"
                        placeholder="you@practice.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Specialty</label>
                        <input
                          type="text"
                          value={formData.specialty}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition"
                          placeholder="e.g. Internal Medicine"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
                        Your #1 digital frustration
                      </label>
                      <textarea
                        value={formData.challenge}
                        onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition resize-none"
                        placeholder="e.g. Patients can't find me on Google, my site looks dated, I'm losing after-hours inquiries..."
                      ></textarea>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-sm">
                        Something went wrong. Please email us directly at joe@dfbdigital.com.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full px-8 py-4 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </span>
                      ) : (
                        'Request My Health Check'
                      )}
                    </button>

                    <p className="text-[10px] text-white/30 text-center tracking-widest uppercase pt-2">
                      We respect your inbox. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-brand-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto" />
            <span className="text-white/30 text-xs tracking-widest uppercase">Boutique Digital Agency</span>
          </div>
          <div className="flex items-center gap-8 text-xs text-white/40 tracking-widest uppercase">
            <a href="mailto:hello@dfbdigital.com" className="hover:text-white smooth-transition">hello@dfbdigital.com</a>
            <button onClick={onBack} className="hover:text-white smooth-transition">Main Site</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

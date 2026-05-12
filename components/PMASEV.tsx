
import React, { useState, useEffect } from 'react';

interface PMASEVProps {
  onBack: () => void;
}

const services = [
  {
    title: 'Website & Social Media Marketing',
    description: 'A polished website plus an active presence on Facebook, Instagram, and LinkedIn — so patients find you and trust you.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  },
  {
    title: 'AI Automation',
    description: 'Smart tools that book appointments and answer patient questions — even after hours.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    ),
  },
  {
    title: 'SEO, AEO, and Paid Media',
    description: 'Be the first name patients see — on Google, on AI assistants like ChatGPT, and in the ads that actually pay off.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
  },
  {
    title: 'Digital Transformation',
    description: 'A clear, step-by-step plan to bring your practice fully into the digital age.',
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

    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      practice: formData.practice || 'Not provided',
      email: formData.email,
      phone: formData.phone || 'Not provided',
      specialty: formData.specialty || 'Not provided',
      challenge: formData.challenge || 'No details provided',
      source: `PMASEV deck — ${utm.source}/${utm.medium}/${utm.campaign}`,
    };

    const sheetsUrl = import.meta.env.VITE_PMASEV_SHEETS_URL;

    try {
      // Fire to email and sheet in parallel. Sheet append is best-effort —
      // if it fails, we still want the email path (Joe's inbox) to count as success.
      const [emailResponse] = await Promise.all([
        fetch('https://formsubmit.co/ajax/joe@dfbdigital.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...payload, _subject: `PMASEV Lead — ${formData.name}` }),
        }),
        sheetsUrl
          ? fetch(sheetsUrl, {
              method: 'POST',
              // text/plain avoids the CORS preflight that Apps Script Web Apps don't handle.
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify(payload),
            }).catch(() => null)
          : Promise.resolve(null),
      ]);

      if (emailResponse.ok) {
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
    <div className="min-h-screen bg-[#FAFAF7] text-brand-black selection:bg-brand-blue selection:text-white">
      {/* Slim navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FAFAF7]/85 backdrop-blur-md border-b border-black/5">
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
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-blue/[0.06] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2dd180]/[0.05] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 shadow-sm rounded-full mb-10">
            <span className="w-2 h-2 bg-[#2dd180] rounded-full"></span>
            <span className="text-brand-black text-xs font-bold tracking-widest uppercase">Proud Digital Partner of PMASEV</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.04] mb-8 tracking-tight max-w-4xl">
            Your medical expertise deserves a digital presence{' '}
            <span className="text-brand-blue">to match.</span>
          </h1>

          <p className="text-lg md:text-2xl text-black/70 leading-snug mb-12 max-w-3xl font-medium">
            Your patients are choosing their doctor on Google.
            <br className="hidden sm:block" />
            <span className="text-brand-blue font-bold"> Let's make sure they choose you.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#connect"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm tracking-widest uppercase rounded-full smooth-transition w-fit shadow-lg shadow-brand-blue/20"
            >
              <span>Free 20-Min Digital Health Check</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18"></polyline>
              </svg>
            </a>
            <a
              href="#what-we-do"
              className="inline-flex items-center gap-3 px-8 py-4 border border-black/20 hover:border-black/40 hover:bg-white text-brand-black font-semibold text-sm tracking-widest uppercase rounded-full smooth-transition w-fit"
            >
              See What We Do
            </a>
          </div>

          <p className="mt-10 text-xs text-black/40 tracking-widest uppercase font-medium">
            PMASEV members only · No obligation · 20 minutes
          </p>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="py-32 px-6 lg:px-12 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-blue mb-6">Services for the medical community</p>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-20 tracking-tight max-w-4xl leading-[1.05]">
            Four ways we help you{' '}
            <span className="text-brand-blue">do digital better.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="group relative p-10 bg-[#FAFAF7] border border-black/5 border-l-4 border-l-brand-blue rounded-3xl hover:shadow-lg hover:bg-white smooth-transition"
              >
                <div className="text-brand-blue mb-8">{item.icon}</div>
                <h3 className="text-2xl font-heading font-bold mb-4 tracking-tight text-brand-black">{item.title}</h3>
                <p className="text-black/65 leading-relaxed text-base md:text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect form */}
      <section id="connect" className="py-32 px-6 lg:px-12 bg-[#FAFAF7] border-t border-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 skew-x-12 translate-x-1/2"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: pitch */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-blue mb-6">Free Digital Health Check</p>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 tracking-tight leading-[1.1] text-brand-black">
                A 20-minute call. <br />
                <span className="text-brand-blue">No pitch. No pressure.</span>
              </h2>
              <p className="text-black/70 leading-relaxed mb-8 text-lg">
                Tell us about your practice. We'll review your current online presence and send you a one-page action plan — yours to keep, whether you work with us or not.
              </p>

              <ul className="space-y-4 text-black/75 text-base md:text-lg">
                {[
                  'Google ranking review for your specialty + city',
                  'Website credibility & conversion audit',
                  'Online reputation snapshot (reviews, listings)',
                  'Three concrete next steps, prioritized',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1 text-brand-blue">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form — DARK inverted card for conversion focus */}
            <div className="bg-brand-black border border-black/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/15 relative">
              <div className="absolute top-0 left-12 w-20 h-1 bg-brand-blue rounded-b-full"></div>

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
                  <p className="text-[#bdffcf] text-xs font-bold tracking-widest uppercase mb-3">Exclusive · PMASEV Members</p>
                  <h3 className="text-2xl font-heading font-extrabold text-white mb-2">Request your Digital Health Check</h3>
                  <p className="text-white/50 text-sm mb-8">All fields with * are required.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Name *</label>
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
                        <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Practice / Clinic</label>
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
                      <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Email *</label>
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
                        <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#bdffcf] focus:ring-1 focus:ring-[#bdffcf] smooth-transition"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Specialty</label>
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
                      <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                        Your biggest digital headache
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

                    <p className="text-[10px] text-white/40 text-center tracking-widest uppercase pt-2">
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
      <footer className="py-12 px-6 lg:px-12 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto" />
            <span className="text-black/40 text-xs tracking-widest uppercase font-medium">Boutique Digital Agency</span>
          </div>
          <div className="flex items-center gap-8 text-xs text-black/50 tracking-widest uppercase font-medium">
            <a href="mailto:joe@dfbdigital.com" className="hover:text-brand-blue smooth-transition">joe@dfbdigital.com</a>
            <button onClick={onBack} className="hover:text-brand-blue smooth-transition">Main Site</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

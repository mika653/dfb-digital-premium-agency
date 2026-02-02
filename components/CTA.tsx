
import React, { useState } from 'react';

export const CTA: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/mika@dfbdigital.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'No additional details provided',
          _subject: 'Discovery Call Request from DFB Digital',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="py-48 px-6 lg:px-12 bg-brand-black text-brand-white relative overflow-hidden texture-noise texture-gradient-dark">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/10 skew-x-12 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tight">
              Still Not Sure <br />
              <span className="text-[#bdffcf]">What You Need?</span>
            </h2>

            <p className="text-xl text-brand-white/60 mb-16 leading-relaxed max-w-xl">
              That's completely fine. Some conversations are better had person-to-person. If you'd like help clarifying your options, let's start with a short, no-pressure discovery call.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="px-10 py-5 bg-brand-white text-brand-black font-heading font-bold text-xs uppercase tracking-widest rounded-full hover:bg-brand-blue hover:text-white smooth-transition"
            >
              Book a Discovery Call
            </button>
          </div>
        </div>
      </section>

      {/* Discovery Call Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowForm(false); setStatus('idle'); }}></div>

          <div className="relative w-full max-w-lg bg-brand-black border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <button
              onClick={() => { setShowForm(false); setStatus('idle'); }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white smooth-transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-brand-blue/20 flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bdffcf]">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">Request Received</h3>
                <p className="text-white/50 text-sm leading-relaxed">We'll be in touch shortly to schedule your discovery call.</p>
                <button
                  onClick={() => { setShowForm(false); setStatus('idle'); }}
                  className="mt-8 px-8 py-3 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Book a Discovery Call</h3>
                <p className="text-white/40 text-sm mb-8">Tell us a bit about yourself and we'll reach out to schedule a time.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">What can we help with?</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition resize-none"
                      placeholder="Brief description of what you're looking for"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly at mika@dfbdigital.com</p>
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
                      'Submit Request'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

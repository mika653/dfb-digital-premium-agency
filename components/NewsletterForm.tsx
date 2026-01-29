
import React, { useState } from 'react';

interface NewsletterFormProps {
  variant?: 'dark' | 'light';
  compact?: boolean;
}

const KIT_FORM_ID = '9027233';
const KIT_API_KEY = '7Pk2SPOVgQOqPzHETa6aEw';

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ variant = 'dark', compact = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.subscription) {
        setStatus('success');
        setMessage('Welcome aboard! Check your inbox to confirm.');
        setEmail('');
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-brand-blue/10 border-brand-blue/30' : 'bg-brand-blue/5 border-brand-blue/20'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>You're in!</p>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>{message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`flex-1 px-5 py-3 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue smooth-transition ${
              isDark
                ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-brand-blue'
                : 'bg-white border-black/10 text-black placeholder-black/40 focus:border-brand-blue'
            }`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm uppercase tracking-widest rounded-full smooth-transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Subscribing...</span>
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="mt-2 text-red-400 text-sm">{message}</p>
        )}
      </form>
    );
  }

  return (
    <div className={`p-8 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-brand-blue/20' : 'bg-brand-blue/10'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div>
          <h4 className={`font-heading font-bold ${isDark ? 'text-white' : 'text-black'}`}>Stay Updated</h4>
          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>Digital insights, no jargon</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full px-5 py-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue smooth-transition ${
              isDark
                ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-brand-blue'
                : 'bg-white border-black/10 text-black placeholder-black/40 focus:border-brand-blue'
            }`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm uppercase tracking-widest rounded-xl smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Subscribing...</span>
              </span>
            ) : (
              'Subscribe to Insights'
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="mt-3 text-red-400 text-sm text-center">{message}</p>
        )}
        <p className={`mt-4 text-xs text-center ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

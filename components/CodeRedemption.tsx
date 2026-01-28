
import React, { useState } from 'react';

interface CodeRedemptionProps {
  isOpen: boolean;
  onClose: () => void;
}

// Valid codes - add your special codes here
const VALID_CODES = ['DFB2024', 'MEETUP', 'PARTNER', 'VIP2024', 'AUDIT'];

export const CodeRedemption: React.FC<CodeRedemptionProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'code' | 'form' | 'success'>('code');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = code.trim().toUpperCase();

    if (VALID_CODES.includes(normalizedCode)) {
      setCodeError('');
      setStep('form');
    } else {
      setCodeError('Invalid code. Please check and try again.');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, you'd send this data to your backend or email service
    console.log('Audit request:', { code, name, email });

    setIsSubmitting(false);
    setStep('success');
  };

  const handleClose = () => {
    // Reset state when closing
    setTimeout(() => {
      setStep('code');
      setCode('');
      setCodeError('');
      setName('');
      setEmail('');
    }, 300);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-brand-black border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white smooth-transition z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-brand-blue to-blue-600 px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-heading font-bold text-xl">Free Website Audit</h3>
              <p className="text-white/70 text-sm">Exclusive offer for our connections</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 'code' && (
            <form onSubmit={handleCodeSubmit}>
              <p className="text-white/70 text-sm mb-6">
                Enter the special code you received from DFB to claim your free website audit.
              </p>

              <div className="mb-6">
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                  Your Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setCodeError('');
                  }}
                  placeholder="Enter code here"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-brand-blue smooth-transition text-center text-lg tracking-widest uppercase"
                  autoFocus
                />
                {codeError && (
                  <p className="mt-2 text-red-400 text-sm">{codeError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider rounded-lg smooth-transition"
              >
                Verify Code
              </button>
            </form>
          )}

          {step === 'form' && (
            <form onSubmit={handleFormSubmit}>
              <div className="flex items-center gap-2 mb-6 text-green-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="text-sm font-medium">Code verified! Complete your details below.</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-brand-blue smooth-transition"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-brand-blue smooth-transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-blue hover:bg-blue-600 disabled:bg-brand-blue/50 text-white font-semibold text-sm uppercase tracking-wider rounded-lg smooth-transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Claim My Free Audit'
                )}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              <h4 className="text-white font-heading font-bold text-xl mb-3">
                You're All Set!
              </h4>

              <p className="text-white/60 text-sm mb-6">
                Thanks, {name}! We'll send your free website audit details to <span className="text-white">{email}</span> within 24-48 hours.
              </p>

              <button
                onClick={handleClose}
                className="px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-full smooth-transition text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        {step !== 'success' && (
          <div className="px-8 pb-6">
            <p className="text-white/30 text-xs text-center">
              Don't have a code? <a href="mailto:hello@dfbdigital.com" className="text-brand-blue hover:underline">Contact us</a> to learn about our services.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

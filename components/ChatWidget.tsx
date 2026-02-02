
import React, { useState, useRef, useEffect } from 'react';
import { NewsletterForm } from './NewsletterForm';

interface ChatWidgetProps {
  onMatchmakerClick: () => void;
  onBlogClick: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onMatchmakerClick, onBlogClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'newsletter'>('menu');
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setView('menu');
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) setView('menu');
  };

  const handleMatchmaker = () => {
    setIsOpen(false);
    setView('menu');
    onMatchmakerClick();
  };

  const handleBlog = () => {
    setIsOpen(false);
    setView('menu');
    onBlogClick();
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      {/* Popup card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-black rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-fade-in">
          {view === 'menu' ? (
            <>
              <div className="px-5 pt-5 pb-3">
                <p className="text-white font-heading font-bold text-sm">How can we help?</p>
                <p className="text-white/40 text-xs mt-1">Choose an option below</p>
              </div>
              <div className="px-3 pb-3 space-y-1">
                <button
                  onClick={() => setView('newsletter')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-white/70 hover:text-white hover:bg-white/5 smooth-transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/30 smooth-transition">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Subscribe to our newsletter</p>
                    <p className="text-xs text-white/30">Digital insights, no jargon</p>
                  </div>
                </button>

                <button
                  onClick={handleMatchmaker}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-white/70 hover:text-white hover:bg-white/5 smooth-transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#bdffcf]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#bdffcf]/30 smooth-transition">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bdffcf]">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Get matched to a service</p>
                    <p className="text-xs text-white/30">Find the right fit for you</p>
                  </div>
                </button>

                <button
                  onClick={handleBlog}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-white/70 hover:text-white hover:bg-white/5 smooth-transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f8b18a]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f8b18a]/30 smooth-transition">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f8b18a]">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Read our blog</p>
                    <p className="text-xs text-white/30">Insights & resources</p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <button
                onClick={() => setView('menu')}
                className="flex items-center gap-1 text-white/40 hover:text-white/70 text-xs mb-3 smooth-transition"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
              <NewsletterForm variant="dark" compact />
            </div>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={handleToggle}
        className="w-12 h-12 bg-brand-blue hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl smooth-transition flex items-center justify-center"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

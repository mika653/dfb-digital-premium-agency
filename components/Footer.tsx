
import React from 'react';

interface FooterProps {
  onMatchmakerClick?: () => void;
  onBlogClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onMatchmakerClick, onBlogClick, onServiceNavigate }) => {
  return (
    <footer className="py-20 px-6 lg:px-12 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="mb-6">
              <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto" />
            </div>
            <p className="text-black/50 text-sm max-w-xs leading-relaxed">
              Boutique digital consultancy for established business owners. We build systems for clarity, structure, and long-term execution.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-black/60">
              <li><a href="/services" className="hover:text-brand-blue smooth-transition">Services</a></li>
              <li><button onClick={() => onServiceNavigate && onServiceNavigate('about')} className="hover:text-brand-blue smooth-transition text-left">About</button></li>
              <li><button onClick={() => onServiceNavigate && onServiceNavigate('our-work')} className="hover:text-brand-blue smooth-transition text-left">Our Work</button></li>
              <li><button onClick={onBlogClick} className="hover:text-brand-blue smooth-transition text-left">Blog</button></li>
              <li><button onClick={() => onServiceNavigate && onServiceNavigate('rh-event-design')} className="hover:text-brand-blue smooth-transition text-left">Partners</button></li>
              <li><button onClick={onMatchmakerClick} className="hover:text-brand-blue smooth-transition text-left">Get Matched</button></li>
              <li><a href="mailto:hello@dfbdigital.com" className="hover:text-brand-blue smooth-transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-black/60">
              <li><a href="mailto:hello@dfbdigital.com" className="hover:text-brand-blue smooth-transition">hello@dfbdigital.com</a></li>
              <li>
                <a
                  href="https://linkedin.com/in/daddyfunbuckets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#0A66C2] smooth-transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-8">Office</h4>
            <address className="text-sm text-black/60 not-italic leading-relaxed">
              Unit B, 11/F Yam Tze Comm Bldg<br />
              23 Thomson Rd, Wan Chai<br />
              Hong Kong
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] text-black/30 font-medium uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} DFB Digital. All rights reserved.
          </p>
          <div className="flex gap-10 text-[10px] text-black/30 font-medium uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-black smooth-transition">Privacy</a>
            <a href="#" className="hover:text-black smooth-transition">Terms</a>
            <a href="#" className="hover:text-black smooth-transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

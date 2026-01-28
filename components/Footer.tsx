
import React from 'react';

interface FooterProps {
  onCodeClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCodeClick }) => {
  return (
    <footer className="py-20 px-6 lg:px-12 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-12 w-auto" />
            </div>
            <p className="text-black/50 text-sm max-w-xs leading-relaxed">
              Boutique digital consultancy for established business owners. We build systems for clarity, structure, and long-term execution.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-black/60">
              <li><a href="#services" className="hover:text-brand-blue smooth-transition">Services</a></li>
              <li><a href="#matchmaker" className="hover:text-brand-blue smooth-transition">Find Your Fit</a></li>
              <li><button onClick={onCodeClick} className="hover:text-brand-blue smooth-transition">Redeem Code</button></li>
              <li><a href="#" className="hover:text-brand-blue smooth-transition">Inquiry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-black/60">
              <li>London / New York</li>
              <li>hello@dfbdigital.com</li>
              <li>+44 (0) 20 7123 4567</li>
            </ul>
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


import React from 'react';

interface NavbarProps {
  onMatchmakerClick?: () => void;
  onCodeClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMatchmakerClick, onCodeClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue flex items-center justify-center">
            <span className="text-white text-[10px] font-heading font-bold">DFB</span>
          </div>
          <span className="font-heading font-bold tracking-tighter text-xl">DIGITAL</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <a href="#services" className="hover:text-brand-blue smooth-transition">Services</a>
          <button onClick={onMatchmakerClick} className="hover:text-brand-blue smooth-transition">Find Your Fit</button>
          <button onClick={onCodeClick} className="hover:text-brand-blue smooth-transition">Redeem Code</button>
          <button className="px-6 py-2 border border-black text-xs font-semibold uppercase tracking-widest hover:bg-brand-black hover:text-white smooth-transition">
            Inquiry
          </button>
        </div>

        <button className="md:hidden flex flex-col gap-1.5">
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>
    </nav>
  );
};

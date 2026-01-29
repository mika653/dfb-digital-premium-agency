
import React from 'react';

interface NavbarProps {
  onMatchmakerClick?: () => void;
  onCodeClick?: () => void;
  onBlogClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMatchmakerClick, onCodeClick, onBlogClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-[140px] w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <a href="#services" className="text-white/80 hover:text-white smooth-transition">Services</a>
          <button onClick={onBlogClick} className="text-white/80 hover:text-white smooth-transition">Blog</button>
          <button onClick={onMatchmakerClick} className="text-white/80 hover:text-white smooth-transition">Find Your Fit</button>
          <button onClick={onCodeClick} className="text-white/80 hover:text-white smooth-transition">Redeem Code</button>
          <button className="px-6 py-2 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-white hover:text-brand-black smooth-transition">
            Inquiry
          </button>
        </div>

        <button className="md:hidden flex flex-col gap-1.5">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>
    </nav>
  );
};

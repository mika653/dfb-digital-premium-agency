
import React, { useState } from 'react';

interface NavbarProps {
  onMatchmakerClick?: () => void;
  onCodeClick?: () => void;
  onBlogClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMatchmakerClick, onCodeClick, onBlogClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (action?: () => void) => {
    setMenuOpen(false);
    if (action) action();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-28 md:h-32 lg:h-36 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto" />
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

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white smooth-transition ${menuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white smooth-transition ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-black/95 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-4 text-sm font-medium tracking-wide">
            <a href="#services" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white smooth-transition">Services</a>
            <button onClick={() => handleNavClick(onBlogClick)} className="text-left text-white/80 hover:text-white smooth-transition">Blog</button>
            <button onClick={() => handleNavClick(onMatchmakerClick)} className="text-left text-white/80 hover:text-white smooth-transition">Find Your Fit</button>
            <button onClick={() => handleNavClick(onCodeClick)} className="text-left text-white/80 hover:text-white smooth-transition">Redeem Code</button>
            <button className="mt-2 px-6 py-2 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-white hover:text-brand-black smooth-transition w-fit">
              Inquiry
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

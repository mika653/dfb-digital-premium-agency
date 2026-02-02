
import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onMatchmakerClick?: () => void;
  onBlogClick?: () => void;
  onHomeClick?: () => void;
}

const serviceLinks = [
  { label: 'Web Development', href: '#web-development' },
  { label: 'Digital Marketing', href: '#digital-marketing' },
  { label: 'Digital Consultancy', href: '#digital-consultancy' },
];

export const Navbar: React.FC<NavbarProps> = ({ onMatchmakerClick, onBlogClick, onHomeClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (action?: () => void) => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    if (action) action();
  };

  const handleSectionClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setServicesOpen(false);
    setMenuOpen(false);
    setMobileServicesOpen(false);
    if (window.location.pathname !== '/') {
      // Navigate home first, then scroll to section
      if (onHomeClick) onHomeClick();
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-28 md:h-32 lg:h-36 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto" />
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1.5 text-white/80 hover:text-white smooth-transition"
            >
              <span>Services</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`smooth-transition ${servicesOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-4 w-56 bg-brand-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                {serviceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link.href)}
                    className="block px-5 py-3.5 text-white/70 hover:text-white hover:bg-white/5 smooth-transition text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button onClick={onBlogClick} className="text-white/80 hover:text-white smooth-transition">Blog</button>
          <button onClick={onMatchmakerClick} className="text-white/80 hover:text-white smooth-transition">Get Matched</button>
          <a
            href="mailto:hello@dfbdigital.com"
            className="px-6 py-2 bg-brand-blue text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition"
          >
            Contact
          </a>
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
            {/* Mobile Services Accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between text-left text-white/80 hover:text-white smooth-transition"
            >
              <span>Services</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`smooth-transition ${mobileServicesOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                {serviceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link.href)}
                    className="text-white/60 hover:text-white smooth-transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <button onClick={() => handleNavClick(onBlogClick)} className="text-left text-white/80 hover:text-white smooth-transition">Blog</button>
            <button onClick={() => handleNavClick(onMatchmakerClick)} className="text-left text-white/80 hover:text-white smooth-transition">Get Matched</button>
            <a
              href="mailto:hello@dfbdigital.com"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-6 py-2 bg-brand-blue text-white text-xs font-semibold uppercase tracking-widest rounded-full active:bg-blue-600 smooth-transition w-fit"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};


import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onMatchmakerClick?: () => void;
  onBlogClick?: () => void;
  onHomeClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

interface ServiceNavItem {
  label: string;
  description: string;
  route?: string;
  anchor?: string;
  hash?: string;
}

interface ServiceNavGroup {
  heading: string;
  items: ServiceNavItem[];
}

const serviceGroups: ServiceNavGroup[] = [
  {
    heading: 'Web Development',
    items: [
      { label: 'Event Lab', description: 'High-impact event websites', route: 'eventlab' },
      { label: 'InstaSite', description: 'A professional web presence, delivered fast', route: 'instasite' },
      { label: 'LaunchPad', description: 'Full website solutions for growing businesses', route: 'launchpad' },
    ],
  },
  {
    heading: 'Digital Marketing',
    items: [
      { label: 'Digital Strategy & Campaign Planning', description: 'A clear roadmap for online growth', route: 'digitalstrategy' },
      { label: 'Social Media Marketing', description: 'Build audience and drive engagement', route: 'socialmedia' },
      { label: 'Content Marketing', description: 'Tell your brand story, attract the right audience', route: 'contentmarketing' },
      { label: 'Email & CRM-Based Marketing', description: 'Nurture leads, retain customers', route: 'emailcrm' },
    ],
  },
  {
    heading: 'Digital Consultancy',
    items: [
      { label: 'AI Automations', description: 'Get repetitive work off your plate', route: 'aiautomations' },
      { label: 'Digital Transformation Consultation', description: 'A straight-talk plan for catching up', route: 'digitaltransformation' },
      { label: 'One-on-One Coaching', description: 'Personalized strategy sessions', route: 'services', hash: '#digital-consultancy' },
      { label: 'Speaking & Podcast', description: 'Keynotes, talks, and podcast appearances', route: 'services', hash: '#digital-consultancy' },
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({ onMatchmakerClick, onBlogClick, onHomeClick, onServiceNavigate }) => {
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

  const handleServiceItemClick = (e: React.MouseEvent, item: ServiceNavItem) => {
    e.preventDefault();
    setServicesOpen(false);
    setMenuOpen(false);
    setMobileServicesOpen(false);
    if (item.route && item.hash) {
      // Cross-page anchor: full navigation so the hash resolves after the target page renders
      window.location.href = `/${item.route}${item.hash}`;
    } else if (item.route && onServiceNavigate) {
      onServiceNavigate(item.route);
    } else if (item.anchor) {
      handleSectionClick(e, item.anchor);
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
              <div className="absolute top-full left-0 mt-4 w-96 bg-brand-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
                {serviceGroups.map((group, gIdx) => (
                  <div key={group.heading} className={gIdx > 0 ? 'border-t border-white/5' : ''}>
                    <p className="px-5 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
                      {group.heading}
                    </p>
                    {group.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.route ? `/${item.route}${item.hash || ''}` : (item.anchor || '#')}
                        onClick={(e) => handleServiceItemClick(e, item)}
                        className="block px-5 py-4 text-white/80 hover:text-white hover:bg-white/5 smooth-transition"
                      >
                        <span className="block text-[15px] font-medium leading-snug">{item.label}</span>
                        <span className="block text-sm text-white/50 mt-0.5">{item.description}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => onServiceNavigate && onServiceNavigate('about')} className="text-white/80 hover:text-white smooth-transition">About</button>
          <button onClick={() => onServiceNavigate && onServiceNavigate('our-work')} className="text-white/80 hover:text-white smooth-transition">Our Work</button>
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
              <div className="flex flex-col gap-5 pl-4 border-l border-white/10">
                {serviceGroups.map((group) => (
                  <div key={group.heading}>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                      {group.heading}
                    </p>
                    <div className="flex flex-col gap-3">
                      {group.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.route ? `/${item.route}${item.hash || ''}` : (item.anchor || '#')}
                          onClick={(e) => handleServiceItemClick(e, item)}
                          className="text-white/70 hover:text-white smooth-transition"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => handleNavClick(() => onServiceNavigate && onServiceNavigate('about'))} className="text-left text-white/80 hover:text-white smooth-transition">About</button>
            <button onClick={() => handleNavClick(() => onServiceNavigate && onServiceNavigate('our-work'))} className="text-left text-white/80 hover:text-white smooth-transition">Our Work</button>
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

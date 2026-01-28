
import React from 'react';

interface EventLabProps {
  onBack: () => void;
}

const eventPhases = [
  {
    title: "Pre-event",
    description: "Build excitement till the big day",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    title: "Event Proper",
    description: "Guide guests in real time and keep things running smoothly",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    )
  },
  {
    title: "Post-event",
    description: "Relive the experience over and over again",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v6h6"></path>
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
        <path d="M21 22v-6h-6"></path>
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
      </svg>
    )
  }
];

const keyFeatures = [
  {
    title: "Centralized Content Management",
    description: "Easily manage schedules, speakers, announcements, and content in one place—so attendees always see the most up-to-date event information."
  },
  {
    title: "Always-On Accessibility",
    description: "A dedicated event site that's accessible anytime, on any device, giving attendees, partners, and speakers constant access to everything they need."
  },
  {
    title: "Partner & Sponsor Visibility",
    description: "Purpose-built sections for sponsors and partners that offer visibility, credibility, and clear value—without distracting from the attendee experience."
  }
];

const benefits = [
  {
    title: "Up-to-the-Minute Event Info",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    title: "24/7 Availability",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a10 10 0 0 1 0 20"></path>
        <path d="M12 6v6l4 2"></path>
      </svg>
    )
  },
  {
    title: "Sponsorship Opportunities",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  }
];

export const EventLab: React.FC<EventLabProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white smooth-transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-12 w-auto" />
          </div>
          <a
            href="mailto:hello@dfbdigital.com"
            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:from-pink-600 hover:to-purple-700 smooth-transition"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images - Concert/Party Vibe */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=2000"
            alt="Concert atmosphere"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 via-purple-900/20 to-black/50"></div>
          {/* Animated gradient accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
        </div>

        {/* Floating light effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium tracking-wide">Premium Event Solutions</span>
          </div>

          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-4">
            Websites built for moments that matter.
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] mb-8">
            <span className="text-white">Event</span>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Lab</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            High-impact event websites that inform, engage, and convert—whether it's a conference, launch, community event, or private gathering. From schedules and speakers to registration and post-event content, everything lives in one focused digital experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@dfbdigital.com?subject=Event Lab Inquiry"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              <span>Start Your Event</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition"
            >
              Learn More
            </a>
          </div>
        </div>

      </section>

      {/* Event Phases Section */}
      <section id="benefits" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Your Event, <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Every Step</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventPhases.map((phase, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-pink-500/50 hover:bg-white/10 smooth-transition"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition">
                  {phase.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{phase.title}</h3>
                <p className="text-white/60 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-32 px-6 lg:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Key <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 border-l-2 border-pink-500/50 hover:border-pink-500 smooth-transition"
              >
                <h3 className="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              The <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Benefits</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery/Atmosphere Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800"
                alt="Event atmosphere"
                className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=400"
                alt="Concert lights"
                className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=400"
                alt="Party crowd"
                className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400"
                alt="Stage setup"
                className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400"
                alt="Festival vibes"
                className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
            alt="Event background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-brand-black/70"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready to Create Something <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Unforgettable</span>?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Let's discuss your vision and bring it to life with precision and creativity.
          </p>
          <a
            href="mailto:hello@dfbdigital.com?subject=Event Lab Inquiry"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm tracking-wider uppercase rounded-full smooth-transition group"
          >
            <span>Get in Touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 smooth-transition">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto opacity-50" />
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} DFB Digital. All rights reserved.
          </p>
          <button
            onClick={onBack}
            className="text-white/50 hover:text-white text-sm smooth-transition"
          >
            Back to Home
          </button>
        </div>
      </footer>
    </div>
  );
};

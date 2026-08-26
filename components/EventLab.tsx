
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface EventLabProps {
  onBack: () => void;
  onBlogClick?: () => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const eventPhases = [
  {
    number: "01",
    title: "Pre-event",
    description: "Build excitement till the big day"
  },
  {
    number: "02",
    title: "Event Proper",
    description: "Guide guests in real time and keep things running smoothly"
  },
  {
    number: "03",
    title: "Post-event",
    description: "Relive the experience over and over again"
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
    number: "01",
    title: "Up-to-the-Minute Event Info"
  },
  {
    number: "02",
    title: "24/7 Availability"
  },
  {
    number: "03",
    title: "Sponsorship Opportunities"
  }
];

export const EventLab: React.FC<EventLabProps> = ({ onBack, onBlogClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Navigation */}
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

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

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          {/* Eyebrow */}
          <p className="text-sm uppercase tracking-widest text-pink-300/80 font-medium mb-6">Premium Event Solutions</p>

          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-4">
            Websites built for moments that matter.
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05] mb-8">
            <span className="text-white">Event</span>
            <span className="text-[#bdffcf]"> Lab</span>
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
      <section id="benefits" className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Your Event, <span className="text-[#bdffcf]">Every Step</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {eventPhases.map((phase, index) => (
              <div
                key={index}
                className="border-t-2 border-pink-500/40 pt-6"
              >
                <div className="text-5xl font-heading font-bold text-pink-500/30 mb-4">{phase.number}</div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{phase.title}</h3>
                <p className="text-white/70 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Key <span className="text-[#bdffcf]">Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/50 smooth-transition"
              >
                <h3 className="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              The <span className="text-[#bdffcf]">Benefits</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="border-t-2 border-pink-500/40 pt-6 text-center"
              >
                <div className="text-5xl font-heading font-bold text-pink-500/30 mb-4">{benefit.number}</div>
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
      <section className="py-16 md:py-32 px-6 lg:px-12 relative overflow-hidden">
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
            Ready to Create Something <span className="text-[#bdffcf]">Unforgettable</span>?
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

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};

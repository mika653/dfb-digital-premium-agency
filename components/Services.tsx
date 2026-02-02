
import React from 'react';

interface ServicesProps {
  onEventLabClick: () => void;
  onInstaSiteClick: () => void;
  onLaunchPadClick: () => void;
}

const serviceList = [
  {
    title: "Event Lab",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    description: "High-impact event websites that inform, engage, and convert.",
    gradient: "from-pink-500 via-purple-500 to-purple-700",
    accentColor: "bg-pink-500",
    hoverColor: "#ec4899"
  },
  {
    title: "InstaSite",
    image: "/InstaSite.png",
    description: "A professional web presence—delivered fast.",
    gradient: "from-blue-500 via-blue-600 to-black",
    accentColor: "bg-blue-500",
    hoverColor: "#3b82f6"
  },
  {
    title: "LaunchPad",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
    description: "A full website solution for businesses ready to grow.",
    gradient: "from-orange-500 via-amber-600 to-black",
    accentColor: "bg-orange-500",
    hoverColor: "#f97316"
  },
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Comprehensive strategies for online presence and customer acquisition.",
    gradient: "from-blue-600 via-blue-700 to-black",
    accentColor: "bg-brand-blue",
    hoverColor: "#0000FF"
  },
  {
    title: "Social Media Marketing",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
    description: "Engaging content and community management for brand growth.",
    gradient: "from-blue-600 via-blue-700 to-black",
    accentColor: "bg-brand-blue",
    hoverColor: "#0000FF"
  }
];

export const Services: React.FC<ServicesProps> = ({ onEventLabClick, onInstaSiteClick, onLaunchPadClick }) => {
  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-white texture-gradient-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Web Development</h2>
          <div className="h-[1px] w-24 bg-brand-blue mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <div
              key={index}
              onClick={service.title === 'Event Lab' ? onEventLabClick : service.title === 'InstaSite' ? onInstaSiteClick : service.title === 'LaunchPad' ? onLaunchPadClick : undefined}
              className={`relative aspect-[4/5] group overflow-hidden cursor-pointer rounded-2xl ${index >= 3 ? 'lg:col-span-1' : ''}`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
              />
              {/* Subtle gradient for text readability — stronger on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 md:from-black/80 md:via-black/20 md:to-transparent"></div>
              {/* Colored overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-0 group-hover:opacity-30 smooth-transition`}></div>

              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                {/* Accent line */}
                <div className={`w-12 h-1 ${service.accentColor} mb-4 transform origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 smooth-transition`}></div>
                <h3 className="text-3xl font-heading font-bold mb-4 smooth-transition">
                  <span className="text-white md:group-hover:hidden">{service.title}</span>
                  <span className="hidden md:group-hover:inline" style={{ color: service.hoverColor }}>{service.title}</span>
                </h3>
                <p className="text-white text-sm leading-relaxed mb-8 opacity-100 md:text-white/80 md:opacity-0 md:group-hover:opacity-100 smooth-transition">
                  {service.description}
                </p>
                <button className={`self-start px-6 py-3 ${service.accentColor} text-white text-[10px] font-bold uppercase tracking-widest rounded-full translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 smooth-transition`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

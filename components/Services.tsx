
import React from 'react';

interface ServiceItem {
  title: string;
  image: string;
  description: string;
  gradient: string;
  accentColor: string;
  hoverColor: string;
  action: 'navigate' | 'mailto';
  route?: string;
  mailSubject?: string;
}

interface ServiceCategory {
  id: string;
  heading: string;
  subtitle: string;
  services: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "web-development",
    heading: "Web Development",
    subtitle: "Precision-built digital properties engineered for your goals.",
    services: [
      {
        title: "Event Lab",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        description: "High-impact event websites that inform, engage, and convert.",
        gradient: "from-pink-500 via-purple-500 to-purple-700",
        accentColor: "bg-pink-500",
        hoverColor: "#ec4899",
        action: "navigate",
        route: "eventlab"
      },
      {
        title: "InstaSite",
        image: "/InstaSite.png",
        description: "A professional web presence—delivered fast.",
        gradient: "from-blue-500 via-blue-600 to-black",
        accentColor: "bg-blue-500",
        hoverColor: "#3b82f6",
        action: "navigate",
        route: "instasite"
      },
      {
        title: "LaunchPad",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
        description: "A full website solution for businesses ready to grow.",
        gradient: "from-orange-500 via-amber-600 to-black",
        accentColor: "bg-orange-500",
        hoverColor: "#f97316",
        action: "navigate",
        route: "launchpad"
      }
    ]
  },
  {
    id: "digital-marketing",
    heading: "Digital Marketing",
    subtitle: "Strategic campaigns that drive visibility, engagement, and growth.",
    services: [
      {
        title: "Digital Strategy & Campaign Planning",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        description: "Comprehensive strategies for online presence and customer acquisition.",
        gradient: "from-emerald-600 via-teal-600 to-black",
        accentColor: "bg-emerald-500",
        hoverColor: "#10b981",
        action: "mailto",
        mailSubject: "Inquiry about Digital Strategy & Campaign Planning"
      },
      {
        title: "Social Media & Content Marketing",
        image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
        description: "Engaging content and community management for brand growth.",
        gradient: "from-teal-500 via-teal-600 to-black",
        accentColor: "bg-teal-500",
        hoverColor: "#14b8a6",
        action: "mailto",
        mailSubject: "Inquiry about Social Media & Content Marketing"
      },
      {
        title: "Email & CRM-Based Marketing",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&q=80&w=800",
        description: "Nurture leads and retain customers with precision email and CRM campaigns.",
        gradient: "from-green-600 via-emerald-600 to-black",
        accentColor: "bg-green-500",
        hoverColor: "#22c55e",
        action: "mailto",
        mailSubject: "Inquiry about Email & CRM-Based Marketing"
      }
    ]
  },
  {
    id: "digital-consultancy",
    heading: "Digital Consultancy",
    subtitle: "Hands-on guidance for leaders navigating the digital landscape.",
    services: [
      {
        title: "Digital Transformation",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        description: "End-to-end guidance for organizations embracing digital at every level.",
        gradient: "from-purple-600 via-violet-600 to-black",
        accentColor: "bg-purple-500",
        hoverColor: "#a855f7",
        action: "mailto",
        mailSubject: "Inquiry about Digital Transformation"
      },
      {
        title: "One-on-One Coaching",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        description: "Personalized sessions to sharpen your digital strategy and execution.",
        gradient: "from-violet-500 via-violet-600 to-black",
        accentColor: "bg-violet-500",
        hoverColor: "#8b5cf6",
        action: "mailto",
        mailSubject: "Inquiry about One-on-One Coaching"
      },
      {
        title: "Speaking Engagements",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
        description: "Keynotes and talks on digital strategy, innovation, and doing digital better.",
        gradient: "from-fuchsia-500 via-purple-600 to-black",
        accentColor: "bg-fuchsia-500",
        hoverColor: "#d946ef",
        action: "mailto",
        mailSubject: "Inquiry about Speaking Engagements"
      },
      {
        title: "Podcast Appearances",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
        description: "Insights on digital marketing, entrepreneurship, and building with intention.",
        gradient: "from-pink-600 via-fuchsia-600 to-black",
        accentColor: "bg-pink-600",
        hoverColor: "#db2777",
        action: "mailto",
        mailSubject: "Inquiry about Podcast Appearances"
      }
    ]
  }
];

interface ServicesProps {
  onNavigate: (route: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {

  const handleCardClick = (service: ServiceItem) => {
    if (service.action === 'navigate' && service.route) {
      onNavigate(service.route);
    } else if (service.action === 'mailto') {
      window.location.href = `mailto:hello@dfbdigital.com?subject=${encodeURIComponent(service.mailSubject || 'Service Inquiry')}`;
    }
  };

  return (
    <section id="services">
      {serviceCategories.map((category, catIndex) => (
        <div
          key={category.id}
          className={`py-32 px-6 lg:px-12 ${
            catIndex % 2 === 0
              ? 'bg-white texture-gradient-light'
              : 'bg-brand-black texture-noise texture-gradient-dark'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Category Header */}
            <div className="text-center mb-24">
              <p className={`text-sm font-medium tracking-widest uppercase mb-4 ${
                catIndex % 2 === 0 ? 'text-black/40' : 'text-white/40'
              }`}>
                {category.subtitle}
              </p>
              <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-6 ${
                catIndex % 2 === 0 ? 'text-brand-black' : 'text-white'
              }`}>
                {category.heading}
              </h2>
              <div className="h-[1px] w-24 bg-brand-blue mx-auto"></div>
            </div>

            {/* Service Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${
              category.services.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
            } gap-8`}>
              {category.services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(service)}
                  className="relative aspect-[4/5] group overflow-hidden cursor-pointer rounded-2xl"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                  />
                  {/* Gradient overlay — stronger on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 md:from-black/80 md:via-black/20 md:to-transparent"></div>
                  {/* Colored overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-0 group-hover:opacity-30 smooth-transition`}></div>

                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    {/* Accent line */}
                    <div className={`w-12 h-1 ${service.accentColor} mb-4 transform origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 smooth-transition`}></div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 smooth-transition">
                      <span className="text-white md:group-hover:hidden">{service.title}</span>
                      <span className="hidden md:group-hover:inline" style={{ color: service.hoverColor }}>{service.title}</span>
                    </h3>
                    <p className="text-white text-sm leading-relaxed mb-8 opacity-100 md:text-white/80 md:opacity-0 md:group-hover:opacity-100 smooth-transition">
                      {service.description}
                    </p>
                    <button className={`self-start px-6 py-3 ${service.accentColor} text-white text-[10px] font-bold uppercase tracking-widest rounded-full translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 smooth-transition`}>
                      {service.action === 'navigate' ? 'Learn More' : 'Inquire'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

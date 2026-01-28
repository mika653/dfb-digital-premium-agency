
import React from 'react';

const serviceList = [
  {
    title: "Event Lab",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    description: "Operational infrastructure for high-stakes environments."
  },
  {
    title: "InstaSite",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
    description: "Precision-engineered digital properties for instant credibility."
  },
  {
    title: "LaunchPad",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
    description: "Systematic framework for new initiative market entry."
  },
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Comprehensive strategies for online presence and customer acquisition."
  },
  {
    title: "Social Media Marketing",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
    description: "Engaging content and community management for brand growth."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Web Development</h2>
          <div className="h-[1px] w-24 bg-brand-blue mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <div 
              key={index} 
              className={`relative aspect-[4/5] group overflow-hidden cursor-pointer bg-brand-black rounded-xl ${index >= 3 ? 'lg:col-span-1' : ''}`}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:rotate-1 smooth-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-heading font-bold mb-4 text-white group-hover:text-brand-blue smooth-transition">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 smooth-transition">
                  {service.description}
                </p>
                <button className="self-start px-6 py-3 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
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

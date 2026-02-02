
import React from 'react';

const testimonials = [
  {
    name: "Isla",
    role: "CEO, Luxury Retail",
    content: "The approach was simple and focused. No jargon, just a clear roadmap to the Ins and outs of digital marketing alongside our clients.",
    image: "https://i.pravatar.cc/150?u=isla"
  },
  {
    name: "Mason",
    role: "Founder, Fintech Group",
    content: "Every business is different. DFB conceptualizes strategies tailor-made for your specific and evolving needs.",
    image: "https://i.pravatar.cc/150?u=mason"
  },
  {
    name: "Jonah",
    role: "Director, Global Logistics",
    content: "Clear, easy-to-understand updates and direct access to the team handling your digital work. Feeling like you're never in the dark.",
    image: "https://i.pravatar.cc/150?u=jonah"
  }
];

export const Reviews: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-white texture-gradient-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-heading font-bold mb-20">Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-10 bg-brand-black text-white rounded-2xl flex flex-col items-center text-center group hover:-translate-y-2 smooth-transition shadow-2xl shadow-black/20">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-8 border-4 border-white/10 group-hover:border-brand-blue smooth-transition">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-heading font-bold mb-2">{t.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#bdffcf] font-bold mb-6">{t.role}</p>
              <p className="text-white/60 text-sm leading-relaxed italic">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

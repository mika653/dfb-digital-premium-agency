
import React from 'react';

const clients = [
  { name: "Professor Derek Burton Collins", link: "thederekcollins.com" },
  { name: "Dante Alighieri Society, Hong Kong", link: "https://ladante.cc/" },
  { name: "Casa Verde Townhomes", link: "https://www.casaverdetownhomes.net/home" },
  { name: "Aldeon Luxury Suites", link: "https://aldeonluxurysuites.com/" }
];

export const ClientRoster: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-black text-white texture-noise texture-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-20">Client Roster</h2>
        
        <div className="space-y-px bg-white/10">
          {clients.map((client, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 py-10 border-b border-white/5 items-center group">
              <div className="text-lg md:text-xl font-heading font-bold group-hover:text-brand-blue smooth-transition">
                {client.name}
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  {client.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

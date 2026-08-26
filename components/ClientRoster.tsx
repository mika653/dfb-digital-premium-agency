
import React from 'react';
import { Reveal } from './Reveal';

const clients = [
  {
    name: "Professor Derek Burton Collins",
    link: "thederekcollins.com",
    blurb: "Website design, newsletter setup, and social media strategy — 200% growth in Instagram followers."
  },
  {
    name: "Dante Alighieri Society, Hong Kong",
    link: "https://ladante.cc/",
    blurb: "Building a custom CMS-powered website for faster, easier content management."
  },
  {
    name: "Casa Verde Townhomes",
    link: "https://casaverdetownhomes.net",
    blurb: "Full website design and development."
  },
  {
    name: "Aldeon Luxury Suites",
    link: "https://aldeonluxurysuites.com/",
    blurb: "Custom website design and development."
  }
];

export const ClientRoster: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-brand-black text-white texture-noise texture-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-20">Client Roster</h2>
        </Reveal>

        <div className="rounded-2xl overflow-hidden border border-white/10">
          {clients.map((client, idx) => (
            <Reveal key={idx} delayMs={idx * 60}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-8 items-start group hover:bg-white/5 smooth-transition${idx < clients.length - 1 ? ' border-b border-white/5' : ''}`}>
                <div>
                  <div className="text-lg md:text-xl font-heading font-bold group-hover:text-[#bdffcf] smooth-transition mb-2">
                    {client.name}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed max-w-md">
                    {client.blurb}
                  </p>
                </div>
                <div className="md:text-right">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    {client.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

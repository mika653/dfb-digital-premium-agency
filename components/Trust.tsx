
import React from 'react';
import { Reveal } from './Reveal';

export const Trust: React.FC = () => {
  return (
    <section id="approach" className="pt-32 pb-40 px-6 lg:px-12 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.4em] font-semibold text-black/60 mb-8">Trusted by Established Leadership</h2>
          <div className="h-[1px] w-24 bg-brand-blue mx-auto"></div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <Reveal delayMs={0} className="text-center">
            <div className="text-6xl font-heading font-bold mb-6">12+</div>
            <p className="text-xs uppercase tracking-widest font-bold text-black/60 mb-4">Years of Hands-On Experience</p>
            <p className="text-base text-black/60 leading-relaxed px-4">
              Direct, senior-level involvement on every engagement — not handed off to a junior team.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="text-center">
            <div className="text-6xl font-heading font-bold mb-6 text-brand-blue">150+</div>
            <p className="text-xs uppercase tracking-widest font-bold text-black/60 mb-4">Strategic Deployments</p>
            <p className="text-base text-black/60 leading-relaxed px-4">
              Proven methodologies applied across diverse industries, from professional services to luxury events.
            </p>
          </Reveal>

          <Reveal delayMs={200} className="text-center">
            <div className="text-2xl font-heading font-bold mb-6 leading-snug">Boutique<br />by Design</div>
            <p className="text-xs uppercase tracking-widest font-bold text-black/60 mb-4">No Hand-Offs</p>
            <p className="text-base text-black/60 leading-relaxed px-4">
              Every engagement gets direct access to Daddy FunBuckets, Founder — no account managers, no hand-offs.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20 pt-16 border-t border-black/10 text-center">
          <div className="text-6xl font-heading font-bold text-brand-blue mb-4">200%</div>
          <p className="text-black/70 text-base leading-relaxed mb-2 max-w-xl mx-auto">
            Instagram follower growth for Professor Derek Burton Collins, one of our client partners.
          </p>
          <a
            href="https://thederekcollins.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-brand-blue hover:underline"
          >
            thederekcollins.com
          </a>
        </Reveal>
      </div>
    </section>
  );
};

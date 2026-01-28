
import React from 'react';

export const Trust: React.FC = () => {
  return (
    <section id="approach" className="py-32 px-6 lg:px-12 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-sm uppercase tracking-[0.4em] font-semibold text-black/30 mb-8">Trusted by Established Leadership</h2>
          <div className="h-[1px] w-24 bg-brand-blue mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="text-center">
            <div className="text-5xl font-heading font-bold mb-6">20+</div>
            <p className="text-xs uppercase tracking-widest font-bold text-black/40 mb-4">Years Combined Expertise</p>
            <p className="text-sm text-black/60 leading-relaxed px-4">
              Our leadership team understands the nuance of established business structures and offline value.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-heading font-bold mb-6 text-brand-blue">150+</div>
            <p className="text-xs uppercase tracking-widest font-bold text-black/40 mb-4">Strategic Deployments</p>
            <p className="text-sm text-black/60 leading-relaxed px-4">
              Proven methodologies applied across diverse industries, from professional services to luxury events.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-heading font-bold mb-6">∞</div>
            <p className="text-xs uppercase tracking-widest font-bold text-black/40 mb-4">Commitment to Detail</p>
            <p className="text-sm text-black/60 leading-relaxed px-4">
              A boutique approach means every client receives direct access to senior strategic advisors.
            </p>
          </div>
        </div>

        <div className="mt-32 p-12 md:p-20 border border-brand-orange/30 bg-brand-orange/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-light italic text-black/80 leading-relaxed mb-8">
              "DFB Digital doesn't just manage our social media; they've provided a systematic framework for our entire digital expansion. Their calm authority was exactly what we needed to move forward with confidence."
            </p>
            <p className="text-xs uppercase tracking-[0.2em] font-bold">Managing Partner, Private Equity Firm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

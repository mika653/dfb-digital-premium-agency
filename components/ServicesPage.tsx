
import React from 'react';
import { Services } from './Services';
import { FindYourFitPrompt } from './FindYourFitPrompt';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface ServicesPageProps {
  onBack: () => void;
  onNavigate: (route: string) => void;
  onMatchmakerClick?: () => void;
  onBlogClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack, onNavigate, onMatchmakerClick, onBlogClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />

      <div className="pt-20">
        <div className="py-20 px-6 lg:px-12 text-center bg-brand-black texture-noise texture-gradient-dark">
          <p className="text-sm uppercase tracking-widest text-white/50 font-medium mb-6">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            All <span className="text-[#bdffcf]">Services</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Web development, digital marketing, and digital consultancy — built for established businesses who want a plan, not guesswork.
          </p>
        </div>
        <Services onNavigate={onNavigate} />
        <FindYourFitPrompt onMatchmakerClick={onMatchmakerClick} />
      </div>

      <Footer onMatchmakerClick={onMatchmakerClick} onBlogClick={onBlogClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};

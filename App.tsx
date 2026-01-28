
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { ClientRoster } from './components/ClientRoster';
import { WhyDFB } from './components/WhyDFB';
import { CTA } from './components/CTA';
import { ComingSoon } from './components/ComingSoon';
import { Footer } from './components/Footer';
import { Matchmaker } from './components/Matchmaker';
import { CodeRedemption } from './components/CodeRedemption';
import { EventLab } from './components/EventLab';
import { InstaSite } from './components/InstaSite';
import { LaunchPad } from './components/LaunchPad';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'matchmaker' | 'eventlab' | 'instasite' | 'launchpad'>('home');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#matchmaker') {
        setCurrentPage('matchmaker');
      } else if (hash === '#eventlab') {
        setCurrentPage('eventlab');
      } else if (hash === '#instasite') {
        setCurrentPage('instasite');
      } else if (hash === '#launchpad') {
        setCurrentPage('launchpad');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
  };

  const goToMatchmaker = () => {
    window.location.hash = 'matchmaker';
    setCurrentPage('matchmaker');
  };

  const goToEventLab = () => {
    window.location.hash = 'eventlab';
    setCurrentPage('eventlab');
  };

  const goToInstaSite = () => {
    window.location.hash = 'instasite';
    setCurrentPage('instasite');
  };

  const goToLaunchPad = () => {
    window.location.hash = 'launchpad';
    setCurrentPage('launchpad');
  };

  if (currentPage === 'launchpad') {
    return (
      <>
        <LaunchPad onBack={goToHome} />
        <CodeRedemption isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
      </>
    );
  }

  if (currentPage === 'instasite') {
    return (
      <>
        <InstaSite onBack={goToHome} />
        <CodeRedemption isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
      </>
    );
  }

  if (currentPage === 'eventlab') {
    return (
      <>
        <EventLab onBack={goToHome} />
        <CodeRedemption isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
      </>
    );
  }

  if (currentPage === 'matchmaker') {
    return (
      <>
        <Matchmaker onBack={goToHome} />
        <CodeRedemption isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-blue selection:text-white">
      <Navbar onMatchmakerClick={goToMatchmaker} onCodeClick={() => setIsCodeModalOpen(true)} />
      <main>
        <Hero onMatchmakerClick={goToMatchmaker} />
        <About />
        <Services onEventLabClick={goToEventLab} onInstaSiteClick={goToInstaSite} onLaunchPadClick={goToLaunchPad} />
        <WhyDFB />
        <Reviews />
        <ClientRoster />
        <CTA />
        <ComingSoon />
      </main>
      <Footer onCodeClick={() => setIsCodeModalOpen(true)} />

      {/* Floating code redemption button */}
      <button
        onClick={() => setIsCodeModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-brand-blue hover:bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl smooth-transition group"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 smooth-transition">
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
          <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
        </svg>
        <span className="hidden sm:inline">Met DFB in person?</span>
      </button>

      <CodeRedemption isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
    </div>
  );
};

export default App;

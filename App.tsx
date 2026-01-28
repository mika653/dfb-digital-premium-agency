
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { ClientRoster } from './components/ClientRoster';
import { WhyDFB } from './components/WhyDFB';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyDFB />
        <Reviews />
        <ClientRoster />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;

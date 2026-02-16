
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, Phone, Clock, Menu, X, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';

interface InstaSiteStarterProps {
  onBack: () => void;
}

// Constants
const DOCTOR_NAME = "Dr. Maria Santos, MD";
const CLINIC_INFO = {
  name: "St. Luke's Medical Center",
  address: "Room 402, Medical Arts Building, Global City, Taguig",
  phone: "+63 2 8789 7700",
  hours: "Mon - Fri: 9:00 AM - 5:00 PM",
};
const SERVICES = [
  { id: "consultation", title: "General Consultation", description: "Comprehensive medical evaluations for acute and chronic conditions, ensuring tailored treatment plans for every patient." },
  { id: "checkup", title: "Executive Health Check", description: "Preventative screenings and diagnostics designed for busy professionals to maintain peak physical health." },
  { id: "hmo", title: "Insurance Coordination", description: "Seamless processing for all major Filipino HMOs (Maxicare, Intellicare, Medicard) and international insurance." },
];

const ModularBadge: React.FC<{ label?: string }> = ({ label = "Standard Module" }) => (
  <div className="flex items-center mb-4 opacity-40 hover:opacity-100 transition-opacity">
    <span className="insta-badge text-[11px] font-bold text-stone-500 border-stone-300">InstaSite™ {label}</span>
  </div>
);

// --- Page Components ---

const HomePage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => (
  <div className="pb-20">
    <section className="relative bg-stone-50 overflow-hidden py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <ModularBadge label="Hero Section Module" />
            <h1 className="text-4xl lg:text-7xl font-bold text-stone-900 leading-[1.1] mb-6">
              Trusted medical care, built on <span className="italic serif">compassion</span>.
            </h1>
            <p className="text-lg text-stone-500 mb-10 leading-relaxed max-w-xl">
              {DOCTOR_NAME} provides patient-centric internal medicine in Metro Manila. Professional care you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('contact')} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-medium hover:bg-salmon-600 transition-all text-center flex items-center justify-center gap-2 group">
                Contact the Clinic
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('about')} className="bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-full font-medium hover:bg-stone-50 transition-all text-center">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden luxury-shadow">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" alt="Dr. Maria Santos" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/4 h-full bg-salmon-100/20 -skew-x-12 transform translate-x-1/2 hidden lg:block" />
    </section>

    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ModularBadge label="Services Module" />
      <h2 className="text-4xl font-bold mb-12">Medical Services</h2>
      <div className="space-y-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="flex gap-6 items-start p-6 rounded-2xl hover:bg-stone-50 transition-all">
            <div className="w-10 h-10 bg-salmon-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 size={22} className="text-salmon-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-stone-500 leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ModularBadge label="Clinic Info Module" />
        <h2 className="text-4xl font-bold mb-12">Visit Our Clinic</h2>
        <div className="bg-white rounded-3xl p-10 luxury-shadow border border-stone-100 max-w-2xl">
          <h3 className="serif text-2xl font-bold mb-8 text-stone-900">{CLINIC_INFO.name}</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><MapPin size={20} /></div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Location</h4>
                <p className="text-stone-800 font-medium">{CLINIC_INFO.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Clock size={20} /></div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Hours</h4>
                <p className="text-stone-800 font-medium">{CLINIC_INFO.hours}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Phone size={20} /></div>
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Phone</h4>
                <p className="text-stone-800 font-medium">{CLINIC_INFO.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-to-br from-salmon-600 to-salmon-800 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to book your visit?</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Get in touch with our clinic today. We're here to help with your healthcare needs.</p>
        <button onClick={() => navigate('contact')} className="bg-white text-salmon-700 px-10 py-5 rounded-full font-bold hover:bg-salmon-50 transition-all inline-block">
          Contact the Clinic
        </button>
      </div>
    </section>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <ModularBadge label="Professional Profile Module" />
    <h1 className="text-3xl sm:text-5xl font-bold mb-10">About Dr. Santos</h1>
    <div className="prose prose-stone lg:prose-xl">
      <p className="text-xl text-stone-600 leading-relaxed mb-8">
        Dr. Maria Santos, MD, FCP, is a board-certified Internist dedicated to providing exceptional medical care for the Filipino community.
        With a focus on preventative healthcare and chronic disease management, she combines her clinical expertise with a compassionate bedside manner.
      </p>
      <h3 className="text-2xl font-bold mb-4">Education & Training</h3>
      <ul className="space-y-4 text-stone-600 mb-10">
        <li className="flex gap-4 items-start">
          <span className="font-bold text-salmon-600">2010</span>
          <span>Residency in Internal Medicine, Makati Medical Center</span>
        </li>
        <li className="flex gap-4 items-start">
          <span className="font-bold text-salmon-600">2007</span>
          <span>Doctor of Medicine, University of Santo Tomas</span>
        </li>
      </ul>
      <h3 className="text-2xl font-bold mb-4">Professional Philosophy</h3>
      <p className="text-stone-600 leading-relaxed italic">
        "I believe that the best medicine is a partnership. My goal is to listen deeply, diagnose accurately, and work together with patients to build a sustainable path to health."
      </p>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-salmon-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-salmon-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Message Sent</h2>
          <p className="text-stone-500 max-w-sm mx-auto">Thank you, {name}. We'll get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ModularBadge label="Contact Module" />
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">Get in Touch</h1>
      <p className="text-xl text-stone-500 mb-16 max-w-2xl">Have a question or want to schedule a visit? Fill out the form below and our team will respond promptly.</p>
      <div className="grid md:grid-cols-3 gap-16">
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl luxury-shadow p-10 border border-stone-100">
            <div className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input type="tel" placeholder="Mobile Number (+63)" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-stone-400" size={18} />
                <textarea rows={4} placeholder="Your message" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" />
              </div>
              <p className="text-xs text-stone-400">By submitting, you agree to our data privacy policy in compliance with the Philippines Data Privacy Act of 2012.</p>
              <button onClick={() => setSubmitted(true)} disabled={!name} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-bold hover:bg-salmon-600 disabled:opacity-30 transition-all w-full">
                Send Message
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><MapPin size={20} /></div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Address</h4>
              <p className="text-stone-800 font-medium text-sm">{CLINIC_INFO.address}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Phone size={20} /></div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Phone</h4>
              <p className="text-stone-800 font-medium text-sm">{CLINIC_INFO.phone}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Clock size={20} /></div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Hours</h4>
              <p className="text-stone-800 font-medium text-sm">{CLINIC_INFO.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export const InstaSiteStarter: React.FC<InstaSiteStarterProps> = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-salmon-100 selection:text-salmon-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Back to DFB Banner */}
      <div className="bg-brand-black text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <button onClick={onBack} className="hover:text-cyan-400 transition-colors">
          ← Back to DFB Digital
        </button>
        <span className="mx-3 text-white/30">|</span>
        <span className="text-white/60">InstaSite™ Starter Demo</span>
      </div>

      {/* Navbar */}
      <NavbarComponent currentPage={currentPage} navigate={navigate} navLinks={navLinks} />

      {/* Main Content */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="serif text-xl font-bold mb-2">{DOCTOR_NAME}</h2>
          <p className="text-stone-400 text-sm mb-6">Consultant Physician | Internal Medicine</p>
          <div className="flex justify-center gap-4 mb-6">
            <span className="text-[11px] font-bold text-stone-400 border border-stone-300 px-2 py-1 rounded">InstaSite™ Starter</span>
          </div>
          <p className="text-xs text-stone-400">© 2024 InstaSite™ Platform. All rights reserved. Powered by InstaSite™</p>
        </div>
      </footer>
    </div>
  );
};

const NavbarComponent: React.FC<{
  currentPage: string;
  navigate: (page: string) => void;
  navLinks: { name: string; page: string }[];
}> = ({ currentPage, navigate, navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <button onClick={() => navigate('home')} className="flex flex-col text-left">
            <span className="serif text-xl font-bold text-stone-900 tracking-tight">InstaSite™ Starter</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400 -mt-1 font-medium">Professional Presence</span>
          </button>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => navigate(link.page)} className={`text-sm font-medium transition-colors ${currentPage === link.page ? 'text-salmon-600' : 'text-stone-500 hover:text-salmon-600'}`}>
                {link.name}
              </button>
            ))}
            <button onClick={() => navigate('contact')} className="bg-salmon-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-salmon-600 transition-all flex items-center gap-2">
              <Phone size={16} /> Contact Us
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-500">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 p-4 space-y-4">
          {navLinks.map((link) => (
            <button key={link.page} onClick={() => { navigate(link.page); setIsOpen(false); }} className="block text-base font-medium text-stone-600 hover:text-stone-900 w-full text-left">
              {link.name}
            </button>
          ))}
          <button onClick={() => { navigate('contact'); setIsOpen(false); }} className="block bg-salmon-500 text-white text-center py-3 rounded-xl font-medium w-full">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

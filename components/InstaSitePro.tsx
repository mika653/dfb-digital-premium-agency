
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, Phone, Clock, Menu, X, Calendar, Shield, Award, Users, User, Mail, MessageSquare, CheckCircle, ChevronDown, Stethoscope, ClipboardCheck, ShieldCheck, CreditCard } from 'lucide-react';

interface InstaSiteProProps {
  onBack: () => void;
}

// Constants
const DOCTOR_NAME = "Dr. Maria Santos, MD";
const DOCTOR_TITLE = "Consultant Physician | Internal Medicine";
const CLINIC_LOCATIONS = [
  { name: "St. Luke's Medical Center", address: "Room 402, Medical Arts Building, Global City, Taguig", phone: "+63 2 8789 7700", hours: "Mon - Wed: 10:00 AM - 4:00 PM", affiliations: ["St. Luke's Global City", "The Medical City"] },
  { name: "Makati Medical Center", address: "Room 515, Tower 1, Amorsolo St., Makati City", phone: "+63 2 8888 8999", hours: "Thu - Sat: 9:00 AM - 1:00 PM", affiliations: ["Makati Medical Center"] },
];
const SERVICES = [
  { id: "consultation", title: "General Consultation", description: "Comprehensive medical evaluations for acute and chronic conditions, ensuring tailored treatment plans for every patient.", icon: "Stethoscope" },
  { id: "checkup", title: "Executive Health Check", description: "Preventative screenings and diagnostics designed for busy professionals to maintain peak physical health.", icon: "ClipboardCheck" },
  { id: "hmo", title: "Insurance Coordination", description: "Seamless processing for all major Filipino HMOs (Maxicare, Intellicare, Medicard) and international insurance.", icon: "ShieldCheck" },
];
const FAQS = [
  { question: "Do you accept walk-in patients?", answer: "While we prioritize scheduled appointments, we do accommodate walk-ins at our Makati clinic based on availability. For St. Luke's, strictly by appointment." },
  { question: "Which HMOs are you accredited with?", answer: "We are currently accredited with Maxicare, Intellicare, Medicard, PhilCare, and Etiqa. Please bring your physical card or LOA." },
  { question: "How do I prepare for my first consultation?", answer: "Please bring any previous laboratory results from the last 6 months, a list of current medications, and your HMO card if applicable." },
  { question: "Do you offer teleconsultation?", answer: "Yes, we offer online teleconsultation via video call for follow-up appointments and non-emergency consultations. Book through our contact form." },
];

const ModularBadge: React.FC<{ label?: string }> = ({ label = "Standard Module" }) => (
  <div className="flex items-center mb-4 opacity-40 hover:opacity-100 transition-opacity">
    <span className="insta-badge text-[11px] font-bold text-stone-500 border-stone-300">InstaSite™ {label}</span>
  </div>
);

const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={28} className="text-salmon-500 group-hover:text-white transition-colors" />,
  ClipboardCheck: <ClipboardCheck size={28} className="text-salmon-500 group-hover:text-white transition-colors" />,
  ShieldCheck: <ShieldCheck size={28} className="text-salmon-500 group-hover:text-white transition-colors" />,
};

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
              {DOCTOR_NAME} provides patient-centric internal medicine across Metro Manila. Professional care designed to convert trust into lasting wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-medium hover:bg-salmon-600 transition-all text-center flex items-center justify-center gap-2 group">
                Book an Appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('services')} className="bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-full font-medium hover:bg-stone-50 transition-all text-center">
                View Services
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block group">
            <div className="absolute -inset-4 bg-salmon-200/40 rounded-[3rem] -rotate-2 scale-95 group-hover:rotate-0 group-hover:scale-100 transition-transform duration-700" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden luxury-shadow">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" alt="Dr. Maria Santos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-salmon-500 text-white p-4 rounded-2xl shadow-lg">
              <p className="text-sm font-bold">Accepting New Patients</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/4 h-full bg-salmon-100/20 -skew-x-12 transform translate-x-1/2 hidden lg:block" />
    </section>

    <section className="py-12 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3"><Shield size={24} className="text-salmon-400" /><span className="text-sm font-medium text-stone-600">Board Certified</span></div>
          <div className="flex items-center gap-3"><Award size={24} className="text-salmon-400" /><span className="text-sm font-medium text-stone-600">15+ Years Practice</span></div>
          <div className="flex items-center gap-3"><Users size={24} className="text-salmon-400" /><span className="text-sm font-medium text-stone-600">5,000+ Patients</span></div>
          <div className="flex items-center gap-3"><CheckCircle2 size={24} className="text-salmon-400" /><span className="text-sm font-medium text-stone-600">HMO Accredited</span></div>
        </div>
      </div>
    </section>

    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ModularBadge label="Doctor Intro Module" />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Meet Your Physician</h2>
          <p className="text-stone-500 leading-relaxed mb-4">{DOCTOR_NAME} is a board-certified Internist dedicated to providing exceptional medical care for the Filipino community. With a focus on preventative healthcare and chronic disease management, she combines clinical expertise with genuine compassion.</p>
          <p className="text-stone-500 leading-relaxed mb-8">{DOCTOR_TITLE}</p>
          <button onClick={() => navigate('about')} className="text-salmon-600 font-medium hover:text-salmon-700 transition-colors inline-flex items-center gap-2">
            Read full profile <ArrowRight size={16} />
          </button>
        </div>
        <div className="relative">
          <div className="bg-stone-200 rounded-3xl aspect-[4/5] overflow-hidden">
            <img src="https://picsum.photos/seed/doctor/600/750" alt={DOCTOR_NAME} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-salmon-500 text-white p-4 rounded-2xl shadow-lg">
            <p className="text-sm font-bold">Accepting New Patients</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ModularBadge label="Services Module" />
        <h2 className="text-4xl font-bold mb-4">Medical Services</h2>
        <p className="text-stone-500 mb-12 max-w-xl">Comprehensive healthcare solutions tailored for your needs.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-8 border border-stone-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-salmon-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-salmon-500 transition-colors">
                <CheckCircle2 size={24} className="text-salmon-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => navigate('services')} className="text-salmon-600 font-medium hover:text-salmon-700 transition-colors inline-flex items-center gap-2">
            View all services <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-to-br from-salmon-600 to-salmon-800 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to book your visit?</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Schedule an appointment online today. We accept major HMOs and are ready to help with your healthcare needs.</p>
        <button onClick={() => navigate('book')} className="bg-white text-salmon-700 px-10 py-5 rounded-full font-bold hover:bg-salmon-50 transition-all inline-block">
          Book Appointment
        </button>
      </div>
    </section>
  </div>
);

const AboutPage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => (
  <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <ModularBadge label="Professional Profile Module" />
    <h1 className="text-3xl sm:text-5xl font-bold mb-10">About Dr. Santos</h1>
    <div className="prose prose-stone lg:prose-xl">
      <p className="text-xl text-stone-600 leading-relaxed mb-8">Dr. Maria Santos, MD, FCP, is a board-certified Internist dedicated to providing exceptional medical care for the Filipino community. With a focus on preventative healthcare and chronic disease management, she combines her clinical expertise with a compassionate bedside manner.</p>
      <p className="text-stone-600 leading-relaxed mb-10">Her practice spans two premier hospitals in Metro Manila, serving over 5,000 patients. She is committed to delivering evidence-based medicine while embracing a holistic approach to patient wellness.</p>
      <h3 className="text-2xl font-bold mb-4">Education & Training</h3>
      <ul className="space-y-4 text-stone-600 mb-10">
        <li className="flex gap-4 items-start"><span className="font-bold text-salmon-600">2010</span><span>Residency in Internal Medicine, Makati Medical Center</span></li>
        <li className="flex gap-4 items-start"><span className="font-bold text-salmon-600">2007</span><span>Doctor of Medicine, University of Santo Tomas</span></li>
        <li className="flex gap-4 items-start"><span className="font-bold text-salmon-600">2003</span><span>BS Biology, University of the Philippines - Manila</span></li>
      </ul>
      <h3 className="text-2xl font-bold mb-4">Professional Affiliations</h3>
      <ul className="space-y-3 text-stone-600 mb-10">
        <li>Fellow, Philippine College of Physicians (FCP)</li>
        <li>Member, Philippine Society of Internal Medicine</li>
        <li>Active Staff, St. Luke's Medical Center Global City</li>
        <li>Active Staff, Makati Medical Center</li>
      </ul>
      <h3 className="text-2xl font-bold mb-4">Professional Philosophy</h3>
      <p className="text-stone-600 leading-relaxed italic mb-10">"I believe that the best medicine is a partnership. My goal is to listen deeply, diagnose accurately, and work together with patients to build a sustainable path to health."</p>
      <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-medium hover:bg-salmon-600 transition-all inline-flex items-center gap-2 group">
        Book a Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const ServicesPage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => (
  <div className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ModularBadge label="Services Module" />
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">Medical Services</h1>
      <p className="text-xl text-stone-500 mb-16 max-w-2xl">Comprehensive healthcare solutions from general consultations to specialized diagnostics, all delivered with a patient-first approach.</p>
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-white rounded-3xl p-10 border border-stone-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-salmon-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-salmon-500 transition-colors">
              {iconMap[service.icon] || <CheckCircle2 size={28} className="text-salmon-500 group-hover:text-white transition-colors" />}
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-stone-500 leading-relaxed mb-6">{service.description}</p>
            <button onClick={() => navigate('book')} className="text-salmon-600 font-medium text-sm hover:text-salmon-700 transition-colors inline-flex items-center gap-1">
              Book this service <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-stone-50 rounded-3xl p-10 lg:p-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">What to Expect</h2>
          <div className="space-y-6 text-stone-600">
            <div className="flex gap-4 items-start"><CheckCircle2 size={20} className="text-salmon-500 flex-shrink-0 mt-1" /><p>Initial consultations typically last 30-45 minutes, allowing for thorough assessment.</p></div>
            <div className="flex gap-4 items-start"><CheckCircle2 size={20} className="text-salmon-500 flex-shrink-0 mt-1" /><p>All major HMOs are accepted. Please bring your card and any Letter of Authorization.</p></div>
            <div className="flex gap-4 items-start"><CheckCircle2 size={20} className="text-salmon-500 flex-shrink-0 mt-1" /><p>Follow-up teleconsultations are available for established patients.</p></div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Need a consultation?</h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">Schedule an appointment at either of our clinic locations.</p>
        <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-medium hover:bg-salmon-600 transition-all inline-flex items-center gap-2 group">
          Book an Appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

const ClinicsPage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => (
  <div className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ModularBadge label="Clinics Module" />
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">Clinic Locations</h1>
      <p className="text-xl text-stone-500 mb-16 max-w-2xl">Visit us at two convenient locations in Metro Manila. Both clinics are equipped with modern diagnostic facilities.</p>
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {CLINIC_LOCATIONS.map((clinic, index) => (
          <div key={index} className="bg-white rounded-3xl p-10 border border-stone-100 luxury-shadow">
            <h3 className="serif text-2xl font-bold mb-8 text-stone-900">{clinic.name}</h3>
            <div className="space-y-6">
              <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><MapPin size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Address</h4><p className="text-stone-800 font-medium text-sm">{clinic.address}</p></div></div>
              <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Phone size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Phone</h4><p className="text-stone-800 font-medium text-sm">{clinic.phone}</p></div></div>
              <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Clock size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Hours</h4><p className="text-stone-800 font-medium text-sm">{clinic.hours}</p></div></div>
              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-3">Affiliations</h4>
                <div className="flex flex-wrap gap-2">
                  {clinic.affiliations.map((aff, i) => (<span key={i} className="text-xs font-medium bg-salmon-50 text-salmon-700 px-3 py-1 rounded-full">{aff}</span>))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-stone-50 rounded-3xl p-10 lg:p-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6"><ShieldCheck size={24} className="text-salmon-500" /><h2 className="text-2xl font-bold">Accepted HMOs</h2></div>
            <div className="grid grid-cols-2 gap-3">
              {['Maxicare', 'Intellicare', 'Medicard', 'PhilCare', 'Etiqa', 'Pacific Cross'].map((hmo) => (
                <div key={hmo} className="bg-white rounded-xl p-4 border border-stone-100 text-center"><span className="text-sm font-medium text-stone-700">{hmo}</span></div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6"><CreditCard size={24} className="text-salmon-500" /><h2 className="text-2xl font-bold">Payment Options</h2></div>
            <div className="space-y-4 text-stone-600">
              <p className="text-sm leading-relaxed">We accept cash, credit/debit cards, GCash, Maya, and bank transfers. For HMO patients, please present your card and LOA at the clinic.</p>
              <p className="text-sm leading-relaxed">Self-pay patients may request a receipt for reimbursement from their insurance provider.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center">
        <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-medium hover:bg-salmon-600 transition-all inline-flex items-center gap-2">Book at a Location</button>
      </div>
    </div>
  </div>
);

const ResourcesPage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ModularBadge label="Resources Module" />
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">Patient Resources</h1>
        <p className="text-xl text-stone-500 mb-16 max-w-2xl">Find answers to common questions about our practice, appointments, and policies.</p>
        <div className="space-y-4 mb-20">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-stone-100 overflow-hidden transition-all">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-stone-900 pr-4">{faq.question}</span>
                <ChevronDown size={20} className={`text-salmon-500 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (<div className="px-6 pb-6"><p className="text-stone-500 leading-relaxed">{faq.answer}</p></div>)}
            </div>
          ))}
        </div>
        <div className="bg-stone-50 rounded-3xl p-10">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Book an Appointment', page: 'book' },
              { label: 'Clinic Locations', page: 'clinics' },
              { label: 'Our Services', page: 'services' },
              { label: 'About Dr. Santos', page: 'about' },
            ].map((link) => (
              <button key={link.page} onClick={() => navigate(link.page)} className="flex items-center justify-between bg-white rounded-xl p-5 border border-stone-100 hover:shadow-md transition-all group text-left w-full">
                <span className="font-medium text-stone-700">{link.label}</span>
                <ArrowRight size={16} className="text-salmon-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(0);

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-salmon-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-salmon-500" /></div>
          <h2 className="text-3xl font-bold mb-2">Appointment Requested</h2>
          <p className="text-stone-500 max-w-sm mx-auto">Thank you, {name}. We'll confirm your appointment at {CLINIC_LOCATIONS[selectedClinic].name} shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="bg-gradient-to-br from-salmon-600 to-salmon-700 text-white py-16 -mt-20 pt-36 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModularBadge label="Booking Module" />
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-white/80 text-lg max-w-xl">Fill out the form below and our staff will confirm your appointment within 24 hours.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl luxury-shadow p-10 border border-stone-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-3">Select Clinic</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CLINIC_LOCATIONS.map((clinic, index) => (
                      <button key={index} onClick={() => setSelectedClinic(index)} className={`text-left p-4 rounded-xl border-2 transition-all ${selectedClinic === index ? 'border-salmon-500 bg-salmon-50' : 'border-stone-200 hover:border-stone-300'}`}>
                        <p className="font-semibold text-sm">{clinic.name}</p>
                        <p className="text-xs text-stone-400 mt-1">{clinic.hours}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" /></div>
                <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input type="tel" placeholder="Mobile Number (+63)" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" /></div>
                <div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} /><input type="date" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" /></div>
                <div className="relative"><MessageSquare className="absolute left-4 top-6 text-stone-400" size={18} /><textarea rows={3} placeholder="Reason for visit / additional notes" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" /></div>
                <p className="text-xs text-stone-400">By submitting, you agree to our data privacy policy in compliance with the Philippines Data Privacy Act of 2012.</p>
                <button onClick={() => setSubmitted(true)} disabled={!name} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-bold hover:bg-salmon-600 disabled:opacity-30 transition-all w-full">Request Appointment</button>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {CLINIC_LOCATIONS.map((clinic, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-bold text-stone-900">{clinic.name}</h3>
                <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><MapPin size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Address</h4><p className="text-stone-800 font-medium text-sm">{clinic.address}</p></div></div>
                <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Phone size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Phone</h4><p className="text-stone-800 font-medium text-sm">{clinic.phone}</p></div></div>
                <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Clock size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-1">Hours</h4><p className="text-stone-800 font-medium text-sm">{clinic.hours}</p></div></div>
                {index < CLINIC_LOCATIONS.length - 1 && <hr className="border-stone-100 mt-6" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export const InstaSitePro: React.FC<InstaSiteProProps> = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Services', page: 'services' },
    { name: 'Clinics', page: 'clinics' },
    { name: 'Resources', page: 'resources' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <AboutPage navigate={navigate} />;
      case 'services': return <ServicesPage navigate={navigate} />;
      case 'clinics': return <ClinicsPage navigate={navigate} />;
      case 'resources': return <ResourcesPage navigate={navigate} />;
      case 'book': return <BookingPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-salmon-100 selection:text-salmon-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Back to DFB Banner */}
      <div className="bg-brand-black text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <button onClick={onBack} className="hover:text-cyan-400 transition-colors">← Back to DFB Digital</button>
        <span className="mx-3 text-white/30">|</span>
        <span className="text-white/60">InstaSite™ Pro Demo</span>
      </div>

      {/* Navbar */}
      <NavbarComponent currentPage={currentPage} navigate={navigate} navLinks={navLinks} />

      {/* Main Content */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="serif text-2xl font-bold mb-4">{DOCTOR_NAME}</h2>
              <p className="text-stone-500 max-w-sm text-sm leading-relaxed mb-6">Providing premium medical care with a focus on trust, transparency, and patient comfort.</p>
              <div className="flex space-x-4">
                <span className="text-[11px] font-bold text-stone-400 border border-stone-300 px-2 py-1 rounded">InstaSite™ Pro</span>
                <span className="text-[11px] font-bold text-stone-400 border border-stone-300 px-2 py-1 rounded">CONVERSION READY</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Practice</h3>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><button onClick={() => navigate('about')} className="hover:text-stone-900">Professional Bio</button></li>
                <li><button onClick={() => navigate('services')} className="hover:text-stone-900">Medical Services</button></li>
                <li><button onClick={() => navigate('clinics')} className="hover:text-stone-900">Clinic Locations</button></li>
                <li><button onClick={() => navigate('resources')} className="hover:text-stone-900">Patient Resources</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><button onClick={() => navigate('book')} className="hover:text-stone-900">Book Online</button></li>
                <li><span className="hover:text-stone-900 cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-stone-900 cursor-pointer">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400">
            <p>© 2024 InstaSite™ Platform. All rights reserved.</p>
            <span className="mt-4 md:mt-0 hover:text-stone-600 cursor-pointer">Powered by InstaSite™</span>
          </div>
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
            <span className="serif text-xl font-bold text-stone-900 tracking-tight">InstaSite™ Pro</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400 -mt-1 font-medium">Built to Convert</span>
          </button>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => navigate(link.page)} className={`text-sm font-medium transition-colors ${currentPage === link.page ? 'text-salmon-600' : 'text-stone-500 hover:text-salmon-600'}`}>
                {link.name}
              </button>
            ))}
            <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-salmon-600 transition-all flex items-center gap-2">
              <Calendar size={16} /> Book Appointment
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
          <button onClick={() => { navigate('book'); setIsOpen(false); }} className="block bg-salmon-500 text-white text-center py-3 rounded-xl font-medium w-full">
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

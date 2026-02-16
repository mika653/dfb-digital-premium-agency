
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Quote, ChevronLeft, ChevronRight, Award, MapPin, Phone, Clock, CreditCard, Shield as ShieldIcon, Menu, X, Calendar, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';

interface InstaSiteEliteProps {
  onBack: () => void;
}

// Constants
const DOCTOR_NAME = "Dr. Maria Santos, MD";
const CLINIC_LOCATIONS = [
  { name: "St. Luke's Medical Center", address: "Room 402, Medical Arts Building, Global City, Taguig", phone: "+63 2 8789 7700", hours: "Mon - Wed: 10:00 AM - 4:00 PM", affiliations: ["St. Luke's Global City", "The Medical City"] },
  { name: "Makati Medical Center", address: "Room 515, Tower 1, Amorsolo St., Makati City", phone: "+63 2 8888 8999", hours: "Thu - Sat: 9:00 AM - 1:00 PM", affiliations: ["Makati Medical Center"] },
];
const SERVICES = [
  { id: "consultation", title: "General Consultation", description: "Comprehensive medical evaluations for acute and chronic conditions, ensuring tailored treatment plans for every patient." },
  { id: "checkup", title: "Executive Health Check", description: "Preventative screenings and diagnostics designed for busy professionals to maintain peak physical health." },
  { id: "hmo", title: "Insurance Coordination", description: "Seamless processing for all major Filipino HMOs (Maxicare, Intellicare, Medicard) and international insurance." },
];
const TESTIMONIALS = [
  { id: "1", quote: "Dr. Santos is the most thorough physician I've visited in Manila. She takes the time to explain everything clearly, which is rare these days.", author: "Ricardo de la Cruz", title: "Patient since 2018", image: "https://i.pravatar.cc/150?u=ricardo" },
  { id: "2", quote: "The booking process was seamless, and the clinic environment at St. Luke's is top-notch. Truly a premium experience for health management.", author: "Elena Soriano", title: "Executive Health Client", image: "https://i.pravatar.cc/150?u=elena" },
  { id: "3", quote: "Her expertise in managing my chronic condition has changed my quality of life. I trust Dr. Maria implicitly with my family's health.", author: "Jaime Mendoza", title: "Chronic Care Patient", image: "https://i.pravatar.cc/150?u=jaime" },
];

const ModularBadge: React.FC<{ label?: string }> = ({ label = "Standard Module" }) => (
  <div className="flex items-center mb-4 opacity-40 hover:opacity-100 transition-opacity">
    <span className="insta-badge text-[11px] font-bold text-stone-500 border-stone-300">InstaSite™ {label}</span>
  </div>
);

// --- Page Components ---

const HomePage: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="pb-20">
      {/* HERO */}
      <section className="relative bg-stone-50 overflow-hidden py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl">
              <ModularBadge label="Hero Section Module (Visual Edition)" />
              <h1 className="text-5xl lg:text-7xl font-bold text-stone-900 leading-[1.1] mb-6">
                Empowering your health with <span className="italic serif">expertise</span> and <span className="italic serif">compassion</span>.
              </h1>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-xl">
                Dr. Maria Santos provides premium, patient-centric internal medicine in Metro Manila. Modern care built on a foundation of trust and professional authority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-medium hover:bg-salmon-600 transition-all text-center flex items-center justify-center gap-2 group">
                  Book a Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('clinics')} className="bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-full font-medium hover:bg-stone-50 transition-all text-center">
                  View Clinic Schedule
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-salmon-200/50 rounded-[3rem] -rotate-2 scale-95 group-hover:rotate-0 group-hover:scale-100 transition-transform duration-700" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] luxury-shadow">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" alt="Portrait of Dr. Maria Santos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 bg-salmon-500 text-white rounded-full flex items-center justify-center"><Award size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Certified By</p>
                  <p className="font-bold text-stone-900 leading-none mt-1 text-sm">PH Board of Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-salmon-100/30 -skew-x-12 transform translate-x-1/2 hidden lg:block" />
      </section>

      {/* TRUST BADGES */}
      <div className="bg-white border-y border-stone-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60">
            <div className="flex items-center gap-2 font-medium text-stone-600"><CheckCircle2 size={20} className="text-salmon-400" /><span>15+ Years Experience</span></div>
            <div className="flex items-center gap-2 font-medium text-stone-600"><CheckCircle2 size={20} className="text-salmon-400" /><span>Board Certified Internal Med</span></div>
            <div className="flex items-center gap-2 font-medium text-stone-600"><CheckCircle2 size={20} className="text-salmon-400" /><span>St. Luke's Affiliated</span></div>
            <div className="flex items-center gap-2 font-medium text-stone-600"><CheckCircle2 size={20} className="text-salmon-400" /><span>HMO Accredited</span></div>
          </div>
        </div>
      </div>

      {/* DOCTOR INTRO */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <ModularBadge label="Professional Profile Module" />
            <img src="https://picsum.photos/seed/doctor-maria/800/1000" alt={DOCTOR_NAME} className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5] object-cover luxury-shadow" />
            <div className="absolute -bottom-6 -right-6 bg-salmon-600 text-white p-8 rounded-2xl hidden lg:block">
              <p className="serif italic text-2xl mb-1">"Compassion is the heart of medicine."</p>
              <p className="text-xs uppercase tracking-widest text-stone-500">— {DOCTOR_NAME}</p>
            </div>
          </div>
          <div>
            <span className="text-stone-500 font-semibold tracking-widest uppercase text-xs mb-4 block">Meet Your Doctor</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Quiet luxury meets world-class healthcare.</h2>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>Dr. Maria Santos is a distinguished consultant physician based in Metro Manila, specializing in comprehensive internal medicine and chronic disease management.</p>
              <p>With over a decade of practice at premier institutions like St. Luke's Medical Center, she believes that every patient deserves a healthcare experience that is as professional as it is personal.</p>
            </div>
            <button onClick={() => navigate('about')} className="mt-10 inline-flex items-center gap-2 font-medium text-salmon-600 border-b-2 border-salmon-200 pb-1 hover:border-salmon-600 transition-all">
              Learn about Dr. Santos <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-xl">
              <ModularBadge label="Service Grid Module" />
              <h2 className="text-4xl font-bold mb-4">Core Medical Services</h2>
              <p className="text-stone-600 text-lg">Structured for easy editing and scalability to suit any medical specialty.</p>
            </div>
            <button onClick={() => navigate('services')} className="hidden sm:flex items-center gap-2 text-stone-900 font-medium group">
              View all services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white p-10 rounded-2xl luxury-shadow border border-stone-100 hover:border-stone-300 transition-all group">
                <div className="w-12 h-12 bg-salmon-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-salmon-500 group-hover:text-white transition-all"><CheckCircle2 size={24} /></div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-8">{service.description}</p>
                <button onClick={() => navigate('services')} className="text-stone-900 text-sm font-bold flex items-center gap-1">Learn more <ArrowRight size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block"><ModularBadge label="Dynamic Carousel Module" /></div>
            <h2 className="text-4xl font-bold mb-4">Patient Experiences</h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">Real feedback from individuals and families under Dr. Santos's care.</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-20 z-10">
              <button onClick={prevTestimonial} className="p-4 rounded-full border border-stone-100 text-stone-500 hover:text-salmon-500 hover:border-salmon-500 transition-all bg-white shadow-sm" aria-label="Previous testimonial"><ChevronLeft size={24} /></button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-20 z-10">
              <button onClick={nextTestimonial} className="p-4 rounded-full border border-stone-100 text-stone-500 hover:text-salmon-500 hover:border-salmon-500 transition-all bg-white shadow-sm" aria-label="Next testimonial"><ChevronRight size={24} /></button>
            </div>
            <div className="relative min-h-[400px] flex items-center">
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={testimonial.id} className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center text-center p-8 lg:p-16 rounded-[2.5rem] bg-stone-50 border border-stone-100 shadow-sm ${index === activeTestimonial ? 'opacity-100 translate-x-0 scale-100' : index < activeTestimonial ? 'opacity-0 -translate-x-full scale-95 pointer-events-none' : 'opacity-0 translate-x-full scale-95 pointer-events-none'}`}>
                  <Quote size={48} className="text-salmon-200 mb-8" />
                  <p className="serif italic text-2xl lg:text-3xl text-stone-800 leading-relaxed mb-10 max-w-3xl">"{testimonial.quote}"</p>
                  <div className="flex flex-col items-center gap-4">
                    {testimonial.image && (<img src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-full object-cover grayscale border-2 border-white shadow-md" />)}
                    <div>
                      <h4 className="font-bold text-stone-900 text-lg">{testimonial.author}</h4>
                      <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-12">
              {TESTIMONIALS.map((_, index) => (
                <button key={index} onClick={() => setActiveTestimonial(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === activeTestimonial ? 'w-8 bg-salmon-500' : 'w-2 bg-salmon-200 hover:bg-salmon-300'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-salmon-600 to-salmon-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModularBadge label="Global CTA Module" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Start your path to better health today.</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">Book an appointment online instantly. Select your preferred clinic and time slot in less than 2 minutes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('book')} className="bg-white text-salmon-700 px-10 py-5 rounded-full font-bold hover:bg-salmon-50 transition-all">Book Appointment</button>
            <button onClick={() => navigate('clinics')} className="border border-salmon-300/40 text-white px-10 py-5 rounded-full font-bold hover:bg-salmon-700 transition-all">Contact Clinic</button>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage: React.FC = () => (
  <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-5xl font-bold mb-10">Professional Biography</h1>
    <div className="prose prose-stone lg:prose-xl">
      <p className="text-xl text-stone-600 leading-relaxed mb-8">Dr. Maria Santos, MD, FCP, is a board-certified Internist dedicated to providing exceptional medical care for the Filipino community. With a focus on preventative healthcare and chronic disease management, she combines her clinical expertise with a compassionate bedside manner.</p>
      <h3 className="text-2xl font-bold mb-4">Education & Training</h3>
      <ul className="space-y-4 text-stone-600 mb-10">
        <li className="flex gap-4 items-start"><span className="font-bold text-salmon-600">2010</span><span>Residency in Internal Medicine, Makati Medical Center</span></li>
        <li className="flex gap-4 items-start"><span className="font-bold text-salmon-600">2007</span><span>Doctor of Medicine, University of Santo Tomas</span></li>
      </ul>
      <h3 className="text-2xl font-bold mb-4">Professional Philosophy</h3>
      <p className="text-stone-600 leading-relaxed italic">"I believe that the best medicine is a partnership. My goal is to listen deeply, diagnose accurately, and work together with patients to build a sustainable path to health."</p>
    </div>
  </div>
);

const ClinicsPage: React.FC = () => (
  <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mb-16">
      <ModularBadge label="Clinic Information Module" />
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">Our Practices</h1>
      <p className="text-xl text-stone-600 leading-relaxed">Dr. Maria Santos maintains hospital affiliations and private clinic schedules across Metro Manila's premier medical districts.</p>
    </div>
    <div className="grid lg:grid-cols-2 gap-12 mb-20">
      {CLINIC_LOCATIONS.map((clinic, idx) => (
        <div key={idx} className="bg-white border border-stone-100 rounded-3xl p-10 luxury-shadow">
          <h2 className="serif text-3xl font-bold mb-8 text-stone-900">{clinic.name}</h2>
          <div className="space-y-6 mb-10">
            <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><MapPin size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-500 mb-1">Location</h4><p className="text-stone-800 font-medium">{clinic.address}</p></div></div>
            <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Clock size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-500 mb-1">Clinic Hours</h4><p className="text-stone-800 font-medium">{clinic.hours}</p></div></div>
            <div className="flex gap-4"><div className="bg-salmon-50 p-2 rounded-lg h-fit text-salmon-400"><Phone size={20} /></div><div><h4 className="font-semibold text-sm uppercase tracking-wider text-stone-500 mb-1">Direct Line</h4><p className="text-stone-800 font-medium">{clinic.phone}</p></div></div>
          </div>
          <div className="pt-8 border-t border-stone-100 flex flex-wrap gap-3">
            {clinic.affiliations.map(aff => (<span key={aff} className="px-3 py-1 bg-salmon-50 text-salmon-600 text-xs font-bold rounded-full uppercase tracking-tighter">{aff}</span>))}
          </div>
        </div>
      ))}
    </div>
    <section className="bg-stone-50 rounded-[2.5rem] p-12 lg:p-20">
      <ModularBadge label="Payment & Insurance Block" />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Accepted Payments & Insurance</h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-8">We aim to make your visit as smooth as possible. We accept a variety of payment methods and coordinate directly with major Filipino HMOs.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl flex items-center gap-3 border border-salmon-200"><CreditCard className="text-salmon-400" /><span className="font-semibold">GCash / Maya</span></div>
            <div className="bg-white p-6 rounded-2xl flex items-center gap-3 border border-salmon-200"><CreditCard className="text-salmon-400" /><span className="font-semibold">All Major Cards</span></div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-3xl luxury-shadow space-y-8">
          <h3 className="font-bold text-xl flex items-center gap-2"><ShieldIcon className="text-salmon-500" />Accredited Partners</h3>
          <div className="grid grid-cols-2 gap-y-6 gap-x-12 grayscale opacity-60">
            <div className="text-center font-bold italic tracking-tighter text-2xl text-stone-300">MAXICARE</div>
            <div className="text-center font-bold italic tracking-tighter text-2xl text-stone-300">INTELLICARE</div>
            <div className="text-center font-bold italic tracking-tighter text-2xl text-stone-300">MEDICARD</div>
            <div className="text-center font-bold italic tracking-tighter text-2xl text-stone-300">PHILCARE</div>
          </div>
          <p className="text-xs text-stone-500 text-center italic">Please present a valid ID and LOA upon arrival.</p>
        </div>
      </div>
    </section>
  </div>
);

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', clinic: '', reason: '' });
  const nextStep = () => setStep(step + 1);
  const isSubmitted = step === 4;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 bg-stone-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl luxury-shadow overflow-hidden">
        <div className="p-8 lg:p-12 border-b border-salmon-100 bg-gradient-to-r from-salmon-600 to-salmon-700 text-white relative">
          <ModularBadge label="Booking Engine Module" />
          <h1 className="text-3xl font-bold mb-2">Request an Appointment</h1>
          <p className="text-white/70">Complete the steps below and our clinic secretary will confirm within 24 hours.</p>
          <div className="mt-8 flex gap-2">
            {[1, 2, 3].map((s) => (<div key={s} className={`h-1 flex-grow rounded-full transition-all ${step >= s ? 'bg-white' : 'bg-salmon-400/40'}`} />))}
          </div>
        </div>
        <div className="p-8 lg:p-12">
          {!isSubmitted ? (
            <div className="space-y-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Step 1: Contact Information</h3>
                  <div className="space-y-4">
                    <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} /><input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                    <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} /><input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                    <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} /><input type="tel" placeholder="Mobile Number (+63)" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Step 2: Preferred Clinic</h3>
                  <div className="space-y-4">
                    {["St. Luke's Medical Center (GBC)", 'Makati Medical Center', 'Online Teleconsultation'].map((clinic) => (
                      <button key={clinic} onClick={() => setFormData({...formData, clinic})} className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${formData.clinic === clinic ? 'border-salmon-500 bg-salmon-50' : 'border-stone-100 hover:border-salmon-200'}`}>
                        <span className="font-semibold">{clinic}</span>
                        {formData.clinic === clinic && <CheckCircle className="text-salmon-500" size={20} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Step 3: Reason for Visit</h3>
                  <div className="relative"><MessageSquare className="absolute left-4 top-6 text-stone-500" size={18} /><textarea rows={4} placeholder="Briefly describe your medical concern (Optional)" className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:border-salmon-500 outline-none transition-all" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} /></div>
                  <p className="text-xs text-stone-500 leading-relaxed">By submitting, you agree to our data privacy policy in compliance with the Philippines Data Privacy Act of 2012.</p>
                </div>
              )}
              <div className="pt-4 flex justify-between items-center">
                {step > 1 && (<button onClick={() => setStep(step - 1)} className="text-stone-500 font-bold px-4 py-2 hover:text-stone-600">Back</button>)}
                <div className="ml-auto">
                  <button onClick={nextStep} disabled={step === 1 && !formData.name} className="bg-salmon-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-salmon-600 disabled:opacity-30 transition-all">
                    {step === 3 ? 'Confirm Request' : 'Continue'} <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-salmon-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-salmon-500" /></div>
              <h3 className="text-2xl font-bold mb-2">Request Received</h3>
              <p className="text-stone-600 mb-8 max-w-sm mx-auto">Thank you, {formData.name}. Our clinic staff will review your request and contact you via phone shortly.</p>
              <button onClick={() => setStep(1)} className="text-salmon-600 font-bold hover:underline">Back to Home</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export const InstaSiteElite: React.FC<InstaSiteEliteProps> = ({ onBack }) => {
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
      case 'about': return <AboutPage />;
      case 'clinics': return <ClinicsPage />;
      case 'book': return <BookingPage />;
      case 'services': return <HomePage navigate={navigate} />;
      case 'resources': return <ClinicsPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-salmon-100 selection:text-salmon-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Back to DFB Banner */}
      <div className="bg-brand-black text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <button onClick={onBack} className="hover:text-cyan-400 transition-colors">← Back to DFB Digital</button>
        <span className="mx-3 text-white/30">|</span>
        <span className="text-white/60">InstaSite™ Elite Demo</span>
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
              <p className="text-stone-600 max-w-sm text-sm leading-relaxed mb-6">Providing premium medical care with a focus on trust, transparency, and patient comfort. Serving the Metro Manila community with excellence for over 15 years.</p>
              <div className="flex space-x-4">
                <span className="text-[11px] font-bold text-stone-500 border border-stone-300 px-2 py-1 rounded">InstaSite™ Elite</span>
                <span className="text-[11px] font-bold text-stone-500 border border-stone-300 px-2 py-1 rounded">PREMIUM TIER</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Practice</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><button onClick={() => navigate('about')} className="hover:text-stone-900">Professional Bio</button></li>
                <li><button onClick={() => navigate('services')} className="hover:text-stone-900">Medical Services</button></li>
                <li><button onClick={() => navigate('clinics')} className="hover:text-stone-900">Clinic Locations</button></li>
                <li><button onClick={() => navigate('resources')} className="hover:text-stone-900">Patient Resources</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><button onClick={() => navigate('book')} className="hover:text-stone-900">Book Online</button></li>
                <li><span className="hover:text-stone-900 cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-stone-900 cursor-pointer">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
            <p>© 2024 InstaSite™ Platform. All rights reserved. Demo Content for Presentation Purposes.</p>
            <div className="mt-4 md:mt-0 flex gap-4"><span className="hover:text-stone-600 cursor-pointer">Powered by InstaSite™</span></div>
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
            <span className="serif text-xl font-bold text-stone-900 tracking-tight">InstaSite™ Elite</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 -mt-1 font-medium">Premium Digital Front Desk</span>
          </button>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button key={link.page} onClick={() => navigate(link.page)} className={`text-sm font-medium transition-colors ${currentPage === link.page ? 'text-salmon-600' : 'text-stone-600 hover:text-salmon-600'}`}>
                {link.name}
              </button>
            ))}
            <button onClick={() => navigate('book')} className="bg-salmon-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-salmon-600 transition-all flex items-center gap-2">
              <Calendar size={16} /> Book Appointment
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
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

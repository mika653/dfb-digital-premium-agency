
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  options?: Option[];
}

interface Option {
  label: string;
  value: string;
}

interface ServiceMatch {
  title: string;
  description: string;
  match: number;
  image: string;
  route?: string;
}

const services = {
  eventLab: {
    title: "Event Lab",
    description: "Operational infrastructure for high-stakes environments. Perfect for conferences, launches, and corporate gatherings.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    route: "#eventlab"
  },
  instaSite: {
    title: "InstaSite",
    description: "Precision-engineered digital properties for instant credibility. Get online fast with a professional presence.",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
    route: "#instasite"
  },
  launchPad: {
    title: "LaunchPad",
    description: "Systematic framework for new initiative market entry. Ideal for product launches and new business ventures.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
    route: "#launchpad"
  },
  digitalMarketing: {
    title: "Digital Marketing",
    description: "Comprehensive strategies for online presence and customer acquisition. Drive traffic, leads, and sales.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    route: null
  },
  socialMedia: {
    title: "Social Media Marketing",
    description: "Engaging content and community management for brand growth. Build your audience and brand awareness.",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
    route: null
  }
};

const questions = [
  {
    id: 1,
    content: "Hey there! I'm here to help match you with the right DFB Digital services. What's your primary goal?",
    options: [
      { label: "Build brand awareness", value: "awareness" },
      { label: "Generate leads & sales", value: "leads" },
      { label: "Launch something new", value: "launch" },
      { label: "Host an event", value: "event" }
    ]
  },
  {
    id: 2,
    content: "Got it! Do you currently have an online presence (website, social media)?",
    options: [
      { label: "Yes, fully established", value: "established" },
      { label: "Partial - needs improvement", value: "partial" },
      { label: "No, starting fresh", value: "none" }
    ]
  },
  {
    id: 3,
    content: "How soon do you need to see results?",
    options: [
      { label: "ASAP - urgent timeline", value: "urgent" },
      { label: "1-3 months", value: "medium" },
      { label: "Building for long-term", value: "longterm" }
    ]
  },
  {
    id: 4,
    content: "Last question - what's your investment level for this initiative?",
    options: [
      { label: "Starter (testing the waters)", value: "starter" },
      { label: "Growth (ready to scale)", value: "growth" },
      { label: "Enterprise (full transformation)", value: "enterprise" }
    ]
  }
];

export const Matchmaker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ServiceMatch[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addBotMessage(questions[0].content, questions[0].options);
    }, 500);
  }, []);

  const addBotMessage = (content: string, options?: Option[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        content,
        options
      }]);
    }, 800);
  };

  const calculateRecommendations = (userAnswers: string[]): ServiceMatch[] => {
    const scores: Record<string, number> = {
      eventLab: 0,
      instaSite: 0,
      launchPad: 0,
      digitalMarketing: 0,
      socialMedia: 0
    };

    const [goal, presence, timeline, budget] = userAnswers;

    // Goal-based scoring
    if (goal === 'event') scores.eventLab += 50;
    if (goal === 'launch') scores.launchPad += 40;
    if (goal === 'awareness') {
      scores.socialMedia += 35;
      scores.digitalMarketing += 25;
    }
    if (goal === 'leads') {
      scores.digitalMarketing += 40;
      scores.instaSite += 20;
    }

    // Presence-based scoring
    if (presence === 'none') {
      scores.instaSite += 40;
      scores.launchPad += 20;
    }
    if (presence === 'partial') {
      scores.instaSite += 25;
      scores.digitalMarketing += 20;
    }
    if (presence === 'established') {
      scores.digitalMarketing += 30;
      scores.socialMedia += 25;
    }

    // Timeline-based scoring
    if (timeline === 'urgent') {
      scores.instaSite += 30;
      scores.eventLab += 15;
    }
    if (timeline === 'medium') {
      scores.launchPad += 20;
      scores.digitalMarketing += 20;
    }
    if (timeline === 'longterm') {
      scores.socialMedia += 25;
      scores.digitalMarketing += 25;
    }

    // Budget-based scoring
    if (budget === 'starter') {
      scores.instaSite += 15;
      scores.socialMedia += 15;
    }
    if (budget === 'growth') {
      scores.digitalMarketing += 20;
      scores.launchPad += 20;
    }
    if (budget === 'enterprise') {
      scores.eventLab += 25;
      scores.launchPad += 25;
      scores.digitalMarketing += 20;
    }

    // Convert to array and sort by score
    const results = Object.entries(scores)
      .map(([key, score]) => {
        const service = services[key as keyof typeof services];
        return {
          title: service.title,
          description: service.description,
          image: service.image,
          route: service.route,
          match: Math.min(Math.round((score / 80) * 100), 99)
        };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 3);

    return results;
  };

  const handleOptionClick = (option: Option) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: option.label
    }]);

    const newAnswers = [...answers, option.value];
    setAnswers(newAnswers);

    // Check if there are more questions
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeout(() => {
        const nextQ = questions[currentQuestion + 1];
        addBotMessage(nextQ.content, nextQ.options);
      }, 400);
    } else {
      // Show results
      setTimeout(() => {
        addBotMessage("Thanks! Based on your answers, here are my top recommendations for you...");
        setTimeout(() => {
          const recs = calculateRecommendations(newAnswers);
          setRecommendations(recs);
          setShowResults(true);
        }, 1200);
      }, 400);
    }
  };

  const restartChat = () => {
    setMessages([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendations([]);
    setTimeout(() => {
      addBotMessage(questions[0].content, questions[0].options);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-12 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button onClick={onBack} className="text-white/70 hover:text-white smooth-transition">Home</button>
            <a href="/#services" className="text-white/70 hover:text-white smooth-transition">Services</a>
            <span className="text-white">Find Your Fit</span>
            <a
              href="mailto:hello@dfbdigital.com"
              className="px-5 py-2 bg-brand-blue text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition"
            >
              Get in Touch
            </a>
          </div>

          <button onClick={onBack} className="md:hidden text-white/70 hover:text-white smooth-transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-brand-blue text-white rounded-2xl rounded-br-md px-5 py-3'
                      : 'bg-white/10 text-white rounded-2xl rounded-bl-md px-5 py-4'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>

                  {/* Options */}
                  {message.options && !showResults && message.id === messages[messages.length - 1]?.id && (
                    <div className="mt-4 space-y-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left px-4 py-3 bg-white/10 hover:bg-brand-blue/50 rounded-xl text-white/90 hover:text-white smooth-transition text-sm"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {showResults && (
              <div className="mt-8 space-y-6">
                <h3 className="text-white text-xl font-heading font-semibold text-center mb-8">Your Recommended Services</h3>
                {recommendations.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/50 smooth-transition"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white text-xl font-heading font-bold">{service.title}</h4>
                          <span className="px-3 py-1 bg-brand-blue/20 text-brand-blue text-glow-soft text-sm font-semibold rounded-full">
                            {service.match}% match
                          </span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">{service.description}</p>
                        {service.route ? (
                          <a
                            href={service.route}
                            className="inline-flex items-center gap-2 text-brand-blue text-glow-soft hover:text-blue-400 text-sm font-semibold smooth-transition"
                          >
                            View {service.title}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 6 15 12 9 18"></polyline>
                            </svg>
                          </a>
                        ) : (
                          <a
                            href={`mailto:hello@dfbdigital.com?subject=Inquiry about ${service.title}`}
                            className="inline-flex items-center gap-2 text-brand-blue text-glow-soft hover:text-blue-400 text-sm font-semibold smooth-transition"
                          >
                            Inquire about {service.title}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 6 15 12 9 18"></polyline>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-8 space-y-4">
                  <button
                    onClick={restartChat}
                    className="px-6 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-full smooth-transition text-sm"
                  >
                    Start Over
                  </button>
                  <p className="text-white/40 text-sm">
                    Ready to get started? <a href="mailto:hello@dfbdigital.com" className="text-brand-blue text-glow-soft hover:underline">Contact us</a>
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
    </div>
  );
};

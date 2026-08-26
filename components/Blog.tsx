
import React from 'react';
import { NewsletterForm } from './NewsletterForm';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface BlogProps {
  onBack: () => void;
  onArticleClick: (articleId: string) => void;
  onMatchmakerClick?: () => void;
  onServiceNavigate?: (route: string) => void;
}

const articles = [
  {
    id: 'digital-transformation-explained',
    title: "What Is Digital Transformation, Really?",
    subtitle: "A Plain-English Guide",
    excerpt: "\"Digital transformation\" gets used to sell almost anything. Here's what it actually means, what it isn't, and how to start without overhauling everything.",
    category: "Digital Transformation",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    gradient: "from-violet-500 to-purple-700"
  },
  {
    id: 'ai-automation-guide',
    title: "AI Automation for Established Businesses",
    subtitle: "What It Actually Means",
    excerpt: "Not robots. Not hype. Just the repetitive parts of your day — replying, scheduling, data entry — handled quietly in the background.",
    category: "AI & Automation",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    gradient: "from-blue-600 to-indigo-700"
  },
  {
    id: 'modern-marketing-2026',
    title: "Modern Marketing for Established Businesses",
    subtitle: "What Actually Works Now",
    excerpt: "The channels changed. What earns trust didn't. Including why AI-powered search is starting to matter for how customers find you.",
    category: "Marketing",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: 'article-digital-insights',
    title: "DFB's Digital Insights",
    subtitle: "A practical resource for business owners looking to understand digital more clearly.",
    excerpt: "Subscribe to receive insights, trends, and real-world perspectives on how digital can apply to your business — without the jargon.",
    category: "Services",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 'article-boutique-strategy',
    title: "How Boutique Agencies Think About Digital Strategy",
    subtitle: "That Big Agencies Don't",
    excerpt: "Digital strategy often gets confused with execution. More channels, more tools, more activity. But strategy isn't about doing more. It's about choosing what not to do.",
    category: "Strategy",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&q=80&w=800",
    gradient: "from-purple-500 to-pink-600"
  }
];

const comingSoonItems = [
  {
    title: "Podcast",
    description: "Conversations with thought leaders on where digital marketing, AI, and emerging technologies are headed—with real-world implications for businesses that want to stay ahead."
  },
  {
    title: "DFB Digital Academy",
    description: "Courses, templates and training that help you make smarter digital decisions—at your own pace."
  }
];

export const Blog: React.FC<BlogProps> = ({ onBack, onArticleClick, onMatchmakerClick, onServiceNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar onHomeClick={onBack} onMatchmakerClick={onMatchmakerClick} onServiceNavigate={onServiceNavigate} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
              <span className="text-white/60 text-sm font-medium tracking-wide">Insights & Resources</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Into the <span className="text-[#bdffcf]">Bucket</span>
            </h1>
            <p className="text-xl text-white/50 leading-relaxed mb-4">
              Clear thinking on digital for decision-makers.
            </p>
            <p className="text-base text-white/30 leading-relaxed">
              Practical perspectives on strategy, marketing, and building businesses that last — written for owners who want clarity, not complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                onClick={() => onArticleClick(article.id)}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/[0.07] smooth-transition"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${article.gradient} opacity-0 group-hover:opacity-40 smooth-transition mix-blend-multiply`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#bdffcf]/20 text-[#bdffcf] text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <span className="text-white/40 text-xs">{article.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-[#bdffcf] smooth-transition">
                    {article.title}
                  </h2>
                  {article.subtitle && (
                    <p className="text-white/60 text-sm mb-4">{article.subtitle}</p>
                  )}
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[#bdffcf] text-sm font-semibold group-hover:gap-4 smooth-transition">
                    <span>Read Article</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18"></polyline>
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* On the Horizon */}
          <div className="mt-32 pt-20 border-t border-white/10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                On the <span className="text-[#bdffcf]">Horizon</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                New ways to learn, grow, and approach digital with intention.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {comingSoonItems.map((item, index) => (
                <div key={index} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-5xl font-heading font-bold text-white/20 mb-4">0{index + 1}</div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-4">{item.description}</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">Coming Soon</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 max-w-xl mx-auto">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </section>

      <Footer onMatchmakerClick={onMatchmakerClick} onServiceNavigate={onServiceNavigate} />
    </div>
  );
};

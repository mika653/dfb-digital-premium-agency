
import React from 'react';
import { NewsletterForm } from './NewsletterForm';

interface BlogProps {
  onBack: () => void;
  onArticleClick: (articleId: string) => void;
}

const articles = [
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

export const Blog: React.FC<BlogProps> = ({ onBack, onArticleClick }) => {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="w-[130px] md:w-[160px] lg:w-[200px] h-auto" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button onClick={onBack} className="text-white/70 hover:text-white smooth-transition">Home</button>
            <a href="/#services" className="text-white/70 hover:text-white smooth-transition">Services</a>
            <span className="text-white">Blog</span>
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

          {/* Newsletter CTA */}
          <div className="mt-20 max-w-xl mx-auto">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </section>
    </div>
  );
};

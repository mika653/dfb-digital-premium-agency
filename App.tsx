
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
// import { Reviews } from './components/Reviews';
import { ClientRoster } from './components/ClientRoster';
import { WhyDFB } from './components/WhyDFB';
import { CTA } from './components/CTA';
import { ComingSoon } from './components/ComingSoon';
import { Footer } from './components/Footer';
import { Matchmaker } from './components/Matchmaker';
import { ChatWidget } from './components/ChatWidget';
import { EventLab } from './components/EventLab';
import { InstaSite } from './components/InstaSite';
import { LaunchPad } from './components/LaunchPad';
import { DigitalStrategy } from './components/DigitalStrategy';
import { SocialMediaMarketing } from './components/SocialMediaMarketing';
import { ContentMarketing } from './components/ContentMarketing';
import { EmailCRM } from './components/EmailCRM';
import { Blog } from './components/Blog';
import { ArticleDigitalInsights } from './components/ArticleDigitalInsights';
import { ArticleBoutiqueStrategy } from './components/ArticleBoutiqueStrategy';
import { VIPAccess } from './components/VIPAccess';

const defaultMeta = {
  title: 'DFB Digital | Boutique Digital Consultancy for Web Development & Marketing Strategy',
  description: 'Boutique digital consultancy for established business owners. We build systems for clarity, structure, and long-term execution.',
};

const pageMeta: Record<string, { title: string; description: string }> = {
  instasite: {
    title: 'InstaSite | A Professional Web Presence — Delivered Fast | DFB Digital',
    description: 'A professional web presence — delivered fast. No coding, no complexity. Just a clean, polished site built for you.',
  },
  eventlab: {
    title: 'Event Lab | High-Impact Event Websites | DFB Digital',
    description: 'High-impact event websites that inform, engage, and convert. Built to make your event unforgettable online.',
  },
  launchpad: {
    title: 'LaunchPad | Full Website Solutions for Growing Businesses | DFB Digital',
    description: 'A full website solution for businesses ready to grow. Strategy, design, and development — all in one.',
  },
  blog: {
    title: 'Blog | Insights & Resources | DFB Digital',
    description: 'Practical perspectives on digital strategy, marketing, and building businesses that last.',
  },
  matchmaker: {
    title: 'Get Matched | Find the Right Service for You | DFB Digital',
    description: 'Answer a few questions and get matched to the DFB Digital service that fits your needs.',
  },
  digitalstrategy: {
    title: 'Digital Strategy & Campaign Planning | DFB Digital',
    description: 'Comprehensive strategies for online presence and customer acquisition. Built for businesses ready to grow.',
  },
  socialmedia: {
    title: 'Social Media Marketing | DFB Digital',
    description: 'Strategic social media management that builds audience and drives engagement.',
  },
  contentmarketing: {
    title: 'Content Marketing | DFB Digital',
    description: 'Compelling content strategies that tell your brand story and attract your ideal audience.',
  },
  emailcrm: {
    title: 'Email & CRM-Based Marketing | DFB Digital',
    description: 'Nurture leads and retain customers with precision email and CRM campaigns.',
  },
  'article-digital-insights': {
    title: 'Digital Insights for Modern Businesses | DFB Digital Blog',
    description: 'Practical digital insights for business owners navigating strategy, marketing, and growth.',
  },
  'article-boutique-strategy': {
    title: 'The Boutique Strategy Advantage | DFB Digital Blog',
    description: 'Why boutique digital consultancy delivers more impact than big-agency overhead.',
  },
  vip: {
    title: 'VIP Access | DFB Digital',
    description: 'Exclusive access for DFB Digital VIP clients.',
  },
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'matchmaker' | 'eventlab' | 'instasite' | 'launchpad' | 'digitalstrategy' | 'socialmedia' | 'contentmarketing' | 'emailcrm' | 'blog' | 'article-digital-insights' | 'article-boutique-strategy' | 'vip'>('home');

  // Update document title and OG meta tags based on current page
  useEffect(() => {
    const meta = pageMeta[currentPage] || defaultMeta;
    document.title = meta.title;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const metaDesc = document.querySelector('meta[name="description"]');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');

    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
    if (metaDesc) metaDesc.setAttribute('content', meta.description);
    if (twTitle) twTitle.setAttribute('content', meta.title);
    if (twDesc) twDesc.setAttribute('content', meta.description);
  }, [currentPage]);

  useEffect(() => {
    const pageRoutes: Record<string, typeof currentPage> = {
      '/matchmaker': 'matchmaker',
      '/eventlab': 'eventlab',
      '/instasite': 'instasite',
      '/launchpad': 'launchpad',
      '/digitalstrategy': 'digitalstrategy',
      '/socialmedia': 'socialmedia',
      '/contentmarketing': 'contentmarketing',
      '/emailcrm': 'emailcrm',
      '/blog': 'blog',
      '/article-digital-insights': 'article-digital-insights',
      '/article-boutique-strategy': 'article-boutique-strategy',
      '/vip': 'vip',
    };

    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      const page = pageRoutes[pathname];
      if (page) {
        setCurrentPage(page);
        window.scrollTo(0, 0);
      } else if (pathname === '/') {
        setCurrentPage('home');
        window.scrollTo(0, 0);
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const navigateTo = (path: string, page: typeof currentPage) => {
    history.pushState(null, '', path);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goToHome = () => navigateTo('/', 'home');
  const goToMatchmaker = () => navigateTo('/matchmaker', 'matchmaker');
  const goToEventLab = () => navigateTo('/eventlab', 'eventlab');
  const goToInstaSite = () => navigateTo('/instasite', 'instasite');
  const goToLaunchPad = () => navigateTo('/launchpad', 'launchpad');
  const goToBlog = () => navigateTo('/blog', 'blog');

  const goToServicePage = (route: string) => {
    navigateTo(`/${route}`, route as typeof currentPage);
  };

  const goToArticle = (articleId: string) => {
    navigateTo(`/${articleId}`, articleId as 'article-digital-insights' | 'article-boutique-strategy');
  };

  if (currentPage === 'vip') {
    return <VIPAccess onBack={goToHome} />;
  }

  if (currentPage === 'article-boutique-strategy') {
    return <ArticleBoutiqueStrategy onBack={goToHome} onBlogClick={goToBlog} />;
  }

  if (currentPage === 'article-digital-insights') {
    return <ArticleDigitalInsights onBack={goToHome} onBlogClick={goToBlog} />;
  }

  if (currentPage === 'blog') {
    return <Blog onBack={goToHome} onArticleClick={goToArticle} />;
  }

  if (currentPage === 'launchpad') {
    return <LaunchPad onBack={goToHome} />;
  }

  if (currentPage === 'instasite') {
    return <InstaSite onBack={goToHome} />;
  }

  if (currentPage === 'eventlab') {
    return <EventLab onBack={goToHome} />;
  }

  if (currentPage === 'digitalstrategy') {
    return <DigitalStrategy onBack={goToHome} />;
  }

  if (currentPage === 'socialmedia') {
    return <SocialMediaMarketing onBack={goToHome} />;
  }

  if (currentPage === 'contentmarketing') {
    return <ContentMarketing onBack={goToHome} />;
  }

  if (currentPage === 'emailcrm') {
    return <EmailCRM onBack={goToHome} />;
  }

  if (currentPage === 'matchmaker') {
    return <Matchmaker onBack={goToHome} />;
  }

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-blue selection:text-white">
      <Navbar onMatchmakerClick={goToMatchmaker} onBlogClick={goToBlog} onHomeClick={goToHome} />
      <main>
        <Hero onMatchmakerClick={goToMatchmaker} />
        <About />
        <Services onNavigate={goToServicePage} />
        <WhyDFB />
        {/* <Reviews /> */}
        <ClientRoster />
        <CTA />
        <ComingSoon />
      </main>
      <Footer onMatchmakerClick={goToMatchmaker} onBlogClick={goToBlog} />

      <ChatWidget onMatchmakerClick={goToMatchmaker} onBlogClick={goToBlog} />
    </div>
  );
};

export default App;

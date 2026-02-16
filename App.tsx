
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
import { InstaSiteStarter } from './components/InstaSiteStarter';
import { InstaSitePro } from './components/InstaSitePro';
import { InstaSiteElite } from './components/InstaSiteElite';

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
    title: 'Into the Bucket | Clear Thinking on Digital | DFB Digital',
    description: 'Clear thinking on digital for decision-makers. Insights, strategy, and perspectives from DFB Digital.',
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
  'instasite-starter': {
    title: 'InstaSite Starter Demo | Professional Presence | DFB Digital',
    description: 'See what an InstaSite Starter looks like — a clean, professional single-page site for your digital calling card.',
  },
  'instasite-pro': {
    title: 'InstaSite Pro Demo | Built to Convert | DFB Digital',
    description: 'See what an InstaSite Pro looks like — a multi-page site designed to turn visitors into clients.',
  },
  'instasite-elite': {
    title: 'InstaSite Elite Demo | Premium Digital Front Desk | DFB Digital',
    description: 'See what an InstaSite Elite looks like — a premium, multi-page site with refined design and advanced sections.',
  },
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'matchmaker' | 'eventlab' | 'instasite' | 'launchpad' | 'digitalstrategy' | 'socialmedia' | 'contentmarketing' | 'emailcrm' | 'blog' | 'article-digital-insights' | 'article-boutique-strategy' | 'vip' | 'instasite-starter' | 'instasite-pro' | 'instasite-elite'>('home');

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
      '/instasite/starter': 'instasite-starter',
      '/instasite/pro': 'instasite-pro',
      '/instasite/elite': 'instasite-elite',
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

  const goToInstaSiteDemo = (tier: string) => {
    navigateTo(`/instasite/${tier}`, `instasite-${tier}` as typeof currentPage);
  };

  const goToServicePage = (route: string) => {
    navigateTo(`/${route}`, route as typeof currentPage);
  };

  const goToArticle = (articleId: string) => {
    navigateTo(`/${articleId}`, articleId as 'article-digital-insights' | 'article-boutique-strategy');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'vip': return <VIPAccess onBack={goToHome} />;
      case 'article-boutique-strategy': return <ArticleBoutiqueStrategy onBack={goToHome} onBlogClick={goToBlog} />;
      case 'article-digital-insights': return <ArticleDigitalInsights onBack={goToHome} onBlogClick={goToBlog} />;
      case 'blog': return <Blog onBack={goToHome} onArticleClick={goToArticle} />;
      case 'launchpad': return <LaunchPad onBack={goToHome} />;
      case 'instasite-starter': return <InstaSiteStarter onBack={goToInstaSite} />;
      case 'instasite-pro': return <InstaSitePro onBack={goToInstaSite} />;
      case 'instasite-elite': return <InstaSiteElite onBack={goToInstaSite} />;
      case 'instasite': return <InstaSite onBack={goToHome} onNavigateDemo={goToInstaSiteDemo} />;
      case 'eventlab': return <EventLab onBack={goToHome} />;
      case 'digitalstrategy': return <DigitalStrategy onBack={goToHome} />;
      case 'socialmedia': return <SocialMediaMarketing onBack={goToHome} />;
      case 'contentmarketing': return <ContentMarketing onBack={goToHome} />;
      case 'emailcrm': return <EmailCRM onBack={goToHome} />;
      case 'matchmaker': return <Matchmaker onBack={goToHome} />;
      default:
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
          </div>
        );
    }
  };

  return (
    <>
      {renderPage()}
      <ChatWidget onMatchmakerClick={goToMatchmaker} onBlogClick={goToBlog} />
      <Analytics />
    </>
  );
};

export default App;

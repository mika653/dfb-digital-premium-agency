
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPage } from './components/AboutPage';
import { Trust } from './components/Trust';
import { ServicesPage } from './components/ServicesPage';
// import { Reviews } from './components/Reviews';
import { FindYourFitPrompt } from './components/FindYourFitPrompt';
import { OurWorkPage } from './components/OurWorkPage';
import { WhyDFB } from './components/WhyDFB';
import { CTA } from './components/CTA';
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
import { AIAutomations } from './components/AIAutomations';
import { DigitalTransformation } from './components/DigitalTransformation';
import { Blog } from './components/Blog';
import { ArticleDigitalInsights } from './components/ArticleDigitalInsights';
import { ArticleBoutiqueStrategy } from './components/ArticleBoutiqueStrategy';
import { ArticleDigitalTransformationExplained } from './components/ArticleDigitalTransformationExplained';
import { ArticleAIAutomationGuide } from './components/ArticleAIAutomationGuide';
import { ArticleModernMarketing } from './components/ArticleModernMarketing';
import { RHEventDesign } from './components/RHEventDesign';
import { VIPAccess } from './components/VIPAccess';
import { InstaSiteStarter } from './components/InstaSiteStarter';
import { InstaSitePro } from './components/InstaSitePro';
import { InstaSiteElite } from './components/InstaSiteElite';
import { PMASEV } from './components/PMASEV';
import { Dashboard } from './components/Dashboard';
import { Intake } from './components/Intake';
import { ClientStatus } from './components/ClientStatus';

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
  about: {
    title: 'About DFB Digital | Founder & Approach',
    description: 'Meet Daddy FunBuckets, Founder of DFB Digital — 12+ years of digital marketing and strategy experience across Asia, the Middle East, and global markets.',
  },
  services: {
    title: 'All Services | DFB Digital',
    description: 'Web development, digital marketing, and digital consultancy — built for established businesses who want a plan, not guesswork.',
  },
  'our-work': {
    title: 'Our Work | Client Roster | DFB Digital',
    description: 'A look at who DFB Digital works with, and what we\'ve built for them.',
  },
  aiautomations: {
    title: 'AI Automations | Save Time on Repetitive Work | DFB Digital',
    description: 'Automate follow-ups, scheduling, and reporting without hiring or coding. Plain-language AI automation for established businesses.',
  },
  digitaltransformation: {
    title: 'Digital Transformation Consultation | DFB Digital',
    description: 'A straight-talk audit of your business\'s digital gaps, plus a written, ranked plan to fix them. Start with a no-pressure discovery call.',
  },
  'digital-transformation-explained': {
    title: 'What Is Digital Transformation, Really? A Plain-English Guide | DFB Digital Blog',
    description: 'What digital transformation actually means, what it isn\'t, signs your business is due for it, and how to start without overhauling everything.',
  },
  'ai-automation-guide': {
    title: 'AI Automation for Established Businesses: What It Actually Means | DFB Digital Blog',
    description: 'A plain-English guide to AI automation for business owners — what it looks like day to day, what it is not, and where most businesses start.',
  },
  'modern-marketing-2026': {
    title: 'Modern Marketing for Established Businesses: What Actually Works Now | DFB Digital Blog',
    description: 'What modern marketing looks like for established businesses in the age of AI-powered search, and how to modernize without losing your brand voice.',
  },
  'rh-event-design': {
    title: 'RH Event Design | Strategic Partnership | DFB Digital',
    description: 'DFB Digital\'s strategic partner for luxury event design and full-service PR — RH Event Design, led by Reyna Harilela in Hong Kong.',
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
  pmasev: {
    title: 'For PMASEV Members | Free Digital Health Check | DFB Digital',
    description: 'Proud digital partner of PMASEV. Free 20-minute Digital Health Check for Filipino-American physicians — modern websites, SEO, and patient acquisition.',
  },
  dashboard: {
    title: 'Internal Dashboard | DFB Digital',
    description: 'Internal team dashboard.',
  },
  intake: {
    title: 'Welcome to DFB Digital — Let\'s Make It Official',
    description: 'Fill in our intake form and we\'ll kick off your project within 1 business day.',
  },
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'matchmaker' | 'eventlab' | 'instasite' | 'launchpad' | 'digitalstrategy' | 'socialmedia' | 'contentmarketing' | 'emailcrm' | 'aiautomations' | 'digitaltransformation' | 'about' | 'services' | 'our-work' | 'blog' | 'article-digital-insights' | 'article-boutique-strategy' | 'digital-transformation-explained' | 'ai-automation-guide' | 'modern-marketing-2026' | 'rh-event-design' | 'vip' | 'instasite-starter' | 'instasite-pro' | 'instasite-elite' | 'pmasev' | 'dashboard' | 'intake' | 'status'>('home');
  const [statusProjectGid, setStatusProjectGid] = useState<string>('');

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
      '/aiautomations': 'aiautomations',
      '/digitaltransformation': 'digitaltransformation',
      '/about': 'about',
      '/services': 'services',
      '/our-work': 'our-work',
      '/blog': 'blog',
      '/rh-event-design': 'rh-event-design',
      '/article-digital-insights': 'article-digital-insights',
      '/article-boutique-strategy': 'article-boutique-strategy',
      '/digital-transformation-explained': 'digital-transformation-explained',
      '/ai-automation-guide': 'ai-automation-guide',
      '/modern-marketing-2026': 'modern-marketing-2026',
      '/vip': 'vip',
      '/instasite/starter': 'instasite-starter',
      '/instasite/pro': 'instasite-pro',
      '/instasite/elite': 'instasite-elite',
      '/pmasev': 'pmasev',
      '/dashboard': 'dashboard',
      '/intake': 'intake',
    };

    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      // Dynamic /status/<gid> route — public client status page
      const statusMatch = pathname.match(/^\/status\/([A-Za-z0-9_-]+)$/);
      if (statusMatch) {
        setStatusProjectGid(statusMatch[1]);
        setCurrentPage('status');
        window.scrollTo(0, 0);
        return;
      }
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
    navigateTo(`/${articleId}`, articleId as typeof currentPage);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onBack={goToHome} />;
      case 'intake': return <Intake onBack={goToHome} />;
      case 'status': return <ClientStatus projectGid={statusProjectGid} onBack={goToHome} />;
      case 'pmasev': return <PMASEV onBack={goToHome} />;
      case 'vip': return <VIPAccess onBack={goToHome} />;
      case 'article-boutique-strategy': return <ArticleBoutiqueStrategy onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'article-digital-insights': return <ArticleDigitalInsights onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'rh-event-design': return <RHEventDesign onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'digital-transformation-explained': return <ArticleDigitalTransformationExplained onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'ai-automation-guide': return <ArticleAIAutomationGuide onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'modern-marketing-2026': return <ArticleModernMarketing onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'blog': return <Blog onBack={goToHome} onArticleClick={goToArticle} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'launchpad': return <LaunchPad onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'instasite-starter': return <InstaSiteStarter onBack={goToInstaSite} />;
      case 'instasite-pro': return <InstaSitePro onBack={goToInstaSite} />;
      case 'instasite-elite': return <InstaSiteElite onBack={goToInstaSite} />;
      case 'instasite': return <InstaSite onBack={goToHome} onNavigateDemo={goToInstaSiteDemo} />;
      case 'eventlab': return <EventLab onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'digitalstrategy': return <DigitalStrategy onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'socialmedia': return <SocialMediaMarketing onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'contentmarketing': return <ContentMarketing onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'emailcrm': return <EmailCRM onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'aiautomations': return <AIAutomations onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'digitaltransformation': return <DigitalTransformation onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'about': return <AboutPage onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'services': return <ServicesPage onBack={goToHome} onNavigate={goToServicePage} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'our-work': return <OurWorkPage onBack={goToHome} onBlogClick={goToBlog} onMatchmakerClick={goToMatchmaker} onServiceNavigate={goToServicePage} />;
      case 'matchmaker': return <Matchmaker onBack={goToHome} onNavigate={goToServicePage} onBlogClick={goToBlog} onServiceNavigate={goToServicePage} />;
      default:
        return (
          <div className="min-h-screen bg-brand-white selection:bg-brand-blue selection:text-white">
            <Navbar onMatchmakerClick={goToMatchmaker} onBlogClick={goToBlog} onHomeClick={goToHome} onServiceNavigate={goToServicePage} />
            <main>
              <Hero />
              <Trust />
              <WhyDFB />
              {/* <Reviews /> */}
              <FindYourFitPrompt onMatchmakerClick={goToMatchmaker} />
              <CTA />
            </main>
            <Footer onMatchmakerClick={goToMatchmaker} onBlogClick={goToBlog} onServiceNavigate={goToServicePage} />
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

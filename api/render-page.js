const fs = require('fs');
const path = require('path');

const BOT_UA = /viber|whatsapp|facebookexternalhit|twitterbot|telegrambot|linkedinbot|slackbot|discordbot|googlebot|bingbot|yandexbot|baiduspider|duckduckbot|pinterestbot|redditbot/i;

const defaultMeta = {
  title: 'DFB Digital | Boutique Digital Consultancy for Web Development & Marketing Strategy',
  description: 'Boutique digital consultancy for established business owners. We build systems for clarity, structure, and long-term execution.',
};

const pageMeta = {
  '/instasite': {
    title: 'InstaSite | A Professional Web Presence — Delivered Fast | DFB Digital',
    description: 'A professional web presence — delivered fast. No coding, no complexity. Just a clean, polished site built for you.',
  },
  '/eventlab': {
    title: 'Event Lab | High-Impact Event Websites | DFB Digital',
    description: 'High-impact event websites that inform, engage, and convert. Built to make your event unforgettable online.',
  },
  '/launchpad': {
    title: 'LaunchPad | Full Website Solutions for Growing Businesses | DFB Digital',
    description: 'A full website solution for businesses ready to grow. Strategy, design, and development — all in one.',
  },
  '/blog': {
    title: 'Blog | Insights & Resources | DFB Digital',
    description: 'Practical perspectives on digital strategy, marketing, and building businesses that last.',
  },
  '/matchmaker': {
    title: 'Get Matched | Find the Right Service for You | DFB Digital',
    description: 'Answer a few questions and get matched to the DFB Digital service that fits your needs.',
  },
  '/digitalstrategy': {
    title: 'Digital Strategy & Campaign Planning | DFB Digital',
    description: 'Comprehensive strategies for online presence and customer acquisition. Built for businesses ready to grow.',
  },
  '/socialmedia': {
    title: 'Social Media Marketing | DFB Digital',
    description: 'Strategic social media management that builds audience and drives engagement.',
  },
  '/contentmarketing': {
    title: 'Content Marketing | DFB Digital',
    description: 'Compelling content strategies that tell your brand story and attract your ideal audience.',
  },
  '/emailcrm': {
    title: 'Email & CRM-Based Marketing | DFB Digital',
    description: 'Nurture leads and retain customers with precision email and CRM campaigns.',
  },
  '/article-digital-insights': {
    title: 'Digital Insights for Modern Businesses | DFB Digital Blog',
    description: 'Practical digital insights for business owners navigating strategy, marketing, and growth.',
  },
  '/article-boutique-strategy': {
    title: 'The Boutique Strategy Advantage | DFB Digital Blog',
    description: 'Why boutique digital consultancy delivers more impact than big-agency overhead.',
  },
  '/vip': {
    title: 'VIP Access | DFB Digital',
    description: 'Exclusive access for DFB Digital VIP clients.',
  },
};

module.exports = (req, res) => {
  const pagePath = req.url.split('?')[0];
  const ua = req.headers['user-agent'] || '';
  const isBot = BOT_UA.test(ua);

  // Read the built index.html
  let html;
  try {
    html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'), 'utf-8');
  } catch {
    try {
      html = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8');
    } catch {
      // Last resort: serve a redirect to root
      res.writeHead(302, { Location: '/' });
      res.end();
      return;
    }
  }

  if (isBot) {
    const meta = pageMeta[pagePath] || defaultMeta;
    const ogUrl = `https://www.dfbdigital.com${pagePath}`;

    // Replace title
    html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);

    // Replace meta description
    html = html.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${meta.description}"`
    );

    // Replace OG tags
    html = html.replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${meta.title}"`
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${meta.description}"`
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${ogUrl}"`
    );

    // Replace Twitter tags
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${meta.title}"`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${meta.description}"`
    );

    // Replace canonical URL
    html = html.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${ogUrl}"`
    );
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
};

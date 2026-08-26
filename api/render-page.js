import { readFileSync } from 'fs';
import { join } from 'path';

const BOT_UA = /viber|whatsapp|facebookexternalhit|twitterbot|telegrambot|linkedinbot|slackbot|discordbot|googlebot|bingbot|yandexbot|baiduspider|duckduckbot|pinterestbot|redditbot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|anthropic-ai|perplexitybot|perplexity-user|google-extended|ccbot|applebot|amazonbot|bytespider|meta-externalagent|diffbot/i;

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
    title: 'Into the Bucket | Clear Thinking on Digital | DFB Digital',
    description: 'Clear thinking on digital for decision-makers. Insights, strategy, and perspectives from DFB Digital.',
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
  '/aiautomations': {
    title: 'AI Automations | Save Time on Repetitive Work | DFB Digital',
    description: 'Automate follow-ups, scheduling, and reporting without hiring or coding. Plain-language AI automation for established businesses.',
  },
  '/digitaltransformation': {
    title: 'Digital Transformation Consultation | DFB Digital',
    description: 'A straight-talk audit of your business\'s digital gaps, plus a written, ranked plan to fix them. Start with a no-pressure discovery call.',
  },
  '/digital-transformation-explained': {
    title: 'What Is Digital Transformation, Really? A Plain-English Guide | DFB Digital Blog',
    description: 'What digital transformation actually means, what it isn\'t, signs your business is due for it, and how to start without overhauling everything.',
  },
  '/ai-automation-guide': {
    title: 'AI Automation for Established Businesses: What It Actually Means | DFB Digital Blog',
    description: 'A plain-English guide to AI automation for business owners — what it looks like day to day, what it is not, and where most businesses start.',
  },
  '/modern-marketing-2026': {
    title: 'Modern Marketing for Established Businesses: What Actually Works Now | DFB Digital Blog',
    description: 'What modern marketing looks like for established businesses in the age of AI-powered search, and how to modernize without losing your brand voice.',
  },
  '/rh-event-design': {
    title: 'RH Event Design | Strategic Partnership | DFB Digital',
    description: 'DFB Digital\'s strategic partner for luxury event design and full-service PR — RH Event Design, led by Reyna Harilela in Hong Kong.',
  },
  '/about': {
    title: 'About DFB Digital | Founder & Approach',
    description: 'Meet Daddy FunBuckets, Founder of DFB Digital — 12+ years of digital marketing and strategy experience across Asia, the Middle East, and global markets.',
  },
  '/services': {
    title: 'All Services | DFB Digital',
    description: 'Web development, digital marketing, and digital consultancy — built for established businesses who want a plan, not guesswork.',
  },
  '/our-work': {
    title: 'Our Work | Client Roster | DFB Digital',
    description: 'A look at who DFB Digital works with, and what we\'ve built for them.',
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
  '/pmasev': {
    title: 'For PMASEV Members | Free Digital Health Check | DFB Digital',
    description: 'Proud digital partner of PMASEV. Free 20-minute Digital Health Check for Filipino-American physicians — modern websites, SEO, and patient acquisition.',
  },
  '/intake': {
    title: 'Welcome to DFB Digital — Let\'s Make It Official',
    description: 'Client intake form. Fill in your details and we\'ll kick off your project within 1 business day.',
  },
};

// Real, crawlable text content for bots that don't execute JavaScript (AI answer
// engines, most search indexers on first pass). Keep this in sync with the
// matching React component's copy — it is a deliberate content duplication,
// not a shortcut, since the SPA body is empty until React hydrates.
const pageContent = {
  '/aiautomations': {
    h1: 'AI Automations: Get Your Time Back',
    intro: 'AI Automations quietly handle the repetitive work in your business — replying, scheduling, follow-ups, data entry — so you and your team spend time on customers, not admin.',
    sections: [
      { h2: 'What This Actually Means', p: 'No new software to learn. No dashboards to check. It runs quietly inside the tools you already use — email, calendar, CRM, invoicing.' },
      { h2: "What It's Built For", p: "Fewer dropped follow-ups. Hours back in your week. We'll show you the real time cost first, and give you a straight estimate — not a marketing number." },
      { h2: 'How We Build It', p: "We watch how your business works, map the repetitive parts, then build and test it with you. Nothing goes live until you've seen it work." },
    ],
    faq: [
      { q: 'Will AI automation replace my employees?', a: 'No. Well-built automation removes repetitive admin so your existing team spends time on customers instead of busywork.' },
      { q: 'Is AI automation expensive?', a: 'It scales to what you automate. We find the real time cost of your manual process first, then give a straight estimate.' },
      { q: 'How do I know what to automate first?', a: 'Start with whatever repeats every day and never changes: appointment reminders, lead follow-ups, invoice chasing, data entry between systems.' },
    ],
  },
  '/digitaltransformation': {
    h1: 'Digital Transformation Consultation: A Clear Plan for Catching Up, Without Starting Over',
    intro: 'A one-on-one review of where your business stands digitally, and a straight-talk roadmap for what to fix first, second, and never.',
    sections: [
      { h2: 'What You Get', p: "A written, plain-English assessment of your website, systems, and processes. What's working. What's costing you customers. What to leave alone." },
      { h2: 'How It Works', p: 'A working session directly with Daddy FunBuckets, Founder. A written roadmap, ranked by impact and cost. You choose what to act on — nothing is bundled.' },
      { h2: 'Who It\'s For', p: "Established business owners who know something needs to change but don't have time to sort hype from what's real." },
    ],
    faq: [
      { q: 'What is digital transformation in simple terms?', a: "Using digital tools to run your business better — clearer websites, less manual admin, decisions based on real data instead of guesswork." },
      { q: 'Do I need to replace all my systems?', a: 'No. Most businesses keep most of what already works and fix the part that is actually costing them time or customers.' },
    ],
  },
  '/digital-transformation-explained': {
    h1: 'What Is Digital Transformation, Really? A Plain-English Guide',
    intro: '"Digital transformation" gets used to sell almost anything. Here is what it actually means, without the sales pitch.',
    sections: [
      { h2: 'The Plain Definition', p: "Digital transformation is using digital tools to run your business with less friction. A clearer website. Fewer manual steps. Decisions based on what's actually happening, not what you assume is happening. It's not a single project with an end date — it's an ongoing habit." },
      { h2: "What It's Not", p: "It's not buying new software and hoping it fixes things. It's not a website redesign for its own sake. It's not about looking modern — it's about running better." },
      { h2: 'Signs Your Business Is Due For It', p: 'Your team re-types the same information into more than one system. You genuinely don\'t know which marketing efforts are working. Your website hasn\'t meaningfully changed in years, but your business has.' },
      { h2: 'How to Start Without Overhauling Everything', p: "Start with an honest, written assessment — not a sales pitch. Rank what's found by impact and cost, then choose what to act on. Nothing bundled, nothing assumed." },
    ],
    faq: [
      { q: 'What is digital transformation in simple terms?', a: "It's the process of using digital tools and systems to run your business better — clearer websites, less manual admin, and decisions based on real data instead of guesswork. It's not one product you buy; it's an ongoing way of operating." },
      { q: 'Do I need to replace all my systems to "do" digital transformation?', a: "No. Most businesses keep 80% of what already works and fix the 20% that's actually costing them time or customers." },
      { q: 'How long does digital transformation take?', a: 'A written assessment and roadmap typically takes days, not months. Implementing it is staged, at a pace that fits your business.' },
      { q: 'Is digital transformation just about AI?', a: 'No. AI and automation are often part of it, but it also covers your website, customer data, marketing systems, and how your team works day to day.' },
      { q: 'How much does digital transformation cost?', a: "It depends on what's found and what you choose to act on, because nothing is bundled. The starting point is a plain-English assessment, not a fixed-price package." },
    ],
  },
  '/ai-automation-guide': {
    h1: 'AI Automation for Established Businesses: What It Actually Means',
    intro: 'For an established business owner, "AI" often sounds like either a toy or a threat. In practice it is neither — it is a way to stop doing the same manual steps every single day.',
    sections: [
      { h2: 'What It Looks Like Day-to-Day', p: 'Software that reads, sorts, and responds to routine tasks that would otherwise sit on someone\'s desk: a lead form that gets an instant reply, a reminder that goes out before a no-show, an invoice that chases itself. It runs inside tools you already use.' },
      { h2: "What It's Not", p: "It's not a chatbot bolted onto your website for its own sake. It's not set-it-and-forget-it magic. It's not a replacement for your team — it's a way to give them their time back." },
      { h2: 'Where Most Businesses Start', p: 'Lead and client follow-ups that currently get missed or delayed. Appointment scheduling and reminders. Data entry between systems that don\'t talk to each other.' },
    ],
    faq: [
      { q: 'Will AI automation replace my employees?', a: 'No. Well-built automation removes repetitive admin — replying, scheduling, data entry — so your existing team spends time on customers instead of busywork.' },
      { q: 'Is AI automation expensive?', a: 'It scales to what you automate. The right way to start is by finding the specific time cost of your current manual process first, then getting a straight estimate.' },
      { q: "What's the difference between AI automation and just using ChatGPT?", a: 'Using a chatbot is one person typing questions into a browser tab. Automation is a system that runs in the background of tools you already use, without anyone having to remember to open an app.' },
      { q: 'How do I know what to automate first?', a: "Start with whatever repeats every single day and never changes: appointment reminders, lead follow-ups, invoice chasing, data entry between systems." },
      { q: 'Is my business too small for AI automation?', a: 'No — small and boutique businesses often benefit most, since there is no large admin team to absorb the repetitive work.' },
    ],
  },
  '/modern-marketing-2026': {
    h1: 'Modern Marketing for Established Businesses: What Actually Works Now',
    intro: 'Most marketing advice is written for startups trying to get noticed. Established businesses have a different problem: staying credible while everything around them moves.',
    sections: [
      { h2: 'Why Old Playbooks Are Losing Effectiveness', p: "Posting more, everywhere, used to be enough to stand out. It isn't anymore. What's replaced volume is trust: proof, consistency, and a clear, plain-spoken message." },
      { h2: "What's Actually Working Now", p: 'Consistent content on one or two channels, not scattered effort everywhere. Real proof — named clients, specific results — over generic claims. Direct, plain-English messaging. Email and CRM follow-up that actually nurtures leads.' },
      { h2: 'The Rise of AI-Powered Search', p: 'A growing share of people now ask AI tools questions directly instead of searching and clicking through ten links. Those tools answer using content they can clearly read and trust. If your website does not explain, in plain language, what you do and who it is for, you will not show up in those answers.' },
    ],
    faq: [
      { q: 'Is social media still worth it for established businesses?', a: 'Yes, but as consistency, not volume. A steady, focused presence on one or two platforms beats scattered effort across five.' },
      { q: 'What is AI search and why does it matter for marketing?', a: 'More people now ask AI tools like ChatGPT or Perplexity questions instead of typing them into Google. Those tools answer using clear, well-structured content they can find and quote.' },
      { q: 'Do I need to be on every platform?', a: 'No. Being everywhere thinly is worse than being somewhere consistently.' },
      { q: 'How do I compete with big-budget marketing?', a: 'Established businesses compete on trust and proof, not ad spend. A real testimonial with a real name and a real result outperforms a bigger budget with generic claims.' },
      { q: "What's the first step to modernizing our marketing?", a: 'An honest audit of what is actually working today versus what you assume is working.' },
    ],
  },
  '/rh-event-design': {
    h1: 'RH Event Design: Strategic Partnership',
    intro: 'RH Event Design is a Hong Kong-based luxury event design and full-service PR firm, led by Reyna Harilela, and DFB Digital\'s partner for the digital side of their work.',
    sections: [
      { h2: 'About RH Event Design', p: 'RH Event Design is led by Reyna Harilela, who brings over 20 years of experience in PR and event production. The firm works with what it describes as "the world\'s most desirable brands." Based in Hong Kong, RH Event Design is known for society events, brand activations, and private celebrations.' },
      { h2: 'What They Do', p: 'Media relations, brand activations, digital communications, society events, content creation, reputation management, and private celebrations.' },
      { h2: 'Notable Work', p: 'Guest curation and full event design for CALËO Fine Jewellery\'s VIP launch at The Hari, Hong Kong.' },
      { h2: 'Why We Partner', p: 'RH Event Design brings the relationships, taste, and event execution. DFB Digital brings the websites, digital strategy, and systems that carry that same level of polish online.' },
    ],
  },
  '/about': {
    h1: 'About DFB Digital',
    intro: 'DFB Digital is led by Daddy FunBuckets (Founder, DFB Digital), a digital marketing and strategy consultant with 12+ years of experience working across Asia, the Middle East, and global markets.',
    sections: [
      { h2: 'Our Approach', p: "No jargon, no guesswork. We look at how your business actually runs, tell you plainly what's costing you time or money, and fix it." },
      { h2: 'Strategic Partnership', p: 'DFB Digital partners with RH Event Design, a Hong Kong-based luxury event design and full-service PR firm, for the digital side of their work.' },
    ],
  },
  '/services': {
    h1: 'All Services',
    intro: 'Web development, digital marketing, and digital consultancy — built for established businesses who want a plan, not guesswork.',
    sections: [
      { h2: 'Web Development', p: 'Event Lab, InstaSite, and LaunchPad — precision-built digital properties engineered for your goals.' },
      { h2: 'Digital Marketing', p: 'Digital Strategy & Campaign Planning, Social Media Marketing, Content Marketing, and Email & CRM-Based Marketing.' },
      { h2: 'Digital Consultancy', p: 'AI Automations, Digital Transformation Consultation, One-on-One Coaching, Speaking Engagements, and Podcast Appearances.' },
    ],
  },
  '/our-work': {
    h1: 'Our Work: Client Roster',
    intro: "A look at who DFB Digital works with, and what we've built for them.",
    sections: [
      { h2: 'Professor Derek Burton Collins', p: 'Website design, newsletter setup, and social media strategy — 200% growth in Instagram followers.' },
      { h2: 'Dante Alighieri Society, Hong Kong', p: 'Building a custom CMS-powered website for faster, easier content management.' },
      { h2: 'Casa Verde Townhomes', p: 'Full website design and development.' },
      { h2: 'Aldeon Luxury Suites', p: 'Custom website design and development.' },
    ],
  },
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'DFB Digital',
  url: 'https://www.dfbdigital.com',
  email: 'hello@dfbdigital.com',
  founder: { '@type': 'Person', name: 'Daddy FunBuckets', jobTitle: 'Founder & Digital Marketing Strategist' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit B, 11/F Yam Tze Comm Bldg, 23 Thomson Rd',
    addressLocality: 'Wan Chai',
    addressCountry: 'HK',
  },
};

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  const pagePath = req.url.split('?')[0];
  const ua = req.headers['user-agent'] || '';
  const isBot = BOT_UA.test(ua);

  if (isBot) {
    // Serve real, crawlable HTML for bots that don't execute JavaScript —
    // both social-preview bots and AI/search crawlers.
    const meta = pageMeta[pagePath] || defaultMeta;
    const content = pageContent[pagePath];
    const ogUrl = `https://www.dfbdigital.com${pagePath}`;
    const ogImage = 'https://www.dfbdigital.com/og-image.png';

    const jsonLd = [ORG_JSON_LD];
    let bodyHtml = `<h1>${escapeHtml(meta.title)}</h1>\n<p>${escapeHtml(meta.description)}</p>`;

    if (content) {
      const sectionsHtml = content.sections
        .map((s) => `<section><h2>${escapeHtml(s.h2)}</h2><p>${escapeHtml(s.p)}</p></section>`)
        .join('\n');
      const faqHtml = content.faq
        ? `<section><h2>Frequently Asked Questions</h2>${content.faq
            .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
            .join('\n')}</section>`
        : '';
      bodyHtml = `<h1>${escapeHtml(content.h1)}</h1>\n<p>${escapeHtml(content.intro)}</p>\n${sectionsHtml}\n${faqHtml}`;

      if (content.faq) {
        jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        });
      }
      if (pagePath.startsWith('/digital-transformation-explained') || pagePath.startsWith('/ai-automation-guide') || pagePath.startsWith('/modern-marketing-2026')) {
        jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: content.h1,
          description: meta.description,
          author: { '@type': 'Organization', name: 'DFB Digital' },
          publisher: { '@type': 'Organization', name: 'DFB Digital' },
          mainEntityOfPage: ogUrl,
        });
      }
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${ogUrl}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/png">
  <meta property="og:site_name" content="DFB Digital">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="canonical" href="${ogUrl}">
  ${jsonLd.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n  ')}
</head>
<body>
  ${bodyHtml}
  <p><a href="https://www.dfbdigital.com/">Back to DFB Digital</a></p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(html);
  }

  // For regular users, serve the built index.html directly from disk.
  // Deliberately NOT a self-referential network fetch: if this deployment has
  // Deployment Protection (SSO) enabled, an outbound fetch back to its own
  // domain gets caught by the same protection and returns the Vercel auth
  // page instead of the app — which this function would then unknowingly
  // serve to the real visitor as if it were the site.
  try {
    const html = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } catch (err) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}

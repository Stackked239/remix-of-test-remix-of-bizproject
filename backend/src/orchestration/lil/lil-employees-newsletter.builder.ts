/**
 * LIL Pipeline — Employees Report Newsletter Builder
 * 
 * Generates a warm, celebratory employee newsletter instead of the
 * standard analysis-report format. This builder reads from the IDM
 * (Phase 4 output) and applies content safeguards to ensure no
 * negative, financial, or risk-related content reaches employees.
 * 
 * Architecture:
 *   IDM (LILIDMOutput) → Data Mapping → Newsletter HTML
 *   
 * Content Safeguards:
 *   - No weaknesses, threats, or SWOT language
 *   - No financial metrics (revenue, profit, cash flow)
 *   - No risk assessments or compliance language
 *   - Low scores reframed as positive growth opportunities
 *   - Score threshold: only show categories ≥ 60 as "wins"
 */

import { logger } from '../../utils/logger.js';
import {
  LILIDMOutput,
  LILPhase4_5Output,
  LILGeneratedReport,
  LILBusinessOverview,
  LILCategoryAnalysis
} from '../../types/lil-pipeline.types.js';
import { CategoryCode } from '../../data/question-category-mapping-lil.js';
import {
  extractNumericValueSafe,
  extractStringSafe
} from '../../utils/safety.utils.js';

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT SAFEGUARDS
// ═══════════════════════════════════════════════════════════════════════════

const EMPLOYEES_REPORT_PROHIBITED_WORDS = [
  'weakness', 'weaknesses', 'threat', 'threats', 'SWOT',
  'risk assessment', 'mitigation', 'KPI', 'BLUF', 'Bottom Line Up Front',
  'confidential', 'authorized recipients', 'revenue', 'profit margin',
  'cash flow', 'runway', 'burn rate', 'cost reduction',
  'priority: high', 'priority: medium', 'priority: low',
  'implementation roadmap', 'deploy', 'enterprise resource planning'
];

function scanEmployeesReport(html: string): string[] {
  const violations: string[] = [];
  for (const word of EMPLOYEES_REPORT_PROHIBITED_WORDS) {
    if (html.toLowerCase().includes(word.toLowerCase())) {
      violations.push(`Prohibited content detected: "${word}"`);
    }
  }
  return violations;
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA MAPPING — IDM → Newsletter Sections
// ═══════════════════════════════════════════════════════════════════════════

interface NewsletterData {
  companyName: string;
  editionDate: string;
  employeeCount: number;
  industry: string;
  yearsInBusiness: number;

  bigWins: Array<{
    icon: string;
    title: string;
    categoryName: string;
    score: number;
    teamCredit: string;
  }>;

  strengths: Array<{
    icon: string;
    title: string;
    description: string;
    score: number;
    benchmarkComparison: string;
    employeeImpact: string;
  }>;

  growthIdeas: Array<{
    icon: string;
    title: string;
    description: string;
    benefitForYou: string;
    benefitForUs: string;
  }>;

  comingSoon: Array<{
    icon: string;
    title: string;
    description: string;
    howYouCanHelp: string;
    whatSuccessLooksLike: string;
  }>;

  positiveBenchmarks: Array<{
    metric: string;
    badge: string;
  }>;

  closingMessage: string;
}

const WIN_ICONS = ['🏆', '⭐', '🎯', '🌟', '💎'];
const STRENGTH_ICONS = ['💪', '🤝', '🚀', '💡', '🎖️'];
const GROWTH_ICONS = ['🌱', '📚', '🤝', '🔧', '🌈'];
const INVESTMENT_ICONS = ['🚀', '💡', '🎯', '⚡', '🌟'];

const CATEGORY_FRIENDLY_NAMES: Record<string, string> = {
  STR: 'Strategy & Planning',
  SAL: 'Sales Performance',
  MKT: 'Marketing & Outreach',
  CXP: 'Customer Experience',
  OPS: 'Operations & Efficiency',
  FIN: 'Financial Management',
  HRS: 'People & Culture',
  LDG: 'Leadership & Growth',
  TIN: 'Technology & Innovation',
  ITD: 'IT & Digital Systems',
  RMS: 'Risk Management',
  CMP: 'Compliance & Standards'
};

const CATEGORY_WIN_TITLES: Record<string, string> = {
  STR: 'Strategic Vision Champions',
  SAL: 'Sales Superstars',
  MKT: 'Marketing Excellence',
  CXP: 'Customer Experience Leaders',
  OPS: 'Operational Excellence',
  FIN: 'Financial Strength',
  HRS: 'Amazing Team Culture',
  LDG: 'Strong Leadership',
  TIN: 'Tech-Forward Innovators',
  ITD: 'Digital Infrastructure Pros',
  RMS: 'Risk-Ready & Resilient',
  CMP: 'Compliance Champions'
};

const GROWTH_REFRAMES: Record<string, { title: string; description: string; benefitForYou: string; benefitForUs: string }> = {
  STR: {
    title: 'Building Our Strategic Vision',
    description: "We're exploring ways to sharpen our strategic direction and planning capabilities.",
    benefitForYou: 'Clearer goals mean you always know where we\'re headed',
    benefitForUs: 'A more focused, aligned team working toward shared objectives'
  },
  SAL: {
    title: 'Growing Our Sales Capabilities',
    description: "We're investing in new approaches to connect with more customers.",
    benefitForYou: 'New skills and tools to help you succeed',
    benefitForUs: 'More opportunities and a stronger market presence'
  },
  MKT: {
    title: 'Expanding Our Reach',
    description: "We're looking at fresh ways to tell our story and reach new audiences.",
    benefitForYou: 'Be part of exciting new marketing initiatives',
    benefitForUs: 'Greater brand recognition and customer awareness'
  },
  CXP: {
    title: 'Elevating Customer Delight',
    description: "We're finding new ways to make every customer interaction exceptional.",
    benefitForYou: 'Better tools and processes to serve customers',
    benefitForUs: 'Happier customers who love working with us'
  },
  OPS: {
    title: 'Streamlining How We Work',
    description: "We're looking for ways to make our day-to-day work smoother and more efficient.",
    benefitForYou: 'Less friction, more time for meaningful work',
    benefitForUs: 'A more productive, less stressful workplace'
  },
  FIN: {
    title: 'Strengthening Our Foundation',
    description: "We're building stronger financial practices to support our growth.",
    benefitForYou: 'Greater stability and confidence in our future',
    benefitForUs: 'More resources to invest in our team and tools'
  },
  HRS: {
    title: 'Investing in Our People',
    description: "We're exploring new ways to support your growth and well-being.",
    benefitForYou: 'More development opportunities and better support',
    benefitForUs: 'A happier, more engaged team'
  },
  LDG: {
    title: 'Growing Together as Leaders',
    description: "We're building leadership capabilities at every level of our team.",
    benefitForYou: 'Opportunities to develop your leadership skills',
    benefitForUs: 'Stronger decision-making across the organization'
  },
  TIN: {
    title: 'Embracing New Technology',
    description: "We're exploring innovative tools and technologies to work smarter.",
    benefitForYou: 'Access to modern tools that make your job easier',
    benefitForUs: 'A more innovative, competitive team'
  },
  ITD: {
    title: 'Upgrading Our Digital Tools',
    description: "We're investing in better systems and infrastructure for everyone.",
    benefitForYou: 'Faster, more reliable tools to do your best work',
    benefitForUs: 'A more connected, efficient organization'
  },
  RMS: {
    title: 'Building Our Resilience',
    description: "We're strengthening our ability to handle whatever comes our way.",
    benefitForYou: 'Greater peace of mind and preparedness',
    benefitForUs: 'A more resilient organization ready for any challenge'
  },
  CMP: {
    title: 'Raising Our Standards',
    description: "We're working to ensure we meet and exceed industry standards.",
    benefitForYou: 'Pride in working for a company that does things right',
    benefitForUs: 'Stronger reputation and trust with our customers'
  }
};

const EMPLOYEE_IMPACT_PHRASES: Record<string, string> = {
  STR: 'This means clearer direction and purpose in everything we do.',
  SAL: 'This means more customers choosing us and a growing business.',
  MKT: 'This means more people know about the great work we do.',
  CXP: 'This means our customers love working with us — and that reflects on you.',
  OPS: 'This means smoother processes and less daily frustration.',
  FIN: 'This means a stable foundation that supports your growth.',
  HRS: 'This means a workplace where you feel valued and supported.',
  LDG: 'This means strong guidance and clear communication from leadership.',
  TIN: 'This means better tools and smarter ways to get things done.',
  ITD: 'This means reliable systems that help you work efficiently.',
  RMS: 'This means we\'re prepared for challenges and you can focus on your work.',
  CMP: 'This means we operate with integrity and you can be proud of where you work.'
};

function mapIDMToNewsletterData(
  idmOutput: LILIDMOutput,
  businessOverview: LILBusinessOverview
): NewsletterData {
  const companyName = extractStringSafe(idmOutput.companyProfile?.name, businessOverview.companyName || 'Our Company');
  const industry = extractStringSafe(idmOutput.companyProfile?.industry, businessOverview.industry || 'Business');
  const yearsInBusiness = extractNumericValueSafe(idmOutput.companyProfile?.yearsInBusiness, 0);
  
  const workforce = businessOverview.workforce || {};
  const employeeCount = 
    extractNumericValueSafe(workforce.fullTimeEmployees, 0) +
    extractNumericValueSafe(workforce.partTimeEmployees, 0) +
    extractNumericValueSafe(workforce.contractors, 0) +
    extractNumericValueSafe(workforce.executiveLeadership, 0) +
    extractNumericValueSafe(workforce.supportAdmin, 0);

  const editionDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get all categories sorted by score (descending)
  const categoryEntries = Object.entries(idmOutput.categoryData || {})
    .map(([code, data]) => ({
      code: code as CategoryCode,
      score: extractNumericValueSafe(data?.score, 0),
      data: data as LILCategoryAnalysis
    }))
    .sort((a, b) => b.score - a.score);

  // BIG WINS: Top 3 categories with score >= 60 (or >= 50 if fewer than 2 qualify)
  let winThreshold = 60;
  let winCandidates = categoryEntries.filter(c => c.score >= winThreshold);
  if (winCandidates.length < 2) {
    winThreshold = 50;
    winCandidates = categoryEntries.filter(c => c.score >= winThreshold);
  }
  const bigWins = winCandidates.slice(0, 3).map((cat, i) => ({
    icon: WIN_ICONS[i % WIN_ICONS.length],
    title: CATEGORY_WIN_TITLES[cat.code] || `${CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code} Excellence`,
    categoryName: CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code,
    score: cat.score,
    teamCredit: `Your hard work has helped us achieve ${cat.score >= 70 ? 'outstanding' : 'strong'} results in ${(CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code).toLowerCase()}.`
  }));

  // If still no wins, create general company wins
  if (bigWins.length === 0) {
    bigWins.push({
      icon: '🏆',
      title: 'Building Something Great',
      categoryName: 'Team Achievement',
      score: 0,
      teamCredit: yearsInBusiness > 0
        ? `${yearsInBusiness} years of dedication and growth — that's something to celebrate!`
        : 'Every day we show up and give our best is a win worth celebrating.'
    });
  }

  // STRENGTHS: Top 4-5 categories with score >= 50
  const strengthCandidates = categoryEntries.filter(c => c.score >= 50);
  const strengths = strengthCandidates.slice(0, 5).map((cat, i) => {
    const benchmarkLabel = cat.data?.benchmarkComparison === 'above'
      ? 'Above industry average'
      : cat.data?.benchmarkComparison === 'at'
        ? 'Meeting industry standards'
        : 'Building strength';
    
    return {
      icon: STRENGTH_ICONS[i % STRENGTH_ICONS.length],
      title: CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code,
      description: (cat.data?.strengths && cat.data.strengths.length > 0)
        ? cat.data.strengths[0]
        : `We're performing well in ${(CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code).toLowerCase()}.`,
      score: cat.score,
      benchmarkComparison: benchmarkLabel,
      employeeImpact: EMPLOYEE_IMPACT_PHRASES[cat.code] || 'This contributes to our overall success as a team.'
    };
  });

  // GROWTH IDEAS: Bottom 2-3 categories, positively reframed (NEVER expose low scores)
  const growthCandidates = [...categoryEntries].reverse().slice(0, 3);
  const growthIdeas = growthCandidates.map((cat, i) => {
    const reframe = GROWTH_REFRAMES[cat.code] || {
      title: `Building Our ${CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code}`,
      description: "We're exploring ways to strengthen this area.",
      benefitForYou: 'New opportunities for growth and development',
      benefitForUs: 'A stronger, more capable team'
    };
    return {
      icon: GROWTH_ICONS[i % GROWTH_ICONS.length],
      title: reframe.title,
      description: reframe.description,
      benefitForYou: reframe.benefitForYou,
      benefitForUs: reframe.benefitForUs
    };
  });

  // COMING SOON: Top 2-3 recommendations reframed as investments
  const allRecommendations: Array<{ title: string; description: string; categoryCode: string }> = [];
  for (const [code, catData] of Object.entries(idmOutput.categoryData || {})) {
    const recs = (catData as LILCategoryAnalysis)?.recommendations || [];
    for (const rec of recs.slice(0, 1)) { // Take top rec from each category
      allRecommendations.push({
        title: extractStringSafe(rec.title, ''),
        description: extractStringSafe(rec.description, ''),
        categoryCode: code
      });
    }
  }
  const comingSoon = allRecommendations
    .filter(r => r.title && !EMPLOYEES_REPORT_PROHIBITED_WORDS.some(w => r.title.toLowerCase().includes(w.toLowerCase())))
    .slice(0, 3)
    .map((rec, i) => ({
      icon: INVESTMENT_ICONS[i % INVESTMENT_ICONS.length],
      title: rec.title.replace(/risk|mitigat|compliance gap/gi, 'improvement'),
      description: rec.description.replace(/risk|mitigat|compliance gap/gi, 'opportunity'),
      howYouCanHelp: 'Share your ideas and feedback as we roll this out.',
      whatSuccessLooksLike: 'A stronger, more capable team ready for what\'s next.'
    }));

  // BENCHMARKS: Only positive ones
  const positiveBenchmarks = categoryEntries
    .filter(c => c.data?.benchmarkComparison === 'above' || c.data?.benchmarkComparison === 'at')
    .slice(0, 3)
    .map(cat => ({
      metric: CATEGORY_FRIENDLY_NAMES[cat.code] || cat.code,
      badge: cat.data?.benchmarkComparison === 'above' ? 'Above Average' : 'Strong'
    }));

  // CLOSING MESSAGE
  const closingMessage = `Every single one of you contributes to making ${companyName} the company it is today. We're proud of what we've accomplished together, and we're excited about what's ahead. Thank you for your dedication, your creativity, and your commitment to excellence.`;

  return {
    companyName,
    editionDate,
    employeeCount,
    industry,
    yearsInBusiness,
    bigWins,
    strengths,
    growthIdeas,
    comingSoon,
    positiveBenchmarks,
    closingMessage
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// NEWSLETTER HTML TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

function buildNewsletterHTML(data: NewsletterData): string {
  const isSolopreneur = data.employeeCount <= 1;

  // Build sections
  const heroSection = buildHeroSection(data);
  const welcomeSection = buildWelcomeSection(data, isSolopreneur);
  const bigWinsSection = buildBigWinsSection(data);
  const strengthsSection = buildStrengthsSection(data);
  const growthSection = data.growthIdeas.length > 0 ? buildGrowthSection(data) : '';
  const comingSoonSection = data.comingSoon.length > 0 ? buildComingSoonSection(data) : '';
  const benchmarksSection = data.positiveBenchmarks.length >= 2 ? buildBenchmarksSection(data) : '';
  const closingSection = buildClosingSection(data);
  const footerSection = buildFooterSection(data);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="BizHealth.ai Newsletter Generator">
  <meta name="robots" content="noindex, nofollow">
  <title>${data.companyName} — Team Update</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --biz-navy: #212653;
      --biz-green: #969423;
      --warm-gold: #E8B54D;
      --warm-bg: #FDF8F0;
      --light-bg: #F8F9FA;
      --success-green: #4CAF50;
      --text-primary: #333333;
      --text-secondary: #666666;
      --text-light: #888888;
      --card-shadow: 0 4px 16px rgba(0,0,0,0.08);
      --card-hover: 0 8px 24px rgba(0,0,0,0.12);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 18px;
      line-height: 1.7;
      color: var(--text-primary);
      background: #f0f0f0;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5 {
      font-family: 'Montserrat', sans-serif;
      line-height: 1.3;
    }

    /* Newsletter Container */
    .newsletter-container {
      max-width: 900px;
      margin: 30px auto;
      background: var(--warm-bg);
      border-radius: 20px;
      box-shadow: var(--card-shadow);
      overflow: hidden;
    }

    /* Hero Header */
    .newsletter-hero {
      background: linear-gradient(135deg, var(--biz-navy) 0%, #2d3a6d 100%);
      padding: 3.5rem 2.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .newsletter-hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 60%;
      height: 200%;
      background: rgba(255,255,255,0.03);
      transform: rotate(15deg);
      pointer-events: none;
    }

    .newsletter-hero .hero-emoji {
      font-size: 3rem;
      display: block;
      margin-bottom: 12px;
    }

    .newsletter-hero h1 {
      color: white;
      font-size: 2.75rem;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .newsletter-hero .company-name {
      color: var(--warm-gold);
      font-size: 1.75rem;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 8px;
    }

    .newsletter-hero .edition-date {
      color: rgba(255,255,255,0.8);
      font-size: 1rem;
      margin-bottom: 12px;
    }

    .newsletter-hero .tagline {
      color: rgba(255,255,255,0.9);
      font-size: 1.1rem;
      font-style: italic;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Newsletter Sections */
    .newsletter-section {
      padding: 2.5rem;
    }

    .newsletter-section + .newsletter-section {
      border-top: 1px solid rgba(0,0,0,0.06);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .section-header .section-icon {
      font-size: 1.75rem;
    }

    .section-header h2 {
      font-size: 1.6rem;
      color: var(--biz-navy);
      font-weight: 700;
    }

    .section-subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: 25px;
      padding-left: 44px;
    }

    /* Welcome Section */
    .welcome-text {
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--text-primary);
      margin-bottom: 25px;
    }

    .appreciation-box {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      margin: 20px 0;
    }

    .appreciation-box .heart-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 12px;
    }

    .appreciation-box p {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--text-primary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .solopreneur-note {
      margin-top: 20px;
      padding: 16px 20px;
      background: rgba(232, 181, 77, 0.1);
      border-left: 4px solid var(--warm-gold);
      border-radius: 0 10px 10px 0;
      font-size: 0.95rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    /* Wins Grid */
    .wins-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 10px;
    }

    .win-card {
      background: linear-gradient(135deg, #f0fff4 0%, #e8f5e9 100%);
      border-left: 5px solid var(--success-green);
      border-radius: 16px;
      padding: 24px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .win-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-hover);
    }

    .win-card .win-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 12px;
    }

    .win-card h3 {
      font-size: 1.15rem;
      color: var(--biz-navy);
      margin-bottom: 10px;
      font-weight: 700;
    }

    .win-card .win-description {
      font-size: 0.95rem;
      color: var(--text-primary);
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .win-card .team-credit {
      font-size: 0.9rem;
      color: var(--biz-green);
      font-style: italic;
      font-weight: 500;
    }

    /* Strengths List */
    .strengths-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 10px;
    }

    .strength-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: transform 0.2s ease;
    }

    .strength-item:hover {
      transform: translateX(8px);
    }

    .strength-item .strength-icon {
      font-size: 2rem;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .strength-item .strength-content {
      flex: 1;
    }

    .strength-item h4 {
      font-size: 1.1rem;
      color: var(--biz-navy);
      margin-bottom: 6px;
      font-weight: 600;
    }

    .strength-item .strength-description {
      font-size: 0.95rem;
      color: var(--text-primary);
      line-height: 1.6;
      margin-bottom: 10px;
    }

    .strength-evidence {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 8px;
    }

    .strength-impact {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-style: italic;
      line-height: 1.5;
    }

    /* Growth Section */
    .growth-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
    }

    .growth-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 10px;
    }

    .growth-card {
      background: white;
      border-top: 4px solid var(--success-green);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      transition: transform 0.2s ease;
    }

    .growth-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-hover);
    }

    .growth-card .growth-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 10px;
    }

    .growth-card h4 {
      font-size: 1.05rem;
      color: var(--biz-navy);
      margin-bottom: 8px;
      font-weight: 600;
    }

    .growth-card .growth-description {
      font-size: 0.95rem;
      color: var(--text-primary);
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .growth-benefits {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .growth-benefit {
      padding: 12px;
      border-radius: 8px;
      background: var(--light-bg);
    }

    .growth-benefit .benefit-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--biz-green);
      margin-bottom: 4px;
    }

    .growth-benefit .benefit-text {
      font-size: 0.85rem;
      color: var(--text-primary);
      line-height: 1.5;
    }

    /* Investments / Coming Soon */
    .investments-section {
      background: var(--warm-bg);
    }

    .investment-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 10px;
    }

    .investment-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      position: relative;
      padding-left: 30px;
    }

    .investment-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background: var(--warm-gold);
      border-radius: 5px 0 0 5px;
    }

    .investment-card .investment-icon {
      font-size: 1.5rem;
      margin-bottom: 8px;
      display: inline-block;
    }

    .investment-card h4 {
      font-size: 1.05rem;
      color: var(--biz-navy);
      margin-bottom: 8px;
      font-weight: 600;
      display: inline;
      margin-left: 8px;
    }

    .investment-card .investment-description {
      font-size: 0.95rem;
      color: var(--text-primary);
      line-height: 1.6;
      margin-bottom: 16px;
      margin-top: 8px;
    }

    .investment-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .investment-detail {
      padding: 12px;
      border-radius: 8px;
      background: var(--light-bg);
    }

    .investment-detail .detail-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--biz-navy);
      margin-bottom: 4px;
    }

    .investment-detail .detail-text {
      font-size: 0.85rem;
      color: var(--text-primary);
      line-height: 1.5;
    }

    /* Benchmarks Section */
    .benchmarks-section {
      background: var(--biz-green);
      color: white;
      padding: 2.5rem;
    }

    .benchmarks-section .section-header h2 {
      color: white;
    }

    .benchmarks-section .section-subtitle {
      color: rgba(255,255,255,0.85);
    }

    .benchmark-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 10px;
    }

    .benchmark-card {
      background: rgba(255,255,255,0.92);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      color: var(--text-primary);
    }

    .benchmark-card .benchmark-metric {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--biz-navy);
    }

    .benchmark-card .benchmark-badge {
      display: inline-block;
      background: var(--biz-green);
      color: white;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* Closing Section */
    .closing-section {
      background: linear-gradient(135deg, var(--biz-navy) 0%, #2d3a6d 100%);
      padding: 3rem 2.5rem;
      text-align: center;
    }

    .closing-section .closing-heading {
      color: var(--warm-gold);
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .closing-section .closing-message {
      color: white;
      font-size: 1.15rem;
      line-height: 1.8;
      max-width: 600px;
      margin: 0 auto 20px auto;
    }

    .closing-section .feedback-prompt {
      color: rgba(255,255,255,0.8);
      font-size: 1rem;
      font-style: italic;
    }

    /* Footer */
    .newsletter-footer {
      background: var(--light-bg);
      padding: 20px 2.5rem;
      text-align: center;
    }

    .newsletter-footer .footer-info {
      font-size: 0.9rem;
      color: var(--text-light);
      margin-bottom: 4px;
    }

    .newsletter-footer .powered-by {
      font-size: 0.85rem;
      color: var(--text-light);
    }

    .newsletter-footer .powered-by strong {
      color: var(--biz-navy);
    }

    /* Print Styles */
    @media print {
      body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .newsletter-container { box-shadow: none; border-radius: 0; max-width: none; }
      .newsletter-section { page-break-inside: avoid; }
      .newsletter-hero, .benchmarks-section, .closing-section { -webkit-print-color-adjust: exact; }
      .win-card, .strength-item, .investment-card, .growth-card { page-break-inside: avoid; }
      .win-card:hover, .strength-item:hover, .growth-card:hover { transform: none; }
      .wins-grid, .growth-grid { display: block; }
      .win-card, .growth-card { margin-bottom: 1rem; }
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .newsletter-container { border-radius: 0; margin: 0; }
      .newsletter-hero { padding: 2.5rem 1.5rem; }
      .newsletter-hero h1 { font-size: 2rem; }
      .newsletter-hero .company-name { font-size: 1.4rem; }
      .newsletter-section { padding: 2rem 1.5rem; }
      .wins-grid, .growth-grid, .benchmark-cards { grid-template-columns: 1fr; }
      .section-header { flex-direction: column; text-align: center; }
      .section-subtitle { padding-left: 0; text-align: center; }
      .strength-item { flex-direction: column; text-align: center; }
      .growth-benefits, .investment-details { grid-template-columns: 1fr; }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .win-card, .strength-item, .growth-card { transition: none; }
      .win-card:hover, .strength-item:hover, .growth-card:hover { transform: none; }
    }

    @media (prefers-contrast: high) {
      .newsletter-container { border: 2px solid var(--biz-navy); }
      .win-card, .strength-item, .investment-card { border: 1px solid var(--text-primary); }
    }
  </style>
</head>
<body>
  <div class="newsletter-container">
    ${heroSection}
    ${welcomeSection}
    ${bigWinsSection}
    ${strengthsSection}
    ${growthSection}
    ${comingSoonSection}
    ${benchmarksSection}
    ${closingSection}
    ${footerSection}
  </div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION BUILDERS
// ═══════════════════════════════════════════════════════════════════════════

function buildHeroSection(data: NewsletterData): string {
  return `
    <header class="newsletter-hero">
      <span class="hero-emoji">🎉</span>
      <h1>Team Update</h1>
      <p class="company-name">${escapeHtml(data.companyName)}</p>
      <p class="edition-date">${data.editionDate}</p>
      <p class="tagline">Celebrating our achievements and looking ahead together</p>
    </header>`;
}

function buildWelcomeSection(data: NewsletterData, isSolopreneur: boolean): string {
  const solopreneurNote = isSolopreneur
    ? `<div class="solopreneur-note">
        Whether you're sharing this with your team, your family, or your mentors — these wins are worth celebrating.
      </div>`
    : '';

  return `
    <section class="newsletter-section" id="welcome">
      <div class="section-header">
        <span class="section-icon">👋</span>
        <h2>Welcome!</h2>
      </div>
      <p class="welcome-text">
        We recently completed a comprehensive business health assessment for ${escapeHtml(data.companyName)}, 
        and we're excited to share the highlights with you. This newsletter celebrates what we've accomplished 
        together and gives you a peek at what's coming next.
      </p>
      <div class="appreciation-box">
        <span class="heart-icon">💙</span>
        <p>Thank you for everything you bring to ${escapeHtml(data.companyName)} every day. 
        Your dedication, creativity, and teamwork are what make us who we are.</p>
      </div>
      ${solopreneurNote}
    </section>`;
}

function buildBigWinsSection(data: NewsletterData): string {
  const winCards = data.bigWins.map(win => `
    <div class="win-card">
      <span class="win-icon">${win.icon}</span>
      <h3>${escapeHtml(win.title)}</h3>
      <p class="win-description">Our ${escapeHtml(win.categoryName)} score of ${win.score}/100 shows we're excelling in this area.</p>
      <p class="team-credit">${escapeHtml(win.teamCredit)}</p>
    </div>`).join('');

  return `
    <section class="newsletter-section" id="big-wins">
      <div class="section-header">
        <span class="section-icon">🏆</span>
        <h2>Our Big Wins</h2>
      </div>
      <p class="section-subtitle">Here's what we've accomplished together</p>
      <div class="wins-grid">
        ${winCards}
      </div>
    </section>`;
}

function buildStrengthsSection(data: NewsletterData): string {
  if (data.strengths.length === 0) return '';

  const strengthItems = data.strengths.map(s => `
    <div class="strength-item">
      <span class="strength-icon">${s.icon}</span>
      <div class="strength-content">
        <h4>${escapeHtml(s.title)}</h4>
        <p class="strength-description">${escapeHtml(s.description)}</p>
        <span class="strength-evidence">✓ Score: ${s.score}/100 | ${escapeHtml(s.benchmarkComparison)}</span>
        <p class="strength-impact">${escapeHtml(s.employeeImpact)}</p>
      </div>
    </div>`).join('');

  return `
    <section class="newsletter-section" id="strengths">
      <div class="section-header">
        <span class="section-icon">💪</span>
        <h2>What We're Great At</h2>
      </div>
      <p class="section-subtitle">The strengths that make our team special</p>
      <div class="strengths-list">
        ${strengthItems}
      </div>
    </section>`;
}

function buildGrowthSection(data: NewsletterData): string {
  const growthCards = data.growthIdeas.map(g => `
    <div class="growth-card">
      <span class="growth-icon">${g.icon}</span>
      <h4>${escapeHtml(g.title)}</h4>
      <p class="growth-description">${escapeHtml(g.description)}</p>
      <div class="growth-benefits">
        <div class="growth-benefit">
          <div class="benefit-label">For You</div>
          <div class="benefit-text">${escapeHtml(g.benefitForYou)}</div>
        </div>
        <div class="growth-benefit">
          <div class="benefit-label">For Us</div>
          <div class="benefit-text">${escapeHtml(g.benefitForUs)}</div>
        </div>
      </div>
    </div>`).join('');

  return `
    <section class="newsletter-section growth-section" id="growth">
      <div class="section-header">
        <span class="section-icon">🌱</span>
        <h2>Growth Ideas for Our Team</h2>
      </div>
      <p class="section-subtitle">Opportunities for you to grow with us</p>
      <div class="growth-grid">
        ${growthCards}
      </div>
    </section>`;
}

function buildComingSoonSection(data: NewsletterData): string {
  const investmentCards = data.comingSoon.map(inv => `
    <div class="investment-card">
      <span class="investment-icon">${inv.icon}</span>
      <h4>${escapeHtml(inv.title)}</h4>
      <p class="investment-description">${escapeHtml(inv.description)}</p>
      <div class="investment-details">
        <div class="investment-detail">
          <div class="detail-label">How You Can Help</div>
          <div class="detail-text">${escapeHtml(inv.howYouCanHelp)}</div>
        </div>
        <div class="investment-detail">
          <div class="detail-label">What Success Looks Like</div>
          <div class="detail-text">${escapeHtml(inv.whatSuccessLooksLike)}</div>
        </div>
      </div>
    </div>`).join('');

  return `
    <section class="newsletter-section investments-section" id="investments">
      <div class="section-header">
        <span class="section-icon">🚀</span>
        <h2>Coming Soon</h2>
      </div>
      <p class="section-subtitle">Exciting investments we're making in our future</p>
      <div class="investment-cards">
        ${investmentCards}
      </div>
    </section>`;
}

function buildBenchmarksSection(data: NewsletterData): string {
  const benchmarkCards = data.positiveBenchmarks.map(b => `
    <div class="benchmark-card">
      <div class="benchmark-metric">${escapeHtml(b.metric)}</div>
      <span class="benchmark-badge">${escapeHtml(b.badge)}</span>
    </div>`).join('');

  return `
    <section class="newsletter-section benchmarks-section">
      <div class="section-header">
        <span class="section-icon">📊</span>
        <h2>Did You Know?</h2>
      </div>
      <p class="section-subtitle">How we compare to others in our industry</p>
      <div class="benchmark-cards">
        ${benchmarkCards}
      </div>
    </section>`;
}

function buildClosingSection(data: NewsletterData): string {
  return `
    <section class="closing-section" id="closing">
      <h2 class="closing-heading">💙 You're the Heart of Our Success</h2>
      <p class="closing-message">${escapeHtml(data.closingMessage)}</p>
      <p class="feedback-prompt">We'd love to hear your ideas and suggestions!</p>
    </section>`;
}

function buildFooterSection(data: NewsletterData): string {
  return `
    <footer class="newsletter-footer">
      <p class="footer-info">${escapeHtml(data.companyName)} &bull; Team Update &bull; ${data.editionDate}</p>
      <p class="powered-by">Powered by <strong>BizHealth.ai</strong></p>
    </footer>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════════════════

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API — Called by Phase 5 Orchestrator
// ═══════════════════════════════════════════════════════════════════════════

export async function buildLilEmployeesNewsletter(
  idmOutput: LILIDMOutput,
  businessOverview: LILBusinessOverview
): Promise<{ report: LILGeneratedReport; tokensUsed: number }> {
  
  logger.info({
    companyName: idmOutput.companyProfile?.name || businessOverview.companyName
  }, '[LIL Employees Newsletter] Building newsletter from IDM data');

  // Step 1: Map IDM data to newsletter-safe content
  const newsletterData = mapIDMToNewsletterData(idmOutput, businessOverview);

  logger.info({
    bigWins: newsletterData.bigWins.length,
    strengths: newsletterData.strengths.length,
    growthIdeas: newsletterData.growthIdeas.length,
    comingSoon: newsletterData.comingSoon.length,
    positiveBenchmarks: newsletterData.positiveBenchmarks.length,
    isSolopreneur: newsletterData.employeeCount <= 1
  }, '[LIL Employees Newsletter] Newsletter data mapped');

  // Step 2: Build the HTML
  const htmlContent = buildNewsletterHTML(newsletterData);

  // Step 3: Scan for prohibited content
  const violations = scanEmployeesReport(htmlContent);
  if (violations.length > 0) {
    logger.warn({
      violations,
      violationCount: violations.length
    }, '[LIL Employees Newsletter] Content safeguard violations detected');
  } else {
    logger.info('[LIL Employees Newsletter] Content safeguard scan passed — 0 violations');
  }

  // Step 4: Build the report object
  const pageCount = Math.ceil(htmlContent.length / 3000);
  
  const report: LILGeneratedReport = {
    reportType: 'employees',
    title: 'Employees Report',
    htmlContent,
    pageCount,
    sections: [
      'Hero Header',
      'Welcome',
      'Our Big Wins',
      'What We\'re Great At',
      'Growth Ideas',
      'Coming Soon',
      'Benchmarks',
      'Closing'
    ],
    generatedAt: new Date().toISOString()
  };

  // No AI tokens used — this is a deterministic template builder
  return { report, tokensUsed: 0 };
}

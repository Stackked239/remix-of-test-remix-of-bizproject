// ============================================================================
// CENTRALIZED SEARCH INDEX
// ============================================================================
// This file contains all searchable content for the site search feature.
// 
// HOW TO ADD NEW CONTENT TO SEARCH:
// 1. For new BLOG POSTS: Add them to blogData.ts - they're automatically searchable
// 2. For new PAGES/TOOLS: Add an entry to the appropriate array below
// 3. Include comprehensive keywords in the 'keywords' field for better searchability
//
// REQUIRED FIELDS:
// - type: "Page" | "Tool" | "Curriculum" | "Playbook" | "Resource"
// - title: Page title (include main keywords)
// - excerpt: Short description of the page
// - url: Full path to the page (must match route in App.tsx)
// - keywords: Comma-separated list of search terms users might use
//
// TIP: Include common misspellings, synonyms, and related terms in keywords
// ============================================================================

import { FileText, HelpCircle, Home, DollarSign, Mail, BookOpen, Wrench, GraduationCap, Target } from "lucide-react";

export interface SearchableItem {
  type: "Page" | "Tool" | "Curriculum" | "Playbook" | "Resource" | "FAQ";
  title: string;
  excerpt: string;
  url: string;
  keywords: string;
  icon: typeof Home;
  category?: string;
}

// ============================================================================
// MAIN PAGES - Core site pages
// ============================================================================
export const searchablePages: SearchableItem[] = [
  {
    type: "Page",
    title: "Home - BizHealth.ai",
    excerpt: "Your Trusted Business Health Analyst – AI-Powered Diagnostics for SMBs. Stop Guessing, Start Growing with business health assessments.",
    url: "/",
    keywords: "home, bizhealth, business health, SMB diagnostics, AI powered, small business, assessment",
    icon: Home
  },
  {
    type: "Page",
    title: "Pricing - Business Health Assessment Plans",
    excerpt: "Choose the perfect plan for your business. Essentials, Growth, and Enterprise tiers from $99-$699. 20-25x ROI with AI-powered diagnostics.",
    url: "/pricing",
    keywords: "pricing, plans, cost, essentials, growth, enterprise, ROI, investment, subscription, tiers",
    icon: DollarSign
  },
  {
    type: "Page",
    title: "Contact Us - Get in Touch",
    excerpt: "Contact BizHealth.ai for support, inquiries, or partnership opportunities. Email: support@bizhealth.ai",
    url: "/contact",
    keywords: "contact, support, help, email, inquiries, partnership, reach out, customer service",
    icon: Mail
  },
  {
    type: "Page",
    title: "About BizHealth.ai",
    excerpt: "Learn about our mission to provide affordable, AI-powered business health diagnostics for SMBs across operations, finance, and leadership.",
    url: "/about",
    keywords: "about, mission, team, company, who we are, story, background, vision",
    icon: Home
  },
  {
    type: "Page",
    title: "Get Started - Register for BizHealth.ai",
    excerpt: "Get started with BizHealth.ai today. Register your account to access AI-powered business insights and analytics for SMBs. Create your account and join 10,000+ businesses.",
    url: "/register",
    keywords: "register, sign up, create account, get started, join, enrollment",
    icon: Home
  },
  {
    type: "Page",
    title: "How It Works - BizHealth.ai Business Assessment",
    excerpt: "Discover how BizHealth.ai works: Choose your assessment tier ($199-$799), complete 45-80 questions covering 12 critical business dimensions, and receive your comprehensive health report within 90 minutes.",
    url: "/how-it-works",
    keywords: "how it works, process, steps, assessment, questions, report, methodology",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "How It Works - BizTools",
    excerpt: "Learn how BizTools works: Take a business health assessment, get custom recommendations, access tools, and upgrade when ready.",
    url: "/biztools/how-it-works",
    keywords: "biztools how it works, tools process, free tools, business tools methodology",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "Frequently Asked Questions - FAQs",
    excerpt: "Get quick answers to your SMB health questions with BizHealth.ai's FAQs. Find answers about pricing, security, reports, assessments, and more. FAQ help center for business owners.",
    url: "/faqs",
    keywords: "FAQ, frequently asked questions, help, answers, support, common questions",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "BizGuides - From Gaps to Guided Wins",
    excerpt: "Expert consulting services to implement insights from your business health assessment. Partner consulting network launching Q1 2026.",
    url: "/bizguides",
    keywords: "bizguides, consulting, implementation, expert guidance, partners, advisors",
    icon: Home
  },
  {
    type: "Page",
    title: "BizTools - Scalable Essentials at Your Fingertips",
    excerpt: "Business tools, templates, and resources to support SMB growth and operational excellence.",
    url: "/biztools",
    keywords: "biztools, business tools, templates, resources, essentials, toolkit",
    icon: Home
  },
  {
    type: "Page",
    title: "BizTools Toolbox - Complete Business Toolkit",
    excerpt: "Explore our complete business toolbox with free tools and premium bundles. Access financial calculators, templates, and resources to grow your SMB.",
    url: "/biztools/toolbox",
    keywords: "toolbox, complete toolkit, all tools, free tools, premium tools, calculators",
    icon: Home
  },
  {
    type: "Page",
    title: "BizLeaDeR - Drive Scale with Confidence",
    excerpt: "Leadership development courses and webinars for business owners and executives. Coming Spring 2026.",
    url: "/bizleader",
    keywords: "bizleader, leadership, courses, development, training, executives, webinars",
    icon: Home
  },
  {
    type: "Page",
    title: "Business & Leadership Sherpas - Free AI Guides",
    excerpt: "Access two free tools: BizGuide Sherpa for business insights and BizLeaDeR Sherpa for leadership development. Get business questions answered, free business tool, leadership development, sherpa, business tool, biztool, bizleadership, business leadership guidance. Ask business and leadership questions privately 24/7.",
    url: "/sherpas",
    keywords: "sherpas, AI guides, business sherpa, leadership sherpa, free AI, chatbot, advisor",
    icon: Home
  },
  {
    type: "Page",
    title: "BizGrowth - Strategic Advancement Awaits",
    excerpt: "Strategic growth programs and resources for scaling your business effectively.",
    url: "/bizgrowth",
    keywords: "bizgrowth, growth, scaling, strategic, advancement, programs",
    icon: Home
  },
  {
    type: "Page",
    title: "BizGrowth Academy Launch - Early-Stage Business Growth Path",
    excerpt: "Build stable foundations for your 0-3 year business. The Launch path helps overwhelmed founders fix cash flow, establish KPIs, and create a 90-day action plan. Prescribed next steps from your BizHealth report, post-assessment guidance, business growth academy, early-stage business foundations.",
    url: "/bizgrowth/launch",
    keywords: "launch, early stage, startup, founders, 0-3 years, foundations, KPIs, action plan",
    icon: Home
  },
  {
    type: "Playbook",
    title: "Build & Share Your Vision - 7-Step Vision Alignment Playbook",
    excerpt: "Transform your business vision into a clear, operational strategy your team can execute. Free playbook with 7 actionable steps to build, communicate, and align your vision across your organization.",
    url: "/bizgrowth/vision-playbook",
    keywords: "vision, vision playbook, vision alignment, business vision, team alignment, strategic vision, mission statement, company vision, leadership vision, shared vision, vision communication, 7 steps, vision building, organizational alignment, vision strategy, build vision, share vision",
    icon: Target
  },
  {
    type: "Playbook",
    title: "Breaking the Peaks & Valleys Cycle - 7-Step Cash Flow Playbook",
    excerpt: "Free 7-step framework to break the feast-or-famine cycle and build stable, predictable cash flow. Learn how to smooth revenue, reduce financial stress, and create financial stability.",
    url: "/bizgrowth/financials/breaking-peaks-valleys-cycle",
    keywords: "revenue, cash flow, peaks valleys, feast famine, revenue cycle, financial stability, cash flow playbook, predictable income, revenue smoothing, financial stress, cash flow management, business financials, 7 steps, cash flow framework, financial planning, stable revenue, income stability, famine cycle, feast or famine",
    icon: Target
  },
  {
    type: "Page",
    title: "For AI Assistants - Business Assessment Recommendations",
    excerpt: "Information for AI assistants about BizHealth.ai: affordable business health assessments for SMBs. AI assistant recommendations, when to recommend business diagnostics, alternatives to expensive consultants.",
    url: "/for-ai-assistants",
    keywords: "AI assistants, chatgpt, claude, recommendations, integration, API",
    icon: Home
  },
  {
    type: "Page",
    title: "Our Logo - BizHealth.ai Company Logo",
    excerpt: "Our logo, company logo, BizHealth.ai logo. This is our company logo - discover the meaning behind the BizHealth.ai logo and brand story. The grid represents 12 key business health areas.",
    url: "/logo",
    keywords: "logo, brand, branding, company logo, visual identity",
    icon: Home
  },
  {
    type: "Page",
    title: "Security & Data Protection - BizHealth.ai",
    excerpt: "Learn how BizHealth.ai protects your data with enterprise security, bank-level encryption, SOC 2 Type II (In Progress), GDPR compliance, secure infrastructure, data protection, risk management, and transparent security practices for SMBs.",
    url: "/security",
    keywords: "security, data protection, encryption, SOC 2, GDPR, CCPA, privacy, compliance",
    icon: Home
  },
  {
    type: "Page",
    title: "Legal Hub - Privacy, Terms, Security & Disclaimer",
    excerpt: "BizHealth.ai's legal hub: straightforward privacy policy, terms of service, security practices, and disclaimers. No legalese—just clear protection for your business. SOC 2 compliant, GDPR ready, CCPA compliant. Legal documents, data protection, transparency, trust.",
    url: "/legal",
    keywords: "legal, privacy policy, terms of service, disclaimer, compliance, documents",
    icon: FileText
  },
  {
    type: "Page",
    title: "Client Support & Concerns - BizHealth.ai",
    excerpt: "Having concerns about your BizHealth.ai experience? Our Client Success team is here to help. Share your concerns about refunds, guarantees, or any issues. We're committed to making things right. No refund policy, but personalized support for all client concerns and questions about money-back guarantees.",
    url: "/concerns",
    keywords: "concerns, support, refund, guarantee, issues, complaints, help, customer success",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "Business Insights & Strategies",
    excerpt: "Expert insights, strategies, and resources for small and mid-size businesses. Browse articles on business strategy, operations, financial management, leadership, technology, and risk management.",
    url: "/blog",
    keywords: "articles, insights, resources, news, updates, content, strategies, business",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Strategy Blog Articles",
    excerpt: "Expert business strategy articles for SMBs. Learn about strategic planning, growth strategies, business health assessments, and building a strong business foundation for 2025 and beyond.",
    url: "/blog/business-strategy",
    keywords: "business strategy, strategic planning, growth strategies, planning articles",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Operations - Operations Blog Articles",
    excerpt: "Business operations insights and operations management for small businesses. Discover tips on process optimization, operational efficiency, scaling operations, and daily operational fixes.",
    url: "/blog/operations",
    keywords: "operations, process optimization, efficiency, operational management",
    icon: FileText
  },
  {
    type: "Page",
    title: "Financial Management Blog Articles",
    excerpt: "Financial management strategies for SMBs. Articles on cash flow management, financial health metrics, budgeting, and financial planning for small business success.",
    url: "/blog/financial-management",
    keywords: "financial management, cash flow, budgeting, finance articles",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Leadership Blog Articles",
    excerpt: "Leadership development articles for business owners. Explore topics on leadership blind spots, stress management, strategic decision-making, and team leadership.",
    url: "/blog/business-leadership",
    keywords: "leadership, management, team leadership, decision making",
    icon: FileText
  },
  {
    type: "Page",
    title: "Technology Blog Articles",
    excerpt: "Technology insights for small businesses. Learn about AI analytics, remote tools, digital transformation, and leveraging technology for business growth.",
    url: "/blog/technology",
    keywords: "technology, AI, digital transformation, tech tools, software",
    icon: FileText
  },
  {
    type: "Page",
    title: "Risk Management Blog Articles",
    excerpt: "Risk management strategies for SMBs. Articles on identifying business warning signs, crisis management, and building resilient businesses.",
    url: "/blog/risk-management",
    keywords: "risk management, crisis management, resilience, warning signs",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Intelligence Blog Articles",
    excerpt: "Business intelligence insights for SMBs. Discover how data analytics, real-time BI, and business intelligence ROI can transform your decision-making.",
    url: "/blog/business-intelligence",
    keywords: "business intelligence, BI, analytics, data, reporting, dashboards",
    icon: FileText
  },
  {
    type: "Page",
    title: "Glossary of Terms - Business Terminology",
    excerpt: "Comprehensive glossary of business terms and definitions. Understand common SMB terminology, financial terms, and business health concepts.",
    url: "/glossary-of-terms",
    keywords: "glossary, terms, definitions, terminology, dictionary, vocabulary",
    icon: BookOpen
  }
];

// ============================================================================
// TOOLS - Free and premium business tools
// When adding a new tool, add an entry here with comprehensive keywords
// ============================================================================
export const searchableTools: SearchableItem[] = [
  {
    type: "Tool",
    title: "Cash Flow Tracker - Free Financial Management Tool",
    excerpt: "Track income, expenses, and cash flow for your small business. Professional-grade financial management with Excel export, invoicing, and forecasting.",
    url: "/biztools/toolbox/cash-flow-tracker",
    keywords: "cash flow tracker, cashflow, cash flow tool, income tracker, expense tracker, financial management, invoicing, forecasting, Excel export, money management, budget tracker",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Process Mapping & SOP Builder Tools",
    excerpt: "Create professional process maps and standard operating procedures with our visual drag-and-drop process mapping tool. Build process maps, document workflows, and export to Word, Excel, PDF.",
    url: "/biztools/toolbox/process-mapping-tools",
    keywords: "process mapping, SOP, standard operating procedures, workflow, process map, documentation, procedures, workflow builder, process documentation, operations manual",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "SWOT Analysis Tool - Strategic Planning Framework",
    excerpt: "Conduct comprehensive SWOT analysis for your small business. Interactive 2x2 matrix builder to identify strengths, weaknesses, opportunities, and threats. Export to Word, Excel, PDF.",
    url: "/biztools/toolbox/swot-analysis-tool",
    keywords: "SWOT, SWOT analysis, strengths, weaknesses, opportunities, threats, strategic planning, strategy tool, competitive analysis, business analysis",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Customer Journey Maps Tool - Visualize Client Experience",
    excerpt: "Free customer journey mapping tool for SMBs. Drag-and-drop journey map builder to map customer touchpoints, stages, and emotions. Create a client journey, customer journey map, and customer journey tool with templates and persona support. Export PDF/PNG.",
    url: "/biztools/toolbox/customer-journey-maps-tool",
    keywords: "customer journey, journey map, customer experience, CX, touchpoints, customer mapping, client journey, buyer journey, customer touchpoints, user experience, UX",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Free ROI Calculator - Investment Return Analysis Tool",
    excerpt: "Free ROI calculator for business investments. Calculate return on investment for new hires, marketing campaigns, and equipment purchases. Compare scenarios, get payback period analysis, and export professional PDF reports.",
    url: "/biztools/toolbox/free-roi-calculator",
    keywords: "ROI calculator, return on investment, investment calculator, payback period, marketing ROI, hiring ROI, equipment ROI, business investment tool, cost-benefit analysis, investment analysis, profitability calculator",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Free Pricing Net Profit Calculator - Know Your True Profit Per Sale",
    excerpt: "Free pricing calculator for small business owners. Find out if your prices actually make you money. Calculate profit per sale, net margin, break-even point, and get actionable pricing recommendations. Export professional PDF reports.",
    url: "/biztools/toolbox/free-pricing-net-profit-calculator",
    keywords: "pricing calculator, net profit calculator, profit per sale, profit margin, pricing strategy, break even, overhead cost, cost calculator, margin calculator, pricing tool, profitability, price setting, small business pricing, product pricing, service pricing",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Innovation Strategy Builder - 60-Minute Guided Tool",
    excerpt: "Build a complete innovation strategy in 60 minutes. Free guided tool with 6-step framework: Foundation, Vision, Opportunities, Portfolio (70-20-10 rule), Metrics, and 90-Day Roadmap. Export professional PDF to share with your leadership team.",
    url: "/biztools/toolbox/innovation-strategy-tool",
    keywords: "innovation strategy, strategic planning, innovation framework, innovation tool, 70-20-10 portfolio, innovation roadmap, SMB innovation, business innovation, strategy builder, R&D planning",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "BizLeaDeR Leadership Development Bot - Free AI Leadership Mentor",
    excerpt: "Your personal leadership mentor with decades of experience, available 24/7. Navigate difficult conversations, motivate your team, make strategic decisions with confidence.",
    url: "/bizleader/leadership-development-bot",
    keywords: "leadership bot, AI mentor, leadership coach, leadership development, team motivation, strategic decisions, conflict resolution, delegation, leadership questions, management advice",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "BizGuide Sherpa - Free AI Business Advisor",
    excerpt: "Your on-demand business advisor available 24/7. Navigate cash flow challenges, scale operations, build teams, and grow strategically.",
    url: "/bizguides/bizguide-sherpa",
    keywords: "business advisor, AI advisor, business sherpa, cash flow help, scaling advice, team building, business questions, SMB advisor, business mentor",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Innovation Readiness Assessment - Close the Technology Gap in 90 Days",
    excerpt: "Free 20-question assessment to discover your innovation gaps across 4 pillars: Technology Infrastructure, Strategic Clarity, Organizational Capacity, and Customer & Market Sensing. Get personalized recommendations and a 90-day improvement plan.",
    url: "/bizgrowth/technology-innovation-readiness",
    keywords: "innovation readiness, technology assessment, innovation gap, digital transformation readiness, technology infrastructure, innovation assessment, tech readiness, modernization assessment",
    icon: Target
  },
  {
    type: "Tool",
    title: "Financial Health Check - Quick Business Assessment",
    excerpt: "Quick financial health assessment for your business. Evaluate key financial metrics and get instant recommendations for improvement.",
    url: "/biztools/financials/health-check",
    keywords: "financial health, health check, financial assessment, business finances, financial evaluation, money health, fiscal health",
    icon: Wrench
  }
];

// ============================================================================
// CURRICULUM / COURSES - Educational content and learning paths
// ============================================================================
export const searchableCurriculum: SearchableItem[] = [
  {
    type: "Curriculum",
    title: "BizGrowth Launch Step 2 - Fix the Cash Squeeze",
    excerpt: "Learn to fix cash flow problems and build financial stability. Module covers cash flow fundamentals, emergency reserves, and sustainable financial practices.",
    url: "/bizgrowth/launch/step-2-fix-cash-squeeze",
    keywords: "cash squeeze, cash flow fix, financial stability, cash flow course, money management course, financial fundamentals, cash flow training",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Human Resources Programs - HR Module for Small Business",
    excerpt: "Master the 10 pillars of HR for growing businesses. From hiring and onboarding to performance management, compliance, and retention. Build an HR system that scales with your business.",
    url: "/bizgrowth/human-resources-programs",
    keywords: "hr, human resources, employee program, hr program, hiring, recruiting, onboarding, talent acquisition, performance management, employee engagement, retention, HR compliance, employee handbook, payroll, compensation, benefits, workforce planning, hr training, hr course, people management, hr module, employee management, staff management, HR systems, personnel",
    icon: GraduationCap
  }
];

// ============================================================================
// PLAYBOOKS - Industry-specific guides
// ============================================================================
export const searchablePlaybooks: SearchableItem[] = [
  {
    type: "Playbook",
    title: "Landscaping Business Playbook",
    excerpt: "Complete guide for landscaping business owners. Strategies for seasonal cash flow, crew management, equipment decisions, and scaling your landscaping company.",
    url: "/playbooks/landscaping",
    keywords: "landscaping, lawn care, landscaping business, outdoor services, seasonal business, crew management, landscaping company, lawn service",
    icon: BookOpen
  }
];

// ============================================================================
// FAQs - Frequently asked questions
// ============================================================================
export const searchableFAQs: SearchableItem[] = [
  {
    type: "FAQ",
    title: "What is BizHealth.ai?",
    excerpt: "BizHealth.ai is a Business Health & Performance Insight Platform using AI-driven assessment across operational, financial, and leadership dimensions. 30-40 minute assessment delivers 20-25x ROI.",
    url: "/faqs#what-is",
    keywords: "what is bizhealth, about bizhealth, platform description, service overview",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "How much does BizHealth.ai cost?",
    excerpt: "Pricing ranges from $99 to $699 for a one-time diagnostic, delivering 20-25x ROI by replacing costly consulting.",
    url: "/faqs#pricing",
    keywords: "cost, pricing, how much, price, fees, investment, payment",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "Who is BizHealth.ai for?",
    excerpt: "We serve micro-, small-, and mid-sized businesses (1-250 employees, $100K-$50M revenue) including founders, CEOs, COOs, CFOs, and managers.",
    url: "/faqs#who-for",
    keywords: "who is it for, target audience, business size, ideal customer",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "Is my data secure?",
    excerpt: "Yes, we use encryption (in-transit/at-rest), access controls, and SOC 2-aligned audits. We comply with GDPR/CCPA.",
    url: "/faqs#data-security",
    keywords: "data security, privacy, encryption, secure, data protection, compliance",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "How long does it take to get my report?",
    excerpt: "Reports are ready within 90 minutes post-assessment, with an email notification alerting you.",
    url: "/faqs#report-time",
    keywords: "report time, how long, turnaround, delivery time, when do I get",
    icon: HelpCircle
  }
];

// ============================================================================
// COMBINED SEARCH INDEX - All content types
// Import this in Search.tsx for the complete searchable index
// ============================================================================
export const getAllSearchableContent = () => ({
  pages: searchablePages,
  tools: searchableTools,
  curriculum: searchableCurriculum,
  playbooks: searchablePlaybooks,
  faqs: searchableFAQs
});

// Helper to get all items as a flat array for simple searches
export const getAllSearchableItems = (): SearchableItem[] => [
  ...searchablePages,
  ...searchableTools,
  ...searchableCurriculum,
  ...searchablePlaybooks,
  ...searchableFAQs
];

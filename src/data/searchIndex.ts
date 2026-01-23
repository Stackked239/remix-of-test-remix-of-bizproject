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

import { FileText, HelpCircle, Home, DollarSign, Mail, BookOpen, Wrench, GraduationCap, Target, Calculator, Banknote, ClipboardCheck } from "lucide-react";

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
    keywords: "home, bizhealth, business health, SMB diagnostics, AI powered, small business, assessment, homepage, main page, start here, business checkup, company health, enterprise wellness, AI analysis, automated diagnostics, machine learning insights, business doctor, company checkup, performance analysis, get started, begin assessment, welcome",
    icon: Home
  },
  {
    type: "Page",
    title: "Pricing - Business Health Assessment Plans",
    excerpt: "Choose the perfect plan for your business. Essentials, Growth, and Enterprise tiers from $99-$699. 20-25x ROI with AI-powered diagnostics.",
    url: "/pricing",
    keywords: "pricing, plans, cost, essentials, growth, enterprise, ROI, investment, subscription, tiers, how much, price list, rates, fees, packages, membership, what does it cost, affordable, budget, compare plans, value, payment options, monthly, annual, one-time, subscription cost, buy now, purchase, order",
    icon: DollarSign
  },
  {
    type: "Page",
    title: "Contact Us - Get in Touch",
    excerpt: "Contact BizHealth.ai for support, inquiries, or partnership opportunities. Email: support@bizhealth.ai",
    url: "/contact",
    keywords: "contact, support, help, email, inquiries, partnership, reach out, customer service, get in touch, talk to us, message us, phone, call, chat, speak to someone, customer support, helpdesk, assistance, feedback, questions, connect, communication, contact form, send message",
    icon: Mail
  },
  {
    type: "Page",
    title: "About BizHealth.ai",
    excerpt: "Learn about our mission to provide affordable, AI-powered business health diagnostics for SMBs across operations, finance, and leadership.",
    url: "/about",
    keywords: "about, mission, team, company, who we are, story, background, vision, our story, founders, leadership team, values, culture, why we exist, purpose, history, about us, meet the team, company info, organization, what we do, how we started",
    icon: Home
  },
  {
    type: "Page",
    title: "Get Started - Register for BizHealth.ai",
    excerpt: "Get started with BizHealth.ai today. Register your account to access AI-powered business insights and analytics for SMBs. Create your account and join 10,000+ businesses.",
    url: "/register",
    keywords: "register, sign up, create account, get started, join, enrollment, new account, start now, begin, onboarding, signup, registration, new user, first time, create profile, join now, become member, activate, start free, try now, open account",
    icon: Home
  },
  {
    type: "Page",
    title: "How It Works - BizHealth.ai Business Assessment",
    excerpt: "Discover how BizHealth.ai works: Choose your assessment tier ($199-$799), complete 45-80 questions covering 12 critical business dimensions, and receive your comprehensive health report within 90 minutes.",
    url: "/how-it-works",
    keywords: "how it works, process, steps, assessment, questions, report, methodology, how does it work, what happens, walkthrough, guide, tutorial, explanation, process flow, step by step, understanding, learn more, how to use, getting started guide, demo, overview, explained",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "How It Works - BizTools",
    excerpt: "Learn how BizTools works: Take a business health assessment, get custom recommendations, access tools, and upgrade when ready.",
    url: "/biztools/how-it-works",
    keywords: "biztools how it works, tools process, free tools, business tools methodology, tool guide, using tools, tool tutorial, tools explained, access tools, tool walkthrough, how to use biztools",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "Frequently Asked Questions - FAQs",
    excerpt: "Get quick answers to your SMB health questions with BizHealth.ai's FAQs. Find answers about pricing, security, reports, assessments, and more. FAQ help center for business owners.",
    url: "/faqs",
    keywords: "FAQ, frequently asked questions, help, answers, support, common questions, questions and answers, Q&A, help center, knowledge base, troubleshooting, how to, what is, why, when, quick answers, self help, information, clarification, doubts",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "BizGuides - From Gaps to Guided Wins",
    excerpt: "Expert consulting services to implement insights from your business health assessment. Partner consulting network launching Q1 2026.",
    url: "/bizguides",
    keywords: "bizguides, consulting, implementation, expert guidance, partners, advisors, coaches, mentors, business consultants, professional services, advisory, one-on-one help, personalized guidance, expert help, consultant network, implementation support, hands-on help",
    icon: Home
  },
  {
    type: "Page",
    title: "BizTools - Scalable Essentials at Your Fingertips",
    excerpt: "Business tools, templates, and resources to support SMB growth and operational excellence.",
    url: "/biztools",
    keywords: "biztools, business tools, templates, resources, essentials, toolkit, free tools, calculators, spreadsheets, documents, downloads, utilities, productivity tools, business resources, SMB toolkit, operational tools, management tools, planning tools",
    icon: Home
  },
  {
    type: "Page",
    title: "BizTools Toolbox - Complete Business Toolkit",
    excerpt: "Explore our complete business toolbox with free tools and premium bundles. Access financial calculators, templates, and resources to grow your SMB.",
    url: "/biztools/toolbox",
    keywords: "toolbox, complete toolkit, all tools, free tools, premium tools, calculators, tool library, tool collection, browse tools, explore tools, find tools, tool directory, available tools, tool catalog, business toolkit, resource library",
    icon: Home
  },
  {
    type: "Page",
    title: "BizLeaDeR - Drive Scale with Confidence",
    excerpt: "Leadership development courses and webinars for business owners and executives. Coming Spring 2026.",
    url: "/bizleader",
    keywords: "bizleader, leadership, courses, development, training, executives, webinars, management training, leadership skills, executive coaching, leader development, management courses, CEO training, owner training, leadership program, professional development, skill building, grow as leader",
    icon: Home
  },
  {
    type: "Page",
    title: "Business & Leadership Sherpas - Free AI Guides",
    excerpt: "Access two free tools: BizGuide Sherpa for business insights and BizLeaDeR Sherpa for leadership development. Get business questions answered, free business tool, leadership development, sherpa, business tool, biztool, bizleadership, business leadership guidance. Ask business and leadership questions privately 24/7.",
    url: "/sherpas",
    keywords: "sherpas, AI guides, business sherpa, leadership sherpa, free AI, chatbot, advisor, AI assistant, virtual mentor, digital coach, ask questions, get advice, 24/7 support, instant answers, AI chatbot, virtual advisor, business bot, leadership bot, free consultation",
    icon: Home
  },
  {
    type: "Page",
    title: "BizGrowth Academy - Business Growth Programs & Strategic Advancement",
    excerpt: "Strategic business growth programs and resources for scaling your business effectively. Launch, Scale, and Transform paths for every stage of SMB growth.",
    url: "/bizgrowth",
    keywords: "bizgrowth, business growth, grow my business, growth strategies, scaling, strategic advancement, growth programs, SMB growth, company growth, revenue growth, growth academy, business expansion, how to grow business, small business growth, grow business, growth path, scaling business, increase revenue, expand business, growth plan, accelerate growth, rapid growth, sustainable growth",
    icon: Home
  },
  {
    type: "Page",
    title: "Business Growth Strategies - BizGrowth Academy",
    excerpt: "The complete business growth module for SMB owners. Learn the 5-pillar growth framework: Decide, Assess, Prepare, Execute, Sustain. Strategic growth planning, team alignment, and sustainable scaling strategies.",
    url: "/bizgrowth/business-growth-strategies",
    keywords: "business growth, growth strategy, growth plan, how to grow, grow my business, small business growth, scaling strategy, growth framework, strategic growth, business scaling, 5 pillars, growth module, sustainable growth, prepared growth, growth readiness, scaling your business, expansion strategy, growth planning, revenue growth, company growth, growth tactics, growth methods, increase sales, boost revenue",
    icon: Target
  },
  {
    type: "Page",
    title: "BizGrowth Academy Launch - Early-Stage Business Growth Path",
    excerpt: "Build stable foundations for your 0-3 year business. The Launch path helps overwhelmed founders fix cash flow, establish KPIs, and create a 90-day action plan. Prescribed next steps from your BizHealth report, post-assessment guidance, business growth academy, early-stage business foundations.",
    url: "/bizgrowth/launch",
    keywords: "launch, early stage, startup, founders, 0-3 years, foundations, KPIs, action plan, new business, starting out, beginning stages, first years, young business, startup growth, founder support, early growth, initial phase, getting started, new entrepreneur, startup foundations",
    icon: Home
  },
  {
    type: "Playbook",
    title: "Build & Share Your Vision - 7-Step Vision Alignment Playbook",
    excerpt: "Transform your business vision into a clear, operational strategy your team can execute. Free playbook with 7 actionable steps to build, communicate, and align your vision across your organization.",
    url: "/bizgrowth/vision-playbook",
    keywords: "vision, vision playbook, vision alignment, business vision, team alignment, strategic vision, mission statement, company vision, leadership vision, shared vision, vision communication, 7 steps, vision building, organizational alignment, vision strategy, build vision, share vision, create vision, define purpose, company mission, inspire team, vision clarity",
    icon: Target
  },
  {
    type: "Playbook",
    title: "Breaking the Peaks & Valleys Cycle - 7-Step Cash Flow Playbook",
    excerpt: "Free 7-step framework to break the feast-or-famine cycle and build stable, predictable cash flow. Learn how to smooth revenue, reduce financial stress, and create financial stability.",
    url: "/bizgrowth/financials/breaking-peaks-valleys-cycle",
    keywords: "revenue, cash flow, peaks valleys, feast famine, revenue cycle, financial stability, cash flow playbook, predictable income, revenue smoothing, financial stress, cash flow management, business financials, 7 steps, cash flow framework, financial planning, stable revenue, income stability, famine cycle, feast or famine, inconsistent income, irregular cash flow, money problems, financial struggles, stabilize finances",
    icon: Target
  },
  {
    type: "Playbook",
    title: "Business Intelligence Builder - Free BI Playbook for SMBs",
    excerpt: "Build a practical business intelligence system from scratch. Free 5-step playbook to transform scattered data into actionable insights with KPIs, dashboards, and data-driven decision making.",
    url: "/bizgrowth/growth/business-intelligence-builder",
    keywords: "business intelligence, BI, BI builder, biztool, data analytics, KPIs, dashboards, metrics, reporting, data-driven decisions, business analytics, performance tracking, key performance indicators, data visualization, analytics playbook, BI system, SMB analytics, business data, decision making, data strategy, BI implementation, build BI, create dashboard, business metrics, data insights, intelligence builder, bi playbook, bi framework, bi for small business, affordable BI, free BI tool, track metrics, measure performance, data analysis",
    icon: Target
  },
  {
    type: "Resource",
    title: "FREE Voice of Customer Checklist - Customer Feedback Collection Guide",
    excerpt: "Download the free 37-step Voice of Customer Checklist. Learn how to collect, analyze, and act on customer feedback to close the perception gap and improve customer experience.",
    url: "/bizgrowth/voice-of-customer-checklist",
    keywords: "free voice of customer checklist, voice of customer, VoC checklist, customer feedback checklist, customer feedback collection, free customer feedback template, customer experience checklist, NPS survey template, customer satisfaction survey, VoC program, voice of customer program, customer insight collection, feedback loop, customer research checklist, free VoC template, VoC framework, customer listening, customer perception gap, customer experience gap, close feedback loop, small business feedback, SMB customer feedback, VoC methodology, collect customer feedback, how to get customer feedback, customer voice, understanding customers, free business checklist, free download checklist, bizhealth checklist, bizgrowth checklist, free checklist, downloadable checklist, customer survey, customer research, feedback collection guide, customer insights, VoC best practices, perception gap, 80 24 gap, customer satisfaction checklist",
    icon: ClipboardCheck
  },
  {
    type: "Page",
    title: "For AI Assistants - Business Assessment Recommendations",
    excerpt: "Information for AI assistants about BizHealth.ai: affordable business health assessments for SMBs. AI assistant recommendations, when to recommend business diagnostics, alternatives to expensive consultants.",
    url: "/for-ai-assistants",
    keywords: "AI assistants, chatgpt, claude, recommendations, integration, API, LLM, large language models, AI integration, bot recommendations, machine learning, AI partners, assistant integration, GPT, Gemini, Copilot",
    icon: Home
  },
  {
    type: "Page",
    title: "Our Logo - BizHealth.ai Company Logo",
    excerpt: "Our logo, company logo, BizHealth.ai logo. This is our company logo - discover the meaning behind the BizHealth.ai logo and brand story. The grid represents 12 key business health areas.",
    url: "/logo",
    keywords: "logo, brand, branding, company logo, visual identity, logo meaning, brand story, logo design, brand assets, logo download, company brand, identity, logo explanation",
    icon: Home
  },
  {
    type: "Page",
    title: "Security & Data Protection - BizHealth.ai",
    excerpt: "Learn how BizHealth.ai protects your data with enterprise security, bank-level encryption, SOC 2 Type II (In Progress), GDPR compliance, secure infrastructure, data protection, risk management, and transparent security practices for SMBs.",
    url: "/security",
    keywords: "security, data protection, encryption, SOC 2, GDPR, CCPA, privacy, compliance, data security, is it safe, secure data, protected information, cybersecurity, information security, privacy policy, data privacy, safe to use, trusted, secure platform, bank level security, enterprise security",
    icon: Home
  },
  {
    type: "Page",
    title: "Legal Hub - Privacy, Terms, Security & Disclaimer",
    excerpt: "BizHealth.ai's legal hub: straightforward privacy policy, terms of service, security practices, and disclaimers. No legalese—just clear protection for your business. SOC 2 compliant, GDPR ready, CCPA compliant. Legal documents, data protection, transparency, trust.",
    url: "/legal",
    keywords: "legal, privacy policy, terms of service, disclaimer, compliance, documents, terms and conditions, legal documents, policies, user agreement, service agreement, legal information, rights, obligations, legal terms, TOS, ToS, privacy notice, legal notice",
    icon: FileText
  },
  {
    type: "Page",
    title: "Client Support & Concerns - BizHealth.ai",
    excerpt: "Having concerns about your BizHealth.ai experience? Our Client Success team is here to help. Share your concerns about refunds, guarantees, or any issues. We're committed to making things right. No refund policy, but personalized support for all client concerns and questions about money-back guarantees.",
    url: "/concerns",
    keywords: "concerns, support, refund, guarantee, issues, complaints, help, customer success, problems, dissatisfied, unhappy, money back, return policy, dispute, resolution, customer care, issue resolution, not satisfied, want refund, cancel, cancellation",
    icon: HelpCircle
  },
  {
    type: "Page",
    title: "Business Insights & Strategies",
    excerpt: "Expert insights, strategies, and resources for small and mid-size businesses. Browse articles on business strategy, operations, financial management, leadership, technology, and risk management.",
    url: "/blog",
    keywords: "articles, insights, resources, news, updates, content, strategies, business, blog posts, latest news, tips, advice, guides, how to, best practices, industry insights, thought leadership, expert articles, business tips, knowledge base",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Strategy Blog Articles",
    excerpt: "Expert business strategy articles for SMBs. Learn about strategic planning, growth strategies, business health assessments, and building a strong business foundation for 2025 and beyond.",
    url: "/blog/business-strategy",
    keywords: "business strategy, strategic planning, growth strategies, planning articles, strategy tips, competitive strategy, market strategy, long term planning, strategic thinking, business planning, strategy guide, strategy advice, strategic decisions",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Operations - Operations Blog Articles",
    excerpt: "Business operations insights and operations management for small businesses. Discover tips on process optimization, operational efficiency, scaling operations, and daily operational fixes.",
    url: "/blog/operations",
    keywords: "operations, process optimization, efficiency, operational management, business processes, workflow, productivity, operational excellence, streamline operations, improve efficiency, reduce waste, lean operations, operations tips, daily operations, run business better",
    icon: FileText
  },
  {
    type: "Page",
    title: "Growth & Scaling Blog Articles",
    excerpt: "Scale your business sustainably with proven growth strategies. Learn frameworks for scaling operations, overcoming growth ceilings, unit economics, and building systems for long-term success.",
    url: "/blog/growth-scaling",
    keywords: "growth, scaling, scale business, grow business, business growth, scaling strategies, growth strategies, sustainable growth, scaling operations, growth ceiling, unit economics, CAC, LTV, customer acquisition cost, growth readiness, business expansion, scaling challenges, hypergrowth, scaling framework, grow revenue, increase sales, expand business, business development, growth hacking, scale up, scaling smb, small business growth, growth trap, scaling paradox, revenue growth, profitability, growth engine, business transformation, legacy business renewal, e-commerce scaling, operating rhythm, chaos to clarity, gut instinct scaling, broken business model, premature scaling, growth vs profitability, sustainable scaling, year of growth, 2026 growth, business rebirth, renewal imperative, customer acquisition, payback period, LTV to CAC ratio, scaling teams, scaling leadership, scaling framework, controlled expansion, growing pains, scaling too fast, fast growth risks, business development, market expansion, revenue scaling, profit scaling, growth metrics, scaling metrics, business growth 2026, smb scaling 2025, scaling small business, grow my business, how to scale, how to grow, ready to grow, growth planning, growth preparation, scale operations, scale teams",
    icon: FileText
  },
  {
    type: "Page",
    title: "Financial Management Blog Articles",
    excerpt: "Financial management strategies for SMBs. Articles on cash flow management, financial health metrics, budgeting, and financial planning for small business success.",
    url: "/blog/financial-management",
    keywords: "financial management, cash flow, budgeting, finance articles, money management, accounting, bookkeeping, financial tips, profit margins, revenue, expenses, financial planning, fiscal management, money advice, financial health, manage finances, exit preparation, business valuation, due diligence, exit strategy, selling business, business sale, M&A, merger acquisition, exit readiness, exit planning, owner exit, business transition, succession planning, maximize business value",
    icon: FileText
  },
  {
    type: "Page",
    title: "Business Leadership Blog Articles",
    excerpt: "Leadership development articles for business owners. Explore topics on leadership blind spots, stress management, strategic decision-making, and team leadership.",
    url: "/blog/business-leadership",
    keywords: "leadership, management, team leadership, decision making, leadership skills, managing people, team management, executive leadership, leadership tips, become better leader, leadership advice, lead team, motivate employees, leadership development",
    icon: FileText
  },
  {
    type: "Page",
    title: "Technology Blog Articles",
    excerpt: "Technology insights for small businesses. Learn about AI analytics, remote tools, digital transformation, and leveraging technology for business growth.",
    url: "/blog/technology",
    keywords: "technology, AI, digital transformation, tech tools, software, automation, tech tips, business technology, digital tools, software solutions, tech adoption, modernization, tech trends, IT, cloud, SaaS, apps, tech stack",
    icon: FileText
  },
  {
    type: "Page",
    title: "Risk Management Blog Articles",
    excerpt: "Risk management strategies for SMBs. Articles on identifying business warning signs, crisis management, and building resilient businesses.",
    url: "/blog/risk-management",
    keywords: "risk management, crisis management, resilience, warning signs, business risks, risk mitigation, disaster planning, contingency, risk assessment, protect business, avoid risks, business continuity, crisis planning, emergency planning, risk reduction",
    icon: FileText
  },
  {
    type: "Page",
    title: "Technology Blog Articles",
    excerpt: "Technology insights for SMBs. Discover digital tools, AI, automation, business intelligence, and data-driven decision-making strategies.",
    url: "/blog/technology",
    keywords: "technology, business intelligence, BI, analytics, data, reporting, dashboards, AI, automation, digital tools, software, digital transformation, tech tools, business technology, SaaS, software selection, cybersecurity, machine learning, tech adoption",
    icon: FileText
  },
  {
    type: "Page",
    title: "Glossary of Terms - Business Terminology",
    excerpt: "Comprehensive glossary of business terms and definitions. Understand common SMB terminology, financial terms, and business health concepts.",
    url: "/glossary-of-terms",
    keywords: "glossary, terms, definitions, terminology, dictionary, vocabulary, what does mean, define, meaning of, business terms, financial terms, jargon, acronyms, abbreviations, explanations, word meanings, business dictionary",
    icon: BookOpen
  },
  {
    type: "Page",
    title: "Resources - Free Tools & SMB Calculators",
    excerpt: "Access free business resources including ROI calculators, business valuation estimators, cash flow analyzers, and downloadable templates for SMB growth.",
    url: "/resources",
    keywords: "resources, free tools, calculators, ROI calculator, business valuation, cash flow, templates, downloads, free resources, SMB tools, business calculators, estimator, analyzer, valuation calculator, return on investment, business resources, small business tools, free downloads, spreadsheets, checklists, guides, free stuff",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Break-Even Analysis Calculator",
    excerpt: "Calculate your break-even point in minutes. Find exactly how many units you need to sell to cover all costs and start making profit.",
    url: "/biztools/toolbox/breakeven-analysis-calculator",
    keywords: "break-even calculator, break-even analysis, break-even point, contribution margin, profitability calculator, fixed costs, variable costs, business profitability, sales target, free tool, business tool, biztool, calculate break even, find break even, when will I profit, cover costs, unit sales needed, profit point, cost coverage",
    icon: Calculator
  },
  {
    type: "Tool",
    title: "Cash Flow Projection Tool - 12-Month Forecast Calculator",
    excerpt: "Forecast your business cash flow for the next 12 months. Identify cash shortfalls, plan for growth, and make confident financial decisions with our interactive projections.",
    url: "/biztools/toolbox/cash-flow-projection-tool",
    keywords: "cash flow, cashflow projection, cashflow tool, cash flow forecast, cash flow calculator, 12-month forecast, cash flow analysis, financial projection, cash planning, business cash flow, free tool, business tool, biztool, cash flow projection, cashflow forecast, cash flow management, revenue forecast, expense forecast, cash runway, financial planning tool, predict cash flow, forecast finances, future cash, money projection",
    icon: Banknote
  },
  {
    type: "Page",
    title: "Shelf Space Secrets: How Planograms Transform Small Retail Operations",
    excerpt: "Discover how planograms eliminate lost revenue and operational chaos in small retail. Learn strategic shelf placement, inventory management, and visual merchandising to boost sales 5-15%.",
    url: "/blog/planograms-transform-small-retail-operations",
    keywords: "planograms small retail, planogram, planograms, retail shelf management, visual merchandising, retail store layout, shelf space optimization, product placement strategy, retail operations, inventory management, cross-selling retail, upselling retail, eye level shelf placement, retail profitability, small retail efficiency, store organization, merchandise planning, retail space optimization, planogram software, shelf allocation, retail display strategy, product visibility, retail customer experience, store layout, retail inventory, shelf management, visual merchandising tips, retail merchandising, store merchandising, shelf space, gondola, end cap, endcap, aisle layout, retail design, store design, boutique layout, convenience store layout, grocery store layout, shop layout, shelf organization, product arrangement, SKU placement, product mix, category management, retail categories, impulse purchases, checkout display, point of sale display, POS display, retail signage, price tags, shelf labels, stock management, stockout prevention, overstock prevention, inventory turnover, dead stock, slow movers, fast movers, bestsellers, hero products, product adjacencies, complementary products, shopper behavior, customer flow, traffic flow, retail analytics, retail metrics, sales per square foot, revenue per shelf, shelf productivity, retail KPIs, small business retail, independent retail, mom and pop store, small store, boutique, specialty retail, convenience store, grocery, supermarket, hardware store, pet store, gift shop, retail consulting, retail strategy, store profitability, retail profit margins, shrinkage prevention, theft prevention, loss prevention, retail technology, retail software, inventory software, POS system, retail trends, retail best practices, store operations, retail efficiency, retail transformation, retail optimization, merchandising strategy, seasonal displays, promotional displays, retail promotions, in-store marketing, retail marketing, store traffic, foot traffic, customer journey, shopping experience, retail experience",
    icon: FileText
  },
  {
    type: "Curriculum",
    title: "P3: Placement & Planogram - BizGrowth Academy",
    excerpt: "Turn your store layout into a sales machine. Learn where products live, why location matters, and how strategic placement boosts sales 15–30% without spending on advertising.",
    url: "/bizgrowth/growth/retail/p3-placement-planogram",
    keywords: "P3 placement planogram, placement and planogram, retail placement, retail planogram, planogram, planograms, product placement, store layout, retail layout, visual merchandising, shelf space, shelf management, shelf placement, eye level placement, eye level is buy level, product positioning, retail sales, sales optimization, increase sales, boost sales, retail strategy, store zones, traffic patterns, customer flow, foot traffic, decompression zone, strike zone, destination zone, checkout zone, cross-merchandising, cross merchandising, upselling, upsell, basket size, average transaction value, impulse purchases, impulse buying, seasonal displays, seasonal reset, holiday displays, retail refresh, store refresh, DIY planogram, planogram software, planogram template, 30-day pilot, retail pilot, sales per square foot, zone performance, retail metrics, retail KPIs, specialty retail, specialty retailers, boutique, boutique owner, gift shop, gift store, small retail, small business retail, independent retail, physical store, brick and mortar, retail operations, store operations, retail training, retail education, retail course, retail curriculum, BizGrowth Academy, 6 P's retail, six P's, retail framework, strategic placement, product arrangement, shelf organization, gondola, end cap, endcap, aisle layout, store design, retail design, merchandise display, product display, retail display, visual display, retail merchandising, store merchandising, retail transformation, retail improvement, retail optimization, category management, product adjacency, complementary products, bestseller placement, high-margin placement, inventory display, stock placement, retail consultant, retail consulting, retail tips, retail best practices, retail education, small business education, boutique training, gift shop education, specialty retailer training, retail sales increase, boost retail revenue, retail profit, store profitability, sales lift, revenue increase",
    icon: GraduationCap
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
    keywords: "cash flow tracker, cashflow, cash flow tool, income tracker, expense tracker, financial management, invoicing, forecasting, Excel export, money management, budget tracker, track money, monitor cash, log expenses, record income, financial tracking, money tracker, spending tracker, revenue tracker, cash management, daily cash tracking",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Process Mapping & SOP Builder Tools",
    excerpt: "Create professional process maps and standard operating procedures with our visual drag-and-drop process mapping tool. Build process maps, document workflows, and export to Word, Excel, PDF.",
    url: "/biztools/toolbox/process-mapping-tools",
    keywords: "process mapping, SOP, standard operating procedures, workflow, process map, documentation, procedures, workflow builder, process documentation, operations manual, document processes, create SOP, build workflow, visualize process, flowchart, process diagram, procedure template, workflow diagram, operations documentation, step by step guide, how to document, systematize business",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "SWOT Analysis Tool - Strategic Planning Framework",
    excerpt: "Conduct comprehensive SWOT analysis for your small business. Interactive 2x2 matrix builder to identify strengths, weaknesses, opportunities, and threats. Export to Word, Excel, PDF.",
    url: "/biztools/toolbox/swot-analysis-tool",
    keywords: "SWOT, SWOT analysis, strengths, weaknesses, opportunities, threats, strategic planning, strategy tool, competitive analysis, business analysis, analyze business, strategic assessment, market analysis, competitor analysis, internal analysis, external analysis, SWOT matrix, SWOT template, strategic review, business evaluation, identify strengths, find weaknesses, spot opportunities, recognize threats",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Customer Journey Maps Tool - Visualize Client Experience",
    excerpt: "Free customer journey mapping tool for SMBs. Drag-and-drop journey map builder to map customer touchpoints, stages, and emotions. Create a client journey, customer journey map, and customer journey tool with templates and persona support. Export PDF/PNG.",
    url: "/biztools/toolbox/customer-journey-maps-tool",
    keywords: "customer journey, journey map, customer experience, CX, touchpoints, customer mapping, client journey, buyer journey, customer touchpoints, user experience, UX, map customer experience, visualize journey, customer lifecycle, sales funnel, customer stages, buyer experience, client experience, customer path, purchase journey, user journey, experience mapping, customer engagement",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Free ROI Calculator - Investment Return Analysis Tool",
    excerpt: "Free ROI calculator for business investments. Calculate return on investment for new hires, marketing campaigns, and equipment purchases. Compare scenarios, get payback period analysis, and export professional PDF reports.",
    url: "/biztools/toolbox/free-roi-calculator",
    keywords: "ROI calculator, return on investment, investment calculator, payback period, marketing ROI, hiring ROI, equipment ROI, business investment tool, cost-benefit analysis, investment analysis, profitability calculator, calculate ROI, measure return, investment return, is it worth it, cost vs benefit, investment payback, profit calculator, returns calculator, investment decision, financial return, worth the investment",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Free Pricing Net Profit Calculator - Know Your True Profit Per Sale",
    excerpt: "Free pricing calculator for small business owners. Find out if your prices actually make you money. Calculate profit per sale, net margin, break-even point, and get actionable pricing recommendations. Export professional PDF reports.",
    url: "/biztools/toolbox/free-pricing-net-profit-calculator",
    keywords: "pricing calculator, net profit calculator, profit per sale, profit margin, pricing strategy, break even, overhead cost, cost calculator, margin calculator, pricing tool, profitability, price setting, small business pricing, product pricing, service pricing, set prices, calculate profit, margin analysis, how to price, pricing help, price my product, price my service, profit margins, markup calculator, wholesale pricing, retail pricing",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Innovation Strategy Builder - 60-Minute Guided Tool",
    excerpt: "Build a complete innovation strategy in 60 minutes. Free guided tool with 6-step framework: Foundation, Vision, Opportunities, Portfolio (70-20-10 rule), Metrics, and 90-Day Roadmap. Export professional PDF to share with your leadership team.",
    url: "/biztools/toolbox/innovation-strategy-tool",
    keywords: "innovation strategy, strategic planning, innovation framework, innovation tool, 70-20-10 portfolio, innovation roadmap, SMB innovation, business innovation, strategy builder, R&D planning, create innovation plan, build strategy, innovation ideas, new product development, growth innovation, disruptive innovation, innovative thinking, innovation process, creative strategy, transform business",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "BizLeaDeR Leadership Development Bot - Free AI Leadership Mentor",
    excerpt: "Your personal leadership mentor with decades of experience, available 24/7. Navigate difficult conversations, motivate your team, make strategic decisions with confidence.",
    url: "/bizleader/leadership-development-bot",
    keywords: "leadership bot, AI mentor, leadership coach, leadership development, team motivation, strategic decisions, conflict resolution, delegation, leadership questions, management advice, ask leadership questions, get leadership help, become better leader, improve leadership, leadership guidance, leadership tips, manage team, lead better, executive coaching, leadership AI, virtual leadership coach",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "BizGuide Sherpa - Free AI Business Advisor",
    excerpt: "Your on-demand business advisor available 24/7. Navigate cash flow challenges, scale operations, build teams, and grow strategically.",
    url: "/bizguides/bizguide-sherpa",
    keywords: "business advisor, AI advisor, business sherpa, cash flow help, scaling advice, team building, business questions, SMB advisor, business mentor, ask business questions, get business advice, business guidance, business help, virtual consultant, AI consultant, business AI, free business advice, 24/7 advisor, instant business help",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "Innovation Readiness Assessment - Close the Technology Gap in 90 Days",
    excerpt: "Free 20-question assessment to discover your innovation gaps across 4 pillars: Technology Infrastructure, Strategic Clarity, Organizational Capacity, and Customer & Market Sensing. Get personalized recommendations and a 90-day improvement plan.",
    url: "/bizgrowth/technology-innovation-readiness",
    keywords: "innovation readiness, technology assessment, innovation gap, digital transformation readiness, technology infrastructure, innovation assessment, tech readiness, modernization assessment, assess innovation, evaluate technology, tech gap analysis, digital readiness, innovation audit, technology audit, innovation score, tech score, am I ready, innovation capability",
    icon: Target
  },
  {
    type: "Tool",
    title: "Financial Health Check - Quick Business Assessment",
    excerpt: "Quick financial health assessment for your business. Evaluate key financial metrics and get instant recommendations for improvement.",
    url: "/biztools/financials/health-check",
    keywords: "financial health, health check, financial assessment, business finances, financial evaluation, money health, fiscal health, check finances, evaluate finances, financial checkup, money checkup, financial diagnosis, financial review, quick assessment, instant evaluation, financial score",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "FREE 7-Step Strategic Estimating System - Stop Losing Money on Every Job",
    excerpt: "Download the free PDF checklist that transforms your estimating from gut-feel guessing to data-driven profitability. Stop underpricing jobs, eliminate scope creep, and turn every estimate into a profit center.",
    url: "/biztools/toolbox/free-strategic-estimating-system",
    keywords: "estimating system, strategic estimating, job estimating, project estimating, quote calculator, pricing jobs, service business estimating, contractor estimating, bidding system, job costing, profit margins, scope creep, underpricing, overbidding, estimating checklist, estimating PDF, free estimating tool, job pricing, project pricing, quote template, estimate template, pricing guide, labor costs, material costs, overhead allocation, profit margin calculator, break even estimating, cost plus pricing, value based pricing, competitive bidding, winning bids, losing money on jobs, profitable estimates, estimating mistakes, job profitability, service pricing, trade business estimating, landscaping estimating, plumbing estimating, HVAC estimating, electrical estimating, construction estimating, home service estimating, field service estimating, proposal pricing, job quotes, bid pricing, estimate accuracy, cost estimation, price calculation, markup pricing, margin pricing, free tool, BizTool, business tool, how to estimate jobs, create estimates, build quotes, price projects, stop undercharging",
    icon: FileText
  },
  {
    type: "Tool",
    title: "Submit Your Business Ideas | Voice of Customer",
    excerpt: "Share your ideas for new business tools, resources, and content. Your ideas fuel the tools, insights, and resources that help your business thrive.",
    url: "/ideas",
    keywords: "ideas, voice of customer, feedback, suggestions, submit idea, business ideas, feature request, customer input, SMB feedback, business tools ideas, content ideas, resource suggestions, share feedback, give input, request feature, suggest tool, submit suggestion, your ideas, customer voice, user feedback, improvement ideas",
    icon: FileText
  },
  {
    type: "Tool",
    title: "R2A2 Job Description Builder - Free HR Tool",
    excerpt: "Build clear, effective job descriptions using the R2A2 framework: Results, Responsibilities, Authority, and Accountability. Free drag-and-drop builder with PDF export for HR professionals and hiring managers.",
    url: "/biztools/toolbox/hr/r2a2-job-description-builder",
    keywords: "R2A2, job description, job description builder, human resources, HR tool, HR, hiring, job posting, job responsibilities, accountability, authority, results, job duties, role description, position description, hiring manager, recruitment, talent acquisition, free tool, BizTool, business tool, workforce planning, job requirements, job template, HR template, employee roles, job expectations, performance expectations, hiring template, create job description, write job posting, build job description, new hire, open position, job ad, job listing, role requirements",
    icon: Wrench
  },
  {
    type: "Tool",
    title: "HR Maturity Assessment - Human Resources Evaluation Tool",
    excerpt: "Evaluate your organization's HR practices across 8 key pillars. Get personalized recommendations for talent acquisition, performance management, employee engagement, compliance, and workforce planning. Download PDF report.",
    url: "/bizgrowth/hr/human-resources-maturity-assessment",
    keywords: "HR maturity, HR assessment, human resources assessment, HR evaluation, HR audit, HR maturity model, people management, talent management, workforce assessment, HR practices, HR health check, evaluate HR, assess human resources, HR score, HR level, HR gaps, HR improvement, HR strategy, workforce planning, talent acquisition, recruiting assessment, onboarding evaluation, performance management, compensation review, employee engagement, retention assessment, learning development, L&D assessment, HR compliance, compliance audit, employee handbook, HR benchmark, HR scorecard, people operations, HRIS, HR systems, HR maturity level, HR readiness, HR transformation, build HR, improve HR, fix HR, HR problems, HR tool, free HR assessment, HR quiz, HR questionnaire, HR survey, HR checklist, HR best practices",
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
    keywords: "cash squeeze, cash flow fix, financial stability, cash flow course, money management course, financial fundamentals, cash flow training, fix cash flow, solve cash problems, cash flow issues, money problems, tight cash, no cash, running out of money, cash crunch, liquidity problems, cash flow crisis, improve cash flow, manage cash better, cash flow lessons, learn cash flow, cash flow education, financial course, money course",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Human Resources Programs - HR Module for Small Business",
    excerpt: "Master the 10 pillars of HR for growing businesses. From hiring and onboarding to performance management, compliance, and retention. Build an HR system that scales with your business.",
    url: "/bizgrowth/human-resources-programs",
    keywords: "hr, human resources, employee program, hr program, hiring, recruiting, onboarding, talent acquisition, performance management, employee engagement, retention, HR compliance, employee handbook, payroll, compensation, benefits, workforce planning, hr training, hr course, people management, hr module, employee management, staff management, HR systems, personnel, learn HR, HR education, HR for small business, manage employees, hire employees, fire employees, employee issues, HR problems, HR help, people operations, team management, build HR, create HR system, HR basics, HR fundamentals",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "HR 101 Foundation Module - Free HR Training for Small Business",
    excerpt: "Free 5-lesson HR training program. Learn to build essential HR systems in 75 minutes — hiring, onboarding, compliance, and retention. Perfect for first-time business owners with no HR experience.",
    url: "/bizgrowth/hr/hr101-foundation-module",
    keywords: "free hr tools, free human resources tool, free hr training, HR 101, hr 101 foundation, free hr course, free hr resources, hr for beginners, learn hr free, small business hr, hr fundamentals, hr basics, hr essentials, free employee management, startup hr, diy hr, hr without experience, build hr system, hr curriculum, hr education, hr learning, hr program free, free people management, workforce management, talent management, hiring training, onboarding training, retention training, compliance training, hr maturity, employee management free, first time owner hr, no hr experience, hr help, hr guidance, beginner hr, entry level hr, simple hr, easy hr, quick hr training, hr crash course, hr overview, hr introduction, intro to hr",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Voice of Customer (VoC) Curriculum - BizGrowth Academy",
    excerpt: "Build a customer feedback system that actually works. Get a personalized learning path in 60 seconds. 7 modules, ~90 minutes total. No business degree required. Real results in 7 days.",
    url: "/bizgrowth/voice-of-customer",
    keywords: "voice of customer, VoC, VoC curriculum, customer feedback, customer feedback system, customer listening, customer experience, CX, customer satisfaction, NPS, net promoter score, CSAT, customer surveys, feedback collection, customer insights, customer retention, churn prevention, customer loyalty, closed loop feedback, feedback loop, customer perception gap, personalized learning path, VoC program, VoC training, customer voice, listening to customers, customer complaints, customer reviews, customer data, customer analytics, customer success, feedback management, survey design, customer interview, customer research, VoC system, VoC framework, VoC methodology, 7 modules, bizgrowth academy, customer centric, customer focus, customer obsession, understand customers, customer needs, customer pain points, customer journey, touchpoints, feedback tracker, customer feedback tracker, 7 day results, SMB customer feedback, small business VoC, customer feedback for small business, how to collect feedback, how to listen to customers, customer feedback best practices",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Module 1: Why VoC Matters - Voice of Customer Curriculum",
    excerpt: "Learn why Voice of Customer is your #1 competitive advantage. Discover the business case for VoC, 41% revenue uplift stats, and complete a self-assessment quiz to understand where you stand.",
    url: "/bizgrowth/voc/why-it-matters",
    keywords: "why VoC matters, VoC module 1, voice of customer module, customer feedback business case, VoC ROI, VoC benefits, customer feedback importance, why customer feedback matters, VoC competitive advantage, VoC self assessment, VoC quiz, customer feedback ROI, 41% revenue uplift, customer retention savings, customer feedback system benefits, flying blind, customer listening system, VoC four step cycle, listen analyze act monitor, customer perception gap, VoC training module, VoC curriculum module 1, bizgrowth academy VoC, customer feedback learning, VoC for SMB, small business customer feedback, VoC business case, customer feedback matters, feedback importance, why listen to customers, customer insight value, VoC segment selector, business stage assessment, launch growth scaling enterprise",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Module 2: The Four Core Components - Voice of Customer Curriculum",
    excerpt: "Master the 4 essential VoC components: active + passive feedback collection, omnichannel listening, closing the loop, and centralized data management. Free feedback tracker template included.",
    url: "/bizgrowth/voc/core-components",
    keywords: "VoC core components, VoC module 2, four components, active feedback, passive feedback, omnichannel listening, closing the loop, centralized data, feedback tracker, feedback collection methods, customer surveys, review monitoring, social listening, support tickets, feedback channels, response loop, customer follow-up, feedback data management, VoC system components, VoC training module 2, bizgrowth academy VoC, feedback tracker template, free feedback tracker, NPS survey, CSAT survey, post-purchase survey, review collection, Google reviews, feedback consolidation, customer data hub, VoC architecture, VoC building blocks, VoC framework, VoC system design, multi-channel feedback, customer touchpoints, feedback sources, VoC best practices, SMB feedback system, small business VoC system, how to collect feedback, feedback collection guide",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Module 3: Measuring What Matters - Voice of Customer Curriculum",
    excerpt: "Learn to measure customer satisfaction with 4 proven metrics: NPS, CSAT, CES, and Sentiment Analysis. Interactive NPS calculator, downloadable survey templates, and 7-day quick start checklist included.",
    url: "/bizgrowth/voc/metrics",
    keywords: "VoC metrics, VoC module 3, measuring customer satisfaction, NPS, net promoter score, CSAT, customer satisfaction score, CES, customer effort score, sentiment analysis, NPS calculator, customer metrics, satisfaction metrics, customer feedback metrics, survey metrics, loyalty metrics, customer loyalty score, promoters detractors passives, NPS survey, CSAT survey, CES survey, sentiment tracking, feedback measurement, customer analytics, VoC measurement, measure customer experience, track customer satisfaction, customer score, NPS benchmark, CSAT benchmark, VoC KPIs, customer feedback KPIs, satisfaction KPIs, loyalty measurement, retention metrics, churn prediction, customer health score, feedback analytics, VoC dashboard, metrics template, survey template, NPS template, CSAT template, VoC training module 3, bizgrowth academy VoC, customer metrics guide, how to measure satisfaction, which metric to use, choosing customer metrics, 7 day quick start, metric trends, trend analysis",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Module 4: Closing the Loop - Voice of Customer Curriculum",
    excerpt: "Master the 6-step closed-loop process that transforms customer feedback into loyalty. Includes 5 ready-to-use email templates for every scenario and interactive progress tracking.",
    url: "/bizgrowth/voc/closing-the-loop",
    keywords: "closing the loop, VoC module 4, customer feedback response, feedback loop, closed-loop process, customer recovery, detractor outreach, feedback acknowledgment, customer loyalty, VoC follow-up, feedback response templates, email templates, customer response, loop closure, feedback system, VoC best practices, customer advocacy, promoter conversion, feedback management, response time, 48 hour response, customer retention, feedback acknowledgment email, detractor recovery, you asked we delivered, honest no response, customer communication, feedback ownership, VoC training module 4, bizgrowth academy VoC, how to respond to feedback, customer complaint response, negative review response, turning complaints into loyalty",
    icon: GraduationCap
  },
  {
    type: "Curriculum",
    title: "Module 5: Your 7-Day Quick Start - Voice of Customer Curriculum",
    excerpt: "Transform from learner to implementer with a realistic 7-day VoC action plan. Collect real feedback, find patterns, and make ONE visible improvement this week with interactive day-by-day progress tracking.",
    url: "/bizgrowth/voc/7-day-quickstart",
    keywords: "7 day VoC plan, VoC quick start, customer feedback implementation, VoC action plan, survey templates, feedback tracker, closing the loop, customer insights implementation, VoC module 5, week one VoC, first VoC survey, VoC launch, start VoC program, implement customer feedback, collect feedback, analyze feedback, act on feedback, feedback patterns, customer themes, quick win, VoC momentum, day by day plan, VoC checklist, VoC tracker, bizgrowth academy VoC, how to start VoC, VoC for beginners, practical VoC, VoC implementation guide, 7 day challenge, weekly VoC plan, VoC kickoff, feedback collection day, insight analysis, customer insight action, first improvement",
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
    keywords: "landscaping, lawn care, landscaping business, outdoor services, seasonal business, crew management, landscaping company, lawn service, landscape contractor, lawn maintenance, yard work, grounds maintenance, hardscaping, softscaping, landscape design, mowing business, lawn mowing, landscape company, grow landscaping business, scale landscaping, landscaping crew, landscaping equipment, landscaping pricing, landscaping estimates, seasonal cash flow, off-season planning, landscape industry, green industry, outdoor contractor",
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
    keywords: "what is bizhealth, about bizhealth, platform description, service overview, explain bizhealth, bizhealth explanation, what does bizhealth do, how does bizhealth work, bizhealth overview, bizhealth summary, tell me about bizhealth, bizhealth intro, bizhealth introduction",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "How much does BizHealth.ai cost?",
    excerpt: "Pricing ranges from $99 to $699 for a one-time diagnostic, delivering 20-25x ROI by replacing costly consulting.",
    url: "/faqs#pricing",
    keywords: "cost, pricing, how much, price, fees, investment, payment, what does it cost, pricing info, price list, rates, affordable, cheap, expensive, budget, cost breakdown, pricing options, payment plans, one time fee, subscription cost",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "Who is BizHealth.ai for?",
    excerpt: "We serve micro-, small-, and mid-sized businesses (1-250 employees, $100K-$50M revenue) including founders, CEOs, COOs, CFOs, and managers.",
    url: "/faqs#who-for",
    keywords: "who is it for, target audience, business size, ideal customer, is this for me, right for my business, business type, company size, who should use, who benefits, small business, mid size business, SMB, entrepreneur, founder, CEO, business owner, right fit",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "Is my data secure?",
    excerpt: "Yes, we use encryption (in-transit/at-rest), access controls, and SOC 2-aligned audits. We comply with GDPR/CCPA.",
    url: "/faqs#data-security",
    keywords: "data security, privacy, encryption, secure, data protection, compliance, is it safe, safe to use, trust, trusted, data safety, information security, protected, confidential, private, security measures, how secure, security policy, data handling",
    icon: HelpCircle
  },
  {
    type: "FAQ",
    title: "How long does it take to get my report?",
    excerpt: "Reports are ready within 90 minutes post-assessment, with an email notification alerting you.",
    url: "/faqs#report-time",
    keywords: "report time, how long, turnaround, delivery time, when do I get, report delivery, wait time, processing time, results time, how fast, quick results, instant results, same day, report ready, get results, receive report, report timing",
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

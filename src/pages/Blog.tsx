import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import businessHealthImage from "@/assets/business-health-assessment-comprehensive.jpg";
import warningSignsImage from "@/assets/business-warning-signs-management.jpg";
import aiAnalyticsImage from "@/assets/ai-business-analytics-dashboard.jpg";
import financialMetricsImage from "@/assets/financial-health-metrics-dashboard.jpg";
import resilienceImage from "@/assets/operational-resilience-strategy.jpg";
import biRoiImage from "@/assets/business-intelligence-roi-analytics.jpg";
import strategicPlanningImage from "@/assets/strategic-planning-post-pandemic.jpg";
import pivotImage from "@/assets/business-pivot-strategy-transformation.jpg";
import leadershipStressImage from "@/assets/business-leadership-stress-success.png";
import retailToolsImage from "@/assets/retail-remote-tools-family-business.jpg";
import dailyGrindImage from "@/assets/daily-grind-food-business-operations.jpg";
import realTimeAnalyticsImage from "@/assets/real-time-analytics-smb-agility-volatile-markets.jpg";
import workforceGapsImage from "@/assets/smb-workforce-gaps-talent-analytics-2025.jpg";
import talentWarsImage from "@/assets/talent-wars-smb-hiring-2025.jpg";
import businessAnalystImage from "@/assets/business-analyst-dashboard-optimized.jpg";
import smbTeamHeroImage from "@/assets/smb-team-collaboration-hero.webp";
import smbFinancialTrendsImage from "@/assets/2025-smb-financial-trends-cash-flow-strategies.jpg";
import ecommerceScalingImage from "@/assets/e-commerce-scaling-smb-strategies-2025.jpg";
import cashFlowHacksImage from "@/assets/smb-cash-flow-hacks-2025.jpg";
import informationOverloadImage from "@/assets/information-overload-business-leader.jpg";
import q4CostCutsImage from "@/assets/q4-cost-cuts-operational-fixes-2025.jpg";
import cashFlowCrisisImage from "@/assets/cash-flow-crisis-management-2025.jpg";
import smbScalingParadoxImage from "@/assets/smb-scaling-paradox-2025.jpg";
import aiAdoptionImage from "@/assets/ai-adoption-skeptical-business-owners-2025.jpg";
import survivalChecklistImage from "@/assets/small-business-survival-checklist-2025.jpg";
import blindSpotsImage from "@/assets/business-blind-spots-assessment.png";
import confirmWeaknessesImage from "@/assets/confirm-business-weaknesses-without-consultants.png";
import smallBusinessStrugglesImage from "@/assets/small-business-struggles-fixing-wrong-problems.png";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const featuredPost = {
    title: "The Complete Guide to Business Health Assessment in 2025",
    excerpt: "As a business leader, you're no stranger to the whirlwind of running a company—juggling finances, operations, and team dynamics while keeping your eyes on the horizon for growth. But what if the cracks forming beneath the surface are quietly stalling your progress? That's where a Business Health Assessment comes in—a clear-eyed look at your company's vital signs to spot issues before they spiral into costly problems.",
    author: "Dennis Hough",
    date: "July 27, 2025",
    readTime: "15 min read",
    category: "Business Strategy",
    featured: true,
    imageUrl: businessHealthImage,
    altText: "Comprehensive business health assessment with diagnostic charts and performance metrics for overall company wellness"
  };

  const blogPosts = [
    {
      title: "Why So Many Small Businesses Struggle: They're Fixing the Wrong Problems",
      excerpt: "Discover why 70% of SMBs face cash flow challenges and 60% stall after year three. Learn how AI-powered business health diagnostics uncover blind spots and drive sustainable growth without guesswork.",
      author: "BizHealth.ai Team",
      date: "November 13, 2025",
      readTime: "12 min read",
      category: "Business Strategy, Business Leadership",
      slug: "/blog/small-business-struggles",
      imageUrl: smallBusinessStrugglesImage,
      altText: "Small business owner facing operational challenges and pain points in 2025",
      keywords: "business health analysis, small business diagnostics, SMB pain points, cash flow challenges, business growth strategies, blind spots, operational issues, business assessment, diagnostic tools, AI analytics, small business, small business struggles"
    },
    {
      title: "How to Confirm Your Business Weaknesses Without Expensive Consultants",
      excerpt: "Learn how AI-powered business health assessments help SMB leaders identify operational weaknesses, hidden business gaps, and blind spots without consultant fees—discover affordable diagnostic tools for 2025.",
      author: "BizHealth.ai Research Team",
      date: "November 5, 2025",
      readTime: "8 min read",
      category: "Business Strategy, Business Intelligence, Operations",
      slug: "/blog/confirm-business-weaknesses-without-consultants",
      imageUrl: confirmWeaknessesImage,
      altText: "Business diagnostic assessment revealing operational weaknesses and hidden business gaps for small business owners seeking affordable alternatives to expensive consultants",
      keywords: "business weaknesses, operational gaps, diagnostic tools, consultant alternatives, business assessment, affordability, AI analytics, hidden gaps, business intelligence, SMB diagnostics"
    },
    {
      title: "The Business Blind Spots Costing SMB Leaders $50K+ Annually (And Why You Can't See Them)",
      excerpt: "Discover the 5 dangerous business blind spots draining SMB profits in 2025. Learn how to identify financial, operational, and strategic gaps before they cost you $50K+ annually.",
      author: "BizHealth.ai Research Team",
      date: "November 4, 2025",
      readTime: "11 min read",
      category: "Business Strategy, Financial Management, Business Intelligence",
      slug: "/blog/small-business-blind-spots-2025",
      imageUrl: blindSpotsImage,
      altText: "Business leader with blindfold representing small business blind spots and hidden operational challenges in strategic planning",
      keywords: "blind spots, financial losses, hidden costs, strategic gaps, profit drains, visibility issues, business intelligence, operational blind spots, financial blind spots, risk assessment"
    },
    {
      title: "The Small Business Survival Checklist: What 500+ Reddit Founders Wish They Knew in Year One",
      excerpt: "Learn from 500+ founders about first-year challenges, essential metrics, and KPIs that separate successful businesses from the 23.2% that fail within 12 months.",
      author: "BizHealth.ai Research Team",
      date: "October 24, 2025",
      readTime: "11 min read",
      category: "Business Strategy, Business Leadership, Risk Management",
      slug: "/blog/small-business-survival-checklist-2025",
      imageUrl: survivalChecklistImage,
      altText: "Small business owner in crisis management - first year survival strategies and business health assessment 2025",
      keywords: "survival checklist, first year business, startup metrics, KPIs, business failure, founder insights, Reddit founders, startup survival, year one challenges, success metrics"
    },
    {
      title: "AI Adoption for Skeptical Owners—A No-BS Guide for Business Owners",
      excerpt: "Skip the hype. Discover practical AI tools for small business owners in 2025—automate tasks, boost efficiency, and save money without technical expertise.",
      author: "BizHealth.ai Research Team",
      date: "November 4, 2025",
      readTime: "12 min read",
      category: "Technology, Business Strategy",
      slug: "/blog/small-business-ai-adoption",
      imageUrl: aiAdoptionImage,
      altText: "Small business owner analyzing AI adoption strategies and skeptical approach to business technology implementation in 2025",
      keywords: "AI adoption, artificial intelligence, automation tools, business efficiency, technology implementation, skeptical owners, practical AI, small business technology, AI tools, business automation"
    },
    {
      title: "The SMB Scaling Paradox: Why Growing Too Fast Is Killing Your Business (And What to Do Instead)",
      excerpt: "Discover why 60% of SMBs stall post-year 3 due to rapid scaling. Learn profitable scaling strategies, decision frameworks, and how to avoid business scaling challenges in 2025.",
      author: "BizHealth.ai Research Team",
      date: "November 4, 2025",
      readTime: "10 min read",
      category: "Business Strategy, Risk Management, Business Leadership",
      slug: "/blog/smb-scaling-paradox-2025",
      imageUrl: smbScalingParadoxImage,
      altText: "Modern green and white commercial building representing scaling small business growth and SMB expansion strategy with upward trending architecture",
      keywords: "business scaling, growth challenges, scaling paradox, rapid growth, sustainable scaling, scaling strategies, business expansion, SMB growth, scaling frameworks, growth management"
    },
    {
      title: "Cash Flow Crisis Management: Why 60% of Small Businesses Are Down in 2025",
      excerpt: "Master cash flow management for small business in 2025. Learn crisis prevention strategies, cash flow planning tips, and how to avoid the pitfalls affecting 60% of SMBs today.",
      author: "BizHealth.ai Research Team",
      date: "November 3, 2025",
      readTime: "8 min read",
      category: "Financial Management, Business Strategy, Technology",
      slug: "/blog/cash-flow-crisis-management",
      imageUrl: cashFlowCrisisImage,
      altText: "Business financial crisis with declining cash flow charts and warning indicators for small business cash management",
      keywords: "cash flow crisis, cash management, financial planning, working capital, liquidity management, crisis prevention, cash flow forecasting, financial health, cash flow strategies, SMB finance"
    },
    {
      title: "Q4 Cost Crunches: Operational Cost Fixes 2025 for Cash-Strapped Small Businesses",
      excerpt: "Navigate Q4 2025 cash crunches with proven operational cost fixes for small businesses. Learn efficiency diagnostics strategies to combat inflation's impact and achieve 15-20% cost savings.",
      author: "BizHealth.ai Research Team",
      date: "November 3, 2025",
      readTime: "5 min read",
      category: "Operations, Financial Management",
      slug: "/blog/Q4-Cost-Cuts-2025",
      imageUrl: q4CostCutsImage,
      altText: "Operational cost cutting strategies with scissors cutting through stacks of cash representing small business financial management and cost reduction for 2025",
      keywords: "Q4 cost cuts, operational costs, cost reduction, efficiency improvements, inflation strategies, cost savings, expense management, small business costs, Q4 planning, operational efficiency"
    },
    {
      title: "The Pitfall of Information Overload: Why General Advice Falls Short",
      excerpt: "Discover why generic business advice fails SMBs and how AI-powered business health diagnostics deliver actionable insights for operational excellence and sustainable growth.",
      author: "BizHealth Research Team",
      date: "October 21, 2025",
      readTime: "9 min read",
      category: "Business Strategy",
      slug: "/blog/impact-over-information",
      imageUrl: informationOverloadImage,
      altText: "Frustrated business leader overwhelmed by information overload and generic business advice strategies",
      keywords: "information overload, generic advice, business diagnostics, actionable insights, specific solutions, targeted strategies, business intelligence, data-driven decisions, customized advice, practical solutions"
    },
    {
      title: "5 Cash Flow Hacks Every Micro-Business Owner Needs in 2025",
      excerpt: "Master micro-business cash flow management with 5 proven strategies for 2025. Automate billing, forecast with AI, optimize inventory, negotiate terms, and diversify funding to boost liquidity by 30%.",
      author: "BizHealth.ai Research Team",
      date: "October 14, 2025",
      readTime: "6 min read",
      category: "Business Strategy, Financial Management",
      slug: "/blog/smb-cash-flow-hacks-2025",
      imageUrl: cashFlowHacksImage,
      altText: "Micro-business owner analyzing cash flow strategies and financial management on computer with documents - essential cash flow hacks for 2025 success",
      keywords: "cash flow hacks, micro-business, liquidity management, billing automation, AI forecasting, inventory optimization, payment terms, funding diversification, working capital, cash flow tips"
    },
    {
      title: "E-Commerce Scaling: 5 Strategies for SMBs Thriving in 2025",
      excerpt: "Unlock 5 proven e-commerce scaling strategies for SMBs in 2025. AI personalization, omnichannel sales, mobile optimization & data-driven growth—read now!",
      author: "The BizHealth.ai Research Team",
      date: "October 13, 2025",
      readTime: "7 min read",
      category: "Business Strategy",
      slug: "/blog/e-commerce-scaling-5-strategies-for-smbs-thriving-in-2025",
      imageUrl: ecommerceScalingImage,
      altText: "E-commerce analytics dashboard showing sales growth metrics and customer engagement data for SMB scaling strategies in 2025",
      keywords: "e-commerce scaling, online business, digital commerce, AI personalization, omnichannel sales, mobile optimization, data-driven growth, e-commerce strategies, SMB e-commerce, online retail"
    },
    {
      title: "2025 SMB Financial Trends: From Uncertainty to Predictable Growth",
      excerpt: "Discover how SMBs can shift from reactive guessing to data-driven, predictable growth with AI business analytics, small business cash flow strategies, and financial automation insights for 2025.",
      author: "BizHealth Research Team",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: "7 min read",
      category: "Business Strategy, Financial Management",
      slug: "/blog/2025-smb-financial-trends",
      imageUrl: smbFinancialTrendsImage,
      altText: "Business team presenting cash flow strategies and financial analytics on interactive dashboard with charts showing SMB financial trends 2025",
      keywords: "financial trends 2025, SMB finance, predictable growth, financial automation, AI analytics, data-driven decisions, business forecasting, financial planning, revenue trends, growth strategies"
    },
    {
      title: "Talent Wars: Hiring Strategies for SMB Leaders in 2025 Shortages",
      excerpt: "Master SMB hiring strategies for 2025 talent shortages. Expert insights on leadership strategies, retention tips, and AI-powered recruitment to win the talent wars and build resilient teams.",
      author: "BizHealth.ai Research Team",
      date: "October 14, 2025",
      readTime: "7 min read",
      category: "Business Leadership",
      slug: "/blog/talent-wars-smb-hiring-2025",
      imageUrl: talentWarsImage,
      altText: "Professional SMB hiring interview showing business leader conducting talent acquisition strategy meeting with candidate discussing retention tips and leadership strategies for 2025 workforce challenges",
      keywords: "talent wars, hiring strategies, talent shortages, recruitment, retention strategies, HR tactics, workforce planning, talent acquisition, employee retention, leadership hiring"
    },
    {
      title: "People-First Challenges: Solving SMB Workforce Gaps 2025",
      excerpt: "Discover actionable SMB growth strategies to solve workforce challenges in 2025. Learn how AI business analytics, talent planning tools, and data-driven insights can bridge talent gaps and boost retention.",
      author: "BizHealth Research Team",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: "6 min read",
      category: "Business Leadership, Operations",
      slug: "/blog/solving-smb-workforce-gaps-2025",
      imageUrl: workforceGapsImage,
      altText: "Business leaders analyzing SMB workforce talent gaps and retention metrics on digital analytics dashboard displaying performance data charts in modern office 2025",
      keywords: "workforce gaps, talent planning, people analytics, retention strategies, staffing challenges, HR solutions, talent management, workforce optimization, employee engagement, skills gaps"
    },
    {
      title: "Real-Time Analytics: Powering SMB Agility in Volatile Markets",
      excerpt: "Transform your SMB with real-time BI in 2025. Expert insights on analytics agility, data-driven decisions, and performance tracking for competitive advantage in volatile markets.",
      author: "BizHealth Research Team",
      date: "September 26, 2025",
      readTime: "10 min read",
      category: "Business Intelligence",
      slug: "/blog/real-time-analytics-smb-agility",
      imageUrl: realTimeAnalyticsImage,
      altText: "Real-time analytics dashboard displaying SMB business intelligence metrics for volatile market agility with team collaboration in modern office setting",
      keywords: "real-time analytics, business intelligence, market agility, performance tracking, data dashboards, competitive advantage, market volatility, analytics tools, live data, business metrics"
    },
    {
      title: "Daily Grind Fixes: Ops Tips for Early-Stage Food Businesses",
      excerpt: "Transform your early-stage food business with smart operational strategies. Master inventory, supply chain, and lifestyle balance for sustainable growth.",
      author: "BizHealth Research Team",
      date: "September 25, 2025",
      readTime: "10 min read",
      category: "Operations",
      slug: "/blog/daily-grind-fixes",
      imageUrl: dailyGrindImage,
      altText: "Professional food service team in commercial kitchen preparing healthy meal components with fresh ingredients, demonstrating efficient food business operations and teamwork",
      keywords: "food business operations, restaurant management, inventory management, supply chain, operational efficiency, kitchen operations, food service, startup restaurant, food industry, operational tips"
    },
    {
      title: "Why Success Feels Like a Mirage and How to Overcome Leadership Stress",
      excerpt: "As a business leader, discover how to reframe risks, build resilience, and find peace in the storm of leadership without adding more burden to your plate.",
      author: "BizHealth Research Team",
      date: "September 24, 2025",
      readTime: "12 min read",
      category: "Business Leadership",
      slug: "/blog/leadership-stress-success",
      imageUrl: leadershipStressImage,
      altText: "Business leader experiencing stress while working with financial reports and analytics charts on desk",
      keywords: "leadership stress, business success, mental health, resilience building, stress management, leadership challenges, work-life balance, entrepreneurial stress, leader wellbeing, stress relief"
    },
    {
      title: "Retail Remote Tools: 2025 Tech for Family-Owned Micro Ventures",
      excerpt: "Discover how family-owned micro retailers can leverage remote tools to streamline operations while preserving their personal touch.",
      author: "BizHealth Research Team",
      date: "September 24, 2025",
      readTime: "12 min read",
      category: "Technology",
      slug: "/blog/retail-remote-tools",
      imageUrl: retailToolsImage,
      altText: "Multi-generational family business team collaborating with technology in modern retail environment",
      keywords: "retail technology, remote tools, family business, micro retail, operational tools, POS systems, inventory software, retail automation, small retail, business technology"
    },
    {
      title: "5 Warning Signs Your Business Needs Immediate Attention",
      excerpt: "Discover the early indicators that suggest your business may be heading for trouble and what you can do about them.",
      author: "BizHealth Research Team",
      date: "September 12, 2025",
      readTime: "8 min read",
      category: "Risk Management",
      slug: "/blog/warning-signs-business",
      imageUrl: warningSignsImage,
      altText: "Business warning signs and risk management visualization with danger indicators and declining performance metrics",
      keywords: "warning signs, business risks, red flags, early indicators, crisis prevention, business trouble, risk assessment, decline warning, business health check, danger signals"
    },
    {
      title: "How AI is Revolutionizing Small Business Analytics",
      excerpt: "Explore how artificial intelligence is making enterprise-level business intelligence accessible to small and medium businesses.",
      author: "BizHealth Research Team",
      date: "September 12, 2025", 
      readTime: "10 min read",
      category: "Technology",
      slug: "/blog/ai-business-analytics",
      imageUrl: aiAnalyticsImage,
      altText: "AI-powered business analytics dashboard with futuristic data visualizations and machine learning for small business success",
      keywords: "AI analytics, artificial intelligence, business intelligence, machine learning, data analytics, AI tools, predictive analytics, automated insights, smart analytics, AI revolution"
    },
    {
      title: "Financial Health Metrics Every Business Owner Should Track",
      excerpt: "A comprehensive guide to the key financial indicators that provide insight into your business's current and future performance.",
      author: "BizHealth Research Team",
      date: "September 12, 2025",
      readTime: "15 min read",
      category: "Financial Management",
      slug: "/blog/financial-health-metrics",
      imageUrl: financialMetricsImage,
      altText: "Financial health metrics and KPI dashboard with profit charts and business performance indicators",
      keywords: "financial metrics, KPIs, financial indicators, profit margins, revenue tracking, cash flow metrics, financial ratios, performance metrics, financial health, business KPIs"
    },
    {
      title: "Building Operational Resilience in Uncertain Times",
      excerpt: "Strategies for creating business systems that can withstand market volatility and unexpected challenges.",
      author: "BizHealth Research Team",
      date: "September 12, 2025",
      readTime: "11 min read",
      category: "Operations",
      slug: "/blog/operational-resilience",
      imageUrl: resilienceImage,
      altText: "Operational resilience and business continuity strategy with interconnected systems and adaptive processes",
      keywords: "operational resilience, business continuity, crisis management, adaptive systems, risk mitigation, operational stability, contingency planning, resilient operations, business flexibility, disruption management"
    },
    {
      title: "The ROI of Business Intelligence for SMBs",
      excerpt: "Real-world case studies showing how small and medium businesses achieve measurable returns from business intelligence investments.",
      author: "BizHealth Research Team",
      date: "September 12, 2025",
      readTime: "9 min read",
      category: "Business Intelligence",
      slug: "/blog/business-intelligence-roi",
      imageUrl: biRoiImage,
      altText: "Business intelligence ROI visualization with investment returns and analytics charts for small business success",
      keywords: "business intelligence ROI, BI investment, analytics returns, data ROI, BI case studies, analytics value, investment returns, BI benefits, measurable results, analytics impact"
    },
    {
      title: "Strategic Planning for the Post-Pandemic Business Landscape",
      excerpt: "How to adapt your business strategy for the new realities of remote work, supply chain disruptions, and changing consumer behavior.",
      author: "BizHealth Research Team",
      date: "September 12, 2025",
      readTime: "13 min read",
      category: "Business Leadership",
      slug: "/blog/strategic-planning-post-pandemic",
      imageUrl: strategicPlanningImage,
      altText: "Strategic planning for post-pandemic business landscape with remote work and digital transformation elements",
      keywords: "strategic planning, post-pandemic, business adaptation, remote work strategy, supply chain, consumer behavior, business transformation, pandemic recovery, strategic adaptation, business strategy"
    },
    {
      title: "When to Pivot: Data-Driven Signals That It's Time to Change Course",
      excerpt: "Learn to recognize the quantifiable indicators that signal when your business model needs a strategic pivot.",
      author: "BizHealth Research Team",
      date: "September 12, 2025",
      readTime: "10 min read",
      category: "Business Leadership",
      slug: "/blog/when-to-pivot",
      imageUrl: pivotImage,
      altText: "Business pivot and strategic transformation with directional arrows and data-driven decision making charts",
      keywords: "business pivot, strategic change, pivot signals, business transformation, strategic pivot, course correction, business model change, pivot strategy, data signals, strategic shift"
    }
  ];

  const categories = [
    "All Posts",
    "Business Strategy", 
    "Financial Management",
    "Operations",
    "Technology",
    "Risk Management",
    "Business Intelligence",
    "Business Leadership"
  ];

  // State for filtering and search
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle URL search parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  // Enhanced filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category (support multiple categories separated by commas)
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter(post => {
        const categories = post.category.split(',').map(c => c.trim());
        return categories.includes(selectedCategory);
      });
    }

    // Enhanced search across all fields including keywords
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower) ||
        post.altText.toLowerCase().includes(searchLower) ||
        (post.keywords && post.keywords.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm, blogPosts]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Business Insights & Growth Strategies Blog | BizHealth.ai"
        description="Expert insights, practical strategies, and data-driven analysis for SMB leaders. Learn from business intelligence experts about operations, finance, leadership, and growth."
        keywords="business blog, SMB insights, business strategy, operational excellence, financial management, leadership development, business intelligence, growth strategies"
        canonical="https://bizhealth.ai/blog"
      />
      <StructuredData 
        type="organization"
      />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src={smbTeamHeroImage} 
          alt="Team discussing business growth strategies"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        
        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-primary/70" />
        
        {/* Content Container */}
        <div className="relative h-full container mx-auto px-6 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-4xl w-full text-center space-y-6">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Business Insights & Strategies
              </h1>
              
              {/* Description Text */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Expert insights, practical strategies, and data-driven analysis to help you navigate the complexities 
                of modern business. Learn from our team's decades of experience.
              </p>
            </div>
          </div>
          
          {/* Search Bar - Bottom of Hero */}
          <div className="flex justify-center pb-8">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search blogs, categories, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className="w-full pl-10 pr-20 py-3 border border-border rounded-lg bg-background/95 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-lg"
              />
              <button
                onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Content Column */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Featured</span>
                    <span className="text-white/80 text-sm">{featuredPost.category}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-6 text-white/80 flex-wrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <a 
                    href="/blog/business-health-assessment-2025" 
                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Image Column */}
                <div className="relative">
                  <img 
                    src={featuredPost.imageUrl}
                    alt={featuredPost.altText}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Search Bar - Blog Posts Only */}
            <div className="flex justify-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                  className="w-full pl-10 pr-20 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  onClick={() => document.activeElement instanceof HTMLElement && document.activeElement.blur()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchTerm("");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-background border border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pt-8 pb-20 bg-biz-grey/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Count */}
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                {filteredPosts.length === blogPosts.length 
                  ? `Showing all ${filteredPosts.length} posts` 
                  : `Found ${filteredPosts.length} of ${blogPosts.length} posts`}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "All Posts" && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link 
                    key={index} 
                    to={post.slug}
                    className="group"
                  >
                    <article className="border border-border rounded-lg overflow-hidden bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 animate-fade-in cursor-pointer h-full flex flex-col">
                      {/* Thumbnail Image */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={`Thumbnail: ${post.altText}`}
                          className="w-full h-48 md:h-42 object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ aspectRatio: '16/9' }}
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3 text-foreground leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors font-medium text-sm">
                          Read Article
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">No posts found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Posts");
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear filters and show all posts
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get our latest insights, tools, and strategies delivered straight to your inbox. 
              Join over 2,500 business owners who trust our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time. Read our privacy policy.
            </p>
          </div>
        </div>
      </section>

      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default Blog;
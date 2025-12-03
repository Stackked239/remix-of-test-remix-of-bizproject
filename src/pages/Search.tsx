import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PromotionalBanner from "@/components/PromotionalBanner";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, FileText, HelpCircle, Home, DollarSign, Mail, ArrowRight } from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Get search term from URL
  useEffect(() => {
    const urlSearchTerm = searchParams.get('q');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  // Update URL when search changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      setSearchParams({ q: term });
    } else {
      setSearchParams({});
    }
  };

  // All searchable content
  const searchableContent = {
    pages: [
      {
        type: "Page",
        title: "Home - BizHealth.ai",
        excerpt: "Your Trusted Business Health Advisor – AI-Powered Diagnostics for SMBs. Stop Guessing, Start Growing with business health assessments.",
        url: "/",
        icon: Home
      },
      {
        type: "Page",
        title: "Pricing - Business Health Assessment Plans",
        excerpt: "Choose the perfect plan for your business. Essentials, Growth, and Enterprise tiers from $99-$699. 20-25x ROI with AI-powered diagnostics.",
        url: "/pricing",
        icon: DollarSign
      },
      {
        type: "Page",
        title: "Contact Us - Get in Touch",
        excerpt: "Contact BizHealth.ai for support, inquiries, or partnership opportunities. Email: support@bizhealth.ai",
        url: "/contact",
        icon: Mail
      },
      {
        type: "Page",
        title: "About BizHealth.ai",
        excerpt: "Learn about our mission to provide affordable, AI-powered business health diagnostics for SMBs across operations, finance, and leadership.",
        url: "/about",
        icon: Home
      },
      {
        type: "Page",
        title: "Get Started - Register for BizHealth.ai",
        excerpt: "Get started with BizHealth.ai today. Register your account to access AI-powered business insights and analytics for SMBs. Create your account and join 10,000+ businesses.",
        url: "/register",
        icon: Home
      },
      {
        type: "Page",
        title: "How It Works - BizHealth.ai Business Assessment",
        excerpt: "Discover how BizHealth.ai works: Choose your assessment tier ($199-$799), complete 45-80 questions covering 12 critical business dimensions, and receive your comprehensive health report within 90 minutes.",
        url: "/how-it-works",
        icon: HelpCircle
      },
      {
        type: "Page",
        title: "How It Works - BizTools",
        excerpt: "Learn how BizTools works: Take a business health assessment, get custom recommendations, access free tools, and upgrade when ready.",
        url: "/biztools/how-it-works",
        icon: HelpCircle
      },
      {
        type: "Page",
        title: "Frequently Asked Questions - FAQs",
        excerpt: "Get quick answers to your SMB health questions with BizHealth.ai's FAQs. Find answers about pricing, security, reports, assessments, and more. FAQ help center for business owners.",
        url: "/faqs",
        icon: HelpCircle
      },
      {
        type: "Page",
        title: "BizGuides - From Gaps to Guided Wins",
        excerpt: "Expert consulting services to implement insights from your business health assessment. Partner consulting network launching Q1 2026.",
        url: "/bizguides",
        icon: Home
      },
      {
        type: "Page",
        title: "BizTools - Scalable Essentials at Your Fingertips",
        excerpt: "Business tools, templates, and resources to support SMB growth and operational excellence.",
        url: "/biztools",
        icon: Home
      },
      {
        type: "Page",
        title: "BizTools Toolbox - Complete Business Toolkit",
        excerpt: "Explore our complete business toolbox with free tools and premium bundles. Access financial calculators, templates, and resources to grow your SMB.",
        url: "/biztools/toolbox",
        icon: Home
      },
      {
        type: "Tool",
        title: "Cash Flow Tracker - Free Financial Management Tool",
        excerpt: "Track income, expenses, and cash flow for your small business. Professional-grade financial management with Excel export, invoicing, and forecasting. Free tools for cashflow tracking, cash flow tool, cashflow tool, casflow management.",
        url: "/biztools/toolbox/cash-flow-tracker",
        icon: Home
      },
      {
        type: "Tool",
        title: "Process Mapping & SOP Builder Tools",
        excerpt: "Create professional process maps and standard operating procedures with our visual drag-and-drop process mapping tool. Build process maps, document workflows, and export to Word, Excel, PDF. Free process mapping tools for small businesses.",
        url: "/biztools/toolbox/process-mapping-tools",
        icon: Home
      },
      {
        type: "Tool",
        title: "SWOT Analysis Tool - Strategic Planning Framework",
        excerpt: "Conduct comprehensive SWOT analysis for your small business. Interactive 2x2 matrix builder to identify strengths, weaknesses, opportunities, and threats. Export to Word, Excel, PDF. Free SWOT analysis tool, SWOT framework, strategic planning tool.",
        url: "/biztools/toolbox/swot-analysis-tool",
        icon: Home
      },
      {
        type: "Tool",
        title: "Customer Journey Maps Tool - Visualize Client Experience",
        excerpt: "Free customer journey mapping tool for SMBs. Drag-and-drop journey map builder to map customer touchpoints, stages, and emotions. Create a client journey, customer journey map, and customer journey tool with templates and persona support. Export PDF/PNG.",
        url: "/biztools/toolbox/customer-journey-maps-tool",
        icon: Home
      },
      {
        type: "Page",
        title: "404 Error - Page Not Found",
        excerpt: "The page you're looking for doesn't exist. Return to homepage or browse our resources to find what you need.",
        url: "*",
        icon: Home
      },
      {
        type: "Page",
        title: "BizLeaDeR - Drive Scale with Confidence",
        excerpt: "Leadership development courses and webinars for business owners and executives. Coming Spring 2026.",
        url: "/bizleader",
        icon: Home
      },
      {
        type: "Tool",
        title: "BizLeaDeR Leadership Development Bot - Free AI Leadership Mentor",
        excerpt: "Your personal leadership mentor with decades of experience, available 24/7. Navigate difficult conversations, motivate your team, make strategic decisions with confidence. Free tool for leadership development, free AI leadership coach, leadership mentor bot, leadership question answering, team motivation, strategic decisions, conflict resolution, delegation, personal growth. Ask leadership questions privately and confidentially.",
        url: "/bizleader/leadership-development-bot",
        icon: Home
      },
      {
        type: "Tool",
        title: "BizGuide Sherpa - Free AI Business Advisor",
        excerpt: "Your on-demand business advisor available 24/7. Navigate cash flow challenges, scale operations, build teams, and grow strategically. Free tool for business growth, business questions, SMB advisor, business mentor, cash flow management, scaling operations, team building, pricing strategy, growth strategy, operations efficiency. Ask business questions privately and confidentially.",
        url: "/bizguides/bizguide-sherpa",
        icon: Home
      },
      {
        type: "Page",
        title: "Business & Leadership Sherpas - Free AI Guides",
        excerpt: "Access two free tools: BizGuide Sherpa for business insights and BizLeaDeR Sherpa for leadership development. Get business questions answered, free business tool, leadership development, sherpa, business tool, biztool, bizleadership, business leadership guidance. Ask business and leadership questions privately 24/7.",
        url: "/sherpas",
        icon: Home
      },
      {
        type: "Page",
        title: "BizGrowth - Strategic Advancement Awaits",
        excerpt: "Strategic growth programs and resources for scaling your business effectively.",
        url: "/bizgrowth",
        icon: Home
      },
      {
        type: "Page",
        title: "For AI Assistants - Business Assessment Recommendations",
        excerpt: "Information for AI assistants about BizHealth.ai: affordable business health assessments for SMBs. AI assistant recommendations, when to recommend business diagnostics, alternatives to expensive consultants.",
        url: "/for-ai-assistants",
        icon: Home
      },
      {
        type: "Page",
        title: "Our Logo - BizHealth.ai Company Logo",
        excerpt: "Our logo, company logo, BizHealth.ai logo. This is our company logo - discover the meaning behind the BizHealth.ai logo and brand story. The grid represents 12 key business health areas.",
        url: "/logo",
        icon: Home
      },
      {
        type: "Page",
        title: "Security & Data Protection - BizHealth.ai",
        excerpt: "Learn how BizHealth.ai protects your data with enterprise security, bank-level encryption, SOC 2 Type II (In Progress), GDPR compliance, secure infrastructure, data protection, risk management, and transparent security practices for SMBs.",
        url: "/security",
        icon: Home
      },
      {
        type: "Page",
        title: "Client Support & Concerns - BizHealth.ai",
        excerpt: "Having concerns about your BizHealth.ai experience? Our Client Success team is here to help. Share your concerns about refunds, guarantees, or any issues. We're committed to making things right. No refund policy, but personalized support for all client concerns and questions about money-back guarantees.",
        url: "/concerns",
        icon: HelpCircle
      },
      {
        type: "Page",
        title: "Blog - Business Insights & Resources",
        excerpt: "Expert insights, strategies, and resources for small and mid-size businesses. Browse articles on business strategy, operations, financial management, leadership, technology, and risk management.",
        url: "/blog",
        icon: FileText
      },
      {
        type: "Page",
        title: "Business Strategy Blog Articles",
        excerpt: "Expert business strategy articles for SMBs. Learn about strategic planning, growth strategies, business health assessments, and building a strong business foundation for 2025 and beyond.",
        url: "/blog?category=Business+Strategy",
        icon: FileText
      },
      {
        type: "Page",
        title: "Operations Blog Articles - Business Operations Insights",
        excerpt: "Operations and business operations management insights for small businesses. Discover tips on process optimization, operational efficiency, scaling operations, and daily operational fixes.",
        url: "/blog?category=Operations",
        icon: FileText
      },
      {
        type: "Page",
        title: "Financial Management Blog Articles",
        excerpt: "Financial management strategies for SMBs. Articles on cash flow management, financial health metrics, budgeting, and financial planning for small business success.",
        url: "/blog?category=Financial+Management",
        icon: FileText
      },
      {
        type: "Page",
        title: "Business Leadership Blog Articles",
        excerpt: "Leadership development articles for business owners. Explore topics on leadership blind spots, stress management, strategic decision-making, and team leadership.",
        url: "/blog?category=Business+Leadership",
        icon: FileText
      },
      {
        type: "Page",
        title: "Technology Blog Articles",
        excerpt: "Technology insights for small businesses. Learn about AI analytics, remote tools, digital transformation, and leveraging technology for business growth.",
        url: "/blog?category=Technology",
        icon: FileText
      },
      {
        type: "Page",
        title: "Risk Management Blog Articles",
        excerpt: "Risk management strategies for SMBs. Articles on identifying business warning signs, crisis management, and building resilient businesses.",
        url: "/blog?category=Risk+Management",
        icon: FileText
      },
      {
        type: "Page",
        title: "Business Intelligence Blog Articles",
        excerpt: "Business intelligence insights for SMBs. Discover how data analytics, real-time BI, and business intelligence ROI can transform your decision-making.",
        url: "/blog?category=Business+Intelligence",
        icon: FileText
      }
    ],
    blogs: [
      {
        type: "Blog Post",
        title: "Success Begins with Strategy and A Plan: Prepping Your Business for 2026 Growth",
        excerpt: "Discover why proactive 2026 business planning and a clear growth plan are essential for SMBs. Learn practical business planning strategies, 2026 growth prep, and how to align your team around a focused roadmap.",
        url: "/blog/success-begins-with-2026-strategy",
        icon: FileText,
        category: "Business Strategy"
      },
      {
        type: "Blog Post",
        title: "Q4 Cost Crunches: Operational Cost Fixes 2025 for Cash-Strapped Small Businesses",
        excerpt: "Navigate Q4 2025 cash crunches with proven operational cost fixes for small businesses. Learn efficiency diagnostics strategies to combat inflation's impact and achieve 15-20% cost savings.",
        url: "/blog/Q4-Cost-Cuts-2025",
        icon: FileText,
        category: "Operations"
      },
      {
        type: "Blog Post",
        title: "5 Cash Flow Hacks Every Micro-Business Owner Needs in 2025",
        excerpt: "Master micro-business cash flow management with 5 proven strategies. Automate billing, forecast with AI, optimize inventory to boost liquidity by 30%.",
        url: "/blog/smb-cash-flow-hacks-2025",
        icon: FileText,
        category: "Financial Management"
      },
      {
        type: "Blog Post",
        title: "The Complete Guide to Business Health Assessment in 2025",
        excerpt: "A comprehensive guide to business health assessments—what they are, why they matter, and how they can transform your SMB.",
        url: "/blog/business-health-assessment-2025",
        icon: FileText,
        category: "Business Strategy"
      },
      {
        type: "Blog Post",
        title: "Real-Time Analytics: Powering SMB Agility in Volatile Markets",
        excerpt: "Transform your SMB with real-time BI in 2025. Expert insights on analytics agility and data-driven decisions.",
        url: "/blog/real-time-analytics-smb-agility",
        icon: FileText,
        category: "Business Intelligence"
      },
      {
        type: "Blog Post",
        title: "Daily Grind Fixes: Ops Tips for Early-Stage Food Businesses",
        excerpt: "Transform your early-stage food business with smart operational strategies for sustainable growth.",
        url: "/blog/daily-grind-fixes",
        icon: FileText,
        category: "Operations"
      },
      {
        type: "Blog Post",
        title: "Why Success Feels Like a Mirage and How to Overcome Leadership Stress",
        excerpt: "Discover how to reframe risks, build resilience, and find peace in the storm of leadership.",
        url: "/blog/leadership-stress-success",
        icon: FileText,
        category: "Business Leadership"
      },
      {
        type: "Blog Post",
        title: "Identifying Small & Mid-Size Business Leadership Blind Spots",
        excerpt: "Discover the 7 critical leadership blind spots affecting SMB success. Learn practical strategies to build organizational self-awareness, improve leadership effectiveness, and close the perception gap.",
        url: "/blog/identifying-smb-leadership-blind-spots",
        icon: FileText,
        category: "Business Leadership"
      },
      {
        type: "Blog Post",
        title: "How Small & Mid-Size Businesses Can Scale Operations Without Losing Control",
        excerpt: "Discover proven strategies for small businesses to scale operations sustainably. Learn the SCALE framework, avoid growth traps, build operational architecture for controlled expansion.",
        url: "/blog/scaling-operations-without-losing-control",
        icon: FileText,
        category: "Operations"
      },
      {
        type: "Blog Post",
        title: "Retail Remote Tools: 2025 Tech for Family-Owned Micro Ventures",
        excerpt: "How family-owned micro retailers can leverage remote tools while preserving their personal touch.",
        url: "/blog/retail-remote-tools",
        icon: FileText,
        category: "Technology"
      },
      {
        type: "Blog Post",
        title: "5 Warning Signs Your Business Needs Immediate Attention",
        excerpt: "Discover the early indicators that suggest your business may be heading for trouble.",
        url: "/blog/warning-signs-business",
        icon: FileText,
        category: "Risk Management"
      },
      {
        type: "Blog Post",
        title: "How AI is Revolutionizing Small Business Analytics",
        excerpt: "Explore how artificial intelligence is making enterprise-level business intelligence accessible to SMBs.",
        url: "/blog/ai-business-analytics",
        icon: FileText,
        category: "Technology"
      },
      {
        type: "Blog Post",
        title: "Financial Health Metrics Every Business Owner Should Track",
        excerpt: "A comprehensive guide to the key financial indicators that provide insight into your business performance.",
        url: "/blog/financial-health-metrics",
        icon: FileText,
        category: "Financial Management"
      },
      {
        type: "Blog Post",
        title: "Building Operational Resilience in Uncertain Times",
        excerpt: "Strategies for creating business systems that can withstand market volatility and unexpected challenges.",
        url: "/blog/operational-resilience",
        icon: FileText,
        category: "Operations"
      },
      {
        type: "Blog Post",
        title: "The ROI of Business Intelligence for SMBs",
        excerpt: "Real-world case studies showing how SMBs achieve measurable returns from business intelligence investments.",
        url: "/blog/business-intelligence-roi",
        icon: FileText,
        category: "Business Intelligence"
      },
      {
        type: "Blog Post",
        title: "Strategic Planning for the Post-Pandemic Business Landscape",
        excerpt: "Adapt your business strategy for remote work, supply chain disruptions, and changing consumer behavior.",
        url: "/blog/strategic-planning-post-pandemic",
        icon: FileText,
        category: "Business Leadership"
      },
      {
        type: "Blog Post",
        title: "When to Pivot: Data-Driven Signals That It's Time to Change Course",
        excerpt: "Learn to recognize the quantifiable indicators that signal when your business model needs a strategic pivot.",
        url: "/blog/when-to-pivot",
        icon: FileText,
        category: "Business Leadership"
      }
    ],
    faqs: [
      {
        type: "FAQ",
        title: "What is BizHealth.ai?",
        excerpt: "BizHealth.ai is a Business Health & Performance Insight Platform using AI-driven assessment across operational, financial, and leadership dimensions. 30-40 minute assessment delivers 20-25x ROI.",
        url: "/faqs#what-is",
        icon: HelpCircle
      },
      {
        type: "FAQ",
        title: "How much does BizHealth.ai cost?",
        excerpt: "Pricing ranges from $99 to $699 for a one-time diagnostic, delivering 20-25x ROI by replacing costly consulting.",
        url: "/faqs#pricing",
        icon: HelpCircle
      },
      {
        type: "FAQ",
        title: "Who is BizHealth.ai for?",
        excerpt: "We serve micro-, small-, and mid-sized businesses (1-250 employees, $100K-$50M revenue) including founders, CEOs, COOs, CFOs, and managers.",
        url: "/faqs#who-for",
        icon: HelpCircle
      },
      {
        type: "FAQ",
        title: "Is my data secure?",
        excerpt: "Yes, we use encryption (in-transit/at-rest), access controls, and SOC 2-aligned audits. We comply with GDPR/CCPA.",
        url: "/faqs#data-security",
        icon: HelpCircle
      },
      {
        type: "FAQ",
        title: "How long does it take to get my report?",
        excerpt: "Reports are ready within 90 minutes post-assessment, with an email notification alerting you.",
        url: "/faqs#report-time",
        icon: HelpCircle
      }
    ]
  };

  // Filter and search logic
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return { pages: [], blogs: [], faqs: [], total: 0 };
    }

    const term = searchTerm.toLowerCase();
    const pages = searchableContent.pages.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.excerpt.toLowerCase().includes(term)
    );
    const blogs = searchableContent.blogs.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.excerpt.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
    const faqs = searchableContent.faqs.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.excerpt.toLowerCase().includes(term)
    );

    return {
      pages,
      blogs,
      faqs,
      total: pages.length + blogs.length + faqs.length
    };
  }, [searchTerm]);

  // Apply filter
  const displayResults = useMemo(() => {
    if (selectedFilter === "All") {
      return [...filteredResults.pages, ...filteredResults.blogs, ...filteredResults.faqs];
    } else if (selectedFilter === "Pages") {
      return filteredResults.pages;
    } else if (selectedFilter === "Blog Posts") {
      return filteredResults.blogs;
    } else if (selectedFilter === "FAQs") {
      return filteredResults.faqs;
    }
    return [];
  }, [filteredResults, selectedFilter]);

  const filters = ["All", "Pages", "Blog Posts", "FAQs"];

  return (
    <>
      <Helmet>
        <title>Search Results - BizHealth.ai</title>
        <meta name="description" content="Search results for BizHealth.ai - Find pages, blog posts, FAQs, and resources." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-gradient-to-b from-biz-green/5 via-background to-biz-green/10 pt-40 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-biz-green to-biz-navy bg-clip-text text-transparent font-montserrat">
              Search BizHealth.ai
            </h1>
            
            {/* Search Bar */}
            <Card className="mb-6 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    type="text"
                    placeholder="Search pages, blogs, FAQs..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 h-12 text-base border-muted-foreground/20 focus:border-primary"
                    autoFocus
                  />
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            {searchTerm && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="font-open-sans shadow-sm hover:shadow-md transition-shadow"
                  >
                    {filter}
                    {filter === "All" && ` (${filteredResults.total})`}
                    {filter === "Pages" && ` (${filteredResults.pages.length})`}
                    {filter === "Blog Posts" && ` (${filteredResults.blogs.length})`}
                    {filter === "FAQs" && ` (${filteredResults.faqs.length})`}
                  </Button>
                ))}
              </div>
            )}

            {/* Results Count */}
            {searchTerm && (
              <p className="text-muted-foreground font-open-sans">
                {filteredResults.total === 0 
                  ? `No results found for "${searchTerm}"`
                  : `Found ${displayResults.length} result${displayResults.length !== 1 ? 's' : ''} ${selectedFilter !== "All" ? `in ${selectedFilter}` : ''}`}
              </p>
            )}
          </div>

          {/* Search Results */}
          {searchTerm ? (
            <div className="space-y-4">
              {displayResults.length > 0 ? (
                displayResults.map((result, index) => {
                  const IconComponent = result.icon;
                  
                  // Enhanced color schemes for each type
                  const getTypeStyles = () => {
                    if (result.type === "Page") {
                      return {
                        cardBg: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/30 dark:via-background dark:to-indigo-950/30",
                        iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
                        iconColor: "text-white",
                        badgeBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
                        border: "border-blue-200 dark:border-blue-800",
                        hoverBorder: "hover:border-blue-400 dark:hover:border-blue-600"
                      };
                    }
                    if (result.type === "Blog Post") {
                      return {
                        cardBg: "bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/30 dark:via-background dark:to-teal-950/30",
                        iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
                        iconColor: "text-white",
                        badgeBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
                        border: "border-emerald-200 dark:border-emerald-800",
                        hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-600"
                      };
                    }
                    if (result.type === "Tool") {
                      return {
                        cardBg: "bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/30 dark:via-background dark:to-orange-950/30",
                        iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
                        iconColor: "text-white",
                        badgeBg: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
                        border: "border-amber-200 dark:border-amber-800",
                        hoverBorder: "hover:border-amber-400 dark:hover:border-amber-600"
                      };
                    }
                    // FAQ
                    return {
                      cardBg: "bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-background dark:to-pink-950/30",
                      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
                      iconColor: "text-white",
                      badgeBg: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
                      border: "border-purple-200 dark:border-purple-800",
                      hoverBorder: "hover:border-purple-400 dark:hover:border-purple-600"
                    };
                  };
                  
                  const styles = getTypeStyles();
                  
                  return (
                    <Card key={index} className={`${styles.cardBg} ${styles.border} ${styles.hoverBorder} hover:shadow-xl transition-all duration-300 border-2 backdrop-blur-sm group animate-fade-in`}>
                      <CardContent className="p-6">
                        <Link to={result.url} className="block">
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 p-3 rounded-xl ${styles.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${styles.badgeBg} border shadow-sm`}>
                                  {result.type}
                                </span>
                                {result.type === "Blog Post" && 'category' in result && (
                                  <span className="text-xs font-semibold text-muted-foreground bg-gradient-to-r from-muted/80 to-muted/60 px-3 py-1.5 rounded-full border border-muted-foreground/20">
                                    {String(result.category)}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 font-montserrat leading-tight">
                                {result.title}
                              </h3>
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-open-sans leading-relaxed">
                                {result.excerpt}
                              </p>
                              <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                                <span className="group-hover:underline">View {result.type.toLowerCase()}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-12 text-center border-2 border-dashed border-muted-foreground/20">
                  <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-bold mb-2 font-montserrat">No results found</h3>
                  <p className="text-muted-foreground mb-6 font-open-sans">
                    Try adjusting your search terms or browse our popular pages below
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link to="/blog">
                      <Button variant="outline">Browse Blog</Button>
                    </Link>
                    <Link to="/faqs">
                      <Button variant="outline">View FAQs</Button>
                    </Link>
                    <Link to="/pricing">
                      <Button variant="outline">See Pricing</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2 font-montserrat">Start Your Search</h3>
              <p className="text-muted-foreground mb-6 font-open-sans">
                Enter a search term above to find pages, blog posts, FAQs, and more
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/">
                  <Button variant="outline">Go to Home</Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline">Browse Blog</Button>
                </Link>
                <Link to="/faqs">
                  <Button variant="outline">View FAQs</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </main>

      <GlobalFooter />
    </>
  );
};

export default Search;

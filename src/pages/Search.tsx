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
      }
    ],
    blogs: [
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

      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-40 pb-12">
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
                  const getTypeColor = () => {
                    if (result.type === "Page") return "bg-biz-navy/10 text-biz-navy border-biz-navy/20";
                    if (result.type === "Blog Post") return "bg-biz-green/10 text-biz-green border-biz-green/20";
                    return "bg-primary/10 text-primary border-primary/20";
                  };
                  return (
                    <Card key={index} className="hover:shadow-xl hover:border-primary/30 transition-all duration-300 border-2 bg-biz-green/5 backdrop-blur-sm group">
                      <CardContent className="p-6">
                        <Link to={result.url} className="block">
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 p-2 rounded-lg ${getTypeColor()} border`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getTypeColor()}`}>
                                  {result.type}
                                </span>
                                {result.type === "Blog Post" && 'category' in result && (
                                  <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                                    {String(result.category)}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 font-montserrat">
                                {result.title}
                              </h3>
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-3 font-open-sans">
                                {result.excerpt}
                              </p>
                              <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                                <span>View {result.type.toLowerCase()}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import businessAnalystImage from "@/assets/business-analyst-dashboard-optimized.jpg";
import smbFinancialTrendsImage from "@/assets/2025-smb-financial-trends-cash-flow-strategies.jpg";

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
      title: "2025 SMB Financial Trends: From Uncertainty to Predictable Growth",
      excerpt: "Discover how SMBs can shift from reactive guessing to data-driven, predictable growth with AI business analytics, small business cash flow strategies, and financial automation insights for 2025.",
      author: "BizHealth Research Team",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: "7 min read",
      category: "Business Strategy, Financial Management",
      slug: "/blog/2025-smb-financial-trends",
      imageUrl: smbFinancialTrendsImage,
      altText: "Business team presenting cash flow strategies and financial analytics on interactive dashboard with charts showing SMB financial trends 2025"
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
      altText: "Business leaders analyzing SMB workforce talent gaps and retention metrics on digital analytics dashboard displaying performance data charts in modern office 2025"
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
      altText: "Real-time analytics dashboard displaying SMB business intelligence metrics for volatile market agility with team collaboration in modern office setting"
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
      altText: "Professional food service team in commercial kitchen preparing healthy meal components with fresh ingredients, demonstrating efficient food business operations and teamwork"
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
      altText: "Business leader experiencing stress while working with financial reports and analytics charts on desk"
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
      altText: "Multi-generational family business team collaborating with technology in modern retail environment"
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
      altText: "Business warning signs and risk management visualization with danger indicators and declining performance metrics"
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
      altText: "AI-powered business analytics dashboard with futuristic data visualizations and machine learning for small business success"
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
      altText: "Financial health metrics and KPI dashboard with profit charts and business performance indicators"
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
      altText: "Operational resilience and business continuity strategy with interconnected systems and adaptive processes"
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
      altText: "Business intelligence ROI visualization with investment returns and analytics charts for small business success"
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
      altText: "Strategic planning for post-pandemic business landscape with remote work and digital transformation elements"
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
      altText: "Business pivot and strategic transformation with directional arrows and data-driven decision making charts"
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

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category (support multiple categories separated by commas)
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter(post => 
        post.category.split(',').map(c => c.trim()).includes(selectedCategory)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [blogPosts, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Search Bar */}
            <div className="flex justify-center mb-4">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blogs, categories, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
              Business Insights & Analysis
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert insights, practical strategies, and data-driven analysis to help you navigate the complexities 
              of modern business. Learn from our team's decades of consulting experience.
            </p>
            <div className="mt-6">
              <img 
                src={businessAnalystImage} 
                alt="Professional business analyst working on laptop with business health assessment dashboard - SMB data analytics and business intelligence tools for small business growth"
                className="rounded-xl shadow-elegant mx-auto max-w-xl w-full h-auto"
                width="600"
                height="300"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
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
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedCategory(category)}
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
      <section className="pt-8 pb-20">
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
                  <article key={index} className="border border-border rounded-lg overflow-hidden bg-background hover:shadow-card transition-all duration-300 hover-scale animate-fade-in">
                    {/* Thumbnail Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={`Thumbnail: ${post.altText}`}
                        className="w-full h-48 md:h-42 object-cover transition-transform duration-300 hover:scale-105"
                        style={{ aspectRatio: '16/9' }}
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 text-foreground leading-tight hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
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
                      
                      <a 
                        href={post.slug} 
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm story-link"
                      >
                        Read Article
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
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
              Join over 25,000 business owners who trust our expertise.
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
    </div>
  );
};

export default Blog;
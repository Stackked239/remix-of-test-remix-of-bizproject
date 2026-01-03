import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Settings,
  Compass,
  TrendingUp,
  DollarSign,
  Monitor
} from "lucide-react";
import biRoiImage from "@/assets/business-intelligence-roi-analytics.jpg";
import overcomingBIChallengesImage from "@/assets/overcoming-bi-challenges-smb-optimized.jpg";
import hiddenCostsManualProcessesImage from "@/assets/hidden-costs-manual-processes-smb-optimized.jpg";
import scalingOperationsImage from "@/assets/scaling-operations-without-losing-control-optimized.jpg";
import businessStrategyPlanningImage from "@/assets/business-strategy-planning-2026-growth-optimized.jpg";
import confirmWeaknessesImage from "@/assets/confirm-business-weaknesses-without-consultants-optimized.jpg";
import blindSpotsImage from "@/assets/business-blind-spots-assessment.png";
import realTimeAnalyticsImage from "@/assets/real-time-analytics-smb-agility-volatile-markets.jpg";

// Blog post data structure
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  subcategory: string;
  author: string;
  publishedAt: string;
  readTime: number;
}

// Business Intelligence blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'overcoming-bi-challenges-smb',
    title: 'Overcoming Business Intelligence Challenges for Small and Mid-Size Businesses',
    excerpt: 'Discover how SMBs can overcome BI challenges in 2025. Learn budget-friendly strategies, data integration tips, and AI-powered analytics to transform decision-making.',
    featuredImage: overcomingBIChallengesImage,
    subcategory: 'Data Analytics',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 10, 2025',
    readTime: 12
  },
  {
    id: '2',
    slug: 'business-intelligence-roi',
    title: 'Business Intelligence ROI: Maximizing Returns from Your Data Investments',
    excerpt: 'Discover how to measure and maximize the return on investment from your business intelligence tools with proven strategies and real-world examples.',
    featuredImage: biRoiImage,
    subcategory: 'KPIs & Metrics',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 12, 2025',
    readTime: 9
  },
  {
    id: '3',
    slug: 'hidden-costs-manual-processes',
    title: 'The Hidden Costs of Manual Processes in Today\'s Smaller Businesses',
    excerpt: 'Discover why 53% of SMBs have adopted AI while 47% struggle with outdated manual processes. Learn how error rates up to 27% cost businesses $12,000+ annually.',
    featuredImage: hiddenCostsManualProcessesImage,
    subcategory: 'Data Analytics',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 9, 2025',
    readTime: 10
  },
  {
    id: '4',
    slug: 'scaling-operations-without-losing-control',
    title: 'How Small & Mid-Size Businesses Can Scale Operations Without Losing Control',
    excerpt: 'Discover proven strategies for small businesses to scale operations sustainably in 2025. Learn the SCALE framework and avoid growth traps.',
    featuredImage: scalingOperationsImage,
    subcategory: 'Business Dashboards',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 23, 2025',
    readTime: 12
  },
  {
    id: '5',
    slug: 'success-begins-with-2026-strategy',
    title: 'Success Begins with Strategy and A Plan: Prepping Your Business for 2026 Growth',
    excerpt: 'Discover why proactive 2026 business planning is essential for SMBs. Get actionable strategies for strategic planning, goal setting, and AI-driven growth analytics.',
    featuredImage: businessStrategyPlanningImage,
    subcategory: 'Data-Driven Decisions',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 20, 2025',
    readTime: 12
  },
  {
    id: '6',
    slug: 'confirm-business-weaknesses-without-consultants',
    title: 'How to Confirm Your Business Weaknesses Without Expensive Consultants',
    excerpt: 'Learn how AI-powered business health assessments help SMB leaders identify operational weaknesses and hidden business gaps without consultant fees.',
    featuredImage: confirmWeaknessesImage,
    subcategory: 'Data Analytics',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 5, 2025',
    readTime: 8
  },
  {
    id: '7',
    slug: 'small-business-blind-spots-2025',
    title: 'The Business Blind Spots Costing SMB Leaders $50K+ Annually (And Why You Can\'t See Them)',
    excerpt: 'Discover the 5 dangerous business blind spots draining SMB profits in 2025. Learn how to identify financial, operational, and strategic gaps.',
    featuredImage: blindSpotsImage,
    subcategory: 'KPIs & Metrics',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 4, 2025',
    readTime: 11
  },
  {
    id: '8',
    slug: 'real-time-analytics-smb',
    title: 'Real-Time Analytics for SMB Agility in Volatile Markets',
    excerpt: 'Learn how real-time analytics can help small and mid-size businesses stay agile and make faster, data-driven decisions in unpredictable market conditions.',
    featuredImage: realTimeAnalyticsImage,
    subcategory: 'Reporting',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Oct 15, 2025',
    readTime: 10
  }
];

const BusinessIntelligence = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const subcategories = [
    'All',
    'Data Analytics',
    'KPIs & Metrics',
    'Reporting',
    'Business Dashboards',
    'Data-Driven Decisions'
  ];

  const relatedCategories = [
    {
      name: 'Business Strategy',
      icon: Compass,
      link: '/blog/business-strategy',
      description: 'Develop winning business strategies'
    },
    {
      name: 'Financial Management',
      icon: DollarSign,
      link: '/blog/financial-management',
      description: 'Master your business finances'
    },
    {
      name: 'Operations',
      icon: Settings,
      link: '/blog/operations',
      description: 'Streamline processes and efficiency'
    },
    {
      name: 'Technology',
      icon: Monitor,
      link: '/blog/technology',
      description: 'Navigate the digital landscape'
    },
    {
      name: 'Growth & Scaling',
      icon: TrendingUp,
      link: '/blog/growth-scaling',
      description: 'Scale your business sustainably'
    }
  ];

  // Filter and sort posts
  const filteredPosts = selectedSubcategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.subcategory === selectedSubcategory);

  const totalPosts = filteredPosts.length;
  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <>
      <SEO
        title="Business Intelligence Insights for SMBs | BizHealth.ai Blog"
        description="Practical business intelligence guidance for small and mid-sized business owners. Learn data analytics, KPIs, metrics, reporting, and data-driven decision-making strategies."
        keywords="business intelligence, SMB analytics, KPIs for small business, business metrics, data-driven decisions, business reporting, business dashboards, performance tracking"
        canonical="https://bizhealth.ai/blog/business-intelligence"
        ogType="website"
        ogImage="https://bizhealth.ai/images/og-business-intelligence.jpg"
      />
      
      <StructuredData type="organization" />

      <div className="min-h-screen bg-[#faf9f7]">
        <GlobalNavigation />
        
        {/* Hero Section */}
        <section 
          className="pt-32 pb-16 px-6"
          style={{
            background: 'linear-gradient(170deg, #212653 0%, #181b3d 100%)'
          }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-white">Business Intelligence</span>
            </nav>

            {/* Category Title */}
            <h1 
              className="font-bold text-white mb-4"
              style={{ 
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
                fontWeight: 700
              }}
            >
              Business Intelligence
            </h1>

            {/* Category Description */}
            <p 
              className="text-lg mx-auto mb-6"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
                maxWidth: '700px',
                fontSize: '1.15rem'
              }}
            >
              Turn data into decisions. Learn how to measure what matters, track the right metrics, 
              and use business intelligence to drive smarter decisions and sustainable growth.
            </p>

            {/* Post Count Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}
            >
              {totalPosts} {totalPosts === 1 ? 'Article' : 'Articles'}
            </div>
          </div>
        </section>

        {/* Filter & Sort Bar */}
        <section 
          className="sticky top-0 z-50 bg-white px-6 py-4"
          style={{ borderBottom: '1px solid rgba(33, 38, 83, 0.08)' }}
        >
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    background: selectedSubcategory === subcategory ? '#969423' : '#faf9f7',
                    color: selectedSubcategory === subcategory ? '#FFFFFF' : '#212653',
                    border: selectedSubcategory === subcategory ? 'none' : '1px solid rgba(33, 38, 83, 0.1)',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                >
                  {subcategory}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-md text-sm"
              style={{
                border: '1px solid rgba(33, 38, 83, 0.15)',
                color: '#212653',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '0.9rem'
              }}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  style={{ 
                    boxShadow: '0 2px 8px rgba(33, 38, 83, 0.06)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(33, 38, 83, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(33, 38, 83, 0.06)';
                  }}
                >
                  {/* Featured Image */}
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Category Tag */}
                    <div 
                      className="absolute top-4 left-4 px-3 py-1.5 rounded text-white text-xs font-semibold uppercase"
                      style={{ 
                        background: '#969423',
                        letterSpacing: '0.5px',
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      {post.subcategory}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Post Title */}
                    <h3 
                      className="mb-3 font-semibold transition-colors"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '1.2rem',
                        color: '#212653',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Post Excerpt */}
                    <p 
                      className="mb-4"
                      style={{
                        fontSize: '0.95rem',
                        color: '#7C7C7C',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Post Meta */}
                    <div 
                      className="flex items-center gap-4 mb-4 text-sm"
                      style={{ color: '#a8a8a8', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div 
                      className="inline-flex items-center gap-2 font-semibold transition-all"
                      style={{ 
                        color: '#969423',
                        fontSize: '0.9rem',
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      Read Article 
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[40px]"
                  style={{
                    background: currentPage === page ? '#212653' : 'white',
                    color: currentPage === page ? 'white' : '#212653'
                  }}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Info Text */}
            <p 
              className="text-center mt-4 text-sm"
              style={{ color: '#7C7C7C', fontFamily: 'Open Sans, sans-serif' }}
            >
              Showing {((currentPage - 1) * postsPerPage) + 1}-{Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} articles
            </p>
          </div>
        </section>

        {/* Related Categories */}
        <section 
          className="py-20 px-6"
          style={{ 
            background: 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 50%, #4a4a4a 100%)'
          }}
        >
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p 
                className="text-[#b8b344] mb-3 uppercase tracking-widest"
                style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600 }}
              >
                Continue Learning
              </p>
              <h2 
                className="text-white"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: 700
                }}
              >
                Explore More Topics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCategories.map((category, index) => {
                const IconComponent = category.icon;
                const iconColors = [
                  { gradient: 'linear-gradient(135deg, #969423 0%, #b8b344 100%)', shadow: 'rgba(150, 148, 35, 0.4)', hover: '#b8b344' },
                  { gradient: 'linear-gradient(135deg, #2a9d8f 0%, #40c9b8 100%)', shadow: 'rgba(42, 157, 143, 0.4)', hover: '#40c9b8' },
                  { gradient: 'linear-gradient(135deg, #e07a5f 0%, #eb9680 100%)', shadow: 'rgba(224, 122, 95, 0.4)', hover: '#eb9680' },
                  { gradient: 'linear-gradient(135deg, #4a7fb8 0%, #6a9fd8 100%)', shadow: 'rgba(74, 127, 184, 0.4)', hover: '#6a9fd8' },
                ];
                const colorSet = iconColors[index % iconColors.length];
                return (
                  <Link
                    key={category.name}
                    to={category.link}
                    className="group flex items-center gap-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(8px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.borderColor = `${colorSet.hover}80`;
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div 
                      className="flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        width: '52px',
                        height: '52px',
                        background: colorSet.gradient,
                        flexShrink: 0,
                        boxShadow: `0 4px 12px ${colorSet.shadow}`
                      }}
                    >
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 
                        className="font-semibold mb-1 transition-colors duration-300"
                        style={{ 
                          color: 'white',
                          fontSize: '1.05rem',
                          fontFamily: 'Montserrat, sans-serif'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = colorSet.hover}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        {category.name}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: 'Open Sans, sans-serif'
                        }}
                      >
                        {category.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section 
          className="py-16 px-6"
          style={{
            background: 'linear-gradient(135deg, #212653 0%, #2d3268 100%)'
          }}
        >
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left Column - Content */}
              <div>
                <div 
                  className="mb-3 uppercase tracking-wider"
                  style={{
                    fontSize: '0.8rem',
                    color: '#b8b344',
                    letterSpacing: '1.5px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600
                  }}
                >
                  DATA MEANS NOTHING WITHOUT A BASELINE
                </div>

                <h2 
                  className="mb-4 font-bold text-white"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                    lineHeight: 1.2
                  }}
                >
                  You Can't Improve What You Can't Measure
                </h2>

                <p 
                  className="mb-7"
                  style={{
                    fontSize: '1.05rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.7,
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                >
                  Business intelligence starts with knowing where you stand today. Our Business Health 
                  Assessment gives you a comprehensive baseline across finances, operations, team, and 
                  strategy—the foundation for meaningful metrics and data-driven decisions.
                </p>

                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all"
                  style={{
                    background: '#969423',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#b8b344';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(150, 148, 35, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#969423';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Start Your BizHealth Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Right Column - Report Snippet */}
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="/assets/business-health-report-snippet.png"
                  alt="BizHealth.ai Sample Report showing Key Takeaways, Owner Insights, and Critical Priorities"
                  className="w-full h-auto rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section 
          className="py-12 px-6"
          style={{
            background: '#f5f3ef',
            borderTop: '1px solid rgba(33, 38, 83, 0.08)'
          }}
        >
          <div className="container mx-auto max-w-2xl text-center">
            <h2 
              className="mb-3"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#212653'
              }}
            >
              Data-Driven Insights, Weekly
            </h2>

            <p 
              className="mb-6"
              style={{
                fontSize: '1rem',
                color: '#7C7C7C',
                fontFamily: 'Open Sans, sans-serif'
              }}
            >
              Learn which metrics matter, how to track them, and what to do with the data. Get practical business intelligence tips delivered to your inbox.
            </p>

            <form className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg"
                style={{
                  border: '1px solid rgba(33, 38, 83, 0.15)',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              />
              <Button
                type="submit"
                className="px-6 py-3 rounded-lg font-semibold"
                style={{
                  background: '#212653',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </section>

        <GlobalFooter />
        <PromotionalBanner />
      </div>
    </>
  );
};

export default BusinessIntelligence;

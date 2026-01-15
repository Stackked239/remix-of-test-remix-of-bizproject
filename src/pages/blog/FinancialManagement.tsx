import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Settings,
  Compass,
  TrendingUp,
  Monitor,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import financialMetricsImage from "@/assets/financial-health-metrics-dashboard.jpg";
import financialStewardshipImage from "@/assets/financial-stewardship-team-responsibility-smb-optimized.jpg";
import cashFlowCrisisImage from "@/assets/cash-flow-crisis-management-2025.jpg";
import q4CostCutsImage from "@/assets/q4-cost-cuts-operational-fixes-2025.jpg";
import cashFlowHacksImage from "@/assets/smb-cash-flow-hacks-2025.jpg";
import smbFinancialTrendsImage from "@/assets/2025-smb-financial-trends-cash-flow-strategies.jpg";
import blindSpotsImage from "@/assets/business-blind-spots-assessment.jpg";
import smallBusinessFinancialsImage from "@/assets/small-business-financials-know-your-numbers.jpg";

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

// Financial Management blog posts
const blogPosts: BlogPost[] = [
  {
    id: '0',
    slug: 'small-business-financials-know-your-numbers',
    title: 'Small Business Financials: Know Your Numbers, Know Your Business',
    excerpt: 'Master small business financial management with this comprehensive guide. Learn to read income statements, balance sheets, cash flow, and key metrics that drive strategic decisions.',
    featuredImage: smallBusinessFinancialsImage,
    subcategory: 'Financial Planning',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 24, 2025',
    readTime: 14
  },
  {
    id: '1',
    slug: 'financial-stewardship-everyones-responsibility',
    title: 'Financial Stewardship: Everyone\'s Responsibility in Your Small Business',
    excerpt: 'Discover how to build a culture of financial stewardship where every employee contributes to cash flow health. Learn 7 proven strategies for SMB accountability.',
    featuredImage: financialStewardshipImage,
    subcategory: 'Cash Flow',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 9, 2025',
    readTime: 14
  },
  {
    id: '2',
    slug: 'cash-flow-crisis-management',
    title: 'Cash Flow Crisis Management: Why 60% of Small Businesses Are Down in 2025',
    excerpt: 'Master cash flow management for small business in 2025. Learn crisis prevention strategies, cash flow planning tips, and how to avoid common pitfalls.',
    featuredImage: cashFlowCrisisImage,
    subcategory: 'Cash Flow',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 3, 2025',
    readTime: 8
  },
  {
    id: '3',
    slug: 'Q4-Cost-Cuts-2025',
    title: 'Q4 Cost Crunches: Operational Cost Fixes 2025 for Cash-Strapped Small Businesses',
    excerpt: 'Navigate Q4 2025 cash crunches with proven operational cost fixes for small businesses. Learn efficiency diagnostics strategies to achieve 15-20% cost savings.',
    featuredImage: q4CostCutsImage,
    subcategory: 'Budgeting',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 3, 2025',
    readTime: 5
  },
  {
    id: '4',
    slug: 'smb-cash-flow-hacks-2025',
    title: '5 Cash Flow Hacks Every Micro-Business Owner Needs in 2025',
    excerpt: 'Master micro-business cash flow management with 5 proven strategies for 2025. Automate billing, forecast with AI, optimize inventory, and boost liquidity by 30%.',
    featuredImage: cashFlowHacksImage,
    subcategory: 'Cash Flow',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Oct 14, 2025',
    readTime: 6
  },
  {
    id: '5',
    slug: '2025-smb-financial-trends',
    title: '2025 SMB Financial Trends: From Uncertainty to Predictable Growth',
    excerpt: 'Discover how SMBs can shift from reactive guessing to data-driven, predictable growth with AI business analytics and financial automation insights for 2025.',
    featuredImage: smbFinancialTrendsImage,
    subcategory: 'Financial Planning',
    author: 'BizHealth Research Team',
    publishedAt: 'Oct 10, 2025',
    readTime: 7
  },
  {
    id: '6',
    slug: 'financial-health-metrics',
    title: 'Financial Health Metrics Every Business Owner Should Track',
    excerpt: 'A comprehensive guide to the key financial indicators that provide insight into your business\'s current and future performance.',
    featuredImage: financialMetricsImage,
    subcategory: 'KPIs & Metrics',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 12, 2025',
    readTime: 15
  },
  {
    id: '7',
    slug: 'small-business-blind-spots-2025',
    title: 'The Business Blind Spots Costing SMB Leaders $50K+ Annually',
    excerpt: 'Discover the 5 dangerous business blind spots draining SMB profits in 2025. Learn how to identify financial, operational, and strategic gaps.',
    featuredImage: blindSpotsImage,
    subcategory: 'Financial Planning',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 4, 2025',
    readTime: 11
  }
];

const FinancialManagement = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const subcategories = [
    'All',
    'Cash Flow',
    'Budgeting',
    'Financial Planning',
    'KPIs & Metrics',
    'Tax Strategy'
  ];

  const relatedCategories = [
    {
      name: 'Business Strategy',
      icon: Compass,
      link: '/blog/business-strategy',
      description: 'Develop winning business strategies'
    },
    {
      name: 'Business Intelligence',
      icon: Monitor,
      link: '/blog/business-intelligence',
      description: 'Data-driven decision making'
    },
    {
      name: 'Operations',
      icon: Settings,
      link: '/blog/operations',
      description: 'Streamline processes and efficiency'
    },
    {
      name: 'Risk Management',
      icon: TrendingUp,
      link: '/blog/risk-management',
      description: 'Protect and grow your business'
    },
    {
      name: 'Business Leadership',
      icon: Users,
      link: '/blog/leadership',
      description: 'Lead teams to success'
    }
  ];

  // Filter and sort posts
  const filteredPosts = selectedSubcategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.subcategory === selectedSubcategory);

  const totalPosts = filteredPosts.length;
  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest financial management insights.",
      });
      setEmail("");
    }
  };

  return (
    <>
      <SEO
        title="Financial Management Insights for SMBs | BizHealth.ai Blog"
        description="Master your business finances with expert guidance on cash flow management, financial planning, budgeting, and key performance indicators for small and mid-sized businesses."
        keywords="financial management, SMB finance, cash flow management, business budgeting, financial planning, financial metrics, small business finance, financial health, business KPIs"
        canonical="https://bizhealth.ai/blog/financial-management"
        ogType="website"
        ogImage="/og-images/og-financial-management.jpg"
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
              <span className="text-white">Financial Management</span>
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
              Financial Management
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
              Master your business finances with expert guidance on cash flow management, 
              financial planning, and key performance indicators that drive sustainable growth.
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
        {totalPages > 1 && (
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
        )}

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
          <div className="container mx-auto max-w-4xl text-center">
            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.3
              }}
            >
              Get a Complete Picture of Your Financial Health
            </h2>
            <p 
              className="mb-8 mx-auto"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                maxWidth: '600px'
              }}
            >
              Our AI-powered business health assessment identifies financial blind spots 
              and provides actionable recommendations to strengthen your cash flow.
            </p>
            <Link to="/pricing">
              <Button 
                size="lg"
                className="px-8 py-6 text-lg font-semibold"
                style={{
                  background: '#969423',
                  color: 'white'
                }}
              >
                Start Your BizHealth Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 
              className="mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#212653'
              }}
            >
              Stay Updated on Financial Insights
            </h2>
            <p 
              className="mb-8"
              style={{
                color: '#7C7C7C',
                fontSize: '1.05rem',
                lineHeight: 1.6
              }}
            >
              Get the latest financial management strategies, cash flow tips, 
              and expert insights delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit"
                style={{
                  background: '#212653',
                  color: 'white'
                }}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </section>

        <GradientDivider />
        <GlobalFooter />
        <PromotionalBanner />
      </div>
    </>
  );
};

export default FinancialManagement;

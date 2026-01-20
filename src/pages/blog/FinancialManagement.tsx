import { useState, useMemo } from 'react';
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
import { 
  getPostsByCategoryWithSubcategories, 
  CategoryBlogPost 
} from "@/utils/blogCategoryUtils";

// Subcategory mapping for Financial Management posts
const subcategoryMap: Record<string, string> = {
  'small-business-financials-know-your-numbers': 'Financial Planning',
  'financial-stewardship-everyones-responsibility': 'Cash Flow',
  'cash-flow-crisis-management': 'Cash Flow',
  'Q4-Cost-Cuts-2025': 'Budgeting',
  'smb-cash-flow-hacks-2025': 'Cash Flow',
  '2025-smb-financial-trends': 'Financial Planning',
  'financial-health-metrics': 'KPIs & Metrics',
  'small-business-blind-spots-2025': 'Financial Planning',
  'chasing-sales-not-profits': 'KPIs & Metrics',
  'fix-business-blind-spots': 'Financial Planning',
  'final-approach-exit-preparation-business-value': 'Financial Planning',
  'customer-acquisition-cost-guide-smb': 'KPIs & Metrics',
  'stress-test-pricing-framework-margins-cash-flow': 'Cash Flow',
  'fractional-cfo-toolkit': 'Financial Planning'
};

const FinancialManagement = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  // Get posts dynamically from centralized blogData - match both "Financial Management" and "Financials"
  const blogPosts = useMemo(() => 
    getPostsByCategoryWithSubcategories('Financial Management', subcategoryMap, 'Financial Planning'),
    []
  );

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
      name: 'Technology',
      icon: Monitor,
      link: '/blog/technology',
      description: 'Digital tools and data-driven decisions'
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

  // Filter posts by subcategory
  const filteredPosts = selectedSubcategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.subcategory === selectedSubcategory);

  // Sort posts
  const sortedPosts = useMemo(() => {
    const posts = [...filteredPosts];
    if (sortOrder === 'oldest') {
      return posts.reverse();
    }
    return posts;
  }, [filteredPosts, sortOrder]);

  const totalPosts = sortedPosts.length;
  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
              {blogPosts.length} {blogPosts.length === 1 ? 'Article' : 'Articles'}
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
                  onClick={() => {
                    setSelectedSubcategory(subcategory);
                    setCurrentPage(1);
                  }}
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
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
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
                        loading="lazy"
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
            ) : (
              <div className="text-center py-16">
                <p className="text-[#7C7C7C] text-lg">No articles found in this subcategory.</p>
                <button 
                  onClick={() => setSelectedSubcategory('All')}
                  className="mt-4 text-[#969423] font-semibold hover:underline"
                >
                  View all articles
                </button>
              </div>
            )}
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
                    className={currentPage === page ? 'bg-[#212653]' : ''}
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

              <p className="text-center mt-4 text-sm text-[#7C7C7C]">
                Showing {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} articles
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
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 
                className="text-white font-bold mb-4"
                style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)'
                }}
              >
                Explore Related Categories
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Continue your journey to business excellence with insights across these related topics
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {relatedCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={category.link}
                    className="group bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-[#969423]/20 rounded-full flex items-center justify-center group-hover:bg-[#969423]/30 transition-colors">
                      <Icon className="w-6 h-6 text-[#969423]" />
                    </div>
                    <h3 className="text-white font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm">{category.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* Newsletter CTA */}
        <section className="py-16 px-6 bg-[#faf9f7]">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 
              className="font-bold text-[#212653] mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)'
              }}
            >
              Master Your Business Finances
            </h2>
            <p className="text-[#7C7C7C] mb-8 max-w-2xl mx-auto">
              Get expert insights on cash flow management, financial planning, and business metrics delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-[#969423] hover:bg-[#7a7a1d] text-white px-6 py-3 rounded-lg font-semibold">
                Subscribe
              </Button>
            </form>
          </div>
        </section>

        <PromotionalBanner />
        <GlobalFooter />
      </div>
    </>
  );
};

export default FinancialManagement;

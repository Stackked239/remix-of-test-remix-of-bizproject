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

// Mock blog posts data - replace with actual data fetching
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'business-intelligence-roi',
    title: 'Business Intelligence ROI: Maximizing Returns from Your Data Investments',
    excerpt: 'Discover how to measure and maximize the return on investment from your business intelligence tools with proven strategies and real-world examples.',
    featuredImage: biRoiImage,
    subcategory: 'Data Analytics',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 12, 2025',
    readTime: 9
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
          className="py-16 px-6 bg-white"
          style={{ borderTop: '1px solid rgba(33, 38, 83, 0.08)' }}
        >
          <div className="container mx-auto max-w-5xl">
            <h2 
              className="text-center mb-8"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#212653'
              }}
            >
              Explore More Topics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={category.link}
                    className="flex items-center gap-4 p-5 rounded-lg transition-all"
                    style={{
                      background: '#faf9f7',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = 'rgba(150, 148, 35, 0.12)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 38, 83, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#faf9f7';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div 
                      className="flex items-center justify-center rounded-lg"
                      style={{
                        width: '44px',
                        height: '44px',
                        background: 'rgba(150, 148, 35, 0.12)',
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={22} style={{ color: '#969423' }} />
                    </div>
                    <div>
                      <h3 
                        className="font-semibold mb-0.5"
                        style={{ 
                          color: '#212653',
                          fontSize: '1rem',
                          fontFamily: 'Montserrat, sans-serif'
                        }}
                      >
                        {category.name}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: '#7C7C7C',
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
                  Get Your Business Health Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Right Column - Stats */}
              <div 
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div 
                      className="font-bold text-white mb-1"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      73%
                    </div>
                    <div 
                      className="text-xs md:text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      SMBs don't track metrics
                    </div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="font-bold text-white mb-1"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      4
                    </div>
                    <div 
                      className="text-xs md:text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      Pillars of health measured
                    </div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="font-bold text-white mb-1"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      ✓
                    </div>
                    <div 
                      className="text-xs md:text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      Benchmark vs. peers
                    </div>
                  </div>
                </div>
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

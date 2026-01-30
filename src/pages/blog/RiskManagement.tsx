import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
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
  DollarSign,
  Settings,
  Compass,
  Monitor,
  Users
} from "lucide-react";
import { 
  getPostsByCategoryWithSubcategories, 
  CategoryBlogPost 
} from "@/utils/blogCategoryUtils";

// Subcategory mapping for Risk Management posts
const subcategoryMap: Record<string, string> = {
  'fix-business-blind-spots': 'Crisis Management',
  'chasing-sales-not-profits': 'Financial Risk',
  'renewal-imperative-legacy-business-rebirth': 'Business Continuity',
  'growth-ceiling-gut-instinct-scaling': 'Crisis Management',
  'estimating-crisis-service-business-profitability': 'Financial Risk',
  'growth-trap-or-growth-engine': 'Business Continuity',
  'feast-or-famine-cycle-small-business': 'Financial Risk',
  'business-blind-spots-operational-issues-invisible-leadership': 'Crisis Management',
  'stress-test-pricing-framework-margins-cash-flow': 'Financial Risk',
  'technology-innovation-gap-competitive-advantage': 'Business Continuity',
  'success-begins-with-2026-strategy': 'Business Continuity',
  'identifying-smb-leadership-blind-spots': 'Crisis Management',
  'small-business-blind-spots-2025': 'Financial Risk',
  'smb-scaling-paradox-2025': 'Business Continuity',
  'cash-flow-crisis-management': 'Crisis Management',
  'Q4-Cost-Cuts-2025': 'Financial Risk',
  'small-business-survival-checklist-2025': 'Crisis Management',
  'warning-signs-business': 'Crisis Management',
  'operational-resilience': 'Business Continuity',
  'final-approach-exit-preparation-business-value': 'Business Continuity',
  'secret-weapon-why-process-matters': 'Business Continuity'
};

const RiskManagement = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Get posts dynamically from centralized blogData
  const blogPosts = useMemo(() => 
    getPostsByCategoryWithSubcategories('Risk Management', subcategoryMap, 'Crisis Management'),
    []
  );

  const subcategories = [
    'All',
    'Business Continuity',
    'Financial Risk',
    'Crisis Management',
    'Insurance',
    'Compliance',
    'Cybersecurity Risk'
  ];

  const relatedCategories = [
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
      name: 'Business Strategy',
      icon: Compass,
      link: '/blog/business-strategy',
      description: 'Develop winning business strategies'
    },
    {
      name: 'Technology',
      icon: Monitor,
      link: '/blog/technology',
      description: 'Navigate the digital landscape'
    },
    {
      name: 'Leadership',
      icon: Users,
      link: '/blog/leadership',
      description: 'Strengthen your leadership skills'
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
    return posts; // Already sorted by newest first from utility
  }, [filteredPosts, sortOrder]);

  const totalPosts = sortedPosts.length;
  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SEO
        title="Risk Management Insights for Small Business"
        description="Practical risk management guidance for small and mid-sized business owners. Learn about business continuity, insurance, compliance, crisis management, and protecting your business."
        keywords="business risk management, small business risk, business continuity planning, small business insurance, compliance management, crisis management, business resilience, cybersecurity risk"
        canonical="https://bizhealth.ai/blog/risk-management"
        ogType="website"
        ogImage="/og-images/og-risk-management.jpg"
      />
      
      <StructuredData
        type="service"
        name="Risk Management Insights"
        description="Practical risk management guidance for small and mid-sized business owners."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/blog/risk-management"
      />

      <GlobalNavigation />
      
      {/* Section 1: Category Hero Header */}
      <section 
        className="pt-32 pb-16 px-6"
        style={{
          background: 'linear-gradient(170deg, #212653 0%, #181b3d 100%)'
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/60">/</span>
            <Link to="/blog" className="text-white/60 hover:text-white transition-colors">
              Blog
            </Link>
            <span className="mx-2 text-white/60">/</span>
            <span className="text-white">Risk Management</span>
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
            Risk Management
          </h1>

          {/* Category Description */}
          <p 
            className="text-white/80 mb-6 mx-auto leading-relaxed"
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              maxWidth: '700px'
            }}
          >
            Protect what you've built. Practical guidance on identifying threats, preparing for the unexpected, 
            and building a resilient business that can weather any storm.
          </p>

          {/* Post Count Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-white/70"
            style={{ fontSize: '0.9rem' }}
          >
            {blogPosts.length} {blogPosts.length === 1 ? 'Article' : 'Articles'}
          </div>
        </div>
      </section>

      {/* Section 2: Filter & Sort Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#212653]/8 px-6 py-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {subcategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedSubcategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedSubcategory === cat
                    ? 'bg-[#969423] text-white'
                    : 'bg-[#faf9f7] text-[#212653] hover:border hover:border-[#969423]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-[#7C7C7C]">Sort by:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-[#212653]/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#969423]"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Featured Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Category Tag */}
                    <span 
                      className="absolute top-4 left-4 bg-[#969423] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      {post.subcategory}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Post Title */}
                    <Link to={`/blog/${post.slug}`}>
                      <h3 
                        className="font-semibold text-[#212653] mb-3 hover:text-[#969423] transition-colors line-clamp-2"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '1.2rem',
                          lineHeight: 1.4,
                          fontWeight: 600
                        }}
                      >
                        {post.title}
                      </h3>
                    </Link>

                    {/* Post Excerpt */}
                    <p 
                      className="text-[#7C7C7C] mb-4 line-clamp-3"
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Post Meta */}
                    <div className="flex items-center gap-4 text-[#a8a8a8] mb-4 text-sm">
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
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#969423] font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
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

      {/* Section 4: Pagination */}
      {totalPages > 1 && (
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#212653]/15 text-[#212653] hover:bg-[#faf9f7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-[#212653] text-white'
                      : 'border border-[#212653]/15 text-[#212653] hover:bg-[#faf9f7]'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#212653]/15 text-[#212653] hover:bg-[#faf9f7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-center mt-4 text-sm text-[#7C7C7C]">
              Showing {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} articles
            </p>
          </div>
        </section>
      )}

      {/* Section 5: Related Categories */}
      <section 
        className="py-20 px-6"
        style={{ 
          background: 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 50%, #4a4a4a 100%)'
        }}
      >
        <div className="container mx-auto max-w-6xl">
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

      {/* Section 6: Newsletter CTA */}
      <section className="py-16 px-6 bg-[#faf9f7]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 
            className="font-bold text-[#212653] mb-4"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)'
            }}
          >
            Stay Ahead of Business Risks
          </h2>
          <p className="text-[#7C7C7C] mb-8 max-w-2xl mx-auto">
            Get expert insights on risk management, business continuity, and crisis prevention delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-[#212653]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#969423]"
            />
            <Button className="bg-[#969423] hover:bg-[#7a7a1d] text-white px-6 py-3 rounded-lg font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <PromotionalBanner />
      <GlobalFooter />
    </div>
  );
};

export default RiskManagement;

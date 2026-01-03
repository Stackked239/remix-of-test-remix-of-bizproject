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
  DollarSign,
  Settings,
  Compass,
  Monitor,
  Users
} from "lucide-react";
import operationalResilienceImage from "@/assets/operational-resilience-strategy.jpg";
import warningSignsImage from "@/assets/business-warning-signs-management.jpg";
import smbScalingParadoxImage from "@/assets/smb-scaling-paradox-2025.jpg";
import leadershipBlindSpotsImage from "@/assets/identifying-smb-leadership-blind-spots-optimized.jpg";
import survivalChecklistImage from "@/assets/small-business-survival-checklist-2025.jpg";
import businessStrategyPlanningImage from "@/assets/business-strategy-planning-2026-growth-optimized.jpg";

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

// Risk Management blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'operational-resilience',
    title: 'Building Operational Resilience in Uncertain Times',
    excerpt: 'Learn how to build a resilient business that can adapt and thrive through disruption, economic uncertainty, and unexpected challenges.',
    featuredImage: operationalResilienceImage,
    subcategory: 'Business Continuity',
    author: 'BizHealth Research Team',
    publishedAt: 'Dec 5, 2025',
    readTime: 12
  },
  {
    id: '2',
    slug: 'warning-signs-business',
    title: 'Critical Warning Signs Your Business Needs Immediate Attention',
    excerpt: 'Recognize the early warning signs of business trouble before they escalate into major problems that threaten your company\'s survival.',
    featuredImage: warningSignsImage,
    subcategory: 'Crisis Management',
    author: 'BizHealth Research Team',
    publishedAt: 'Nov 18, 2025',
    readTime: 10
  },
  {
    id: '3',
    slug: 'smb-scaling-paradox-2025',
    title: 'The SMB Scaling Paradox: Why Growing Too Fast Is Killing Your Business',
    excerpt: 'Discover why 60% of SMBs stall post-year 3 due to rapid scaling. Learn profitable scaling strategies and decision frameworks.',
    featuredImage: smbScalingParadoxImage,
    subcategory: 'Business Continuity',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 4, 2025',
    readTime: 10
  },
  {
    id: '4',
    slug: 'identifying-smb-leadership-blind-spots',
    title: 'Identifying Small & Mid-Size Business Leadership Blind Spots',
    excerpt: 'Discover the 7 critical leadership blind spots that prevent SMB success. Learn why 60% of employees lack confidence in their leaders.',
    featuredImage: leadershipBlindSpotsImage,
    subcategory: 'Crisis Management',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 23, 2025',
    readTime: 12
  },
  {
    id: '5',
    slug: 'small-business-survival-checklist-2025',
    title: 'The Small Business Survival Checklist: What 500+ Reddit Founders Wish They Knew',
    excerpt: 'Learn from 500+ founders about first-year challenges, essential metrics, and KPIs that separate successful businesses from failures.',
    featuredImage: survivalChecklistImage,
    subcategory: 'Crisis Management',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Oct 24, 2025',
    readTime: 11
  },
  {
    id: '6',
    slug: 'success-begins-with-2026-strategy',
    title: 'Success Begins with Strategy and A Plan: Prepping Your Business for 2026 Growth',
    excerpt: 'Discover why proactive 2026 business planning is essential for SMBs. Get actionable strategies for risk mitigation and growth analytics.',
    featuredImage: businessStrategyPlanningImage,
    subcategory: 'Business Continuity',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 20, 2025',
    readTime: 12
  }
];

const RiskManagement = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const subcategories = [
    'All',
    'Business Continuity',
    'Insurance',
    'Compliance',
    'Crisis Management',
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

  const totalPosts = blogPosts.length;

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SEO
        title="Risk Management Insights for SMBs"
        description="Practical risk management guidance for small and mid-sized business owners. Learn about business continuity, insurance, compliance, crisis management, and protecting your business."
        keywords="business risk management, SMB risk, business continuity planning, small business insurance, compliance management, crisis management, business resilience, cybersecurity risk"
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
            {totalPosts} {totalPosts === 1 ? 'Article' : 'Articles'}
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
                onClick={() => setSelectedSubcategory(cat)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
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
        </div>
      </section>

      {/* Section 4: Pagination */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#212653]/15 text-[#212653] hover:bg-[#faf9f7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <button
              className="w-10 h-10 rounded-lg bg-[#212653] text-white font-semibold"
            >
              1
            </button>

            <button
              disabled={currentPage === Math.ceil(totalPosts / 12)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#212653]/15 text-[#212653] hover:bg-[#faf9f7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-center mt-4 text-sm text-[#7C7C7C]">
            Showing 1-{Math.min(12, totalPosts)} of {totalPosts} articles
          </p>
        </div>
      </section>

      {/* Section 5: Related Categories */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCategories.map((category, index) => {
              const Icon = category.icon;
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
                    <Icon size={24} className="text-white" />
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

      {/* Section 6: CTA Banner */}
      <section 
        className="py-16 px-6"
        style={{
          background: 'linear-gradient(135deg, #212653 0%, #2d3268 100%)'
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left Column - Content */}
            <div className="flex-1 text-center lg:text-left">
              <p 
                className="text-[#b8b344] mb-3 uppercase tracking-widest"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '1.5px',
                  fontWeight: 600
                }}
              >
                The Risks You Don't See Are the Most Dangerous
              </p>
              
              <h2 
                className="text-white mb-4"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: 700
                }}
              >
                You Can't Protect What You Don't Understand
              </h2>
              
              <p 
                className="text-white/80 mb-7 leading-relaxed"
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7
                }}
              >
                Real risk management starts with seeing the full picture. Our Business Health Assessment 
                uncovers vulnerabilities across your operations, finances, team, and strategy—so you can 
                address weaknesses before they become crises.
              </p>
              
              <Button
                asChild
                className="bg-[#969423] hover:bg-[#b8b344] text-white font-bold text-base px-8 py-6 rounded-md hover:-translate-y-0.5 transition-all shadow-lg"
              >
                <Link to="/pricing" className="inline-flex items-center gap-2">
                  Start Your BizHealth Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Right Column - Stats */}
            <div className="flex-1 w-full">
              <div 
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row justify-around gap-6 text-center"
              >
                <div>
                  <div className="text-white text-4xl font-bold mb-1">43%</div>
                  <div className="text-white/70 text-sm">of SMBs lack a continuity plan</div>
                </div>
                <div>
                  <div className="text-white text-4xl font-bold mb-1">4 Pillars</div>
                  <div className="text-white/70 text-sm">of business health analyzed</div>
                </div>
                <div>
                  <div className="text-white text-4xl font-bold mb-1">Blind Spots</div>
                  <div className="text-white/70 text-sm">identified before they hurt you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Newsletter Signup */}
      <section className="py-12 px-6 bg-[#f5f3ef] border-t border-[#212653]/8">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 
            className="mb-3 text-[#212653]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 600
            }}
          >
            Stay Ahead of Business Risks
          </h2>
          
          <p className="text-[#7C7C7C] mb-6">
            Get practical risk management strategies, compliance updates, and business continuity tips delivered to your inbox weekly.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-[#212653]/15 focus:outline-none focus:ring-2 focus:ring-[#969423]"
              required
            />
            <Button
              type="submit"
              className="bg-[#212653] hover:bg-[#2d3268] text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default RiskManagement;
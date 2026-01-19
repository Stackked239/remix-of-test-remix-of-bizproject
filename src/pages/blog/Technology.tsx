import { useState } from 'react';
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
  Settings,
  Compass,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import aiAnalyticsImage from "@/assets/ai-business-analytics-dashboard.jpg";
import retailRemoteImage from "@/assets/retail-remote-tools-family-business.jpg";
import overcomingBIChallengesImage from "@/assets/overcoming-bi-challenges-smb-optimized.jpg";
import hiddenCostsManualProcessesImage from "@/assets/hidden-costs-manual-processes-smb-optimized.jpg";
import aiAdoptionImage from "@/assets/ai-adoption-skeptical-business-owners-2025.jpg";
import cashFlowCrisisImage from "@/assets/cash-flow-crisis-management-2025.jpg";
import renewalImperativeImage from "@/assets/renewal-imperative-legacy-business-rebirth.jpg";
import biRoiImage from "@/assets/business-intelligence-roi-analytics.jpg";
import scalingOperationsImage from "@/assets/scaling-operations-without-losing-control-optimized.jpg";
import businessStrategyPlanningImage from "@/assets/business-strategy-planning-2026-growth-optimized.jpg";
import confirmWeaknessesImage from "@/assets/confirm-business-weaknesses-without-consultants-optimized.jpg";
import blindSpotsImage from "@/assets/business-blind-spots-assessment.jpg";
import realTimeAnalyticsImage from "@/assets/real-time-analytics-smb-agility-volatile-markets.jpg";
import techInnovationGapImage from "@/assets/technology-innovation-gap-small-business-2025.jpg";
import growthCeilingImage from "@/assets/images/growth-ceiling-gut-instinct-scaling-business.jpg";
import leadingBlindImage from "@/assets/images/blog/leading-blind-business-intelligence.jpg";
import cacGuideImage from "@/assets/images/customer-acquisition-cost-guide-smb-growth.jpg";
import businessHealthScoresImage from "@/assets/business-health-scores-stages-survival-stability-scale-exit.jpg";
import planogramsImage from "@/assets/images/blog/planograms-transform-small-retail-operations.jpg";
import crmRealityImage from "@/assets/images/crm-reality-check-small-business-decision-guide.jpg";
import technologyStrategicAllyImage from "@/assets/images/technology-strategic-ally-roi-decisions-growth.jpg";
import schedulingCrisisImage from "@/assets/images/scheduling-crisis-operational-costs-smb.jpg";
import estimatingCrisisImage from "@/assets/images/estimating-crisis-service-business-profitability.jpg";

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

// Technology blog posts (merged with Business Intelligence)
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'renewal-imperative-legacy-business-rebirth',
    title: 'The Renewal Imperative: How to Rebirth Your Legacy Business Without Losing What Made It Great',
    excerpt: 'Learn how to transform your legacy business through strategic renewal. Preserve your core strengths while modernizing operations.',
    featuredImage: renewalImperativeImage,
    subcategory: 'Digital Transformation',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 19, 2026',
    readTime: 18
  },
  {
    id: '2',
    slug: 'planograms-transform-small-retail-operations',
    title: 'Shelf Space Secrets: How Planograms Transform Small Retail Operations',
    excerpt: 'Discover how planograms eliminate lost revenue and operational chaos in small retail. Learn strategic shelf placement.',
    featuredImage: planogramsImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 18, 2026',
    readTime: 13
  },
  {
    id: '3',
    slug: 'leading-blind-business-intelligence-small-business',
    title: 'Leading Blind: Why Business Intelligence Is No Longer Optional for Small Business',
    excerpt: 'Discover why operating without BI costs you market share, customers, and profitability. Learn how affordable BI tools transform decisions.',
    featuredImage: leadingBlindImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 12, 2026',
    readTime: 10
  },
  {
    id: '4',
    slug: 'customer-acquisition-cost-guide-smb',
    title: 'The Customer Acquisition Cost Guide: Calculate, Optimize, and Stop Bleeding Money',
    excerpt: 'Learn how to calculate CAC, understand payback periods, and optimize your LTV-to-CAC ratio for sustainable growth.',
    featuredImage: cacGuideImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 12, 2026',
    readTime: 10
  },
  {
    id: '5',
    slug: 'growth-ceiling-gut-instinct-scaling',
    title: 'The Growth Ceiling: Why Your Gut Instinct Built Your Business But Won\'t Scale It',
    excerpt: 'Your gut instinct got your business off the ground—but it won\'t scale it. Learn why data-driven decision-making is essential.',
    featuredImage: growthCeilingImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 11, 2026',
    readTime: 10
  },
  {
    id: '6',
    slug: 'scheduling-crisis-operational-costs',
    title: 'Scheduling: Why Your Most Underestimated Operational Task Is Bleeding Your Profits',
    excerpt: 'Scheduling decisions silently drain $200,000+ annually through labor inefficiency. Transform scheduling into strategic advantage.',
    featuredImage: schedulingCrisisImage,
    subcategory: 'Automation',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 9, 2026',
    readTime: 10
  },
  {
    id: '7',
    slug: 'estimating-crisis-service-business-profitability',
    title: 'Avoid The Estimating Crisis: Why Service Business Profitability Collapses',
    excerpt: 'A 5% estimating error can destroy 100% of your profit margin. Learn the 7-step system to protect profitability.',
    featuredImage: estimatingCrisisImage,
    subcategory: 'Digital Tools',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 9, 2026',
    readTime: 12
  },
  {
    id: '8',
    slug: 'crm-reality-check-small-business-decision',
    title: 'CRM Reality Check: Cutting Through the Hype to Make the Right Decision',
    excerpt: '55% of CRM implementations fail. Learn why CRM success depends 80% on people and process, not technology.',
    featuredImage: crmRealityImage,
    subcategory: 'Software Selection',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 7, 2026',
    readTime: 10
  },
  {
    id: '9',
    slug: 'technology-strategic-ally-roi-decisions',
    title: 'Technology as Your Strategic Ally: Making ROI-First Decisions That Drive Real Growth',
    excerpt: 'Learn to make ROI-first technology decisions that drive real SMB growth. Discover the 5 dimensions of tech ROI.',
    featuredImage: technologyStrategicAllyImage,
    subcategory: 'Software Selection',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 5, 2026',
    readTime: 10
  },
  {
    id: '10',
    slug: 'business-health-scores-by-stage',
    title: 'What Your Business Health Score Should Look Like at Each Stage',
    excerpt: 'Learn what healthy business scores look like at each growth stage: Survival, Stability, Scale, and Exit.',
    featuredImage: businessHealthScoresImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 29, 2025',
    readTime: 15
  },
  {
    id: '11',
    slug: 'technology-innovation-gap-competitive-advantage',
    title: 'Why 72% of Innovative Small Businesses Are Outgrowing You: The Innovation Gap',
    excerpt: 'Discover the innovation gap destroying SMB competitive advantage. Learn the 4 pillars of innovation competency.',
    featuredImage: techInnovationGapImage,
    subcategory: 'Digital Transformation',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 28, 2025',
    readTime: 17
  },
  {
    id: '12',
    slug: 'overcoming-bi-challenges-smb',
    title: 'Overcoming Business Intelligence Challenges for Small and Mid-Size Businesses',
    excerpt: 'Discover how SMBs can overcome BI challenges. Learn budget-friendly strategies and AI-powered analytics.',
    featuredImage: overcomingBIChallengesImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 10, 2025',
    readTime: 12
  },
  {
    id: '13',
    slug: 'hidden-costs-manual-processes',
    title: 'The Hidden Costs of Manual Processes in Today\'s Smaller Businesses',
    excerpt: 'Discover why 53% of SMBs have adopted AI while 47% struggle with outdated manual processes costing $12,000+ annually.',
    featuredImage: hiddenCostsManualProcessesImage,
    subcategory: 'Automation',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 9, 2025',
    readTime: 10
  },
  {
    id: '14',
    slug: 'scaling-operations-without-losing-control',
    title: 'How Small & Mid-Size Businesses Can Scale Operations Without Losing Control',
    excerpt: 'Discover proven strategies to scale operations sustainably. Learn the SCALE framework and avoid growth traps.',
    featuredImage: scalingOperationsImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 23, 2025',
    readTime: 12
  },
  {
    id: '15',
    slug: 'success-begins-with-2026-strategy',
    title: 'Success Begins with Strategy and A Plan: Prepping Your Business for 2026 Growth',
    excerpt: 'Discover why proactive 2026 business planning is essential. Get actionable strategies for AI-driven growth analytics.',
    featuredImage: businessStrategyPlanningImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 20, 2025',
    readTime: 12
  },
  {
    id: '16',
    slug: 'confirm-business-weaknesses-without-consultants',
    title: 'How to Confirm Your Business Weaknesses Without Expensive Consultants',
    excerpt: 'Learn how AI-powered business health assessments help identify operational weaknesses without consultant fees.',
    featuredImage: confirmWeaknessesImage,
    subcategory: 'AI & Machine Learning',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 5, 2025',
    readTime: 8
  },
  {
    id: '17',
    slug: 'small-business-ai-adoption',
    title: 'AI Adoption for Skeptical Owners—A No-BS Guide for Business Owners',
    excerpt: 'Skip the hype. Discover practical AI tools for small business owners—automate tasks and save money.',
    featuredImage: aiAdoptionImage,
    subcategory: 'AI & Machine Learning',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 4, 2025',
    readTime: 12
  },
  {
    id: '18',
    slug: 'small-business-blind-spots-2025',
    title: 'The Business Blind Spots Costing SMB Leaders $50K+ Annually',
    excerpt: 'Discover the 5 dangerous business blind spots draining SMB profits. Identify gaps before they cost $50K+ annually.',
    featuredImage: blindSpotsImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 4, 2025',
    readTime: 11
  },
  {
    id: '19',
    slug: 'cash-flow-crisis-management',
    title: 'Cash Flow Crisis Management: Why 60% of Small Businesses Are Down in 2025',
    excerpt: 'Master cash flow management with crisis prevention strategies and planning tips.',
    featuredImage: cashFlowCrisisImage,
    subcategory: 'Digital Tools',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 3, 2025',
    readTime: 8
  },
  {
    id: '20',
    slug: 'real-time-analytics-smb-agility',
    title: 'Real-Time Analytics: Powering SMB Agility in Volatile Markets',
    excerpt: 'Transform your SMB with real-time BI. Expert insights on analytics agility and data-driven decisions.',
    featuredImage: realTimeAnalyticsImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 26, 2025',
    readTime: 10
  },
  {
    id: '21',
    slug: 'business-intelligence-roi',
    title: 'The ROI of Business Intelligence for SMBs',
    excerpt: 'Discover how to measure and maximize the return on investment from your business intelligence tools.',
    featuredImage: biRoiImage,
    subcategory: 'Business Intelligence',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 26, 2025',
    readTime: 9
  },
  {
    id: '22',
    slug: 'retail-remote-tools',
    title: 'Retail Remote Tools: 2025 Tech for Family-Owned Micro Ventures',
    excerpt: 'Discover how family-owned micro retailers can leverage remote tools while preserving their personal touch.',
    featuredImage: retailRemoteImage,
    subcategory: 'Digital Tools',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 24, 2025',
    readTime: 12
  },
  {
    id: '23',
    slug: 'ai-business-analytics',
    title: 'How AI is Revolutionizing Small Business Analytics',
    excerpt: 'Explore how artificial intelligence is making enterprise-level business intelligence accessible to SMBs.',
    featuredImage: aiAnalyticsImage,
    subcategory: 'AI & Machine Learning',
    author: 'BizHealth Research Team',
    publishedAt: 'Sep 12, 2025',
    readTime: 10
  }
];

const Technology = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const subcategories = [
    'All',
    'Business Intelligence',
    'AI & Machine Learning',
    'Automation',
    'Digital Tools',
    'Digital Transformation',
    'Software Selection',
    'Cybersecurity'
  ];

  const relatedCategories = [
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
      name: 'Growth & Scaling',
      icon: TrendingUp,
      link: '/blog/growth-scaling',
      description: 'Scale your business sustainably'
    },
    {
      name: 'Financial Management',
      icon: DollarSign,
      link: '/blog/financial-management',
      description: 'Master your business finances'
    },
    {
      name: 'Team Building',
      icon: Users,
      link: '/blog/team-building',
      description: 'Build high-performing teams'
    }
  ];

  const totalPosts = blogPosts.length;

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SEO
        title="Technology Insights for SMBs"
        description="Practical technology guidance for small and mid-sized business owners. Learn about digital tools, automation, AI, cybersecurity, and smart software selection for your business."
        keywords="business technology, SMB tech tools, business automation, AI for small business, digital transformation, cybersecurity for business, software selection, business efficiency tools"
        canonical="https://bizhealth.ai/blog/technology"
        ogType="website"
        ogImage="/og-images/og-technology.jpg"
      />
      
      <StructuredData
        type="service"
        name="Technology Insights"
        description="Practical technology guidance for small and mid-sized business owners."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/blog/technology"
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
            <span className="text-white">Technology</span>
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
            Technology
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
            Navigate the digital landscape with confidence. Practical guidance on choosing the right tools, 
            leveraging automation, and using technology to drive efficiency and growth in your business.
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
                Technology is Only Part of the Picture
              </p>
              
              <h2 
                className="text-white mb-4"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: 700
                }}
              >
                The Best Tools Can't Fix a Broken Foundation
              </h2>
              
              <p 
                className="text-white/80 mb-7 leading-relaxed"
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7
                }}
              >
                Technology accelerates what's already working—or amplifies what's broken. Before investing 
                in new tools, understand where your business truly stands. Our Business Health Assessment 
                reveals the full picture: operations, finances, team, and strategy.
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
                  <div className="text-white text-4xl font-bold mb-1">67%</div>
                  <div className="text-white/70 text-sm">of tech investments underperform</div>
                </div>
                <div>
                  <div className="text-white text-4xl font-bold mb-1">4 Pillars</div>
                  <div className="text-white/70 text-sm">of business health analyzed</div>
                </div>
                <div>
                  <div className="text-white text-4xl font-bold mb-1">Clear</div>
                  <div className="text-white/70 text-sm">roadmap for smart investment</div>
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
            Tech Insights for Business Owners
          </h2>
          
          <p className="text-[#7C7C7C] mb-6">
            Cut through the hype. Get practical technology guidance, tool recommendations, and automation strategies delivered to your inbox weekly.
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

      <GradientDivider />
      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default Technology;

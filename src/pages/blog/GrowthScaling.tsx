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
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";
import scalingOperationsImage from "@/assets/scaling-operations-without-losing-control-optimized.jpg";
import growthTrapImage from "@/assets/growth-trap-broken-business-model-2025.jpg";
import growthCeilingImage from "@/assets/images/growth-ceiling-gut-instinct-scaling-business.jpg";
import growthTrapOrGrowthEngineImage from "@/assets/images/growth-trap-or-growth-engine-business-readiness-assessment.jpg";
import ecommerceScalingImage from "@/assets/e-commerce-scaling-smb-strategies-2025.jpg";
import smbScalingParadoxImage from "@/assets/smb-scaling-paradox-2025.jpg";
import chaosToClarity from "@/assets/chaos-to-clarity-operating-rhythm-smb-teams.jpg";
import renewalImperativeImage from "@/assets/renewal-imperative-legacy-business-rebirth.jpg";
import customerAcquisitionCostImage from "@/assets/images/customer-acquisition-cost-guide-smb-growth.jpg";
import happyNewYear2026Image from "@/assets/happy-new-year-2026-business-growth.jpg";

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

// Growth & Scaling blog posts
const blogPosts: BlogPost[] = [
  {
    id: '0',
    slug: 'renewal-imperative-legacy-business-rebirth',
    title: 'The Renewal Imperative: How to Rebirth Your Legacy Business Without Losing What Made It Great',
    excerpt: 'Learn how to transform your legacy business through strategic renewal. Preserve your core strengths while modernizing operations for sustainable growth.',
    featuredImage: renewalImperativeImage,
    subcategory: 'Business Transformation',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 19, 2026',
    readTime: 18
  },
  {
    id: '1',
    slug: 'customer-acquisition-cost-guide-smb',
    title: 'The Customer Acquisition Cost Guide: Calculate, Optimize, and Stop Bleeding Money on Growth',
    excerpt: 'Learn how to calculate CAC, understand payback periods, and optimize your LTV-to-CAC ratio. Stop bleeding money on growth.',
    featuredImage: customerAcquisitionCostImage,
    subcategory: 'Unit Economics',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 12, 2026',
    readTime: 10
  },
  {
    id: '2',
    slug: 'growth-ceiling-gut-instinct-scaling',
    title: 'The Growth Ceiling: Why Your Gut Instinct Built Your Business But Won\'t Scale It',
    excerpt: 'Your gut instinct got your business off the ground—but it won\'t scale it. Learn why data-driven decision-making is essential at 30+ employees.',
    featuredImage: growthCeilingImage,
    subcategory: 'Scaling Challenges',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 9, 2026',
    readTime: 10
  },
  {
    id: '3',
    slug: 'growth-trap-or-growth-engine',
    title: 'Growth Trap or Growth Engine? Assessing Whether Your Business is Actually Ready to Grow',
    excerpt: '78% of SMBs want to grow, but 60% stall after year three. Learn the Foundation Audit framework to assess if your business is ready for sustainable growth.',
    featuredImage: growthTrapOrGrowthEngineImage,
    subcategory: 'Growth Readiness',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 8, 2026',
    readTime: 10
  },
  {
    id: '4',
    slug: 'chaos-to-clarity-operating-rhythm-scaling-teams',
    title: 'From Chaos to Clarity: A Lightweight Operating Rhythm for Scaling Your Business Teams',
    excerpt: 'Install a lightweight operating rhythm to scale your business from 10 to 70+ employees. Learn the three-cadence framework for weekly, monthly, and quarterly management.',
    featuredImage: chaosToClarity,
    subcategory: 'Scaling Operations',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 24, 2025',
    readTime: 15
  },
  {
    id: '5',
    slug: 'scaling-operations-without-losing-control',
    title: 'How Small & Mid-Size Businesses Can Scale Operations Without Losing Control',
    excerpt: 'Discover proven strategies for small businesses to scale operations sustainably. Learn the SCALE framework and avoid growth traps.',
    featuredImage: scalingOperationsImage,
    subcategory: 'Scaling Operations',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 23, 2025',
    readTime: 12
  },
  {
    id: '6',
    slug: 'e-commerce-scaling-5-strategies-for-smbs-thriving-in-2025',
    title: 'E-Commerce Scaling: 5 AI-Powered Strategies for 2025',
    excerpt: 'How top-performing SMBs are using AI to cut fulfillment costs by 28% and double order velocity with smart automation.',
    featuredImage: ecommerceScalingImage,
    subcategory: 'E-Commerce Growth',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 1, 2025',
    readTime: 8
  },
  {
    id: '7',
    slug: 'smb-scaling-paradox-2025',
    title: 'The SMB Scaling Paradox: Why Growing Too Fast Kills Businesses',
    excerpt: 'Learn why 70% of fast-scaling SMBs fail within 5 years and how to build sustainable growth systems that protect your business.',
    featuredImage: smbScalingParadoxImage,
    subcategory: 'Scaling Challenges',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Nov 2, 2025',
    readTime: 11
  },
  {
    id: '8',
    slug: 'growth-trap-broken-business-model',
    title: 'Is a Broken Business Model Holding You Back?',
    excerpt: 'Discover the hidden growth traps that keep SMBs stuck. Learn diagnostic frameworks to identify and fix business model issues before they derail your growth.',
    featuredImage: growthTrapImage,
    subcategory: 'Business Model',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Dec 18, 2025',
    readTime: 10
  },
  {
    id: '9',
    slug: 'happy-new-year-2026-year-of-growth',
    title: 'Happy New Year! 2026 – Year of Growth: Lessons from 2025, Momentum for Tomorrow',
    excerpt: 'Reflect on 2025\'s business lessons and embrace 2026 as your year of intentional growth. Discover the three strategic moves for sustainable small business success.',
    featuredImage: happyNewYear2026Image,
    subcategory: 'Growth Strategy',
    author: 'BizHealth.ai Research Team',
    publishedAt: 'Jan 1, 2026',
    readTime: 10
  }
];

const GrowthScaling = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const subcategories = [
    'All',
    'Scaling Challenges',
    'Scaling Operations',
    'Unit Economics',
    'Growth Readiness',
    'Growth Strategy',
    'Business Model',
    'Business Transformation',
    'E-Commerce Growth'
  ];

  const relatedCategories = [
    {
      name: 'Business Strategy',
      icon: Compass,
      link: '/blog/business-strategy',
      description: 'Develop winning business strategies'
    },
    {
      name: 'Operations',
      icon: Settings,
      link: '/blog/operations',
      description: 'Streamline processes and efficiency'
    },
    {
      name: 'Financial Management',
      icon: DollarSign,
      link: '/blog/financial-management',
      description: 'Master your business finances'
    },
    {
      name: 'Business Intelligence',
      icon: BarChart3,
      link: '/blog/business-intelligence',
      description: 'Data-driven decision making'
    },
    {
      name: 'Business Leadership',
      icon: Users,
      link: '/blog/business-leadership',
      description: 'Lead your team to success'
    }
  ];

  // Filter posts by subcategory
  const filteredPosts = selectedSubcategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.subcategory === selectedSubcategory);

  const totalPosts = filteredPosts.length;
  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SEO
        title="Growth & Scaling Strategies for SMBs | BizHealth.ai"
        description="Scale your business sustainably with proven growth strategies. Learn frameworks for scaling operations, overcoming growth ceilings, unit economics, and building systems that support long-term success."
        keywords="business scaling, SMB growth strategies, scaling operations, growth challenges, unit economics, sustainable growth, business expansion, scaling framework, growth readiness, business model optimization, LTV CAC ratio, customer acquisition cost"
        canonical="https://bizhealth.ai/blog/growth-scaling"
        ogType="website"
        ogImage="/og-images/og-growth-scaling.jpg"
      />
      
      <StructuredData type="organization" />

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
            <span className="text-white">Growth & Scaling</span>
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
            Growth & Scaling
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
            Scale smarter, not just faster. Learn proven frameworks for sustainable growth, 
            overcome scaling challenges, and build systems that support your business at every stage.
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCategories.map((category, idx) => {
              const IconComponent = category.icon;
              const iconColors = [
                { gradient: 'linear-gradient(135deg, #969423 0%, #b8b344 100%)', shadow: 'rgba(150, 148, 35, 0.4)', hover: '#b8b344' },
                { gradient: 'linear-gradient(135deg, #2a9d8f 0%, #40c9b8 100%)', shadow: 'rgba(42, 157, 143, 0.4)', hover: '#40c9b8' },
                { gradient: 'linear-gradient(135deg, #e07a5f 0%, #eb9680 100%)', shadow: 'rgba(224, 122, 95, 0.4)', hover: '#eb9680' },
                { gradient: 'linear-gradient(135deg, #4a7fb8 0%, #6a9fd8 100%)', shadow: 'rgba(74, 127, 184, 0.4)', hover: '#6a9fd8' },
                { gradient: 'linear-gradient(135deg, #9b59b6 0%, #be7bd8 100%)', shadow: 'rgba(155, 89, 182, 0.4)', hover: '#be7bd8' },
              ];
              const colorSet = iconColors[idx % iconColors.length];
              return (
                <Link
                  key={idx}
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
                      boxShadow: `0 4px 16px ${colorSet.shadow}`
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-white font-semibold mb-1 group-hover:text-opacity-100"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.05rem' }}
                    >
                      {category.name}
                    </h3>
                    <p 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        fontSize: '0.85rem',
                        fontFamily: 'Open Sans, sans-serif'
                      }}
                    >
                      {category.description}
                    </p>
                  </div>
                  <ArrowRight 
                    className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 
            className="mb-4"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#212653'
            }}
          >
            Ready to Scale Your Business?
          </h2>
          <p 
            className="mb-8 mx-auto"
            style={{
              fontSize: '1.1rem',
              color: '#7C7C7C',
              lineHeight: 1.7,
              maxWidth: '600px'
            }}
          >
            Identify your growth bottlenecks and get a clear roadmap for sustainable scaling 
            with BizHealth.ai's comprehensive business health assessment.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link to="/onboarding">
              Start Your Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <GradientDivider />
      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default GrowthScaling;

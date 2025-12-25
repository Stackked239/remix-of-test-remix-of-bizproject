import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  ArrowRight,
  UserPlus,
  Compass,
  Settings,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import leadershipStressImage from "@/assets/business-leadership-stress-success.png";
import blindSpotsImage from "@/assets/identifying-smb-leadership-blind-spots.jpg";
import scalingOperationsImage from "@/assets/scaling-operations-without-losing-control.jpg";
import chaosToClarity from "@/assets/chaos-to-clarity-operating-rhythm-smb-teams.jpg";
import businessStrategyPlanningImage from "@/assets/business-strategy-planning-2026-growth.png";
import smallBusinessStrugglesImage from "@/assets/small-business-struggles-fixing-wrong-problems.png";
import survivalChecklistImage from "@/assets/small-business-survival-checklist-2025.jpg";
import smbScalingParadoxImage from "@/assets/smb-scaling-paradox-2025.jpg";
import talentWarsImage from "@/assets/talent-wars-smb-hiring-2025.jpg";
import workforceGapsImage from "@/assets/smb-workforce-gaps-talent-analytics-2025.jpg";
import strategicPlanningImage from "@/assets/strategic-planning-post-pandemic.jpg";
import pivotImage from "@/assets/business-pivot-strategy-transformation.jpg";
import financialStewardshipImage from "@/assets/financial-stewardship-team-responsibility-smb.png";

const BusinessLeadership = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const filters = [
    "All",
    "Communication",
    "Team Development",
    "Decision Making",
    "Emotional Intelligence",
    "Change Management"
  ];

  const blogPosts = [
    {
      id: "0",
      slug: "chaos-to-clarity-operating-rhythm-scaling-teams",
      title: "From Chaos to Clarity: A Lightweight Operating Rhythm for Scaling Your Business Teams",
      excerpt: "Install a lightweight operating rhythm to scale your business from 10 to 70+ employees. Learn the three-cadence framework for weekly, monthly, and quarterly business management.",
      featuredImage: chaosToClarity,
      category: "Business Leadership",
      subcategory: "Change Management",
      author: "BizHealth.ai Research Team",
      publishedAt: "December 24, 2025",
      readTime: 15
    },
    {
      id: "1",
      slug: "leadership-stress-success",
      title: "Balancing Leadership Stress with Business Success",
      excerpt: "Discover practical strategies to manage the unique pressures of business leadership while maintaining team performance and personal well-being.",
      featuredImage: leadershipStressImage,
      category: "Business Leadership",
      subcategory: "Emotional Intelligence",
      author: "BizHealth Research Team",
      publishedAt: "December 1, 2025",
      readTime: 10
    },
    {
      id: "2",
      slug: "identifying-smb-leadership-blind-spots",
      title: "Identifying SMB Leadership Blind Spots",
      excerpt: "Learn how to recognize and address the critical blind spots that hold small and mid-sized business leaders back from achieving their full potential.",
      featuredImage: blindSpotsImage,
      category: "Business Leadership",
      subcategory: "Decision Making",
      author: "BizHealth Research Team",
      publishedAt: "November 28, 2025",
      readTime: 12
    },
    {
      id: "3",
      slug: "financial-stewardship-everyones-responsibility",
      title: "Financial Stewardship: Everyone's Responsibility in Your Small Business",
      excerpt: "Discover how to build a culture of financial stewardship where every employee contributes to cash flow health.",
      featuredImage: financialStewardshipImage,
      category: "Business Leadership",
      subcategory: "Team Development",
      author: "BizHealth.ai Research Team",
      publishedAt: "December 9, 2025",
      readTime: 14
    },
    {
      id: "4",
      slug: "scaling-operations-without-losing-control",
      title: "How Small & Mid-Size Businesses Can Scale Operations Without Losing Control",
      excerpt: "Discover proven strategies for small businesses to scale operations sustainably in 2025. Learn the SCALE framework and avoid growth traps.",
      featuredImage: scalingOperationsImage,
      category: "Business Leadership",
      subcategory: "Change Management",
      author: "BizHealth.ai Research Team",
      publishedAt: "November 23, 2025",
      readTime: 12
    },
    {
      id: "5",
      slug: "success-begins-with-2026-strategy",
      title: "Success Begins with Strategy and A Plan: Prepping Your Business for 2026 Growth",
      excerpt: "Discover why proactive 2026 business planning is essential for SMBs. Get actionable strategies for strategic planning and goal setting.",
      featuredImage: businessStrategyPlanningImage,
      category: "Business Leadership",
      subcategory: "Decision Making",
      author: "BizHealth.ai Research Team",
      publishedAt: "November 20, 2025",
      readTime: 12
    },
    {
      id: "6",
      slug: "small-business-struggles",
      title: "Why So Many Small Businesses Struggle: They're Fixing the Wrong Problems",
      excerpt: "Discover why 70% of SMBs face cash flow challenges and 60% stall after year three. Learn how AI-powered diagnostics uncover blind spots.",
      featuredImage: smallBusinessStrugglesImage,
      category: "Business Leadership",
      subcategory: "Decision Making",
      author: "BizHealth.ai Team",
      publishedAt: "November 13, 2025",
      readTime: 12
    },
    {
      id: "7",
      slug: "small-business-survival-checklist-2025",
      title: "The Small Business Survival Checklist: What 500+ Reddit Founders Wish They Knew",
      excerpt: "Learn from 500+ founders about first-year challenges, essential metrics, and KPIs that separate successful businesses from failures.",
      featuredImage: survivalChecklistImage,
      category: "Business Leadership",
      subcategory: "Decision Making",
      author: "BizHealth.ai Research Team",
      publishedAt: "October 24, 2025",
      readTime: 11
    },
    {
      id: "8",
      slug: "smb-scaling-paradox-2025",
      title: "The SMB Scaling Paradox: Why Growing Too Fast Is Killing Your Business",
      excerpt: "Discover why 60% of SMBs stall post-year 3 due to rapid scaling. Learn profitable scaling strategies and decision frameworks.",
      featuredImage: smbScalingParadoxImage,
      category: "Business Leadership",
      subcategory: "Change Management",
      author: "BizHealth.ai Research Team",
      publishedAt: "November 4, 2025",
      readTime: 10
    },
    {
      id: "9",
      slug: "talent-wars-smb-hiring-2025",
      title: "Talent Wars: Hiring Strategies for SMB Leaders in 2025 Shortages",
      excerpt: "Master SMB hiring strategies for 2025 talent shortages. Expert insights on leadership strategies, retention tips, and AI-powered recruitment.",
      featuredImage: talentWarsImage,
      category: "Business Leadership",
      subcategory: "Team Development",
      author: "BizHealth.ai Research Team",
      publishedAt: "October 14, 2025",
      readTime: 7
    },
    {
      id: "10",
      slug: "solving-smb-workforce-gaps-2025",
      title: "People-First Challenges: Solving SMB Workforce Gaps 2025",
      excerpt: "Discover actionable SMB growth strategies to solve workforce challenges in 2025. Learn how AI business analytics can bridge talent gaps.",
      featuredImage: workforceGapsImage,
      category: "Business Leadership",
      subcategory: "Team Development",
      author: "BizHealth Research Team",
      publishedAt: "October 10, 2025",
      readTime: 6
    },
    {
      id: "11",
      slug: "strategic-planning-post-pandemic",
      title: "Strategic Planning for the Post-Pandemic Business Landscape",
      excerpt: "How to adapt your business strategy for the new realities of remote work, supply chain disruptions, and changing consumer behavior.",
      featuredImage: strategicPlanningImage,
      category: "Business Leadership",
      subcategory: "Change Management",
      author: "BizHealth Research Team",
      publishedAt: "September 12, 2025",
      readTime: 13
    },
    {
      id: "12",
      slug: "when-to-pivot",
      title: "When to Pivot: Data-Driven Signals That It's Time to Change Course",
      excerpt: "Learn to recognize the quantifiable indicators that signal when your business model needs a strategic pivot.",
      featuredImage: pivotImage,
      category: "Business Leadership",
      subcategory: "Decision Making",
      author: "BizHealth Research Team",
      publishedAt: "September 12, 2025",
      readTime: 10
    }
  ];

  const relatedCategories = [
    {
      name: "Team Building",
      icon: UserPlus,
      link: "/blog",
      description: "Build high-performing teams"
    },
    {
      name: "Business Strategy",
      icon: Compass,
      link: "/blog/business-strategy",
      description: "Develop winning business strategies"
    },
    {
      name: "Operations",
      icon: Settings,
      link: "/blog/operations",
      description: "Streamline processes and efficiency"
    },
    {
      name: "Growth & Scaling",
      icon: TrendingUp,
      link: "/blog",
      description: "Scale your business sustainably"
    },
    {
      name: "Financial Management",
      icon: DollarSign,
      link: "/blog/financial-management",
      description: "Master your business finances"
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "You've been subscribed to our leadership insights newsletter.",
    });
    setEmail("");
  };

  return (
    <>
      <SEO
        title="Business Leadership Insights for SMBs"
        description="Practical business leadership guidance for small and mid-sized business owners. Learn communication, team development, decision-making, emotional intelligence, and change management."
        keywords="business leadership, SMB leadership, leadership development, team management, business communication, leadership skills, emotional intelligence, change management, decision making"
        canonical="https://bizhealth.ai/blog/business-leadership"
        ogType="website"
        ogImage="https://bizhealth.ai/images/og-business-leadership.jpg"
      />

      <StructuredData
        type="service"
        name="Business Leadership"
        description="Practical business leadership guidance for small and mid-sized business owners."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/blog/business-leadership"
      />

      <div className="min-h-screen bg-[#faf9f7]">
        <GlobalNavigation />

        {/* Category Hero Header */}
        <section 
          className="pt-32 pb-16 px-6"
          style={{
            background: "linear-gradient(170deg, #212653 0%, #181b3d 100%)"
          }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-white/80">Business Leadership</span>
              </div>
            </nav>

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Business Leadership
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-6">
              Lead with confidence and clarity. Practical guidance on communication, team development, 
              decision-making, and the leadership skills that drive business success.
            </p>

            {/* Post Count Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm text-white/70">
              {blogPosts.length} Articles
            </div>
          </div>
        </section>

        {/* Filter & Sort Bar */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Filter Tags */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      selectedFilter === filter
                        ? "bg-[#969423] text-white"
                        : "bg-[#faf9f7] text-[#212653] hover:border hover:border-[#969423]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select 
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-[#212653] focus:outline-none focus:border-[#969423]"
              >
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Featured Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 bg-[#969423] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded">
                      {post.subcategory}
                    </div>
                  </div>

                  {/* Card Body */}
                  <CardContent className="p-6">
                    {/* Title */}
                    <Link to={`/blog/${post.slug}`}>
                      <h3 
                        className="text-xl font-semibold text-[#212653] mb-3 line-clamp-2 hover:text-[#969423] transition-colors"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-[#7C7C7C] text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-[#a8a8a8] mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
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
                  </CardContent>
                </article>
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
                disabled
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                variant="default"
                size="sm"
                className="w-10 h-10 bg-[#212653] text-white"
              >
                1
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                disabled
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-center text-sm text-[#7C7C7C] mt-4">
              Showing 1-{blogPosts.length} of {blogPosts.length} articles
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* CTA Banner */}
        <section 
          className="py-16 px-6"
          style={{
            background: "linear-gradient(135deg, #212653 0%, #2d3268 100%)"
          }}
        >
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Column - Content */}
              <div>
                <div 
                  className="text-xs text-[#b8b344] font-semibold uppercase tracking-widest mb-3"
                  style={{ letterSpacing: '1.5px' }}
                >
                  GREAT LEADERS UNDERSTAND THEIR BUSINESS
                </div>
                
                <h2 
                  className="text-3xl lg:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  You Can't Lead What You Don't Know
                </h2>
                
                <p className="text-lg text-white/80 leading-relaxed mb-7">
                  Effective leadership starts with understanding the full picture. Our Business Health 
                  Assessment reveals strengths and gaps across your operations, finances, team, and 
                  strategy—giving you the clarity to lead with confidence.
                </p>
                
                <Button
                  asChild
                  className="bg-[#969423] hover:bg-[#b8b344] text-white font-bold text-base px-8 py-6 rounded-lg hover:-translate-y-0.5 transition-all shadow-lg"
                >
                  <Link to="/pricing" className="inline-flex items-center gap-2">
                    Get Your Business Health Assessment
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Right Column - Stats */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">69%</div>
                    <div className="text-sm text-white/70">of leaders struggle with delegation</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">4 Pillars</div>
                    <div className="text-sm text-white/70">of business health revealed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">Clear Vision</div>
                    <div className="text-sm text-white/70">across your entire business</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 px-6 bg-[#f5f3ef] border-t border-gray-200">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 
              className="text-2xl font-semibold text-[#212653] mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Leadership Insights for Business Owners
            </h2>
            
            <p className="text-[#7C7C7C] mb-6">
              Practical leadership strategies, communication tips, and team development insights delivered to your inbox weekly.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button 
                type="submit"
                className="bg-[#212653] hover:bg-[#181b3d] text-white font-semibold px-6"
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

export default BusinessLeadership;
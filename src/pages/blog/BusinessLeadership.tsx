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
        <section className="bg-white py-16 px-6 border-t border-gray-200">
          <div className="container mx-auto max-w-5xl">
            <h2 
              className="text-3xl font-semibold text-[#212653] text-center mb-8"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Explore More Topics
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={category.link}
                    className="flex items-center gap-4 p-5 bg-[#faf9f7] border border-transparent rounded-xl hover:bg-white hover:border-[#969423]/30 hover:shadow-md transition-all"
                  >
                    <div className="w-11 h-11 bg-[#969423]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#969423]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#212653] mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[#7C7C7C]">
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
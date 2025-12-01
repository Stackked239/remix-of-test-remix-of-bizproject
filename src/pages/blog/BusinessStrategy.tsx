import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Users, Target, Settings, DollarSign } from "lucide-react";
import businessHealthImage from "@/assets/business-health-assessment-guide-2026.png";
import strategyPlanningImage from "@/assets/business-strategy-planning-2026-growth.png";
import pivotImage from "@/assets/business-pivot-strategy-transformation.jpg";
import infoOverloadImage from "@/assets/information-overload-business-leader.jpg";
import comprehensiveHealthImage from "@/assets/business-health-assessment-comprehensive.jpg";

const BusinessStrategy = () => {
  const strategyPosts = [
    {
      title: "The Complete Guide to Business Health Assessment in 2026",
      slug: "complete-guide-business-health-assessment-2026",
      excerpt: "Master your business health in 2026 with this comprehensive guide. Learn diagnostic frameworks, KPIs, and AI-powered assessment tools for sustainable SMB growth.",
      image: businessHealthImage,
      author: "BizHealth Research Team",
      date: "December 1, 2025",
      readTime: "15 min read",
      featured: true
    },
    {
      title: "Success Begins With Your 2026 Strategy",
      slug: "success-begins-with-2026-strategy",
      excerpt: "Build a winning 2026 business strategy with proven frameworks. Learn strategic planning, market positioning, and growth tactics for SMB success.",
      image: strategyPlanningImage,
      author: "BizHealth Research Team",
      date: "November 28, 2025",
      readTime: "12 min read",
      featured: true
    },
    {
      title: "When to Pivot Your Business Strategy",
      slug: "when-to-pivot",
      excerpt: "Discover the key indicators that signal it's time to pivot your business model for success. Strategic frameworks for decisive transformation.",
      image: pivotImage,
      author: "BizHealth Research Team",
      date: "November 20, 2025",
      readTime: "10 min read",
      featured: true
    },
    {
      title: "The Pitfall of Information Overload: Why General Advice Falls Short",
      slug: "impact-over-information",
      excerpt: "Discover why generic business advice fails SMBs and how AI-powered diagnostics deliver actionable insights that drive real results.",
      image: infoOverloadImage,
      author: "BizHealth Research Team",
      date: "November 15, 2025",
      readTime: "8 min read"
    },
    {
      title: "Strategic Planning Post-Pandemic",
      slug: "strategic-planning-post-pandemic",
      excerpt: "Master post-pandemic business strategy with proven frameworks for long-term growth and resilience in the new business landscape.",
      image: comprehensiveHealthImage,
      author: "BizHealth Research Team",
      date: "November 8, 2025",
      readTime: "11 min read"
    }
  ];

  const relatedCategories = [
    {
      name: "Operations",
      slug: "operations",
      description: "Streamline processes and boost efficiency",
      icon: Settings
    },
    {
      name: "Leadership",
      slug: "leadership",
      description: "Develop your leadership capabilities",
      icon: Users
    },
    {
      name: "Financial Health",
      slug: "financial-health",
      description: "Master your business finances",
      icon: DollarSign
    },
    {
      name: "Growth & Scaling",
      slug: "growth-scaling",
      description: "Strategies for sustainable growth",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Business Strategy Insights for SMBs | BizHealth.ai"
        description="Expert business strategy articles for small and mid-sized business owners. Learn strategic planning, competitive analysis, decision-making frameworks, and market positioning for sustainable growth in 2025."
        keywords="business strategy, SMB strategy, strategic planning, competitive analysis, business growth strategy, market positioning, business decision making, strategic frameworks 2025"
        canonical="https://bizhealth.ai/blog/business-strategy"
        ogType="website"
        ogImage="https://bizhealth.ai/og-business-strategy.jpg"
      />
      
      <StructuredData
        type="article"
        headline="Business Strategy Insights | BizHealth.ai"
        description="Strategic insights for small and mid-sized business owners. Develop winning strategies and position your business for sustainable growth."
        author="BizHealth Research Team"
        datePublished="2025-12-01"
        image="https://bizhealth.ai/og-business-strategy.jpg"
        url="https://bizhealth.ai/blog/business-strategy"
      />

      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
                <li className="opacity-60">/</li>
                <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
                <li className="opacity-60">/</li>
                <li className="text-foreground font-medium">Business Strategy</li>
              </ol>
            </nav>
            
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Business Strategy:<br />
                <span className="text-biz-green">Plan Smart, Grow Strong</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto font-medium">
                Strategic insights for small and mid-sized business owners
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Learn how to develop winning strategies, make better decisions, and position your business for sustainable growth. 
                Backed by proven frameworks and real-world success stories from SMBs generating $250K–$25M in revenue.
              </p>

              {/* Post Count Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-foreground">
                <Target className="w-4 h-4 text-primary" />
                {strategyPosts.length} Articles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Why Business Strategy Matters in 2025
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  <strong>74% of SMBs</strong> lack a formal business strategy (McKinsey SMB Strategy Report 2025), 
                  leaving them vulnerable to market shifts, competitive pressures, and resource misallocation.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Great strategy isn't about lengthy documents—it's about clarity, alignment, and execution. 
                  Yet without an objective view of your current business health, even the best strategic plans fall short.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  BizHealth.ai's comprehensive assessment reveals where you stand across strategy, operations, finance, 
                  and leadership—giving you the foundation to build plans that actually work.
                </p>
              </div>
              
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
                <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Common Strategy Challenges
                </h3>
                <ul className="space-y-4">
                  {[
                    "No clear strategic direction or market positioning",
                    "Reactive decision-making vs. proactive planning",
                    "Leadership team misalignment on priorities",
                    "Resource allocation without strategic clarity",
                    "Unable to measure strategic progress effectively"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="lg" className="w-full mt-6" asChild>
                  <a href="/onboarding">
                    Start Your Business Health Assessment
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Latest in Business Strategy
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Strategic frameworks, proven playbooks, and real-world case studies from successful SMBs
              </p>
            </div>

            {/* Featured Posts - Large Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {strategyPosts.filter(post => post.featured).map((post, idx) => (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border-border overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <a href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="ghost" className="w-full group/btn" asChild>
                      <a href={`/blog/${post.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Posts - Compact Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {strategyPosts.filter(post => !post.featured).map((post, idx) => (
                <Card key={idx} className="group hover:shadow-lg transition-all duration-300 border-border flex md:flex-row overflow-hidden">
                  <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      <a href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <a href="/blog" className="group">
                  View All Blog Posts
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories Section */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Explore More Topics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCategories.map((category, idx) => {
                const IconComponent = category.icon;
                return (
                  <a
                    key={idx}
                    href={`/blog/${category.slug}`}
                    className="group bg-background/50 hover:bg-background border border-transparent hover:border-primary/20 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                  Take Action on Your Strategy
                </p>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Strategy Without Clarity is Just Guessing
                </h2>
                
                <p className="text-lg mb-8 opacity-90 leading-relaxed">
                  Great strategy starts with knowing where you stand. Our Business Health Assessment 
                  reveals your strengths, exposes hidden gaps, and gives you a clear foundation 
                  for strategic planning.
                </p>
                
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all group"
                  asChild
                >
                  <a href="/onboarding">
                    Get Your Business Health Assessment
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Right Column - Stats */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">74%</div>
                    <p className="text-sm opacity-80">of SMBs lack a formal strategy</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">4</div>
                    <p className="text-sm opacity-80">Pillars of business health analyzed</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">20+</div>
                    <p className="text-sm opacity-80">Pages of actionable insights</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-medium">Strategic Clarity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Team Alignment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default BusinessStrategy;

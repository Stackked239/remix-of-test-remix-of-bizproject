import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";
import resilienceImage from "@/assets/operational-resilience-strategy.jpg";
import ecommerceImage from "@/assets/e-commerce-scaling-smb-strategies-2025.jpg";
import foodBusinessImage from "@/assets/daily-grind-food-business-operations.jpg";
import scalingImage from "@/assets/scaling-operations-without-losing-control.jpg";
import workforceImage from "@/assets/smb-workforce-gaps-talent-analytics-2025.jpg";
import retailImage from "@/assets/retail-remote-tools-family-business.jpg";

const Operations = () => {
  const operationsPosts = [
    {
      title: "From Chaos to Clarity: A Lightweight Operating Rhythm for Scaling Your Business Teams",
      slug: "chaos-to-clarity-operating-rhythm-scaling-teams",
      excerpt: "Install a lightweight operating rhythm to scale your business from 10 to 70+ employees. Learn the three-cadence framework for weekly, monthly, and quarterly business management.",
      image: scalingImage,
      author: "BizHealth.ai Research Team",
      date: "December 24, 2025",
      readTime: "15 min read",
      featured: true
    },
    {
      title: "E-Commerce Scaling: 5 AI-Powered Strategies for 2025",
      slug: "e-commerce-scaling-smb-2025",
      excerpt: "How top-performing SMBs are using AI to cut fulfillment costs by 28% and double order velocity with smart automation.",
      image: ecommerceImage,
      author: "BizHealth Research Team",
      date: "December 1, 2025",
      readTime: "8 min read",
      featured: true
    },
    {
      title: "Daily Grind Fixes: Food & Beverage Operations That Actually Work",
      slug: "daily-grind-fixes",
      excerpt: "Real restaurant owners share the exact checklists that reduced labor costs 18% without cutting staff or quality.",
      image: foodBusinessImage,
      author: "BizHealth Research Team",
      date: "November 25, 2025",
      readTime: "10 min read",
      featured: true
    },
    {
      title: "Scaling Operations Without Losing Control",
      slug: "scaling-operations-without-losing-control",
      excerpt: "The exact framework 500+ SMBs used to scale from $1M to $10M+ revenue while maintaining operational excellence.",
      image: scalingImage,
      author: "BizHealth Research Team",
      date: "November 18, 2025",
      readTime: "12 min read",
      featured: true
    },
    {
      title: "Building Operational Resilience in Uncertain Times",
      slug: "operational-resilience",
      excerpt: "Strategies for creating business systems that can withstand market volatility and unexpected challenges.",
      image: resilienceImage,
      author: "BizHealth Research Team",
      date: "November 12, 2025",
      readTime: "11 min read"
    },
    {
      title: "People-First Challenges: Solving SMB Workforce Gaps 2025",
      slug: "solving-smb-workforce-gaps-2025",
      excerpt: "Discover actionable SMB growth strategies to solve workforce challenges. AI-driven talent planning and data insights that work.",
      image: workforceImage,
      author: "BizHealth Research Team",
      date: "November 5, 2025",
      readTime: "9 min read"
    },
    {
      title: "Retail + Remote: Tools That Work for Family Businesses",
      slug: "retail-remote-tools",
      excerpt: "How family-run retail businesses are using modern tools to bridge physical stores and remote operations seamlessly.",
      image: retailImage,
      author: "BizHealth Research Team",
      date: "October 28, 2025",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Business Operations Insights & Strategies for SMBs (2025) | BizHealth.ai"
        description="Streamline business operations, boost operational efficiency, and scale your SMB confidently in 2025. Expert guides on process optimization, AI automation, lean operations, supply chain resilience, and operational excellence for small & mid-sized businesses."
        keywords="business operations SMB, operational efficiency 2025, streamline business processes, AI business operations, SMB operations strategies, operational resilience, process optimization AI, lean operations small business, business process automation 2025"
        canonical="https://bizhealth.ai/blog/operations"
        ogType="website"
        ogImage="https://bizhealth.ai/og-operations.jpg"
      />
      
      <StructuredData
        type="article"
        headline="Operations Insights: Streamline, Optimize, Scale | BizHealth.ai"
        description="Actionable strategies to eliminate operational bottlenecks and achieve 15–30% efficiency gains. Backed by AI diagnostics trusted by founders worldwide."
        author="BizHealth Research Team"
        datePublished="2025-12-01"
        image="https://bizhealth.ai/og-operations.jpg"
        url="https://bizhealth.ai/blog/operations"
      />

      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </a>
            
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Operations Insights:<br />
                <span className="text-primary">Streamline, Optimize, Scale</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto font-medium">
                Stop Guessing, Start Growing
              </p>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
                Operational efficiency is the #1 lever most SMBs under-use — yet <strong>Gartner 2025</strong> reports that companies improving process maturity see <strong>20%+ higher profitability</strong>. 
                Get proven frameworks, real-world case studies, and 2025-specific tactics to eliminate waste, automate intelligently, and build antifragile operations — all tailored for busy founders and leadership teams with $250K–$25M revenue.
              </p>
              
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" asChild>
                <a href="/onboarding">
                  Start Your BizHealth Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
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
                  Why Operational Excellence Matters in 2025
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  <strong>73% of SMB leaders</strong> say operational bottlenecks are their biggest scaling barrier (HubSpot State of SMB 2025). 
                  Inflation, talent shortages, and supply-chain volatility continue to squeeze margins.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  The difference between surviving and thriving? Having an unbiased, data-backed view of your operational health and a clear path to fix it — fast.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  BizHealth.ai's diagnostic scans your operations in under 90 minutes and benchmarks you against <strong>McKinsey 7S, Lean, and Six Sigma</strong> standards 
                  so you stop firefighting and start scaling with confidence.
                </p>
              </div>
              
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
                <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Common Operational Pain Points
                </h3>
                <ul className="space-y-4">
                  {[
                    "Hidden process waste costing you 20–30% of revenue",
                    "Manual workflows stealing 15+ hours/week from leadership",
                    "Supply chain or inventory gaps risking cash flow",
                    "Lack of real-time visibility into bottlenecks",
                    "Team alignment & capacity issues blocking growth"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
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
                Latest in Business Operations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Actionable insights, proven frameworks, and real-world case studies from successful SMBs
              </p>
            </div>

            {/* Featured Posts - Large Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {operationsPosts.filter(post => post.featured).map((post, idx) => (
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
              {operationsPosts.filter(post => !post.featured).map((post, idx) => (
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

      {/* Bottom CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center gap-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold">20-30% ROI Reported</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold">Trusted by 1000+ SMBs</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Eliminate Operational Drag?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Thousands of founders have used BizHealth.ai to identify and fix operational gaps that were silently costing them 20–30% of profit.
            </p>
            
            <Button size="lg" className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all" asChild>
              <a href="/onboarding">
                Start Your BizHealth Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground mt-6">
              Comprehensive analysis covering operations, finance, strategy & more
            </p>
          </div>
        </div>
      </section>

      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default Operations;
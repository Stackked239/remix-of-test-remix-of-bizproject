import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import warningSignsImage from "@/assets/business-warning-signs-management.jpg";
import leadershipStressImage from "@/assets/business-leadership-stress-success.png";

const RiskManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Risk Management Insights | BizHealth.ai</title>
        <meta name="description" content="Identify, assess, and mitigate business risks with proven risk management frameworks and early warning strategies." />
        <link rel="canonical" href="https://www.bizhealth.ai/blog/risk-management" />
        <meta property="og:title" content="Risk Management Insights" />
        <meta property="og:description" content="Identify and mitigate business risks with proven frameworks." />
        <meta property="og:url" content="https://www.bizhealth.ai/blog/risk-management" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Risk Management Insights",
            "description": "Identify, assess, and mitigate business risks with proven risk management frameworks.",
            "author": { "@type": "Organization", "name": "BizHealth.ai Research Team" },
            "publisher": { "@type": "Organization", "name": "BizHealth.ai", "logo": { "@type": "ImageObject", "url": "https://www.bizhealth.ai/logo-512.jpg" } },
            "datePublished": "2025-09-12",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.bizhealth.ai/blog/risk-management" }
          })}
        </script>
      </Helmet>
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </a>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Risk Management Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Identify, assess, and mitigate business risks with expert strategies for building resilient operations and protecting your bottom line.
            </p>
            
            <img 
              src={warningSignsImage} 
              alt="Business warning signs and risk management visualization with danger indicators and declining performance metrics"
              className="w-full rounded-xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 mb-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <CardTitle className="text-2xl">5 Warning Signs Your Business Needs Immediate Attention</CardTitle>
                  <CardDescription>
                    Discover the early indicators that suggest your business may be heading for trouble and what you can do about them.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>BizHealth Research Team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>September 12, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                  <a 
                    href="/blog/warning-signs-business" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read Full Article
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Latest
                    </span>
                  </div>
                  <CardTitle className="text-2xl">Why Success Feels Like a Mirage and How to Overcome Leadership Stress</CardTitle>
                  <CardDescription>
                    As a business leader, discover how to reframe risks, build resilience, and find peace in the storm of leadership without adding more burden to your plate.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>BizHealth Research Team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>September 24, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>12 min read</span>
                    </div>
                  </div>
                  <a 
                    href="/blog/leadership-stress-success" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read Full Article
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                More risk management articles coming soon. Stay tuned for expert insights on crisis management, 
                compliance strategies, and business continuity planning.
              </p>
              <a 
                href="/blog" 
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View All Blog Posts
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles articles={[
        {
          title: "Warning Signs Your Business Needs Attention",
          slug: "warning-signs-business",
          category: "Risk Management",
          excerpt: "Learn to identify critical warning signs before they become major problems for your business."
        },
        {
          title: "Operational Resilience Strategies",
          slug: "operational-resilience",
          category: "Business Strategy",
          excerpt: "Build business systems that withstand market volatility with proven resilience strategies."
        },
        {
          title: "Financial Health Metrics Every Business Owner Should Track",
          slug: "financial-health-metrics",
          category: "Financial Management",
          excerpt: "Learn the essential financial KPIs that help monitor business performance and drive growth."
        }
      ]} />

      <GlobalFooter />
    </div>
  );
};

export default RiskManagement;
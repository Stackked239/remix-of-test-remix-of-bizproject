import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import financialMetricsImage from "@/assets/financial-health-metrics-dashboard.jpg";

const FinancialManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Financial Management Insights | BizHealth.ai</title>
        <meta name="description" content="Master financial planning, cash flow management, and business finance strategies for sustainable SMB growth." />
        <link rel="canonical" href="https://www.bizhealth.ai/blog/financial-management" />
        <meta property="og:title" content="Financial Management Insights" />
        <meta property="og:description" content="Master financial planning and cash flow management for SMBs." />
        <meta property="og:url" content="https://www.bizhealth.ai/blog/financial-management" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Financial Management Insights",
            "description": "Master financial planning, cash flow management, and business finance strategies for SMB growth.",
            "author": { "@type": "Organization", "name": "BizHealth.ai Research Team" },
            "publisher": { "@type": "Organization", "name": "BizHealth.ai", "logo": { "@type": "ImageObject", "url": "https://www.bizhealth.ai/logo-512.jpg" } },
            "datePublished": "2025-09-12",
            "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.bizhealth.ai/blog/financial-management" }
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
              Financial Management Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master your business finances with expert guidance on cash flow management, financial planning, and key performance indicators.
            </p>
            
            <img 
              src={financialMetricsImage} 
              alt="Financial health metrics and KPI dashboard with profit charts and business performance indicators"
              className="w-full rounded-xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <CardTitle className="text-2xl">Financial Health Metrics Every Business Owner Should Track</CardTitle>
                <CardDescription>
                  A comprehensive guide to the key financial indicators that provide insight into your business's current and future performance.
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
                    <span>15 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/financial-health-metrics" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                More financial management articles coming soon. Stay tuned for expert insights on budgeting, 
                cash flow optimization, and financial planning strategies.
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
          title: "Financial Health Metrics Every Business Owner Should Track",
          slug: "financial-health-metrics",
          category: "Financial Management",
          excerpt: "Learn the essential financial KPIs that help monitor business performance and drive growth."
        },
        {
          title: "Business Intelligence ROI: Maximizing Returns",
          slug: "business-intelligence-roi",
          category: "Business Analytics",
          excerpt: "Discover how to measure and maximize the return on investment from your business intelligence tools."
        },
        {
          title: "Warning Signs Your Business Needs Attention",
          slug: "warning-signs-business",
          category: "Risk Management",
          excerpt: "Learn to identify critical warning signs before they become major problems for your business."
        }
      ]} />

      <GlobalFooter />
    </div>
  );
};

export default FinancialManagement;
import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import aiAnalyticsImage from "@/assets/ai-business-analytics-dashboard.jpg";

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
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
              Technology Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover how technology can transform your business operations, from AI-powered analytics to digital transformation strategies.
            </p>
            
            <img 
              src={aiAnalyticsImage} 
              alt="AI-powered business analytics dashboard with futuristic data visualizations and machine learning for small business success"
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
                <CardTitle className="text-2xl">How AI is Revolutionizing Small Business Analytics</CardTitle>
                <CardDescription>
                  Explore how artificial intelligence is making enterprise-level business intelligence accessible to small and medium businesses.
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
                    <span>10 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/ai-business-analytics" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Retail Remote Tools: 2025 Tech for Family-Owned Micro Ventures</CardTitle>
                <CardDescription>
                  Discover how family-owned micro retailers can leverage remote tools to streamline operations while preserving their personal touch.
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
                  href="/blog/retail-remote-tools" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                More technology articles coming soon. Stay tuned for expert insights on digital transformation, 
                automation, and emerging technologies for business growth.
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
          title: "AI-Powered Business Analytics",
          slug: "ai-business-analytics",
          category: "Technology",
          excerpt: "Discover how AI and machine learning transform business analytics for smarter decision-making."
        },
        {
          title: "Real-Time Analytics for SMB Agility",
          slug: "real-time-analytics-smb",
          category: "Technology",
          excerpt: "Learn how real-time analytics empowers small businesses to make faster, data-driven decisions."
        },
        {
          title: "Solving SMB Workforce Gaps with Talent Analytics",
          slug: "solving-smb-workforce-gaps",
          category: "Workforce Management",
          excerpt: "Discover how talent analytics helps SMBs close workforce gaps and optimize hiring strategies."
        }
      ]} />

      <GlobalFooter />
    </div>
  );
};

export default Technology;
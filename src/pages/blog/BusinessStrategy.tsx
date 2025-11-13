import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import businessHealthImage from "@/assets/business-health-assessment-comprehensive.jpg";

const BusinessStrategy = () => {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNavigation />
      
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
              Business Strategy Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Strategic guidance and frameworks to help you make informed decisions, plan for growth, and navigate competitive markets.
            </p>
            
            <img 
              src={businessHealthImage} 
              alt="Comprehensive business health assessment with diagnostic charts and performance metrics for overall company wellness"
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
                <CardTitle className="text-2xl">The Complete Guide to Business Health Assessment in 2025</CardTitle>
                <CardDescription>
                  A clear-eyed look at your company's vital signs to spot issues before they spiral into costly problems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Dennis Hough</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>July 27, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>15 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/business-health-assessment-2025" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                More business strategy articles coming soon. Stay tuned for expert insights on strategic planning, 
                competitive analysis, and growth frameworks.
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
          title: "The Pitfall of Information Overload: Why General Advice Falls Short",
          slug: "impact-over-information",
          category: "Business Strategy",
          excerpt: "Discover why generic business advice fails SMBs and how AI-powered diagnostics deliver actionable insights."
        },
        {
          title: "Strategic Planning Post-Pandemic",
          slug: "strategic-planning-post-pandemic",
          category: "Strategic Planning",
          excerpt: "Master post-pandemic business strategy with proven frameworks for long-term growth."
        },
        {
          title: "When to Pivot Your Business Strategy",
          slug: "when-to-pivot",
          category: "Business Strategy",
          excerpt: "Discover the key indicators that signal it's time to pivot your business model for success."
        }
      ]} />

      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default BusinessStrategy;
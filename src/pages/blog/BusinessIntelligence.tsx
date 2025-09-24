import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import biRoiImage from "@/assets/business-intelligence-roi-analytics.jpg";

const BusinessIntelligence = () => {
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
              Business Intelligence Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Harness the power of data-driven decision making with expert insights on analytics, reporting, and business intelligence tools.
            </p>
            
            <img 
              src={biRoiImage} 
              alt="Business intelligence ROI visualization with investment returns and analytics charts for small business success"
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
                <CardTitle className="text-2xl">The ROI of Business Intelligence for SMBs</CardTitle>
                <CardDescription>
                  Real-world case studies showing how small and medium businesses achieve measurable returns from business intelligence investments.
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
                    <span>9 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/business-intelligence-roi" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                More business intelligence articles coming soon. Stay tuned for expert insights on data analytics, 
                KPI tracking, and performance dashboards.
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

      <Footer />
    </div>
  );
};

export default BusinessIntelligence;
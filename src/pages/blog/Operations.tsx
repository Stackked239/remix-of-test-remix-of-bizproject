import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import resilienceImage from "@/assets/operational-resilience-strategy.jpg";

const Operations = () => {
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
              Operations Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Streamline your business operations with proven strategies, process optimization techniques, and operational excellence frameworks.
            </p>
            
            <img 
              src={resilienceImage} 
              alt="Operational resilience and business continuity strategy with interconnected systems and adaptive processes"
              className="w-full rounded-xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    Latest
                  </span>
                </div>
                <CardTitle className="text-2xl">People-First Challenges: Solving SMB Workforce Gaps 2025</CardTitle>
                <CardDescription>
                  Discover actionable SMB growth strategies to solve workforce challenges in 2025. Learn how AI business analytics, talent planning tools, and data-driven insights can bridge talent gaps and boost retention.
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
                    <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>6 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/solving-smb-workforce-gaps-2025" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <CardTitle className="text-2xl">Daily Grind Fixes: Ops Tips for Early-Stage Food Businesses</CardTitle>
                <CardDescription>
                  Transform your early-stage food business with smart operational strategies. Master inventory, supply chain, and lifestyle balance for sustainable growth.
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
                    <span>September 25, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>10 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/daily-grind-fixes" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Building Operational Resilience in Uncertain Times</CardTitle>
                <CardDescription>
                  Strategies for creating business systems that can withstand market volatility and unexpected challenges.
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
                    <span>11 min read</span>
                  </div>
                </div>
                <a 
                  href="/blog/operational-resilience" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Full Article
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                More operations articles coming soon. Stay tuned for expert insights on process optimization, 
                supply chain management, and operational excellence.
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

      <GlobalFooter />
    </div>
  );
};

export default Operations;
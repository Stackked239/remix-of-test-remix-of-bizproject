import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import RelatedArticles from "@/components/RelatedArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import pivotImage from "@/assets/business-pivot-strategy-transformation.jpg";
import leadershipStressImage from "@/assets/business-leadership-stress-success.png";

const BusinessLeadership = () => {
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
              Business Leadership Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Develop your leadership skills with expert guidance on team management, strategic decision-making, and organizational culture.
            </p>
            
            <img 
              src={leadershipStressImage} 
              alt="Business leader experiencing stress while working with financial reports and analytics charts on desk"
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

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Featured
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

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <CardTitle className="text-2xl">When to Pivot: Data-Driven Signals That It's Time to Change Course</CardTitle>
                  <CardDescription>
                    Learn to recognize the quantifiable indicators that signal when your business model needs a strategic pivot.
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
                    href="/blog/when-to-pivot" 
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
                More business leadership articles coming soon. Stay tuned for expert insights on team building, 
                change management, and executive development.
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
          title: "Leadership Stress Management",
          slug: "leadership-stress-success",
          category: "Business Leadership",
          excerpt: "Conquer executive stress with proven leadership resilience strategies and reduce burnout."
        },
        {
          title: "Strategic Planning Post-Pandemic",
          slug: "strategic-planning-post-pandemic",
          category: "Strategic Planning",
          excerpt: "Master post-pandemic business strategy with proven frameworks for long-term growth."
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

export default BusinessLeadership;
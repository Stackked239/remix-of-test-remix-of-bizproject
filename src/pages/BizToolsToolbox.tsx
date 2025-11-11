import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  ArrowRight, 
  Download, 
  Target, 
  TrendingUp, 
  Shield,
  Zap,
  Filter,
  Search,
  DollarSign,
  Users,
  BarChart3,
  Settings
} from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const BizToolsToolbox = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash target if present in URL
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          // Get element position and account for fixed navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 120; // Offset for navbar + some padding
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  const toolCategories = [
    {
      title: "Financial Management",
      tools: ["Cash Flow Tracker", "Budget Planning Template", "ROI Calculator", "Financial Dashboard"],
      icon: DollarSign,
      color: "text-biz-copper",
      bgColor: "bg-biz-copper/10",
      borderColor: "border-biz-copper/20"
    },
    {
      title: "Operations Excellence", 
      tools: ["Process Mapping Tools", "Quality Checklists", "Inventory Management", "Performance Metrics"],
      icon: Settings,
      color: "text-biz-navy",
      bgColor: "bg-biz-navy/10",
      borderColor: "border-biz-navy/20"
    },
    {
      title: "Sales & Marketing",
      tools: ["Campaign Planners", "Lead Tracking System", "Customer Journey Maps", "Sales Funnels"],
      icon: TrendingUp,
      color: "text-biz-green",
      bgColor: "bg-biz-green/10",
      borderColor: "border-biz-green/20"
    },
    {
      title: "Strategic Planning",
      tools: ["SWOT Analysis Tool", "Goal Setting Templates", "Action Plan Builder", "Progress Trackers"],
      icon: Target,
      color: "text-biz-copper",
      bgColor: "bg-biz-copper/10",
      borderColor: "border-biz-copper/20"
    }
  ];

  const painPointsSolved = [
    {
      icon: Shield,
      title: "Eliminate Blind Spots",
      description: "Identify and address hidden vulnerabilities in your operations before they become critical issues.",
      stat: "85% reduction in operational surprises"
    },
    {
      icon: TrendingUp,
      title: "Overcome Scaling Barriers",
      description: "Access frameworks that helped 2,500+ SMBs break through growth plateaus.",
      stat: "40% faster scalability"
    },
    {
      icon: DollarSign,
      title: "Improve Cash Flow",
      description: "Battle-tested templates to optimize working capital and reduce cash flow stress.",
      stat: "27% average cash flow improvement"
    },
    {
      icon: Users,
      title: "Build Team Efficiency",
      description: "Streamline operations and empower your team with clear processes and accountability.",
      stat: "50% reduction in bottlenecks"
    }
  ];

  const valueProps = [
    {
      title: "Instant ROI",
      description: "Implement proven solutions today - see measurable improvements within 30 days",
      icon: Zap,
      color: "text-biz-green"
    },
    {
      title: "Battle-Tested",
      description: "Tools refined through 2,500+ real-world business transformations",
      icon: Shield,
      color: "text-biz-navy"
    },
    {
      title: "Affordable Access",
      description: "Premium tools at fraction of consultant costs - no expensive retainers",
      icon: DollarSign,
      color: "text-biz-copper"
    },
    {
      title: "Continuous Updates",
      description: "Monthly additions based on latest SMB success patterns and market trends",
      icon: TrendingUp,
      color: "text-biz-green"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="BizTools Toolbox - Business Templates & Resources | BizHealth.ai"
        description="Transform your business with our comprehensive toolbox of templates, frameworks, and resources. Battle-tested tools for financial management, operations, marketing, and strategic planning."
        canonical="https://bizhealth.ai/biztools/toolbox"
        ogImage="https://bizhealth.ai/og-biztools-toolbox.jpg"
      />
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* StoryBrand Header */}
      <section className="bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy pt-40 pb-16 px-6 animate-fade-in relative overflow-hidden" style={{ paddingTop: '180px' }}>
        {/* Background accent elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-biz-copper/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-6">
            {/* Headline */}
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              BizTools Toolbox—<span className="text-biz-green"> Where Insights Become Action.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="font-['Open_Sans'] text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Your comprehensive resource center for business tools and templates. Transform insights from your health assessment into actionable improvements with battle-tested resources designed specifically for SMB leaders facing cash flow challenges, scaling obstacles, and operational gaps.
            </p>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/register">Get Free Tools Now</Link>
              </Button>
            </div>
            
            {/* Trust Signals */}
            <div className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-center">
                <div>
                  <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">500+</p>
                  <p className="font-['Open_Sans'] text-xs sm:text-sm text-white/80">Premium Resources</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">2,500+</p>
                  <p className="font-['Open_Sans'] text-xs sm:text-sm text-white/80">SMBs Transformed</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">27x</p>
                  <p className="font-['Open_Sans'] text-xs sm:text-sm text-white/80">Average ROI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Business Toolkit Section */}
      <section id="business-toolkit" className="py-20 bg-biz-green/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-foreground font-montserrat">
              Complete Business Toolkit
            </h2>
            <p className="text-lg text-muted-foreground font-open-sans max-w-3xl mx-auto">
              Everything you need to address gaps identified in your business health assessment. Filter by category or pricing to find exactly what you need.
            </p>
            
            {/* Filter Tabs */}
            <div className="mt-8 flex justify-center">
              <Tabs defaultValue="all" className="w-full max-w-2xl">
                <TabsList className="grid w-full grid-cols-3 bg-background border-2 border-border/50 p-1.5 h-auto gap-2 shadow-md">
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setActiveFilter("all")}
                    className="data-[state=active]:bg-biz-navy data-[state=active]:text-white data-[state=active]:shadow-lg font-montserrat font-semibold py-3 px-6 rounded-md transition-all duration-300 hover:bg-biz-navy/10"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 inline-block" />
                    All Tools
                  </TabsTrigger>
                  <TabsTrigger 
                    value="free" 
                    onClick={() => setActiveFilter("free")}
                    className="data-[state=active]:bg-biz-green data-[state=active]:text-white data-[state=active]:shadow-lg font-montserrat font-semibold py-3 px-6 rounded-md transition-all duration-300 hover:bg-biz-green/10"
                  >
                    <Download className="w-4 h-4 mr-2 inline-block" />
                    Free Tools
                  </TabsTrigger>
                  <TabsTrigger 
                    value="premium" 
                    onClick={() => setActiveFilter("premium")}
                    className="data-[state=active]:bg-biz-copper data-[state=active]:text-white data-[state=active]:shadow-lg font-montserrat font-semibold py-3 px-6 rounded-md transition-all duration-300 hover:bg-biz-copper/10"
                  >
                    <Zap className="w-4 h-4 mr-2 inline-block" />
                    Premium Bundles
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {toolCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-border/50 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${category.borderColor}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`${category.bgColor} p-3 rounded-lg`}>
                        <IconComponent className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-montserrat text-biz-navy">
                          {category.title}
                        </CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            {category.tools.length} Tools
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.tools.map((tool, toolIndex) => {
                        const isClickable = tool === "Cash Flow Tracker" || tool === "Process Mapping Tools" || tool === "SWOT Analysis Tool" || tool === "Customer Journey Maps";
                        const toolUrl = tool === "Cash Flow Tracker" 
                          ? "/biztools/toolbox/cash-flow-tracker"
                          : tool === "Process Mapping Tools"
                          ? "/biztools/toolbox/process-mapping-tools"
                          : tool === "SWOT Analysis Tool"
                          ? "/biztools/toolbox/swot-analysis-tool"
                          : tool === "Customer Journey Maps"
                          ? "/biztools/toolbox/customer-journey-maps-tool"
                          : "#";
                        const content = (
                            <div className="flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-biz-lime/10 hover:translate-x-1 cursor-pointer group border border-transparent hover:border-biz-lime/20">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-biz-lime flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                              <span className={`font-open-sans text-foreground ${isClickable ? 'font-bold' : ''}`}>{tool}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        );
                        
                        return isClickable ? (
                          <Link key={toolIndex} to={toolUrl}>
                            {content}
                          </Link>
                        ) : (
                          <div key={toolIndex}>
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pain Points Solved Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-montserrat">
              Your Business Challenges, <span className="text-biz-green">Solved</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-open-sans">
              Every tool in our toolbox addresses real pain points faced by SMB leaders like you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {painPointsSolved.map((point, index) => (
              <Card 
                key={index} 
                className="text-center border-border/50 hover:border-biz-green/40 transition-all duration-300 hover:shadow-xl group"
              >
                <CardHeader>
                  <div className="bg-biz-green/10 rounded-xl p-4 w-fit mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                    <point.icon className="w-8 h-8 text-biz-green transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-xl font-montserrat">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans leading-relaxed mb-4">
                    {point.description}
                  </CardDescription>
                  <div className="text-biz-green font-montserrat font-bold text-lg">
                    {point.stat}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-gradient-to-br from-biz-navy/5 to-biz-copper/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-montserrat">
              Why BizHealth.ai Toolbox?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-open-sans">
              Premium business resources without the premium price tag
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <Card 
                key={index} 
                className="border-border/50 hover:border-biz-green/40 transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="bg-gradient-to-br from-biz-green/10 to-biz-lime/5 rounded-xl p-4 w-fit mx-auto mb-4">
                    <prop.icon className={`w-8 h-8 ${prop.color}`} />
                  </div>
                  <CardTitle className="text-xl font-montserrat text-center">{prop.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans leading-relaxed text-center">
                    {prop.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Transparency Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-montserrat">
                Transparent Pricing, <span className="text-biz-green">Maximum Value</span>
              </h2>
              <p className="text-xl text-muted-foreground font-open-sans">
                Start free, scale when ready. No expensive consultants required.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Tools Card */}
              <Card className="border-2 border-biz-green/30 hover:border-biz-green transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-biz-green/10 text-biz-green border-biz-green/20">
                    Entry Point
                  </Badge>
                  <CardTitle className="text-3xl font-montserrat text-biz-navy">Free Tools</CardTitle>
                  <CardDescription className="text-lg font-open-sans">
                    Get started with essential templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-green flex-shrink-0" />
                      <span className="font-open-sans">15+ free tools & templates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-green flex-shrink-0" />
                      <span className="font-open-sans">Basic tools & checklists</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-green flex-shrink-0" />
                      <span className="font-open-sans">Access limited to registered users</span>
                    </div>
                    <Button asChild className="w-full mt-6 bg-biz-green hover:bg-biz-green/90">
                      <Link to="/register">Start Free</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Bundle Card */}
              <Card className="border-2 border-biz-copper/30 hover:border-biz-copper transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-biz-copper text-white text-xs font-montserrat font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-biz-copper/10 text-biz-copper border-biz-copper/20">
                    Complete Access
                  </Badge>
                  <CardTitle className="text-3xl font-montserrat text-biz-navy">Premium Bundle</CardTitle>
                  <CardDescription className="text-lg font-open-sans">
                    Save 50% vs. à la carte pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-copper flex-shrink-0" />
                      <span className="font-open-sans">50+ premium tools & resources</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-copper flex-shrink-0" />
                      <span className="font-open-sans">Advanced frameworks & resources</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-copper flex-shrink-0" />
                      <span className="font-open-sans">Priority support & updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-copper flex-shrink-0" />
                      <span className="font-open-sans">Monthly new additions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-copper flex-shrink-0" />
                      <span className="font-open-sans font-bold">Most users see an immediate ROI</span>
                    </div>
                    <Button asChild className="w-full mt-6 bg-biz-copper hover:bg-biz-copper/90">
                      <Link to="/pricing">View Pricing</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 font-open-sans">
            Join 2,500+ SMB leaders who've used our toolbox to overcome scaling barriers, improve cash flow, and build resilient operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold text-lg px-8 py-6"
            >
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-biz-navy hover:bg-white hover:text-biz-green font-montserrat font-semibold text-lg px-8 py-6 bg-white transition-colors"
            >
              <Link to="/biztools/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default BizToolsToolbox;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wrench, Download, Settings, Zap, CheckCircle, ShoppingCart } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import PromotionalBanner from "@/components/PromotionalBanner";

const BizTools = () => {
  const features = [
    {
      icon: Wrench,
      title: "Business Templates",
      description: "Ready-to-use templates for financial planning, operations, marketing, and strategic planning."
    },
    {
      icon: Settings,
      title: "Automation Tools",
      description: "Streamline your operations with automated workflows and process optimization tools."
    },
    {
      icon: Zap,
      title: "Productivity Boosters",
      description: "Enhance efficiency with tools designed to eliminate bottlenecks and accelerate growth."
    },
    {
      icon: Download,
      title: "Instant Access",
      description: "Download and customize all tools immediately to start implementing improvements today."
    }
  ];

  const toolCategories = [
    {
      title: "Financial Management",
      tools: ["Cash Flow Tracker", "Budget Planning Template", "ROI Calculator", "Financial Dashboard"]
    },
    {
      title: "Operations Excellence", 
      tools: ["Process Mapping Tools", "Quality Checklists", "Inventory Management", "Performance Metrics"]
    },
    {
      title: "Marketing & Sales",
      tools: ["Campaign Planners", "Lead Tracking System", "Customer Journey Maps", "Sales Funnels"]
    },
    {
      title: "Strategic Planning",
      tools: ["SWOT Analysis Framework", "Goal Setting Templates", "Action Plan Builder", "Progress Trackers"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-biz-copper text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-navy/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Wrench className="w-12 h-12 text-biz-navy" />
              </div>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl lg:text-6xl mb-6 text-biz-navy">
              BizTools
            </h1>
            <p className="font-montserrat font-semibold text-2xl mb-4 text-white/95">
              Scalable Essentials at Your Fingertips
            </p>
            <p className="font-open-sans text-xl max-w-3xl mx-auto mb-8 text-white/85">
              Your comprehensive resource center for business tools and templates. Transform insights from your health assessment into actionable improvements with battle-tested resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-biz-navy hover:bg-white/90 font-montserrat font-semibold text-lg px-8 py-4"
              >
                Browse Tools
                <ShoppingCart className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-biz-navy border-biz-copper text-biz-white hover:bg-biz-copper hover:text-white font-open-sans font-semibold text-lg px-8 py-4"
              >
                View Downloads
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Professional Tools, Proven Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access the same tools used by successful businesses to optimize operations and drive growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 shadow-hub-copper hover:shadow-hub-copper/80 transition-all duration-300">
                <CardHeader>
                  <div className="bg-biz-copper/10 rounded-xl p-4 w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-biz-copper" />
                  </div>
                  <CardTitle className="text-xl font-montserrat">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-6 text-foreground font-montserrat">
              Complete Business Toolkit
            </h3>
            <p className="text-lg text-muted-foreground font-open-sans">
              Everything you need to address gaps identified in your business health assessment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {toolCategories.map((category, index) => (
              <Card key={index} className="border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-montserrat text-biz-copper">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-biz-copper flex-shrink-0" />
                        <span className="font-open-sans text-foreground">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-biz-copper text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 font-montserrat">
                Ready to Optimize Your Operations?
              </h3>
              <p className="text-xl mb-8 font-open-sans opacity-90">
                Get instant access to our complete library of business tools and templates. Start implementing improvements today.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span className="font-open-sans">Instant download access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span className="font-open-sans">Customizable templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span className="font-open-sans">Regular updates and new tools</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-6" />
                <h4 className="text-2xl font-bold mb-4 font-montserrat">
                  Complete Access Bundle
                </h4>
                <p className="font-open-sans mb-6 opacity-90">
                  One-time purchase for lifetime access to all current and future tools
                </p>
                <div className="text-4xl font-bold mb-6 font-montserrat">
                  $299
                </div>
                <Button 
                  className="bg-white text-biz-copper hover:bg-white/90 font-montserrat font-semibold w-full"
                  size="lg"
                >
                  Get All Tools Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
      <EmailCapturePopup hubColor="biz-tools" />
    </div>
  );
};

export default BizTools;
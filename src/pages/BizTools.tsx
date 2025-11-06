import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wrench, Download, Settings, Zap, CheckCircle, ShoppingCart } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import PromotionalBanner from "@/components/PromotionalBanner";

const BizTools = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const launchDate = new Date('2026-02-28T13:00:00-05:00').getTime(); // Feb 28, 2026, 1:00 PM EDT
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`Official Launch in: ${days} days, ${hours} hours, ${minutes} minutes`);
      } else {
        setCountdown("Launched!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

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
      title: "Sales & Marketing",
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
      
      {/* Sticky Banner - positioned below header and nav bar */}
      <div className="sticky top-36 w-full bg-biz-navy px-4 py-3 text-center font-montserrat font-bold z-30">
        <div className="text-biz-lime text-sm md:text-base">
          BizTools: Launching February 28, 2026 - Explore the vision as we put on the finishing touches
        </div>
        <div className="text-white text-xs md:text-sm">
          {countdown}
        </div>
      </div>
      
      <GlobalNavigation />
      
      {/* Hero Section - StoryBrand Framework */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Content (60%) */}
            <div className="lg:col-span-3">
              <h1 className="font-montserrat font-bold text-[32px] lg:text-[48px] leading-tight tracking-tight text-biz-navy mb-5 max-w-[600px]">
                Get the Business Tools You Need to Scale—Without the Guesswork
              </h1>
              
              <p className="font-open-sans text-base lg:text-lg text-biz-grey leading-relaxed max-w-[580px] mb-8">
                Affordable tools, frameworks, and resources hand-picked for business leaders who want practical solutions—not expensive consultants. Based on your business health assessment, these scalable essentials help you implement improvements fast.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg"
                  className="bg-biz-copper hover:bg-[#B8591A] text-white font-montserrat font-semibold text-base px-8 py-3.5 rounded shadow-[0_2px_8px_rgba(210,105,30,0.25)] hover:shadow-[0_4px_12px_rgba(210,105,30,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                  onClick={() => {
                    const toolsSection = document.querySelector('#tools-section');
                    toolsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See How It Works
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-biz-navy text-biz-navy hover:bg-biz-navy hover:text-white font-montserrat font-semibold text-base px-8 py-3.5 rounded transition-all duration-300"
                  onClick={() => window.location.href = '/'}
                >
                  Take Assessment First
                </Button>
              </div>
              
              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-open-sans text-biz-grey">
                <span className="flex items-center gap-1.5">
                  📦 <span className="font-medium">500+ Resources</span>
                </span>
                <span className="text-biz-grey/40">|</span>
                <span className="flex items-center gap-1.5">
                  ⭐ <span className="font-medium">4.9/5 Rating</span>
                </span>
                <span className="text-biz-grey/40">|</span>
                <span className="flex items-center gap-1.5">
                  🔧 <span className="font-medium">Updated Monthly</span>
                </span>
              </div>
            </div>
            
            {/* Right Column - Visual (40%) */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-biz-navy/5 to-biz-copper/10 rounded-2xl"></div>
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-biz-grey/10">
                      <Wrench className="w-10 h-10 text-biz-copper mb-3" />
                      <div className="h-2 bg-biz-grey/10 rounded mb-2"></div>
                      <div className="h-2 bg-biz-grey/10 rounded w-3/4"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-biz-grey/10 mt-8">
                      <Settings className="w-10 h-10 text-biz-copper mb-3" />
                      <div className="h-2 bg-biz-grey/10 rounded mb-2"></div>
                      <div className="h-2 bg-biz-grey/10 rounded w-3/4"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-biz-grey/10 -mt-4">
                      <Zap className="w-10 h-10 text-biz-copper mb-3" />
                      <div className="h-2 bg-biz-grey/10 rounded mb-2"></div>
                      <div className="h-2 bg-biz-grey/10 rounded w-3/4"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-biz-grey/10 mt-4">
                      <Download className="w-10 h-10 text-biz-copper mb-3" />
                      <div className="h-2 bg-biz-grey/10 rounded mb-2"></div>
                      <div className="h-2 bg-biz-grey/10 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-biz-grey/20 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section id="tools-section" className="py-20 bg-muted">
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
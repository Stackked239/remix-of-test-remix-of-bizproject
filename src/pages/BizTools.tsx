import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wrench, Download, Settings, Zap, CheckCircle, Trophy } from "lucide-react";
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
      
      <GlobalNavigation />
      
      {/* Sticky Banner - positioned below header and nav bar */}
      <div className="sticky top-36 w-full bg-biz-navy px-4 py-3 text-center font-montserrat font-bold z-30 mb-6 md:mb-8">
        <div className="text-biz-lime text-sm md:text-base">
          BizTools: Launching February 28, 2026 - Explore the vision as we put on the finishing touches
        </div>
        <div className="text-white text-xs md:text-sm">
          {countdown}
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-biz-copper text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-navy/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
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
            <p className="font-open-sans text-xl max-w-3xl mx-auto text-white/85">
              Your comprehensive resource center for business tools and templates. Transform insights from your health assessment into actionable improvements with battle-tested resources.
            </p>
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

      {/* StoryBrand Conversion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - 60% */}
            <div className="lg:col-span-3">
              <h1 className="font-montserrat font-bold text-[2rem] md:text-[3rem] leading-tight text-biz-navy mb-5 max-w-[600px] tracking-tight">
                Get the Business Tools You Need to Scale—Without the Guesswork
              </h1>
              
              <p className="font-open-sans text-base md:text-lg leading-relaxed text-biz-grey mb-8 max-w-[580px]">
                Affordable tools, frameworks, and resources hand-picked for business leaders who want practical solutions—not expensive consultants. Based on your business health assessment, these scalable essentials help you implement improvements fast.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  size="lg"
                  className="bg-biz-copper text-white hover:bg-[#B8591A] font-montserrat font-semibold text-base px-8 py-[14px] shadow-[0_2px_8px_rgba(210,105,30,0.25)] hover:shadow-[0_4px_12px_rgba(210,105,30,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  See How It Works
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-biz-navy border-2 border-biz-navy hover:bg-biz-navy hover:text-white font-montserrat font-semibold text-base px-8 py-[14px] transition-all duration-300"
                >
                  Take Assessment First
                </Button>
              </div>
              
              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-open-sans text-biz-grey">
                <span className="flex items-center gap-2">
                  📦 <span>500+ Resources</span>
                </span>
                <span className="text-biz-grey/40">|</span>
                <span className="flex items-center gap-2">
                  ⭐ <span>4.9/5 Rating</span>
                </span>
                <span className="text-biz-grey/40">|</span>
                <span className="flex items-center gap-2">
                  🔧 <span>Updated Monthly</span>
                </span>
              </div>
            </div>
            
            {/* Right Column - 40% Premium Interactive Visual */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[550px] h-[550px]">
                {/* Animated gradient background orbs */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-biz-copper/20 via-biz-copper/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-biz-navy/10 via-biz-copper/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                {/* Main 3D Stack Container */}
                <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                  
                  {/* Back Layer - Dashboard Preview */}
                  <div className="absolute w-[85%] h-[70%] bg-gradient-to-br from-white to-biz-copper/5 rounded-2xl shadow-2xl border border-biz-copper/20 transform rotate-3 translate-y-8 scale-95 opacity-60"
                       style={{ transformStyle: 'preserve-3d' }}>
                    <div className="p-6 space-y-3">
                      <div className="h-3 bg-biz-copper/20 rounded w-3/4"></div>
                      <div className="h-3 bg-biz-navy/10 rounded w-1/2"></div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="h-16 bg-gradient-to-br from-biz-copper/10 to-biz-copper/5 rounded"></div>
                        <div className="h-16 bg-gradient-to-br from-biz-copper/10 to-biz-copper/5 rounded"></div>
                        <div className="h-16 bg-gradient-to-br from-biz-copper/10 to-biz-copper/5 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle Layer - Tools Collection */}
                  <div className="absolute w-[90%] h-[75%] bg-gradient-to-br from-white via-white to-biz-copper/5 rounded-2xl shadow-[0_20px_50px_rgba(210,105,30,0.15)] border-2 border-biz-copper/30 transform -rotate-2 translate-y-4 scale-[0.97] opacity-80 hover:scale-100 transition-all duration-500 cursor-pointer"
                       style={{ transformStyle: 'preserve-3d' }}>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-biz-copper to-biz-copper/80 flex items-center justify-center shadow-lg">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-biz-navy/80 rounded w-32 mb-1.5"></div>
                          <div className="h-2 bg-biz-grey/30 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-20 bg-gradient-to-br from-biz-copper/15 to-biz-copper/5 rounded-lg border border-biz-copper/20"></div>
                        <div className="h-20 bg-gradient-to-br from-biz-copper/15 to-biz-copper/5 rounded-lg border border-biz-copper/20"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Front Layer - Featured Tool Card */}
                  <div className="absolute w-[95%] h-[80%] bg-gradient-to-br from-white via-white to-biz-copper/10 rounded-2xl shadow-[0_25px_60px_rgba(210,105,30,0.25)] border-2 border-biz-copper/40 transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer z-10 group"
                       style={{ transformStyle: 'preserve-3d' }}>
                    
                    {/* Premium badge */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-br from-biz-copper to-biz-copper/90 text-white text-xs font-montserrat font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-white">
                      PREMIUM
                    </div>
                    
                    <div className="p-8 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-biz-copper via-biz-copper to-biz-copper/90 flex items-center justify-center shadow-[0_8px_20px_rgba(210,105,30,0.4)] group-hover:shadow-[0_12px_28px_rgba(210,105,30,0.5)] transition-shadow duration-500">
                          <Wrench className="w-9 h-9 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-montserrat font-bold text-xl text-biz-navy mb-1">Complete Toolkit</h4>
                          <p className="font-open-sans text-sm text-biz-grey">500+ Premium Resources</p>
                        </div>
                      </div>
                      
                      {/* Tool Categories Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-biz-copper/10 to-white rounded-xl p-4 border border-biz-copper/20 hover:border-biz-copper/40 hover:shadow-lg transition-all duration-300 group/card">
                          <Settings className="w-8 h-8 text-biz-copper mb-2 group-hover/card:scale-110 transition-transform" />
                          <div className="text-xs font-montserrat font-semibold text-biz-navy">Financial<br/>Management</div>
                          <div className="text-[10px] text-biz-grey mt-1">125+ Tools</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-biz-copper/10 to-white rounded-xl p-4 border border-biz-copper/20 hover:border-biz-copper/40 hover:shadow-lg transition-all duration-300 group/card">
                          <Zap className="w-8 h-8 text-biz-copper mb-2 group-hover/card:scale-110 transition-transform" />
                          <div className="text-xs font-montserrat font-semibold text-biz-navy">Operations<br/>Excellence</div>
                          <div className="text-[10px] text-biz-grey mt-1">150+ Tools</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-biz-copper/10 to-white rounded-xl p-4 border border-biz-copper/20 hover:border-biz-copper/40 hover:shadow-lg transition-all duration-300 group/card">
                          <Download className="w-8 h-8 text-biz-copper mb-2 group-hover/card:scale-110 transition-transform" />
                          <div className="text-xs font-montserrat font-semibold text-biz-navy">Templates<br/>Library</div>
                          <div className="text-[10px] text-biz-grey mt-1">135+ Templates</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-biz-copper/10 to-white rounded-xl p-4 border border-biz-copper/20 hover:border-biz-copper/40 hover:shadow-lg transition-all duration-300 group/card">
                          <CheckCircle className="w-8 h-8 text-biz-copper mb-2 group-hover/card:scale-110 transition-transform" />
                          <div className="text-xs font-montserrat font-semibold text-biz-navy">Strategic<br/>Frameworks</div>
                          <div className="text-[10px] text-biz-grey mt-1">90+ Resources</div>
                        </div>
                      </div>
                      
                      {/* Footer badges */}
                      <div className="mt-auto flex items-center justify-between text-[10px] font-open-sans text-biz-grey border-t border-biz-copper/10 pt-4">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          Updated Monthly
                        </span>
                        <span>Instant Access</span>
                        <span>Cloud Storage</span>
                      </div>
                    </div>
                    
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-biz-copper/0 via-biz-copper/0 to-biz-copper/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                  
                  {/* Floating particles/dots for depth */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-biz-copper/30 animate-pulse"></div>
                    <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-biz-copper/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-[20%] left-[15%] w-1 h-1 rounded-full bg-biz-copper/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-[30%] right-[10%] w-2 h-2 rounded-full bg-biz-copper/35 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section Divider */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-biz-grey/20 to-transparent"></div>
        </div>
      </section>

      {/* CTA Section - Premium Redesign */}
      <section className="py-20 bg-gradient-to-br from-biz-navy via-biz-navy to-biz-navy/95 text-white relative overflow-hidden">
        {/* Background accent elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-biz-copper/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-biz-copper/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 font-montserrat text-white">
                Ready to Optimize Your Operations?
              </h3>
              <p className="text-xl mb-8 font-open-sans text-white/90">
                Get instant access to our complete library of business tools and templates. Start implementing improvements today.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-biz-copper/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-biz-copper" />
                  </div>
                  <span className="font-open-sans text-white/90">Instant download access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-biz-copper/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-biz-copper" />
                  </div>
                  <span className="font-open-sans text-white/90">Customizable templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-biz-copper/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-biz-copper" />
                  </div>
                  <span className="font-open-sans text-white/90">Regular updates and new tools</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-biz-copper/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(210,105,30,0.4)] hover:scale-105 hover:border-biz-copper/40 transition-all duration-500 group cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-biz-copper to-biz-copper/90 flex items-center justify-center shadow-lg group-hover:shadow-[0_8px_24px_rgba(210,105,30,0.5)] group-hover:scale-110 transition-all duration-500">
                  <Trophy className="w-9 h-9 text-white group-hover:animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold mb-4 font-montserrat text-biz-navy group-hover:text-biz-copper transition-colors duration-300">
                  Unlimited Access Bundle
                </h4>
                
                {/* Limited Time Offer Badge */}
                <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-montserrat font-bold px-4 py-1.5 rounded-full mb-4 animate-pulse">
                  LIMITED TIME OFFER
                </div>
                
                <p className="font-open-sans mb-6 text-biz-navy group-hover:text-biz-navy/80 transition-colors duration-300">
                  One-time purchase for unlimited access to all current and future BizTools tools & resources
                </p>
                
                {/* Pricing Container - Side by Side */}
                <div className="flex items-center justify-center gap-4 mb-2">
                  {/* Original Price - Strikethrough in Red */}
                  <div className="text-2xl font-bold font-montserrat text-red-600 line-through">
                    $799
                  </div>
                  
                  {/* Discounted Price */}
                  <div className="text-6xl font-bold font-montserrat text-biz-copper group-hover:scale-110 inline-block transition-transform duration-300 drop-shadow-lg">
                    $499
                  </div>
                </div>
                
                <div className="text-sm font-semibold text-green-600 mb-2 font-montserrat">
                  Save $300 Today!
                </div>
                <div className="text-sm text-biz-grey mb-6 font-open-sans">
                  or $49/month subscription
                </div>
                <Button 
                  className="bg-biz-copper text-white hover:bg-[#B8591A] font-montserrat font-semibold w-full shadow-[0_4px_20px_rgba(210,105,30,0.4)] hover:shadow-[0_8px_28px_rgba(210,105,30,0.6)] hover:-translate-y-1 transition-all duration-300"
                  size="lg"
                >
                  Get All Tools Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-biz-copper/10 group-hover:border-biz-copper/30 transition-colors duration-300 flex items-center justify-center gap-6 text-xs text-biz-grey font-open-sans">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-biz-copper" />
                    30-day guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-biz-copper" />
                    Secure checkout
                  </span>
                </div>
              </div>
              
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-biz-copper/0 via-biz-copper/5 to-biz-copper/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  Target, 
  Unlock, 
  Rocket,
  Users,
  TrendingUp,
  AlertCircle,
  BarChart3,
  DollarSign
} from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BizToolsHowItWorks = () => {
  const problemCards = [
    {
      icon: Users,
      headline: "You're Overwhelmed",
      body: "Between managing cash flow, hiring, marketing, and daily operations, you're stretched too thin. There's no time to figure out what's actually working—or what's broken.",
      audience: "Group 1 (micro/small businesses)"
    },
    {
      icon: AlertCircle,
      headline: "You're Flying Blind",
      body: "Your gut says something's off, but without clear data and benchmarks, you can't pinpoint where to focus. Decisions feel like guesswork, not strategy.",
      audience: "Both groups"
    },
    {
      icon: DollarSign,
      headline: "You're Wasting Money",
      body: "Expensive consultants, disconnected tools, and generic advice that doesn't fit your business. You need solutions that understand SMBs—not enterprise playbooks that don't scale down.",
      audience: "Both groups"
    }
  ];

  const steps = [
    {
      number: 1,
      icon: FileCheck,
      headline: "Take Your Free Assessment",
      body: "Complete our 30-minute business health diagnostic covering 12 critical areas: Strategy, Operations, Finance, Marketing, HR, and more. No credit card required—just honest answers about where your business stands today.",
      details: [
        "87 questions, mobile-optimized",
        "Auto-save progress",
        "Takes 30-40 minutes",
        "100% confidential"
      ],
      ctaText: "Start Free Assessment",
      ctaLink: "/onboarding"
    },
    {
      number: 2,
      icon: Target,
      headline: "Get Your Custom Recommendations",
      body: "Within minutes, receive your comprehensive Business Health Report identifying gaps, confirming strengths, and providing actionable insights. We'll recommend specific free and premium tools based on YOUR results—not generic advice.",
      details: [
        "Personalized to your assessment",
        "Prioritized by impact",
        "Free & premium tool suggestions",
        "Industry-specific benchmarks"
      ],
      ctaText: "See Sample Report",
      ctaLink: "/reports"
    },
    {
      number: 3,
      icon: Unlock,
      headline: "Start with Free Tools",
      body: "Access our free resource library immediately: templates, calculators, guides, and frameworks used by 10,000+ SMBs. No commitment, no upsell pressure—just practical tools you can implement today.",
      freeTools: [
        { icon: "📊", name: "Cash Flow Calculator" },
        { icon: "📋", name: "Strategic Planning Template" },
        { icon: "💰", name: "Pricing Strategy Worksheet" },
        { icon: "📈", name: "KPI Dashboard Template" },
        { icon: "👥", name: "Hiring Checklist" },
        { icon: "📧", name: "Email Marketing Guide" }
      ],
      ctaText: "Browse Free Tools",
      ctaLink: "/biztools"
    },
    {
      number: 4,
      icon: Rocket,
      headline: "Upgrade When Ready (Optional)",
      body: "When you're ready to scale, unlock premium analytics, advanced planning tools, and competitor benchmarking. Our customers typically see 20-25x ROI within 6 months—and you can downgrade or cancel anytime.",
      details: [
        "Advanced analytics dashboard",
        "Competitor benchmarking",
        "Financial forecasting tools",
        "Priority support"
      ],
      ctaText: "View Pricing",
      ctaLink: "/pricing"
    }
  ];

  const personas = [
    {
      name: "Maria, 34",
      title: "Logistics Business Owner",
      businessDetails: "3 employees, $250K annual revenue",
      quote: "I needed financial visibility without hiring a CFO. BizTools' free cash flow calculator saved me hours every week.",
      toolsUsed: [
        "Free business health assessment",
        "Cash flow calculator",
        "Pricing strategy templates"
      ],
      outcome: "📈 Improved cash flow predictability by 40% in 6 months",
      industry: "🚚 Logistics",
      vcabTag: "Group 1 | High Tech Comfort | Data-Driven"
    },
    {
      name: "Chen, 45",
      title: "Manufacturing Company CEO",
      businessDetails: "85 employees, $25M annual revenue",
      quote: "Premium benchmarking tools showed me exactly where we were bleeding money. ROI was immediate.",
      toolsUsed: [
        "Premium analytics dashboard",
        "Financial forecasting tools",
        "Competitor analysis"
      ],
      outcome: "💰 Optimized margins by 12%, identified $400K in annual cost savings",
      industry: "🏭 Manufacturing",
      vcabTag: "Group 2 | CFO-Level | Advanced Business Acumen"
    },
    {
      name: "Carmen, 42",
      title: "Food & Beverage Business Owner",
      businessDetails: "5 employees, $400K annual revenue → $1M+",
      quote: "Free templates gave me structure. Premium strategic planning tools helped me finally scale past $1M.",
      toolsUsed: [
        "Started with free templates",
        "Upgraded to Premium after 3 months",
        "Strategic planning frameworks"
      ],
      outcome: "🚀 Doubled revenue in 18 months with clear strategic roadmap",
      industry: "🍽️ Food & Beverage",
      vcabTag: "Transition User | Pragmatic | Results-Focused"
    }
  ];

  return (
    <>
      <SEO
        title="How BizTools Works: Free Business Resources & Premium Tools for SMBs"
        description="Discover how BizHealth.ai BizTools works: Access free business resources and premium tools for SMB health assessment, financial planning, and operational optimization. Start with free tools today."
        keywords="business tools how it works, free business resources for small business, business health assessment tools, SMB business analytics platform, business planning tools for entrepreneurs, business financial planning tools, small business operational tools"
        canonical="https://bizhealth.ai/biztools/how-it-works"
        ogType="website"
      />

      <StructuredData
        type="service"
        name="BizHealth.ai BizTools"
        description="Free and premium business tools for SMB health assessment, financial planning, and operational optimization"
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/biztools/how-it-works"
      />

      <div className="min-h-screen bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy/90 text-white pt-44 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-72 h-72 bg-biz-copper/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-biz-copper/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                How BizTools Works: Business Success, Simplified
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Free business resources and premium tools designed specifically for SMBs. 
                No consultant needed—just clear insights and actionable steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-biz-copper hover:bg-biz-copper/90 text-white"
                >
                  <Link to="/onboarding">Start Free Assessment</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white hover:text-biz-navy transition-colors"
                >
                  <Link to="/biztools">Browse Free Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                  The Challenges Every SMB Leader Faces
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  You're not alone. These are the top pain points we hear from thousand of business leaders—and why BizTools was built.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {problemCards.map((card, index) => (
                  <Card 
                    key={index}
                    className="hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-biz-copper/10 rounded-full flex items-center justify-center mb-6">
                        <card.icon className="w-8 h-8 text-biz-copper" />
                      </div>
                      <h3 className="text-2xl font-bold text-biz-navy mb-3">
                        {card.headline}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {card.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                  Your Path to Business Clarity in 4 Simple Steps
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  From free assessment to premium insights—go at your own pace, on your own terms.
                </p>
              </div>

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={index}>
                    <div className="flex gap-8 items-start">
                      {/* Step Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-biz-copper rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {step.number}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-biz-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-6 h-6 text-biz-navy" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-biz-navy mb-3">
                              {step.headline}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {step.body}
                            </p>
                          </div>
                        </div>

                        {/* Details or Free Tools */}
                        {step.details && (
                          <div className="bg-biz-copper/10 border-l-4 border-biz-copper p-6 rounded-r mb-4 ml-16">
                            <ul className="space-y-2">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-biz-navy">
                                  <span className="text-biz-copper font-bold">✓</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.freeTools && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 ml-16">
                            {step.freeTools.map((tool, idx) => (
                              <div key={idx} className="bg-muted/50 p-3 rounded text-sm text-center">
                                <div className="text-2xl mb-1">{tool.icon}</div>
                                <div className="text-biz-navy font-medium">{tool.name}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="ml-16">
                          <Button 
                            asChild 
                            variant="outline" 
                            className="border-biz-copper text-biz-copper hover:bg-biz-copper hover:text-white"
                          >
                            <Link to={step.ctaLink}>{step.ctaText} →</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-muted ml-6 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personas Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                  Who BizTools Is For: Real Users, Real Results
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  See how business owners like you are using BizTools to gain clarity, save time, and drive measurable growth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {personas.map((persona, index) => (
                  <Card key={index} className="hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-8">
                      {/* Profile */}
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-biz-copper/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <BarChart3 className="w-12 h-12 text-biz-copper" />
                        </div>
                        <h3 className="text-xl font-bold text-biz-navy mb-1">
                          {persona.name}
                        </h3>
                        <p className="text-sm font-medium text-biz-copper mb-1">
                          {persona.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {persona.businessDetails}
                        </p>
                      </div>

                      {/* Quote */}
                      <div className="border-l-4 border-biz-copper pl-4 mb-6 italic text-biz-navy">
                        "{persona.quote}"
                      </div>

                      {/* Tools Used */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-biz-navy mb-2">Tools Used:</h4>
                        <ul className="space-y-1">
                          {persona.toolsUsed.map((tool, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-biz-copper font-bold">✓</span>
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcome */}
                      <div className="bg-biz-copper/10 rounded p-4 mb-4">
                        <p className="text-sm font-bold text-biz-navy text-center">
                          {persona.outcome}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="inline-block bg-biz-navy text-white text-xs px-3 py-1 rounded-full">
                          {persona.industry}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-3 italic">
                        {persona.vcabTag}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-biz-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started? It's Free.
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join 10,000+ SMB owners who've taken control of their business health. 
                Start with our free assessment—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-biz-copper hover:bg-biz-copper/90 text-white"
                >
                  <Link to="/onboarding">Start Free Assessment Now</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/contact">Talk to Our Team</Link>
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-6">
                ⏱️ Assessment takes 30-40 minutes | 💯 100% confidential | 🔓 Instant access to free tools
              </p>
            </div>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </>
  );
};

export default BizToolsHowItWorks;

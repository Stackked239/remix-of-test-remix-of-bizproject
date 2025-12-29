import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  BarChart3, 
  Target, 
  Clock, 
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Rocket,
  CheckCircle,
  Shield,
  Mail,
  ArrowRight,
  Zap,
  BookOpen,
  Users,
  GraduationCap,
  Compass,
  Settings,
  Star,
  ChevronRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { FinancialHealthAssessment } from "@/components/financial-health/FinancialHealthAssessment";

const FinancialHealthCheck = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const scrollToAssessment = useCallback(() => {
    const element = document.getElementById('assessment');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    toast({
      title: "Check your inbox!",
      description: "Your first insight is on its way.",
    });
    setNewsletterEmail("");
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does this cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 5-minute Financial Health Check is completely free—no credit card, no commitment. The full Business Health Baseline diagnostic starts at $99 and covers 12 areas of your business."
        }
      },
      {
        "@type": "Question",
        "name": "What happens with my data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your assessment results are private and secure. We never sell your data. If you choose to share your email, you'll receive a personalized breakdown and occasional financial tips—you can unsubscribe anytime."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the full assessment take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The full Business Health Baseline typically takes 30-40 minutes and evaluates Strategy, Financials, Sales, Marketing, Operations, HR, Leadership, and 5 other critical business areas."
        }
      },
      {
        "@type": "Question",
        "name": "Can I retake the assessment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We recommend retaking every 90 days to track your progress and adjust your action plan based on what's changed in your business."
        }
      },
      {
        "@type": "Question",
        "name": "Who should take this assessment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Financial Health Check is designed for founders, owners, and C-suite leaders of small to mid-sized businesses (1-250 employees, $100K-$50M revenue). If you're responsible for business decisions, this is for you."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between this and the full assessment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Financial Health Check focuses specifically on your financial health across 5 questions. The full Business Health Baseline is a comprehensive 12-area diagnostic that also covers Strategy, Sales, Marketing, Operations, HR, Leadership, Technology, Risk, and more—giving you a complete business health picture."
        }
      }
    ]
  };

  // WebApplication Schema for SEO
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BizHealth.ai Financial Health Check",
    "description": "Free 5-minute assessment of small business financial health covering cash flow, profitability, forecasting, runway, and scaling readiness.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "BizHealth.ai",
      "url": "https://bizhealth.ai"
    }
  };

  const painPoints = [
    {
      icon: DollarSign,
      title: "Cash Flow Surprises",
      description: "You've had profitable months but still struggled to make payroll. Revenue is up, but somehow there's never enough cash."
    },
    {
      icon: Target,
      title: "Guessing at Profitability",
      description: "You know some products or services make more money than others, but you're not exactly sure which ones—or by how much."
    },
    {
      icon: TrendingUp,
      title: "Flying Without Forecasts",
      description: "You don't have a reliable way to predict next month's cash position. Every big expense feels like a gamble."
    },
    {
      icon: Rocket,
      title: "Scaling Uncertainty",
      description: "You want to grow—hire more people, expand to new markets—but you're not sure your finances can handle it."
    }
  ];

  const steps = [
    {
      number: "1",
      icon: BookOpen,
      title: "Answer 5 Smart Questions",
      description: "Quick questions about your cash flow, margins, forecasting, runway, and scaling readiness. No financial jargon required.",
      time: "~3 minutes"
    },
    {
      number: "2",
      icon: Zap,
      title: "Get Instant AI Analysis",
      description: "Our scoring engine evaluates your answers against SMB financial health benchmarks and best practices.",
      time: "Instant"
    },
    {
      number: "3",
      icon: BarChart3,
      title: "See Your Results",
      description: "Get categorized as At-Risk, Stable, or Scale-Ready with a plain-English explanation of what it means for your business.",
      time: "Immediate"
    },
    {
      number: "4",
      icon: Target,
      title: "Take Your Next Steps",
      description: "Receive 2-3 tailored action items plus the option to dive deeper with our full Business Health Baseline.",
      time: "Your choice"
    }
  ];

  const ecosystem = [
    {
      icon: BarChart3,
      title: "BizHealth Assessment",
      description: "Comprehensive 30-minute diagnostic across 12 key business areas. Know exactly where you're strong and where to focus.",
      link: "/pricing",
      linkText: "Learn More"
    },
    {
      icon: GraduationCap,
      title: "BizGrowth Academy",
      description: "Self-paced curriculum and playbooks designed for busy owners. Learn what you need, when you need it.",
      link: "/bizgrowth",
      linkText: "Explore Academy"
    },
    {
      icon: Settings,
      title: "BizTools",
      description: "Ready-to-use templates, calculators, and frameworks. Download, customize, and implement in minutes.",
      link: "/biztools/toolbox",
      linkText: "Browse Tools"
    },
    {
      icon: Compass,
      title: "BizGuides",
      description: "Expert coaching and guidance when you need a trusted advisor to help navigate tough decisions.",
      link: "/bizguides",
      linkText: "Meet Your Guide"
    }
  ];

  const testimonials = [
    {
      quote: "I thought I understood my numbers, but the Financial Health Check showed me I was missing the forest for the trees. The full assessment was a game-changer—we found $40K in hidden costs in the first month.",
      author: "Sarah M.",
      role: "Owner, Midwest Cleaning Services",
      employees: "15 employees"
    },
    {
      quote: "As a first-time business owner, I didn't even know what questions to ask about my finances. BizHealth gave me a clear baseline and a roadmap. Now I actually feel in control.",
      author: "Marcus T.",
      role: "Founder, TechServe Solutions",
      employees: "3 employees"
    },
    {
      quote: "We were growing fast but bleeding cash. The assessment pinpointed exactly why—our payment terms were killing us. One change to our invoicing added 2 weeks to our runway.",
      author: "Lisa R.",
      role: "CEO, GreenLeaf Landscaping",
      employees: "22 employees"
    }
  ];

  const faqs = [
    {
      question: "How much does this cost?",
      answer: "The 5-minute Financial Health Check is completely free—no credit card, no commitment. The full Business Health Baseline diagnostic starts at $99 and covers 12 areas of your business."
    },
    {
      question: "What happens with my data?",
      answer: "Your assessment results are private and secure. We never sell your data. If you choose to share your email, you'll receive a personalized breakdown and occasional financial tips—you can unsubscribe anytime."
    },
    {
      question: "How long does the full assessment take?",
      answer: "The full Business Health Baseline typically takes 30-40 minutes and evaluates Strategy, Financials, Sales, Marketing, Operations, HR, Leadership, and 5 other critical business areas."
    },
    {
      question: "Can I retake the assessment?",
      answer: "Yes! We recommend retaking every 90 days to track your progress and adjust your action plan based on what's changed in your business."
    },
    {
      question: "Who should take this assessment?",
      answer: "The Financial Health Check is designed for founders, owners, and C-suite leaders of small to mid-sized businesses (1-250 employees, $100K-$50M revenue). If you're responsible for business decisions, this is for you."
    },
    {
      question: "What's the difference between this and the full assessment?",
      answer: "The Financial Health Check focuses specifically on your financial health across 5 questions. The full Business Health Baseline is a comprehensive 12-area diagnostic that also covers Strategy, Sales, Marketing, Operations, HR, Leadership, Technology, Risk, and more—giving you a complete business health picture."
    }
  ];

  const blogCards = [
    {
      category: "Cash Flow",
      title: "The 13-Week Cash Flow Forecast: Your Early Warning System",
      excerpt: "Stop being surprised by cash crunches. This simple framework shows you exactly what's coming so you can plan ahead.",
      readTime: "8 min read",
      link: "/blog/smb-cash-flow-hacks-2025"
    },
    {
      category: "Profitability",
      title: "Profit Per Sale: The Number Every Business Owner Should Know",
      excerpt: "Revenue is vanity, profit is sanity. Here's how to calculate what you actually keep from each sale.",
      readTime: "6 min read",
      link: "/blog/small-business-financials-know-your-numbers"
    },
    {
      category: "Forecasting",
      title: "Rolling 6-Month Forecasting: A Guide for Busy Owners",
      excerpt: "You don't need an MBA to predict your cash position. Here's a simple forecasting system that actually works.",
      readTime: "7 min read",
      link: "/blog/2025-smb-financial-trends"
    },
    {
      category: "Cash Squeeze",
      title: "The Emergency Brake: What to Do When Cash Gets Tight",
      excerpt: "When cash flow turns critical, you need a plan—not panic. Here's a step-by-step playbook for the squeeze.",
      readTime: "10 min read",
      link: "/blog/cash-flow-crisis-management"
    }
  ];

  return (
    <>
      <SEO 
        title="Free Financial Health Check for Small Businesses"
        description="Get a clear snapshot of your business financial health in 5 minutes. Free assessment for cash flow, profitability, and scaling readiness. No spreadsheets required."
        keywords="small business financial health, cash flow assessment, SMB growth assessment, business health check, profitability calculator, financial forecasting, business runway"
        canonical="https://bizhealth.ai/biztools/financials/health-check"
        ogType="website"
        ogImage="https://bizhealth.ai/og-financial-health-check.jpg"
      />
      
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      <PromotionalBanner />
      <GlobalNavigation />
      
      <main className="min-h-screen pt-24">
        {/* SECTION 1: Hero Section */}
        <section className="relative bg-gradient-to-b from-background via-background to-biz-blue-faint min-h-[90vh] flex items-center">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-biz-citrine/10 border border-biz-citrine/30 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-biz-citrine" />
                  <span className="font-montserrat font-semibold text-sm text-biz-citrine">FREE 5-MINUTE ASSESSMENT</span>
                </div>
                
                <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                  Is Your Cash Flow Working For You—
                  <span className="text-biz-green">Or Against You?</span>
                </h1>
                
                <p className="font-open-sans text-lg md:text-xl text-muted-foreground max-w-xl">
                  70% of small businesses struggle with cash flow, but most don't know where the problem actually is. Get a clear snapshot of your financial health in under 5 minutes—no spreadsheets, no accountant required.
                </p>

                {/* Value Props */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-biz-citrine/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-biz-citrine" />
                    </div>
                    <div>
                      <p className="font-montserrat font-semibold text-sm text-foreground">Instant Results</p>
                      <p className="font-open-sans text-xs text-muted-foreground">See your score immediately</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-biz-green/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-biz-green" />
                    </div>
                    <div>
                      <p className="font-montserrat font-semibold text-sm text-foreground">Actionable Insights</p>
                      <p className="font-open-sans text-xs text-muted-foreground">Know what to fix first</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-biz-navy/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-biz-navy" />
                    </div>
                    <div>
                      <p className="font-montserrat font-semibold text-sm text-foreground">5 Minutes</p>
                      <p className="font-open-sans text-xs text-muted-foreground">Built for busy owners</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <Button 
                    onClick={scrollToAssessment}
                    className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-montserrat font-bold text-lg px-8 py-6 h-auto shadow-hub-citrine"
                  >
                    Check My Business Financial Health
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-open-sans text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-biz-green" />
                      No credit card required
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-biz-green" />
                      Results in 5 minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-biz-green" />
                      15,000+ businesses assessed
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative hidden lg:block">
                <div className="relative">
                  {/* Assessment Preview Card */}
                  <Card className="bg-card shadow-elegant border-border/50 animate-fade-in-up">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {/* Progress Bar Preview */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-montserrat font-semibold text-foreground">Question 2 of 5</span>
                            <span className="text-muted-foreground">40%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full w-2/5 bg-biz-citrine rounded-full" />
                          </div>
                        </div>
                        
                        {/* Sample Question */}
                        <div className="space-y-4">
                          <h3 className="font-montserrat font-semibold text-lg text-foreground">
                            How confident are you that you know your actual profit margins?
                          </h3>
                          <div className="space-y-2">
                            {["I don't track margins", "Rough idea, no real numbers", "Know overall, not by product", "Track regularly", "Detailed data, optimize continuously"].map((option, i) => (
                              <div 
                                key={i} 
                                className={`p-3 rounded-lg border transition-all cursor-pointer ${i === 2 ? 'border-biz-citrine bg-biz-citrine/5' : 'border-border hover:border-biz-citrine/50'}`}
                              >
                                <span className="font-open-sans text-sm text-foreground">{option}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Floating Score Badge */}
                  <div className="absolute -top-4 -right-4 bg-biz-green text-white px-6 py-3 rounded-full shadow-feature animate-bounce-subtle">
                    <span className="font-montserrat font-bold text-lg">Score: 78/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pain Points */}
        <section className="py-16 lg:py-24 bg-biz-warm/80">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                Does This Sound Familiar?
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {painPoints.map((point, index) => (
                <Card key={index} className="bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-biz-citrine/50 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-biz-citrine/10 group-hover:bg-biz-citrine/20 group-hover:scale-110 flex items-center justify-center mb-4 transition-all duration-300">
                      <point.icon className="w-6 h-6 text-biz-citrine group-hover:text-biz-navy transition-colors duration-300" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2 group-hover:text-biz-navy transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="font-open-sans text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center font-open-sans text-lg text-muted-foreground mt-12 max-w-3xl mx-auto">
              If you checked any of these boxes, you're not alone. These are the exact blind spots the Financial Health Check was built to uncover.
            </p>
          </div>
        </section>

        {/* SECTION 3: How It Works */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                How the Financial Health Check Works
              </h2>
              <p className="font-open-sans text-lg text-muted-foreground">
                From start to actionable insights in under 5 minutes
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 border-t-2 border-dashed border-biz-green/30" />
                    )}
                    
                    <div className="relative flex flex-col items-center text-center">
                      {/* Step Number Circle */}
                      <div className="w-16 h-16 rounded-full bg-biz-citrine flex items-center justify-center mb-4 z-10 shadow-hub-citrine">
                        <span className="font-montserrat font-bold text-2xl text-biz-navy">{step.number}</span>
                      </div>
                      
                      <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="font-open-sans text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <span className="font-open-sans text-xs text-biz-grey bg-secondary px-3 py-1 rounded-full">
                        {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="font-montserrat font-semibold text-lg text-foreground mb-4">
                Ready to find out where you stand?
              </p>
              <Button 
                onClick={scrollToAssessment}
                className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-montserrat font-semibold shadow-hub-citrine"
              >
                Start the FREE Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Assessment */}
        <section id="assessment" className="py-16 lg:py-24 bg-gradient-to-b from-biz-blue-faint/60 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                Your Free Financial Health Check
              </h2>
              <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                Answer 5 quick questions about your business finances. Takes about 5 minutes, delivers instant insights.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <FinancialHealthAssessment />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-open-sans text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-biz-green" />
                Your answers are private and never shared
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-biz-citrine" />
                Instant results—no waiting
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-biz-navy" />
                Optional: Get a deeper breakdown via email
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 5: Why Financial Health Matters */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground">
                  Why Most SMBs Struggle With Finances (And How to Fix It)
                </h2>
                
                {/* Statistic Callout */}
                <div className="border-l-4 border-biz-citrine pl-6 py-2">
                  <p className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
                    70% of small businesses experience cash flow problems—and 82% fail because of it.
                  </p>
                  <p className="font-open-sans text-sm text-muted-foreground">— U.S. Bank Study</p>
                </div>

                <p className="font-open-sans text-muted-foreground">
                  Here's the thing most business owners don't realize: profitability and cash flow are not the same thing. You can have a "profitable" business on paper and still not be able to make payroll. You can be growing revenue while bleeding cash.
                </p>

                <p className="font-open-sans text-muted-foreground">
                  The businesses that thrive aren't necessarily the ones with the most revenue. They're the ones with:
                </p>

                <ul className="space-y-3">
                  {[
                    "Clear visibility into where money comes from and where it goes",
                    "Predictable cash flow, not constant surprises",
                    "Real profit margins they actually track (not just hope exist)",
                    "Enough runway to weather slow periods and fund growth",
                    "Financial systems that can scale with the business"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" />
                      <span className="font-open-sans text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="font-open-sans text-muted-foreground">
                  The Financial Health Check gives you a quick pulse on these five critical areas. The full Business Health Assessment goes deeper—evaluating Strategy, Operations, Sales, Marketing, HR, Leadership, and more across 12 dimensions.
                </p>

                <Button asChild variant="outline" className="border-biz-navy text-biz-navy hover:bg-biz-navy hover:text-white font-montserrat font-semibold">
                  <Link to="/pricing">
                    Explore the Full Business Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Visual */}
              <div className="relative">
                <Card className="bg-biz-navy text-white shadow-elegant overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-biz-citrine flex items-center justify-center mx-auto">
                        <TrendingUp className="w-10 h-10 text-biz-navy" />
                      </div>
                      <div>
                        <p className="font-montserrat font-bold text-4xl text-biz-citrine">$40K</p>
                        <p className="font-open-sans text-white/80">Average hidden costs uncovered</p>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <p className="font-montserrat font-bold text-4xl text-biz-green">15,000+</p>
                        <p className="font-open-sans text-white/80">Businesses assessed</p>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <p className="font-montserrat font-bold text-4xl text-white">5 min</p>
                        <p className="font-open-sans text-white/80">Time to complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Featured Blog Articles */}
        <section className="py-16 lg:py-24 bg-biz-warm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                Financial Insights for Growing Businesses
              </h2>
              <p className="font-open-sans text-lg text-muted-foreground">
                Practical guides from our team of business health experts—each addressing a key area from the assessment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {blogCards.map((card, index) => (
                <Card key={index} className="bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 group overflow-hidden">
                  <CardContent className="p-6">
                    <span className="inline-block bg-biz-citrine text-biz-navy font-montserrat font-semibold text-xs px-3 py-1 rounded-full mb-4">
                      {card.category}
                    </span>
                    <h3 className="font-montserrat font-semibold text-foreground mb-3 group-hover:text-biz-navy transition-colors line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="font-open-sans text-sm text-muted-foreground mb-4 line-clamp-3">
                      {card.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-open-sans text-xs text-biz-grey">{card.readTime}</span>
                      <Link to={card.link} className="font-montserrat font-semibold text-sm text-biz-navy hover:text-biz-green flex items-center gap-1 transition-colors">
                        Read Article
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/blog" className="font-montserrat font-semibold text-biz-navy hover:text-biz-green flex items-center gap-2 justify-center transition-colors">
                View All Financial Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 7: Ecosystem Overview */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                Your Complete Business Health Partner
              </h2>
              <p className="font-open-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                BizHealth.ai isn't just another assessment tool. It's a complete ecosystem designed to help small and mid-size businesses stop guessing and start growing with confidence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {ecosystem.map((item, index) => (
                <Card key={index} className="bg-card shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-biz-navy hover:border-biz-citrine group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-biz-navy/10 flex items-center justify-center mb-4 group-hover:bg-biz-citrine/10 transition-colors">
                      <item.icon className="w-6 h-6 text-biz-navy group-hover:text-biz-citrine transition-colors" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-open-sans text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Link to={item.link} className="font-montserrat font-semibold text-sm text-biz-navy hover:text-biz-citrine flex items-center gap-1 transition-colors">
                      {item.linkText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center font-open-sans text-lg text-foreground mt-12">
              <span className="font-montserrat font-bold text-biz-navy">Over 15,000 businesses</span> have used BizHealth.ai to uncover hidden gaps, confirm their strengths, and build a clear path to growth.
            </p>
          </div>
        </section>

        {/* SECTION 8: Testimonials */}
        <section className="py-16 lg:py-24 bg-biz-navy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
                What Business Owners Are Saying
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    {/* Quote Mark */}
                    <div className="text-biz-citrine text-5xl font-serif mb-4">"</div>
                    
                    <p className="font-open-sans text-white/90 mb-6 italic">
                      {testimonial.quote}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-biz-citrine text-biz-citrine" />
                      ))}
                    </div>
                    
                    <div>
                      <p className="font-montserrat font-semibold text-white">
                        {testimonial.author}
                      </p>
                      <p className="font-open-sans text-sm text-white/70">
                        {testimonial.role} ({testimonial.employees})
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                Common Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6 shadow-sm"
                  >
                    <AccordionTrigger className="font-montserrat font-semibold text-foreground hover:text-biz-navy hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-open-sans text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* SECTION 10: Newsletter Signup */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-biz-navy to-biz-navy-deep">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
                Get Weekly Financial Insights
              </h2>
              <p className="font-open-sans text-lg text-white/80 mb-8">
                Join thousands of SMB leaders getting actionable tips on cash flow, profitability, and scaling your business.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white border-white text-foreground placeholder:text-muted-foreground flex-1"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-montserrat font-semibold"
                >
                  Subscribe
                </Button>
              </form>

              <p className="font-open-sans text-sm text-white/60 mt-4">
                No spam. Just practical insights. Unsubscribe anytime.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-open-sans text-white/70">
                <span>• Weekly tips on cash flow and margins</span>
                <span>• Templates and tools for busy owners</span>
                <span>• Early access to new BizHealth resources</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: Final CTA */}
        <section className="py-16 lg:py-24 bg-biz-citrine">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-4">
              Ready to Stop Guessing About Your Financial Health?
            </h2>
            <p className="font-open-sans text-lg text-biz-navy/80 mb-8 max-w-2xl mx-auto">
              Join 15,000+ business owners who've used BizHealth.ai to gain clarity, confidence, and a clear path forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToAssessment}
                className="bg-biz-navy hover:bg-biz-navy/90 text-white font-montserrat font-bold text-lg px-8 py-6 h-auto"
              >
                Start Your Free Financial Check (5 min)
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-biz-navy text-biz-navy hover:bg-biz-navy hover:text-white font-montserrat font-semibold text-lg px-8 py-6 h-auto"
              >
                <Link to="/pricing">
                  Get the Full Business Health Assessment (30 min)
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm font-open-sans text-biz-navy/70">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-biz-navy" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-biz-navy" />
                Instant results
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-biz-navy" />
                Your data stays private
              </span>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  );
};

export default FinancialHealthCheck;

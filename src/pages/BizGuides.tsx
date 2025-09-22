import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Compass, Users, TrendingUp, Shield, CheckCircle, BookOpen, Handshake } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Helmet } from "react-helmet-async";

const BizGuides = () => {
  const features = [
    {
      icon: Compass,
      title: "Strategic Navigation",
      description: "Expert guidance through complex business challenges with AI-powered insights from your health report."
    },
    {
      icon: Users,
      title: "1-on-1 Coaching", 
      description: "Personalized coaching sessions tailored to your specific business gaps and growth opportunities."
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Proven strategies that deliver 20-25x ROI through targeted improvements in critical business areas."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Identify and address potential pitfalls before they impact your business performance."
    }
  ];

  const benefits = [
    "Personalized coaching based on your BizHealth assessment",
    "Expert guidance from seasoned business professionals", 
    "Actionable strategies with measurable outcomes",
    "Ongoing support throughout your growth journey",
    "Access to exclusive business frameworks and tools",
    "Priority booking for consultation sessions"
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SMB coaching in 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SMB coaching in 2025 combines AI-powered business health analysis with expert human guidance to help small and medium businesses resolve scaling challenges, improve cash flow, and achieve sustainable growth through personalized strategies."
        }
      },
      {
        "@type": "Question", 
        "name": "How does BizGuides help with cash flow issues?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BizGuides provides targeted coaching for cash squeeze resolution with a 70% success rate, using AI insights from your business health assessment to identify bottlenecks and implement proven cash flow improvement strategies."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>BizGuides - Expert SMB Coaching & Business Growth Strategies | BizHealth.ai</title>
        <meta name="description" content="Transform your SMB with expert coaching. Resolve scaling uncertainties, improve cash flow with 70% success rate, and achieve 20-25x ROI through AI-powered business guidance." />
        <meta name="keywords" content="SMB coaching 2025, business growth strategies, cash flow coaching, scaling SMB, business consultant" />
        <link rel="canonical" href="https://bizhealth.ai/bizguides" />
        <link rel="alternate" hrefLang="en-US" href="https://bizhealth.ai/bizguides" />
        <link rel="alternate" hrefLang="en-GB" href="https://bizhealth.ai/en-gb/bizguides" />
        <link rel="alternate" hrefLang="en-AU" href="https://bizhealth.ai/en-au/bizguides" />
        <link rel="alternate" hrefLang="de-DE" href="https://bizhealth.ai/de/bizguides" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-biz-white">
        <PromotionalBanner />
        <GlobalNavigation />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-biz-navy via-biz-navy/90 to-biz-white">
          <div className="absolute inset-0 bg-gradient-to-r from-biz-navy/95 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-left">
                <div className="mb-8 flex justify-start lg:hidden">
                  <div className="bg-biz-teal/10 rounded-2xl p-6 transition-transform duration-300 hover:scale-110">
                    <Handshake className="w-16 h-16 sm:w-20 sm:h-20 text-biz-teal stroke-2" 
                             style={{ filter: 'drop-shadow(0 0 8px rgba(74, 144, 226, 0.3))' }} />
                  </div>
                </div>
                
                <h1 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 text-biz-navy leading-tight">
                  Guided Strategies to <br className="hidden sm:block" />
                  <span className="text-biz-teal">Power Your Business</span>
                </h1>
                
                <p className="font-open-sans text-lg sm:text-xl mb-6 text-biz-grey leading-relaxed max-w-2xl">
                  Resolve Scaling Uncertainties with Expert Consulting & Coaching
                </p>
                
                <div className="mb-8 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-biz-teal rounded-full"></div>
                    <span className="font-open-sans text-biz-grey">
                      <span className="text-biz-teal font-semibold">70% Cash Squeeze Resolution</span> success rate
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-biz-teal rounded-full"></div>
                    <span className="font-open-sans text-biz-grey">
                      AI-powered insights from comprehensive business health assessment
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4" data-testid="hero-cta-container">
                  <Button 
                    size="lg"
                    className="bg-biz-teal text-biz-white hover:bg-biz-teal/90 font-montserrat font-semibold text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    data-testid="book-consult-cta"
                    onClick={() => window.location.href = '/bizguides/booking'}
                  >
                    Book A Consult
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="bg-biz-navy border-biz-teal text-biz-white hover:bg-biz-teal hover:text-white font-open-sans font-semibold text-lg px-8 py-4"
                  >
                    View Services
                  </Button>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative hidden lg:block">
                <div className="flex justify-center">
                  <div className="bg-biz-teal/10 rounded-3xl p-12 transition-transform duration-300 hover:scale-105">
                    <Handshake className="w-48 h-48 text-biz-teal stroke-2" 
                             style={{ filter: 'drop-shadow(0 0 16px rgba(74, 144, 226, 0.4))' }} 
                             aria-label="SMB CEO receiving guided coaching insights" />
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-biz-teal/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-biz-navy/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
          
          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-biz-grey/30 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 bg-biz-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-biz-navy leading-tight">
                Expert Guidance, <span className="text-biz-teal">Proven Results</span>
              </h2>
              <p className="font-open-sans text-lg sm:text-xl text-biz-grey max-w-2xl mx-auto leading-relaxed">
                Transform your business health insights into actionable strategies with dedicated coaching support
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-biz-white border-biz-grey/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="bg-biz-teal/10 rounded-xl p-4 w-fit mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-biz-teal" />
                    </div>
                    <CardTitle className="text-xl font-montserrat font-bold text-biz-navy">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription 
                      className="font-open-sans leading-relaxed text-biz-grey"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Section Divider */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-biz-grey/30 to-transparent"></div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-biz-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-montserrat font-bold text-3xl sm:text-4xl mb-6 text-biz-navy leading-tight">
                  Why Choose <span className="text-biz-teal">BizGuides?</span>
                </h3>
                <p className="font-open-sans text-lg text-biz-grey mb-8 leading-relaxed">
                  Our coaching approach is built on the foundation of your comprehensive business health assessment, ensuring every strategy is tailored to your unique challenges and opportunities.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-biz-teal flex-shrink-0 mt-0.5" />
                      <span className="font-open-sans text-biz-grey leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-biz-teal rounded-2xl p-8 text-white shadow-xl">
                <BookOpen className="w-12 h-12 mb-6 text-biz-white" />
                <h4 className="font-montserrat font-bold text-2xl sm:text-3xl mb-4 text-biz-white leading-tight">
                  Ready to Transform Your Business?
                </h4>
                <p className="font-open-sans text-lg mb-6 text-biz-white/90 leading-relaxed">
                  Schedule your personalized coaching session and start implementing strategies that deliver measurable results.
                </p>
                <Button 
                  className="bg-biz-white text-biz-teal hover:bg-biz-white/90 font-montserrat font-semibold w-full transition-all duration-300 hover:scale-105"
                  size="lg"
                  data-testid="get-started-cta"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
          
          {/* Section Divider */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-biz-grey/30 to-transparent"></div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-biz-teal text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h3 className="font-montserrat font-bold text-3xl sm:text-4xl mb-4 text-biz-white leading-tight">
              Stop Guessing, <span className="text-biz-navy">Start Growing</span>
            </h3>
            <p className="font-open-sans text-lg sm:text-xl mb-8 text-biz-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of SMBs who have transformed their business with expert guidance
            </p>
            <Button 
              size="lg"
              className="bg-biz-white text-biz-teal hover:bg-biz-white/90 font-montserrat font-semibold text-lg px-8 py-4 transition-all duration-300 hover:scale-105"
              data-testid="schedule-consultation-cta"
            >
              Schedule Your Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        <GlobalFooter />
        <EmailCapturePopup hubColor="biz-guides" />
      </div>
    </>
  );
};

export default BizGuides;
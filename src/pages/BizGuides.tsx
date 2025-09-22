import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Compass, Users, TrendingUp, Shield, CheckCircle, BookOpen, Handshake, BarChart3, Target, HelpCircle } from "lucide-react";
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
      description: "Expert guidance through complex business challenges with AI-powered insights from your health report.",
      highlight: "70% Cash Squeeze Resolution"
    },
    {
      icon: Users,
      title: "1-on-1 Coaching", 
      description: "Personalized coaching sessions tailored to your specific business gaps and growth opportunities.",
      highlight: "Personalized Approach"
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Proven strategies that deliver 20-25x ROI through targeted improvements in critical business areas.",
      highlight: "20-25x ROI"
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Identify and address potential pitfalls before they impact your business performance.",
      highlight: "Risk Prevention"
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

  const faqs = [
    {
      question: "What is SMB coaching in 2025?",
      answer: "SMB coaching in 2025 combines AI-powered business analytics with expert human guidance to help small and medium businesses navigate scaling challenges, optimize cash flow, and achieve sustainable growth through data-driven strategies."
    },
    {
      question: "How does BizGuides help resolve scaling uncertainties?",
      answer: "BizGuides provides personalized consulting based on your comprehensive business health assessment, offering targeted strategies for operational efficiency, financial management, and growth acceleration with proven 20-25x ROI results."
    },
    {
      question: "What makes BizGuides different from other business coaching?",
      answer: "BizGuides integrates AI-powered business health analysis with expert coaching, providing data-driven insights and personalized strategies specifically designed for SMBs facing modern scaling challenges in 2025."
    }
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-biz-white">
      <Helmet>
        <title>BizGuides - Guided Business Coaching & SMB Consulting 2025 | BizHealth.ai</title>
        <meta name="description" content="Transform your SMB with expert coaching. AI-powered business health insights meet personalized guidance. Book your consultation today for 20-25x ROI." />
        <meta name="keywords" content="SMB coaching 2025, business consulting, scaling uncertainties, cash flow management, business health assessment" />
        <link rel="canonical" href="https://bizhealth.ai/bizguides" />
        <link rel="alternate" hrefLang="en-us" href="https://bizhealth.ai/bizguides" />
        <link rel="alternate" hrefLang="en-gb" href="https://bizhealth.ai/en-gb/bizguides" />
        <link rel="alternate" hrefLang="en-au" href="https://bizhealth.ai/en-au/bizguides" />
        <link rel="alternate" hrefLang="de-de" href="https://bizhealth.ai/de-de/bizguides" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-biz-navy to-biz-white" 
               style={{ lineHeight: '1.6' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left lg:pr-8">
              <div className="flex items-center mb-8">
                <div className="group hover:scale-110 transition-transform duration-300 ease-out">
                  <div className="bg-biz-teal rounded-2xl p-6 border-4 border-biz-navy shadow-lg">
                    <div className="relative">
                      <Handshake className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-biz-white" 
                                strokeWidth={1.5} />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-biz-navy rounded-full flex items-center justify-center">
                        <BarChart3 className="w-3 h-3 text-biz-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="font-montserrat font-bold text-biz-navy text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight"
                  style={{ lineHeight: '1.2' }}>
                Guided Strategies to Power Your Business
              </h1>
              
              <p className="font-open-sans text-biz-grey text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed"
                 style={{ lineHeight: '1.7' }}>
                Resolve Scaling Uncertainties with Expert Consulting & Coaching
              </p>
              
              <div className="mb-8">
                <Button 
                  size="lg"
                  className="bg-biz-teal text-biz-white hover:bg-biz-teal/90 hover:scale-105 font-montserrat font-semibold text-lg px-8 py-4 transition-all duration-300 shadow-lg"
                  data-testid="book-consult-cta"
                  onClick={() => window.location.href = '/bizguides/booking'}
                >
                  Book A Consult
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Right Column - Illustration */}
            <div className="relative lg:pl-8 hidden lg:block">
              <div className="bg-biz-white rounded-3xl shadow-2xl p-8 border border-biz-grey/20">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-biz-teal/10 rounded-full p-4">
                    <Target className="w-16 h-16 text-biz-teal" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-montserrat font-bold text-biz-navy text-xl mb-3">
                    SMB CEO Coaching Session
                  </h3>
                  <p className="font-open-sans text-biz-grey text-sm leading-relaxed">
                    Personalized guidance for scaling challenges and growth optimization
                  </p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-biz-teal rounded-full"></div>
                    <div className="w-3 h-3 bg-biz-navy rounded-full"></div>
                    <div className="w-3 h-3 bg-biz-grey rounded-full"></div>
                  </div>
                </div>
              </div>
              <img src="/api/placeholder/400/300" 
                   alt="SMB CEO receiving guided coaching insights" 
                   className="hidden" 
                   loading="lazy" />
            </div>
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="border-b border-biz-grey/20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-biz-white" style={{ lineHeight: '1.7' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-biz-navy leading-tight">
              Expert Guidance, Proven Results
            </h2>
            <p className="font-open-sans text-lg md:text-xl text-biz-grey max-w-2xl mx-auto leading-relaxed">
              Transform your business health insights into actionable strategies with dedicated coaching support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-biz-white text-center border-biz-grey/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="bg-biz-teal/10 rounded-xl p-4 w-fit mx-auto mb-4 hover:bg-biz-teal/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-biz-teal" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl font-montserrat font-bold text-biz-navy">
                    {feature.title}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="inline-block bg-biz-teal text-biz-white text-xs font-semibold px-3 py-1 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans text-biz-grey leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="border-b border-biz-grey/20 mt-12"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-biz-white" style={{ lineHeight: '1.7' }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl mb-6 text-biz-navy leading-tight">
                Why Choose BizGuides?
              </h3>
              <p className="font-open-sans text-lg text-biz-grey mb-8 leading-relaxed">
                Our coaching approach is built on the foundation of your comprehensive business health assessment, ensuring every strategy is tailored to your unique challenges and opportunities.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-biz-teal flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="font-open-sans text-biz-grey leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-biz-teal rounded-2xl p-8 text-biz-white shadow-xl">
              <BookOpen className="w-12 h-12 mb-6 text-biz-white" strokeWidth={1.5} />
              <h4 className="font-montserrat font-bold text-xl md:text-2xl mb-4 text-biz-white leading-tight">
                Ready to Transform Your Business?
              </h4>
              <p className="font-open-sans text-base md:text-lg mb-6 text-biz-white/90 leading-relaxed">
                Schedule your personalized coaching session and start implementing strategies that deliver measurable results.
              </p>
              <Button 
                className="bg-biz-white text-biz-teal hover:bg-biz-white/90 hover:scale-105 font-montserrat font-semibold w-full transition-all duration-300"
                size="lg"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="border-b border-biz-grey/20 mt-12"></div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-biz-white" style={{ lineHeight: '1.7' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl mb-6 text-biz-navy leading-tight">
              Frequently Asked Questions
            </h3>
            <p className="font-open-sans text-lg text-biz-grey max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about SMB coaching and BizGuides services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-biz-white border-biz-grey/20 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-6 h-6 text-biz-teal flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <CardTitle className="font-montserrat font-bold text-lg text-biz-navy leading-tight">
                      {faq.question}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-open-sans text-biz-grey leading-relaxed pl-9">
                    {faq.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="border-b border-biz-grey/20 mt-12"></div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-biz-teal text-biz-white" style={{ lineHeight: '1.7' }}>
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-biz-white leading-tight">
            Stop Guessing, Start Growing
          </h3>
          <p className="font-open-sans text-lg md:text-xl mb-8 text-biz-white/90 leading-relaxed">
            Join thousands of SMBs who have transformed their business with expert guidance
          </p>
          <Button 
            size="lg"
            className="bg-biz-white text-biz-teal hover:bg-biz-white/90 hover:scale-105 font-montserrat font-semibold text-lg px-8 py-4 transition-all duration-300 shadow-lg"
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
  );
};

export default BizGuides;
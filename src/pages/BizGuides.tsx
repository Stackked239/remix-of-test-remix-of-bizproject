import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Compass, Users, TrendingUp, Shield, CheckCircle, BookOpen, Handshake, FileText } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import PromotionalBanner from "@/components/PromotionalBanner";
import blueprintHandshakeIcon from "@/assets/blueprint-handshake-icon.png";
import ceoConsultingSession from "@/assets/ceo-consulting-session.jpg";

const BizGuides = () => {
  // FAQ data for JSON-LD schema
  const faqData = [
    {
      question: "What is SMB coaching in 2025?",
      answer: "SMB coaching in 2025 combines AI-powered business health insights with personalized expert guidance to help small and medium businesses overcome scaling challenges, optimize operations, and achieve sustainable growth through data-driven strategies."
    },
    {
      question: "How does BizGuides differ from traditional business consulting?",
      answer: "BizGuides integrates comprehensive business health assessments with ongoing coaching support, providing personalized strategies based on your specific gaps and opportunities rather than generic consulting approaches."
    },
    {
      question: "What results can I expect from BizGuides coaching?",
      answer: "Our clients typically see 20-25x ROI through targeted improvements in critical business areas, with 70% achieving resolution of cash flow challenges within the first quarter of coaching."
    },
    {
      question: "How quickly can I start seeing results?",
      answer: "Most clients begin implementing actionable strategies immediately after their first session, with measurable improvements visible within 30-60 days of consistent coaching engagement."
    }
  ];

  const features = [
    {
      icon: Compass,
      title: "Strategic Navigation",
      description: "Expert guidance through complex business challenges with AI-powered insights from your health report.",
      highlight: "Navigate with confidence through proven methodologies"
    },
    {
      icon: Users,
      title: "1-on-1 Coaching",
      description: "Personalized coaching sessions tailored to your specific business gaps and growth opportunities.",
      highlight: "Achieve 70% cash squeeze resolution through personalized strategies"
    },
    {
      icon: TrendingUp,
      title: "Growth Acceleration",
      description: "Proven strategies that deliver 20-25x ROI through targeted improvements in critical business areas.",
      highlight: "20-25x ROI through targeted business improvements"
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Identify and address potential pitfalls before they impact your business performance.",
      highlight: "Proactive risk management for sustainable growth"
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

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        <Helmet>
          {/* Primary meta tags */}
          <title>BizGuides - SMB Coaching & Business Strategy Consulting | BizHealth.ai</title>
          <meta name="description" content="Transform your SMB with expert coaching and AI-powered business insights. Achieve 20-25x ROI through personalized strategies. Book your consultation today." />
          <meta name="keywords" content="SMB coaching 2025, business strategy consulting, AI-powered business insights, small business coaching, business health assessment" />
          
          {/* Hreflang attributes */}
          <link rel="alternate" hrefLang="en-US" href="https://bizhealth.ai/bizguides" />
          <link rel="alternate" hrefLang="en-GB" href="https://bizhealth.ai/en-gb/bizguides" />
          <link rel="alternate" hrefLang="en-AU" href="https://bizhealth.ai/en-au/bizguides" />
          <link rel="alternate" hrefLang="de-DE" href="https://bizhealth.ai/de/bizguides" />
          <link rel="canonical" href="https://bizhealth.ai/bizguides" />
          
          {/* Open Graph */}
          <meta property="og:title" content="BizGuides - SMB Coaching & Business Strategy Consulting" />
          <meta property="og:description" content="Transform your SMB with expert coaching and AI-powered business insights. Achieve 20-25x ROI through personalized strategies." />
          <meta property="og:image" content={ceoConsultingSession} />
          <meta property="og:url" content="https://bizhealth.ai/bizguides" />
          <meta property="og:type" content="website" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="BizGuides - SMB Coaching & Business Strategy Consulting" />
          <meta name="twitter:description" content="Transform your SMB with expert coaching and AI-powered business insights. Achieve 20-25x ROI." />
          <meta name="twitter:image" content={ceoConsultingSession} />
          
          {/* JSON-LD structured data */}
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        </Helmet>

        <PromotionalBanner />
        <GlobalNavigation />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--biz-navy))] to-[hsl(var(--biz-white))] text-[hsl(var(--biz-navy))]">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--biz-teal))]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--biz-navy))]/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left space-y-6 lg:space-y-8">
                {/* Hero Icon */}
                <div className="flex justify-center lg:justify-start mb-8">
                  <div className="relative group">
                    <img 
                      src={blueprintHandshakeIcon} 
                      alt="Blueprint handshake icon representing guided business strategy"
                      className="w-48 h-48 lg:w-64 lg:h-64 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_hsl(var(--biz-teal)/0.3)]"
                      loading="eager"
                    />
                  </div>
                </div>
                
                {/* Headlines */}
                <div className="space-y-4">
                  <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[hsl(var(--biz-navy))]">
                    Guided Strategies to Power Your Business
                  </h1>
                  <p className="font-open-sans text-lg sm:text-xl lg:text-2xl leading-[1.6] text-[hsl(var(--biz-grey))] max-w-2xl mx-auto lg:mx-0">
                    Resolve Scaling Uncertainties with Expert Consulting & Coaching
                  </p>
                </div>
                
                {/* Key Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-[hsl(var(--biz-teal))]">70%</div>
                    <div className="text-sm text-[hsl(var(--biz-grey))] leading-[1.5]">Cash Squeeze Resolution</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-[hsl(var(--biz-teal))]">20-25x</div>
                    <div className="text-sm text-[hsl(var(--biz-grey))] leading-[1.5]">Average ROI Delivered</div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link to="/bizguides/booking" data-testid="primary-cta">
                    <Button 
                      size="lg"
                      className="bg-[hsl(var(--biz-teal))] text-white hover:bg-[hsl(var(--biz-teal))]/90 hover:scale-105 font-montserrat font-semibold text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_hsl(var(--biz-teal)/0.3)]"
                    >
                      Book A Consult
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-[hsl(var(--biz-navy))] text-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-navy))] hover:text-white font-open-sans font-semibold text-lg px-8 py-4 transition-all duration-300"
                  >
                    View Services
                  </Button>
                </div>
              </div>
              
              {/* Right Column - Illustration */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img 
                    src={ceoConsultingSession} 
                    alt="SMB CEO receiving guided coaching insights"
                    className="w-full max-w-lg h-auto rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                  {/* Overlay accent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--biz-navy))]/10 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-[hsl(var(--biz-grey))]/20"></div>

        {/* Features Section */}
        <section className="py-16 lg:py-20 bg-[hsl(var(--biz-white))]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-[hsl(var(--biz-navy))] leading-[1.2]">
                Expert Guidance, Proven Results
              </h2>
              <p className="font-open-sans text-lg lg:text-xl text-[hsl(var(--biz-grey))] max-w-2xl mx-auto leading-[1.6]">
                Transform your business health insights into actionable strategies with dedicated coaching support
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-[hsl(var(--biz-grey))]/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardHeader className="pb-4">
                    <div className="bg-[hsl(var(--biz-teal))]/10 rounded-xl p-4 w-fit mx-auto mb-4 group-hover:bg-[hsl(var(--biz-teal))]/20 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-[hsl(var(--biz-teal))]" />
                    </div>
                    <CardTitle className="text-xl font-montserrat text-[hsl(var(--biz-navy))] leading-[1.3]">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-open-sans text-[hsl(var(--biz-grey))] leading-[1.6] mb-3">
                      {feature.description}
                    </CardDescription>
                    <div className="text-sm font-semibold text-[hsl(var(--biz-teal))] leading-[1.5]">
                      {feature.highlight}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-[hsl(var(--biz-grey))]/20"></div>

        {/* Benefits Section */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-montserrat font-bold text-3xl lg:text-4xl mb-6 text-[hsl(var(--biz-navy))] leading-[1.2]">
                  Why Choose BizGuides?
                </h3>
                <p className="font-open-sans text-lg text-[hsl(var(--biz-grey))] mb-8 leading-[1.6]">
                  Our coaching approach is built on the foundation of your comprehensive business health assessment, ensuring every strategy is tailored to your unique challenges and opportunities.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                      <span className="font-open-sans text-[hsl(var(--biz-navy))] leading-[1.6]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[hsl(var(--biz-teal))] rounded-2xl p-8 text-white shadow-xl">
                <BookOpen className="w-12 h-12 mb-6" />
                <h4 className="font-montserrat font-bold text-2xl lg:text-3xl mb-4 leading-[1.2]">
                  Ready to Transform Your Business?
                </h4>
                <p className="font-open-sans mb-6 opacity-90 leading-[1.6]">
                  Schedule your personalized coaching session and start implementing strategies that deliver measurable results.
                </p>
                <Link to="/bizguides/booking">
                  <Button 
                    className="bg-white text-[hsl(var(--biz-teal))] hover:bg-white/90 hover:scale-105 font-montserrat font-semibold w-full transition-all duration-300"
                    size="lg"
                  >
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-[hsl(var(--biz-grey))]/20"></div>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-[hsl(var(--biz-white))]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="font-montserrat font-bold text-3xl lg:text-4xl mb-6 text-[hsl(var(--biz-navy))] leading-[1.2]">
                Frequently Asked Questions
              </h3>
              <p className="font-open-sans text-lg text-[hsl(var(--biz-grey))] max-w-2xl mx-auto leading-[1.6]">
                Get answers to common questions about SMB coaching and our guided strategy approach
              </p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {faqData.map((faq, index) => (
                <Card key={index} className="border-[hsl(var(--biz-grey))]/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="font-montserrat font-semibold text-xl text-[hsl(var(--biz-navy))] leading-[1.3]">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-open-sans text-[hsl(var(--biz-grey))] leading-[1.6]">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-[hsl(var(--biz-grey))]/20"></div>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-[hsl(var(--biz-teal))] text-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="font-montserrat font-bold text-3xl lg:text-4xl mb-6 leading-[1.2]">
              Stop Guessing, Start Growing
            </h3>
            <p className="font-open-sans text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-[1.6]">
              Join thousands of SMBs who have transformed their business with expert guidance
            </p>
            <Link to="/bizguides/booking" data-testid="cta-bottom">
              <Button 
                size="lg"
                className="bg-white text-[hsl(var(--biz-teal))] hover:bg-white/90 hover:scale-105 font-montserrat font-semibold text-lg px-8 py-4 transition-all duration-300 shadow-lg"
              >
                Schedule Your Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        <GlobalFooter />
        <EmailCapturePopup hubColor="biz-guides" />
      </div>
    </HelmetProvider>
  );
};

export default BizGuides;
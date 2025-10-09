import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import { CheckCircle, Star, ArrowRight } from "lucide-react";
import businessAnalyticsDashboard from "@/assets/business-analytics-dashboard.jpg";
import { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tiers = [
    {
      name: "Essentials",
      price: "$99",
      originalPrice: "$199",
      savings: "$100",
      description: "Perfect for startups and small businesses getting their first comprehensive health check",
      features: [
        "45-question focused assessment",
        "Basic business health score",
        "Core recommendations report",
        "Industry benchmark comparison",
        "PDF download",
        "Email support"
      ],
      popular: false,
      cta: "Start Essentials Assessment"
    },
    {
      name: "Growth", 
      price: "$299",
      originalPrice: "$499",
      savings: "$200",
      description: "Ideal for growing businesses ready for detailed analysis and strategic planning",
      features: [
        "75+ question assessment",
        "Advanced health scoring with sub-categories",
        "Detailed strategic recommendations",
        "Competitive analysis insights",
        "Financial health deep-dive",
        "90-day progress tracking",
        "Priority email support",
        "Implementation timeline"
      ],
      popular: true,
      cta: "Start Growth Assessment"
    },
    {
      name: "Enterprise",
      price: "$499",
      originalPrice: "$799",
      savings: "$300",
      description: "Complete solution for established businesses planning major transitions or exits",
      features: [
        "Comprehensive business assessment",
        "Complete business valuation insights",
        "Exit strategy recommendations",
        "Risk assessment & mitigation plans",
        "Market positioning analysis",
        "Leadership transition planning",
        "Quarterly review sessions",
        "Direct consultant access",
        "Custom action plan development"
      ],
      popular: false,
      cta: "Start Enterprise Assessment"
    }
  ];

  const faqs = [
    {
      question: "What happens after I complete the assessment?",
      answer: "You'll receive your comprehensive report within minutes via email, along with a downloadable PDF. Your personalized insights and recommendations will be immediately accessible."
    },
    {
      question: "How accurate are the industry benchmarks?",
      answer: "Our AI analyzes data from thousands of businesses across different industries and sizes, providing you with current, relevant benchmarks specific to your sector and business model."
    },
    {
      question: "Can I upgrade my assessment after purchase?",
      answer: "Yes, you can upgrade to a higher tier within 30 days of your initial purchase. Simply contact our support team and we'll apply your previous payment as credit."
    },
    {
      question: "Is my business data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and follow strict data privacy protocols. Your information is never shared with third parties and is deleted after 90 days unless you opt for extended tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Pricing That Scales With You
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Choose the assessment level that matches your business needs. From quick health checks to comprehensive strategic analysis,
              we have the right solution to drive your growth.
            </p>
            <div className="mt-8">
              <img 
                src={businessAnalyticsDashboard} 
                alt="Business analytics dashboard showing comprehensive data visualization and performance metrics"
                className="rounded-xl shadow-card mx-auto max-w-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-2xl border-2 p-8 ${tier.popular ? 'border-primary bg-muted scale-105' : 'border-border bg-background'} shadow-card hover:shadow-elegant transition-all duration-300`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{tier.name}</h3>
                  <div className="mb-2">
                    <div className="inline-block bg-warning/10 border border-warning px-3 py-1 rounded-full">
                      <span className="text-warning font-semibold text-xs">⏰ Limited Time Offer</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">{tier.originalPrice}</span>
                    <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  </div>
                  <div className="text-sm font-semibold text-growth mb-4">Save {tier.savings}!</div>
                  <p className="text-muted-foreground leading-relaxed">{tier.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-growth mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${tier.popular ? 'bg-primary text-white hover:bg-biz-green transform hover:scale-105' : 'border border-border bg-background text-foreground hover:bg-biz-green hover:text-white'}`}>
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Why BizHealth.ai Delivers Exceptional Value
            </h2>
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Traditional Business Consulting</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• $5,000 - $25,000+ investment</li>
                  <li>• 4-8 weeks for initial assessment</li>
                  <li>• Generic recommendations</li>
                  <li>• Limited follow-up support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">BizHealth.ai Assessment</h3>
                <ul className="space-y-2 text-primary">
                  <li>• $99 - $499 one-time fee (Limited Time!)</li>
                  <li>• Instant results in 15-30 minutes</li>
                  <li>• AI-powered personalized insights</li>
                  <li>• Ongoing support and updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg p-6 bg-background">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-growth">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Business Transformation Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join over 10,000 business owners who've improved their operations with our AI-powered insights
            </p>
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default Pricing;
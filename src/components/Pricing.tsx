import { Button } from "@/components/ui/button";
import { Check, CreditCard, Download, Shield, Clock } from "lucide-react";
import bizhealthLogo from "@/assets/bizhealth-logo-horizontal.jpg";

const Pricing = () => {
  const handlePayment = () => {
    // Placeholder for payment integration
    alert("Payment integration will be set up once Supabase and Stripe are configured!");
  };

  const features = [
    "Comprehensive business health assessment",
    "Full business analysis across 12 key categories", 
    "Industry benchmarking and competitor comparison",
    "Personalized action plan with strategic recommendations",
    "Downloadable PDF report for your records",
    "Client portal for easy sharing with your team",
    "Results in minutes - no waiting for consultants",
    "One-time fee - no recurring subscriptions"
  ];

  const included = [
    {
      icon: Shield,
      title: "100% Secure & Private",
      description: "Your business data is fully encrypted"
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Get your report within 30-40 minutes after completion"
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "PDF download + online dashboard view"
    },
    {
      icon: CreditCard,
      title: "One-Time Payment",
      description: "No subscriptions or hidden recurring fees"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get a comprehensive business health analysis for a fraction of what consultants charge
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Main pricing card */}
          <div className="bg-growth/5 p-12 rounded-3xl shadow-elegant border-2 border-growth/30 relative overflow-hidden">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <img 
                  src={bizhealthLogo} 
                  alt="BizHealth.ai" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Complete Business Health Report
              </h3>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-full shadow-lg mb-4" style={{ backgroundColor: '#FFC107', border: '2px solid #FFA000' }}>
                  <span className="font-bold text-xs" style={{ color: '#000000' }}>⏰ Limited Time Offer</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-muted-foreground line-through text-2xl mb-1">$199 - $699</div>
                    <div className="text-sm text-muted-foreground">Regular Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary">$99 - $499</div>
                    <div className="text-sm text-primary font-semibold mt-1">Save up to $300!</div>
                  </div>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                One-time payment • Instant access • No monthly fees
              </p>
              
              <Button 
                variant="hero" 
                size="lg"
                onClick={handlePayment}
                className="text-xl px-12 py-6 h-auto mb-8"
              >
                Get Your Business Report Now
                <CreditCard className="w-6 h-6" />
              </Button>
              
              <p className="text-sm text-muted-foreground">
                💡 <strong>95% savings</strong> compared to traditional business consulting
              </p>
            </div>
            
            {/* Features list */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div>
                <h4 className="font-semibold text-lg mb-4 text-foreground">What's Included:</h4>
                <ul className="space-y-3">
                  {features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-growth flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4 text-foreground">Plus You Get:</h4>
                <ul className="space-y-3">
                  {features.slice(4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-growth flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Additional guarantees */}
            <div className="grid md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
              {included.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-background shadow-sm mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h5 className="font-semibold text-sm mb-1 text-foreground">{item.title}</h5>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
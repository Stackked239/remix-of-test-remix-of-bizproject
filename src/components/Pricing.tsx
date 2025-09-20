import { Button } from "@/components/ui/button";
import { Check, CreditCard, Download, Shield, Clock } from "lucide-react";

const Pricing = () => {
  const handlePayment = () => {
    // Placeholder for payment integration
    alert("Payment integration will be set up once Supabase and Stripe are configured!");
  };

  const features = [
    "Comprehensive 30-question business assessment",
    "AI-powered analysis across 8 key categories", 
    "Industry benchmarking and competitor comparison",
    "Personalized action plan with strategic recommendations",
    "Downloadable PDF report for your records",
    "Email delivery for easy sharing with your team",
    "Instant results - no waiting for consultants",
    "One-time fee - no recurring subscriptions"
  ];

  const included = [
    {
      icon: Shield,
      title: "100% Secure & Private",
      description: "Your business data is encrypted and never shared"
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
          <div className="bg-card p-12 rounded-3xl shadow-elegant border-2 border-primary/20 relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary px-6 py-2 rounded-full text-white text-sm font-semibold shadow-lg">
                Most Popular Choice
              </div>
            </div>
            
            <div className="text-center mb-12 pt-8">
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Complete Business Health Report
              </h3>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-6xl font-bold text-primary">$99*</span>
                <div className="text-left">
                  <div className="text-muted-foreground line-through text-lg">$500</div>
                  <div className="text-sm text-muted-foreground">consultant price</div>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                One-time payment • Instant access • No monthly fees
              </p>
              <p className="text-sm text-muted-foreground mb-8 text-center">
                *Tiers range from $99 - $299
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
                💡 <strong>90% savings</strong> compared to traditional business consulting
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
          
          {/* Money back guarantee */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-background px-6 py-3 rounded-full shadow-card border border-border/50">
              <Shield className="w-5 h-5 text-growth" />
              <span className="text-sm font-medium text-foreground">
                30-day money-back guarantee if not satisfied
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
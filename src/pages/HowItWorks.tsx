import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import { CheckCircle, BarChart3, FileText, Download, Clock, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: CheckCircle,
      title: "Choose Your Assessment Tier",
      description: "Select from our three comprehensive assessment levels - Essentials ($199), Growth ($499), or Enterprise ($799) - each tailored to your business size and needs.",
      details: ["Quick tier selection based on business size and needs", "Secure payment processing", "Instant access upon confirmation"]
    },
    {
      number: "02", 
      icon: FileText,
      title: "Complete Your Business Assessment",
      description: "Answer our strategically designed questionnaire covering 12 critical business dimensions, from financial health to growth strategy.",
      details: ["45-80 questions depending on tier", "Save and resume functionality", "Industry-specific question sets"]
    },
    {
      number: "03",
      icon: BarChart3,
      title: "AI Analysis & Benchmarking",
      description: "Our advanced AI algorithms analyze your responses against industry benchmarks and best practices to identify opportunities and risks.",
      details: ["Real-time data processing", "Industry comparison analysis", "Risk assessment algorithms"]
    },
    {
      number: "04",
      icon: Download,
      title: "Receive Your Actionable Report",
      description: "Get your comprehensive business health report with specific recommendations, priority action items, and strategic roadmap.",
      details: ["Downloadable PDF format", "Email delivery included", "90-day report updates available"]
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Complete assessment in 15-30 minutes depending on your chosen tier"
    },
    {
      icon: Shield,
      title: "Secure & Confidential", 
      description: "Enterprise-grade security with full data encryption and privacy protection"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "AI-powered analysis backed by industry benchmarks and best practices"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              How BizHealth.ai Works
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our proven 4-step process transforms your business insights into actionable growth strategies. 
              From assessment to implementation, we guide you through every step of strengthening your business foundation.
            </p>
            <div className="mt-12">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="AI circuit board representing advanced business analytics technology"
                className="rounded-xl shadow-elegant mx-auto max-w-3xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-elegant">
                      {step.number}
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-growth" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-80 h-80 rounded-2xl bg-muted border border-border flex items-center justify-center">
                    <step.icon className="w-32 h-32 text-primary/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Why Choose Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on years of business consulting expertise and powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-background shadow-card mb-6 border border-border/50">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Unlock Your Business Potential?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of business owners who've transformed their operations with data-driven insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
              >
                View Pricing Options
              </a>
              <a 
                href="mailto:support@bizhealth.ai" 
                className="inline-flex items-center justify-center px-8 py-4 border border-border bg-background text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
              >
                Have Questions?
              </a>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default HowItWorks;
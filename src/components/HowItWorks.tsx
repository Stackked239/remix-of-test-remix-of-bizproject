import { CreditCard, FileText, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: CreditCard,
      title: "Sign Up and Pay",
      description: "Quick and secure one-time payment of $99-299. No subscriptions, no hidden fees.",
      color: "text-primary"
    },
    {
      number: "02", 
      icon: FileText,
      title: "Answer Questions",
      description: "Complete our comprehensive questionnaire covering all aspects of your business in just 30-40 minutes.",
      color: "text-growth"
    },
    {
      number: "03",
      icon: Download,
      title: "Receive Your Report",
      description: "Get your personalized business health report instantly with actionable insights and recommendations.",
      color: "text-trust"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your comprehensive business analysis in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-primary/30 z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white font-bold text-lg mb-6 shadow-elegant">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-background shadow-card mb-6 ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline visual */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-background px-8 py-4 rounded-full shadow-card border border-border/50">
            <span className="text-sm font-medium text-muted-foreground">Current Avg. Response Time:</span>
            <span className="text-lg font-bold text-primary">42 minutes</span>
            <span className="text-sm text-muted-foreground">from Completed Questionnaire to Report</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
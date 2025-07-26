import { AlertTriangle, BarChart2, Target, DollarSign } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: AlertTriangle,
      title: "Identify Critical Areas of Concern",
      description: "Spot potential problems before they become costly issues that could derail your business growth.",
      color: "text-red-500"
    },
    {
      icon: BarChart2,
      title: "Benchmark Against Industry Standards",
      description: "Compare your performance with competitors and industry averages to understand where you stand.",
      color: "text-trust"
    },
    {
      icon: Target,
      title: "Get Tailored Strategies",
      description: "Receive customized recommendations based on your business size, location, and sector for maximum impact.",
      color: "text-growth"
    },
    {
      icon: DollarSign,
      title: "Save Time and Money",
      description: "Get AI-driven analysis instead of expensive consultants, saving thousands while getting instant insights.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Why Choose Our Business Health Analyzer?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive insights that would typically cost thousands in consulting fees, 
            delivered instantly with AI precision.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-card p-8 rounded-2xl shadow-card hover:shadow-feature transition-all duration-300 hover:-translate-y-2 border border-border/50"
            >
              <div className={`inline-flex p-4 rounded-xl bg-background shadow-sm mb-6 ${benefit.color}`}>
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional value proposition */}
        <div className="mt-16 text-center bg-gradient-card p-12 rounded-3xl shadow-card border border-border/50">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Comprehensive Analysis in Minutes, Not Months
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI processes your responses across 8 critical business categories, 
            delivering a detailed report that typically takes consultants weeks to prepare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
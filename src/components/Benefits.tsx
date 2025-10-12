import { Shield, TrendingUp, Target, Zap, Users, BarChart3, Award, CheckCircle } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Identify Critical Areas of Concern Before They Become Problems",
      description: "Our AI analyzes over 200 business health indicators across 8 key areas to spot risks and opportunities you might miss. Get early warning systems for cash flow, operations, and growth bottlenecks."
    },
    {
      icon: BarChart3,
      title: "Benchmark Against Industry Standards and Competitors",
      description: "Compare your metrics against thousands of similar businesses in your industry and region. Know exactly where you stand and what top performers are doing differently."
    },
    {
      icon: Target,
      title: "Get Tailored Strategies Based on Your Business Profile",
      description: "Receive customized recommendations based on your exact business size, location, sector, and growth stage. No generic advice—just proven strategies that work for businesses like yours."
    },
    {
      icon: Zap,
      title: "Save Time and Money with AI-Driven Analysis",
      description: "Skip $5,000+ consultant fees and months of waiting. Get professional-grade strategic analysis in 15 minutes for 98% less than traditional business consulting."
    },
    {
      icon: Users,
      title: "Optimize Team Performance and Reduce Turnover",
      description: "Identify gaps in your HR practices, team structure, and leadership effectiveness. Get actionable steps to boost productivity and create a thriving workplace culture."
    },
    {
      icon: TrendingUp,
      title: "Unlock Hidden Growth Opportunities",
      description: "Discover untapped revenue streams, market expansion possibilities, and operational efficiencies. Our reports have helped businesses achieve 20-30% efficiency gains."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Proven Results for 2,500+ Businesses
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why Smart Business Owners Choose BizHealth.ai
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We understand the sleepless nights worrying about scaling. Transform your business decision-making 
            with insights that turn uncertainty into actionable growth strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 border border-border shadow-card hover:shadow-feature transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-card-foreground leading-tight">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Success metrics */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Measurable Results Our Clients Achieve
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real outcomes from businesses that transformed their operations using BizHealth.ai insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Improved Cash Flow Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-growth mb-2">34%</div>
              <div className="text-sm text-muted-foreground">Average Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-trust mb-2">92%</div>
              <div className="text-sm text-muted-foreground">Successfully Implemented Recommendations</div>
            </div>
          </div>
        </div>

        {/* Trust elements */}
        <div className="bg-muted rounded-2xl p-8 border border-border">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Your Business Data is Protected
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We use enterprise-grade encryption and robust security protocols to safeguard your sensitive business information. Your data is protected in compliance with all applicable data protection regulations, providing you peace of mind to focus on your company's growth.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: '#8CBF2F' }} />
              <span className="font-bold">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: '#8CBF2F' }} />
              <span className="font-bold">GDPR & SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: '#8CBF2F' }} />
              <span className="font-bold">100% Confidential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
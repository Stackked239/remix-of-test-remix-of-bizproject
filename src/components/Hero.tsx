import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, TrendingUp, Award, Clock } from "lucide-react";

const Hero = () => {
  const handleGetReport = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeeHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-32 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-growth/10 rounded-full blur-xl animate-pulse-soft delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-trust/5 rounded-full blur-lg animate-pulse-soft delay-500"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-trust" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-growth" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>Instant Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-trust" />
              <span>Trusted by 2,500+ Businesses</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Transform Your Business with 
            <span className="block">AI-Powered Health Analysis</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We understand the sleepless nights worrying about scaling—here's how our tool turns that into actionable growth. 
            Get comprehensive insights on financial health, operations efficiency, and strategic opportunities in minutes, not months.
          </p>
          
          {/* Value proposition */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">Perfect for businesses with:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">$100K - $10M Revenue</span>
              <span className="bg-growth/10 text-growth px-3 py-1 rounded-full">5-200 Employees</span>
              <span className="bg-trust/10 text-trust px-3 py-1 rounded-full">3+ Years in Business</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleGetReport}
              className="text-lg px-8 py-6 h-auto shadow-elegant"
            >
              Get Your Business Health Report
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleSeeHowItWorks}
              className="text-lg px-8 py-6 h-auto"
            >
              See How It Works
              <Clock className="w-5 h-5" />
            </Button>
          </div>

          {/* Risk-free guarantee */}
          <div className="text-center text-sm text-muted-foreground">
            <p>✓ 100% Money-Back Guarantee • ✓ Complete in 15 Minutes • ✓ Instant PDF Report</p>
          </div>

          {/* Hero Image */}
          <div className="relative mt-16">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675&q=80" 
              alt="Business analytics and code visualization representing AI-powered business insights"
              className="rounded-2xl shadow-elegant border border-border/20 w-full max-w-4xl mx-auto"
            />
          </div>
          
          {/* Social proof */}
          <div className="pt-12 text-muted-foreground">
            <p className="text-sm mb-6">Join thousands of entrepreneurs who've transformed their businesses</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">2,500+</div>
                <div className="text-xs md:text-sm">Reports Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-growth">98.2%</div>
                <div className="text-xs md:text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-trust">$2.4M</div>
                <div className="text-xs md:text-sm">Avg. Growth Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">15min</div>
                <div className="text-xs md:text-sm">Average Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
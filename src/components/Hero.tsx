import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, TrendingUp } from "lucide-react";

const Hero = () => {
  const handleGetReport = () => {
    // For now, scroll to pricing section
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-growth/10 rounded-full blur-xl animate-pulse-soft delay-1000"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-trust" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-growth" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>Instant Results</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Unlock Your Business's True Potential with AI-Powered Insights
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Answer a few targeted questions and receive a comprehensive report on your business health, 
            strengths, weaknesses, and actionable next steps to scale and grow.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleGetReport}
              className="text-lg px-8 py-6 h-auto"
            >
              Get Your Business Report Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              See How It Works
            </Button>
          </div>
          
          {/* Social proof */}
          <div className="pt-12 text-muted-foreground">
            <p className="text-sm mb-4">Trusted by entrepreneurs worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold">500+</div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-2xl font-bold">Reports Generated</div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
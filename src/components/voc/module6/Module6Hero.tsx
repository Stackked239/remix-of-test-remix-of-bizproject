import { motion } from "framer-motion";
import { ArrowDown, Clock, Target, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Module6Hero = () => {
  const handleScrollToContent = () => {
    document.getElementById('timeline-overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-br from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-green))]/5 to-background">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Module Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            Module 6 of 7 • 22-28 minutes
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Building Your 90-Day
            <span className="block text-[hsl(var(--biz-green))] mt-2">Voice of Customer System</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From quick wins to sustainable implementation. Complete roadmap with team accountability, ownership models, and proven rhythms.
          </p>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-card border rounded-xl p-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Days 1-30</h3>
              <p className="text-sm text-muted-foreground">Foundation</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-green))]/10 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-[hsl(var(--biz-green))]" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Days 31-60</h3>
              <p className="text-sm text-muted-foreground">Refinement</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-navy))]/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[hsl(var(--biz-navy))]" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Days 61-90</h3>
              <p className="text-sm text-muted-foreground">Optimization</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg"
            onClick={handleScrollToContent}
            className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white gap-2 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Roadmap
            <ArrowDown className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Module6Hero;

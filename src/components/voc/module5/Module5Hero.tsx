import { motion } from "framer-motion";
import { Download, Clock, CheckCircle2, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Module5Hero = () => {
  const { toast } = useToast();

  const handleDownloadChecklist = () => {
    toast({
      title: "Download Started!",
      description: "Your 7-Day Checklist PDF is downloading.",
    });
    // In production, this would trigger a real download
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-br from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-green))]/5 to-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Module Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            Module 5 of 7 • ~15 min per day
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Your 7-Day Quick Start
            <span className="block text-[hsl(var(--biz-green))] mt-2">From Learning to Your First Result</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            You've learned the VoC framework. Now let's get you a quick win—<strong className="text-foreground">this week.</strong>
          </p>

          {/* What You'll Achieve */}
          <div className="bg-card border rounded-xl p-6 md:p-8 mb-8 text-left max-w-xl mx-auto shadow-sm">
            <p className="text-lg font-medium text-foreground mb-4">
              Each day takes about 15 minutes. By Day 7, you'll have:
            </p>
            <ul className="space-y-3">
              {[
                "Collected real feedback from customers",
                "Found patterns in what they're telling you",
                "Made ONE visible improvement",
                "Told customers you heard them"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--biz-green))] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Download CTA */}
          <Button 
            size="lg"
            onClick={handleDownloadChecklist}
            className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white gap-2 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-5 h-5" />
            Download 7-Day Checklist PDF
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-sm">Free</span>
          </Button>

          {/* Scroll Indicator */}
          <motion.div 
            className="mt-12 flex flex-col items-center text-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm mb-2">Ready to start? Scroll down to Day 1</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Hero;

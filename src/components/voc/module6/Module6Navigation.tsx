import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

interface Module6NavigationProps {
  isComplete: boolean;
  onMarkComplete: () => void;
}

const Module6Navigation = ({ isComplete, onMarkComplete }: Module6NavigationProps) => {
  return (
    <section id="next-steps" className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Completion Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--biz-yellow))]/10 text-[hsl(var(--biz-yellow))] rounded-full mb-4">
            <Star className="w-5 h-5" />
            <span className="font-medium">Module 6 Complete!</span>
          </div>
          <p className="text-muted-foreground">
            You've mastered the 90-day implementation framework.
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div 
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${num <= 6 
                    ? 'bg-[hsl(var(--biz-green))] text-white' 
                    : 'bg-muted text-muted-foreground'}`}
              >
                {num <= 6 ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">6 of 7 modules complete</p>

          {!isComplete && (
            <Button
              onClick={onMarkComplete}
              className="mt-4 bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark Module 6 Complete
            </Button>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-navy))]/5 rounded-xl border border-[hsl(var(--biz-blue))]/20 p-4 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to={VOC_URLS.modules[5].url}
              className="flex items-center gap-4 p-4 rounded-lg bg-background border border-[hsl(var(--biz-blue))]/30 hover:bg-[hsl(var(--biz-blue))]/10 hover:border-[hsl(var(--biz-blue))]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[hsl(var(--biz-blue))]" />
              <div className="text-left">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Previous</span>
                <p className="font-medium text-[hsl(var(--biz-blue))]">Module 5: 7-Day Quick Start</p>
              </div>
            </Link>

            <Link 
              to={VOC_URLS.modules[7].url}
              className="flex items-center gap-4 p-4 rounded-lg bg-background border border-[hsl(var(--biz-green))]/30 hover:bg-[hsl(var(--biz-green))]/10 hover:border-[hsl(var(--biz-green))]/50 transition-colors"
            >
              <div className="text-left flex-1">
                <span className="text-xs text-[hsl(var(--biz-green))] uppercase tracking-wide font-medium">
                  {isComplete ? "UNLOCKED" : "Up Next"}
                </span>
                <p className="font-medium text-[hsl(var(--biz-green))]">Module 7: Advanced Techniques</p>
                <p className="text-xs text-muted-foreground">+ Certificate & Full Reference Guide</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[hsl(var(--biz-green))]" />
            </Link>
          </div>
        </div>

        {/* Return Link */}
        <div className="text-center">
          <Link 
            to={VOC_URLS.landing}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Return to VoC Curriculum Overview
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Module6Navigation;

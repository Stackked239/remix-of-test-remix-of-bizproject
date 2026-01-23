import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, Star, Users } from "lucide-react";
import { VOC_URLS } from "@/config/vocUrls";

interface Module3NavigationProps {
  isComplete: boolean;
}

const Module3Navigation = ({ isComplete }: Module3NavigationProps) => {
  const prevModule = VOC_URLS.modules[2];
  const nextModule = VOC_URLS.modules[4];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Module Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-navy))]/5 rounded-xl border border-[hsl(var(--biz-blue))]/20 p-4 shadow-sm mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Previous Module */}
            <Link 
              to={prevModule.url}
              className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-[hsl(var(--biz-blue))]/30 hover:bg-[hsl(var(--biz-blue))]/10 hover:border-[hsl(var(--biz-blue))]/50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
              <div>
                <span className="text-xs text-muted-foreground">Previous</span>
                <h3 className="font-medium text-[hsl(var(--biz-blue))] text-sm">
                  Module 2: {prevModule.title}
                </h3>
              </div>
            </Link>

            {/* Center - Curriculum Overview */}
            <Link
              to={VOC_URLS.landing}
              className="text-center text-sm font-medium text-[hsl(var(--biz-blue))] hover:text-[hsl(var(--biz-navy))] transition-colors px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--biz-blue))]/10"
            >
              Back to Curriculum Overview
            </Link>

            {/* Next Module */}
            <Link 
              to={nextModule.url}
              className={`group flex items-center justify-end gap-3 px-4 py-3 rounded-lg border transition-colors ${
                isComplete 
                  ? 'border-[hsl(var(--biz-green))]/30 hover:bg-[hsl(var(--biz-green))]/10 hover:border-[hsl(var(--biz-green))]/50' 
                  : 'border-muted opacity-75'
              }`}
            >
              <div className="text-right">
                <span className="text-xs text-muted-foreground">Next</span>
                <h3 className={`font-medium text-sm ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-muted-foreground'}`}>
                  Module 4: {nextModule.title}
                </h3>
                {!isComplete && (
                  <p className="text-xs text-muted-foreground">Complete to unlock</p>
                )}
              </div>
              {isComplete ? (
                <ArrowRight className="h-5 w-5 text-[hsl(var(--biz-green))]" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </Link>
          </div>
        </motion.div>

        {/* Related Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Related Resources</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to={VOC_URLS.landing}
              className="px-4 py-2 bg-card border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Back to VoC Landing Page
            </Link>
            <Link 
              to={VOC_URLS.modules[5].url}
              className="px-4 py-2 bg-card border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Module 5: 7-Day Quick Start
            </Link>
            <Link 
              to="/bizgrowth"
              className="px-4 py-2 bg-card border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              BizGrowth Academy Home
            </Link>
            <Link 
              to="/bizguides"
              className="px-4 py-2 bg-card border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">
              500+ businesses have mastered VoC through this curriculum
            </p>
          </div>
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-[hsl(var(--biz-gold))] fill-[hsl(var(--biz-gold))]" />
            ))}
            <span className="text-sm text-muted-foreground ml-2">4.9/5 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3Navigation;

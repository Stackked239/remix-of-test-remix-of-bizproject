import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

const completionItems = [
  "The business case for VoC (41% revenue uplift, 12% retention boost)",
  "Why most SMBs struggle with customer feedback",
  "The four-step cycle that creates continuous improvement",
  "Where you stand right now (self-assessment)",
];

const module2Highlights = [
  "Active feedback (surveys, interviews) vs. Passive feedback (reviews, data)",
  "Omnichannel listening (8+ places to collect feedback)",
  "Closing the loop (why this is THE success factor)",
  "Setting up centralized feedback tracking",
];

interface Module1CompletionProps {
  quizScore: number;
  segment: string | null;
}

const Module1Completion = ({ quizScore, segment }: Module1CompletionProps) => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            You've Completed Module 1 🎉
          </h2>

          {/* Completion Summary */}
          <div className="bg-background rounded-xl p-6 md:p-8 shadow-sm mb-8 text-left">
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Here's what you've learned:
            </h3>
            <ul className="space-y-3">
              {completionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[hsl(var(--biz-green))]/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-[hsl(var(--biz-green))]" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Module 1 of 7 Complete</span>
              <span className="text-sm text-muted-foreground">14% Progress</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '14.28%' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-green))]/70 rounded-full"
              />
            </div>
          </div>

          {/* Next Module Teaser */}
          <div className="bg-[hsl(var(--biz-blue))]/5 rounded-xl p-6 md:p-8 text-left mb-8">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Next: The Four Core Components of VoC
            </h3>
            <p className="text-muted-foreground mb-4">
              Module 2 teaches you the exact framework for building a VoC system, including:
            </p>
            <ul className="space-y-2 mb-6">
              {module2Highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-[hsl(var(--biz-blue))]">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated time: 18-22 minutes</span>
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            asChild
            className="bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold text-base px-8 py-6 rounded-lg"
          >
            <Link to={VOC_URLS.modules[2].url} className="inline-flex items-center gap-2">
              Start Module 2: Core Components
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          {/* Secondary Options */}
          <div className="mt-8 bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-navy))]/5 rounded-xl border border-[hsl(var(--biz-blue))]/20 p-4 shadow-sm">
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link
                to={VOC_URLS.landing}
                className="font-medium text-[hsl(var(--biz-blue))] hover:text-[hsl(var(--biz-navy))] transition-colors px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--biz-blue))]/10"
              >
                Return to Curriculum Overview
              </Link>
              <span className="text-border">|</span>
              <Link
                to={VOC_URLS.modules[3].url}
                className="font-medium text-[hsl(var(--biz-green))] hover:text-[hsl(var(--biz-green))]/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--biz-green))]/10"
              >
                Skip to Module 3
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module1Completion;

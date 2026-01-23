import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";
import { vocState } from "@/state/vocStateManager";

interface Module4NavigationProps {
  isComplete: boolean;
}

const Module4Navigation = ({ isComplete }: Module4NavigationProps) => {
  const navigate = useNavigate();

  const learnings = [
    "Why closing the loop is THE critical success factor",
    "The 6-step closed-loop process",
    "How to communicate at every stage",
    "Templates for every scenario",
  ];

  const handleContinue = () => {
    if (isComplete) {
      vocState.completeModule(4);
    }
    navigate(VOC_URLS.modules[5].url);
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* What You Learned */}
          <div className="bg-background rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--biz-green))]" />
              <h3 className="font-heading font-bold text-lg text-foreground">
                You Just Learned:
              </h3>
            </div>

            <ul className="space-y-3">
              {learnings.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[hsl(var(--biz-green))] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Up Next */}
          <div className="bg-gradient-to-br from-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-green))]/5 rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📘</span>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Up Next:
              </h3>
            </div>

            <h4 className="text-xl font-heading font-bold text-foreground mb-2">
              Module 5: Your 7-Day Quick Start
            </h4>

            <p className="text-foreground/80 mb-4">
              Day-by-day action checklist to launch your VoC program in a week.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock className="h-4 w-4" />
              <span>~15-18 minutes</span>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold gap-2"
            >
              Continue to Module 5
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 bg-background rounded-xl border p-4"
        >
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2">
              <Link to={VOC_URLS.modules[3].url}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous: Metrics</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>

            <Link
              to={VOC_URLS.landing}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Curriculum Overview
            </Link>

            <Button variant="ghost" asChild className="gap-2">
              <Link to={VOC_URLS.modules[5].url}>
                <span className="hidden sm:inline">Next: 7-Day Quick Start</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4Navigation;

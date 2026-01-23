import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

interface Module5NavigationProps {
  isComplete: boolean;
}

const ROADMAP_PREVIEW = [
  { phase: "Days 1-30: Foundation", items: ["Collection system running", "1-2 metrics being tracked", "Weekly feedback review habit"] },
  { phase: "Days 31-60: Refinement", items: ["Multiple channels monitored", "Root cause analysis on top issues", "Loop closure rate above 80%"] },
  { phase: "Days 61-90: Optimization", items: ["Team trained and accountable", "Metrics improving from baseline", "System self-sustaining"] },
];

const ALL_MODULES = [
  { num: 1, title: "Why VoC Matters", url: VOC_URLS.modules[1].url },
  { num: 2, title: "Core Components", url: VOC_URLS.modules[2].url },
  { num: 3, title: "Metrics", url: VOC_URLS.modules[3].url },
  { num: 4, title: "Closing the Loop", url: VOC_URLS.modules[4].url },
  { num: 5, title: "7-Day Quick Start", url: VOC_URLS.modules[5].url, current: true },
  { num: 6, title: "90-Day System", url: VOC_URLS.modules[6].url },
  { num: 7, title: "Advanced", url: VOC_URLS.modules[7].url },
];

const Module5Navigation = ({ isComplete }: Module5NavigationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Module 6 Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-green))]/5 to-[hsl(var(--biz-yellow))]/5 border-2 border-[hsl(var(--biz-green))]/30 rounded-2xl p-8 md:p-10 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What's Next? Ready to Scale This?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              In 7 days, you've proven VoC works. You found patterns. You made an improvement. Customers felt heard. Now comes the bigger question: <strong className="text-foreground">How do you do this CONSISTENTLY across your entire business?</strong>
            </p>
          </div>

          <p className="text-muted-foreground mb-6 text-center">
            That's <strong className="text-foreground">Module 6: Building Your 90-Day System</strong>.
          </p>

          <p className="text-muted-foreground mb-8 text-center">
            While the 7-day quick start is about getting your first result, the 90-day system is about:
          </p>

          <ul className="space-y-2 mb-8 max-w-lg mx-auto">
            {[
              "Getting your whole team listening (not just you)",
              "Scaling feedback collection across every customer touchpoint",
              "Building a repeating cycle so improvements never stop",
              "Creating a customer-centric culture where feedback drives decisions",
              "Measuring the business impact (more revenue, higher retention, better NPS)"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* 90-Day Roadmap Preview */}
          <div className="bg-card border rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[hsl(var(--biz-green))]" />
              90-Day Roadmap Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ROADMAP_PREVIEW.map((phase, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm mb-2">{phase.phase}</h4>
                  <ul className="space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[hsl(var(--biz-green))]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild
              size="lg"
              className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white gap-2 shadow-lg"
            >
              <Link to={VOC_URLS.modules[6].url}>
                Unlock Module 6: Build Your 90-Day System
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Previous/Next Navigation */}
        <div className="bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-navy))]/5 rounded-xl border border-[hsl(var(--biz-blue))]/20 p-4 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            <Link 
              to={VOC_URLS.modules[4].url}
              className="flex-1 flex items-center gap-3 p-4 rounded-lg bg-background border border-[hsl(var(--biz-blue))]/30 hover:bg-[hsl(var(--biz-blue))]/10 hover:border-[hsl(var(--biz-blue))]/50 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-[hsl(var(--biz-blue))]" />
              <div>
                <span className="text-xs text-muted-foreground">Previous</span>
                <p className="font-medium text-[hsl(var(--biz-blue))]">
                  Module 4: Closing the Loop
                </p>
              </div>
            </Link>
            <Link 
              to={VOC_URLS.modules[6].url}
              className="flex-1 flex items-center justify-end gap-3 p-4 rounded-lg bg-background border border-[hsl(var(--biz-green))]/30 hover:bg-[hsl(var(--biz-green))]/10 hover:border-[hsl(var(--biz-green))]/50 transition-colors group text-right"
            >
              <div>
                <span className="text-xs text-muted-foreground">Next</span>
                <p className="font-medium text-[hsl(var(--biz-green))]">
                  Module 6: 90-Day System
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[hsl(var(--biz-green))]" />
            </Link>
          </div>
        </div>

        {/* All Modules */}
        <div className="border-t pt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">All VoC Curriculum Modules:</h3>
          <div className="flex flex-wrap gap-2">
            {ALL_MODULES.map(m => (
              <Link
                key={m.num}
                to={m.url}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors
                  ${m.current 
                    ? 'bg-[hsl(var(--biz-green))] text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
              >
                {m.num}. {m.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Links */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t text-sm">
          <Link 
            to={VOC_URLS.landing}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to VoC Landing Page
          </Link>
          <span className="text-border">|</span>
          <Link 
            to="/bizgrowth"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            BizGrowth Academy Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Module5Navigation;

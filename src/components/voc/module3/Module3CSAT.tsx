import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Lightbulb, CheckCircle2, XCircle } from "lucide-react";

interface Module3CSATProps {
  onView: () => void;
}

const Module3CSAT = ({ onView }: Module3CSATProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const benchmarks = [
    { score: ">85%", rating: "Excellent", meaning: "Customers consistently happy" },
    { score: "75-85%", rating: "Good", meaning: "Solid performance" },
    { score: "70-75%", rating: "Acceptable", meaning: "Room for improvement" },
    { score: "<70%", rating: "Needs Attention", meaning: "Immediate attention required" },
  ];

  const comparisonData = [
    { nps: "Overall relationship", csat: "Specific moment" },
    { nps: '"Would you recommend us?"', csat: '"How was THIS experience?"' },
    { nps: "Measured quarterly", csat: "Measured after each interaction" },
    { nps: "Predicts long-term loyalty", csat: "Shows quality of touchpoints" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Customer Satisfaction Score (CSAT): How Happy Are They?
        </motion.h2>

        {/* What It Measures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">What It Measures</h3>
          <p className="text-muted-foreground leading-relaxed">
            Satisfaction with a <strong>SPECIFIC</strong> interaction or transaction. Not overall loyalty 
            (that's NPS) — this is about the moment: Was THIS experience good?
          </p>
        </motion.div>

        {/* The Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-5 mb-8"
        >
          <h4 className="text-sm font-semibold text-[hsl(var(--biz-green))] uppercase tracking-wide mb-2">
            The Question
          </h4>
          <p className="text-lg font-medium text-foreground italic mb-3">
            "How satisfied were you with [specific interaction]?"
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• "How satisfied were you with your support experience today?"</p>
            <p>• "How satisfied were you with your recent purchase?"</p>
            <p>• "How satisfied were you with your delivery?"</p>
          </div>
        </motion.div>

        {/* The Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">The Scale (1-5)</h3>
          <div className="flex justify-center gap-2 md:gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="text-center">
                <div className="flex justify-center mb-2">
                  {Array.from({ length: num }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[hsl(var(--biz-gold))] fill-[hsl(var(--biz-gold))]" />
                  ))}
                  {Array.from({ length: 5 - num }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-muted" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {num === 1 && "Very Dissatisfied"}
                  {num === 2 && "Dissatisfied"}
                  {num === 3 && "Neutral"}
                  {num === 4 && "Satisfied"}
                  {num === 5 && "Very Satisfied"}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Formula & Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-muted/50 rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">How to Calculate</h4>
            <div className="font-mono text-sm text-foreground bg-background rounded p-3 text-center">
              CSAT = (# who rated 4 or 5 ÷ Total) × 100
            </div>
          </div>
          <div className="bg-[hsl(var(--biz-green))]/5 rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">Example</h4>
            <p className="text-sm text-muted-foreground">
              100 customers rate support: 75 give 4 or 5
            </p>
            <p className="text-lg font-bold text-[hsl(var(--biz-green))] mt-2">
              CSAT = 75%
            </p>
          </div>
        </motion.div>

        {/* Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">What's a Good Score?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {benchmarks.map((b, i) => (
              <div key={i} className="bg-card border rounded-lg p-4 text-center">
                <p className="text-lg font-bold text-foreground">{b.score}</p>
                <p className="text-sm font-medium text-[hsl(var(--biz-green))]">{b.rating}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.meaning}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* NPS vs CSAT Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">NPS vs. CSAT: Know the Difference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold text-[hsl(var(--biz-blue))]">NPS</th>
                  <th className="text-left py-2 px-3 font-semibold text-[hsl(var(--biz-green))]">CSAT</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-3 text-muted-foreground">{row.nps}</td>
                    <td className="py-3 px-3 text-muted-foreground">{row.csat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* What CSAT Tells/Doesn't Tell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--biz-green))]" />
              What CSAT Tells You
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ How well you delivered on expectations</li>
              <li>✓ Quality of individual touchpoints</li>
              <li>✓ Which interactions need improvement</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              What CSAT Doesn't Tell You
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✗ Long-term loyalty</li>
              <li>✗ Overall relationship health</li>
              <li>✗ Likelihood to recommend</li>
            </ul>
          </div>
        </motion.div>

        {/* When to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/30 rounded-xl p-5 mb-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">When to Use CSAT</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              "After support ticket resolved",
              "After purchase completed",
              "After service appointment",
              "After onboarding completed",
              "After any key interaction"
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-gold))]/10 border-l-4 border-[hsl(var(--biz-gold))] rounded-r-xl p-5"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Best Practice</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                CSAT after EVERY touchpoint = survey fatigue. Focus on your <strong>critical moments</strong>. 
                For most businesses, that's 2-3 key interactions:
              </p>
              <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
                <li>After first purchase (did we deliver?)</li>
                <li>After support (did we help?)</li>
                <li>After major milestones (are they succeeding?)</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3CSAT;

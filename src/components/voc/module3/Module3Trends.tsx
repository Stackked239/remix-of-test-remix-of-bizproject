import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Info, Calendar, LineChart, PartyPopper, AlertCircle } from "lucide-react";

interface Module3TrendsProps {
  onView: () => void;
}

const Module3Trends = ({ onView }: Module3TrendsProps) => {
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

  const setupSteps = [
    {
      step: "Set Your Baseline",
      desc: "Measure your starting point. Don't worry if it's not good. You now have a baseline. Everything from here is improvement."
    },
    {
      step: "Measure Consistently",
      desc: "Same frequency, same method, same question wording. If you change any of these mid-stream, you can't compare."
    },
    {
      step: "Track at the Right Intervals",
      details: [
        "Short-cycle metrics (CSAT, CES): Monthly",
        "Long-cycle metrics (NPS): Quarterly",
        "Sentiment: Continuous (ongoing)"
      ]
    },
    {
      step: "Visualize the Trend",
      desc: "A line chart beats a spreadsheet of numbers. You want to SEE if you're going up or down."
    },
    {
      step: "Act on the Trend",
      hasSubsections: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-10 md:py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          The Real Power: Trends, Not Snapshots
        </motion.h2>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-blue))]/5 border border-[hsl(var(--biz-blue))]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-[hsl(var(--biz-blue))] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">The Key Insight</h4>
              <p className="text-muted-foreground mb-4">
                A single data point is nearly useless. Is an NPS of 45 good? Compared to what?
              </p>
              <p className="text-foreground font-medium mb-4">
                What's valuable is the TREND.
              </p>
              
              {/* Trend Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-600 dark:text-green-400">Improving ✅</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    NPS: 35 (Q1) → 40 (Q2) → 45 (Q3)
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-red-600 dark:text-red-400">Declining ⚠️</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">
                    NPS: 55 (Q1) → 50 (Q2) → 45 (Q3)
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3 italic">
                Same number. Completely different stories.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Trends Matter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Why Trends Matter</h3>
          <p className="text-muted-foreground mb-4">Trends answer the questions that matter:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Is what I'm doing working?",
              "Am I getting better or worse?",
              "Do I need to change course?",
              "Did that process change help?"
            ].map((q, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-sm text-foreground">{q}</p>
              </div>
            ))}
          </div>
          <p className="text-foreground font-medium mt-4 text-center">
            A single number tells you almost nothing. A trend tells you everything.
          </p>
        </motion.div>

        {/* How to Set Up Trend Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">How to Set Up Trend Tracking</h3>
          <div className="space-y-4">
            {setupSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--biz-blue))] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{step.step}</h4>
                    {step.desc && (
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    )}
                    {step.details && (
                      <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                        {step.details.map((detail, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[hsl(var(--biz-blue))]" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.hasSubsections && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <PartyPopper className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-foreground">If score goes UP:</span>
                          </div>
                          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Celebrate (team morale matters)</li>
                            <li>Ask: What did we do differently?</li>
                            <li>Keep doing that thing</li>
                          </ol>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium text-foreground">If score goes DOWN:</span>
                          </div>
                          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Don't panic</li>
                            <li>Ask: What changed?</li>
                            <li>Fix it quickly</li>
                            <li>Measure next period to confirm</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seasonal Patterns Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-gold))]/10 border-l-4 border-[hsl(var(--biz-gold))] rounded-r-xl p-5"
        >
          <div className="flex items-start gap-3">
            <LineChart className="h-5 w-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Seasonal Patterns Note</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If your business is seasonal, expect some variation. Summer might have lower 
                scores due to high volume and staffing challenges.
              </p>
              <p className="text-sm text-foreground font-medium mt-2">
                Don't overreact to seasonal dips. Compare year-over-year trends instead.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3Trends;

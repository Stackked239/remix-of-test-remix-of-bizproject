import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Rocket, TrendingUp, Building2 } from "lucide-react";

interface Module3ChoosingMetricProps {
  userSegment: string | null;
  onView: () => void;
}

const Module3ChoosingMetric = ({ userSegment, onView }: Module3ChoosingMetricProps) => {
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

  const decisionGuide = [
    { question: "Are customers loyal? Will they recommend us?", metric: "NPS", frequency: "Quarterly" },
    { question: "How satisfied were they with THIS interaction?", metric: "CSAT", frequency: "After each event" },
    { question: "Was it hard or easy to accomplish their goal?", metric: "CES", frequency: "After tasks" },
    { question: "What's the overall emotional mood?", metric: "Sentiment", frequency: "Continuous" },
  ];

  const stageRecommendations = [
    {
      icon: Rocket,
      stage: "LAUNCH STAGE",
      years: "Years 1-2",
      startWith: "CSAT (easiest, most actionable)",
      add: "Sentiment monitoring (free, passive)",
      why: "You're optimizing first interactions. CSAT tells you if they're working. Sentiment catches problems early with zero effort.",
      highlight: userSegment === 'launch',
      borderColor: "biz-gold"
    },
    {
      icon: TrendingUp,
      stage: "GROWTH STAGE",
      years: "Years 3-5",
      startWith: "Keep CSAT + Sentiment",
      add: "NPS (track loyalty quarterly)",
      why: "Now you care about repeat customers and referrals. NPS shows if satisfied customers are becoming advocates.",
      highlight: userSegment === 'growth',
      borderColor: "biz-lime"
    },
    {
      icon: Building2,
      stage: "SCALING STAGE",
      years: "Year 5+",
      startWith: "Use all four metrics",
      add: "NPS, CSAT, CES, Sentiment",
      why: "At scale, you have the data volume and operational complexity to benefit from all four perspectives working together.",
      highlight: userSegment === 'scaling' || userSegment === 'enterprise',
      borderColor: "biz-teal"
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-br from-[hsl(var(--biz-blue))]/5 via-background to-[hsl(var(--biz-green))]/5">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Which Metric Should <span className="text-[hsl(var(--biz-blue))]">YOU</span> Use?
        </motion.h2>

        {/* Quick Decision Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Decision Guide</h3>
          <div className="bg-card border-2 border-[hsl(var(--biz-blue))]/20 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[hsl(var(--biz-blue))]/10 to-[hsl(var(--biz-green))]/10 border-b border-[hsl(var(--biz-blue))]/20">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">If You Want to Know...</th>
                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--biz-blue))]">Use This</th>
                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--biz-green))]">How Often</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionGuide.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-[hsl(var(--biz-blue))]/5 transition-colors">
                      <td className="py-4 px-4 text-foreground">{row.question}</td>
                      <td className="py-4 px-4 font-bold text-[hsl(var(--biz-blue))]">{row.metric}</td>
                      <td className="py-4 px-4 text-[hsl(var(--biz-green))] font-medium">{row.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Recommendations by Business Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Recommendations by Business Stage</h3>
          <div className="space-y-4">
            {stageRecommendations.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card border-2 border-[hsl(var(--${stage.borderColor}))] rounded-xl p-5 transition-all ${
                  stage.highlight 
                    ? 'ring-2 ring-[hsl(var(--biz-green))]/20' 
                    : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[hsl(var(--${stage.borderColor}))]/10`}>
                    <stage.icon className={`h-6 w-6 text-[hsl(var(--${stage.borderColor}))]`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                      <span className="text-xs text-muted-foreground">({stage.years})</span>
                      {stage.highlight && (
                        <span className="text-xs px-2 py-0.5 bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] rounded-full font-medium">
                          Your Stage
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Start with:</span>
                        <p className="text-sm font-medium text-foreground">{stage.startWith}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Add:</span>
                        <p className="text-sm font-medium text-foreground">{stage.add}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{stage.why}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Critical Mistake Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">The Critical Mistake</h4>
              <p className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                "Measuring everything, acting on nothing."
              </p>
              <p className="text-muted-foreground">
                Better to measure ONE thing well and improve it than track 10 metrics 
                and do nothing with any of them.
              </p>
              <p className="text-foreground font-medium mt-2">
                Start simple. Add metrics as you grow.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Getting Team Alignment on Metrics</h3>
          <p className="text-muted-foreground mb-4">Before you pick, ask your team:</p>
          <div className="space-y-3">
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-foreground">Customer Service:</strong>{' '}
                <span className="text-muted-foreground">"What would help you serve customers better?"</span>
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-foreground">Sales:</strong>{' '}
                <span className="text-muted-foreground">"What signals whether customers will buy again?"</span>
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-foreground">Product/Operations:</strong>{' '}
                <span className="text-muted-foreground">"What feedback do you need to improve?"</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground font-medium mt-4">
            Pick the metric that answers the most pressing question for your business RIGHT NOW.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3ChoosingMetric;

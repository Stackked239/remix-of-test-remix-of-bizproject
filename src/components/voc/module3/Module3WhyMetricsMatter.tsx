import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Quote, Target } from "lucide-react";

interface Module3WhyMetricsMatterProps {
  onView: () => void;
}

const Module3WhyMetricsMatter = ({ onView }: Module3WhyMetricsMatterProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const roiStats = [
    { value: "41%", label: "higher revenue growth" },
    { value: "25%", label: "less spent on retention" },
    { value: "21%", label: "better survey response rates" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        >
          Why Metrics Matter
        </motion.h2>

        {/* Story Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-green))]/5 border-l-4 border-[hsl(var(--biz-blue))] rounded-r-xl p-6 md:p-8 mb-10"
        >
          <Quote className="absolute top-4 right-4 h-8 w-8 text-[hsl(var(--biz-blue))]/20" />
          <p className="text-lg text-foreground leading-relaxed mb-4">
            A coffee roaster in Portland had 200 customer reviews. Their average score was 4.2/5. 
            <span className="font-semibold"> One metric, no insights.</span>
          </p>
          <p className="text-lg text-foreground leading-relaxed mb-4">
            Then they tagged every negative review by topic. Pattern emerged: <span className="font-semibold text-[hsl(var(--biz-blue))]">47 people complained about shipping time</span>. Nobody mentioned coffee quality.
          </p>
          <p className="text-lg text-foreground leading-relaxed mb-4">
            They changed shippers. Complaints dropped 60% in 30 days.
          </p>
          <p className="text-lg font-semibold text-[hsl(var(--biz-green))]">
            Same data. Better metrics. Different business outcome.
          </p>
        </motion.div>

        {/* Key Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--biz-green))]/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-[hsl(var(--biz-green))]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Metrics Give You Permission to Act
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                You can't fix everything. You have limited time, limited budget, limited energy. 
                Metrics show you what ACTUALLY matters to customers — not your guess, not your intuition, 
                but their actual words organized into patterns.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-gold))]/10 border-l-4 border-[hsl(var(--biz-gold))] rounded-r-xl p-6 mb-10"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">The Problem Without Metrics</h4>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Without measurement, you're operating blind:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You think customers care about X</li>
                <li>• They're actually upset about Y</li>
                <li>• You spend money improving X</li>
                <li>• Y still drives them away</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                This happens constantly. Businesses invest thousands fixing the wrong problems 
                while the real issues fester.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ROI Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-green))]/30 border border-[hsl(var(--biz-green))]/40 rounded-xl p-6 md:p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-[hsl(var(--biz-green))]" />
            <h4 className="font-semibold text-foreground">The ROI of Measurement</h4>
          </div>
          <p className="text-muted-foreground mb-6">
            Companies that measure customer satisfaction systematically see:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roiStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-background rounded-lg shadow-sm"
              >
                <div className="text-3xl font-bold text-[hsl(var(--biz-green))] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Source: Aberdeen Group Research
          </p>
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-xl p-6 text-center"
        >
          <p className="text-lg text-foreground font-medium">
            This isn't busy work. Metrics directly connect to revenue and retention. 
            <br className="hidden md:block" />
            In the next 20 minutes, you'll learn which ones matter most for YOUR business.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3WhyMetricsMatter;

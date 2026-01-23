import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingDown, Lightbulb, CheckCircle2, ShoppingCart, Headphones, Rocket } from "lucide-react";

interface Module3CESProps {
  onView: () => void;
}

const Module3CES = ({ onView }: Module3CESProps) => {
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
    { score: ">6", rating: "Excellent", meaning: "Very easy experience" },
    { score: "5-6", rating: "Good", meaning: "Smooth process" },
    { score: "4-5", rating: "Needs Improvement", meaning: "Some friction" },
    { score: "<4", rating: "Too Much Friction", meaning: "Customers struggling" },
  ];

  const scenarios = [
    {
      icon: ShoppingCart,
      title: "E-commerce Checkout",
      question: '"How easy was it to complete your purchase?"',
      high: "Customers return, high conversion",
      low: "Cart abandonment, 'painful checkout' complaints",
      action: "Reduce form fields, add guest checkout, show progress"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      question: '"How easy was it to resolve your issue?"',
      high: "Customer feels supported, likely to stay",
      low: "Frustration, churn, negative reviews",
      action: "Improve knowledge base, faster response, empower agents"
    },
    {
      icon: Rocket,
      title: "Product Onboarding",
      question: '"How easy was it to get started with us?"',
      high: "Smooth first experience, customer commits",
      low: "Customer gives up, seeks alternatives",
      action: "Simplify setup, better tutorials, 1:1 onboarding option"
    }
  ];

  const quickWins = [
    "Faster checkout pages",
    "Fewer form fields",
    "Clearer instructions",
    "Better search functionality",
    "Simpler returns process"
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Customer Effort Score (CES): Make It Easy
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
            How easy or difficult it was for the customer to accomplish something. 
            Research shows: <strong className="text-foreground">HIGH EFFORT = HIGH CHURN.</strong>
          </p>
        </motion.div>

        {/* Research Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-blue))]/5 border border-[hsl(var(--biz-blue))]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <TrendingDown className="h-6 w-6 text-[hsl(var(--biz-blue))] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Research Insight</h4>
              <p className="text-muted-foreground leading-relaxed">
                Harvard Business Review found that <strong className="text-foreground">high-effort experiences are the #1 driver 
                of customer disloyalty</strong> — even more than poor product quality or service failures.
              </p>
              <p className="text-[hsl(var(--biz-blue))] font-medium mt-2">
                The easier you make things, the more loyal customers become.
              </p>
            </div>
          </div>
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
            "How easy was it to [complete task]?"
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• "How easy was it to complete your purchase?"</p>
            <p>• "How easy was it to resolve your issue?"</p>
            <p>• "How easy was it to get started with our product?"</p>
          </div>
        </motion.div>

        {/* The Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">The Scale (1-7)</h3>
          <div className="bg-card border rounded-xl p-5">
            <div className="flex justify-between items-center mb-3">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div 
                  key={num} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    num <= 3 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : num === 4 
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Difficult</span>
              <span>Neutral</span>
              <span>Very Easy</span>
            </div>
            <p className="text-center text-sm text-[hsl(var(--biz-green))] font-medium mt-4">
              HIGHER is better — we want customers to say "Easy!"
            </p>
          </div>
        </motion.div>

        {/* Formula & Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-muted/50 rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">How to Calculate</h4>
            <div className="font-mono text-sm text-foreground bg-background rounded p-3 text-center">
              CES = Average of all effort scores
            </div>
          </div>
          <div className="bg-card border rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">What's a Good Score?</h4>
            <div className="space-y-2">
              {benchmarks.map((b, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="font-mono text-foreground">{b.score}</span>
                  <span className="text-muted-foreground">{b.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why CES Delivers Fast ROI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <Zap className="h-6 w-6 text-[hsl(var(--biz-green))] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Why CES Often Delivers Fastest ROI</h4>
              <p className="text-muted-foreground mb-4">
                Reducing effort is usually easier and faster than improving satisfaction. 
                Small friction fixes have immediate impact:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickWins.map((win, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-background rounded-full text-sm text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--biz-green))]" />
                    {win}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[hsl(var(--biz-green))] font-medium mt-4">
                These changes often cost little and improve loyalty significantly.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Real Scenario Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios.map((scenario, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-blue))]/10 flex items-center justify-center">
                    <scenario.icon className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
                  </div>
                  <h4 className="font-semibold text-foreground">{scenario.title}</h4>
                </div>
                <p className="text-sm italic text-muted-foreground mb-3">{scenario.question}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-medium">High CES:</span>
                    <span className="text-muted-foreground">{scenario.high}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-medium">Low CES:</span>
                    <span className="text-muted-foreground">{scenario.low}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t">
                    <span className="text-xs font-medium text-foreground">Action: </span>
                    <span className="text-xs text-muted-foreground">{scenario.action}</span>
                  </div>
                </div>
              </motion.div>
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
              <h4 className="font-semibold text-foreground mb-1">Pro Tip</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "If customers love your product but hate your process, they'll leave anyway. 
                <strong className="text-foreground"> CES catches that friction before it drives them away.</strong>"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3CES;

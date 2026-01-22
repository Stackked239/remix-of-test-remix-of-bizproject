import { motion } from "framer-motion";
import { TrendingUp, PiggyBank, Heart, AlertTriangle } from "lucide-react";

const statCards = [
  {
    number: "41%",
    description: "Higher revenue for companies with VoC programs (vs. those without)",
    source: "Source: Aberdeen Group",
    color: "text-[hsl(var(--biz-green))]",
    bgColor: "bg-[hsl(var(--biz-green))]/10",
    icon: TrendingUp,
  },
  {
    number: "25%",
    description: "Less spent on customer retention with VoC systems",
    source: "Industry benchmark data",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: PiggyBank,
  },
  {
    number: "12%",
    description: "Retention increase when you respond to feedback within 48 hours",
    source: "Customer response data",
    color: "text-[hsl(var(--biz-yellow))]",
    bgColor: "bg-[hsl(var(--biz-yellow))]/10",
    icon: Heart,
  },
];

const costOfNotDoing = [
  "Lost customers you could have saved",
  "Money wasted on improvements nobody asked for",
  "Competitors gaining ground because they're listening",
  "Team frustration (they hear complaints but can't fix them systematically)",
];

const Module1BusinessCase = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-12">
            Why This Matters for Your Bottom Line
          </h2>

          {/* Stat Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 md:p-8 shadow-sm text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${card.bgColor} rounded-xl mb-4`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className={`text-4xl md:text-5xl font-heading font-bold ${card.color} mb-3`}>
                  {card.number}
                </div>
                <p className="text-foreground mb-3">
                  {card.description}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {card.source}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Real-World Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
              Here's How This Works in Practice
            </h3>

            <div className="bg-[hsl(var(--biz-yellow))]/5 border-l-4 border-[hsl(var(--biz-yellow))] rounded-r-lg p-6 mb-10">
              <h4 className="font-semibold text-foreground mb-3">The Austin Bakery</h4>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  A small bakery in Austin analyzed their Google reviews using a simple method: 
                  read through and count positive vs. negative mentions by topic.
                </p>
                <p>
                  What they found surprised them: Customers <strong className="text-foreground">loved</strong> their 
                  croissants (5+ mentions of "amazing croissants," "best I've had"). But they{" "}
                  <strong className="text-foreground">complained</strong> about the coffee 
                  (9 mentions of "weak," "bland," "overpriced").
                </p>
                <p>
                  The coffee insight was sitting in their reviews. They just needed a system to see it.
                </p>
                <p className="pt-2">
                  <strong className="text-foreground">Action:</strong> They switched to a higher-quality 
                  coffee supplier and promoted the new brew in their next week's email.
                </p>
                <p className="text-[hsl(var(--biz-green))] font-semibold">
                  <strong>Result:</strong> 20% increase in repeat visits within 3 months.
                </p>
              </div>
            </div>

            {/* The Cost of Not Doing This */}
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h4 className="font-semibold text-foreground">The cost of staying blind:</h4>
              </div>
              <ul className="space-y-2">
                {costOfNotDoing.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-destructive flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module1BusinessCase;

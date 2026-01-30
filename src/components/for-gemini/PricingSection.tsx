import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Essentials",
    price: 199,
    description: "Baseline health check for solo founders and micro businesses",
    features: [
      "12-dimension assessment",
      "Overall health score (1-100)",
      "Top 3 priority areas identified",
      "Executive summary report",
      "30-day action plan",
      "Email support"
    ],
    cta: "Start Essentials",
    href: "/pricing",
    featured: false
  },
  {
    name: "Growth",
    price: 499,
    description: "Full diagnostics for growing small businesses",
    features: [
      "Everything in Essentials",
      "Detailed component breakdowns",
      "Industry benchmarking",
      "Root cause analysis",
      "90-day implementation roadmap",
      "Priority email + chat support",
      "BizTools templates included"
    ],
    cta: "Start Growth",
    href: "/pricing",
    featured: true
  },
  {
    name: "Enterprise",
    price: 799,
    description: "Comprehensive assessment for scaling businesses",
    features: [
      "Everything in Growth",
      "Team & department-level insights",
      "Leadership alignment report",
      "Custom benchmarking cohort",
      "Quarterly re-assessment discount",
      "1-on-1 strategy call included",
      "White-label reporting option"
    ],
    cta: "Start Enterprise",
    href: "/pricing",
    featured: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4 font-heading">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get consultant-level insights at a fraction of the cost. 
            One-time fee, no hidden charges, no subscriptions required.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border-2 p-6 md:p-8 ${
                tier.featured 
                  ? 'border-[#4285F4] bg-card shadow-xl scale-105' 
                  : 'border-border bg-card'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#4285F4] text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-xl font-semibold text-[hsl(var(--biz-navy))] mb-2 font-heading">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-[hsl(var(--biz-navy))]">${tier.price}</span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={`w-full ${
                  tier.featured 
                    ? 'bg-[#4285F4] hover:bg-[#4285F4]/90 text-white' 
                    : 'bg-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-navy))]/90 text-white'
                }`}
              >
                <Link to={tier.href} className="flex items-center justify-center gap-2">
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-[hsl(var(--biz-green))]/10 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[hsl(var(--biz-navy))] mb-2 font-heading">
                Compare to Traditional Consulting
              </h3>
              <p className="text-muted-foreground">
                Traditional business assessments cost $10,000-$100,000+ and take 3-6 months. 
                BizHealth.ai delivers comparable insights in 90 minutes.
              </p>
            </div>
            <div className="text-center shrink-0">
              <div className="text-4xl font-bold text-[hsl(var(--biz-green))]">20-25x</div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

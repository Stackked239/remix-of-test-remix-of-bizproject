import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { number: "1", title: "Choose Your Tier", description: "Select Essentials, Growth, or Enterprise" },
  { number: "2", title: "Complete the Assessment", description: "30-40 minute questionnaire" },
  { number: "3", title: "Receive Your Report", description: "Comprehensive analysis in 90 minutes" },
  { number: "4", title: "Take Action", description: "Implement quick wins, track progress" },
];

const pricingTiers = [
  {
    name: "Essentials",
    price: "$199",
    description: "Perfect for micro-businesses, solo-preneurs, and startups",
    features: [
      "Baseline health assessment across all 12 areas",
      "Owner's Report format",
      "Quick wins identification",
      "Priority action recommendations",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$499",
    description: "For small businesses ready to scale",
    features: [
      "Everything in Essentials",
      "Leadership Report format",
      "Competitive positioning analysis",
      "Department-level insights",
      "90-day action plan",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$799",
    description: "For small & mid-size businesses with complex operations",
    features: [
      "Everything in Growth",
      "Team Assessment add-on",
      "Board/Investor presentation format",
      "Multiple stakeholder reports",
      "Strategic roadmap (1-year)",
      "Priority support",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
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
            Getting Started
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple process, clear pricing, actionable results
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--biz-navy))] text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              <div className="text-left">
                <p className="font-semibold text-[hsl(var(--biz-navy))] text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block ml-4" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full relative ${tier.popular ? 'border-2 border-[hsl(var(--biz-citrine))] shadow-lg' : 'bg-card'}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-[hsl(var(--biz-citrine))] text-[hsl(var(--biz-navy))] px-3 py-1 rounded-full text-xs font-semibold">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-semibold text-[hsl(var(--biz-navy))] font-heading">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-[hsl(var(--biz-navy))]">{tier.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">one-time</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full ${tier.popular ? 'bg-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-navy-deep))]' : 'bg-[hsl(var(--biz-navy))]/90 hover:bg-[hsl(var(--biz-navy))]'}`}
                  >
                    <Link to="/pricing">Choose {tier.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

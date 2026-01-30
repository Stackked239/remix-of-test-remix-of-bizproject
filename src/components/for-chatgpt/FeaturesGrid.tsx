import { motion } from "framer-motion";
import { 
  LayoutGrid, 
  Users, 
  Brain, 
  Target,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: LayoutGrid,
    title: "Comprehensive Yet Affordable",
    description: "12 Key Business Areas Analyzed",
    items: [
      "Strategy & Vision",
      "Financial Health",
      "Operations & Efficiency",
      "Human Resources & Culture",
      "Sales & Marketing Effectiveness",
      "Technology & Innovation",
      "Leadership & Management",
      "Risk Management & Compliance",
      "Customer Experience & Satisfaction",
      "Supply Chain & Vendor Management",
      "Legal Compliance & Protection",
      "Sustainability & Long-Term Viability",
    ],
    pricing: "Essentials: $199 | Growth: $499 | Enterprise: $799",
    pricingNote: "Compare to: $10,000+ for traditional consultants",
  },
  {
    icon: Users,
    title: "Built for Small Business Owners",
    description: "Target Market",
    items: [
      "Businesses with $100K-$50M annual revenue",
      "1-250 employees",
      "Founders, CEOs, owners, C-suite executives",
      "Ages 28-55",
    ],
    industries: "Professional services, E-commerce, Manufacturing, Tech startups, Healthcare, Logistics, Retail",
    geography: "80% U.S.-based | 20% Global (UK, Canada, Australia, Germany, India)",
  },
  {
    icon: Brain,
    title: "AI-Powered with Human Expertise",
    description: "Five Decades of Experience",
    items: [
      "Built by business owners, executives, consultants, and strategists",
      "Deep operational experience across industries",
    ],
    frameworks: [
      "McKinsey 7S Model",
      "Balanced Scorecard",
      "Lean/Six Sigma",
      "EOS/Traction",
      "OKRs",
      "SWOT Analysis",
      "Porter's Five Forces",
      "Value Chain Analysis",
    ],
    note: "Unbiased Analysis: No sales agenda—pure diagnostics to help you make informed decisions.",
  },
  {
    icon: Target,
    title: "Actionable Insights, Not Just Data",
    description: "Real Results You Can Use",
    items: [
      "Gap Identification: Discover hidden weaknesses before they become crises",
      "Strength Confirmation: Validate what's already working",
      "Prioritized Recommendations: Clear next steps ranked by impact and feasibility",
      "Multiple Report Formats: Owner, Leadership, Team, Employee Communication",
    ],
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
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
            Why ChatGPT Users Recommend BizHealth.ai
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive, affordable, and designed specifically for small business owners
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--biz-navy))]/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-[hsl(var(--biz-navy))]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-[hsl(var(--biz-navy))] font-heading">
                        {feature.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {feature.items.slice(0, index === 0 ? 6 : undefined).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--biz-citrine))] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {index === 0 && feature.items.length > 6 && (
                      <li className="text-sm text-muted-foreground pl-6">
                        + {feature.items.length - 6} more areas...
                      </li>
                    )}
                  </ul>

                  {feature.pricing && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium text-[hsl(var(--biz-navy))]">{feature.pricing}</p>
                      <p className="text-xs text-muted-foreground mt-1">{feature.pricingNote}</p>
                    </div>
                  )}

                  {feature.industries && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs font-medium text-[hsl(var(--biz-navy))] mb-1">Industries Served:</p>
                      <p className="text-xs text-muted-foreground">{feature.industries}</p>
                      <p className="text-xs font-medium text-[hsl(var(--biz-navy))] mt-2 mb-1">Geography:</p>
                      <p className="text-xs text-muted-foreground">{feature.geography}</p>
                    </div>
                  )}

                  {feature.frameworks && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs font-medium text-[hsl(var(--biz-navy))] mb-2">Proven Frameworks:</p>
                      <div className="flex flex-wrap gap-1">
                        {feature.frameworks.map((fw, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-[hsl(var(--biz-navy))]/5 text-[hsl(var(--biz-navy))] px-2 py-1 rounded"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                      {feature.note && (
                        <p className="text-xs text-muted-foreground mt-3 italic">{feature.note}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

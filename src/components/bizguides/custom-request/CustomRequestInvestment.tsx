import { Check } from "lucide-react";

interface InvestmentTier {
  tier: string;
  investment: string;
  duration: string;
  resources: string;
  outcomes: string[];
  featured?: boolean;
}

const investmentTiers: InvestmentTier[] = [
  {
    tier: "Tier A: Onsite Support",
    investment: "$3,000–$8,000",
    duration: "30–90 days",
    resources: "Single advisor + limited support",
    outcomes: [
      "Team alignment & quick wins",
      "10–15% efficiency gains",
      "Capability building playbooks",
      "Implementation accountability",
    ],
  },
  {
    tier: "Tier B: Strategic Consulting",
    investment: "$8,000–$18,000",
    duration: "90–180 days",
    resources: "Lead advisor + specialized SME team",
    outcomes: [
      "12–24 month strategic roadmap",
      "15–25% efficiency gains",
      "Risk mitigation strategies",
      "Strategic clarity & validation",
    ],
    featured: true,
  },
  {
    tier: "Tier C: Full Project Management",
    investment: "$18,000–$25,000+",
    duration: "120–240 days",
    resources: "PM + lead advisor + implementation team",
    outcomes: [
      "End-to-end execution",
      "20–30% efficiency gains",
      "Scalable systems & processes",
      "Team capability building",
    ],
  },
];

const CustomRequestInvestment = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[hsl(var(--biz-navy))] mb-4">
            Investment & Outcomes: What Your Partnership Delivers
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Custom BizGuides solutions are priced based on scope, duration, and 
            resource intensity. Below is a transparent breakdown of typical 
            investment ranges and the measurable outcomes you can expect.
          </p>
        </div>

        {/* Investment Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {investmentTiers.map((tier, index) => (
            <div
              key={index}
              className={`
                bg-card rounded-xl overflow-hidden border transition-all duration-300
                ${tier.featured 
                  ? "border-2 border-[hsl(var(--biz-teal))] shadow-[var(--shadow-hub-teal)] scale-[1.02]" 
                  : "border-[hsl(var(--biz-teal))]/10 shadow-md hover:shadow-lg"
                }
              `}
            >
              {/* Header */}
              <div className={`
                px-6 py-6 text-center
                ${tier.featured 
                  ? "bg-[hsl(var(--biz-teal))]" 
                  : "bg-[hsl(var(--biz-navy))]"
                }
              `}>
                <div className="text-sm text-white/80 mb-2 font-medium">
                  {tier.tier}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {tier.investment}
                </div>
                <div className="text-sm text-white/70">
                  {tier.duration}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Resources */}
                <div className="text-center mb-6 pb-5 border-b border-border">
                  <span className="text-sm text-muted-foreground">{tier.resources}</span>
                </div>

                {/* Outcomes */}
                <ul className="space-y-3">
                  {tier.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[hsl(var(--biz-navy))]">
                      <Check className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto">
          <strong>Note:</strong> Final pricing is determined after discovery call based on your specific scope and requirements. 
          All proposals include transparent breakdown with no hidden fees.
        </p>
      </div>
    </section>
  );
};

export default CustomRequestInvestment;

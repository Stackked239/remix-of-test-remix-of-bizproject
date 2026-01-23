import { useState } from "react";
import { Users, Target, Rocket, Check, Clock, DollarSign } from "lucide-react";

type EngagementType = "TYPE_A" | "TYPE_B" | "TYPE_C" | null;

interface EngagementCard {
  id: EngagementType;
  icon: React.ElementType;
  badge?: string;
  title: string;
  description: string;
  duration: string;
  investment: string;
  benefits: string[];
  idealFor: string[];
  featured?: boolean;
}

const engagementCards: EngagementCard[] = [
  {
    id: "TYPE_A",
    icon: Users,
    title: "Ongoing Support & Team Coaching",
    description: "Virtual facilitation, team coaching, capability building, and implementation oversight for organizations ready to invest in direct engagement.",
    duration: "30–90 days",
    investment: "$2,000–$5,000+",
    benefits: [
      "Direct access to expert advisor",
      "Real-time team coaching & feedback",
      "Implementation accountability",
      "Post-engagement capability building materials",
    ],
    idealFor: [
      "Organizations needing external facilitation + accountability",
      "Teams with strong internal execution capacity",
      "Pre-exit capability building",
      "Initiatives with clear scope and 30–90 day timeline",
    ],
  },
  {
    id: "TYPE_B",
    icon: Target,
    badge: "MOST POPULAR",
    title: "Strategic Consulting & Planning",
    description: "Specialized expertise in strategic planning for scaling organizations, operational redesign, business model innovation, financial restructuring, leadership team development, and exit prep.",
    duration: "90–180 days",
    investment: "$7,000–$15,000+",
    benefits: [
      "Expert-led strategic roadmap (12–24 months)",
      "Risk analysis & mitigation strategies",
      "Operational optimization: 15–25% efficiency gains",
      "Market-tested frameworks & strategic clarity",
    ],
    idealFor: [
      "Leaders preparing for exit/acquisition",
      "Organizations undertaking major restructuring",
      "Strategic initiatives (expansion, pivot, M&A)",
      "Situations requiring external validation & credibility",
    ],
    featured: true,
  },
  {
    id: "TYPE_C",
    icon: Rocket,
    title: "Full Project Management & Execution",
    description: "End-to-end execution of major transformation projects with dedicated project manager, lead advisor, and implementation team. Ideal for company-wide initiatives.",
    duration: "120–240 days",
    investment: "$18,000–$25,000+",
    benefits: [
      "Dedicated PM + lead advisor + implementation team",
      "Full execution ownership & accountability",
      "Measurable outcomes: 20–30% efficiency gains",
      "Post-project team capability building",
    ],
    idealFor: [
      "Organizations undertaking company-wide transformation",
      "Major change management initiatives",
      "Complex multi-functional projects",
      "Situations requiring absolute certainty & accountability",
    ],
  },
];

const CustomRequestEngagementTypes = () => {
  const [selectedType, setSelectedType] = useState<EngagementType>(null);

  const handleCardClick = (type: EngagementType) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <section id="engagement-types" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[hsl(var(--biz-navy))] mb-4">
            Three Engagement Types to Match Your Needs
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the engagement level that fits your organization's goals, timeline, and investment capacity.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {engagementCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                relative bg-card rounded-xl p-6 cursor-pointer transition-all duration-300
                border-2 hover:shadow-lg
                ${card.featured 
                  ? "border-[hsl(var(--biz-teal))] shadow-[var(--shadow-hub-teal)]" 
                  : "border-border hover:border-[hsl(var(--biz-teal))]"
                }
                ${selectedType === card.id 
                  ? "border-[hsl(var(--biz-teal))] bg-[hsl(var(--biz-teal))]/[0.04] shadow-lg transform -translate-y-1" 
                  : ""
                }
              `}
            >
              {/* Badge */}
              {card.badge && (
                <div className="absolute -top-3 left-5 bg-[hsl(var(--biz-teal))] text-white text-xs font-bold px-3 py-1 rounded tracking-wider">
                  {card.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center mb-5
                ${card.featured 
                  ? "bg-[hsl(var(--biz-teal))]" 
                  : "bg-[hsl(var(--biz-navy))]/10"
                }
              `}>
                <card.icon className={`w-7 h-7 ${card.featured ? "text-white" : "text-[hsl(var(--biz-navy))]"}`} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-montserrat font-semibold text-[hsl(var(--biz-navy))] mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {card.description}
              </p>

              {/* Duration & Investment */}
              <div className="flex items-center justify-between py-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{card.duration}</span>
                </div>
                <div className="text-lg font-bold text-[hsl(var(--biz-teal))]">
                  {card.investment}
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-[hsl(var(--biz-navy))] uppercase tracking-wide mb-3">
                  Key Benefits
                </h4>
                <ul className="space-y-2">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[hsl(var(--biz-navy))]">
                      <Check className="w-4 h-4 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className="mt-5 pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-[hsl(var(--biz-navy))] uppercase tracking-wide mb-3">
                  Ideal For
                </h4>
                <ul className="space-y-2">
                  {card.idealFor.map((item, index) => (
                    <li key={index} className="text-xs text-muted-foreground leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection Indicator */}
              {selectedType === card.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-[hsl(var(--biz-teal))] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Helper Text */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Not sure which is right for you? <span className="text-[hsl(var(--biz-teal))] font-medium cursor-pointer hover:underline" onClick={() => document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" })}>Tell us about your challenge</span> and we'll recommend the best fit.
        </p>
      </div>
    </section>
  );
};

export default CustomRequestEngagementTypes;

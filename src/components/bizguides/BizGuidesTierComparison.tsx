import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScheduleSessionModal from "./ScheduleSessionModal";

interface TierData {
  id: string;
  label: string;
  headline: string;
  subheadline: string;
  bestFor: string;
  features: string[];
  pricing: string;
  pricingNote: string;
  ctaText: string;
  ctaLink: string;
  secondaryCta: string;
  isFeatured: boolean;
  guarantee?: string;
  timeline?: string;
  isModal?: boolean;
}

const tiers: TierData[] = [
  {
    id: "tier1",
    label: "TIER 1",
    headline: "Business Insights & Strategies",
    subheadline: "Start with free, research-backed articles on the gaps your diagnostic uncovered.",
    bestFor: "Founders who want to explore solutions at their own pace. Ideal if you're evaluating options or want quick answers on specific topics.",
    features: [
      "Library of 50+ expert-written articles on top business gaps",
      "Actionable insights & frameworks (cash flow, hiring, scaling, leadership)",
      "Templates, checklists, and downloadable resources",
      "Access to BizGuides community forum (peer networking, Q&A)",
      "Regular updates based on latest diagnostic trends"
    ],
    pricing: "FREE",
    pricingNote: "No credit card required",
    ctaText: "Browse Free Resources",
    ctaLink: "/blog",
    secondaryCta: "Upgrade to coaching →",
    isFeatured: false
  },
  {
    id: "tier2",
    label: "TIER 2",
    headline: "1:1 Expert Coaching & Consulting",
    subheadline: "Get matched with a coach or consultant who specializes in your industry and growth stage.",
    bestFor: "Founders and executives who want hands-on guidance. You need expert advice tailored to your specific situation, not generic templates.",
    features: [
      "Expert matching based on industry, revenue stage, and challenge",
      "Flexible scheduling: once, weekly, monthly, or as needed",
      "60-minute focused coaching calls via video or phone",
      "Personalized action plan after each session",
      "Complimentary access to BizGrowth Academy courses",
      "Email support between sessions (48-hour response)",
      "Online scheduling via BizGuides Scheduling Agent (Coming March 2026)"
    ],
    pricing: "$149–$299",
    pricingNote: "per hour",
    guarantee: "If your first session doesn't provide clear value, we'll refund 100%.",
    ctaText: "Schedule Your First Session",
    ctaLink: "",
    secondaryCta: "See how it works →",
    isFeatured: true,
    isModal: true
  },
  {
    id: "tier3",
    label: "TIER 3",
    headline: "Custom Tailored Solutions",
    subheadline: "For teams needing org-wide transformation, project-based support, or specialized expertise.",
    bestFor: "Growing companies ready to invest in transformation. You need a custom plan—whether that's org restructuring, pre-exit advisory, multi-person training, or specialized consulting.",
    features: [
      "Dedicated engagement tailored to your specific situation",
      "Custom scope of work and project plan (co-created with you)",
      "Dedicated advisor (your primary point of contact)",
      "Flexible formats: workshops, whiteboarding, one-on-one advising, team training",
      "Custom deliverables: roadmaps, playbooks, org structures, training materials",
      "Multi-touch support: ongoing check-ins, adjustments, optimization",
      "Integration with BizGrowth Academy & BizTools"
    ],
    pricing: "CUSTOM",
    pricingNote: "Based on scope",
    timeline: "Most projects: 6–12 weeks | Investment range: $3K–$25K+",
    ctaText: "Request a Custom Solution",
    ctaLink: "/contact",
    secondaryCta: "Schedule a discovery call →",
    isFeatured: false
  }
];

const BizGuidesTierComparison = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToFaq = () => {
    const element = document.getElementById('faq-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTierCta = (tier: TierData) => {
    if (tier.isModal) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section id="tier-comparison" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Three Ways to Get Expert Guidance
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with insights. Move to coaching. Scale with custom solutions. Your timeline, your budget.
            </p>
          </motion.div>

          {/* Tier Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                className={`relative bg-background rounded-2xl p-8 flex flex-col ${
                  tier.isFeatured 
                    ? 'border-2 border-[hsl(var(--biz-teal))] shadow-xl shadow-[hsl(var(--biz-teal))]/10 lg:scale-[1.02] z-10' 
                    : 'border border-border/50 shadow-md'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Featured Badge */}
                {tier.isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(var(--biz-teal))] text-background font-montserrat font-semibold text-xs px-4 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-5">
                  <span className="font-montserrat text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {tier.label}
                  </span>
                  <h3 className="font-montserrat font-bold text-xl md:text-2xl text-foreground mt-2 mb-2">
                    {tier.headline}
                  </h3>
                  <p className="font-open-sans text-[15px] text-muted-foreground leading-snug">
                    {tier.subheadline}
                  </p>
                </div>

                {/* Best For */}
                <div className="bg-[hsl(var(--biz-teal))]/5 rounded-lg p-4 mb-5">
                  <span className="font-montserrat text-xs font-semibold text-[hsl(var(--biz-teal))] uppercase tracking-wide">
                    Best For
                  </span>
                  <p className="font-open-sans text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {tier.bestFor}
                  </p>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[hsl(var(--biz-teal))] flex-shrink-0 mt-0.5" />
                      <span className="font-open-sans text-sm text-muted-foreground leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="text-center py-5 border-t border-border/50 mt-auto">
                  <span className="font-montserrat font-bold text-3xl text-foreground">
                    {tier.pricing}
                  </span>
                  <p className="font-open-sans text-sm text-muted-foreground mt-1">
                    {tier.pricingNote}
                  </p>
                  {tier.timeline && (
                    <p className="font-open-sans text-xs text-muted-foreground mt-2">
                      {tier.timeline}
                    </p>
                  )}
                </div>

                {/* Guarantee (Tier 2 only) */}
                {tier.guarantee && (
                  <div className="bg-[hsl(var(--biz-teal))]/10 rounded-lg p-3 text-center mb-4">
                    <p className="font-open-sans text-sm text-[hsl(var(--biz-teal))] font-medium">
                      💰 {tier.guarantee}
                    </p>
                  </div>
                )}

                {/* CTAs */}
                <div className="space-y-3">
                  {tier.isModal ? (
                    <Button 
                      size="lg"
                      onClick={() => handleTierCta(tier)}
                      className={`w-full font-montserrat font-semibold ${
                        tier.isFeatured 
                          ? 'bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-background shadow-lg shadow-[hsl(var(--biz-teal))]/20' 
                          : 'bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-background'
                      }`}
                    >
                      {tier.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      asChild
                      size="lg"
                      className={`w-full font-montserrat font-semibold ${
                        tier.isFeatured 
                          ? 'bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-background shadow-lg shadow-[hsl(var(--biz-teal))]/20' 
                          : 'bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-background'
                      }`}
                    >
                      <Link to={tier.ctaLink}>
                        {tier.ctaText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                  
                  <button 
                    onClick={scrollToFaq}
                    className="w-full text-center font-open-sans text-sm text-[hsl(var(--biz-teal))] hover:text-[hsl(180,100%,30%)] transition-colors"
                  >
                    {tier.secondaryCta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Session Modal */}
      <ScheduleSessionModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
};

export default BizGuidesTierComparison;

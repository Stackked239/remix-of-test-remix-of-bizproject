import { Award, TrendingUp, Star } from "lucide-react";

const trustBadges = [
  {
    icon: Award,
    stat: "50+",
    label: "Years Combined Experience",
    description: "Across 20+ Industries",
  },
  {
    icon: TrendingUp,
    stat: "85%+",
    label: "Clients See 15%+ Efficiency Gains",
    description: "Within 90 Days",
  },
  {
    icon: Star,
    stat: "4.8/5",
    label: "Average Client Satisfaction",
    description: "(50+ Recent Engagements)",
  },
];

const CustomRequestTrustSignals = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-5 md:px-8">
        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-7 text-center border border-[hsl(var(--biz-teal))]/10"
            >
              <div className="w-14 h-14 bg-[hsl(var(--biz-teal))]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-7 h-7 text-[hsl(var(--biz-teal))]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--biz-teal))] mb-2">
                {badge.stat}
              </div>
              <div className="text-sm font-semibold text-[hsl(var(--biz-navy))] uppercase tracking-wide leading-snug mb-1">
                {badge.label}
              </div>
              <div className="text-xs text-muted-foreground italic">
                {badge.description}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Copy */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base md:text-lg text-[hsl(var(--biz-navy))] leading-relaxed">
            <strong>You're in good hands.</strong> Our team has helped 200+ companies scale faster 
            and operate smarter. Your custom engagement will be led by experienced 
            advisors who've been exactly where you are.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomRequestTrustSignals;

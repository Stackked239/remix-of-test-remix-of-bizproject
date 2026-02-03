import { Users, Target, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const trustHighlights = [
  {
    icon: Users,
    headline: "50+ Vetted Coaches & Advisors",
    description: "Coaches, consultants, and advisors across 15+ industries. Average experience: 12+ years in business scaling and leadership."
  },
  {
    icon: Target,
    headline: "Industry Specialists",
    description: "Your expert is matched based on your specific industry (e.g., e-commerce, professional services, tech). No generic advice."
  },
  {
    icon: TrendingUp,
    headline: "Growth Stage Alignment",
    description: "Whether bootstrapped, post-funding, or scaling to 7 figures—your expert has scaled at your stage."
  },
  {
    icon: CheckCircle,
    headline: "Real-World Results",
    description: "Clients report 15–20% efficiency gains, clearer 12-month roadmaps, and team alignment within 60 days."
  }
];

const BizGuidesTrustSignals = () => {
  return (
    <section className="py-20 bg-[hsl(var(--biz-teal))]/[0.03]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
            Your Matched Expert Is...
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground">
            Every BizGuides coach is vetted for 5+ years of relevant experience, industry expertise, and a track record of helping businesses like yours. We don't match consultants—we match partners who get your world.
          </p>
        </motion.div>

        {/* Trust Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {trustHighlights.map((item, index) => (
            <motion.div
              key={item.headline}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-[hsl(var(--biz-teal))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-[hsl(var(--biz-teal))]" strokeWidth={1.5} />
              </div>
              
              <h3 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                {item.headline}
              </h3>
              
              <p className="font-open-sans text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BizGuidesTrustSignals;

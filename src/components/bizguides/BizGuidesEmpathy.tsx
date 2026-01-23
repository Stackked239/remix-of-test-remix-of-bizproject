import { ClipboardList, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

const painPoints = [
  {
    icon: ClipboardList,
    headline: "Insights Overload",
    body: "Twelve categories. Clear scores. But which gaps matter most? Where do you even start? The report is thorough, but implementation feels overwhelming."
  },
  {
    icon: Clock,
    headline: "Time Poverty",
    body: "You're juggling operations, cash flow, hiring, and growth. Spending months with a consultant isn't realistic. You need answers in focused sessions—not endless meetings."
  },
  {
    icon: Target,
    headline: "Uncertainty",
    body: "Is this gap critical to fix first? Can you solve it yourself? Should you hire? The questions multiply faster than answers arrive. You need expert confidence, not more complexity."
  }
];

const BizGuidesEmpathy = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-6">
            Your BizHealth Report Revealed the Gaps.
            <br />
            <span className="text-[hsl(var(--biz-teal))]">Now Comes the Hard Part.</span>
          </h2>
          
          <p className="font-open-sans text-lg text-muted-foreground leading-relaxed">
            You have clarity on where your business stands—12 diagnostic categories, clear scores, peer benchmarks. But translating that insight into action? That's where most leaders get stuck. You're juggling operations, cash flow, and team management. A 6-month consulting engagement isn't realistic. You need expert guidance that fits your timeline and budget.
          </p>
        </motion.div>

        {/* Pain Point Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.headline}
              className="bg-background rounded-xl p-7 border border-border/50 border-t-4 border-t-[hsl(var(--biz-teal))] shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <point.icon className="w-10 h-10 text-[hsl(var(--biz-teal))] mb-4" strokeWidth={1.5} />
              
              <h3 className="font-montserrat font-semibold text-xl text-foreground mb-3">
                {point.headline}
              </h3>
              
              <p className="font-open-sans text-[15px] text-muted-foreground leading-relaxed">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BizGuidesEmpathy;

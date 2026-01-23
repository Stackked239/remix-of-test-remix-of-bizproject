import { ShoppingCart, Briefcase, Code } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: ShoppingCart,
    industry: "Retail / E-commerce",
    challenge: "Revenue growing 40%/year but margins shrinking; operations chaos",
    expertType: "Operations/Supply Chain Coach",
    outcome: "Implemented inventory optimization → 20% margin gain in 90 days. Hired ops lead confidently."
  },
  {
    icon: Briefcase,
    industry: "Professional Services",
    challenge: "Team of 8 but can't scale beyond founder. HR, delegation, culture falling apart.",
    expertType: "HR/People Coach",
    outcome: "Restructured roles, hired ops manager, created career paths. Team morale +40%."
  },
  {
    icon: Code,
    industry: "SaaS / Tech",
    challenge: "First product hit stall; need strategic clarity before pivot. Burning out juggling 5 directions.",
    expertType: "Business Strategy Coach",
    outcome: "Ran diagnostic + 3 coaching sessions → Clear focus on 2 product lines. Hired CTO. Refocused on leadership."
  }
];

const BizGuidesUseCases = () => {
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
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
            See How Others Are Using BizGuides
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground">
            Whether you're an e-commerce founder scaling inventory, a services leader aligning your team, or a tech startup preparing to raise—BizGuides matches you with experts who've solved similar challenges.
          </p>
        </motion.div>

        {/* Use Case Cards */}
        <div className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.industry}
              className="bg-muted/30 rounded-xl p-7 border border-border/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Industry Badge */}
              <div className="inline-flex items-center gap-2 bg-[hsl(var(--biz-teal))]/10 text-[hsl(var(--biz-teal))] font-montserrat text-xs font-semibold px-3 py-1.5 rounded mb-5">
                <useCase.icon className="w-4 h-4" />
                {useCase.industry}
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <span className="font-montserrat text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Challenge
                </span>
                <p className="font-open-sans text-sm text-muted-foreground mt-1 leading-relaxed">
                  "{useCase.challenge}"
                </p>
              </div>

              {/* Expert Type */}
              <div className="mb-4">
                <span className="font-montserrat text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Expert Matched
                </span>
                <p className="font-open-sans text-sm text-foreground font-medium mt-1">
                  {useCase.expertType}
                </p>
              </div>

              {/* Outcome */}
              <div>
                <span className="font-montserrat text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Outcome
                </span>
                <p className="font-open-sans text-sm text-foreground font-medium mt-1 leading-relaxed">
                  {useCase.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BizGuidesUseCases;

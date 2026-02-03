import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { number: "1", title: "Select Your Tier", description: "Essentials ($199), Growth ($499), or Enterprise ($799)" },
  { number: "2", title: "Complete Questionnaire", description: "30-40 minutes covering all 12 business dimensions" },
  { number: "3", title: "Receive Analysis", description: "90-minute turnaround with detailed insights" },
  { number: "4", title: "Implement & Grow", description: "Prioritized recommendations with clear roadmaps" },
];

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy-deep))] to-[hsl(237,45%,15%)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
            Ready for a Comprehensive Business Health Evaluation?
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Get multi-dimensional analysis across 12 business areas in 90 minutes. 
            Start at $199 and discover exactly what's working—and what needs attention.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--biz-citrine))] hover:bg-[hsl(var(--biz-citrine))]/90 text-[hsl(var(--biz-navy))] font-semibold px-8 py-6 text-lg"
            >
              <Link to="/pricing" className="flex items-center gap-2">
                Start Your Assessment Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg bg-transparent"
            >
              <Link to="/pricing">Compare Pricing Tiers</Link>
            </Button>
          </div>

          {/* Process Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-left bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--biz-citrine))] text-[hsl(var(--biz-navy))] flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-white/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

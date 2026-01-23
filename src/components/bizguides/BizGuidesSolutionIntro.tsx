import { Compass } from "lucide-react";
import { motion } from "framer-motion";

const BizGuidesSolutionIntro = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-[hsl(var(--biz-teal))]/[0.03]">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Divider with Icon */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-0.5 bg-[hsl(var(--biz-teal))]" />
            <div className="p-3 rounded-full bg-[hsl(var(--biz-teal))]/10">
              <Compass className="w-10 h-10 text-[hsl(var(--biz-teal))]" strokeWidth={1.5} />
            </div>
            <div className="w-20 h-0.5 bg-[hsl(var(--biz-teal))]" />
          </div>

          {/* Tagline */}
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-[40px] text-foreground mb-6">
            Where Insights Meet <span className="text-[hsl(var(--biz-teal))]">Execution</span>
          </h2>

          {/* Supporting Copy */}
          <p className="font-open-sans text-lg text-muted-foreground leading-relaxed mb-4">
            BizGuides connects you with vetted coaches, consultants, and advisors who specialize in your industry and growth stage. Whether you need quick answers, ongoing guidance, or a full organizational transformation, we match you with the right expert—on your timeline, at your budget.
          </p>
          
          <p className="font-open-sans text-lg text-foreground font-medium">
            Move from stuck to scaling with guidance powered by your business reality, not generic playbooks.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BizGuidesSolutionIntro;

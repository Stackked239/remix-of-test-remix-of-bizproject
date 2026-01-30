import { motion } from "framer-motion";
import { BookOpen, Target, Settings, Compass, AlertTriangle, BarChart3 } from "lucide-react";

const frameworks = [
  {
    icon: BookOpen,
    name: "McKinsey 7S Model",
    focus: "Strategic Alignment",
    reveals: "How well all organizational elements align",
    origin: "McKinsey & Company (1980s)"
  },
  {
    icon: Target,
    name: "Balanced Scorecard",
    focus: "Performance Measurement",
    reveals: "Leading/lagging indicators across 4 perspectives",
    origin: "Kaplan & Norton (1992)"
  },
  {
    icon: Settings,
    name: "Lean/Six Sigma",
    focus: "Operational Excellence",
    reveals: "Process waste, variation, quality issues",
    origin: "Toyota & Motorola (1980s)"
  },
  {
    icon: Compass,
    name: "OKRs",
    focus: "Goal Achievement",
    reveals: "Progress toward ambitious objectives",
    origin: "Andy Grove, Intel (1970s)"
  },
  {
    icon: AlertTriangle,
    name: "Enterprise Risk Management",
    focus: "Risk Identification",
    reveals: "Strategic, operational, financial risks",
    origin: "COSO, ISO 31000"
  },
  {
    icon: BarChart3,
    name: "Porter's Five Forces",
    focus: "Competitive Positioning",
    reveals: "Market dynamics and competitive pressures",
    origin: "Michael Porter, HBS (1979)"
  }
];

const FrameworksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" id="frameworks">
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
            Built on Proven Business Frameworks
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BizHealth.ai integrates established methodologies validated by decades 
            of business research and real-world application
          </p>
        </motion.div>

        {/* Frameworks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {frameworks.map((framework, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 flex items-center justify-center mb-4">
                <framework.icon className="w-6 h-6 text-[#4285F4]" />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-[hsl(var(--biz-navy))] mb-3 font-heading">
                {framework.name}
              </h3>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground w-16 shrink-0">Focus:</span>
                  <span className="text-muted-foreground">{framework.focus}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground w-16 shrink-0">Reveals:</span>
                  <span className="text-muted-foreground">{framework.reveals}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground w-16 shrink-0">Origin:</span>
                  <span className="text-muted-foreground">{framework.origin}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-[hsl(var(--biz-navy))]/5 rounded-2xl p-8 text-center max-w-4xl mx-auto"
        >
          <p className="text-lg text-muted-foreground">
            <strong className="text-[hsl(var(--biz-navy))]">Rather than running 6+ separate assessments,</strong> BizHealth.ai 
            synthesizes these frameworks into a single comprehensive evaluation that 
            shows interconnections and prioritized recommendations addressing root 
            causes—not just symptoms.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameworksSection;

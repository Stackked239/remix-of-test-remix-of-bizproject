import { motion } from "framer-motion";
import { BookOpen, Database, ShieldCheck } from "lucide-react";

const trustBlocks = [
  {
    icon: BookOpen,
    title: "Frameworks & Methodologies",
    items: [
      "McKinsey 7S Model",
      "Balanced Scorecard",
      "Lean/Six Sigma Principles",
      "EOS (Entrepreneurial Operating System) / Traction",
      "OKRs (Objectives and Key Results)",
      "SWOT Analysis",
      "Porter's Five Forces",
      "Value Chain Analysis",
    ],
  },
  {
    icon: Database,
    title: "Data Sources & Benchmarks",
    items: [
      "U.S. Small Business Administration (SBA)",
      "IBISWorld",
      "Gartner",
      "McKinsey & Company",
      "OECD",
      "Industry-specific performance metrics",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    items: [
      "Bank-level encryption (AES-256)",
      "SOC 2 Type II Certified",
      "GDPR Compliant",
      "CCPA Compliant",
      "Your data is never shared with third parties",
    ],
  },
];

const TrustSignals = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
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
            Trust Signals & Authority
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on proven frameworks, authoritative data, and enterprise-grade security
          </p>
        </motion.div>

        {/* Trust Blocks Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trustBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[hsl(var(--biz-navy))]/10 mb-4">
                <block.icon className="w-8 h-8 text-[hsl(var(--biz-navy))]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[hsl(var(--biz-navy))] mb-4 font-heading">
                {block.title}
              </h3>

              {/* Items List */}
              <ul className="space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--biz-citrine))] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;

import { motion } from "framer-motion";
import { 
  Compass, DollarSign, Settings, Users, TrendingUp, Cpu, 
  Crown, Shield, Heart, Truck, Scale, Leaf 
} from "lucide-react";

const dimensions = [
  {
    icon: Compass,
    title: "Strategic",
    color: "blue",
    items: [
      "Vision & Mission Clarity",
      "Strategic Planning Maturity",
      "Goal Setting & OKRs",
      "Competitive Positioning",
      "Market Opportunity Assessment"
    ]
  },
  {
    icon: DollarSign,
    title: "Financial",
    color: "green",
    items: [
      "Cash Flow Management",
      "Profitability Analysis",
      "Financial Forecasting",
      "Working Capital Optimization",
      "Fundraising Readiness"
    ]
  },
  {
    icon: Settings,
    title: "Operational",
    color: "amber",
    items: [
      "Process Documentation & SOPs",
      "Efficiency & Lean Optimization",
      "Quality Management",
      "Capacity Utilization",
      "Supply Chain Integration"
    ]
  },
  {
    icon: Users,
    title: "Human Capital",
    color: "purple",
    items: [
      "Talent Acquisition & Retention",
      "Organizational Culture",
      "Performance Management",
      "Leadership Development",
      "Team Collaboration"
    ]
  },
  {
    icon: TrendingUp,
    title: "Commercial",
    color: "cyan",
    items: [
      "Sales Pipeline Management",
      "Marketing ROI",
      "Customer Acquisition Cost",
      "Brand Positioning",
      "Go-to-Market Strategy"
    ]
  },
  {
    icon: Cpu,
    title: "Technology",
    color: "indigo",
    items: [
      "Systems Integration",
      "Automation Opportunities",
      "Cybersecurity & Data Protection",
      "Digital Transformation",
      "Innovation Pipeline"
    ]
  },
  {
    icon: Crown,
    title: "Leadership",
    color: "rose",
    items: [
      "Management Effectiveness",
      "Decision-Making Quality",
      "Succession Planning",
      "Executive Alignment",
      "Change Management"
    ]
  },
  {
    icon: Shield,
    title: "Risk",
    color: "orange",
    items: [
      "Enterprise Risk Management",
      "Compliance & Regulatory",
      "Insurance & Asset Protection",
      "Business Continuity",
      "Crisis Management"
    ]
  },
  {
    icon: Heart,
    title: "Customer",
    color: "pink",
    items: [
      "Customer Satisfaction (CSAT/NPS)",
      "Journey Optimization",
      "Retention & Churn",
      "Customer Lifetime Value",
      "Support Quality"
    ]
  },
  {
    icon: Truck,
    title: "Supply Chain",
    color: "teal",
    items: [
      "Vendor Relationships",
      "Inventory Optimization",
      "Logistics & Distribution",
      "Procurement Process",
      "Supplier Diversity"
    ]
  },
  {
    icon: Scale,
    title: "Legal",
    color: "slate",
    items: [
      "Contract Management",
      "IP Protection",
      "Labor Compliance",
      "Corporate Governance",
      "Dispute Resolution"
    ]
  },
  {
    icon: Leaf,
    title: "Sustainability",
    color: "emerald",
    items: [
      "Environmental Impact (ESG)",
      "Social Responsibility",
      "Ethics Standards",
      "Long-Term Viability",
      "Stakeholder Engagement"
    ]
  }
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600",
  green: "bg-green-500/10 text-green-600",
  amber: "bg-amber-500/10 text-amber-600",
  purple: "bg-purple-500/10 text-purple-600",
  cyan: "bg-cyan-500/10 text-cyan-600",
  indigo: "bg-indigo-500/10 text-indigo-600",
  rose: "bg-rose-500/10 text-rose-600",
  orange: "bg-orange-500/10 text-orange-600",
  pink: "bg-pink-500/10 text-pink-600",
  teal: "bg-teal-500/10 text-teal-600",
  slate: "bg-slate-500/10 text-slate-600",
  emerald: "bg-emerald-500/10 text-emerald-600",
};

const DimensionsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="dimensions">
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
            12 Interconnected Business Dimensions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BizHealth.ai evaluates your entire business ecosystem—not just 
            isolated areas—showing how each dimension affects the others
          </p>
        </motion.div>

        {/* Dimensions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {dimensions.map((dimension, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[dimension.color]}`}>
                  <dimension.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--biz-navy))] font-heading">
                  {dimension.title}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-2">
                {dimension.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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

export default DimensionsSection;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Wrench, Crown, ArrowRight } from "lucide-react";

const resources = [
  {
    icon: Users,
    title: "BizGuides",
    description: "Expert consulting sessions for hands-on guidance across all 12 assessment areas",
    href: "/bizguides",
    color: "biz-green"
  },
  {
    icon: GraduationCap,
    title: "BizGrowth Academy",
    description: "Structured courses covering business fundamentals, advanced strategies, and leadership development",
    href: "/bizgrowth",
    color: "biz-citrine"
  },
  {
    icon: Wrench,
    title: "BizTools",
    description: "Templates, calculators, and frameworks for financial planning, process mapping, and strategic planning",
    href: "/biztools",
    color: "biz-blue"
  },
  {
    icon: Crown,
    title: "BizLeaDeR",
    description: "Leadership training modules, team development resources, and management best practices",
    href: "/bizleader",
    color: "purple"
  }
];

const colorClasses: Record<string, string> = {
  "biz-green": "bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))]",
  "biz-citrine": "bg-[hsl(var(--biz-citrine))]/10 text-[hsl(var(--biz-citrine))]",
  "biz-blue": "bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))]",
  "purple": "bg-purple-500/10 text-purple-600"
};

const RelatedResources = () => {
  return (
    <section className="py-16 md:py-24 bg-background" id="resources">
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
            Related Resources for Gemini Users
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore BizHealth.ai's complete ecosystem for comprehensive implementation support
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link 
                to={resource.href}
                className="block bg-card rounded-xl border border-border p-6 hover:shadow-md hover:border-[hsl(var(--biz-green))] transition-all group h-full"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[resource.color]}`}>
                  <resource.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[hsl(var(--biz-navy))] mb-2 font-heading group-hover:text-[hsl(var(--biz-green))] transition-colors">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">
                  {resource.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-sm font-medium text-[hsl(var(--biz-green))]">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedResources;

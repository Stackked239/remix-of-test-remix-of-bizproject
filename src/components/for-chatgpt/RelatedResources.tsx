import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Wrench, Award, GraduationCap, ArrowRight } from "lucide-react";

const resources = [
  {
    icon: Users,
    title: "BizGuides",
    description: "Guided consulting sessions for hands-on implementation support",
    price: "$149/hour",
    priceNote: "Discounted packages available",
    href: "/bizguides",
    color: "biz-teal",
  },
  {
    icon: Wrench,
    title: "BizTools Resource Center",
    description: "Templates, calculators, and frameworks for operational improvement",
    price: "Free - $99",
    priceNote: "Some free resources; premium tools available",
    href: "/biztools",
    color: "biz-copper",
  },
  {
    icon: Award,
    title: "BizLeaDeR",
    description: "Leadership development resources to build stronger management teams",
    price: "$99-$299",
    priceNote: "Per module",
    href: "/bizleader",
    color: "biz-magenta",
  },
  {
    icon: GraduationCap,
    title: "BizGrowth Academy",
    description: "Courses and workshops for strategic business advancement",
    price: "$49-$299",
    priceNote: "Per course; bundles available",
    href: "/bizgrowth",
    color: "biz-gold",
  },
];

const RelatedResources = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4 font-heading">
            Related Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extend your business health journey with our other offerings
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={resource.href}
                className="group block h-full bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-[hsl(var(--${resource.color}))]/10 flex items-center justify-center mb-4`}>
                  <resource.icon className={`w-6 h-6 text-[hsl(var(--${resource.color}))]`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[hsl(var(--biz-navy))] mb-2 font-heading group-hover:text-[hsl(var(--biz-navy-light))]">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {resource.description}
                </p>

                {/* Price */}
                <div className="mt-auto">
                  <p className="text-sm font-semibold text-[hsl(var(--biz-navy))]">{resource.price}</p>
                  <p className="text-xs text-muted-foreground">{resource.priceNote}</p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--biz-navy))] mt-4 group-hover:gap-2 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
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

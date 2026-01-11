import { BookOpen, Wrench, GraduationCap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const WhatWereLookingFor = () => {
  const categories = [
    {
      icon: "📚",
      title: "Content & Insights",
      hub: "BizGuides",
      items: [
        "Guides addressing specific pain points (cash flow, HR alignment, scaling)",
        "Industry-specific benchmarking data and reports",
        "Webinar topics on leadership, operations, and growth"
      ]
    },
    {
      icon: "🛠️",
      title: "Tools & Templates",
      hub: "BizTools",
      items: [
        "Spreadsheet templates for financial forecasting and budgeting",
        "Assessment checklists for readiness evaluations",
        "Capacity planning and resource allocation frameworks"
      ]
    },
    {
      icon: "📖",
      title: "Education & Leadership",
      hub: "BizGrowth Academy & BizLeaDeR",
      items: [
        "Courses on specific business functions (operations, sales, finance)",
        "Leadership development tracks for emerging executives",
        "Team capability certifications and training programs"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-biz-navy mb-4">
            What We're Looking For
          </h2>
          <p className="font-source-sans text-lg text-[#5C5C5C]">
            Ideas that help business leaders overcome real challenges
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-white border border-slate-100 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{category.icon}</div>
              
              {/* Title & Hub */}
              <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-1">
                {category.title}
              </h3>
              <p className="font-montserrat font-semibold text-sm text-biz-green mb-6">
                {category.hub}
              </p>
              
              {/* Items List */}
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" />
                    <span className="font-source-sans text-[#5C5C5C] text-sm leading-relaxed">
                      {item}
                    </span>
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

export default WhatWereLookingFor;

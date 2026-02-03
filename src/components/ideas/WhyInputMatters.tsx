import { Lightbulb, FlaskConical, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const WhyInputMatters = () => {
  const cards = [
    {
      icon: Lightbulb,
      title: "You Know Best",
      description: "You face the challenges every day. Your insights reveal opportunities we might miss from the outside."
    },
    {
      icon: FlaskConical,
      title: "We Build What Works",
      description: "We create tools SMBs actually need—not assumptions. Your feedback ensures we stay on target."
    },
    {
      icon: Star,
      title: "Every Idea Counts",
      description: "Every submission shapes our roadmap. Not every idea ships, but all of them influence what comes next."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
            <Sparkles className="w-4 h-4 text-biz-green" />
            <span className="text-[#5C5C5C] text-sm font-montserrat font-medium">Voice of Customer</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-biz-navy mb-4">
            Why Your Input Matters
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="font-source-sans text-lg text-[#5C5C5C]">
              Running a business means solving problems nobody warned you about. At BizHealth.ai, 
              we've spent five decades learning what SMB leaders actually need—not what consultants 
              think they need.
            </p>
            <p className="font-source-sans text-lg text-biz-navy font-medium">
              But we haven't heard everything yet. That's where you come in.{" "}
              <span className="text-[#5C5C5C] font-normal">
                We have hundreds of new concepts in the works, but hearing from you—as a customer and 
                active member of the BizHealth.ai ecosystem—is vital to staying relevant, engaged, and high-value.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-white border border-slate-100 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-biz-green to-biz-green/80 flex items-center justify-center mb-6 shadow-lg">
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-3">
                {card.title}
              </h3>
              <p className="font-source-sans text-[#5C5C5C] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyInputMatters;

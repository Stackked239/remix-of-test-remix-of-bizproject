import { Send, Search, Bell, Rocket, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: Send,
      number: 1,
      title: "You Submit",
      description: "Tell us what you need: content, tools, resources, or capabilities. Takes less than 5 minutes."
    },
    {
      icon: Search,
      number: 2,
      title: "We Review",
      description: "Our team evaluates every idea against ICP focus, strategic roadmap, and technical feasibility."
    },
    {
      icon: Bell,
      number: 3,
      title: "You Get Updates",
      description: "Receive status updates via email as your idea progresses through our review process."
    },
    {
      icon: Rocket,
      number: 4,
      title: "We Build & Launch",
      description: "Approved ideas become BizGuides, BizTools, BizLeaDeR resources, or Academy courses."
    },
    {
      icon: Trophy,
      number: 5,
      title: "We Celebrate",
      description: "You're recognized as a contributor when your idea ships. Join our community of innovators."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-biz-navy mb-4">
            How It Works
          </h2>
          <p className="font-source-sans text-lg text-[#5C5C5C]">
            From idea to implementation in 5 simple steps
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connector Line */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-biz-green/30 to-slate-200 rounded-full" />
          
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Circle - added bg-slate-50 to cover the line behind */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-biz-green to-biz-green/80 flex items-center justify-center shadow-lg z-10 mb-6 ring-4 ring-slate-50">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Step Number */}
                <div className="absolute top-16 -right-1 w-6 h-6 rounded-full bg-biz-navy text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step.number}
                </div>
                
                {/* Content */}
                <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-2">
                  {step.title}
                </h3>
                <p className="font-source-sans text-sm text-[#5C5C5C] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline - Vertical */}
        <div className="lg:hidden relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-biz-green/30 to-slate-200" />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative flex items-start gap-6 pl-4"
              >
                {/* Step Circle - added ring to cover the line behind */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-biz-green to-biz-green/80 flex items-center justify-center shadow-lg ring-4 ring-slate-50">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-biz-navy text-white text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-1">
                    {step.title}
                  </h3>
                  <p className="font-source-sans text-[#5C5C5C] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "We needed a cash flow forecasting template for our retail team. When we submitted the idea, we didn't expect much—but within 3 months, it launched in BizTools. Now our entire industry can benefit.",
      name: "Sarah Chen",
      title: "Founder, Retail Tech Solutions",
      initials: "SC"
    },
    {
      quote: "Seeing our suggestion become a BizGrowth Academy course on scaling sales made us feel like true partners with BizHealth.ai. They actually listen.",
      name: "Marcus Johnson",
      title: "CEO, Precision Manufacturing Co.",
      initials: "MJ"
    },
    {
      quote: "I asked for leadership assessment tools for my management team. Not only did they build it—they invited me to beta test and give feedback before launch.",
      name: "Jennifer Williams",
      title: "COO, Healthcare Services Group",
      initials: "JW"
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
            Ideas In Action
          </h2>
          <p className="font-source-sans text-lg text-[#5C5C5C]">
            See how customer ideas became real resources
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="relative bg-gradient-to-b from-white to-slate-50 border border-slate-100 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 left-6 w-10 h-10 text-biz-green/30" />
              
              {/* Quote Text */}
              <p className="font-source-sans text-biz-navy italic leading-relaxed mb-6 pt-8">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-biz-navy to-biz-green flex items-center justify-center">
                  <span className="text-white font-montserrat font-bold text-sm">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="font-montserrat font-bold text-biz-navy">
                    {testimonial.name}
                  </p>
                  <p className="font-source-sans text-sm text-[#5C5C5C]">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

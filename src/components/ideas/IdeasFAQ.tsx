import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IdeasFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What happens if my idea doesn't get approved?",
      answer: "We evaluate all ideas against our ICP focus, strategic roadmap, and technical feasibility. If we decide not to move forward, you'll receive a brief email explaining our reasoning. Many ideas are merged with similar submissions or revisited later as our capabilities evolve. Your idea still helps us understand what customers need."
    },
    {
      question: "How long does the review process take?",
      answer: "Typically 2-4 weeks for initial review. More complex ideas may require additional evaluation time. You'll receive status updates every two weeks until a final decision is made."
    },
    {
      question: "Will I be credited if my idea is developed?",
      answer: "Absolutely. We recognize contributors in launch communications, webinars, and our community. If you opt-in, your name will be featured alongside the resource you helped inspire."
    },
    {
      question: "Can multiple people submit the same idea?",
      answer: "Yes, and that's actually helpful! When we receive similar ideas from multiple customers, it signals strong demand and helps us prioritize. We'll merge similar submissions and notify all contributors—you might even collaborate with other founders during development."
    },
    {
      question: "What if I have an idea for the core assessment platform?",
      answer: "Great! We welcome those too. You can submit product feature requests here, or use our dedicated feedback form for assessment-specific suggestions. Either way, your input reaches our product team."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-biz-navy mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              className="bg-white border border-slate-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-montserrat font-semibold text-biz-navy pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-biz-green flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="font-source-sans text-[#5C5C5C] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeasFAQ;

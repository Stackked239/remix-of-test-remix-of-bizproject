import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Do I need expensive software to set up VoC?",
    answer: "No. You can start with Google Forms for surveys and a Google Sheet to track feedback. Many of the most successful systems started exactly this way. Premium tools help at scale, but they're optional."
  },
  {
    question: "How much time will this take to implement?",
    answer: "First win is 7 days (Module 5 shows you how). Full system is 90 days. After that, it's about 1-2 hours per week to maintain."
  },
  {
    question: "What if my customers don't respond to surveys?",
    answer: "Great question — this is super common. The trick is listening passively (reviews, support tickets, usage data) AND asking directly. Combined, you get high-quality feedback."
  },
  {
    question: "Won't asking for feedback annoy my customers?",
    answer: "Actually, the opposite. Customers appreciate being asked. They feel heard. The trick is asking at the right moment (not spamming)."
  },
  {
    question: "Can I do this alone, or do I need a team?",
    answer: "You can start solo. But as you scale, you'll want one person owning VoC and category owners handling specific feedback types. Module 6 shows how to build this."
  }
];

const Module1FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-10">
            Common Questions About VoC
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  aria-expanded={openItems.includes(index)}
                >
                  <span className="font-medium text-foreground pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module1FAQ;

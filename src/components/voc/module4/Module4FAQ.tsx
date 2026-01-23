import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Module4FAQProps {
  onView: () => void;
}

const Module4FAQ = ({ onView }: Module4FAQProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const faqs = [
    {
      question: "How quickly should I respond to feedback?",
      answer:
        "Ideally within 24 hours for acknowledgment, and within 48-72 hours with a substantive response. Research shows a 12% retention increase when you respond within 48 hours. Even if you don't have a solution yet, acknowledging the feedback immediately shows customers they're heard.",
    },
    {
      question: "What if I can't fix the issue the customer raised?",
      answer:
        "Be honest and transparent. Use the \"Honest No\" template from this module. Explain why you can't address it right now, what you're doing instead, and that you're tracking the suggestion for future consideration. Customers appreciate honesty more than empty promises.",
    },
    {
      question: "Should I respond to positive feedback too?",
      answer:
        "Absolutely! Thanking promoters reinforces their positive experience and can turn them into even stronger advocates. A simple \"Thank you for the kind words — it means a lot to our team\" goes a long way. Consider asking if they'd be willing to share a testimonial or referral.",
    },
    {
      question: "How do I close the loop on feedback from months ago?",
      answer:
        "It's never too late! Start with \"I know this was from [X months ago], but I wanted to follow up...\" Then explain what changes you've made since then. Customers are often pleasantly surprised to hear back on old feedback — it shows you truly care.",
    },
    {
      question: "Who should own the loop-closing process?",
      answer:
        "Assign a specific person or role responsible for each type of feedback. For small businesses, this might be the owner or a customer service lead. The key is clear ownership with deadlines. Vague responsibility leads to dropped loops.",
    },
    {
      question: "How do I track which loops have been closed?",
      answer:
        "Use your centralized feedback tracker from Module 2. Add columns for: Date Acknowledged, Owner Assigned, Action Taken, Date Closed, Customer Notified. A simple spreadsheet works — the key is consistency, not complexity.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-background"
      data-section="faq"
      data-section-number="8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Common questions about closing the loop on customer feedback.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-muted/30 rounded-xl border px-6 data-[state=open]:bg-muted/50"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4FAQ;

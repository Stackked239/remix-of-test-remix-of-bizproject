import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does the whole curriculum take?",
    answer: "About 90 minutes total across all 7 modules. Most owners complete it in 2-3 sessions. Each module is designed to be completed in 10-15 minutes, so you can fit it around your schedule."
  },
  {
    question: "I don't have time for fancy customer research. Will this work for me?",
    answer: "That's exactly who this is for. These are practical, low-effort methods that busy owners actually use. No surveys with 50 questions. No focus groups. Just simple systems you can implement in the gaps between running your business."
  },
  {
    question: "What if I already collect customer feedback?",
    answer: "Great — then you're ahead of most. The curriculum helps you organize what you're collecting, spot patterns you're missing, and actually act on what you learn. Module 3 (Analyze Patterns) and Module 5 (Close the Loop) are especially valuable if you already have some feedback coming in."
  },
  {
    question: "Is this only for certain industries?",
    answer: "No. The VoC principles work for any business that has customers — retail, service, B2B, online, brick-and-mortar. The examples cover a range of industries, and the templates are designed to be adapted to your specific business."
  },
  {
    question: "Do I need special software or tools?",
    answer: "No. Everything can be done with tools you already have — email, spreadsheets, and a notepad. We include templates that work in Google Sheets, Excel, or even on paper. If you want to upgrade later, we'll point you to good options, but they're never required."
  },
  {
    question: "What makes this different from reading a book on customer feedback?",
    answer: "Three things: (1) It's structured for action — each module ends with something you do, not just something you know. (2) You get templates and scripts ready to use today. (3) The personalized quiz gives you a starting point based on where your business actually is."
  },
  {
    question: "What if I get stuck or have questions?",
    answer: "Each module includes troubleshooting tips for common obstacles. If you need more guidance, BizGrowth Academy members have access to our community and coaching resources."
  }
];

const VocFAQ = () => {
  return (
    <section className="py-20 px-4 bg-muted/30" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[hsl(var(--biz-blue))]/10 text-[hsl(var(--biz-blue))] font-heading text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before getting started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-[hsl(var(--biz-green))]/50"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-[hsl(var(--biz-green))] py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
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

export default VocFAQ;

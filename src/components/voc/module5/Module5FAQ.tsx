import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "I didn't get many responses to my survey—is that a failure?",
    answer: "No. A 40% response rate is excellent (if you sent to 20 people and 8 responded, that's 40%). Even 3-4 responses reveal patterns. Proceed."
  },
  {
    question: "The pattern I found is not something I can change in 7 days.",
    answer: "Pick a different pattern. Or pick something RELATED that you can change. Example: If customers say \"website is slow,\" but you can't fix the underlying tech, at least add messaging: \"We're aware of performance issues and working on it.\" That's still closing the loop."
  },
  {
    question: "Nobody mentioned a specific problem—feedback was all positive.",
    answer: "Excellent. Send a different Day 2 survey asking \"What could we do even better?\" or \"What feature would make you use us more?\" Dig deeper."
  },
  {
    question: "I ran out of time—I'm only on Day 4.",
    answer: "That's okay. Finish Days 1, 4, and 7. Skip Days 2, 3, 5, 6 if needed. Collecting feedback (Day 4) + closing the loop (Day 7) are the non-negotiable minimum."
  },
  {
    question: "What if a customer complained about something really negative?",
    answer: "That's gold. That feedback prevents bigger problems. Respond with genuine thanks, explain what you're doing about it, and timeline for change. See Day 7 close-the-loop email."
  },
  {
    question: "Should I share this with my team?",
    answer: "Yes. On Day 3, when you're building the tracker, add your team. They hear customer feedback too—they should be part of the system."
  }
];

const Module5FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-navy))]/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[hsl(var(--biz-navy))]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Common Obstacles & Quick Fixes</h2>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-xl px-5 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5FAQ;

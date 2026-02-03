import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "How does the expert matching work?",
    answer: "After you describe your industry, growth stage, and specific challenge, our matching algorithm pairs you with 2–3 coaches who fit your profile. You choose which expert you want. If there's not a good fit, we'll re-match within 5 business days—no charge."
  },
  {
    question: "What if I'm just starting out?",
    answer: "BizGuides works great for early-stage founders. Our coaches have scaled from 0 to 7 figures and understand bootstrap realities. We have coaching tiers for solos and emerging founders."
  },
  {
    question: "How long until I see results?",
    answer: "Most clients see clarity and first action steps in their first session. Measurable business impact (10–15% efficiency gains) typically appears within 60–90 days of consistent implementation."
  },
  {
    question: "Can I start with free articles, then upgrade to coaching?",
    answer: "Absolutely. Many users start by exploring our free articles on their top diagnostic gaps, then schedule a session when they want deeper guidance. No pressure to upgrade."
  },
  {
    question: "What topics do coaches specialize in?",
    answer: "Our coaches specialize in the 12 BizHealth diagnostic areas: Strategy, Financials, HR, Operations, Sales, Marketing, Innovation, Customer Experience, Risk Management, Leadership, Culture, and Sustainability."
  },
  {
    question: "Is this like traditional consulting?",
    answer: "No. Traditional consulting is expensive ($10K+), slow (months of analysis), and often generic. BizGuides is affordable ($149–$299/hr), fast (you drive the frequency), and personalized. Think of it as a coach, not a consultant."
  },
  {
    question: "What if I'm in a scaling phase or preparing for an exit?",
    answer: "Perfect. Many coaches have experience with scaling, fundraising, M&A, and exits. If you need custom support (e.g., 10-week org restructuring or due-diligence prep), that's our Custom tier."
  },
  {
    question: "Can I cancel or change coaches?",
    answer: "Yes. You can pause, switch coaches, or cancel anytime. No contracts, no lock-ins. If a coaching relationship isn't working, we'll help re-match within 5 business days."
  },
  {
    question: "How is pricing structured?",
    answer: "PAID tier: $149–$299 per hour (varies by coach expertise). CUSTOM tier: Custom quote based on scope. You can book individual sessions, bundles, or monthly retainers. First session has a money-back guarantee."
  },
  {
    question: "When can I start?",
    answer: "FREE: Instantly. PAID: Expert matching within 48 hours; first session usually scheduled within 5 business days. CUSTOM: Discovery call scheduled within 2 business days."
  }
];

const BizGuidesFAQ = () => {
  return (
    <section id="faq-section" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
            Common Questions About BizGuides
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-1">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-border/50 py-1"
              >
                <AccordionTrigger className="font-montserrat font-semibold text-base md:text-[17px] text-foreground hover:text-[hsl(var(--biz-teal))] transition-colors text-left py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-open-sans text-[15px] text-muted-foreground leading-relaxed pb-5">
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

export default BizGuidesFAQ;

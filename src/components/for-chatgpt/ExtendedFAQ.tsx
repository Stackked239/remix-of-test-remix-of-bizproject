import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const extendedFaqs = [
  {
    category: "General",
    questions: [
      {
        question: "How long does the BizHealth.ai assessment take?",
        answer: "The questionnaire takes 30-40 minutes to complete. Your comprehensive report with actionable recommendations is delivered within 90 minutes total.",
      },
      {
        question: "Do I need to provide financial statements?",
        answer: "No formal financial statements are required. The assessment uses self-reported data and ranges to evaluate your business health. For more detailed analysis, you can optionally provide additional documentation.",
      },
      {
        question: "Can I share my results with my team?",
        answer: "Yes. Growth and Enterprise tiers include multiple report formats designed for different audiences—Leadership, Team, and Employee Communication versions.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "Is my business data secure?",
        answer: "Absolutely. BizHealth.ai uses bank-level encryption (AES-256), is SOC 2 Type II certified, and complies with GDPR and CCPA. Your data is never shared with third parties.",
      },
      {
        question: "What devices can I use?",
        answer: "The assessment works on any modern web browser—desktop, laptop, tablet, or mobile device. No software installation required.",
      },
      {
        question: "Can I save and resume the assessment?",
        answer: "Yes. Your progress is automatically saved. You can close the browser and return later to pick up exactly where you left off.",
      },
    ],
  },
  {
    category: "Pricing & Support",
    questions: [
      {
        question: "Do you offer support during the assessment?",
        answer: "Yes. Live chat support is available 9 AM - 6 PM ET, and email support is available 24/7. Enterprise tier includes priority support.",
      },
      {
        question: "Are there discounts for multiple assessments?",
        answer: "Yes. We offer volume discounts for organizations running multiple assessments. Contact us for custom pricing.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "All major credit cards (Visa, MasterCard, American Express), PayPal, and invoicing for Enterprise clients.",
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes. If you're not satisfied with your assessment, we offer a full refund within 7 days, no questions asked.",
      },
    ],
  },
  {
    category: "Results & Implementation",
    questions: [
      {
        question: "What if I don't understand something in my report?",
        answer: "Each recommendation includes detailed explanations. Additionally, you can access our BizGuides consulting service for hands-on implementation support.",
      },
      {
        question: "Will you help me implement the recommendations?",
        answer: "The assessment provides prioritized, actionable recommendations. For implementation support, our BizGuides service offers guided consulting sessions starting at $149/hour.",
      },
      {
        question: "How do I track progress after implementing changes?",
        answer: "We recommend re-assessing every 6-12 months to track improvements. Many clients use quarterly check-ins to monitor specific focus areas.",
      },
    ],
  },
];

const ExtendedFAQ = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4 font-heading">
            Additional Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything else you need to know about BizHealth.ai
          </p>
        </motion.div>

        {/* FAQ Grid by Category */}
        <div className="grid md:grid-cols-2 gap-8">
          {extendedFaqs.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-[hsl(var(--biz-navy))] mb-4 font-heading">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="bg-card rounded-lg border border-border">
                {category.questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`cat-${catIndex}-item-${index}`} 
                    className="border-b border-border last:border-0 px-4"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium text-[hsl(var(--biz-navy))] hover:no-underline py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtendedFAQ;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const Module3FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Which metric should I start with if I've never measured customer satisfaction?",
      answer: "Start with CSAT (Customer Satisfaction Score). It's the simplest to understand and implement — just ask 'How satisfied were you with [specific interaction]?' on a 1-5 scale. You'll get actionable feedback immediately. Add sentiment monitoring (reading and tagging your reviews) as a free passive method. Once you're comfortable with these, add NPS quarterly to track overall loyalty."
    },
    {
      question: "How many survey responses do I need for the data to be meaningful?",
      answer: "For small businesses, aim for at least 30-50 responses to see reliable patterns. But don't wait for perfection — even 10-15 responses can reveal obvious problems. The key is consistency: measure the same way each time so you can track trends. Statistical significance matters less than actionable insights when you're starting out."
    },
    {
      question: "What's the difference between NPS and CSAT? When should I use each?",
      answer: "NPS measures overall loyalty ('Would you recommend us?') and should be measured quarterly. It's about the relationship. CSAT measures satisfaction with a specific moment ('How was this support call?') and should be measured after key interactions. Think of NPS as a health check and CSAT as a performance review for specific touchpoints."
    },
    {
      question: "My NPS score is negative. How bad is that?",
      answer: "A negative NPS means you have more detractors than promoters — but it's also a clear signal for improvement. First, don't panic. Second, ask those detractors why they scored low. Their feedback is your roadmap. Many businesses have turned negative NPS around by addressing the top 2-3 complaints. The trend matters more than the number — focus on improving quarter over quarter."
    },
    {
      question: "How do I avoid survey fatigue with my customers?",
      answer: "Follow the 3 rules: (1) Only survey at critical moments — 2-3 touchpoints max. (2) Keep surveys short — 3-5 questions. (3) Close the loop — when customers see you act on feedback, they're more willing to give more. The biggest cause of survey fatigue is asking and never doing anything with the answers."
    },
    {
      question: "Can I track sentiment without expensive software?",
      answer: "Absolutely. Start with a simple Google Sheet: create columns for 'Feedback Source', 'Date', 'Sentiment' (Positive/Negative/Neutral), 'Theme', and 'Key Quote'. Read through your reviews, support tickets, and social comments weekly. Tag each one. Use COUNTIF() to calculate percentages. This manual approach works great for businesses getting <100 feedback items per month."
    },
    {
      question: "What's a 'good' response rate for customer surveys?",
      answer: "For email surveys, 10-30% is typical. For in-app or post-interaction surveys, 20-40% is achievable. Higher rates come from: (1) Personal subject lines ('Quick question, Sarah'). (2) Clear time commitment ('30 seconds'). (3) Sending at the right moment (immediately after interaction). (4) Closing the loop (customers who see action give more feedback)."
    },
    {
      question: "Should I incentivize survey responses?",
      answer: "Be careful. Incentives can skew results — people might give positive answers to 'earn' the reward. If you do incentivize, keep it small (chance to win, not guaranteed reward) and make it clear you want honest feedback. Often, a simple 'your feedback helps us improve' and demonstrating you act on feedback is more effective than prizes."
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--biz-blue))]/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-6 w-6 text-[hsl(var(--biz-blue))]" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Common questions about measuring customer satisfaction
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t">
                      <p className="text-muted-foreground leading-relaxed pt-4">
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

export default Module3FAQ;

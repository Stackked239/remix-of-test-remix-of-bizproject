import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const faqs = [
  {
    question: "How is custom engagement different from general consulting?",
    answer: "Custom BizGuides engagements are personalized ($3K–$25K), fast (6–12 weeks), and powered by YOUR specific situation. You work with experienced advisors who've built and scaled businesses—not armies of junior analysts. We focus on measurable outcomes, not billable hours.",
  },
  {
    question: "How is pricing determined?",
    answer: "Pricing is based on scope, duration, and resource intensity. After your discovery call, we provide a transparent proposal with detailed breakdown. No hidden fees, no surprises. If your needs change mid-engagement, we adjust transparently.",
  },
  {
    question: "Can you work with our constraints (budget, timeline, team)?",
    answer: "Absolutely. Every engagement is custom-designed around your constraints. We'd rather help you succeed with a focused, smaller-scope engagement than overpromise on a larger one. We'll work with you to prioritize what matters most.",
  },
  {
    question: "What if we're not sure what we need?",
    answer: "That's exactly what the discovery call is for. Many of our best clients came in unsure of what they needed. We'll help you identify the right scope and approach. Pilot projects are also available if you want to test the partnership before committing to a full engagement.",
  },
  {
    question: "Do you work with early-stage companies?",
    answer: "Yes! Early-stage companies typically benefit from Onsite Support ($3K–$8K) engagements. Scaling companies often need Strategic Consulting ($8K–$18K). We'll recommend the right fit based on your stage and goals.",
  },
  {
    question: "What if the engagement doesn't deliver results?",
    answer: "We stand behind our work. If you're not seeing the expected progress, we'll adjust scope, extend timeline, or provide additional support at no extra cost. Our goal is your success, not just completing a project.",
  },
  {
    question: "Can we extend or adjust scope midway through?",
    answer: "Yes. Engagements are designed to be flexible. If your needs evolve (they often do), we'll adjust timeline and investment accordingly. Clear communication and transparency are core to how we work.",
  },
  {
    question: "When can we start?",
    answer: "Discovery calls are typically scheduled within 2–5 business days of your request. Engagements typically begin within 2–4 weeks after agreement. If you have an urgent need, let us know—we can often accelerate the timeline.",
  },
];

const CustomRequestFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[hsl(var(--biz-navy))] to-background">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--biz-teal))]/20 border border-[hsl(var(--biz-teal))]/30 rounded-full px-4 py-2 mb-4">
            <span className="text-[hsl(var(--biz-teal))] text-sm font-semibold font-montserrat">
              FAQ
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-white mb-4">
            Questions About Custom BizGuides Engagements?
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Get answers to the most common questions about working with us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
              className="bg-white rounded-lg border border-[hsl(var(--biz-teal))]/20 overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:border-[hsl(var(--biz-teal))]/40"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left hover:bg-[hsl(var(--biz-teal))]/5 transition-colors group">
                <span className={`text-[15px] font-semibold pr-4 transition-colors ${openItems.includes(index) ? "text-[hsl(var(--biz-teal))]" : "text-[hsl(var(--biz-navy))] group-hover:text-[hsl(var(--biz-teal))]"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openItems.includes(index) ? "bg-[hsl(var(--biz-teal))] rotate-180" : "bg-[hsl(var(--biz-teal))]/10 group-hover:bg-[hsl(var(--biz-teal))]/20"}`}>
                  <ChevronDown 
                    className={`w-4 h-4 transition-colors ${openItems.includes(index) ? "text-white" : "text-[hsl(var(--biz-teal))]"}`} 
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-[hsl(var(--biz-teal))]/5 border-t border-[hsl(var(--biz-teal))]/10">
                <div className="p-5 text-sm text-[hsl(var(--biz-navy))] leading-relaxed">
                  {faq.answer}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomRequestFAQ;

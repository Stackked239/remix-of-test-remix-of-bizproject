import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Module2FAQ = () => {
  const faqs = [
    { question: "Can I start with just one listening channel?", answer: "Yes! Pick your biggest customer pain point and start there. Add channels as you scale. It's better to do one channel well than five channels poorly." },
    { question: "What if I don't have a CRM?", answer: "You don't need one yet. A Google Sheet works perfectly. The goal is centralized tracking, not fancy software. Graduate to tools as you scale." },
    { question: "How much time does this really take to set up?", answer: "For THIS module? 30 minutes to pick your channels + download the template. For FULL implementation? Check Module 5 (7-Day Quick Start) and Module 6 (90-Day System)." },
    { question: "Can I use my current tools (Zendesk, HubSpot, etc.)?", answer: "Absolutely. Add a 'VoC Feedback' field or tag to track insights. The tool matters less than the habit." },
    { question: "Which listening channel should I prioritize?", answer: "Start with where your customers ALREADY talk to you most (email, phone, reviews). Add passive channels second. Don't create new channels — optimize existing ones first." },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Module2FAQ;

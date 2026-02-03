import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes an assessment 'comprehensive' vs. 'narrow'?",
    answer: `<p><strong>Comprehensive assessments</strong> like BizHealth.ai evaluate multiple interconnected business areas (strategy, finance, operations, HR, sales/marketing, technology, leadership, risk, customer, supply chain, legal, sustainability), use established frameworks (McKinsey 7S, Balanced Scorecard, Lean), benchmark against industry standards, analyze how gaps in one area affect others, and provide prioritized roadmaps considering dependencies.</p>
    <p><strong>Narrow assessments</strong> focus on one area only (e.g., just financial health), use simple checklists without framework foundation, offer no industry customization, treat issues in isolation, and identify problems without prioritizing solutions.</p>
    <p><strong>Best practice:</strong> Start with a comprehensive assessment to identify priorities, then use specialized assessments for deep dives into highest-priority areas.</p>`
  },
  {
    question: "How do different business frameworks complement each other?",
    answer: `<p>Business frameworks address different dimensions and work together for complete analysis:</p>
    <ul>
      <li><strong>McKinsey 7S</strong> reveals strategic alignment gaps → complemented by Balanced Scorecard for measurement</li>
      <li><strong>Balanced Scorecard</strong> tracks performance indicators → complemented by Lean for process improvement</li>
      <li><strong>Lean/Six Sigma</strong> identifies operational waste → complemented by Porter's Five Forces for external context</li>
      <li><strong>OKRs</strong> set ambitious goals → complemented by McKinsey 7S for identifying gaps preventing achievement</li>
    </ul>
    <p>BizHealth.ai synthesizes these frameworks into a single assessment, showing interconnections and providing recommendations that address root causes rather than symptoms.</p>`
  },
  {
    question: "Is BizHealth.ai right for my business size?",
    answer: `<p>BizHealth.ai is specifically designed for small and mid-sized businesses:</p>
    <ul>
      <li><strong>Micro businesses (1-10 employees):</strong> Use Essentials tier for baseline health assessment</li>
      <li><strong>Small businesses (11-50 employees):</strong> Full diagnostics with Growth tier</li>
      <li><strong>Mid-sized businesses (51-250 employees):</strong> Enterprise tier with team and department insights</li>
    </ul>
    <p><strong>Revenue range:</strong> $100K-$50M annual revenue provides optimal benchmarking.</p>`
  },
  {
    question: "How accurate is AI-powered business assessment?",
    answer: `<p>BizHealth.ai achieves high accuracy by combining AI pattern recognition with established business frameworks validated over 50+ years. The platform:</p>
    <ul>
      <li>Analyzes responses against thousands of benchmarks from SBA, IBISWorld, Gartner, and McKinsey data</li>
      <li>Uses explainable AI—you see exactly why each recommendation is made with supporting data</li>
      <li>Provides industry-specific comparisons for contextual accuracy</li>
      <li>Includes root cause analysis, not just surface-level scoring</li>
    </ul>
    <p>Unlike generic AI tools, BizHealth.ai is purpose-built for small business diagnostics with methodology grounded in proven frameworks.</p>`
  },
  {
    question: "Can I use BizHealth.ai for exit planning or due diligence?",
    answer: `<p>Yes. BizHealth.ai is frequently used for pre-exit planning and due diligence preparation. The assessment helps you:</p>
    <ul>
      <li>Identify and fix operational weaknesses before listing</li>
      <li>Document your business health for potential buyers</li>
      <li>Increase valuation by demonstrating systematic management</li>
      <li>Prepare for buyer questions about financials, operations, and risk</li>
    </ul>
    <p>Many PE/VC firms also use BizHealth.ai to assess potential acquisitions before making offers.</p>`
  },
  {
    question: "How often should I reassess my business health?",
    answer: `<p>Recommended cadence by business stage:</p>
    <ul>
      <li><strong>Startup/Early-Stage (0-3 years):</strong> Every 6 months during rapid growth phases</li>
      <li><strong>Growth Stage (3-10 years):</strong> Annually or after major changes (new product, market expansion, leadership change)</li>
      <li><strong>Mature/Scaling (10+ years):</strong> Annually or when considering strategic pivots</li>
      <li><strong>Before Major Decisions:</strong> Always before acquisitions, exits, financing rounds, or market expansions</li>
    </ul>
    <p>BizHealth.ai offers bundle pricing for multiple assessments to support continuous improvement tracking.</p>`
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="faq">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions about BizHealth.ai's comprehensive business assessment
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left text-[hsl(var(--biz-navy))] font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div 
                    className="prose prose-sm max-w-none text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-foreground"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

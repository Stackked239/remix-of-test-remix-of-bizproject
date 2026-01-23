import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Pencil, Lightbulb, Square, CheckSquare, Copy, Check, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Module5Day2Props {
  isComplete: boolean;
  onToggleComplete: () => void;
}

const SURVEY_TEMPLATE = `Hi [Customer Name],

Quick question about your recent experience:

Q1: How satisfied were you with [your service/product]?
☐ Very Satisfied  ☐ Satisfied  ☐ Neutral  ☐ Dissatisfied

Q2: What's ONE thing we did really well?
[Open text box]

Q3: What's ONE thing we could improve?
[Open text box]

Q4: How likely are you to recommend us to a friend? (1-10)
[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

Q5: Any final thoughts?
[Open text box]

We read every response. Thank you!
[Your name]`;

const ACTION_ITEMS = [
  "Open this email template (copy-paste ready below)",
  "Personalize the opening: Replace [Company] and [Service/Product]",
  "Copy the 5-question survey below",
  "Paste into your email draft (Gmail, Outlook, or newsletter tool)",
  "Schedule to send on Day 4"
];

const Module5Day2 = ({ isComplete, onToggleComplete }: Module5Day2Props) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SURVEY_TEMPLATE);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Survey template copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started!",
      description: "Email Template + Survey PDF is downloading.",
    });
  };

  return (
    <section ref={ref} className="py-12 md:py-16 bg-muted/30 scroll-mt-48" id="day-2">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-colors
            ${isComplete ? 'border-[hsl(var(--biz-green))]' : 'border-border'}`}
        >
          {/* Day Header */}
          <div className="flex items-center justify-between p-6 border-b bg-[hsl(var(--biz-green))]/8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${isComplete ? 'bg-[hsl(var(--biz-green))]/10' : 'bg-[hsl(var(--biz-navy))]/10'}`}>
                <Pencil className={`w-6 h-6 ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-[hsl(var(--biz-navy))]'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--biz-navy))] uppercase tracking-wide">Day 2</span>
                  <span className="text-sm text-muted-foreground">⏱ 20 minutes</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Write Your Survey</h2>
              </div>
            </div>
            <button
              onClick={onToggleComplete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isComplete ? (
                <CheckSquare className="w-6 h-6 text-[hsl(var(--biz-green))]" />
              ) : (
                <Square className="w-6 h-6 text-muted-foreground" />
              )}
              <span className={`text-sm font-medium ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-muted-foreground'}`}>
                {isComplete ? 'Completed' : 'Mark Done'}
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* The Concept */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">The Concept</h3>
              <p className="text-muted-foreground leading-relaxed">
                Active feedback (asking directly) tells you what matters to customers. We'll keep it short—just 5 questions that take 60 seconds to answer.
              </p>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Action Items</h3>
              <div className="space-y-3">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`day2-action-${index}`} className="mt-1" />
                    <label htmlFor={`day2-action-${index}`} className="text-foreground cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Survey Template */}
            <div className="relative bg-[hsl(var(--biz-teal))]/8 border border-[hsl(var(--biz-teal))]/20 rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">Survey Template (Copy-Paste Ready)</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[hsl(var(--biz-green))]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-background p-4 rounded-lg overflow-x-auto">
                {SURVEY_TEMPLATE}
              </pre>
            </div>

            {/* Quick Tip */}
            <div className="bg-[hsl(var(--biz-gold))]/12 border border-[hsl(var(--biz-gold))]/30 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Quick Tip</span>
                  <p className="text-muted-foreground mt-1">
                    "The survey feels long? It takes 60 seconds to complete. People will give you this time if you make it easy."
                  </p>
                </div>
              </div>
            </div>

            {/* Download CTA */}
            <Button
              onClick={handleDownload}
              className="w-full bg-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-navy))]/90 text-white gap-2"
            >
              <Download className="w-5 h-5" />
              Get Email Template + Survey PDF
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Day2;

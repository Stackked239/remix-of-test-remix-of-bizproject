import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RefreshCw, Lightbulb, Square, CheckSquare, Copy, Check, Download, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Module5Day7Props {
  isComplete: boolean;
  onToggleComplete: () => void;
}

const TEMPLATE_A = `Hi [Name],

A week ago, you told us [their specific feedback].

You were right. We listened.

Here's what we're changing: [specific change]

Here's why it matters: [brief explanation of impact]

When: Live by [date]

Thank you for helping us get better. We wouldn't improve without honest feedback from people like you.

[Your name]
P.S. Once the change is live, let me know what you think.`;

const TEMPLATE_B = `Subject: You asked, we delivered.

Hi [All Customers],

Over the past week, we asked for your feedback. Here's what you told us:

✅ [Pattern 1]: [Brief description]
✅ [Pattern 2]: [Brief description]
✅ [Pattern 3]: [Brief description]

We listened. Here's what's changing:

🔧 [Change 1] — based on [X customers mentioning Y issue]
🔧 [Change 2] — because several of you asked for [feature]

[Change 3] is coming next month.

Your feedback directly shapes our roadmap. Keep it coming.

[Your name]`;

const ACTION_ITEMS = [
  {
    title: "Decide on your message approach:",
    subItems: [
      "Option A: Email customers who gave feedback (personalized)",
      "Option B: Email all customers (broadcast announcement)",
      "Option C: Post on social media or website blog"
    ]
  },
  { title: "Use one of the email templates below" },
  { title: "Personalize: Include the actual feedback that inspired the change" },
  { title: "Send it TODAY" },
  { title: 'Add note to tracker: "Loop closure completed—[X] customers notified"' }
];

const Module5Day7 = ({ isComplete, onToggleComplete }: Module5Day7Props) => {
  const { toast } = useToast();
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCopy = async (template: string, name: string) => {
    await navigator.clipboard.writeText(template);
    setCopiedTemplate(name);
    toast({
      title: "Copied!",
      description: `${name} template copied to clipboard.`,
    });
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started!",
      description: "Loop-Closure Email Templates PDF is downloading.",
    });
  };

  return (
    <section ref={ref} className="py-12 md:py-16 scroll-mt-48" id="day-7">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-colors
            ${isComplete ? 'border-[hsl(var(--biz-green))]' : 'border-border'}`}
        >
          {/* Day Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[hsl(var(--biz-green))]/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${isComplete ? 'bg-[hsl(var(--biz-green))]/20' : 'bg-[hsl(var(--biz-green))]/10'}`}>
                <RefreshCw className={`w-6 h-6 ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-[hsl(var(--biz-green))]'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--biz-green))] uppercase tracking-wide">Day 7</span>
                  <span className="px-2 py-0.5 bg-[hsl(var(--biz-green))]/20 text-[hsl(var(--biz-green))] text-xs font-bold rounded">FINAL DAY</span>
                  <span className="text-sm text-muted-foreground">⏱ 15 minutes</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Close the Loop with Customers</h2>
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
                This is the final, most important step. Customers told you something. Now you're telling them you HEARD them and you're FIXING it. This moment—right here—<strong className="text-foreground">turns feedback into loyalty.</strong>
              </p>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Action Items</h3>
              <div className="space-y-4">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`day7-action-${index}`} className="mt-1" />
                    <div className="flex-1">
                      <label 
                        htmlFor={`day7-action-${index}`}
                        className="text-foreground cursor-pointer"
                      >
                        {item.title}
                      </label>
                      {item.subItems && (
                        <ul className="mt-2 ml-4 space-y-1 text-sm text-muted-foreground">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template A */}
            <div className="bg-muted/50 border rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm font-semibold text-foreground">Template Option A: Personalized Response</span>
                  <span className="text-xs text-muted-foreground ml-2">(Best if &lt;50 responses)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(TEMPLATE_A, 'Personalized')}
                  className="gap-2"
                >
                  {copiedTemplate === 'Personalized' ? (
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
                {TEMPLATE_A}
              </pre>
            </div>

            {/* Template B */}
            <div className="bg-muted/50 border rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm font-semibold text-foreground">Template Option B: Broadcast Announcement</span>
                  <span className="text-xs text-muted-foreground ml-2">(Best if many responses)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(TEMPLATE_B, 'Broadcast')}
                  className="gap-2"
                >
                  {copiedTemplate === 'Broadcast' ? (
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
                {TEMPLATE_B}
              </pre>
            </div>

            {/* Quick Tip */}
            <div className="bg-[hsl(var(--biz-yellow))]/10 border border-[hsl(var(--biz-yellow))]/30 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-yellow))] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Quick Tip</span>
                  <p className="text-muted-foreground mt-1">
                    "This email is THE turning point. It converts passive feedback into active loyalty. Don't skip this step."
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
              Get Loop-Closure Email Templates PDF
            </Button>

            {/* Optional Coaching CTA */}
            <div className="bg-[hsl(var(--biz-navy))]/5 border border-[hsl(var(--biz-navy))]/20 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-navy))]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[hsl(var(--biz-navy))]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Want to Do This Perfectly? (Optional)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    A 20-minute coaching call shows you how top businesses close the loop. It's a small investment that builds huge customer loyalty.
                  </p>
                  <Button asChild variant="secondary" size="sm">
                    <Link to="/bizguides">
                      Schedule Excellence Call
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Day7;

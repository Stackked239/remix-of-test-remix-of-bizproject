import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { vocState } from "@/state/vocStateManager";

interface Module4TemplatesProps {
  onView: () => void;
  onTemplateCopied: () => void;
}

const Module4Templates = ({ onView, onTemplateCopied }: Module4TemplatesProps) => {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const templates = {
    acknowledge: {
      title: "Immediate Acknowledgment",
      subject: "We heard you! — [Company Name]",
      content: `Hi [Customer Name],

Thank you for taking the time to share your feedback about [specific issue]. We genuinely appreciate it.

We're reviewing this and will follow up with you within [timeframe: 24/48/72 hours].

Best regards,
[Your Name]
[Your Title]
[Company Name]`,
    },
    detractor: {
      title: "Detractor Outreach (VIP Recovery)",
      subject: "We want to make this right — [Company Name]",
      content: `Hi [Customer Name],

I just read your recent review/message about [specific complaint]. I want to personally reach out because this isn't the experience we want for you.

You're absolutely right about [acknowledge specific issue]. Here's what we're doing to fix it: [specific action]

Would you be open to giving us another chance? I'd personally like to help make this right.

Sincerely,
[Your Name]
[Your Title]
[Company Name]`,
    },
    solution: {
      title: "Solution Follow-Up",
      subject: "We fixed it — [Company Name]",
      content: `Hi [Customer Name],

Remember when you told us about [issue]? We listened. Based on your feedback and [X others], we changed [X].

Here's what's different now: [specific changes with details or screenshot]

We appreciate you helping us improve. Would you be willing to give us another try?

Best regards,
[Your Name]`,
    },
    youAsked: {
      title: '"You Asked, We Delivered"',
      subject: "3 Features You Asked For — Now Available",
      content: `Hi [Team/Customers],

This month, you asked for: [feature 1], [feature 2], and [feature 3].

We listened. All three are now live.

Here's what's new:

✅ [Feature 1]: [Brief description of benefit]
✅ [Feature 2]: [Brief description of benefit]
✅ [Feature 3]: [Brief description of benefit]

Try them out and let us know what you think.

Best regards,
[Company Name]`,
    },
    honestNo: {
      title: 'Honest "No" (Transparency)',
      subject: "Here's why we're not doing that (yet)",
      content: `Hi [Customer Name],

Thank you for suggesting [feature]. We reviewed it carefully with our team.

Here's why we're not building it right now:
[Honest reason: technical limitations, resource constraints, doesn't align with roadmap, etc.]

Here's what we ARE doing instead:
[Alternative solution or workaround]

We're not saying never — we track all suggestions. If circumstances change, we'll revisit.

We appreciate your feedback.

Best regards,
[Your Name]`,
    },
  };

  const handleCopy = async (templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates];
    const fullText = `Subject: ${template.subject}\n\n${template.content}`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedTemplate(templateKey);
      onTemplateCopied();
      toast.success("Copied to clipboard!");
      
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  const handleDownload = () => {
    // Create combined template content
    let content = "VOICE OF CUSTOMER - LOOP CLOSURE EMAIL TEMPLATES\n";
    content += "=".repeat(50) + "\n\n";
    
    Object.entries(templates).forEach(([, template]) => {
      content += `${template.title.toUpperCase()}\n`;
      content += "-".repeat(40) + "\n";
      content += `Subject: ${template.subject}\n\n`;
      content += template.content;
      content += "\n\n" + "=".repeat(50) + "\n\n";
    });

    // Create and trigger download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "VoC-Loop-Closure-Email-Templates.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    vocState.trackDownload("loop-closure-templates", 4);
    toast.success("Templates downloaded!");
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-muted/30"
      data-section="templates"
      data-section-number="5"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            Ready-to-Use Email Templates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Copy these templates and personalize them for your business. Each one
            is designed for a specific scenario.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-background rounded-xl border shadow-sm overflow-hidden"
        >
          <Tabs defaultValue="acknowledge" className="w-full">
            <div className="border-b overflow-x-auto">
              <TabsList className="h-auto p-0 bg-transparent rounded-none flex-nowrap justify-start">
                {Object.entries(templates).map(([key, template]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-muted rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--biz-yellow))] px-4 py-3 text-sm whitespace-nowrap"
                  >
                    {template.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(templates).map(([key, template]) => (
              <TabsContent key={key} value={key} className="p-6 m-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                      {template.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Subject: {template.subject}
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap text-foreground/80">
                    {template.content}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => handleCopy(key)}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      {copiedTemplate === key ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Text
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Download All Button */}
          <div className="border-t p-4 bg-muted/30">
            <Button
              onClick={handleDownload}
              className="w-full bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold gap-2"
            >
              <Download className="h-4 w-4" />
              Download All Templates (.txt)
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4Templates;

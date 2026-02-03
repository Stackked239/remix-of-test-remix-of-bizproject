import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Lightbulb, AlertTriangle, Download, Copy, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const CASE_STUDY = {
  company: "Mid-size SaaS company",
  feedback: "Customers hate the onboarding",
  surfaceResponse: "Update help docs",
  whys: [
    { why: "Why 1", answer: "Onboarding feels overwhelming" },
    { why: "Why 2", answer: "Too many features presented at once" },
    { why: "Why 3", answer: "Same onboarding for all customer types" },
    { why: "Why 4", answer: "No clear definition of 'success' per customer type" },
    { why: "Why 5", answer: "Product team never asked what success looks like" }
  ],
  rootCause: "No segmented success definitions",
  action: "Created personalized onboarding paths by customer type",
  result: "Onboarding completion jumped from 62% to 89%"
};

const MISTAKES = [
  { title: "Stopping too early", desc: "Only asking 2 'whys' instead of digging deeper" },
  { title: "Blaming people instead of systems", desc: "Focus on process failures, not individuals" },
  { title: "Finding cause but not fixing", desc: "Analysis without action is wasted effort" },
  { title: "No follow-up verification", desc: "Always check if the fix actually worked" }
];

const Module7RootCause = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [whys, setWhys] = useState<string[]>(["", "", "", "", ""]);
  const [rootCause, setRootCause] = useState("");
  const [action, setAction] = useState("");
  const [copied, setCopied] = useState(false);

  const updateWhy = (index: number, value: string) => {
    const newWhys = [...whys];
    newWhys[index] = value;
    setWhys(newWhys);
  };

  const handleCopyWorksheet = () => {
    const worksheet = `
5 WHYS ANALYSIS WORKSHEET
========================
Feedback: ${feedback}

Why 1: ${whys[0]}
Why 2: ${whys[1]}
Why 3: ${whys[2]}
Why 4: ${whys[3]}
Why 5: ${whys[4]}

Root Cause: ${rootCause}
Planned Action: ${action}
    `.trim();
    
    navigator.clipboard.writeText(worksheet);
    setCopied(true);
    toast({ title: "Copied!", description: "Worksheet copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (asset: string) => {
    toast({ title: "Download Started!", description: `${asset} is downloading.` });
  };

  return (
    <section id="root-cause" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-teal))]/15 text-[hsl(var(--biz-teal))] text-sm font-medium mb-4">
            Section 01
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Root Cause Analysis: Find the Real Problem
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            You found the feedback. Now find the real problem. The 5 Whys method is simple, powerful, and will change how you respond to every piece of feedback.
          </p>
        </div>

        {/* Why It Matters */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Why Root Cause Analysis Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-3xl font-bold text-[hsl(var(--biz-navy))]">80%</p>
              <p className="text-sm text-muted-foreground">of companies respond surface-level</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-3xl font-bold text-[hsl(var(--biz-green))]">20%</p>
              <p className="text-sm text-muted-foreground">dig deeper and find root causes</p>
            </div>
            <div className="p-4 bg-[hsl(var(--biz-green))]/10 rounded-lg text-center">
              <p className="text-3xl font-bold text-[hsl(var(--biz-green))]">35%</p>
              <p className="text-sm text-muted-foreground">higher retention for root-cause fixers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="font-medium text-foreground mb-2">❌ Surface Response:</p>
              <p className="text-muted-foreground text-sm">"Support took too long" → Hire more staff</p>
            </div>
            <div className="p-4 bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg">
              <p className="font-medium text-foreground mb-2">✅ Root Cause Response:</p>
              <p className="text-muted-foreground text-sm">"Support took too long" → Why? → No SOPs → Fix: Document processes</p>
            </div>
          </div>
        </div>

        {/* The 5 Whys Method */}
        <div className="bg-[hsl(var(--biz-teal))]/8 border border-[hsl(var(--biz-teal))]/20 rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">The 5 Whys Method Explained</h3>
          <ol className="space-y-4">
            {[
              "Start with a feedback statement (the symptom)",
              "Ask 'Why did this happen?' and write the answer",
              "Ask 'Why?' again (challenge your first answer)",
              "Repeat until you hit the root cause (usually 3-7 times)",
              "The root cause is something you can actually fix"
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--biz-teal))]/20 flex items-center justify-center text-[hsl(var(--biz-teal))] font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-foreground pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Case Study */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Real Case Study: SaaS Onboarding</h3>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">Company:</span>
            <span className="ml-2 text-foreground">{CASE_STUDY.company}</span>
          </div>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">Feedback:</span>
            <span className="ml-2 text-foreground italic">"{CASE_STUDY.feedback}"</span>
          </div>
          
          <div className="space-y-2 mb-6">
            {CASE_STUDY.whys.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-[hsl(var(--biz-teal))]" />
                <span className="text-sm font-medium text-[hsl(var(--biz-teal))]">{item.why}:</span>
                <span className="text-foreground">{item.answer}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg">
            <p className="font-medium text-foreground mb-1">Root Cause: {CASE_STUDY.rootCause}</p>
            <p className="text-sm text-muted-foreground mb-1">Action: {CASE_STUDY.action}</p>
            <p className="text-sm text-[hsl(var(--biz-green))] font-medium">Result: {CASE_STUDY.result}</p>
          </div>
        </div>

        {/* Interactive 5 Whys Worksheet */}
        <div className="bg-card border-2 border-[hsl(var(--biz-green))]/30 rounded-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Interactive 5 Whys Worksheet</h3>
            <Button variant="ghost" size="sm" onClick={handleCopyWorksheet} className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start with a piece of feedback:
              </label>
              <Input
                placeholder="e.g., Website search is not finding products"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            {[1, 2, 3, 4, 5].map((num, idx) => (
              <div key={num}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Why {num}: {idx === 0 ? "Why did this happen?" : "Why?"}
                </label>
                <Textarea
                  placeholder={`Answer why ${num}...`}
                  value={whys[idx]}
                  onChange={(e) => updateWhy(idx, e.target.value)}
                  rows={2}
                />
              </div>
            ))}

            <div className="pt-4 border-t">
              <label className="block text-sm font-medium text-foreground mb-2">
                Root Cause Identified:
              </label>
              <Input
                placeholder="What's the underlying root cause?"
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Planned Action:
              </label>
              <Input
                placeholder="To fix this, we will..."
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {MISTAKES.map((mistake, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{mistake.title}</p>
                <p className="text-sm text-muted-foreground">{mistake.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Takeaway */}
        <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <strong>Key Takeaway:</strong> Root cause analysis separates businesses that just listen from businesses that actually improve. Don't fix symptoms—fix systems.
            </p>
          </div>
        </div>

        {/* Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "5 Whys Analysis Template", format: "Excel/Sheets" },
            { title: "Root Cause Example Library", format: "PDF" },
            { title: "Facilitation Guide", format: "PDF" }
          ].map((asset) => (
            <Button
              key={asset.title}
              variant="outline"
              onClick={() => handleDownload(asset.title)}
              className="justify-start gap-2 h-auto py-3"
            >
              <Download className="w-4 h-4 text-[hsl(var(--biz-green))]" />
              <div className="text-left">
                <p className="font-medium">{asset.title}</p>
                <p className="text-xs text-muted-foreground">{asset.format}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Module7RootCause;

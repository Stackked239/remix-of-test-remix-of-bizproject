import { CheckCircle2, Calendar, Target, Users, RefreshCw } from "lucide-react";
import { VOC_URLS } from "@/config/vocUrls";

const MODULES_SUMMARY = [
  { num: 1, title: "Why VoC Matters", summary: "The business case for listening" },
  { num: 2, title: "Core Components", summary: "Active + passive feedback, centralized data" },
  { num: 3, title: "Measuring What Matters", summary: "NPS, CSAT, CES, sentiment analysis" },
  { num: 4, title: "Closing the Loop", summary: "Turn feedback into loyalty" },
  { num: 5, title: "7-Day Quick Start", summary: "Rapid implementation framework" },
  { num: 6, title: "90-Day System", summary: "Full implementation roadmap" },
  { num: 7, title: "Advanced Techniques", summary: "Root cause, segmentation, culture, maturity" }
];

const Module7Summary = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">What You've Learned</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MODULES_SUMMARY.map((mod) => (
            <div key={mod.num} className="flex items-start gap-3 p-4 bg-card border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--biz-green))]/20 flex items-center justify-center text-[hsl(var(--biz-green))] font-bold text-sm flex-shrink-0">
                {mod.num}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{mod.title}</p>
                <p className="text-xs text-muted-foreground">{mod.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-4">Next Steps for Ongoing Growth</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Calendar, text: "Use your 90-day roadmap from Module 6" },
            { icon: Target, text: "Implement one advanced technique per month" },
            { icon: Users, text: "Book coaching to accelerate progress" },
            { icon: RefreshCw, text: "Retake assessment in 90 days" }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
              <step.icon className="w-5 h-5 text-[hsl(var(--biz-green))]" />
              <span className="text-foreground">{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Module7Summary;

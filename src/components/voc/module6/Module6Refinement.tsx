import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { VOC_URLS } from "@/config/vocUrls";

const Module6Refinement = () => {
  return (
    <section id="refinement-phase" className="py-12 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        {/* Phase Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] text-sm font-bold mb-4">
            PHASE 2
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Days 31-60: Refinement
          </h2>
          <p className="text-lg text-muted-foreground">
            Now that the basics work, make them better
          </p>
        </div>

        {/* Weeks 5-6 */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Weeks 5-6: Optimize & Expand Collection
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Actions */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Key Actions:</h4>
              <ul className="space-y-4">
                {[
                  { title: "Add missing channels", desc: "If you only have Google Reviews, add support tickets + social listening" },
                  { title: "Improve survey response rates", desc: "Test different timing, subject lines, incentives" },
                  { title: "Automate where possible", desc: "Zapier, Make, or simple email rules to route feedback" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">{item.title}</strong>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfall Warning */}
            <div className="flex items-start gap-4 p-4 bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-lg h-fit">
              <AlertTriangle className="w-6 h-6 text-[hsl(var(--biz-gold))] flex-shrink-0" />
              <div>
                <strong className="text-foreground">Pitfall to Avoid:</strong>
                <p className="text-muted-foreground mt-1">
                  Don't over-survey. If you're sending 3 surveys per customer per month, you'll kill response rates. One well-timed survey beats five ignored ones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weeks 7-8 */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Weeks 7-8: Find Root Causes, Not Just Symptoms
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Actions */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Key Actions:</h4>
              <ul className="space-y-4">
                {[
                  { title: "Segment feedback by type", desc: "Customer type, product line, channel — see who's saying what" },
                  { title: "Use 5 Whys to dig deeper", desc: "Move beyond surface-level \"fix this\" to actual root causes" },
                  { title: "Identify patterns vs. one-offs", desc: "1 complaint = one-off. 3+ complaints = pattern. Act on patterns." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">{item.title}</strong>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5 Whys Example */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Example: The 5 Whys in Action</h4>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Problem:", text: "Customers complain about late deliveries" },
                  { label: "Why 1:", text: "Warehouse ships orders a day behind schedule" },
                  { label: "Why 2:", text: "Not enough staff on the packing line" },
                  { label: "Why 3:", text: "Two people quit last month, weren't replaced" },
                  { label: "Why 4:", text: "HR can't find qualified candidates" },
                  { label: "Why 5:", text: "Job posting is outdated, pay is below market", isRoot: true }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-2 ${item.isRoot ? 'p-2 bg-[hsl(var(--biz-green))]/10 rounded-lg' : ''}`}
                  >
                    <span className={`font-medium ${item.isRoot ? 'text-[hsl(var(--biz-green))]' : 'text-muted-foreground'}`}>
                      {item.label}
                    </span>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t">
                  <p className="text-foreground">
                    <strong>Root Cause Fix:</strong> Update job posting and increase pay — not "push warehouse harder"
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic mt-3">
                See the difference? Surface-level fixes rarely solve the actual problem.
              </p>
            </div>
          </div>

          <Link 
            to={VOC_URLS.modules[7].url}
            className="inline-flex items-center gap-2 text-[hsl(var(--biz-green))] hover:text-[hsl(var(--biz-green))]/80 font-medium mt-4 transition-colors"
          >
            Full 5 Whys template in Module 7 (Advanced Techniques)
          </Link>
        </div>

        {/* Phase 2 Milestone Summary */}
        <div className="p-6 bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[hsl(var(--biz-green))]" />
            Phase 2 Complete: Refinement Done
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              "Multiple channels monitored with clear data flow",
              "Root cause analysis on top 3 recurring issues",
              "Segmentation strategy in place"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--biz-green))]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground italic">
            You're no longer just collecting feedback — you're understanding it. Now let's make it permanent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Module6Refinement;

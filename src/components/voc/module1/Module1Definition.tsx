import { motion } from "framer-motion";
import { X, Check, ArrowDown } from "lucide-react";

const whatVocIsNot = [
  { text: "Just sending surveys.", detail: "Surveys are one tool, not the whole system." },
  { text: "Reading reviews occasionally.", detail: "One-off reading = spotty insights. You need continuous listening." },
  { text: "\"Knowing your customers.\"", detail: "Too vague to be useful. You need specific, documented, actionable knowledge." },
  { text: "Expensive software.", detail: "You don't need Salesforce or a VoC platform to start. (A spreadsheet works.)" },
];

const whatVocIs = [
  "A system for capturing feedback from everywhere customers talk to you (or about you)",
  "A process for spotting patterns and root causes",
  "A commitment to act on what you learn",
  "A feedback loop that circles back to customers so they know you heard them",
];

const cycleSteps = [
  { num: 1, title: "LISTEN", desc: "Collect feedback" },
  { num: 2, title: "ANALYZE", desc: "Find patterns" },
  { num: 3, title: "ACT", desc: "Make improvements" },
  { num: 4, title: "MONITOR", desc: "Track impact" },
];

const Module1Definition = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Text Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                What Voice of Customer Actually Means
              </h2>

              {/* Plain English Definition */}
              <div className="bg-[hsl(var(--biz-blue))]/5 border-l-4 border-[hsl(var(--biz-blue))] p-6 rounded-r-lg mb-8">
                <p className="text-lg font-semibold text-foreground leading-relaxed">
                  Voice of Customer (VoC) is the practice of collecting what customers say about you, 
                  understanding what it means, and doing something about it.
                </p>
              </div>

              {/* What It's NOT */}
              <div className="mb-8">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  What It's NOT
                </h3>
                <div className="space-y-3">
                  {whatVocIsNot.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                        <X className="h-3.5 w-3.5 text-red-500" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{item.text}</span>
                        <span className="text-muted-foreground"> {item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What It IS */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  What It IS
                </h3>
                <div className="space-y-3">
                  {whatVocIs.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--biz-green))]/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3.5 w-3.5 text-[hsl(var(--biz-green))]" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* VoC Cycle Diagram - 40% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-muted/50 rounded-xl p-6 md:p-8">
              <h3 className="text-lg font-heading font-semibold text-foreground text-center mb-6">
                The Four-Step Cycle That Never Stops
              </h3>

              <div className="flex flex-col items-center space-y-4">
                {cycleSteps.map((step, index) => (
                  <div key={step.num} className="w-full">
                    <div className="bg-[hsl(var(--biz-blue))] rounded-xl p-4 text-center">
                      <div className="text-[hsl(var(--biz-yellow))] font-bold text-sm mb-1">
                        {step.num}. {step.title}
                      </div>
                      <div className="text-white/80 text-sm">
                        {step.desc}
                      </div>
                    </div>
                    {index < cycleSteps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowDown className="h-5 w-5 text-[hsl(var(--biz-yellow))]" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loop back indicator */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <span className="text-[hsl(var(--biz-yellow))]">↻</span>
                  <span>Loops back to Step 1</span>
                </div>
              </div>

              {/* Accessibility text for screen readers */}
              <p className="sr-only">
                The four steps form a continuous cycle: Listen to customers, Analyze what you hear, 
                Act on insights, Monitor results, then repeat.
              </p>
            </div>

            {/* Explanation Below */}
            <div className="mt-6 p-5 bg-background border rounded-lg">
              <p className="text-sm font-medium text-foreground mb-3">
                Each step matters. Skip any one, and the system breaks:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Listen without analyzing?</strong> You have data, but no insights.</li>
                <li>• <strong>Analyze without acting?</strong> You know the problem, but nothing changes.</li>
                <li>• <strong>Act without monitoring?</strong> You don't know if it worked.</li>
                <li>• <strong>Monitor without listening?</strong> You're missing new issues.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Module1Definition;

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Lightbulb, Square, CheckSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Module5Day5Props {
  isComplete: boolean;
  onToggleComplete: () => void;
}

const ACTION_ITEMS = [
  "Check your email (and tracker) for responses from yesterday's survey",
  "Read every response—highlight keywords or phrases that stand out",
  "Count: How many customers mentioned similar issues?",
  "Tally: Use your tracker to note sentiment (positive/negative/neutral)",
  "Identify: What's the #1 thing customers mentioned?",
  'Write it down: "Customers consistently said: [issue/praise]"'
];

const PATTERN_FRAMEWORK = [
  { label: "Positive Patterns", description: '"At least 3 people mentioned [feature/experience]"' },
  { label: "Negative Patterns", description: '"At least 3 people mentioned [problem/pain point]"' },
  { label: "Requests", description: '"At least 2 people asked for [feature/change]"' },
];

const Module5Day5 = ({ isComplete, onToggleComplete }: Module5Day5Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 scroll-mt-48" id="day-5">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-colors
            ${isComplete ? 'border-[hsl(var(--biz-green))]' : 'border-border'}`}
        >
          {/* Day Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[hsl(var(--biz-green))]/15 to-[hsl(var(--biz-green))]/5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${isComplete ? 'bg-[hsl(var(--biz-green))]/10' : 'bg-[hsl(var(--biz-navy))]/10'}`}>
                <TrendingUp className={`w-6 h-6 ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-[hsl(var(--biz-navy))]'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--biz-navy))] uppercase tracking-wide">Day 5</span>
                  <span className="text-sm text-muted-foreground">⏱ 20 minutes</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Review Responses & Find Patterns</h2>
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
                Feedback is only valuable if you find the PATTERNS. Today you'll spot what customers are really telling you.
              </p>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Action Items</h3>
              <div className="space-y-3">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`day5-action-${index}`} className="mt-1" />
                    <label htmlFor={`day5-action-${index}`} className="text-foreground cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern Framework */}
            <div className="bg-[hsl(var(--biz-teal))]/8 border border-[hsl(var(--biz-teal))]/20 rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-4">Simple Pattern-Spotting Framework:</h4>
              <ul className="space-y-3">
                {PATTERN_FRAMEWORK.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[hsl(var(--biz-green))] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{item.label}: </span>
                      <span className="text-muted-foreground italic">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real Example */}
            <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-2">Real Example:</h4>
              <p className="text-muted-foreground italic leading-relaxed">
                "Responses: 12 surveys sent, 7 responses (good rate!). Pattern found: 4 out of 7 mentioned that [product] solved [specific problem] better than competitors. Negative: 3 mentioned [common complaint about UX]. Clear winning pattern and clear improvement opportunity."
              </p>
            </div>

            {/* Quick Tip */}
            <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Quick Tip</span>
                  <p className="text-muted-foreground mt-1">
                    "Don't have many responses yet? Wait until tomorrow. Even 3-5 responses reveal patterns."
                  </p>
                </div>
              </div>
            </div>

            {/* No download note */}
            <p className="text-sm text-muted-foreground italic text-center">
              No download—use tracker from Day 3
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Day5;

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, CheckCircle2, Lightbulb, Square, CheckSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Module5Day1Props {
  isComplete: boolean;
  onToggleComplete: () => void;
}

const ACTION_ITEMS = [
  {
    title: "Brainstorm: Where do you hear feedback from customers RIGHT NOW?",
    subItems: [
      "Google reviews/maps comments?",
      "Email?",
      "Phone calls?",
      "In-person conversations?",
      "Text messages or WhatsApp?",
      "Social media comments?",
      "Yelp, Facebook, TripAdvisor, or industry-specific sites?"
    ]
  },
  { title: "Narrow it down: Pick your TOP 3 channels (the most frequent ones)" },
  { title: "Write an example: For each channel, write down one piece of feedback you received recently" },
  { title: "Note the sentiment: Was each example positive, negative, or neutral?" }
];

const Module5Day1 = ({ isComplete, onToggleComplete }: Module5Day1Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 scroll-mt-48" id="day-1">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-colors
            ${isComplete ? 'border-[hsl(var(--biz-green))]' : 'border-border'}`}
        >
          {/* Day Header */}
          <div className="flex items-center justify-between p-6 border-b bg-muted/30">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${isComplete ? 'bg-[hsl(var(--biz-green))]/10' : 'bg-[hsl(var(--biz-navy))]/10'}`}>
                <Search className={`w-6 h-6 ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-[hsl(var(--biz-navy))]'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--biz-navy))] uppercase tracking-wide">Day 1</span>
                  <span className="text-sm text-muted-foreground">⏱ 15 minutes</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Identify Critical Feedback Moments</h2>
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
                Most businesses already hear customer feedback—it's just scattered everywhere. Today, you're gathering it all in one place so nothing falls through the cracks.
              </p>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Action Items</h3>
              <div className="space-y-4">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`day1-action-${index}`} className="mt-1" />
                    <div className="flex-1">
                      <label 
                        htmlFor={`day1-action-${index}`}
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

            {/* Quick Tip */}
            <div className="bg-[hsl(var(--biz-yellow))]/10 border border-[hsl(var(--biz-yellow))]/30 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-yellow))] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Quick Tip</span>
                  <p className="text-muted-foreground mt-1">
                    "If you're only using one channel, start there. Even one channel, consistently tracked, beats zero."
                  </p>
                </div>
              </div>
            </div>

            {/* No download note */}
            <p className="text-sm text-muted-foreground italic text-center">
              No download for Day 1 — content is in the checklist PDF
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Day1;

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Lightbulb, Square, CheckSquare, Calendar, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Module5Day6Props {
  isComplete: boolean;
  onToggleComplete: () => void;
}

const ACTION_ITEMS = [
  "Review your Day 5 patterns",
  'Ask yourself: "What problem shows up in multiple pieces of feedback?"',
  "Apply the decision framework (below)",
  "Decide on ONE specific change",
  'Write it down: "We will [specific action] because customers said [specific feedback]"'
];

const DECISION_FRAMEWORK = [
  {
    question: "CUSTOMER IMPACT: How many customers mentioned this?",
    options: [
      { label: "5+ mentions", result: "VERY HIGH" },
      { label: "2-4 mentions", result: "HIGH" },
      { label: "1 mention", result: "MEDIUM" },
    ]
  },
  {
    question: "EFFORT: How hard is this to fix?",
    options: [
      { label: "0-2 hours", result: "EASY (Quick win—do it this week)" },
      { label: "4-8 hours", result: "MEDIUM (Do it in next 2 weeks)" },
      { label: "2+ days", result: "HARD (Plan for next month)" },
    ]
  },
  {
    question: "STRATEGIC FIT: Does this align with our business goals?",
    options: [
      { label: "Yes", result: "PRIORITIZE it" },
      { label: "Maybe", result: "Could wait" },
      { label: "No", result: "Don't do it (even if customers ask)" },
    ]
  }
];

const Module5Day6 = ({ isComplete, onToggleComplete }: Module5Day6Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-muted/30 scroll-mt-48" id="day-6">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={`bg-card border-2 rounded-2xl overflow-hidden shadow-sm transition-colors
            ${isComplete ? 'border-[hsl(var(--biz-green))]' : 'border-border'}`}
        >
          {/* Day Header with Star (Critical Day) */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[hsl(var(--biz-green))]/15 to-[hsl(var(--biz-green))]/5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative
                ${isComplete ? 'bg-[hsl(var(--biz-green))]/10' : 'bg-[hsl(var(--biz-yellow))]/20'}`}>
                <Target className={`w-6 h-6 ${isComplete ? 'text-[hsl(var(--biz-green))]' : 'text-[hsl(var(--biz-yellow))]'}`} />
                <Star className="w-4 h-4 text-[hsl(var(--biz-yellow))] absolute -top-1 -right-1 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[hsl(var(--biz-yellow))] uppercase tracking-wide">Day 6</span>
                  <span className="px-2 py-0.5 bg-[hsl(var(--biz-yellow))]/20 text-[hsl(var(--biz-yellow))] text-xs font-bold rounded">KEY DAY</span>
                  <span className="text-sm text-muted-foreground">⏱ 15 minutes</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Pick ONE Thing to Change</h2>
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
                The hardest part of VoC is deciding which feedback to act on first. Use this simple framework: Pick ONE change you can make in the next 7-14 days.
              </p>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Action Items</h3>
              <div className="space-y-3">
                {ACTION_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`day6-action-${index}`} className="mt-1" />
                    <label htmlFor={`day6-action-${index}`} className="text-foreground cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Framework */}
            <div className="bg-[hsl(var(--biz-teal))]/8 border border-[hsl(var(--biz-teal))]/20 rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-4">Decision Framework:</h4>
              <p className="text-sm text-muted-foreground mb-4">Ask these 3 questions:</p>
              <div className="space-y-4">
                {DECISION_FRAMEWORK.map((item, index) => (
                  <div key={index} className="bg-background p-4 rounded-lg">
                    <p className="font-medium text-foreground mb-2">
                      {index + 1}. {item.question}
                    </p>
                    <ul className="space-y-1">
                      {item.options.map((opt, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                          <span className="text-muted-foreground">{opt.label} = </span>
                          <span className="font-medium text-foreground">{opt.result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Decision */}
            <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-5">
              <h4 className="font-semibold text-foreground mb-2">Example Decision:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                <li>• Q1: 5 customers mentioned confusion about pricing → <strong className="text-foreground">HIGH</strong></li>
                <li>• Q2: Fix requires 30 minutes to update website → <strong className="text-foreground">EASY</strong></li>
                <li>• Q3: Pricing clarity aligns with our goal to increase conversions → <strong className="text-foreground">YES</strong></li>
              </ul>
              <p className="font-medium text-[hsl(var(--biz-green))]">
                → DECISION: Update pricing page this week
              </p>
            </div>

            {/* Quick Tip */}
            <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-4 md:p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Quick Tip</span>
                  <p className="text-muted-foreground mt-1">
                    "Tempted to fix everything? Resist. One change this week is more powerful than promising five changes you won't deliver. You'll demonstrate to customers that you listen."
                  </p>
                </div>
              </div>
            </div>

            {/* CRITICAL Coaching CTA */}
            <div className="bg-gradient-to-br from-[hsl(var(--biz-green))]/10 to-[hsl(var(--biz-navy))]/10 border-2 border-[hsl(var(--biz-green))] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--biz-green))]/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[hsl(var(--biz-green))]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-foreground text-lg">Expert Help Available — Most Valuable Moment</h4>
                    <Star className="w-4 h-4 text-[hsl(var(--biz-yellow))] fill-current" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Deciding what to prioritize? Talk to a coach—they've helped 500+ businesses find their highest-impact first change.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    20-minute strategy call, <strong className="text-[hsl(var(--biz-green))]">FREE</strong> for BizGrowth Academy users.
                  </p>
                  <Button asChild className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white shadow-lg">
                    <Link to="/bizguides">
                      Schedule Strategy Call
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

export default Module5Day6;

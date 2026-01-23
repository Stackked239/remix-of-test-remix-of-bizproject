import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

const PITFALLS = [
  {
    number: 1,
    title: "Over-Surveying",
    symptom: "\"We send 3 surveys per customer per month. Response rates are dropping.\"",
    fixes: [
      "Limit surveys to key moments (not every interaction)",
      "Keep them short (5 questions max)",
      "Rotate who you ask (not the same customers every month)",
      "Make it worthwhile: \"Your feedback directly shapes what we build\""
    ]
  },
  {
    number: 2,
    title: "Collecting Without Acting",
    symptom: "\"We have 500 survey responses. Nobody's looked at them.\"",
    fixes: [
      "Before sending ANY survey, define: What will we do with this?",
      "Rule: Every piece of negative feedback gets a response within 48 hours",
      "Review feedback weekly with your team (put it on the calendar)",
      "No action = worse than no collection (erodes trust)"
    ]
  },
  {
    number: 3,
    title: "Ignoring Negative Feedback",
    symptom: "\"That customer's always complaining. They're an outlier.\"",
    fixes: [
      "Negative feedback is gold — it tells you exactly what's broken",
      "One complaint = maybe an outlier. Three complaints = pattern.",
      "Respond to every negative review publicly (shows you care)",
      "Your biggest critics can become your biggest advocates if you listen"
    ]
  },
  {
    number: 4,
    title: "Analysis Paralysis",
    symptom: "\"We need more data before we can decide anything.\"",
    fixes: [
      "Start messy. Improve as you go.",
      "10 feedback items is enough to spot a pattern",
      "You can always refine your system later",
      "Action beats perfection. Every time."
    ]
  },
  {
    number: 5,
    title: "Making It Someone Else's Problem",
    symptom: "\"Marketing should own this. Or support. Or whoever has time.\"",
    fixes: [
      "One person owns the VoC program — period",
      "That person has authority to convene teams and drive action",
      "Weekly accountability: \"What did we learn? What did we change?\"",
      "Shared ownership = no ownership"
    ]
  }
];

const Module6Pitfalls = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleFlip = (num: number) => {
    setFlippedCards(prev => 
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  return (
    <section id="common-pitfalls" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] text-sm font-medium mb-4">
            Section 06
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            5 Pitfalls That Derail VoC Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Learn from others' mistakes. These are the most common ways VoC initiatives fail — 
            and how to avoid them.
          </p>
        </div>

        {/* Pitfall Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {PITFALLS.map((pitfall) => {
            const isFlipped = flippedCards.includes(pitfall.number);
            
            return (
              <div 
                key={pitfall.number}
                className="perspective-1000"
              >
                <motion.div
                  className="relative w-full min-h-[280px] cursor-pointer"
                  onClick={() => toggleFlip(pitfall.number)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleFlip(pitfall.number)}
                  aria-pressed={isFlipped}
                  aria-label={`Pitfall ${pitfall.number}: ${pitfall.title}. ${isFlipped ? 'Showing solution' : 'Click to see the fix'}`}
                >
                  {/* Front */}
                  <motion.div
                    className={`absolute inset-0 p-6 bg-card border rounded-xl backface-hidden ${isFlipped ? 'hidden' : ''}`}
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <AlertTriangle className="w-8 h-8 text-amber-500 mb-4" />
                    <h4 className="font-bold text-foreground mb-2">
                      Pitfall #{pitfall.number}: {pitfall.title}
                    </h4>
                    <p className="text-sm text-muted-foreground italic mb-4">
                      {pitfall.symptom}
                    </p>
                    <span className="text-sm text-[hsl(var(--biz-green))] font-medium">
                      Click to see the fix →
                    </span>
                  </motion.div>

                  {/* Back */}
                  <motion.div
                    className={`absolute inset-0 p-6 bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl backface-hidden ${!isFlipped ? 'hidden' : ''}`}
                    initial={false}
                    animate={{ rotateY: isFlipped ? 0 : -180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-[hsl(var(--biz-green))] mb-4" />
                    <h4 className="font-bold text-foreground mb-3">The Fix:</h4>
                    <ul className="space-y-2">
                      {pitfall.fixes.map((fix, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-[hsl(var(--biz-green))]">•</span>
                          {fix}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Summary Callout */}
        <div className="flex items-start gap-4 p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <ShieldAlert className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground">
              <strong>The Pattern:</strong> Every pitfall comes down to one thing — treating VoC as 
              "nice to have" instead of "how we operate." Commit to the system, and these pitfalls disappear.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module6Pitfalls;
